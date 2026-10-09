import { Menu, Bell, Sun, Moon, Smartphone, Monitor } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface MobileTopBarProps {
  onOpenOptionPane: () => void;
  onOpenNotificationPane: () => void;
  onOpenProfile?: () => void;
  isFrameMode?: boolean;
  onToggleFrameMode?: () => void;
  unreadCount?: number;
  userName?: string;
}

export function MobileTopBar({
  onOpenOptionPane,
  onOpenNotificationPane,
  onOpenProfile,
  isFrameMode = true,
  onToggleFrameMode,
  unreadCount = 2,
  userName = 'Anand Deshmukh',
}: MobileTopBarProps) {
  const { isDark, toggleTheme } = useTheme();
  const initial = userName.trim() ? userName.trim().charAt(0).toUpperCase() : 'A';

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle px-2.5 py-2 sm:px-4 sm:py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Option Pane Hamburger Menu Button */}
        <button
          type="button"
          onClick={onOpenOptionPane}
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] hover:bg-[#F4F8FC] dark:hover:bg-[#334155] active:scale-95 flex items-center justify-center text-[#172B4D] dark:text-[#E2E8F0] transition-all shadow-subtle group shrink-0"
          title="Open options menu"
          aria-label="Open options menu"
        >
          <Menu className="w-5 h-5 stroke-[2.2] text-[#172B4D] dark:text-[#E2E8F0] group-hover:text-[#3157A4] dark:group-hover:text-[#60A5FA] transition-colors" />
        </button>

        {/* Center: Clean Civic Status Pill (NO "Bharat Sudhar" as requested) */}
        <div className="flex-1 flex justify-center items-center min-w-0 px-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F4F8FC] dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] text-[11px] font-semibold text-[#718096] dark:text-[#94A3B8] shadow-xs truncate">
            <span className="w-2 h-2 rounded-full bg-[#22A982] animate-pulse shrink-0" />
            <span className="truncate hidden xs:inline">Civic Portal · </span>
            <span className="truncate">Ward 45-B</span>
          </div>
        </div>

        {/* Uppermost Right: Mobile/Desktop Option, Day/Night Shifting, Notification Panel, Profile */}
        <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          {/* 1. Option of Mobile / Desktop */}
          {onToggleFrameMode && (
            <button
              type="button"
              onClick={onToggleFrameMode}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] hover:bg-[#F4F8FC] dark:hover:bg-[#334155] active:scale-95 flex items-center justify-center text-[#172B4D] dark:text-[#E2E8F0] transition-all shadow-subtle group"
              title={isFrameMode ? 'Switch to Desktop View' : 'Switch to Mobile Phone View'}
              aria-label={isFrameMode ? 'Switch to Desktop View' : 'Switch to Mobile Phone View'}
            >
              {isFrameMode ? (
                <Monitor className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#3157A4] dark:text-[#60A5FA]" />
              ) : (
                <Smartphone className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#CA8A04] dark:text-[#FACC15]" />
              )}
            </button>
          )}

          {/* 2. Day / Night Shifting Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] hover:bg-[#F4F8FC] dark:hover:bg-[#334155] active:scale-95 flex items-center justify-center text-[#172B4D] dark:text-[#E2E8F0] transition-all shadow-subtle group"
            title={isDark ? 'Shift to Day Mode' : 'Shift to Night Mode'}
            aria-label={isDark ? 'Shift to Day Mode' : 'Shift to Night Mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#FACC15] hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#3157A4]" />
            )}
          </button>

          {/* 3. Notification Panel Button */}
          <button
            type="button"
            onClick={onOpenNotificationPane}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] hover:bg-[#F4F8FC] dark:hover:bg-[#334155] active:scale-95 flex items-center justify-center text-[#172B4D] dark:text-[#E2E8F0] transition-all shadow-subtle group"
            title="Open notifications panel"
            aria-label="Open notifications panel"
          >
            <Bell className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[2.1] text-[#172B4D] dark:text-[#E2E8F0] group-hover:text-[#3157A4] dark:group-hover:text-[#60A5FA] transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#FACC15] text-[#172B4D] text-[10px] font-extrabold flex items-center justify-center ring-2 ring-white dark:ring-[#1E293B] shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {/* 4. Profile Button */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#3157A4] to-[#4573ca] hover:from-[#264585] hover:to-[#3157A4] active:scale-95 text-white font-black text-xs flex items-center justify-center transition-all shadow-subtle border border-white/20 group shrink-0"
            title={`Citizen Profile (${userName})`}
            aria-label="Open profile"
          >
            <span>{initial}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
