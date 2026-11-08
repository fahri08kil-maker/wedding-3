import { WeddingConfig, WeddingThemeId } from '../types/wedding';

/**
 * Format date in Indonesian locale (e.g. "Sabtu, 28 November 2026")
 */
export function formatIndonesianDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('id-ID', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Calculate countdown remaining time until wedding
 */
export function calculateTimeRemaining(targetIsoDate: string) {
  const difference = new Date(targetIsoDate).getTime() - new Date().getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / 1000 / 60) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
}

/**
 * Normalize WhatsApp number (convert 08... or +62 to standard international 62...)
 */
export function cleanWhatsappNumber(phone: string): string {
  let cleaned = phone.replace(/[^0-9]/g, '');
  if (cleaned.startsWith('0')) {
    cleaned = '62' + cleaned.substring(1);
  } else if (cleaned.startsWith('8')) {
    cleaned = '628' + cleaned.substring(1);
  }
  return cleaned;
}

/**
 * Create a direct WhatsApp RSVP notification link to admin
 */
export function generateAdminWhatsappRsvpUrl(
  adminPhone: string,
  guestName: string,
  attendance: 'hadir' | 'ragu' | 'tidak_hadir',
  guestCount: number,
  message: string,
  brideName: string,
  groomName: string
): string {
  const cleanPhone = cleanWhatsappNumber(adminPhone);
  const attendanceLabel =
    attendance === 'hadir'
      ? '✅ Ya, Saya Akan Hadir'
      : attendance === 'ragu'
      ? '⏳ Masih Ragu-ragu'
      : '❌ Maaf, Belum Bisa Hadir';

  const text =
    `Halo Admin Undangan Pernikahan *${groomName} & ${brideName}*,\n\n` +
    `Saya ingin mengonfirmasi kehadiran:\n` +
    `*Nama:* ${guestName}\n` +
    `*Konfirmasi:* ${attendanceLabel}\n` +
    `*Jumlah Hadir:* ${attendance === 'hadir' ? `${guestCount} Orang` : '-'}\n` +
    `*Pesan & Doa Restu:*\n"${message}"\n\n` +
    `Terima kasih! ✨`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}

/**
 * Create shareable WhatsApp invitation link for a guest
 */
export function generateGuestShareText(
  guestName: string,
  config: WeddingConfig,
  baseUrl: string
): string {
  const groom = config.groom.shortName;
  const bride = config.bride.shortName;
  const eventDate = formatIndonesianDate(config.events.akad.date);
  const inviteUrl = `${baseUrl.replace(/\/$/, '')}?to=${encodeURIComponent(guestName)}`;

  return (
    `Kepada Yth.\n` +
    `*${guestName}*\n\n` +
    `Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia kami:\n\n` +
    `💍 *The Wedding of ${groom} & ${bride}*\n` +
    `🗓 *${eventDate}*\n\n` +
    `Detail acara dan ucapan doa restu dapat diakses melalui tautan undangan berikut:\n` +
    `${inviteUrl}\n\n` +
    `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.\n\n` +
    `Salam hangat,\n` +
    `*${groom} & ${bride}*`
  );
}

/**
 * Theme specifications with colors, styles, ornaments & cultural identity
 */
export interface ThemeMeta {
  id: WeddingThemeId;
  name: string;
  badge: string;
  description: string;
  bgGradient: string;
  cardBg: string;
  primaryColor: string; // e.g. gold, silver, emerald
  secondaryColor: string;
  textColor: string;
  accentGlow: string;
  ornamentStyle: 'jawa' | 'sunda' | 'minang' | 'casual' | 'islamic';
  attireColors: {
    groomBeskap: string;
    groomEmbroidery: string;
    brideDress: string;
    brideEmbroidery: string;
    headpiece: string;
    jasmineRonce: boolean;
  };
}

