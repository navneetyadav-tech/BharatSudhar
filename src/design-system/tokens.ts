/**
 * Bharat Sudhar - Indian Civic-Tech Design Tokens
 * 
 * Inspired by modern Indian public digital platforms (India Stack, DigiLocker, CoWIN)
 * Structured for high trust, clarity, accessibility (WCAG AA compliant), and mobile-first ergonomics.
 */

export const tokens = {
  // Brand & Semantic Colors
  colors: {
    // Ashoka Navy: Authority, Structure, Trust
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#2563EB',
      600: '#1D4ED8',
      700: '#1E40AF',
      800: '#1E3A8A',
      900: '#0F2B5C',
      950: '#0A1D3F',
    },
    // Lemon Yellow: Citizen Energy, Active Engagement, CTAs
    saffron: {
      50: '#FEFCE8',
      100: '#FEF9C3',
      200: '#FEF08A',
      300: '#FDE047',
      400: '#FACC15',
      500: '#FACC15',
      600: '#CA8A04',
      700: '#A16207',
      800: '#854D0E',
      900: '#713F12',
    },
    // Tiranga Green: Resolution, Verification, Cleanliness
    green: {
      50: '#F0FDF4',
      100: '#DCFCE7',
      200: '#BBF7D0',
      300: '#86EFAC',
      400: '#4ADE80',
      500: '#22C55E',
      600: '#16A34A',
      700: '#15803D',
      800: '#166534',
      900: '#14532D',
    },
    // Civic Slate Surfaces & Text
    slate: {
      50: '#F8FAFC',
      100: '#F1F5F9',
      200: '#E2E8F0',
      300: '#CBD5E1',
      400: '#94A3B8',
      500: '#64748B',
      600: '#475569',
      700: '#334155',
      800: '#1E293B',
      900: '#0F172A',
    },
    // Status Alert Colors
    status: {
      info: { bg: '#EFF6FF', border: '#BFDBFE', text: '#1E40AF' },
      success: { bg: '#F0FDF4', border: '#BBF7D0', text: '#15803D' },
      warning: { bg: '#FEF9C3', border: '#FDE047', text: '#854D0E' },
      danger: { bg: '#FEF2F2', border: '#FECACA', text: '#B91C1C' },
    },
  },

  // 4px / 8px Standard Spacing Scale
  spacing: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
  },

  // Mobile-First Ergonomics
  touchTarget: {
    minHeight: '44px',
    minWidth: '44px',
  },

  // Border Radii
  radii: {
    sm: '6px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    '2xl': '24px',
    full: '9999px',
  },

  // Shadows
  shadows: {
    soft: '0 1px 3px 0 rgba(15, 43, 92, 0.06), 0 1px 2px 0 rgba(15, 43, 92, 0.04)',
    card: '0 4px 20px -2px rgba(15, 43, 92, 0.08)',
    cardHover: '0 12px 28px -4px rgba(15, 43, 92, 0.14)',
    modal: '0 25px 50px -12px rgba(15, 43, 92, 0.25)',
  },

  // Typography Hierarchy
  typography: {
    fontFamilies: {
      heading: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
      body: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace",
    },
    sizes: {
      display: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight',
      h1: 'text-3xl sm:text-4xl font-bold tracking-tight',
      h2: 'text-2xl sm:text-3xl font-bold tracking-tight',
      h3: 'text-xl sm:text-2xl font-semibold tracking-tight',
      h4: 'text-lg sm:text-xl font-semibold',
      bodyLg: 'text-base sm:text-lg leading-relaxed',
      bodyBase: 'text-sm sm:text-base leading-normal',
      bodySm: 'text-xs sm:text-sm leading-normal',
      caption: 'text-xs leading-tight',
      overline: 'text-[11px] font-bold uppercase tracking-wider',
      code: 'font-mono text-xs font-semibold',
    },
  },
} as const;

export type DesignTokens = typeof tokens;
