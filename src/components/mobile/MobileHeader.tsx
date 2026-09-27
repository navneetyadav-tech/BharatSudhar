import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Check, Smartphone, Monitor } from 'lucide-react';

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
      {/* Top Subtle Civic Ribbon Accent */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#3157A4] via-[#FACC15] to-[#22A982]" />

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Slogan - Unified Ashoka Chakra Crest */}
        <Link
          to="/"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157A4] rounded-xl py-0.5 px-1 transition-transform hover:scale-[1.01] shrink-0"
          title="Return to Bharat Sudhar Home"
        >
          {/* Ashoka Chakra Crest Logo */}
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#3157A4] text-white shadow-subtle transition-transform duration-200 group-hover:scale-105 shrink-0">
            <svg className="w-5 h-5 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor">
              <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5"/>
              <circle cx="50" cy="50" r="10" fill="currentColor"/>
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
            {/* CTA and Success corner pips */}
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FACC15] ring-2 ring-white" />
            <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-[#22A982] ring-2 ring-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold text-[#172B4D] tracking-tight leading-none">
              Bharat<span className="text-[#3157A4]">Sudhar</span>
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-[#718096] tracking-wide mt-0.5">
              Ab Har Nagrik Zimmedaar
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
