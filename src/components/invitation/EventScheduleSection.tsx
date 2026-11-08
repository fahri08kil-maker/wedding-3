import React from 'react';
import { Calendar, Clock, MapPin, ExternalLink, Video } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';
import { THEME_CONFIGS, formatIndonesianDate } from '../../utils/weddingUtils';

interface EventScheduleSectionProps {
  config: WeddingConfig;
}

export const EventScheduleSection: React.FC<EventScheduleSectionProps> = ({ config }) => {
  const theme = THEME_CONFIGS[config.theme] || THEME_CONFIGS.jawa;
  const { akad, resepsi, ngunduhMantu } = config.events;

  return (
    <section className="relative py-16 px-4 max-w-2xl mx-auto space-y-10 select-none">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
          Agenda Bahagia
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
          Waktu &amp; Lokasi Acara
        </h2>
        <p className="text-xs text-stone-300 max-w-md mx-auto">
          Insya Allah rangkaian acara pernikahan kami akan diselenggarakan pada:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AKAD NIKAH CARD */}
        <div className="relative p-6 sm:p-7 rounded-3xl bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-6 transform hover:-translate-y-1 transition-transform duration-300">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              {akad.title}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-stone-200 text-sm font-semibold">
                <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{formatIndonesianDate(akad.date)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300 text-xs">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  Pukul {akad.timeStart} - {akad.timeEnd}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex items-start gap-2 text-stone-100 text-sm font-bold">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{akad.locationName}</span>
              </div>
              <p className="text-xs text-stone-300 pl-6 leading-relaxed">
                {akad.address}
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <a
              href={akad.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-stone-900 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-md cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Petunjuk Lokasi Google Maps</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>

            {akad.streamingUrl && (
              <a
                href={akad.streamingUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-amber-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              >
                <Video className="w-3.5 h-3.5 text-rose-400" />
                <span>Siaran Langsung (Live Streaming)</span>
              </a>
            )}
          </div>
        </div>

        {/* RESEPSI CARD */}
        <div className="relative p-6 sm:p-7 rounded-3xl bg-black/60 border border-amber-400/30 backdrop-blur-md shadow-2xl flex flex-col justify-between space-y-6 transform hover:-translate-y-1 transition-transform duration-300">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-400/20 text-rose-300 border border-rose-400/40">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              {resepsi.title}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2.5 text-stone-200 text-sm font-semibold">
                <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{formatIndonesianDate(resepsi.date)}</span>
              </div>
              <div className="flex items-center gap-2.5 text-stone-300 text-xs">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>
                  Pukul {resepsi.timeStart} - {resepsi.timeEnd}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 space-y-1.5">
              <div className="flex items-start gap-2 text-stone-100 text-sm font-bold">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{resepsi.locationName}</span>
              </div>
              <p className="text-xs text-stone-300 pl-6 leading-relaxed">
                {resepsi.address}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={resepsi.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-stone-900 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-200 hover:to-amber-400 transition-all shadow-md cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Petunjuk Lokasi Google Maps</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Optional Ngunduh Mantu Card */}
      {ngunduhMantu && ngunduhMantu.title && (
        <div className="relative p-6 rounded-3xl bg-black/50 border border-white/10 backdrop-blur-md shadow-xl text-center space-y-3">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-400/10 text-amber-300">
            {ngunduhMantu.title}
          </div>
          <p className="text-sm font-semibold text-stone-200">
            {formatIndonesianDate(ngunduhMantu.date)} • {ngunduhMantu.timeStart} - {ngunduhMantu.timeEnd}
          </p>
          <p className="text-xs text-stone-300 font-bold">{ngunduhMantu.locationName}</p>
          <p className="text-xs text-stone-400">{ngunduhMantu.address}</p>
          {ngunduhMantu.mapsUrl && (
            <div className="pt-2">
              <a
                href={ngunduhMantu.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-amber-200 bg-white/5 hover:bg-white/10 border border-white/10"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Peta Lokasi</span>
              </a>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
