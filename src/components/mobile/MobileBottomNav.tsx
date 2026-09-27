import { LayoutDashboard, PlusCircle, FileText, Bell } from 'lucide-react';
import type { MobileTab } from './types';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  reportsCount: number;
  unreadNotificationsCount?: number;
}

export function MobileBottomNav({
  activeTab,
  onSelectTab,
  reportsCount,
  unreadNotificationsCount = 2,
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
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      badge: unreadNotificationsCount,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#DCE6F0] shadow-subtle pb-[env(safe-area-inset-bottom)]"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 items-center px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.isPrimary) {
            return (
              <div key={item.id} className="flex justify-center items-center">
                <button
                  type="button"
                  onClick={() => onSelectTab(item.id)}
                  className={`flex flex-col items-center justify-center -mt-4 w-12 h-12 rounded-full shadow-subtle transition-transform active:scale-95 ${
                    isActive
                      ? 'bg-[#FACC15] text-[#172B4D] ring-4 ring-[#FACC15]/30'
                      : 'bg-[#FACC15] text-[#172B4D] hover:bg-[#EAB308] ring-2 ring-white'
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
                  ? 'text-[#3157A4] font-bold'
                  : 'text-[#718096] hover:text-[#172B4D] font-medium'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-[#3157A4] stroke-[2.3]' : 'stroke-[1.8]'
                  }`}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-[#FACC15] text-[#172B4D] text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 leading-none tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0.5 w-6 h-0.5 rounded-full bg-[#3157A4]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
