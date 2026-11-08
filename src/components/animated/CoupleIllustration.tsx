import React, { useState, useEffect } from 'react';
import { WeddingThemeId } from '../../types/wedding';
import { THEME_CONFIGS } from '../../utils/weddingUtils';

interface CoupleIllustrationProps {
  themeId: WeddingThemeId;
  variant?: 'hero' | 'compact' | 'background' | 'avatar';
  className?: string;
  interactiveTilt?: boolean;
}

export const CoupleIllustration: React.FC<CoupleIllustrationProps> = ({
  themeId,
  variant = 'hero',
  className = '',
  interactiveTilt = true,
}) => {
  const theme = THEME_CONFIGS[themeId] || THEME_CONFIGS.jawa;
  const attire = theme.attireColors;

  // Natural blinking effect
  const [isBlinking, setIsBlinking] = useState(false);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3800);
    return () => clearInterval(blinkInterval);
  }, []);

  // 3D tilt effect on mouse movement
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactiveTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12; // -6 to 6 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  const sizeClasses = {
    hero: 'w-72 sm:w-88 md:w-96 h-[340px] sm:h-[400px]',
    compact: 'w-56 h-64',
    background: 'w-full h-full opacity-20 pointer-events-none',
    avatar: 'w-32 h-36',
  }[variant];

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center transition-transform duration-300 ease-out select-none ${sizeClasses} ${className}`}
      style={{
        perspective: '1000px',
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
      }}
    >
      {/* Ambient background soft glow behind couple */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60 pointer-events-none transition-all duration-700 animate-pulse"
        style={{
          background: `radial-gradient(circle, ${theme.primaryColor}33 0%, transparent 70%)`,
        }}
      />

      {/* Floating Sparkles around couple */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-8 left-12 w-2 h-2 rounded-full bg-amber-300 animate-ping opacity-75" />
        <span
          className="absolute top-16 right-10 w-2.5 h-2.5 rounded-full bg-yellow-200 animate-pulse opacity-80"
          style={{ animationDuration: '2.5s' }}
        />
        <span
          className="absolute bottom-24 left-8 w-1.5 h-1.5 rounded-full bg-white animate-bounce opacity-60"
          style={{ animationDuration: '3.2s' }}
        />
        <span
          className="absolute top-24 right-20 w-2 h-2 rounded-full bg-amber-400 animate-ping opacity-60"
          style={{ animationDelay: '1.2s' }}
        />
      </div>

      {/* High-Fidelity Beautiful & Handsome 3D Vector Couple Holding Hands */}
      <svg
        viewBox="0 0 500 540"
        className="w-full h-full drop-shadow-2xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Metallic Foil Gradients */}
          <linearGradient id="goldTrimGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#facc15" />
            <stop offset="80%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#854d0e" />
          </linearGradient>

          <linearGradient id="sundaSilverGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="85%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#64748b" />
          </linearGradient>

          {/* Skin Shading Gradients (Warm, Radiant, Soft 3D Lighting) */}
          <linearGradient id="skinGroom" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#ffe6d5" />
            <stop offset="60%" stopColor="#fcd3b6" />
            <stop offset="100%" stopColor="#f4bc97" />
          </linearGradient>

          <linearGradient id="skinBride" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#fff5ee" />
            <stop offset="55%" stopColor="#ffdfcc" />
            <stop offset="100%" stopColor="#f8cbb0" />
          </linearGradient>

          {/* Eye Gradient */}
          <linearGradient id="eyeGroom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e1b18" />
            <stop offset="60%" stopColor="#3d2817" />
            <stop offset="100%" stopColor="#5c3d23" />
          </linearGradient>

          <linearGradient id="eyeBride" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1a1110" />
            <stop offset="50%" stopColor="#451a03" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Hair Soft Gradient */}
          <linearGradient id="hairSoft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#382d28" />
            <stop offset="50%" stopColor="#221b18" />
            <stop offset="100%" stopColor="#14100e" />
          </linearGradient>

          {/* Ring Sparkle */}
          <radialGradient id="ringSparkle" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Batik Pattern for Groom Jarik */}
          <pattern id="batikParang" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="#78350f" />
            <path d="M0 20 L20 0 M-5 5 L5 -5 M15 25 L25 15" stroke="#fef08a" strokeWidth="1.5" opacity="0.65" />
            <circle cx="10" cy="10" r="1.5" fill="#facc15" />
          </pattern>

          {/* Minang Songket Pattern */}
          <pattern id="songketPattern" width="16" height="16" patternUnits="userSpaceOnUse">
            <rect width="16" height="16" fill="#881337" />
            <path d="M8 0 L16 8 L8 16 L0 8 Z" fill="#b91c1c" />
            <circle cx="8" cy="8" r="2.2" fill="#facc15" />
          </pattern>
        </defs>

        {/* ========================================================= */}
        {/* BACK LAYER: HAIR SANGGUL / VEIL BEHIND BRIDE (NO SHADOW ON FACE) */}
        {/* ========================================================= */}
        <g className="bride-back-layer">
          {/* Hair bun positioned gracefully BEHIND the head, NEVER overlapping her face */}
          {themeId !== 'islamic' && (
            <ellipse cx="328" cy="172" rx="32" ry="28" fill="url(#hairSoft)" />
          )}

          {/* Sheer Veil for Casual Modern or Islamic */}
          {themeId === 'casual' && (
            <path
              d="M320 150 Q390 240 400 480 Q330 510 270 480 Q300 240 320 150 Z"
              fill="rgba(255, 255, 255, 0.25)"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
            />
          )}
        </g>

        {/* ========================================================= */}
        {/* GROOM (Pria Tampan & Gagah) - Left Side                     */}
        {/* ========================================================= */}
        <g
          className="groom-group transition-all duration-700 origin-bottom"
          style={{ animation: 'gentleBreathe 4s ease-in-out infinite' }}
        >
          {/* Groom Lower Body / Batik / Trousers */}
          {themeId === 'jawa' || themeId === 'sunda' ? (
            <path
              d="M136 360 L136 510 C136 520, 234 520, 234 510 L234 360 Z"
              fill="url(#batikParang)"
              stroke="#451a03"
              strokeWidth="2"
            />
          ) : themeId === 'minang' ? (
            <path
              d="M136 360 L136 510 C136 520, 234 520, 234 510 L234 360 Z"
              fill="url(#songketPattern)"
              stroke="#7f1d1d"
              strokeWidth="2"
            />
          ) : (
            <path
              d="M136 360 L136 510 C136 520, 180 520, 185 410 L190 510 C190 520, 234 520, 234 360 Z"
              fill="#0f172a"
              stroke="#020617"
              strokeWidth="2"
            />
          )}

          {/* Groom Beskap / Tuxedo Torso */}
          <path
            d="M126 242 C126 220, 240 220, 240 242 L244 385 C244 395, 122 395, 122 385 Z"
            fill={attire.groomBeskap}
            stroke={attire.groomEmbroidery}
            strokeWidth="3"
          />

          {/* Groom Gold or Silver Center Lapel / Regal Buttons */}
          <path
            d="M184 242 L184 388"
            stroke={attire.groomEmbroidery}
            strokeWidth="4"
            strokeDasharray="2, 8"
            strokeLinecap="round"
          />

          {/* Keris on back (Jawa/Minang) */}
          {(themeId === 'jawa' || themeId === 'minang') && (
            <g transform="translate(116, 275) rotate(-28)">
              <path d="M0 0 L-26 -26 L-20 -32 L6 -6 Z" fill="url(#goldTrimGrad)" stroke="#713f12" strokeWidth="2" />
              <circle cx="-26" cy="-26" r="5" fill="#facc15" />
            </g>
          )}

          {/* Ronce Melati Kalung Groom (Jawa / Sunda) */}
          {attire.jasmineRonce && (
            <path
              d="M165 240 Q184 300 202 240"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeDasharray="4, 5"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />
          )}

          {/* Groom Strong Neck */}
          <rect x="174" y="206" width="20" height="26" rx="4" fill="url(#skinGroom)" />

          {/* Groom Handsome Face (Well-proportioned, defined jaw) */}
          <path
            d="M152 170 C152 140, 216 140, 216 170 C216 198, 194 214, 184 216 C174 214, 152 198, 152 170 Z"
            fill="url(#skinGroom)"
          />

          {/* Groom Ears */}
          <ellipse cx="149" cy="176" rx="6.5" ry="10" fill="url(#skinGroom)" />
          <ellipse cx="219" cy="176" rx="6.5" ry="10" fill="url(#skinGroom)" />

          {/* Groom Gentle Charming Smile */}
          <path
            d="M174 196 Q184 204 194 196"
            stroke="#9a3412"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Subtle lower lip glow */}
          <ellipse cx="184" cy="199" rx="3.5" ry="1.2" fill="#ea580c" opacity="0.3" />

          {/* Groom Nose */}
          <path
            d="M183 184 L185 188 L181 188"
            stroke="#c27b4f"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Groom Handsome Eyes (Clean, sparkling, with blinking) */}
          {isBlinking ? (
            <g stroke="#3e2723" strokeWidth="2.8" strokeLinecap="round">
              <path d="M165 177 Q172 178 178 177" />
              <path d="M190 177 Q197 178 203 177" />
            </g>
          ) : (
            <g>
              {/* Left Eye */}
              <ellipse cx="171" cy="176" rx="5" ry="6" fill="url(#eyeGroom)" />
              <circle cx="173" cy="174" r="1.8" fill="#ffffff" />
              <circle cx="169" cy="178" r="0.9" fill="#ffffff" opacity="0.8" />

              {/* Right Eye */}
              <ellipse cx="197" cy="176" rx="5" ry="6" fill="url(#eyeGroom)" />
              <circle cx="199" cy="174" r="1.8" fill="#ffffff" />
              <circle cx="195" cy="178" r="0.9" fill="#ffffff" opacity="0.8" />

              {/* Handsome Groom Eyebrows */}
              <path
                d="M163 166 Q171 162 178 166"
                stroke="#2b1810"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M190 166 Q197 162 205 166"
                stroke="#2b1810"
                strokeWidth="2.8"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Groom Subtle Masculine Cheek Blush */}
          <ellipse cx="163" cy="186" rx="6" ry="3" fill="#f87171" opacity="0.3" />
          <ellipse cx="205" cy="186" rx="6" ry="3" fill="#f87171" opacity="0.3" />

          {/* Groom Headpiece / Hair / Blangkon */}
          {themeId === 'jawa' ? (
            <g id="groomBlangkon">
              {/* Blangkon Batik Cloth sitting neatly on head */}
              <path
                d="M148 164 C148 132, 220 132, 220 164 C220 168, 148 168, 148 164 Z"
                fill="#3e2723"
                stroke="#d97706"
                strokeWidth="2.5"
              />
              <path
                d="M150 164 Q184 150 218 164"
                stroke="#facc15"
                strokeWidth="3"
                fill="none"
              />
              {/* Mondolan on back */}
              <circle cx="145" cy="168" r="8" fill="#292524" />
            </g>
          ) : themeId === 'sunda' ? (
            <g id="groomBendo">
              {/* Sundanese Bendo */}
              <path
                d="M148 164 C148 132, 220 132, 220 164 Z"
                fill="#f8fafc"
                stroke="#94a3b8"
                strokeWidth="2.5"
              />
              <path d="M152 165 Q184 154 216 165" stroke="#64748b" strokeWidth="3" fill="none" />
              {/* Silver brooch on bendo */}
              <circle cx="184" cy="150" r="5" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
            </g>
          ) : themeId === 'minang' ? (
            <g id="groomSaluak">
              {/* Saluak Minangkabau (Folded regal headdress) */}
              <path
                d="M146 162 L158 130 L210 130 L222 162 Z"
                fill="#991b1b"
                stroke="#facc15"
                strokeWidth="2.5"
              />
              <path d="M150 150 L218 150 M155 140 L213 140" stroke="#fde047" strokeWidth="2" />
            </g>
          ) : (
            <g id="groomHairModern">
              {/* Stylish Handsome Modern Haircut */}
              <path
                d="M148 166 C148 128, 220 128, 220 166 C214 150, 185 142, 150 154 Z"
                fill="url(#hairSoft)"
              />
            </g>
          )}

          {/* Groom Left Arm */}
          <path
            d="M126 248 Q104 315 118 365"
            stroke={attire.groomBeskap}
            strokeWidth="22"
            strokeLinecap="round"
            fill="none"
          />

          {/* Groom Right Arm (reaching to hold Bride's hand) */}
          <path
            d="M230 252 Q248 305 252 342"
            stroke={attire.groomBeskap}
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          {/* Groom Hand */}
          <circle cx="253" cy="352" r="10.5" fill="url(#skinGroom)" />
        </g>

        {/* ========================================================= */}
        {/* BRIDE (Wanita Cantik, Anggun & Bersinar) - Right Side       */}
        {/* ========================================================= */}
        <g
          className="bride-group transition-all duration-700 origin-bottom"
          style={{ animation: 'gentleBreathe 4s ease-in-out infinite 0.4s' }}
        >
          {/* Bride Flowing Dress / Kebaya Train */}
          <path
            d="M275 355 L244 520 C244 530, 396 530, 376 520 L335 355 Z"
            fill={attire.brideDress}
            stroke={attire.brideEmbroidery}
            strokeWidth="3"
            className="drop-shadow-md"
          />

          {/* Bride Kebaya Lace & Embroidery Detail */}
          <path
            d="M272 250 C272 236, 344 236, 344 250 L342 375 C342 385, 270 385, 270 375 Z"
            fill={attire.brideDress}
            stroke={attire.brideEmbroidery}
            strokeWidth="2.5"
          />

          {/* Kebaya Center Royal Brooch */}
          <g transform="translate(308, 280)">
            <circle cx="0" cy="0" r="5.5" fill="url(#goldTrimGrad)" stroke="#ca8a04" strokeWidth="1.5" />
            <circle cx="0" cy="13" r="4.5" fill="url(#goldTrimGrad)" stroke="#ca8a04" strokeWidth="1.2" />
            <circle cx="0" cy="24" r="3.5" fill="url(#goldTrimGrad)" stroke="#ca8a04" strokeWidth="1" />
          </g>

          {/* Bride Slender Neck */}
          <rect x="299" y="210" width="18" height="26" rx="4" fill="url(#skinBride)" />

          {/* Sparkling Necklace */}
          <path
            d="M294 232 Q308 242 322 232"
            stroke="url(#goldTrimGrad)"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="2, 3"
          />

          {/* Bride Cantik Head Shape (Clean, glowing, smooth jawline) */}
          <path
            d="M278 170 C278 142, 338 142, 338 170 C338 198, 318 214, 308 216 C298 214, 278 198, 278 170 Z"
            fill="url(#skinBride)"
          />

          {/* Bride Delicate Ears & Sparkling Gold Earrings (Subang) */}
          <ellipse cx="276" cy="178" rx="5.5" ry="8.5" fill="url(#skinBride)" />
          <ellipse cx="340" cy="178" rx="5.5" ry="8.5" fill="url(#skinBride)" />
          <circle cx="276" cy="186" r="3.5" fill="url(#goldTrimGrad)" stroke="#ca8a04" strokeWidth="1" />
          <circle cx="340" cy="186" r="3.5" fill="url(#goldTrimGrad)" stroke="#ca8a04" strokeWidth="1" />

          {/* Clean, Elegant Hairline Framing Forehead (NO BLACK MASK / NO OVAL ON FACE) */}
          <path
            d="M278 164 C285 150, 331 150, 338 164 C330 156, 286 156, 278 164 Z"
            fill="url(#hairSoft)"
          />

          {/* Bride Sweet Smile & Rosy Lips */}
          <path
            d="M301 198 Q308 206 315 198"
            stroke="#e11d48"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Glossy Lower Lip */}
          <ellipse cx="308" cy="201" rx="4" ry="1.5" fill="#f43f5e" opacity="0.6" />

          {/* Cute Nose */}
          <path
            d="M307 186 L309 190 L306 190"
            stroke="#d9825b"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Bride Beautiful Expressive Eyes with Eyelashes & Double Catchlight Sparkle */}
          {isBlinking ? (
            <g stroke="#4c1d24" strokeWidth="2.8" strokeLinecap="round">
              <path d="M292 178 Q298 180 304 178" />
              <path d="M312 178 Q318 180 324 178" />
            </g>
          ) : (
            <g>
              {/* Left Eye */}
              <ellipse cx="297" cy="177" rx="5.2" ry="6.2" fill="url(#eyeBride)" />
              <circle cx="299" cy="175" r="2" fill="#ffffff" />
              <circle cx="295" cy="179" r="1" fill="#ffffff" opacity="0.85" />
              {/* Fluttery Eyelashes */}
              <path
                d="M290 174 Q297 168 304 174"
                stroke="#1c1917"
                strokeWidth="2.6"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M303 172 L306 169" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />

              {/* Right Eye */}
              <ellipse cx="319" cy="177" rx="5.2" ry="6.2" fill="url(#eyeBride)" />
              <circle cx="321" cy="175" r="2" fill="#ffffff" />
              <circle cx="317" cy="179" r="1" fill="#ffffff" opacity="0.85" />
              {/* Fluttery Eyelashes */}
              <path
                d="M312 174 Q319 168 326 174"
                stroke="#1c1917"
                strokeWidth="2.6"
                fill="none"
                strokeLinecap="round"
              />
              <path d="M325 172 L328 169" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />

              {/* Graceful Curved Eyebrows */}
              <path
                d="M290 167 Q297 163 304 167"
                stroke="#4a2511"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
              <path
                d="M312 167 Q319 163 326 167"
                stroke="#4a2511"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Sweet Rosy Blushing Cheeks */}
          <ellipse cx="290" cy="188" rx="7" ry="4" fill="#fb7185" opacity="0.45" />
          <ellipse cx="326" cy="188" rx="7" ry="4" fill="#fb7185" opacity="0.45" />

          {/* ======================================================= */}
          {/* TRADITIONAL HEADDRESSES (CLEANLY RESTING ON TOP OF HEAD)  */}
          {/* ======================================================= */}
          {themeId === 'minang' ? (
            <g id="brideSuntiangMinang">
              {/* GLORIOUS MULTI-TIERED GOLDEN SUNTIANG (RESTING ON TOP, NO MASK ON FACE) */}
              {/* Base Arc */}
              <path
                d="M274 158 Q308 140 342 158"
                stroke="url(#goldTrimGrad)"
                strokeWidth="4"
                fill="none"
              />
              {/* Tier 1 - Spreading Fan of Golden Filigree */}
              <path
                d="M266 156 L278 126 L308 112 L338 126 L350 156 Q308 138 266 156 Z"
                fill="url(#goldTrimGrad)"
                stroke="#b45309"
                strokeWidth="1.8"
                className="drop-shadow-md"
              />
              {/* Tier 2 - Golden Crown Middle Layer */}
              <path
                d="M276 128 L288 98 L308 84 L328 98 L340 128 Q308 110 276 128 Z"
                fill="#fde047"
                stroke="#ca8a04"
                strokeWidth="1.8"
              />
              {/* Tier 3 - Grand Royal Peak */}
              <path
                d="M292 98 L308 64 L324 98 Z"
                fill="url(#goldTrimGrad)"
                stroke="#b45309"
                strokeWidth="2"
              />
              {/* Top Gemstone */}
              <circle cx="308" cy="62" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <circle cx="308" cy="62" r="2.5" fill="#e11d48" />

              {/* Dangling Golden Jurai Tassels on sides */}
              <g stroke="url(#goldTrimGrad)" strokeWidth="2.5" strokeDasharray="1, 4" strokeLinecap="round">
                <line x1="268" y1="158" x2="264" y2="195" />
                <line x1="348" y1="158" x2="352" y2="195" />
              </g>
              <circle cx="264" cy="197" r="3" fill="#facc15" />
              <circle cx="352" cy="197" r="3" fill="#facc15" />
            </g>
          ) : themeId === 'jawa' ? (
            <g id="bridePaesAndCunduk">
              {/* Delicate Gold Paes Prada Border on hairline */}
              <path
                d="M286 160 Q294 152 298 160 Q303 148 308 160 Q313 148 318 160 Q322 152 330 160"
                stroke="#facc15"
                strokeWidth="2.5"
                fill="none"
              />
              {/* 5 Shimmering Cunduk Mentul Golden Pins */}
              <g stroke="url(#goldTrimGrad)" strokeWidth="2.5">
                <line x1="308" y1="142" x2="308" y2="108" />
                <circle cx="308" cy="106" r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <line x1="298" y1="145" x2="288" y2="114" />
                <circle cx="286" cy="112" r="4.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <line x1="318" y1="145" x2="328" y2="114" />
                <circle cx="330" cy="112" r="4.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <line x1="288" y1="150" x2="274" y2="124" />
                <circle cx="272" cy="122" r="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
                <line x1="328" y1="150" x2="342" y2="124" />
                <circle cx="344" cy="122" r="4" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              </g>
              {/* Ronce Melati Tibo Dodo cascading down shoulder */}
              <path
                d="M336 178 Q348 235 338 295 Q334 335 338 385"
                fill="none"
                stroke="#ffffff"
                strokeWidth="6"
                strokeDasharray="5, 6"
                strokeLinecap="round"
                className="drop-shadow-sm"
              />
            </g>
          ) : themeId === 'sunda' ? (
            <g id="brideSigerSunda">
              {/* Radiant Silver/Crystal Siger Sunda Crown */}
              <path
                d="M276 158 L288 126 L308 110 L328 126 L340 158 Q308 144 276 158 Z"
                fill="url(#sundaSilverGrad)"
                stroke="#ffffff"
                strokeWidth="2"
                className="drop-shadow-md"
              />
              {/* Siger Peaks with Crystal Sparkles */}
              <circle cx="308" cy="108" r="4.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.8" />
              <circle cx="288" cy="124" r="3.8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <circle cx="328" cy="124" r="3.8" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              {/* Untaian Melati wangi */}
              <path
                d="M336 178 Q348 235 340 295 Q336 335 340 380"
                fill="none"
                stroke="#ffffff"
                strokeWidth="5.5"
                strokeDasharray="4, 5"
                strokeLinecap="round"
              />
            </g>
          ) : themeId === 'islamic' ? (
            <g id="brideIslamicHijab">
              {/* Royal Emerald & Gold Bridal Hijab */}
              <path
                d="M274 175 C274 130, 342 130, 342 175 C342 225, 335 248, 308 248 C281 248, 274 225, 274 175 Z"
                fill={attire.brideDress}
                stroke={attire.brideEmbroidery}
                strokeWidth="2.5"
              />
              {/* Inner frame showing glowing radiant face */}
              <path d="M280 175 C280 148, 336 148, 336 175 Z" fill="url(#skinBride)" />
              {/* Gold Floral Tiara */}
              <path
                d="M286 154 Q308 140 330 154"
                stroke="url(#goldTrimGrad)"
                strokeWidth="3.5"
                fill="none"
              />
              <circle cx="308" cy="142" r="4.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
            </g>
          ) : (
            <g id="brideModernTiara">
              {/* Elegant Modern Crystal Tiara */}
              <path
                d="M290 154 Q308 144 326 154"
                stroke="#fbcfe8"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="308" cy="146" r="3.5" fill="#ffffff" stroke="#f472b6" strokeWidth="1" />
            </g>
          )}

          {/* Bride Right Arm */}
          <path
            d="M344 252 Q366 310 352 355"
            stroke={attire.brideDress}
            strokeWidth="19"
            strokeLinecap="round"
            fill="none"
          />

          {/* Bride Left Arm (reaching to clasp Groom's hand) */}
          <path
            d="M272 254 Q258 305 254 342"
            stroke={attire.brideDress}
            strokeWidth="18"
            strokeLinecap="round"
            fill="none"
          />
          {/* Bride Hand */}
          <circle cx="255" cy="352" r="9" fill="url(#skinBride)" />
        </g>

        {/* ========================================================= */}
        {/* CENTER INTERLOCKING HANDS & GLOWING RING SPARKLE          */}
        {/* ========================================================= */}
        <g className="hands-holding">
          {/* Soft shadow under hands */}
          <ellipse cx="254" cy="356" rx="14" ry="7" fill="rgba(0, 0, 0, 0.25)" />

          {/* Ring Sparkle / Glowing Heart */}
          <circle cx="254" cy="352" r="16" fill="url(#ringSparkle)" opacity="0.8" className="animate-pulse" />
          <path
            d="M254 345 Q258 340 261 344 Q264 349 254 357 Q244 349 247 344 Q250 340 254 345 Z"
            fill="#e11d48"
            className="animate-bounce"
            style={{ animationDuration: '2.5s' }}
          />
          {/* Ring Specular Glow */}
          <circle cx="254" cy="340" r="1.8" fill="#ffffff" />
        </g>
      </svg>
    </div>
  );
};
