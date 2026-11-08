import { WeddingConfig } from './types/wedding';

export const DEFAULT_WEDDING_CONFIG: WeddingConfig = {
  theme: 'jawa',
  groom: {
    fullName: 'Raden Arya Wijaya, S.T.',
    shortName: 'Arya',
    fatherName: 'Bpk. Ir. Bambang Sugiarto',
    motherName: 'Ibu Hj. Sri Wahyuni',
    childOrderText: 'Putra Pertama dari',
    instagram: 'aryawijaya',
    bio: 'Pria yang bersyukur menemukan dermaga cinta terbaik dalam hidupnya.',
  },
  bride: {
    fullName: 'Nimas Ayu Larasati, S.Ked.',
    shortName: 'Laras',
    fatherName: 'Bpk. Drs. H. Suryo Prabowo',
    motherName: 'Ibu Dra. Hj. Endang Sulastri',
    childOrderText: 'Putri Kedua dari',
    instagram: 'ayularasati',
    bio: 'Wanita yang meyakini bahwa setiap takdir indah bermula dari kesabaran.',
  },
  quote: {
    verse:
      'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    source: 'QS. Ar-Rum: 21',
  },
  events: {
    akad: {
      title: 'Akad Nikah',
      date: '2026-11-28',
      timeStart: '08:00',
      timeEnd: '10:00 WIB',
      locationName: 'Masjid Agung Al-Ikhlas',
      address: 'Jl. Wonosari Km 1.5, Baleharjo, Wonosari, D.I. Yogyakarta',
      mapsUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Ikhlas+Wonosari',
      streamingUrl: 'https://youtube.com/live',
    },
    resepsi: {
      title: 'Resepsi Pernikahan',
      date: '2026-11-28',
      timeStart: '11:00',
      timeEnd: '14:00 WIB',
      locationName: 'Grand Pacific Hall Ballroom',
      address: 'Jl. Magelang Km 4.5 No. 401, Sleman, D.I. Yogyakarta',
      mapsUrl: 'https://maps.google.com/?q=Grand+Pacific+Hall+Yogyakarta',
    },
  },
  countdownDate: '2026-11-28T08:00:00',
  loveStory: [
    {
      id: '1',
      yearOrDate: '2019',
      title: 'Awal Pertemuan',
      story:
        'Pertama kali bersua di bangku perkuliahan saat kegiatan orientasi kampus. Tatapan singkat yang kelak menjadi awal mula dari sebuah perjalanan panjang.',
    },
    {
      id: '2',
      yearOrDate: '2022',
      title: 'Menjalin Komitmen',
      story:
        'Setelah saling memahami karakter dan cita-cita, kami sepakat untuk melangkah bersama dengan niat tulus menuju masa depan.',
    },
    {
      id: '3',
      yearOrDate: '2025',
      title: 'Momen Lamaran Hangat',
      story:
        'Di hadapan kedua keluarga besar, cincin tersemat sebagai simbol janji suci dan kesiapan menyatukan dua hati dan dua keluarga.',
    },
    {
      id: '4',
      yearOrDate: '2026',
      title: 'Menuju Pelaminan Suci',
      story:
        'Dengan ridho Allah SWT dan restu kedua orang tua, kami siap mengikrarkan akad suci pernikahan untuk melangkah selamanya.',
    },
  ],
  gifts: {
    banks: [
      {
        id: 'bank-1',
        bankName: 'BCA',
        accountNumber: '8820391823',
        accountHolder: 'Raden Arya Wijaya',
      },
      {
        id: 'bank-2',
        bankName: 'Bank Mandiri',
        accountNumber: '1370019283921',
        accountHolder: 'Nimas Ayu Larasati',
      },
      {
        id: 'bank-3',
        bankName: 'Bank BRI',
        accountNumber: '002101039485501',
        accountHolder: 'Raden Arya Wijaya',
      },
    ],
    showQris: true,
    qrisName: 'Wedding Arya & Laras',
    giftAddress: {
      receiverName: 'Arya & Laras (Rumah Bpk. Bambang Sugiarto)',
      phone: '081234567890',
      fullAddress:
        'Jl. Kaliurang Km 9.5 No. 42, Sinduharjo, Ngaglik, Sleman, D.I. Yogyakarta 55581',
    },
  },
  music: {
    title: 'A Thousand Years (Romantic Acoustic Piano)',
    artist: 'Wedding Strings Orchestra',
    url: 'https://commondatastorage.googleapis.com/codeskulptor-demos/riceracer_assets/music/menu.ogg',
    autoPlay: true,
  },
  adminSettings: {
    pin: '1234',
    adminWhatsapp: '081234567890',
    waTemplate: 'Konfirmasi Kehadiran Tamu Undangan',
  },
  socialLinks: {
    developerName: 'DexxDigital',
    tiktokUrl: 'https://www.tiktok.com/@dexxdigital',
    shopeeUrl: 'https://shopee.co.id',
    instagramUrl: 'https://www.instagram.com/dexxdigital',
    websiteUrl: 'https://dexxdigital.com',
  },
};
