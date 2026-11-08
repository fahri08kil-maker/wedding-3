import React, { useState, useEffect } from 'react';
import { Gift, Copy, Check, CreditCard, QrCode, X, Download } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';

interface DigitalGiftSectionProps {
  config: WeddingConfig;
}

export const DigitalGiftSection: React.FC<DigitalGiftSectionProps> = ({ config }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [imgError, setImgError] = useState(false);

  const { banks, qrisImageUrl, qrisName, showQris = true, giftAddress } = config.gifts;
  const qrisDisplayName = qrisName || `Wedding ${config.groom.shortName} & ${config.bride.shortName}`;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Close modal on Escape key press
  useEffect(() => {
    if (!showQrisModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowQrisModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showQrisModal]);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (showQrisModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showQrisModal]);

  return (
    <section className="relative py-16 px-4 max-w-2xl mx-auto space-y-10 select-none">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
          Tanda Kasih
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
          Amplop Digital &amp; Kado
        </h2>
        <p className="text-xs text-stone-300 max-w-md mx-auto">
          Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan kado kasih, Anda dapat menyalurkannya melalui:
        </p>
      </div>

      {/* Bank Account Cards & QRIS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {banks.map((bank) => (
          <div
            key={bank.id}
            className="p-5 rounded-3xl bg-black/50 border border-white/10 hover:border-amber-400/30 transition-all backdrop-blur-md space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/20">
                {bank.bankName}
              </span>
              <CreditCard className="w-5 h-5 text-stone-400" />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-stone-400">Nomor Rekening</p>
              <p className="text-lg font-mono font-bold text-white tracking-wider">
                {bank.accountNumber}
              </p>
              <p className="text-xs text-amber-200/90 font-medium">
                a.n. {bank.accountHolder}
              </p>
            </div>

            <button
              onClick={() => handleCopy(bank.accountNumber, bank.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-900 bg-amber-300 hover:bg-amber-200 transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              {copiedId === bank.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-800" />
                  <span>Tersalin ke Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-800" />
                  <span>Salin No. Rekening</span>
                </>
              )}
            </button>
          </div>
        ))}

        {/* QRIS Card (Only shown if enabled) */}
        {showQris && (
          <div className="p-5 rounded-3xl bg-black/50 border border-white/10 hover:border-rose-400/30 transition-all backdrop-blur-md space-y-4 shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono tracking-widest uppercase px-2.5 py-1 rounded-lg bg-rose-400/10 text-rose-300 border border-rose-400/20">
                QRIS
              </span>
              <QrCode className="w-5 h-5 text-rose-400" />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-stone-400">Pembayaran Non-Tunai</p>
              <p className="text-base font-bold text-white tracking-wide">
                Scan QRIS Amplop
              </p>
              <p className="text-xs text-stone-300 truncate font-medium">
                {qrisDisplayName}
              </p>
            </div>

            <button
              onClick={() => setShowQrisModal(true)}
              className="w-full inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-stone-900 bg-rose-300 hover:bg-rose-200 transition-colors shadow-sm cursor-pointer active:scale-95"
            >
              <QrCode className="w-3.5 h-3.5 text-stone-800" />
              <span>Tampilkan Kode QRIS</span>
            </button>
          </div>
        )}
      </div>

      {/* Physical Gift Delivery Address */}
      {giftAddress && (
        <div className="p-6 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-md shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-amber-300 text-sm font-bold">
            <Gift className="w-4 h-4 text-amber-400" />
            <span>Kirim Kado Fisik</span>
          </div>

          <div className="space-y-1 text-xs text-stone-300">
            <p className="font-semibold text-stone-100">{giftAddress.receiverName}</p>
            <p className="text-amber-200">{giftAddress.phone}</p>
            <p className="leading-relaxed">{giftAddress.fullAddress}</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleCopy(giftAddress.fullAddress, 'address')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-stone-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer active:scale-95"
            >
              {copiedId === 'address' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-300" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* QRIS Modal with guaranteed easy dismissal (click outside, X button, Tutup button, and Esc key) */}
      {showQrisModal && (
        <div
          onClick={() => setShowQrisModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in cursor-pointer overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="qris-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-stone-950 border border-amber-400/40 rounded-3xl p-5 sm:p-6 max-w-sm w-full text-center space-y-4 shadow-2xl my-auto cursor-default max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header with Close Button */}
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="text-left">
                <span className="text-[10px] uppercase font-mono tracking-widest text-rose-400 font-bold block">
                  QRIS Pembayaran
                </span>
                <h3 id="qris-title" className="text-base font-bold font-serif-luxury text-white">
                  Amplop Digital
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup QRIS"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Merchant / Receiver Info */}
            <div className="bg-stone-900/60 rounded-xl p-2.5 border border-white/5">
              <p className="text-[11px] text-stone-400">Penerima Dana:</p>
              <p className="text-xs font-bold text-amber-300 tracking-wide">
                {qrisDisplayName}
              </p>
            </div>

            {/* QR Code Display (Image if available, else high-fidelity QRIS SVG) */}
            <div className="p-4 bg-white rounded-2xl mx-auto inline-block shadow-lg max-w-[240px] w-full">
              {qrisImageUrl && !imgError ? (
                <img
                  src={qrisImageUrl}
                  alt={`QRIS ${qrisDisplayName}`}
                  onError={() => setImgError(true)}
                  className="w-full h-auto max-h-56 object-contain rounded-lg mx-auto"
                />
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-1.5 mb-1 text-[10px] font-bold text-stone-800">
                    <span className="font-black text-rose-600 tracking-wider">QRIS</span>
                    <span className="text-[9px] text-stone-500 uppercase">GPN</span>
                  </div>
                  <svg className="w-44 h-44 text-stone-900 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                    {/* QR Corner Markers */}
                    <rect x="5" y="5" width="26" height="26" rx="4" />
                    <rect x="9" y="9" width="18" height="18" fill="white" />
                    <rect x="13" y="13" width="10" height="10" />

                    <rect x="69" y="5" width="26" height="26" rx="4" />
                    <rect x="73" y="9" width="18" height="18" fill="white" />
                    <rect x="77" y="13" width="10" height="10" />

                    <rect x="5" y="69" width="26" height="26" rx="4" />
                    <rect x="9" y="73" width="18" height="18" fill="white" />
                    <rect x="13" y="77" width="10" height="10" />

                    {/* QR Center Data Dots */}
                    <rect x="36" y="10" width="8" height="8" />
                    <rect x="48" y="18" width="6" height="6" />
                    <rect x="42" y="36" width="16" height="16" rx="3" fill="#e11d48" />
                    <rect x="10" y="38" width="6" height="6" />
                    <rect x="22" y="46" width="8" height="6" />
                    <rect x="68" y="40" width="10" height="6" />
                    <rect x="82" y="50" width="8" height="8" />
                    <rect x="38" y="62" width="10" height="8" />
                    <rect x="52" y="70" width="8" height="8" />
                    <rect x="66" y="76" width="12" height="10" />
                    <rect x="82" y="80" width="6" height="6" />
                  </svg>
                  <p className="text-[9px] text-stone-500 uppercase font-mono">
                    Scan Bebas Biaya Admin
                  </p>
                </div>
              )}
            </div>

            <p className="text-[11px] text-stone-400 leading-relaxed">
              Dapat di-scan dengan GoPay, OVO, Dana, ShopeePay, LinkAja, BCA, Mandiri, BRI, atau aplikasi perbankan apa pun.
            </p>

            {/* Action Buttons: Download image (if URL) and Close */}
            <div className="flex gap-2 pt-2">
              {qrisImageUrl && !imgError && (
                <a
                  href={qrisImageUrl}
                  download="QRIS-Wedding-Amplop.png"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold text-stone-200 bg-stone-800 hover:bg-stone-700 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh QR</span>
                </a>
              )}
              <button
                type="button"
                onClick={() => setShowQrisModal(false)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-stone-900 bg-amber-300 hover:bg-amber-200 transition-colors cursor-pointer active:scale-95 shadow-md"
              >
                Tutup Jendela
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
