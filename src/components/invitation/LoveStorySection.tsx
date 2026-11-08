import React from 'react';
import { Heart } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';

interface LoveStorySectionProps {
  config: WeddingConfig;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ config }) => {
  if (!config.loveStory || config.loveStory.length === 0) return null;

  return (
    <section className="relative py-16 px-4 max-w-2xl mx-auto select-none space-y-10">
      {/* Section Header */}
      <div className="text-center space-y-2">
        <div className="inline-block px-3 py-1 rounded-full text-[11px] uppercase tracking-widest bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
          Perjalanan Kami
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif-luxury font-bold text-white tracking-tight">
          Kisah Cinta
        </h2>
        <p className="text-xs text-stone-300 max-w-md mx-auto">
          Setiap pertemuan adalah takdir, setiap langkah adalah cerita, dan pernikahan adalah awal dari keabadian.
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-amber-500/30 space-y-8 my-6 ml-2 sm:ml-4">
        {config.loveStory.map((item, index) => (
          <div key={item.id || index} className="relative group">
            {/* Timeline Heart Dot */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-7 h-7 rounded-full bg-stone-950 border-2 border-amber-400 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-300">
              <Heart className="w-3.5 h-3.5 text-amber-400 group-hover:text-stone-900 fill-amber-400 transition-colors" />
            </div>

            {/* Story Card */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-amber-400/30 transition-all duration-300 backdrop-blur-md space-y-2 shadow-lg">
              <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {item.yearOrDate}
              </div>
              <h3 className="text-lg font-serif-luxury font-bold text-white tracking-wide">
                {item.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                {item.story}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
