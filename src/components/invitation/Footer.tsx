import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { WeddingConfig } from '../../types/wedding';

interface FooterProps {
  config: WeddingConfig;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenAdmin }) => {
  const [clickCount, setClickCount] = useState(0);
  const { socialLinks } = config;

  const handleBrandClick = () => {
    const next = clickCount + 1;
    setClickCount(next);
    if (next >= 3) {
      setClickCount(0);
      onOpenAdmin();
    }
  };

  return (
    <footer className="relative z-10 py-16 px-4 text-center border-t border-white/10 select-none bg-black/60 backdrop-blur-md">
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-1">
          <h4 className="text-2xl font-serif-luxury font-bold text-white tracking-wide">
            {config.groom.shortName} &amp; {config.bride.shortName}
          </h4>
          <p className="text-xs text-stone-400 italic">
            Sampai jumpa di hari bahagia kami. Terima kasih atas doa restu Anda.
          </p>
        </div>

        {/* Developer Branding DexxDigital */}
        <div className="pt-4 border-t border-white/5 space-y-3">
          <div className="text-[11px] text-stone-400 tracking-wider">
            Developed &amp; Crafted with{' '}
            <Heart className="w-3.5 h-3.5 inline text-rose-500 fill-rose-500 mx-0.5 animate-pulse" />{' '}
            by{' '}
            <button
              onClick={handleBrandClick}
              className="font-bold text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
              title="DexxDigital"
            >
              {socialLinks.developerName || 'DexxDigital'}
            </button>
          </div>

          {/* Social Links (TikTok, Shopee, Instagram) */}
          <div className="flex items-center justify-center gap-4 pt-1">
            {/* TikTok */}
            {socialLinks.tiktokUrl && (
              <a
                href={socialLinks.tiktokUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok DexxDigital"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white transition-all transform hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.54c-.03 2.06-.82 4.13-2.31 5.62-1.55 1.57-3.79 2.45-6.02 2.37-2.18-.07-4.32-.97-5.83-2.53-1.6-1.64-2.45-3.95-2.36-6.24.08-2.22 1.03-4.38 2.66-5.91 1.62-1.53 3.86-2.34 6.12-2.24.32.01.64.05.96.11V11.2c-.37-.08-.75-.12-1.14-.11-1.39.03-2.73.65-3.6 1.73-.89 1.09-1.28 2.54-1.07 3.94.21 1.39 1.05 2.62 2.29 3.32 1.25.7 2.8.76 4.1.17 1.25-.56 2.08-1.84 2.08-3.21V.02h-2.11z" />
                </svg>
              </a>
            )}

            {/* Shopee */}
            {socialLinks.shopeeUrl && (
              <a
                href={socialLinks.shopeeUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Shopee DexxDigital"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-orange-400 hover:text-orange-300 transition-all transform hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.5 7.5h-2.4c-.4-3.1-2.4-5.5-5.1-5.5s-4.7 2.4-5.1 5.5H4.5c-1.1 0-2 .9-2 2l1.6 11.2c.2 1.1 1.1 1.8 2.2 1.8h11.4c1.1 0 2-.7 2.2-1.8L21.5 9.5c0-1.1-.9-2-2-2zm-7.5-3.5c1.7 0 3.1 1.6 3.4 3.5H8.6c.3-1.9 1.7-3.5 3.4-3.5zm-1.8 11.8c-.8 0-1.4-.4-1.8-1.1l1.3-.8c.2.4.4.6.8.6.4 0 .7-.2.7-.5 0-.4-.3-.6-1-.9-1.1-.4-1.8-1-1.8-2 0-1.1.9-1.9 2.2-1.9.9 0 1.5.3 1.9.9l-1.2.8c-.2-.3-.4-.4-.7-.4-.3 0-.6.2-.6.5 0 .3.3.5.9.8 1.2.5 1.9 1 1.9 2.1 0 1.2-.9 1.9-2.3 1.9z" />
                </svg>
              </a>
            )}

            {/* Instagram */}
            {socialLinks.instagramUrl && (
              <a
                href={socialLinks.instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram DexxDigital"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-pink-400 hover:text-pink-300 transition-all transform hover:scale-110"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