export const THEME_CONFIGS: Record<WeddingThemeId, ThemeMeta> = {
  jawa: {
    id: 'jawa',
    name: 'Adat Jawa Kraton',
    badge: 'Klasik Gelap Keemasan',
    description: 'Pakaian beludru hitam berhias sulam emas megah, paes prada, ronce melati tibo dodo, dan ornamen wayang gunungan.',
    bgGradient: 'from-amber-950 via-[#120f0b] to-[#0a0806]',
    cardBg: 'bg-[#18130e]/80 border-amber-500/30 text-amber-100',
    primaryColor: '#eab308', // gold
    secondaryColor: '#ca8a04',
    textColor: '#fef08a',
    accentGlow: 'rgba(234, 179, 8, 0.25)',
    ornamentStyle: 'jawa',
    attireColors: {
      groomBeskap: '#1c1917', // black velvet
      groomEmbroidery: '#facc15', // gold trim
      brideDress: '#1c1917', // black velvet kebaya
      brideEmbroidery: '#fbbf24', // golden embroidery
      headpiece: '#eab308', // gold blangkon & cunduk mentul
      jasmineRonce: true,
    },
  },
  sunda: {
    id: 'sunda',
    name: 'Adat Sunda Siger',
    badge: 'Putih Murni & Perak Kristal',
    description: 'Kebaya putih suci berkilau dengan Mahkota Siger Sunda, untaian ronce melati wangi, dan jas tutup perak elegan.',
    bgGradient: 'from-slate-900 via-[#101726] to-[#0c121e]',
    cardBg: 'bg-slate-900/80 border-slate-300/30 text-slate-100',
    primaryColor: '#e2e8f0', // silver/white radiant
    secondaryColor: '#94a3b8',
    textColor: '#f8fafc',
    accentGlow: 'rgba(226, 232, 240, 0.25)',
    ornamentStyle: 'sunda',
    attireColors: {
      groomBeskap: '#f8fafc', // white beskap
      groomEmbroidery: '#cbd5e1', // silver embroidery
      brideDress: '#ffffff', // pure white kebaya
      brideEmbroidery: '#e2e8f0', // silver & crystal
      headpiece: '#f1f5f9', // siger sunda silver
      jasmineRonce: true,
    },
  },
  minang: {
    id: 'minang',
    name: 'Adat Minangkabau',
    badge: 'Merah Marun & Suntiang Emas',
    description: 'Baju kurung beludru merah marun pekat bertabur benang emas songket dan kemegahan mahkota Suntiang bertingkat.',
    bgGradient: 'from-rose-950 via-[#1a080b] to-[#0d0406]',
    cardBg: 'bg-[#220c0f]/80 border-rose-500/30 text-rose-100',
    primaryColor: '#f59e0b', // gold
    secondaryColor: '#dc2626', // ruby red
    textColor: '#fde047',
    accentGlow: 'rgba(245, 158, 11, 0.3)',
    ornamentStyle: 'minang',
    attireColors: {
      groomBeskap: '#881337', // deep maroon
      groomEmbroidery: '#fbbf24', // songket gold
      brideDress: '#9f1239', // royal maroon kurung
      brideEmbroidery: '#f59e0b', // heavy gold
      headpiece: '#f59e0b', // towering suntiang emas
      jasmineRonce: false,
    },
  },
  casual: {
    id: 'casual',
    name: 'Casual Modern Luxe',
    badge: 'Tuxedo & Gaun Pengantin Minimalis',
    description: 'Setelan jas modern elegan dengan dasi kupu-kupu dan gaun pengantin putih modern bergaya kontemporer anggun.',
    bgGradient: 'from-zinc-950 via-[#18181b] to-[#09090b]',
    cardBg: 'bg-zinc-900/80 border-amber-200/20 text-zinc-100',
    primaryColor: '#f5d0fe', // soft rose / champagne
    secondaryColor: '#d8b4fe',
    textColor: '#faf5ff',
    accentGlow: 'rgba(244, 114, 182, 0.2)',
    ornamentStyle: 'casual',
    attireColors: {
      groomBeskap: '#0f172a', // midnight tuxedo
      groomEmbroidery: '#e2e8f0', // crisp white shirt & bowtie
      brideDress: '#fff1f2', // off-white modern bridal gown
      brideEmbroidery: '#fecdd3', // soft lace
      headpiece: '#fed7aa', // tiara & veil
      jasmineRonce: false,
    },
  },
  islamic: {
    id: 'islamic',
    name: 'Modern Islamic Luxe',
    badge: 'Emerald Hijau Zamrud & Emas',
    description: 'Busana muslimah syar\'i anggun warna hijau zamrud bermahkotakan tiara lembut dan jubah koko kerajaan bertatahkan emas.',
    bgGradient: 'from-emerald-950 via-[#06241a] to-[#03150e]',
    cardBg: 'bg-[#082a1f]/80 border-emerald-500/30 text-emerald-100',
    primaryColor: '#34d399', // emerald
    secondaryColor: '#fbbf24', // gold
    textColor: '#a7f3d0',
    accentGlow: 'rgba(52, 211, 153, 0.25)',
    ornamentStyle: 'islamic',
    attireColors: {
      groomBeskap: '#064e3b', // deep emerald sherwani
      groomEmbroidery: '#f59e0b', // gold trims
      brideDress: '#047857', // emerald royal dress with veil
      brideEmbroidery: '#fbbf24', // golden embroidery
      headpiece: '#fbbf24', // gold floral tiara with hijab
      jasmineRonce: true,
    },
  },
};
