import { LayoutDashboard, Compass, PlusCircle, FileText, User } from 'lucide-react';
import type { MobileTab } from './types';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  reportsCount: number;
}

export function MobileBottomNav({
  activeTab,
  onSelectTab,
  reportsCount,
}: MobileBottomNavProps) {
  const navItems: {
    id: MobileTab;
    label: string;
    icon: typeof LayoutDashboard;
    badge?: number;
    isPrimary?: boolean;
  }[] = [
    {
      id: 'overview',
      label: 'Overview',
      icon: LayoutDashboard,
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: Compass,
    },
    {
      id: 'report',
      label: 'Report Issue',
      icon: PlusCircle,
      isPrimary: true,
    },
    {
      id: 'my-reports',
      label: 'My Reports',
      icon: FileText,
      badge: reportsCount,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-t border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle pb-[env(safe-area-inset-bottom)] transition-colors"
    >
      <div className="max-w-md md:max-w-xl mx-auto grid grid-cols-5 h-16 items-center px-1 sm:px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <div key={item.id} className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`flex flex-col items-center justify-center -mt-5 w-12 h-12 rounded-full shadow-lg transition-all active:scale-95 ${
                    isActive
                      ? 'bg-[#FACC15] text-[#172B4D] ring-4 ring-[#FACC15]/40 scale-105'
                      : 'bg-[#FACC15] text-[#172B4D] hover:bg-[#EAB308] hover:scale-105 ring-2 ring-white dark:ring-[#0F172A]'
                  }`}
                  title="Report a Problem"
                >
                  <PlusCircle className="w-6 h-6 stroke-[2.2]" />
                  <span className="sr-only">Report a Problem</span>
                </button>
              </div>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 transition-colors ${
                isActive
                  ? 'text-[#3157A4] dark:text-[#60A5FA] font-bold'
                  : 'text-[#718096] dark:text-[#94A3B8] hover:text-[#172B4D] dark:hover:text-[#F8FAFC] font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#3157A4] dark:text-[#60A5FA] stroke-[2.3]' : 'stroke-[1.8]'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-[#FACC15] text-[#172B4D] text-[10px] font-bold flex items-center justify-center ring-2 ring-white dark:ring-[#0F172A]">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-none tracking-tight truncate max-w-[64px]">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-6 h-0.5 rounded-full bg-[#3157A4] dark:bg-[#60A5FA]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
