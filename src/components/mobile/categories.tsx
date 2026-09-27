import React from 'react';

export interface CategoryItem {
  id: string;
  name: string;
  subtext: string;
  iconBg: string;
  iconColor: string;
  // Specific SVG / rendering for the problem icon
  renderIcon: () => React.ReactNode;
}

export const PROBLEM_CATEGORIES: CategoryItem[] = [
  {
    id: 'garbage-waste',
    name: 'Garbage / Waste',
    subtext: 'Overflowing bins, roadside dumping, uncollected trash',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    renderIcon: () => (
      <svg className="w-8 h-8 text-sky-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6h18" />
        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
        <line x1="10" y1="11" x2="10" y2="17" stroke="#16a34a" strokeWidth="2" />
        <line x1="14" y1="11" x2="14" y2="17" stroke="#16a34a" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'pothole-road',
    name: 'Pothole / Road Damage',
    subtext: 'Cratered roads, cracked asphalt, damaged speed bumps',
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-700',
    renderIcon: () => (
      <svg className="w-8 h-8 text-slate-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <ellipse cx="12" cy="13" rx="9" ry="5" fill="#1e293b" fillOpacity="0.85" />
        <ellipse cx="11.5" cy="12.5" rx="5" ry="2.5" fill="#0f172a" />
        <path d="M4 17c2 2 5 2.5 8 2.5s6-.5 8-2.5" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    id: 'broken-streetlight',
    name: 'Broken Streetlight',
    subtext: 'Dark street stretch, flickering light, damaged pole',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-600',
    renderIcon: () => (
      <svg className="w-8 h-8 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2v1" />
        <path d="M12 7a5 5 0 0 0-5 5c0 2 1 3 2 4h6c1-1 2-2 2-4a5 5 0 0 0-5-5z" fill="#fef08a" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="19.78" y1="4.22" x2="18.36" y2="5.64" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
      </svg>
    ),
  },
  {
    id: 'open-manhole',
    name: 'Open Manhole',
    subtext: 'Missing or broken sewer lid, dangerous street hole',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-700',
    renderIcon: () => (
      <svg className="w-8 h-8 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" fill="#fef9c3" stroke="#ca8a04" />
        <line x1="12" y1="9" x2="12" y2="13" stroke="#854d0e" strokeWidth="2" />
        <line x1="12" y1="17" x2="12.01" y2="17" stroke="#854d0e" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'water-leakage',
    name: 'Water Leakage',
    subtext: 'Pipeline burst, drinking water wastage, low pressure',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    renderIcon: () => (
      <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="3" fill="#eff6ff" stroke="#3b82f6" />
        <path d="M7 9h6a2 2 0 0 1 2 2v2" stroke="#2563eb" strokeWidth="2" />
        <path d="M15 15v4" stroke="#2563eb" strokeWidth="2" />
        <path d="M13 19h4" stroke="#2563eb" strokeWidth="2" />
        <circle cx="10" cy="9" r="1.5" fill="#2563eb" />
      </svg>
    ),
  },
  {
    id: 'drainage-issue',
    name: 'Drainage Issue',
    subtext: 'Blocked nullah, monsoon waterlogging, foul sewage overflow',
    iconBg: 'bg-cyan-50',
    iconColor: 'text-cyan-600',
    renderIcon: () => (
      <svg className="w-8 h-8 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" stroke="#06b6d4" strokeWidth="2" />
        <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" stroke="#0891b2" strokeWidth="2" />
        <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" stroke="#0e7490" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'fallen-tree',
    name: 'Fallen Tree',
    subtext: 'Uprooted tree, broken large branches blocking path',
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
    renderIcon: () => (
      <svg className="w-8 h-8 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="9" r="6" fill="#86efac" fillOpacity="0.6" stroke="#16a34a" strokeWidth="2" />
        <path d="M12 15v7" stroke="#78350f" strokeWidth="2.5" />
        <path d="M9 22h6" stroke="#78350f" strokeWidth="2" />
        <circle cx="9" cy="8" r="3" fill="#4ade80" />
      </svg>
    ),
  },
  {
    id: 'road-obstruction',
    name: 'Road Obstruction',
    subtext: 'Illegal construction debris, blocked lanes, abandoned vehicles',
    iconBg: 'bg-yellow-50',
    iconColor: 'text-yellow-700',
    renderIcon: () => (
      <svg className="w-8 h-8 text-yellow-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="6" width="16" height="8" rx="1.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
        <line x1="8" y1="6" x2="6" y2="14" stroke="#ca8a04" strokeWidth="2" />
        <line x1="14" y1="6" x2="12" y2="14" stroke="#ca8a04" strokeWidth="2" />
        <line x1="20" y1="6" x2="18" y2="14" stroke="#ca8a04" strokeWidth="2" />
        <path d="M6 14v6M18 14v6" stroke="#78350f" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'damaged-public-property',
    name: 'Damaged Public Property',
    subtext: 'Broken bus shelter, damaged park benches, defaced monument',
    iconBg: 'bg-stone-50',
    iconColor: 'text-stone-700',
    renderIcon: () => (
      <svg className="w-8 h-8 text-stone-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" stroke="#78350f" strokeWidth="2" />
        <path d="m4 10 8-7 8 7" stroke="#ca8a04" strokeWidth="2" fill="#fef08a" fillOpacity="0.3" />
        <path d="M6 10v11" stroke="#78350f" strokeWidth="2" />
        <path d="M18 10v11" stroke="#78350f" strokeWidth="2" />
        <path d="M10 21v-6h4v6" stroke="#78350f" strokeWidth="2" fill="#fff" />
      </svg>
    ),
  },
  {
    id: 'other',
    name: 'Other',
    subtext: 'Encroachment, noise nuisance, stray animals, general issues',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    renderIcon: () => (
      <svg className="w-8 h-8 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 17v5" stroke="#e11d48" strokeWidth="2" />
        <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" fill="#f43f5e" stroke="#be123c" />
        <circle cx="12" cy="7" r="1.5" fill="#fff" />
      </svg>
    ),
  },
];
