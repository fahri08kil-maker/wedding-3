import {
  doc,
  getDoc,
  setDoc,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { WeddingConfig, RsvpItem } from '../types/wedding';
import { DEFAULT_WEDDING_CONFIG } from '../defaultData';

const CONFIG_PATH = 'configs';
const CONFIG_DOC_ID = 'wedding';
const RSVPS_PATH = 'rsvps';

/**
 * Fetch wedding configuration from Firestore cloud
 */
export async function getWeddingConfig(): Promise<WeddingConfig> {
  const docRef = doc(db, CONFIG_PATH, CONFIG_DOC_ID);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as WeddingConfig;
      if (data.music?.url?.includes('pixabay.com')) {
        data.music.url = DEFAULT_WEDDING_CONFIG.music.url;
      }
      return {
        ...DEFAULT_WEDDING_CONFIG,
        ...data,
      };
    } else {
      // First time initialization in Cloud Firestore
      await setDoc(docRef, {
        ...DEFAULT_WEDDING_CONFIG,
        updatedAt: new Date().toISOString(),
      });
      return DEFAULT_WEDDING_CONFIG;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${CONFIG_PATH}/${CONFIG_DOC_ID}`);
  }
}

/**
 * Update wedding configuration directly to Cloud Firestore (Admin CMS)
 */
export async function saveWeddingConfig(config: WeddingConfig): Promise<void> {
  const docRef = doc(db, CONFIG_PATH, CONFIG_DOC_ID);
  try {
    const payload = {
      ...config,
      updatedAt: new Date().toISOString(),
    };
    await setDoc(docRef, payload);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${CONFIG_PATH}/${CONFIG_DOC_ID}`);
  }
}

/**
 * Submit guest RSVP and congratulations message to Cloud Firestore
 */
export async function submitRsvp(
  rsvp: Omit<RsvpItem, 'id' | 'createdAt'>
): Promise<string> {
  const colRef = collection(db, RSVPS_PATH);
  try {
    const docData: Omit<RsvpItem, 'id'> = {
      name: rsvp.name.trim(),
      attendance: rsvp.attendance,
      guestCount: Number(rsvp.guestCount) || 1,
      message: rsvp.message.trim(),
      createdAt: new Date().toISOString(),
    };
    const res = await addDoc(colRef, docData);
    return res.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, RSVPS_PATH);
  }
}

/**
 * Subscribe to real-time RSVPs and guest wishes
 */
export function subscribeToRsvps(
  onUpdate: (rsvps: RsvpItem[]) => void,
  maxItems = 50
): () => void {
  const colRef = collection(db, RSVPS_PATH);
  const q = query(colRef, orderBy('createdAt', 'desc'), limit(maxItems));

  return onSnapshot(
    q,
    (snapshot) => {
      const list: RsvpItem[] = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<RsvpItem, 'id'>),
      }));
      onUpdate(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, RSVPS_PATH);
    }
  );
}
