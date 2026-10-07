import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LogIn,
  LogOut,
  LayoutDashboard,
  MapPin,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Container } from '../common/Container';
import { BharatSudharLogo } from '../common/BharatSudharLogo';
import { useAuth } from '../../context/AuthContext';
import { LoginModal } from '../auth/LoginModal';

export function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, isLoginModalOpen, openLoginModal, closeLoginModal, logout } = useAuth();
  const location = useLocation();

  const isCurrent = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-header shadow-subtle border-b border-[#E2E8F0]/70">

        <Container>
          <div className="flex h-16 sm:h-18 items-center justify-between gap-4">
            {/* Brand Identity */}
            <Link
              to="/"
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3157A4] rounded-xl py-1 px-1 transition-transform hover:scale-[1.02] shrink-0"
              title="Bharat Sudhar Home"
            >
              {/* Civic Tech Emblem Logo */}
              <BharatSudharLogo size="md" />

              {/* Brand Wordmark (No line) */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                {/* Bharat in Navy Blue */}
                <span className="text-2xl sm:text-[26px] font-black font-poppins text-[#0B2545] tracking-tight leading-none drop-shadow-xs">
                  Bharat
                </span>

                {/* Sudhar with Tiranga Gradient & Leaf Sprout */}
                <span className="relative text-2xl sm:text-[26px] font-black font-poppins bg-gradient-to-r from-[#FF671F] via-[#F35D07] to-[#046A38] bg-clip-text text-transparent tracking-tight leading-none">
                  Sudhar
                  {/* Sprout Green Leaf atop Sudhar */}
                  <span className="absolute -top-2.5 -right-3.5 select-none pointer-events-none">
                    <svg className="w-3.5 h-3.5 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor">
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
                    ? 'bg-[#EBF1FA] text-[#3157A4] font-bold'
                    : 'text-[#718096] hover:text-[#172B4D] hover:bg-[#F0F5FD]'
                }`}
              >
                Home
              </Link>
              <Link
                to="/issues"
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isCurrent('/issues')
                    ? 'bg-[#EBF1FA] text-[#3157A4] font-bold'
                    : 'text-[#718096] hover:text-[#172B4D] hover:bg-[#F0F5FD]'
                }`}
              >
                Public Issues
              </Link>
              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                  isCurrent('/about')
                    ? 'bg-[#EBF1FA] text-[#3157A4] font-bold'
                    : 'text-[#718096] hover:text-[#172B4D] hover:bg-[#F0F5FD]'
                }`}
              >
                Citizen Charter
              </Link>
            </nav>

            {/* Right Action / Profile Button */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#DCE6F0] bg-white hover:bg-[#F4F8FC] transition-colors shadow-subtle group"
                    title="Citizen Profile"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#3157A4] text-white font-bold text-xs flex items-center justify-center shadow-subtle">
                      {user.avatar}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-[#172B4D] leading-tight group-hover:text-[#3157A4]">
                        {user.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] font-semibold text-[#854D0E] leading-tight">
                        {user.civicKarma} PTS
                      </span>
                    </div>
                  </button>

                  {/* User Dropdown Navigation Panel */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#DCE6F0] shadow-card py-2 z-50 animate-scale-in">
                      {/* User Header */}
                      <div className="px-4 py-2.5 border-b border-[#DCE6F0] bg-[#F0F5FD]/50">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold text-[#172B4D]">{user.name}</p>
                          <span className="px-2 py-0.5 rounded-full bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047] text-[10px] font-bold">
                            {user.civicKarma} Karma
                          </span>
                        </div>
                        <p className="text-[11px] text-[#718096] mt-0.5">
                          {user.ward}, {user.city}
                        </p>
                      </div>

                      {/* Navigation Options in Menu */}
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#172B4D] hover:bg-[#EBF1FA] hover:text-[#3157A4] transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#3157A4]" />
                          <div>
                            <span className="block font-bold">Citizen Dashboard</span>
                            <span className="text-[10px] text-[#718096]">Reports, karma & actions</span>
                          </div>
                        </Link>

                        <Link
                          to="/issues"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#718096] hover:bg-[#F0F5FD] hover:text-[#172B4D] transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-[#718096]" />
                          <span>Explore Public Issues</span>
                        </Link>

                        <Link
                          to="/about"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-[#718096] hover:bg-[#F0F5FD] hover:text-[#172B4D] transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-[#718096]" />
                          <span>Citizen Charter & SLAs</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="pt-1 border-t border-[#DCE6F0]">
                        <button
                          type="button"
                          onClick={() => {
                            setShowUserMenu(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 text-left transition-colors"
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
                  size="md"
                  leftIcon={<LogIn className="w-4 h-4" />}
                  onClick={openLoginModal}
                  className="text-xs sm:text-sm font-bold shadow-subtle px-4 py-2"
                >
                  Citizen Login
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
