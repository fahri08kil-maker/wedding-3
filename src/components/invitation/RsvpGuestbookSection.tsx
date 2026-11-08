import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, MessageSquare, Users, AlertCircle } from 'lucide-react';
import { WeddingConfig, RsvpItem } from '../../types/wedding';
import { submitRsvp, subscribeToRsvps } from '../../services/weddingService';
import { generateAdminWhatsappRsvpUrl } from '../../utils/weddingUtils';

interface RsvpGuestbookSectionProps {
  config: WeddingConfig;
  defaultGuestName?: string;
}

export const RsvpGuestbookSection: React.FC<RsvpGuestbookSectionProps> = ({
  config,
  defaultGuestName = '',
}) => {
  const [name, setName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successStatus, setSuccessStatus] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Live wishes list from Firestore
  const [wishes, setWishes] = useState<RsvpItem[]>([]);

  useEffect(() => {
    if (defaultGuestName && !name) {
      setName(defaultGuestName);
    }
  }, [defaultGuestName]);

  // Subscribe to real-time Cloud Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeToRsvps((list) => {
      setWishes(list);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorStatus(null);

    if (!name.trim()) {
      setErrorStatus('Harap isi nama Anda.');
      return;
    }
    if (!message.trim()) {
      setErrorStatus('Harap tuliskan doa atau ucapan restu Anda.');
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Save to Cloud Firestore (No LocalStorage)
      await submitRsvp({
        name: name.trim(),
        attendance,
        guestCount: attendance === 'hadir' ? guestCount : 1,
        message: message.trim(),
      });

      // 2. Fire celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#facc15', '#fbbf24', '#f43f5e', '#38bdf8'],
      });

      setSuccessStatus('Konfirmasi dan ucapan Anda berhasil tersimpan di Cloud!');

      // 3. Automatically trigger WhatsApp RSVP link to Admin
      const waUrl = generateAdminWhatsappRsvpUrl(
        config.adminSettings.adminWhatsapp,
        name.trim(),
        attendance,
        attendance === 'hadir' ? guestCount : 1,
        message.trim(),
        config.bride.shortName,
        config.groom.shortName
      );

      // Open WhatsApp notification in new tab
      window.open(waUrl, '_blank');

      // Clear message field
      setMessage('');
    } catch (err) {
      console.error(err);
      setErrorStatus('Gagal mengirim ke database cloud. Silakan coba kembali.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 px-4 max-w-2xl mx-auto space-y-10 select-none">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
          Kehadiran &amp; Doa
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
          RSVP &amp; Buku Tamu
        </h2>
        <p className="text-xs text-stone-300 max-w-md mx-auto">
          Konfirmasikan kehadiran Anda dan kirimkan doa restu. Konfirmasi akan terhubung otomatis langsung ke WhatsApp panitia/admin.
        </p>
      </div>

      {/* RSVP Submission Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-2xl space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Guest Name */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-stone-200">
              Nama Lengkap <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Budi Santoso &amp; Keluarga"
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Attendance Selection */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-stone-200">
              Konfirmasi Kehadiran <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setAttendance('hadir')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  attendance === 'hadir'
                    ? 'bg-amber-400 text-stone-900 border-amber-400 shadow-md font-bold'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Hadir
              </button>
              <button
                type="button"
                onClick={() => setAttendance('ragu')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  attendance === 'ragu'
                    ? 'bg-amber-300/80 text-stone-900 border-amber-300 font-bold'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Masih Ragu
              </button>
              <button
                type="button"
                onClick={() => setAttendance('tidak_hadir')}
                className={`py-2 px-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  attendance === 'tidak_hadir'
                    ? 'bg-rose-500 text-white border-rose-500 font-bold'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10'
                }`}
              >
                Berhalangan
              </button>
            </div>
          </div>

          {/* Guest Count (if attending) */}
          {attendance === 'hadir' && (
            <div className="space-y-1.5 text-left animate-fade-in">
              <label className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>Jumlah Kehadiran (Orang)</span>
              </label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-stone-900 border border-white/15 text-white text-sm focus:outline-none focus:border-amber-400"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
                <option value={5}>5+ Orang</option>
              </select>
            </div>
          )}

          {/* Wishes Message */}
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
              <span>Ucapan &amp; Doa Restu</span> <span className="text-rose-400">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tuliskan doa restu yang tulus untuk kedua mempelai..."
              className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-stone-400 text-sm focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Error Message */}
          {errorStatus && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs text-left">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorStatus}</span>
            </div>
          )}

          {/* Success Message */}
          {successStatus && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs text-left">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successStatus}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider text-stone-900 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all transform active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-stone-900 border-t-transparent animate-spin" />
                <span>Menyimpan ke Cloud...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Kirim RSVP &amp; Notifikasi WhatsApp</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Live Guestbook / Public Wishes Wall */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-lg font-serif-luxury font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" />
            <span>Doa &amp; Ucapan Sahabat</span>
          </h3>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-stone-300 font-mono">
            {wishes.length} Pesan
          </span>
        </div>

        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
          {wishes.length === 0 ? (
            <div className="p-8 rounded-2xl bg-black/30 border border-white/5 text-center text-xs text-stone-400">
              Jadilah yang pertama memberikan ucapan dan doa restu untuk Arya &amp; Laras ✨
            </div>
          ) : (
            wishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-sm text-left space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-amber-300">
                      {w.name}
                    </span>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                        w.attendance === 'hadir'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : w.attendance === 'ragu'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {w.attendance === 'hadir'
                        ? 'Hadir'
                        : w.attendance === 'ragu'
                        ? 'Ragu'
                        : 'Berhalangan'}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {w.createdAt ? new Date(w.createdAt).toLocaleDateString('id-ID') : ''}
                  </span>
                </div>
                <p className="text-xs text-stone-200 leading-relaxed">
                  {w.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
