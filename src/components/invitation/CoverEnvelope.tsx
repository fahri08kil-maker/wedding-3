import React from 'react';
import { MailOpen, Heart } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { THEME_CONFIGS, formatIndonesianDate } from '../../utils/weddingUtils';
import { CoupleIllustration } from '../animated/CoupleIllustration';

interface CoverEnvelopeProps {
  config: WeddingConfig;
  guestName: string;
  onOpenInvitation: () => void;
  isOpen: boolean;
}

export const CoverEnvelope: React.FC<CoverEnvelopeProps> = ({
  config,
  guestName,
  onOpenInvitation,
  isOpen,
}) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.jawa;

  if (isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-hidden transition-all duration-1000">
      {/* Background Animated Atmosphere */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient} opacity-95`}
      />

      {/* Floating Light Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ background: theme.primaryColor }}
        />
        <div
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{ background: theme.secondaryColor, animationDelay: '1.5s' }}
        />
      </div>

      {/* Main Luxury 3D Envelope Card */}
      <div
        className="relative z-10 w-full max-w-md bg-stone-950/85 border border-amber-400/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl flex flex-col items-center justify-between min-h-[580px] max-h-[92vh] overflow-y-auto"
        style={{
          boxShadow: `0 20px 60px -15px ${theme.accentGlow}, 0 0 25px rgba(255, 255, 255, 0.05)`,
        }}
      >
        {/* Top Filigree Accent */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] font-semibold text-amber-300/80 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>The Wedding Invitation</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>

        {/* Traditional / Cultural Badge */}
        <div className="inline-block px-3 py-1 rounded-full text-[11px] tracking-wider uppercase bg-amber-500/10 border border-amber-400/30 text-amber-200">
          {theme.name}
        </div>

        {/* 3D Animated Couple Holding Hands */}
        <div className="my-2 transform transition-transform hover:scale-105 duration-300">
          <CoupleIllustration themeId={config.theme} variant="compact" />
        </div>

        {/* Couple Names */}
        <div className="space-y-1 mb-3">
          <h1 className="text-3xl sm:text-4xl font-serif-luxury font-bold tracking-tight text-white drop-shadow-md">
            {config.groom.shortName} <span className="font-script text-3xl text-amber-300">&</span> {config.bride.shortName}
          </h1>
          <p className="text-xs text-amber-200/70 tracking-widest uppercase">
            {formatIndonesianDate(config.events.akad.date)}
          </p>
        </div>

        {/* Personalized Guest Box */}
        <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 my-2 backdrop-blur-sm">
          <p className="text-[11px] text-stone-300 uppercase tracking-widest font-medium mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-lg font-bold text-amber-200 tracking-wide capitalize">
            {guestName || 'Tamu Undangan'}
          </p>
          <p className="text-[10px] text-stone-400 italic mt-1">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Wax Seal & Open Invitation Button */}
        <div className="mt-4 w-full">
          <button
            onClick={onOpenInvitation}
            className="group relative w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full font-semibold text-stone-900 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 shadow-lg overflow-hidden cursor-pointer"
            style={{
              background: `linear-gradient(135deg, #fef08a 0%, #eab308 50%, #ca8a04 100%)`,
              boxShadow: '0 8px 25px rgba(234, 179, 8, 0.45)',
            }}
          >
            {/* Shimmer Light */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <MailOpen className="w-5 h-5 text-stone-900 transition-transform group-hover:rotate-12" />
            <span className="tracking-wider uppercase text-xs font-bold">
              Buka Undangan
            </span>
            <Heart className="w-4 h-4 text-rose-700 fill-rose-700 animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};
