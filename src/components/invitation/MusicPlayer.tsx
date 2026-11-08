import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { MusicConfig } from '../../types/wedding';

interface MusicPlayerProps {
  music: MusicConfig;
  autoPlayTrigger?: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ music, autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (autoPlayTrigger && audioRef.current && !isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log('Autoplay prevented by browser:', e));
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.error(e));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={music.url}
        loop
        preload="auto"
      />

      {/* Floating Vinyl Music Disc Button */}
      <div className="fixed bottom-6 right-5 z-40 flex items-center gap-2 select-none">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl cursor-pointer ${
            isPlaying
              ? 'bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-100 text-stone-900 border-2 border-amber-300 animate-spin-slow'
              : 'bg-stone-900/90 text-amber-300 border border-white/20 hover:scale-105'
          }`}
          style={{
            boxShadow: isPlaying ? '0 0 20px rgba(234, 179, 8, 0.6)' : 'none',
          }}
        >
          {isPlaying ? (
            <Music className="w-5 h-5 text-stone-950 animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-stone-400" />
          )}

          {/* Mini Center Vinyl Hole */}
          <span className="absolute w-2 h-2 rounded-full bg-stone-950 border border-amber-300" />
        </button>
      </div>
    </>
  );
};
