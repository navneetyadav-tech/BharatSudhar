import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LogIn,
  LogOut,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
  Sun,
  Moon,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { BharatSudharLogo } from '../common/BharatSudharLogo';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LoginModal } from '../auth/LoginModal';

export function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, isLoginModalOpen, openLoginModal, closeLoginModal, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isCurrent = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-header shadow-subtle border-b border-[#E2E8F0]/70 dark:border-[#1E293B] transition-colors">
        <Container>
          <div className="flex h-16 sm:h-18 items-center justify-between gap-2 sm:gap-4">
            {/* Brand Identity */}
            <Link
              to="/dashboard"
              className="flex items-center gap-1.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157A4] rounded-xl py-1 transition-transform hover:scale-[1.02] shrink-0 min-w-0"
              title="Bharat Sudhar Dashboard"
            >
              {/* Civic Tech Emblem Logo */}
              <div className="shrink-0 scale-90 sm:scale-100 origin-left">
                <BharatSudharLogo size="md" />
              </div>

              {/* Brand Wordmark (No line) */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Bharat in Navy Blue */}
                <span className="text-xl sm:text-2xl lg:text-[26px] font-black font-poppins text-[#0B2545] dark:text-white tracking-tight leading-none drop-shadow-xs transition-colors">
                  Bharat
                </span>

                {/* Sudhar with Tiranga Gradient & Leaf Sprout */}
                <span className="relative text-xl sm:text-2xl lg:text-[26px] font-black font-poppins bg-gradient-to-r from-[#FF671F] via-[#F35D07] to-[#046A38] bg-clip-text text-transparent tracking-tight leading-none">
                  Sudhar
                  {/* Sprout Green Leaf atop Sudhar */}
                  <span className="absolute -top-2 -right-3 sm:-top-2.5 sm:-right-3.5 select-none pointer-events-none">
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5c0 3 3 5 5 5 1 0 2-.5 3-1.5C13 14 16 11 17 8z" fill="#2E7D32" />
                      <path d="M12 5c-3 1-5 4-6 6.5" stroke="#81C784" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
              <Link
                to="/"
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isCurrent('/')
                    ? 'bg-[#EBF1FA] dark:bg-[#1E293B] text-[#3157A4] dark:text-[#60A5FA] font-bold'
                    : 'text-[#718096] dark:text-[#94A3B8] hover:text-[#172B4D] dark:hover:text-white hover:bg-[#F0F5FD] dark:hover:bg-[#1E293B]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/issues"
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isCurrent('/issues')
                    ? 'bg-[#EBF1FA] dark:bg-[#1E293B] text-[#3157A4] dark:text-[#60A5FA] font-bold'
                    : 'text-[#718096] dark:text-[#94A3B8] hover:text-[#172B4D] dark:hover:text-white hover:bg-[#F0F5FD] dark:hover:bg-[#1E293B]'
                }`}
              >
                Public Issues
              </Link>
              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isCurrent('/about')
                    ? 'bg-[#EBF1FA] dark:bg-[#1E293B] text-[#3157A4] dark:text-[#60A5FA] font-bold'
                    : 'text-[#718096] dark:text-[#94A3B8] hover:text-[#172B4D] dark:hover:text-white hover:bg-[#F0F5FD] dark:hover:bg-[#1E293B]'
                }`}
              >
                Citizen Charter
              </Link>
            </nav>

            {/* Right Action: Day/Night Shifting, Dashboard Shortcut & Profile/Login */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Day / Night Shifting Button */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Shift to Day Mode' : 'Shift to Night Mode'}
                aria-label={isDark ? 'Shift to Day Mode' : 'Shift to Night Mode'}
                className="inline-flex items-center justify-center gap-1.5 h-8.5 sm:h-9 px-2 sm:px-3 rounded-xl text-xs font-semibold text-[#172B4D] dark:text-[#E2E8F0] bg-white dark:bg-[#1E293B] hover:bg-[#F4F8FC] dark:hover:bg-[#334155] border border-[#DCE6F0] dark:border-[#334155] hover:border-[#B8CDE6] dark:hover:border-[#475569] transition-all shadow-subtle active:scale-95 shrink-0"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-[#FACC15] hover:rotate-45 transition-transform" />
                    <span className="hidden sm:inline font-bold">Day</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#3157A4]" />
                    <span className="hidden sm:inline font-bold">Night</span>
                  </>
                )}
              </button>

              {/* Direct Portal Link */}
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3 rounded-xl text-xs font-bold text-[#3157A4] dark:text-[#60A5FA] bg-[#EBF1FA] dark:bg-[#1E293B] hover:bg-[#DCE6F0] dark:hover:bg-[#334155] border border-[#DCE6F0] dark:border-[#334155] transition-all shadow-subtle active:scale-95 shrink-0"
                title="Open Citizen Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Portal</span>
              </Link>

              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#DCE6F0] dark:border-[#334155] bg-white dark:bg-[#1E293B] hover:bg-[#F4F8FC] dark:hover:bg-[#334155] transition-colors shadow-subtle group"
                    title="Citizen Profile"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#3157A4] text-white font-bold text-xs flex items-center justify-center shadow-subtle">
                      {user.avatar}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-[#172B4D] dark:text-white leading-tight group-hover:text-[#3157A4] dark:group-hover:text-[#60A5FA]">
                        {user.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-semibold text-[#3157A4] dark:text-[#60A5FA] leading-tight">
                        {user.ward || 'Citizen'}
                      </span>
                    </div>
                  </button>

                  {/* User Dropdown Navigation Panel */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#DCE6F0] dark:border-[#1E293B] shadow-card py-2 z-50 animate-scale-in">
                      {/* User Header */}
                      <div className="px-4 py-2.5 border-b border-[#DCE6F0] dark:border-[#1E293B] bg-[#F0F5FD]/50 dark:bg-[#1E293B]/60">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#172B4D] dark:text-white">{user.name}</p>
                          <span className="px-2 py-0.5 rounded-full bg-[#EBF1FA] dark:bg-blue-950/70 text-[#3157A4] dark:text-[#60A5FA] border border-[#DCE6F0] dark:border-blue-800/50 text-[10px] font-bold">
                            Verified Citizen
                          </span>
                        </div>
                        <p className="text-[11px] text-[#718096] dark:text-[#94A3B8] mt-0.5">
                          {user.ward}, {user.city}
                        </p>
                      </div>

                      {/* Navigation Options in Menu */}
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#172B4D] dark:text-[#E2E8F0] hover:bg-[#EBF1FA] dark:hover:bg-[#1E293B] hover:text-[#3157A4] dark:hover:text-[#60A5FA] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#3157A4] dark:text-[#60A5FA]" />
                          <div>
                            <span className="block font-bold">Citizen Dashboard</span>
                            <span className="text-[10px] text-[#718096] dark:text-[#94A3B8]">Reports & actions</span>
                          </div>
                        </Link>

                        <Link
                          to="/issues"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#718096] dark:text-[#94A3B8] hover:bg-[#F0F5FD] dark:hover:bg-[#1E293B] hover:text-[#172B4D] dark:hover:text-white transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-[#718096] dark:text-[#94A3B8]" />
                          <span>Explore Public Issues</span>
                        </Link>

                        <Link
                          to="/about"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#718096] dark:text-[#94A3B8] hover:bg-[#F0F5FD] dark:hover:bg-[#1E293B] hover:text-[#172B4D] dark:hover:text-white transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#718096] dark:text-[#94A3B8]" />
                          <span>Citizen Charter & SLAs</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="pt-1 border-t border-[#DCE6F0] dark:border-[#1E293B]">
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-left transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="saffron"
                  size="sm"
                  leftIcon={<LogIn className="w-3.5 h-3.5" />}
                  onClick={openLoginModal}
                  className="text-xs font-bold shadow-subtle px-2.5 sm:px-4 py-1.5 sm:py-2 shrink-0"
                >
                  <span className="hidden sm:inline">Citizen </span>Login
                </Button>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* Global In-page Citizen Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
}
