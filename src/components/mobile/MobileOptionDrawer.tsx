import { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Compass,
  PlusCircle,
  FileText,
  User,
  ShieldCheck,
  PhoneCall,
  LogOut,
  Monitor,
  Smartphone,
  Check,
  ChevronRight,
} from 'lucide-react';
import type { MobileTab } from './types';

interface MobileOptionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
  userName: string;
  onUpdateUserName: (name: string) => void;
  onLogout: () => void;
  isFrameMode?: boolean;
  onToggleFrameMode?: () => void;
  reportsCount: number;
}

export function MobileOptionDrawer({
  isOpen,
  onClose,
  activeTab,
  onSelectTab,
  userName,
  onUpdateUserName,
  onLogout,
  isFrameMode,
  onToggleFrameMode,
  reportsCount,
}: MobileOptionDrawerProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(userName);

  if (!isOpen) return null;

  const handleSaveName = () => {
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setIsEditingName(false);
  };

  const navItems = [
    { id: 'overview' as MobileTab, label: 'Citizen Dashboard', icon: LayoutDashboard },
    { id: 'explore' as MobileTab, label: 'Explore Public Issues', icon: Compass },
    { id: 'report' as MobileTab, label: 'Report a Problem', icon: PlusCircle, isPrimary: true },
    { id: 'my-reports' as MobileTab, label: 'My Submitted Reports', icon: FileText, badge: reportsCount },
    { id: 'profile' as MobileTab, label: 'Citizen Profile & Karma', icon: User },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel */}
      <aside
        className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out animate-slide-right overflow-y-auto"
        aria-label="Options Panel"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#DCE6F0] flex items-center justify-between bg-gradient-to-r from-[#F4F8FC] to-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#22A982] animate-pulse" />
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#3157A4]">
              Options & Services
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white border border-[#DCE6F0] text-[#718096] hover:text-[#172B4D] hover:bg-[#F4F8FC] flex items-center justify-center transition-colors shadow-xs"
            title="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Citizen Profile Banner Card */}
        <div className="p-4 border-b border-[#DCE6F0] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3157A4] to-[#4573ca] text-white flex items-center justify-center font-black text-sm shadow-sm shrink-0">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              {isEditingName ? (
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveName()}
                    className="w-full text-xs font-bold text-[#172B4D] border border-[#3157A4] rounded-lg px-2 py-0.5 bg-white focus:outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleSaveName}
                    className="p-1 rounded-lg bg-[#22A982] text-white hover:bg-[#1b8a6a]"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 group">
                  <p className="text-xs font-bold text-[#172B4D] truncate">{userName}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setTempName(userName);
                      setIsEditingName(true);
                    }}
                    className="text-[10px] text-[#718096] hover:text-[#3157A4] underline"
                    title="Edit Name"
                  >
                    Edit
                  </button>
                </div>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-[#718096]">Ward 45-B · New Delhi</span>
                <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047]">
                  150 PTS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Items List */}
        <div className="p-3 flex-1 space-y-1">
          <p className="text-[10px] font-bold text-[#718096] uppercase tracking-wider px-3 py-1">
            Navigation
          </p>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#EBF1FA] text-[#3157A4] font-bold shadow-subtle'
                    : item.isPrimary
                    ? 'bg-[#FEF9C3] text-[#854D0E] hover:bg-[#FDE047]/60'
                    : 'text-[#718096] hover:bg-[#F4F8FC] hover:text-[#172B4D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#3157A4]' : item.isPrimary ? 'text-[#854D0E]' : 'text-[#718096]'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FACC15] text-[#172B4D]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Tools & Civic Links */}
          <div className="pt-3 mt-3 border-t border-[#DCE6F0]">
            <p className="text-[10px] font-bold text-[#718096] uppercase tracking-wider px-3 py-1">
              Civic Services
            </p>

            <a
              href="/about"
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#718096] hover:bg-[#F4F8FC] hover:text-[#172B4D] transition-colors"
            >
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#718096]" />
                <span>Citizen Charter & SLAs</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-[#718096]" />
            </a>

            {/* Helpline quick contacts */}
            <div className="px-3 py-2 mt-1 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[11px] text-[#166534]">
              <div className="flex items-center gap-1.5 font-bold mb-1">
                <PhoneCall className="w-3 h-3 text-[#166534]" />
                <span>Emergency Helplines</span>
              </div>
              <div className="text-[10px] space-y-0.5 opacity-90">
                <p>Municipal Swachhata: <strong>1969</strong></p>
                <p>Water Supply Grievance: <strong>1916</strong></p>
              </div>
            </div>

            {/* View Mode Toggle if on desktop */}
            {onToggleFrameMode && (
              <button
                type="button"
                onClick={() => {
                  onToggleFrameMode();
                  onClose();
                }}
                className="w-full mt-2 flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#718096] hover:bg-[#F4F8FC] hover:text-[#172B4D] transition-colors"
              >
                <div className="flex items-center gap-3">
                  {isFrameMode ? (
                    <Monitor className="w-4 h-4 text-[#3157A4]" />
                  ) : (
                    <Smartphone className="w-4 h-4 text-[#CA8A04]" />
                  )}
                  <span>{isFrameMode ? 'Switch to Desktop View' : 'Preview Phone Frame'}</span>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Drawer Footer with Logout */}
        <div className="p-3 border-t border-[#DCE6F0] bg-white">
          <button
            type="button"
            onClick={() => {
              onClose();
              onLogout();
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Profile</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
