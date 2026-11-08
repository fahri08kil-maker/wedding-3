import React, { useMemo } from 'react';
import { WeddingThemeId } from '../../types/wedding';
import { THEME_CONFIGS } from '../../utils/weddingUtils';
import { CoupleIllustration } from './CoupleIllustration';

interface BackgroundAtmosphereProps {
  themeId: WeddingThemeId;
}

export const BackgroundAtmosphere: React.FC<BackgroundAtmosphereProps> = ({ themeId }) => {
  const theme = THEME_CONFIGS[themeId] || THEME_CONFIGS.jawa;

  // Generate deterministic floating particles/petals
  const particles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: (i % 3) * 6 + 8,
      left: `${(i * 19) % 96}%`,
      delay: `${(i * 0.7) % 8}s`,
      duration: `${14 + ((i * 3) % 10)}s`,
      opacity: 0.15 + ((i % 4) * 0.1),
      rotate: (i * 45) % 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Dynamic Base Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${theme.bgGradient} transition-colors duration-1000`}
      />

      {/* Radial ambient lighting */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${theme.primaryColor}22 0%, transparent 60%)`,
        }}
      />

      {/* BACKGROUND COUPLE HOLDING HANDS WATERMARK / SILHOUETTE */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 blur-[1px] transform scale-125 translate-y-16 pointer-events-none">
        <CoupleIllustration themeId={themeId} variant="hero" interactiveTilt={false} />
      </div>

      {/* Cultural Motif Accent Silhouettes */}
      {themeId === 'jawa' && (
        <div className="absolute inset-0 opacity-15 flex justify-between items-center px-4">
          {/* Wayang Gunungan Outline Left */}
          <svg className="w-48 h-96 text-amber-500/30" viewBox="0 0 100 200" fill="currentColor">
            <path d="M50 0 L90 80 L75 140 L95 180 L50 200 L5 180 L25 140 L10 80 Z" opacity="0.3" />
            <path d="M50 20 L80 85 L65 140 L85 175 L50 190 L15 175 L35 140 L20 85 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {/* Wayang Gunungan Outline Right */}
          <svg className="w-48 h-96 text-amber-500/30 transform scale-x-[-1]" viewBox="0 0 100 200" fill="currentColor">
            <path d="M50 0 L90 80 L75 140 L95 180 L50 200 L5 180 L25 140 L10 80 Z" opacity="0.3" />
            <path d="M50 20 L80 85 L65 140 L85 175 L50 190 L15 175 L35 140 L20 85 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {themeId === 'sunda' && (
        <div className="absolute inset-x-0 top-0 h-48 opacity-20 flex justify-center">
          <svg className="w-full max-w-lg h-full text-slate-300" viewBox="0 0 400 120" fill="none" stroke="currentColor">
            <path d="M0 60 Q200 -20 400 60 M50 70 Q200 0 350 70" strokeWidth="1.5" />
            <circle cx="200" cy="30" r="12" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {themeId === 'minang' && (
        <div className="absolute inset-x-0 top-0 h-40 opacity-20 flex justify-center">
          {/* Rumah Gadang Gonjong Roof Curves */}
          <svg className="w-full max-w-md h-full text-amber-500" viewBox="0 0 400 100" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 90 Q80 10 140 80 Q200 10 260 80 Q320 10 380 90" />
          </svg>
        </div>
      )}

      {/* Floating Flower Petals and Gold Dust */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none transition-transform"
          style={{
            width: `${p.size}px`,
            height: `${p.size * 1.3}px`,
            left: p.left,
            top: '-20px',
            opacity: p.opacity,
            backgroundColor:
              themeId === 'sunda'
                ? '#ffffff'
                : themeId === 'jawa' || themeId === 'minang'
                ? '#fbbf24'
                : themeId === 'islamic'
                ? '#34d399'
                : '#fbcfe8',
            borderRadius: '60% 40% 70% 30% / 60% 30% 70% 40%',
            boxShadow: `0 0 8px ${theme.primaryColor}66`,
            animation: `floatingPetal ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}

      {/* Subtle Luxury Film Grain / Noise Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03]" />
    </div>
  );
};
