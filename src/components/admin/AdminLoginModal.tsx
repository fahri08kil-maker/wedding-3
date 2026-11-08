import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle } from 'lucide-react';

interface AdminLoginModalProps {
  correctPin: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  correctPin,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === correctPin || pin === '1234') {
      setError(false);
      setPin('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-sm rounded-3xl bg-stone-950 border border-amber-400/30 p-6 text-center shadow-2xl space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full bg-white/5 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-300">
          <Lock className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold font-serif-luxury text-white">
            Admin CMS Tersembunyi
          </h3>
          <p className="text-xs text-stone-400">
            Masukkan PIN keamanan untuk mengedit seluruh konten undangan pernikahan (Cloud Firestore).
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5 text-left">
            <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              <span>PIN Akses Admin</span>
            </label>
            <input
              type="password"
              autoFocus
              maxLength={8}
              value={pin}
              onChange={(e) => {
                setPin(e.target.value);
                setError(false);
              }}
              placeholder="PIN default: 1234"
              className="w-full text-center tracking-[0.4em] font-mono text-xl py-3 px-4 rounded-xl bg-white/5 border border-white/15 text-amber-200 focus:outline-none focus:border-amber-400"
            />
          </div>

          {error && (
            <div className="flex items-center gap-1.5 p-2.5 rounded-lg bg-rose-500/20 text-rose-300 text-xs justify-center">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>PIN salah! Silakan coba lagi. (Default: 1234)</span>
            </div>
          )}

          <div className="pt-2 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl text-xs font-semibold text-stone-300 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl text-xs font-bold text-stone-900 bg-amber-400 hover:bg-amber-300 transition-colors shadow-md cursor-pointer"
            >
              Masuk CMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
