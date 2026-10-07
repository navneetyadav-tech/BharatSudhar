import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Check, Smartphone, Monitor } from 'lucide-react';
import { BharatSudharLogo } from '../common/BharatSudharLogo';

interface MobileHeaderProps {
  userName: string;
  onUpdateUserName: (newName: string) => void;
  onLogout: () => void;
  isFrameMode?: boolean;
  onToggleFrameMode?: () => void;
}

export function MobileHeader({
  userName,
  onUpdateUserName,
  onLogout,
  isFrameMode = false,
  onToggleFrameMode,
}: MobileHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-[#DCE6F0] shadow-subtle">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157A4] rounded-xl py-0.5 px-1 transition-transform hover:scale-[1.02] shrink-0"
          title="Return to Bharat Sudhar Home"
        >
          {/* Civic Tech Emblem Logo */}
          <BharatSudharLogo size="sm" />

          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Bharat in Navy Blue */}
            <span className="text-xl sm:text-2xl font-black font-poppins text-[#0B2545] tracking-tight leading-none drop-shadow-xs">
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

        {/* Right side controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop Frame Mode Switcher (Visible on desktop/tablets) */}
          {onToggleFrameMode && (
            <button
              type="button"
              onClick={onToggleFrameMode}
              title={isFrameMode ? 'Switch to Desktop View' : 'Preview in Mobile Smartphone Frame'}
              className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-semibold text-[#718096] bg-[#F4F8FC] hover:bg-[#EBF2FA] hover:text-[#172B4D] border border-[#DCE6F0] transition-colors shadow-subtle"
            >
              {isFrameMode ? (
                <>
                  <Monitor className="w-3.5 h-3.5 text-[#3157A4]" />
                  <span>Desktop View</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#CA8A04]" />
                  <span>Mobile View</span>
                </>
              )}
            </button>
          )}

          {/* Citizen Name Pill */}
          {isEditingName ? (
            <div className="flex items-center gap-1 bg-white border border-[#3157A4] rounded-full px-2 py-0.5 shadow-subtle">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                className="w-24 text-[11px] sm:text-xs text-[#172B4D] bg-transparent focus:outline-none font-medium"
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
                setTempName(userName);
                setIsEditingName(true);
              }}
              title="Click to rename citizen profile"
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium text-[#718096] bg-[#F4F8FC] border border-[#DCE6F0] hover:border-[#B8CDE6] hover:bg-[#EBF2FA] transition-colors shadow-subtle truncate max-w-[130px] sm:max-w-[180px]"
            >
              <User className="w-3 h-3 text-[#3157A4] shrink-0" />
              <span className="truncate">
                Citizen · <strong className="font-semibold text-[#172B4D]">{userName}</strong>
              </span>
            </button>
          )}

          {/* Log out Button */}
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[11px] sm:text-xs font-semibold text-[#718096] bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] hover:text-rose-600 transition-colors shadow-subtle"
          >
            <LogOut className="w-3 h-3" />
            <span className="hidden xs:inline">Log out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
