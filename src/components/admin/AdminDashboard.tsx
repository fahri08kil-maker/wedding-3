import React, { useState } from 'react';
import {
  Palette,
  Users,
  Calendar,
  Heart,
  Gift,
  Share2,
  MessageSquare,
  Music,
  Shield,
  Save,
  Check,
  Eye,
  Plus,
  Trash2,
  ExternalLink,
  Copy,
  BookOpen,
  QrCode,
  Upload,
  ImageIcon,
} from 'lucide-react';
import {
  WeddingConfig,
  WeddingThemeId,
  LoveStoryItem,
  BankAccount,
} from '../../types/wedding';
import { THEME_CONFIGS, generateGuestShareText } from '../../utils/weddingUtils';
import { CoupleIllustration } from '../animated/CoupleIllustration';

interface AdminDashboardProps {
  config: WeddingConfig;
  onSaveConfig: (newConfig: WeddingConfig) => Promise<void>;
  onClose: () => void;
  onResetDefault: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  config,
  onSaveConfig,
  onClose,
  onResetDefault,
}) => {
  const [formData, setFormData] = useState<WeddingConfig>(config);
  const [activeTab, setActiveTab] = useState<
    'theme' | 'couple' | 'quote' | 'events' | 'story' | 'gifts' | 'guestLinks' | 'rsvp' | 'music' | 'settings'
  >('theme');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Guest invitation link generator state
  const [guestNameInput, setGuestNameInput] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedWaText, setCopiedWaText] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      await onSaveConfig(formData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert('Gagal menyimpan ke Cloud Firestore. Silakan periksa koneksi.');
    } finally {
      setIsSaving(false);
    }
  };

  // Love Story handlers
  const handleAddStory = () => {
    const newItem: LoveStoryItem = {
      id: Date.now().toString(),
      yearOrDate: '2026',
      title: 'Momen Indah',
      story: 'Ceritakan kisah indah perjalanan cinta Anda disini...',
    };
    setFormData((prev) => ({
      ...prev,
      loveStory: [...prev.loveStory, newItem],
    }));
  };

  const handleRemoveStory = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      loveStory: prev.loveStory.filter((item) => item.id !== id),
    }));
  };

  // Bank handlers
  const handleAddBank = () => {
    const newBank: BankAccount = {
      id: 'bank-' + Date.now(),
      bankName: 'BCA',
      accountNumber: '1234567890',
      accountHolder: formData.groom.shortName,
    };
    setFormData((prev) => ({
      ...prev,
      gifts: {
        ...prev.gifts,
        banks: [...prev.gifts.banks, newBank],
      },
    }));
  };

  const handleRemoveBank = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      gifts: {
        ...prev.gifts,
        banks: prev.gifts.banks.filter((b) => b.id !== id),
      },
    }));
  };

  const handleQrisFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar yang valid (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Compress image using canvas to max 600px width/height
        const maxDimension = 600;
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setFormData((prev) => ({
            ...prev,
            gifts: {
              ...prev.gifts,
              qrisImageUrl: compressedDataUrl,
            },
          }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveQrisImage = () => {
    setFormData((prev) => ({
      ...prev,
      gifts: {
        ...prev.gifts,
        qrisImageUrl: '',
      },
    }));
  };

  const currentOrigin =
    typeof window !== 'undefined' ? window.location.origin : 'https://wedding.dexxdigital.com';
  const generatedLink = guestNameInput.trim()
    ? `${currentOrigin}?to=${encodeURIComponent(guestNameInput.trim())}`
    : currentOrigin;

  const generatedShareText = generateGuestShareText(
    guestNameInput.trim() || 'Tamu Undangan',
    formData,
    currentOrigin
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-stone-950 text-stone-100 overflow-hidden font-sans select-none">
      {/* Top Navbar */}
      <header className="h-16 px-4 sm:px-6 bg-stone-900 border-b border-stone-800 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-stone-950 font-bold flex items-center justify-center shadow-md">
            D
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
              <span>DexxDigital Wedding CMS</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono">
                Cloud Firestore
              </span>
            </h1>
            <p className="text-[11px] text-stone-400">
              Dashboard Tersembunyi Pengaturan Undangan Klien
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-300 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview Web</span>
          </button>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-stone-950 border-t-transparent animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : saveSuccess ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-950" />
                <span>Tersimpan!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Simpan ke Cloud</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Tabs */}
        <aside className="w-20 sm:w-60 bg-stone-900/60 border-r border-stone-800 p-2 sm:p-4 overflow-y-auto space-y-1 flex-shrink-0">
          {[
            { id: 'theme', label: 'Tema & Budaya', icon: Palette },
            { id: 'couple', label: 'Data Mempelai', icon: Users },
            { id: 'quote', label: 'Kutipan Ayat & Doa', icon: BookOpen },
            { id: 'events', label: 'Jadwal Acara', icon: Calendar },
            { id: 'story', label: 'Kisah Cinta', icon: Heart },
            { id: 'gifts', label: 'Amplop & Kado', icon: Gift },
            { id: 'guestLinks', label: 'Buat Link Tamu', icon: Share2 },
            { id: 'rsvp', label: 'RSVP & WhatsApp', icon: MessageSquare },
            { id: 'music', label: 'Musik Latar', icon: Music },
            { id: 'settings', label: 'Branding & PIN', icon: Shield },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 max-w-4xl">
          {/* TAB 1: THEME & CULTURE */}
          {activeTab === 'theme' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Tema Animasi &amp; Pakaian Adat</h2>
                <p className="text-xs text-stone-400">
                  Pilih salah satu dari 5 tema premium. Karakter animasi 3D, warna pakaian, ornamen latar, dan tone visual web akan otomatis menyesuaikan!
                </p>
              </div>

              {/* Theme Grid Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(Object.keys(THEME_CONFIGS) as WeddingThemeId[]).map((themeKey) => {
                  const t = THEME_CONFIGS[themeKey];
                  const isSelected = formData.theme === themeKey;
                  return (
                    <div
                      key={themeKey}
                      onClick={() => setFormData({ ...formData, theme: themeKey })}
                      className={`relative p-5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-stone-800/90 border-amber-400 ring-2 ring-amber-400/50 shadow-xl'
                          : 'bg-stone-900/50 border-stone-800 hover:border-stone-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-sm text-white">{t.name}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>

                      <div className="h-44 w-full rounded-xl bg-stone-950/70 border border-stone-800 flex items-center justify-center overflow-hidden mb-3">
                        <CoupleIllustration themeId={themeKey} variant="compact" />
                      </div>

                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-400/10 text-amber-300">
                          {t.badge}
                        </span>
                        <p className="text-[11px] text-stone-400 leading-snug">
                          {t.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: COUPLE DATA */}
          {activeTab === 'couple' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-bold text-white">Data Mempelai</h2>
                <p className="text-xs text-stone-400">
                  Ubah data pengantin pria dan wanita, nama orang tua, dan kutipan ayat suci.
                </p>
              </div>

              {/* GROOM SETTINGS */}
              <div className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Mempelai Pria (Groom)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Lengkap &amp; Gelar</label>
                    <input
                      type="text"
                      value={formData.groom.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, fullName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Panggilan</label>
                    <input
                      type="text"
                      value={formData.groom.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, shortName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Urutan Anak</label>
                    <input
                      type="text"
                      value={formData.groom.childOrderText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, childOrderText: e.target.value },
                        })
                      }
                      placeholder="Putra Pertama dari"
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Username Instagram</label>
                    <input
                      type="text"
                      value={formData.groom.instagram || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, instagram: e.target.value },
                        })
                      }
                      placeholder="tanpa @"
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Ayah</label>
                    <input
                      type="text"
                      value={formData.groom.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, fatherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Ibu</label>
                    <input
                      type="text"
                      value={formData.groom.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          groom: { ...formData.groom, motherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* BRIDE SETTINGS */}
              <div className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  Mempelai Wanita (Bride)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Lengkap &amp; Gelar</label>
                    <input
                      type="text"
                      value={formData.bride.fullName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, fullName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Panggilan</label>
                    <input
                      type="text"
                      value={formData.bride.shortName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, shortName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Urutan Anak</label>
                    <input
                      type="text"
                      value={formData.bride.childOrderText}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, childOrderText: e.target.value },
                        })
                      }
                      placeholder="Putri Kedua dari"
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Username Instagram</label>
                    <input
                      type="text"
                      value={formData.bride.instagram || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, instagram: e.target.value },
                        })
                      }
                      placeholder="tanpa @"
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Ayah</label>
                    <input
                      type="text"
                      value={formData.bride.fatherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, fatherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Ibu</label>
                    <input
                      type="text"
                      value={formData.bride.motherName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          bride: { ...formData.bride, motherName: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* QUOTES */}
              <div className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-3">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Kutipan Ayat / Doa Romantis
                </h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Isi Kutipan</label>
                    <textarea
                      rows={3}
                      value={formData.quote.verse}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quote: { ...formData.quote, verse: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Sumber / Surah</label>
                    <input
                      type="text"
                      value={formData.quote.source}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          quote: { ...formData.quote, source: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: KUTIPAN AYAT / SURAH */}
          {activeTab === 'quote' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Kutipan Ayat Suci / Surah / Doa Pernikahan</h2>
                <p className="text-xs text-stone-400">
                  Ubah kutipan ayat suci Al-Qur'an (misal QS. Ar-Rum: 21), ayat Alkitab, atau kata-kata mutiara indah untuk pasangan mempelai.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-900/60 border border-amber-400/30 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-200">
                    Sumber / Nama Surah &amp; Ayat
                  </label>
                  <input
                    type="text"
                    value={formData.quote.source}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quote: { ...formData.quote, source: e.target.value },
                      })
                    }
                    placeholder="Contoh: QS. Ar-Rum: 21 atau 1 Korintus 13:4-7"
                    className="w-full px-4 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-300 font-semibold text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-200">
                    Isi Kutipan / Terjemahan Ayat
                  </label>
                  <textarea
                    rows={4}
                    value={formData.quote.verse}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quote: { ...formData.quote, verse: e.target.value },
                      })
                    }
                    placeholder="Tuliskan isi ayat atau doa pernikahan yang indah..."
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm leading-relaxed focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Preset Options Quick Buttons */}
                <div className="pt-2 border-t border-stone-800 space-y-2">
                  <span className="text-xs font-semibold text-stone-400 block">Pilihan Cepat (Preset Template):</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          quote: {
                            source: 'QS. Ar-Rum: 21',
                            verse:
                              'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
                          },
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-amber-300 transition-colors cursor-pointer"
                    >
                      QS. Ar-Rum: 21
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          quote: {
                            source: 'QS. An-Nur: 32',
                            verse:
                              'Dan nikahkanlah orang-orang yang masih membujang di antara kamu, dan juga orang-orang yang layak (menikah) dari hamba-hamba sahayamu yang laki-laki dan perempuan. Jika mereka miskin, Allah akan memberi kemampuan kepada mereka dengan karunia-Nya.',
                          },
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-amber-300 transition-colors cursor-pointer"
                    >
                      QS. An-Nur: 32
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          quote: {
                            source: '1 Korintus 13:4-7',
                            verse:
                              'Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia menutupi segala sesuatu, percaya segala sesuatu, mengharapkan segala sesuatu, sabar menanggung segala sesuatu.',
                          },
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-amber-300 transition-colors cursor-pointer"
                    >
                      1 Korintus 13:4-7
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          quote: {
                            source: 'Kutipan Mutiara Cinta',
                            verse:
                              'Dua jiwa namun satu pikiran, dua hati yang berdetak sebagai satu kesatuan dalam ikatan suci yang abadi.',
                          },
                        })
                      }
                      className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-[11px] text-amber-300 transition-colors cursor-pointer"
                    >
                      Mutiara Cinta
                    </button>
                  </div>
                </div>

                {/* Live Card Preview */}
                <div className="p-4 rounded-2xl bg-black/50 border border-amber-400/20 text-center space-y-2 mt-4">
                  <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold block">Preview Tampilan di Web:</span>
                  <p className="text-xs italic text-stone-200 font-serif-luxury leading-relaxed">
                    &ldquo;{formData.quote.verse}&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                    — {formData.quote.source} —
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Jadwal Acara &amp; Lokasi</h2>
                <p className="text-xs text-stone-400">
                  Atur waktu, gedung, dan tautan Google Maps untuk Akad Nikah &amp; Resepsi.
                </p>
              </div>

              {/* Countdown Target ISO */}
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/20 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-amber-300 block">Waktu Target Countdown</span>
                  <span className="text-stone-300">Format: YYYY-MM-DDTHH:mm:ss</span>
                </div>
                <input
                  type="datetime-local"
                  value={formData.countdownDate.substring(0, 16)}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      countdownDate: e.target.value ? `${e.target.value}:00` : formData.countdownDate,
                    })
                  }
                  className="px-3 py-1.5 rounded-lg bg-stone-900 border border-stone-700 text-amber-300 font-mono text-xs"
                />
              </div>

              {/* AKAD */}
              <div className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Akad Nikah
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Tanggal (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      value={formData.events.akad.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            akad: { ...formData.events.akad, date: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-stone-300 font-semibold mb-1 block">Jam Mulai</label>
                      <input
                        type="text"
                        value={formData.events.akad.timeStart}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            events: {
                              ...formData.events,
                              akad: { ...formData.events.akad, timeStart: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-stone-300 font-semibold mb-1 block">Jam Selesai</label>
                      <input
                        type="text"
                        value={formData.events.akad.timeEnd}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            events: {
                              ...formData.events,
                              akad: { ...formData.events.akad, timeEnd: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Tempat / Masjid</label>
                    <input
                      type="text"
                      value={formData.events.akad.locationName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            akad: { ...formData.events.akad, locationName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Link Google Maps</label>
                    <input
                      type="text"
                      value={formData.events.akad.mapsUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            akad: { ...formData.events.akad, mapsUrl: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-stone-300 font-semibold mb-1 block">Alamat Lengkap</label>
                    <input
                      type="text"
                      value={formData.events.akad.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            akad: { ...formData.events.akad, address: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* RESEPSI */}
              <div className="p-5 rounded-2xl bg-stone-900/50 border border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-rose-300 uppercase tracking-wider">
                  Resepsi Pernikahan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Tanggal (YYYY-MM-DD)</label>
                    <input
                      type="date"
                      value={formData.events.resepsi.date}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            resepsi: { ...formData.events.resepsi, date: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-stone-300 font-semibold mb-1 block">Jam Mulai</label>
                      <input
                        type="text"
                        value={formData.events.resepsi.timeStart}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            events: {
                              ...formData.events,
                              resepsi: { ...formData.events.resepsi, timeStart: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-stone-300 font-semibold mb-1 block">Jam Selesai</label>
                      <input
                        type="text"
                        value={formData.events.resepsi.timeEnd}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            events: {
                              ...formData.events,
                              resepsi: { ...formData.events.resepsi, timeEnd: e.target.value },
                            },
                          })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Gedung / Ballroom</label>
                    <input
                      type="text"
                      value={formData.events.resepsi.locationName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            resepsi: { ...formData.events.resepsi, locationName: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Link Google Maps</label>
                    <input
                      type="text"
                      value={formData.events.resepsi.mapsUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            resepsi: { ...formData.events.resepsi, mapsUrl: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-stone-300 font-semibold mb-1 block">Alamat Lengkap</label>
                    <input
                      type="text"
                      value={formData.events.resepsi.address}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          events: {
                            ...formData.events,
                            resepsi: { ...formData.events.resepsi, address: e.target.value },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LOVE STORY */}
          {activeTab === 'story' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Kisah Cinta (Love Story)</h2>
                  <p className="text-xs text-stone-400">
                    Ceritakan perjalanan cinta Anda dalam beberapa babak indah.
                  </p>
                </div>
                <button
                  onClick={handleAddStory}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Cerita</span>
                </button>
              </div>

              <div className="space-y-4">
                {formData.loveStory.map((item, idx) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        Cerita #{idx + 1}
                      </span>
                      <button
                        onClick={() => handleRemoveStory(item.id)}
                        className="text-stone-500 hover:text-rose-400 p-1"
                        title="Hapus cerita"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-stone-300 mb-1 block">Tahun / Tanggal</label>
                        <input
                          type="text"
                          value={item.yearOrDate}
                          onChange={(e) => {
                            const updated = [...formData.loveStory];
                            updated[idx].yearOrDate = e.target.value;
                            setFormData({ ...formData, loveStory: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-stone-300 mb-1 block">Judul Momen</label>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => {
                            const updated = [...formData.loveStory];
                            updated[idx].title = e.target.value;
                            setFormData({ ...formData, loveStory: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-stone-300 mb-1 block">Kisah &amp; Makna</label>
                        <textarea
                          rows={2}
                          value={item.story}
                          onChange={(e) => {
                            const updated = [...formData.loveStory];
                            updated[idx].story = e.target.value;
                            setFormData({ ...formData, loveStory: updated });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: GIFTS & BANKS */}
          {activeTab === 'gifts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Amplop Digital &amp; Kado</h2>
                  <p className="text-xs text-stone-400">
                    Atur rekening bank penerima, nama QRIS, dan alamat pengiriman kado fisik.
                  </p>
                </div>
                <button
                  onClick={handleAddBank}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Bank</span>
                </button>
              </div>

              {/* Bank Accounts */}
              <div className="space-y-3">
                {formData.gifts.banks.map((bank, idx) => (
                  <div
                    key={bank.id}
                    className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 font-mono">
                        Rekening #{idx + 1}
                      </span>
                      {formData.gifts.banks.length > 1 && (
                        <button
                          onClick={() => handleRemoveBank(bank.id)}
                          className="text-stone-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <label className="text-stone-300 mb-1 block">Nama Bank</label>
                        <input
                          type="text"
                          value={bank.bankName}
                          onChange={(e) => {
                            const updated = [...formData.gifts.banks];
                            updated[idx].bankName = e.target.value;
                            setFormData({
                              ...formData,
                              gifts: { ...formData.gifts, banks: updated },
                            });
                          }}
                          placeholder="BCA / Mandiri / BRI"
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 mb-1 block">Nomor Rekening</label>
                        <input
                          type="text"
                          value={bank.accountNumber}
                          onChange={(e) => {
                            const updated = [...formData.gifts.banks];
                            updated[idx].accountNumber = e.target.value;
                            setFormData({
                              ...formData,
                              gifts: { ...formData.gifts, banks: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-stone-300 mb-1 block">Atas Nama (Holder)</label>
                        <input
                          type="text"
                          value={bank.accountHolder}
                          onChange={(e) => {
                            const updated = [...formData.gifts.banks];
                            updated[idx].accountHolder = e.target.value;
                            setFormData({
                              ...formData,
                              gifts: { ...formData.gifts, banks: updated },
                            });
                          }}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* QRIS SETTINGS CARD */}
              <div className="p-5 rounded-2xl bg-stone-900/60 border border-rose-500/30 space-y-4 shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-800 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Pengaturan QRIS Amplop Digital</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-400/20 text-rose-300 font-mono">
                          Non-Tunai
                        </span>
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Aktifkan opsi scan QRIS untuk GoPay, OVO, Dana, ShopeePay, dan M-Banking
                      </p>
                    </div>
                  </div>

                  {/* Toggle QRIS Active */}
                  <label className="flex items-center gap-2 cursor-pointer self-start sm:self-auto">
                    <span className="text-xs text-stone-300 font-semibold">Tampilkan QRIS:</span>
                    <input
                      type="checkbox"
                      checked={formData.gifts.showQris !== false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gifts: {
                            ...formData.gifts,
                            showQris: e.target.checked,
                          },
                        })
                      }
                      className="w-4 h-4 accent-rose-500 cursor-pointer rounded"
                    />
                  </label>
                </div>

                {formData.gifts.showQris !== false && (
                  <div className="space-y-4 pt-1">
                    {/* Merchant / Account Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="text-stone-300 font-semibold mb-1 block">
                          Nama Akun / Merchant QRIS
                        </label>
                        <input
                          type="text"
                          value={formData.gifts.qrisName || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gifts: {
                                ...formData.gifts,
                                qrisName: e.target.value,
                              },
                            })
                          }
                          placeholder={`Wedding ${formData.groom.shortName} & ${formData.bride.shortName}`}
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-medium focus:border-rose-400 focus:outline-none"
                        />
                        <p className="text-[10px] text-stone-400 mt-1">
                          Nama yang akan tertera sebagai penerima di kartu dan jendela QRIS
                        </p>
                      </div>

                      {/* Image URL Direct Input */}
                      <div>
                        <label className="text-stone-300 font-semibold mb-1 block">
                          URL Gambar QRIS (Opsional)
                        </label>
                        <input
                          type="text"
                          value={formData.gifts.qrisImageUrl || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              gifts: {
                                ...formData.gifts,
                                qrisImageUrl: e.target.value,
                              },
                            })
                          }
                          placeholder="https://.../my-qris-code.png"
                          className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white text-xs font-mono focus:border-rose-400 focus:outline-none"
                        />
                        <p className="text-[10px] text-stone-400 mt-1">
                          Bisa gunakan link gambar online atau upload file langsung di bawah
                        </p>
                      </div>
                    </div>

                    {/* Upload File Button & Image Preview */}
                    <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-stone-200 block">
                            Unggah Foto / Screenshot Kode QRIS
                          </span>
                          <span className="text-[11px] text-stone-400 block">
                            Pilih foto QRIS dari galeri HP atau laptop (otomatis dioptimalkan untuk cloud)
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-950 bg-rose-300 hover:bg-rose-200 transition-colors cursor-pointer active:scale-95 shadow-sm">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Pilih Gambar QR</span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleQrisFileUpload}
                              className="hidden"
                            />
                          </label>

                          {formData.gifts.qrisImageUrl && (
                            <button
                              type="button"
                              onClick={handleRemoveQrisImage}
                              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/40 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Hapus Gambar</span>
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Preview Box */}
                      {formData.gifts.qrisImageUrl ? (
                        <div className="flex items-center gap-4 p-3 bg-stone-900 rounded-xl border border-stone-800">
                          <div className="w-20 h-20 bg-white p-1.5 rounded-lg flex-shrink-0 flex items-center justify-center shadow-md">
                            <img
                              src={formData.gifts.qrisImageUrl}
                              alt="QRIS Preview"
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="space-y-1 text-xs">
                            <span className="font-bold text-emerald-400 flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              Gambar QRIS Siap Digunakan
                            </span>
                            <p className="text-[11px] text-stone-300">
                              Penerima: {formData.gifts.qrisName || `Wedding ${formData.groom.shortName} & ${formData.bride.shortName}`}
                            </p>
                            <p className="text-[10px] text-stone-400">
                              Tamu undangan dapat melihat dan mengunduh gambar ini saat menekan tombol QRIS.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3 bg-stone-900/50 rounded-xl border border-dashed border-stone-800 text-center space-y-1">
                          <p className="text-xs text-amber-300/90 font-medium">
                            Mode Default: QRIS Standar Vektor Aktif
                          </p>
                          <p className="text-[11px] text-stone-400">
                            Tanpa upload gambar, sistem menampilkan ilustrasi QRIS bersih berlogo GPN/QRIS dengan nama penerima yang Anda tentukan di atas.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Physical Gift Address */}
              <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Alamat Kirim Kado Fisik
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-stone-300 mb-1 block">Penerima</label>
                    <input
                      type="text"
                      value={formData.gifts.giftAddress?.receiverName || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gifts: {
                            ...formData.gifts,
                            giftAddress: {
                              ...formData.gifts.giftAddress,
                              receiverName: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 mb-1 block">Nomor HP</label>
                    <input
                      type="text"
                      value={formData.gifts.giftAddress?.phone || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gifts: {
                            ...formData.gifts,
                            giftAddress: {
                              ...formData.gifts.giftAddress,
                              phone: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-stone-300 mb-1 block">Alamat Lengkap &amp; Kode Pos</label>
                    <input
                      type="text"
                      value={formData.gifts.giftAddress?.fullAddress || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gifts: {
                            ...formData.gifts,
                            giftAddress: {
                              ...formData.gifts.giftAddress,
                              fullAddress: e.target.value,
                            },
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: GUEST INVITATION LINK GENERATOR */}
          {activeTab === 'guestLinks' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Generator Link Tamu &amp; WhatsApp</h2>
                <p className="text-xs text-stone-400">
                  Buat link personalisasi otomatis untuk tiap tamu undangan e.g. <code className="text-amber-300">?to=Bapak+Joko+&amp;+Keluarga</code> dan salin format pesan chat WhatsApp siap sebar!
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-900/60 border border-amber-400/30 space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-200">
                    Ketik Nama Tamu / Gelar
                  </label>
                  <input
                    type="text"
                    value={guestNameInput}
                    onChange={(e) => setGuestNameInput(e.target.value)}
                    placeholder="Contoh: Bapak Ir. H. Joko Widodo &amp; Keluarga"
                    className="w-full px-4 py-3 rounded-xl bg-stone-950 border border-white/20 text-white placeholder-stone-500 text-sm focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Generated Link Box */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-stone-400">
                    Tautan Undangan Khusus:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={generatedLink}
                      className="flex-1 px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-amber-300 font-mono text-xs"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedLink);
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-900 bg-amber-400 hover:bg-amber-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedLink ? 'Tersalin' : 'Salin URL'}</span>
                    </button>
                  </div>
                </div>

                {/* Generated WhatsApp Message Preview & Copy */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-400">
                      Teks Pesan WhatsApp Siap Kirim ke Tamu:
                    </label>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generatedShareText);
                        setCopiedWaText(true);
                        setTimeout(() => setCopiedWaText(false), 2000);
                      }}
                      className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                    >
                      {copiedWaText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedWaText ? 'Teks Tersalin!' : 'Salin Pesan WhatsApp'}</span>
                    </button>
                  </div>

                  <pre className="p-4 rounded-xl bg-stone-950 border border-stone-800 text-stone-300 text-xs whitespace-pre-wrap font-sans leading-relaxed">
                    {generatedShareText}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: RSVP & WHATSAPP ADMIN */}
          {activeTab === 'rsvp' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Pengaturan WhatsApp Admin RSVP</h2>
                <p className="text-xs text-stone-400">
                  Setiap kali tamu mengisi form RSVP di website, data akan otomatis terhubung ke nomor WhatsApp admin ini!
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">
                      Nomor WhatsApp Admin (Penerima Notifikasi)
                    </label>
                    <input
                      type="text"
                      value={formData.adminSettings.adminWhatsapp}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adminSettings: {
                            ...formData.adminSettings,
                            adminWhatsapp: e.target.value,
                          },
                        })
                      }
                      placeholder="081234567890 atau 6281234567890"
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-amber-300 font-mono text-sm"
                    />
                    <p className="text-[10px] text-stone-500 mt-1">
                      Bisa format 08... atau 628... akan otomatis dikonversi ke tautan WhatsApp internasional.
                    </p>
                  </div>

                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">
                      Label Template Notifikasi
                    </label>
                    <input
                      type="text"
                      value={formData.adminSettings.waTemplate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          adminSettings: {
                            ...formData.adminSettings,
                            waTemplate: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: MUSIC */}
          {activeTab === 'music' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Pengaturan Musik Latar</h2>
                <p className="text-xs text-stone-400">
                  Atur lagu instrumental pernikahan dan opsi autoplay saat tamu menekan Buka Undangan.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4 text-xs">
                <div>
                  <label className="text-stone-300 font-semibold mb-1 block">Judul Lagu</label>
                  <input
                    type="text"
                    value={formData.music.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, title: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-300 font-semibold mb-1 block">Artis / Musisi</label>
                  <input
                    type="text"
                    value={formData.music.artist}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, artist: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                  />
                </div>
                <div>
                  <label className="text-stone-300 font-semibold mb-1 block">URL Audio MP3</label>
                  <input
                    type="text"
                    value={formData.music.url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, url: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono"
                  />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="autoplayCheck"
                    checked={formData.music.autoPlay}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        music: { ...formData.music, autoPlay: e.target.checked },
                      })
                    }
                    className="w-4 h-4 text-amber-400 rounded focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="autoplayCheck" className="text-stone-200 cursor-pointer">
                    Putar musik otomatis saat tamu membuka amplop undangan
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS & BRANDING */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white">Branding DexxDigital &amp; Keamanan</h2>
                <p className="text-xs text-stone-400">
                  Atur PIN admin untuk perlindungan dashboard dan kontak sosial DexxDigital di bagian footer web.
                </p>
              </div>

              {/* PIN Settings */}
              <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-3">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  PIN Akses Admin CMS
                </h3>
                <div className="max-w-xs text-xs">
                  <label className="text-stone-300 font-semibold mb-1 block">Ganti PIN</label>
                  <input
                    type="text"
                    maxLength={8}
                    value={formData.adminSettings.pin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        adminSettings: {
                          ...formData.adminSettings,
                          pin: e.target.value,
                        },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-amber-300 font-mono text-center tracking-widest text-base"
                  />
                </div>
              </div>

              {/* DexxDigital Social Links */}
              <div className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 space-y-4">
                <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                  Kontak &amp; Sosial Media Pengembang (DexxDigital)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Nama Pengembang</label>
                    <input
                      type="text"
                      value={formData.socialLinks.developerName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            developerName: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Link TikTok</label>
                    <input
                      type="text"
                      value={formData.socialLinks.tiktokUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            tiktokUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Link Shopee</label>
                    <input
                      type="text"
                      value={formData.socialLinks.shopeeUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            shopeeUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-stone-300 font-semibold mb-1 block">Link Instagram</label>
                    <input
                      type="text"
                      value={formData.socialLinks.instagramUrl}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          socialLinks: {
                            ...formData.socialLinks,
                            instagramUrl: e.target.value,
                          },
                        })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-stone-950 border border-stone-800 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Reset to Default */}
              <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-stone-300 block">Reset Konfigurasi</span>
                  <span className="text-[11px] text-stone-500">
                    Kembalikan seluruh isi website ke data default awal DexxDigital.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke default awal?')) {
                      onResetDefault();
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition-colors cursor-pointer"
                >
                  Reset ke Default
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
