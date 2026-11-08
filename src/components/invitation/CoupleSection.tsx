import React from 'react';
import { Heart, Instagram } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { THEME_CONFIGS } from '../../utils/weddingUtils';

interface CoupleSectionProps {
  config: WeddingConfig;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ config }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.jawa;

  return (
    <section className="relative py-16 px-4 max-w-2xl mx-auto space-y-12 select-none">
      {/* Holy Verse / Quote Card */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-black/40 border border-amber-400/25 backdrop-blur-md text-center shadow-xl">
        <div className="flex justify-center items-center gap-2 mb-3">
          <span className="w-6 h-[1px] bg-amber-400/40" />
          <Heart className="w-4 h-4 text-amber-400 fill-amber-400/20" />
          <span className="w-6 h-[1px] bg-amber-400/40" />
        </div>
        <p className="text-sm sm:text-base italic text-stone-200 leading-relaxed font-serif-luxury">
          &ldquo;{config.quote.verse}&rdquo;
        </p>
        <p className="text-xs font-semibold text-amber-300 uppercase tracking-widest mt-4">
          — {config.quote.source} —
        </p>
      </div>

      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
          Pasangan Mempelai
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
          Sang Pengantin
        </h2>
        <p className="text-xs text-stone-300 max-w-md mx-auto">
          Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan, mempertemukan dua insan dalam ikatan suci pernikahan.
        </p>
      </div>

      {/* Couple Profile Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* GROOM CARD */}
        <div className="relative p-6 rounded-3xl bg-black/50 border border-white/10 hover:border-amber-400/40 transition-all duration-300 backdrop-blur-md text-center space-y-4 group">
          {/* Animated Avatar */}
          <div className="relative mx-auto w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-500 to-amber-200 shadow-lg flex items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
              <span className="text-4xl font-serif-luxury font-bold text-amber-300 group-hover:scale-110 transition-transform">
                {config.groom.shortName.charAt(0)}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
              {config.groom.fullName}
            </h3>
            <p className="text-xs font-semibold text-amber-300 tracking-wider">
              — {config.groom.shortName} —
            </p>
          </div>

          <div className="text-xs text-stone-300 space-y-1">
            <p className="font-light">{config.groom.childOrderText}</p>
            <p className="font-semibold text-stone-100">{config.groom.fatherName}</p>
            <p className="font-light text-[11px]">&amp;</p>
            <p className="font-semibold text-stone-100">{config.groom.motherName}</p>
          </div>

          {config.groom.instagram && (
            <div className="pt-2">
              <a
                href={`https://instagram.com/${config.groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-amber-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@{config.groom.instagram.replace('@', '')}</span>
              </a>
            </div>
          )}
        </div>

        {/* BRIDE CARD */}
        <div className="relative p-6 rounded-3xl bg-black/50 border border-white/10 hover:border-amber-400/40 transition-all duration-300 backdrop-blur-md text-center space-y-4 group">
          {/* Animated Avatar */}
          <div className="relative mx-auto w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-amber-200 to-rose-400 shadow-lg flex items-center justify-center overflow-hidden">
            <div className="w-full h-full rounded-full bg-stone-950 flex items-center justify-center">
              <span className="text-4xl font-serif-luxury font-bold text-rose-300 group-hover:scale-110 transition-transform">
                {config.bride.shortName.charAt(0)}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-serif-luxury font-bold text-white">
              {config.bride.fullName}
            </h3>
            <p className="text-xs font-semibold text-amber-300 tracking-wider">
              — {config.bride.shortName} —
            </p>
          </div>

          <div className="text-xs text-stone-300 space-y-1">
            <p className="font-light">{config.bride.childOrderText}</p>
            <p className="font-semibold text-stone-100">{config.bride.fatherName}</p>
            <p className="font-light text-[11px]">&amp;</p>
            <p className="font-semibold text-stone-100">{config.bride.motherName}</p>
          </div>

          {config.bride.instagram && (
            <div className="pt-2">
              <a
                href={`https://instagram.com/${config.bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-amber-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-pink-400" />
                <span>@{config.bride.instagram.replace('@', '')}</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
