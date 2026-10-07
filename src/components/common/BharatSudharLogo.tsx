import React from 'react';

interface BharatSudharLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  variant?: 'chakra' | 'emblem';
}

export function BharatSudharLogo({
  size = 'md',
  className = '',
  variant = 'chakra',
}: BharatSudharLogoProps) {
  // Unique ID prefix to avoid SVG defs collision if emblem is used
  const uid = React.useId().replace(/:/g, '');

  if (variant === 'emblem') {
    const pixelSizes = {
      sm: { box: 'w-8 h-8', svg: 'w-8 h-8' },
      md: { box: 'w-10 h-10 sm:w-11 sm:h-11', svg: 'w-10 h-10 sm:w-11 sm:h-11' },
      lg: { box: 'w-14 h-14 sm:w-16 sm:h-16', svg: 'w-14 h-14 sm:w-16 sm:h-16' },
      xl: { box: 'w-20 h-20', svg: 'w-20 h-20' },
    }[size];

    return (
      <div
        className={`relative inline-flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 select-none ${pixelSizes.box} ${className}`}
        title="Bharat Sudhar Civic Emblem"
      >
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`${pixelSizes.svg} filter drop-shadow-sm`}
        >
          <defs>
            <linearGradient id={`${uid}-border`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C2410C" />
              <stop offset="25%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="75%" stopColor="#047857" />
              <stop offset="100%" stopColor="#064E3B" />
            </linearGradient>
            <linearGradient id={`${uid}-saffron-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7A00" />
              <stop offset="100%" stopColor="#FF5722" />
            </linearGradient>
            <linearGradient id={`${uid}-green-arc`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id={`${uid}-leaf-grad`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#16A34A" />
              <stop offset="50%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
            <radialGradient id={`${uid}-bg`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="90%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#EFF6FF" />
            </radialGradient>
          </defs>

          <circle
            cx="50"
            cy="50"
            r="46"
            fill={`url(#${uid}-bg)`}
            stroke={`url(#${uid}-border)`}
            strokeWidth="2.5"
          />
          <circle cx="50" cy="50" r="43.5" stroke="#E2E8F0" strokeWidth="0.75" opacity="0.6" />

          {/* Saffron arc */}
          <path
            d="M26 38 C33 24, 67 24, 74 38"
            stroke={`url(#${uid}-saffron-arc)`}
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Green arc */}
          <path
            d="M26 63 C33 77, 67 77, 74 63"
            stroke={`url(#${uid}-green-arc)`}
            strokeWidth="4.2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Ashoka Chakra */}
          <g stroke="#0F2B5C" opacity="0.95">
            <circle cx="50" cy="50" r="17.5" strokeWidth="2.2" fill="none" />
            <circle cx="50" cy="50" r="5.5" strokeWidth="1" fill="#0F2B5C" />
            <circle cx="50" cy="50" r="1.8" fill="#FFFFFF" />
            {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map((angle) => (
              <line
                key={angle}
                x1="50"
                y1="32.5"
                x2="50"
                y2="67.5"
                strokeWidth="1.15"
                strokeLinecap="round"
                transform={`rotate(${angle} 50 50)`}
              />
            ))}
          </g>

          {/* Sprout leaf */}
          <g transform="translate(42, 21) rotate(22)">
            <path
              d="M0 16 C4 11, 14 3, 24 0 C24 8, 18 20, 7 22 Z"
              fill={`url(#${uid}-leaf-grad)`}
            />
            <path d="M2 17 C8 12, 17 6, 22 2" stroke="#DCFCE7" strokeWidth="1.2" strokeLinecap="round" />
            <path d="M8 12 C10 10, 13 10, 15 11" stroke="#BBF7D0" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M13 8 C15 6, 18 6, 20 7" stroke="#BBF7D0" strokeWidth="0.8" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    );
  }

  // Default: Ashoka Chakra Crest Logo with Blue container, White Chakra, Saffron & Green corner pips
  const dimensions = {
    sm: {
      box: 'w-9 h-9 sm:w-10 sm:h-10 rounded-xl',
      svg: 'w-5 h-5 sm:w-5.5 sm:h-5.5',
      pipTop: '-top-1 -right-1 w-2.5 h-2.5',
      pipBottom: '-bottom-1 -left-1 w-2.5 h-2.5',
    },
    md: {
      box: 'w-10 h-10 sm:w-11 sm:h-11 rounded-xl',
      svg: 'w-5.5 h-5.5 sm:w-6 sm:h-6',
      pipTop: '-top-1 -right-1 w-2.5 h-2.5 sm:w-2.5 sm:h-2.5',
      pipBottom: '-bottom-1 -left-1 w-2.5 h-2.5 sm:w-2.5 sm:h-2.5',
    },
    lg: {
      box: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl',
      svg: 'w-8 h-8 sm:w-9 sm:h-9',
      pipTop: '-top-1.5 -right-1.5 w-3.5 h-3.5',
      pipBottom: '-bottom-1.5 -left-1.5 w-3.5 h-3.5',
    },
    xl: {
      box: 'w-20 h-20 rounded-2xl',
      svg: 'w-12 h-12',
      pipTop: '-top-2 -right-2 w-4.5 h-4.5',
      pipBottom: '-bottom-2 -left-2 w-4.5 h-4.5',
    },
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 bg-[#3157A4] text-white shadow-subtle transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#264585] select-none ${dimensions.box} ${className}`}
      title="Bharat Sudhar Ashoka Chakra Crest"
    >
      {/* Ashoka Chakra Wheel */}
      <svg
        className={`${dimensions.svg} text-white`}
        viewBox="0 0 100 100"
        fill="none"
        stroke="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Wheel Rim */}
        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5" />

        {/* Central Hub */}
        <circle cx="50" cy="50" r="10" fill="currentColor" />

        {/* Spokes */}
        <g stroke="currentColor" strokeWidth="3">
          <line x1="50" y1="8" x2="50" y2="92" />
          <line x1="8" y1="50" x2="92" y2="50" />
          <line x1="20" y1="20" x2="80" y2="80" />
          <line x1="20" y1="80" x2="80" y2="20" />
          <line x1="32" y1="12" x2="68" y2="88" />
          <line x1="12" y1="32" x2="88" y2="68" />
          <line x1="68" y1="12" x2="32" y2="88" />
          <line x1="88" y1="32" x2="12" y2="68" />
        </g>
      </svg>

      {/* Top-Right Pip: Saffron / Lemon CTA Accent (#FACC15) with crisp white border */}
      <span
        className={`absolute rounded-full bg-[#FACC15] ring-2 ring-white shadow-xs ${dimensions.pipTop}`}
        aria-hidden="true"
      />

      {/* Bottom-Left Pip: Green Success / Civic Growth Accent (#22A982) with crisp white border */}
      <span
        className={`absolute rounded-full bg-[#22A982] ring-2 ring-white shadow-xs ${dimensions.pipBottom}`}
        aria-hidden="true"
      />
    </div>
  );
}
