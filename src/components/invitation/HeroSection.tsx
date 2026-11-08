import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronDown, Heart } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import {
  THEME_CONFIGS,
  calculateTimeRemaining,
  formatIndonesianDate,
} from '../../utils/weddingUtils';
import { CoupleIllustration } from '../animated/CoupleIllustration';

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.jawa;

  // Live countdown update
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeRemaining(config.countdownDate)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(config.countdownDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [config.countdownDate]);

  // Google Calendar Link generator
  const handleAddToCalendar = () => {
    const title = encodeURIComponent(
      `Pernikahan ${config.groom.shortName} & ${config.bride.shortName}`
    );
    const details = encodeURIComponent(
      `Akad & Resepsi Pernikahan ${config.groom.fullName} & ${config.bride.fullName}. Lokasi: ${config.events.akad.locationName}`
    );
    const location = encodeURIComponent(config.events.akad.address);
    // Parse target date YYYYMMDDTHHMMSSZ
    const startDate = config.countdownDate.replace(/[-:]/g, '').split('.')[0] + 'Z';
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startDate}/${startDate}`;
    window.open(calUrl, '_blank');
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-between py-12 px-4 text-center select-none overflow-hidden">
      {/* Top Tagline / Culture Badge */}
      <div className="space-y-2 z-10 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.25em] uppercase bg-white/5 border border-amber-400/30 text-amber-300 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>The Wedding Celebration</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        </div>
        <p className="text-xs uppercase tracking-widest text-stone-300 font-light">
          Dengan memohon rahmat &amp; ridho Allah SWT
        </p>
      </div>

      {/* Main 3D Animated Couple Holding Hands */}
      <div className="relative my-4 z-10 flex flex-col items-center">
        <CoupleIllustration themeId={config.theme} variant="hero" />
        <div className="text-[11px] text-amber-200/80 uppercase tracking-widest font-medium mt-1">
          {theme.badge}
        </div>
      </div>

      {/* Couple Titles */}
      <div className="space-y-3 z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif-luxury font-bold tracking-tight text-white drop-shadow-lg">
          {config.groom.shortName}{' '}
          <span className="font-script text-4xl sm:text-5xl text-amber-300 mx-2">
            &amp;
          </span>{' '}
          {config.bride.shortName}
        </h1>

        <div className="flex items-center justify-center gap-2 text-stone-300 text-xs sm:text-sm tracking-widest uppercase">
          <Calendar className="w-4 h-4 text-amber-400" />
          <span>{formatIndonesianDate(config.events.akad.date)}</span>
        </div>
      </div>

      {/* Live 3D Countdown Glassmorphism Timer */}
      <div className="w-full max-w-sm z-10 mt-6">
        <div className="grid grid-cols-4 gap-2.5 p-3 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md shadow-xl">
          {[
            { label: 'Hari', value: timeLeft.days },
            { label: 'Jam', value: timeLeft.hours },
            { label: 'Menit', value: timeLeft.minutes },
            { label: 'Detik', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider mt-0.5">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Add to Calendar Button */}
        <div className="mt-4">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-amber-200 bg-white/5 hover:bg-white/10 border border-amber-400/30 transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Simpan Tanggal ke Google Calendar</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="z-10 mt-6 animate-bounce text-stone-400 text-xs flex flex-col items-center gap-1 opacity-75">
        <span className="text-[10px] uppercase tracking-widest">Scroll Kebawah</span>
        <ChevronDown className="w-4 h-4 text-amber-300" />
      </div>
    </section>
  );
};
