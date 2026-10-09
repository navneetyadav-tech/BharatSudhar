import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Check, Smartphone, Monitor, Sun, Moon, Bell } from 'lucide-react';
import { BharatSudharLogo } from '../common/BharatSudharLogo';
import { useTheme } from '../../context/ThemeContext';

interface MobileHeaderProps {
  userName: string;
  onUpdateUserName: (newName: string) => void;
  onLogout?: () => void;
  isFrameMode?: boolean;
  onToggleFrameMode?: () => void;
  onOpenNotificationPane?: () => void;
  unreadNotificationsCount?: number;
  onOpenProfile?: () => void;
  onOpenDashboard?: () => void;
}

export function MobileHeader({
  userName,
  onUpdateUserName,
  onLogout: _onLogout,
  isFrameMode = false,
  onToggleFrameMode,
  onOpenNotificationPane,
  unreadNotificationsCount = 2,
  onOpenProfile,
  onOpenDashboard,
}: MobileHeaderProps) {
  const { isDark, toggleTheme } = useTheme();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3">
        {/* Brand Logo & Name */}
        <Link
          to="/dashboard"
          onClick={() => {
            if (onOpenDashboard) onOpenDashboard();
          }}
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157A4] rounded-xl py-0.5 px-1 transition-transform hover:scale-[1.02] shrink-0"
          title="Bharat Sudhar Dashboard"
        >
          {/* Civic Tech Emblem Logo */}
          <BharatSudharLogo size="sm" />

          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Bharat in Navy Blue */}
            <span className="text-xl sm:text-2xl font-black font-poppins text-[#0B2545] dark:text-white tracking-tight leading-none drop-shadow-xs transition-colors">
              Bharat
            </span>

            {/* Sudhar with Tiranga Gradient & Leaf Sprout */}
            <span className="relative text-xl sm:text-2xl font-black font-poppins bg-gradient-to-r from-[#FF671F] via-[#F35D07] to-[#046A38] bg-clip-text text-transparent tracking-tight leading-none">
              Sudhar
              {/* Sprout Green Leaf atop Sudhar */}
              <span className="absolute -top-2.5 -right-3 select-none pointer-events-none">
                <svg className="w-3 h-3 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5c0 3 3 5 5 5 1 0 2-.5 3-1.5C13 14 16 11 17 8z" fill="#2E7D32" />
                  <path d="M12 5c-3 1-5 4-6 6.5" stroke="#81C784" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              </span>
            </span>
          </div>
        </Link>

        {/* Right side controls: Clean, Clear & Symmetrically Aligned */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. Mobile / Desktop View Mode Switcher */}
          {onToggleFrameMode && (
            <button
              type="button"
              onClick={onToggleFrameMode}
              title={isFrameMode ? 'Switch to Desktop View' : 'Preview in Mobile Smartphone Frame'}
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-semibold text-[#172B4D] dark:text-[#E2E8F0] bg-[#F4F8FC] dark:bg-[#1E293B] hover:bg-[#EBF2FA] dark:hover:bg-[#334155] border border-[#DCE6F0] dark:border-[#334155] hover:border-[#B8CDE6] dark:hover:border-[#475569] transition-all shadow-subtle active:scale-95 shrink-0"
            >
              {isFrameMode ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-[#3157A4] dark:text-[#60A5FA]" />
                  <span className="hidden md:inline">Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#CA8A04] dark:text-[#FACC15]" />
                  <span className="hidden md:inline">Mobile View</span>
                </>
              )}
            </button>
          )}

          {/* 2. Day / Night Shifting Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDark ? 'Shift to Day Mode' : 'Shift to Night Mode'}
            className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-semibold text-[#172B4D] dark:text-[#E2E8F0] bg-[#F4F8FC] dark:bg-[#1E293B] hover:bg-[#EBF2FA] dark:hover:bg-[#334155] border border-[#DCE6F0] dark:border-[#334155] hover:border-[#B8CDE6] dark:hover:border-[#475569] transition-all shadow-subtle active:scale-95 shrink-0"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-[#FACC15] hover:rotate-45 transition-transform" />
                <span className="hidden sm:inline">Day</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-[#3157A4]" />
                <span className="hidden sm:inline">Night</span>
              </>
            )}
          </button>

          {/* 3. Citizen Profile Pill */}
          {isEditingName ? (
            <div className="flex items-center gap-1 h-9 bg-white dark:bg-[#1E293B] border border-[#3157A4] dark:border-[#60A5FA] rounded-full px-2.5 shadow-subtle shrink-0">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="w-24 sm:w-28 text-xs text-[#172B4D] dark:text-white bg-transparent focus:outline-none font-medium"
                autoFocus
              />
              <button
                type="button"
                onClick={handleSaveName}
                className="w-4 h-4 rounded-full bg-[#22A982] text-white flex items-center justify-center hover:bg-[#1b8a6a]"
              >
                <Check className="w-2.5 h-2.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (onOpenProfile) {
                  onOpenProfile();
                } else {
                  setTempName(userName);
                  setIsEditingName(true);
                }
              }}
              title="Citizen Profile (Click to open profile)"
              className="inline-flex items-center gap-1.5 h-9 px-3 rounded-full text-xs font-medium text-[#172B4D] dark:text-[#E2E8F0] bg-[#F4F8FC] dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] hover:border-[#B8CDE6] dark:hover:border-[#475569] hover:bg-[#EBF2FA] dark:hover:bg-[#334155] transition-all shadow-subtle truncate max-w-[150px] sm:max-w-[210px] active:scale-95 shrink-0"
            >
              <div className="w-5 h-5 rounded-full bg-[#3157A4]/10 dark:bg-[#60A5FA]/20 text-[#3157A4] dark:text-[#60A5FA] flex items-center justify-center shrink-0">
                <User className="w-3 h-3" />
              </div>
              <span className="truncate">
                Citizen · <strong className="font-semibold text-[#172B4D] dark:text-white">{userName}</strong>
              </span>
            </button>
          )}

          {/* 4. Notification Symbol Button (Replaces the logout button at the far right) */}
          <button
            type="button"
            onClick={onOpenNotificationPane}
            title="Open Notifications Panel"
            aria-label="Open Notifications Panel"
            className="relative inline-flex items-center justify-center h-9 w-9 rounded-xl text-[#172B4D] dark:text-[#E2E8F0] bg-[#F4F8FC] dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] hover:bg-[#EBF2FA] dark:hover:bg-[#334155] hover:text-[#3157A4] dark:hover:text-[#60A5FA] hover:border-[#B8CDE6] dark:hover:border-[#475569] transition-all shadow-subtle active:scale-95 group shrink-0"
          >
            <Bell className="w-4 h-4 text-[#172B4D] dark:text-[#E2E8F0] group-hover:text-[#3157A4] dark:group-hover:text-[#60A5FA] group-hover:scale-110 transition-transform" />
            {unreadNotificationsCount !== undefined && unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#FACC15] text-[#172B4D] text-[10px] font-black flex items-center justify-center ring-2 ring-white dark:ring-[#1E293B] shadow-xs">
                {unreadNotificationsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
