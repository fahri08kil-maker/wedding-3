export type WeddingThemeId = 'jawa' | 'sunda' | 'minang' | 'casual' | 'islamic';

export interface PersonInfo {
  fullName: string;
  shortName: string;
  fatherName: string;
  motherName: string;
  childOrderText: string; // e.g. "Putra Pertama dari"
  instagram?: string;
  bio?: string;
}

export interface EventDetail {
  title: string;
  date: string; // YYYY-MM-DD
  timeStart: string; // e.g. "08:00"
  timeEnd: string; // e.g. "11:00 WIB" or "Selesai"
  locationName: string;
  address: string;
  mapsUrl: string;
  streamingUrl?: string;
}

export interface LoveStoryItem {
  id: string;
  yearOrDate: string;
  title: string;
  story: string;
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

export interface DigitalGifts {
  banks: BankAccount[];
  showQris?: boolean;
  qrisImageUrl?: string;
  qrisName?: string;
  giftAddress: {
    receiverName: string;
    phone: string;
    fullAddress: string;
  };
}

export interface MusicConfig {
  title: string;
  artist: string;
  url: string;
  autoPlay: boolean;
}

export interface AdminSettings {
  pin: string; // default e.g. "1234"
  adminWhatsapp: string; // e.g. "628123456789"
  waTemplate: string;
}

export interface SocialLinks {
  tiktokUrl: string;
  shopeeUrl: string;
  instagramUrl: string;
  websiteUrl: string;
  developerName: string;
}

export interface WeddingConfig {
  theme: WeddingThemeId;
  groom: PersonInfo;
  bride: PersonInfo;
  quote: {
    verse: string;
    source: string;
  };
  events: {
    akad: EventDetail;
    resepsi: EventDetail;
    ngunduhMantu?: EventDetail;
  };
  countdownDate: string; // ISO string e.g. "2026-12-25T09:00:00"
  loveStory: LoveStoryItem[];
  gifts: DigitalGifts;
  music: MusicConfig;
  adminSettings: AdminSettings;
  socialLinks: SocialLinks;
  updatedAt?: string;
}

export interface RsvpItem {
  id?: string;
  name: string;
  attendance: 'hadir' | 'ragu' | 'tidak_hadir';
  guestCount: number;
  message: string;
  createdAt: string;
}
