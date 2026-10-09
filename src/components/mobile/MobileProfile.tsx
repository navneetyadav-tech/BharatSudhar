import { useState } from 'react';
import {
  Sparkles,
  PhoneCall,
  MapPin,
  Building2,
  LogOut,
  Check,
  Edit2,
  ChevronRight,
  Plus,
  FileText,
} from 'lucide-react';
import type { MobileReport } from './types';

interface MobileProfileProps {
  userName: string;
  onUpdateUserName: (name: string) => void;
  reports: MobileReport[];
  onStartReport: () => void;
  onViewReports: () => void;
  onLogout: () => void;
}

export function MobileProfile({
  userName,
  onUpdateUserName,
  reports,
  onStartReport,
  onViewReports,
  onLogout,
}: MobileProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userName);

  const handleSave = () => {
    if (tempName.trim()) {
      onUpdateUserName(tempName.trim());
    }
    setIsEditing(false);
  };

  const totalReports = reports.length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;
  const activeCount = reports.filter((r) => r.status !== 'resolved').length;
  const karmaPoints = 350 + (resolvedCount * 50) + (totalReports * 20);

  return (
    <div className="space-y-4 pb-8">
      {/* Citizen Profile Banner Card */}
      <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#274682] via-[#3157A4] to-[#1c3668] dark:from-[#1E3A8A] dark:via-[#1D4ED8] dark:to-[#0F172A] text-white shadow-subtle border border-[#3157A4]/30 dark:border-blue-500/20">
        <div className="flex items-center gap-3.5">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#FACC15] to-[#fde047] text-[#172B4D] font-black text-xl flex items-center justify-center shadow-md ring-2 ring-white/30 shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 min-w-0">
            {/* Editable Name */}
            {isEditing ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  className="px-2 py-1 text-xs text-[#172B4D] bg-white rounded-lg font-bold focus:outline-none w-36"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={handleSave}
                  className="p-1 rounded-lg bg-[#22A982] text-white hover:bg-[#1b8a6a]"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 mt-1">
                <h2 className="text-base sm:text-lg font-extrabold text-white truncate font-poppins">
                  {userName}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setTempName(userName);
                    setIsEditing(true);
                  }}
                  className="text-white/70 hover:text-white p-0.5 transition-colors"
                  title="Edit citizen name"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
              </div>
            )}

            <p className="text-[11px] text-slate-200 mt-0.5 flex items-center gap-1 font-medium">
              <MapPin className="w-3 h-3 text-[#FACC15] shrink-0" />
              <span>Ward 45-B · New Delhi, Delhi</span>
            </p>
          </div>
        </div>

        {/* Civic Karma Progress Bar */}
        <div className="mt-4 pt-3 border-t border-white/15">
          <div className="flex items-center justify-between text-[11px] mb-1 font-semibold text-slate-100">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
              Civic Karma Score
            </span>
            <span className="text-[#FACC15] font-black">{karmaPoints} / 600 PTS</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/25 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FACC15] to-[#22A982] rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.round((karmaPoints / 600) * 100))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Activity Statistics 3-Card Grid */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-3 border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle text-center">
          <p className="text-xs text-[#718096] dark:text-[#94A3B8] font-semibold">Reported</p>
          <p className="text-lg font-black text-[#172B4D] dark:text-white mt-0.5">{totalReports}</p>
        </div>
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-3 border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle text-center">
          <p className="text-xs text-[#718096] dark:text-[#94A3B8] font-semibold">In Action</p>
          <p className="text-lg font-black text-[#CA8A04] dark:text-[#FACC15] mt-0.5">{activeCount}</p>
        </div>
        <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-3 border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle text-center">
          <p className="text-xs text-[#718096] dark:text-[#94A3B8] font-semibold">Resolved</p>
          <p className="text-lg font-black text-[#22A982] dark:text-[#34D399] mt-0.5">{resolvedCount}</p>
        </div>
      </div>

      {/* Ward Details Card */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F4F8FC] dark:border-[#1E293B]">
          <Building2 className="w-4 h-4 text-[#3157A4] dark:text-[#60A5FA]" />
          <h3 className="text-xs font-black text-[#172B4D] dark:text-white uppercase tracking-wider">
            Assigned Ward Administration
          </h3>
        </div>
        <div className="text-xs space-y-2 text-[#718096] dark:text-[#94A3B8] font-medium">
          <div className="flex justify-between">
            <span>Municipality:</span>
            <strong className="text-[#172B4D] dark:text-white">MCD Central Zone</strong>
          </div>
          <div className="flex justify-between">
            <span>Ward Number:</span>
            <strong className="text-[#172B4D] dark:text-white">Ward 45-B (Lajpat Nagar)</strong>
          </div>
          <div className="flex justify-between">
            <span>Sanitary Inspector:</span>
            <strong className="text-[#172B4D] dark:text-white">Er. S. K. Meena</strong>
          </div>
          <div className="flex justify-between">
            <span>Road Division:</span>
            <strong className="text-[#172B4D] dark:text-white">South PWD Works Dept</strong>
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-2">
        <button
          type="button"
          onClick={onStartReport}
          className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-[#0F172A] rounded-2xl border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle hover:border-[#3157A4] dark:hover:border-blue-500/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#FEF9C3] dark:bg-yellow-950/70 text-[#854D0E] dark:text-[#FACC15] flex items-center justify-center font-bold">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[#172B4D] dark:text-white group-hover:text-[#3157A4] dark:group-hover:text-[#60A5FA]">
                Report New Problem
              </p>
              <p className="text-[10px] text-[#718096] dark:text-[#94A3B8]">Geo-tag & upload evidence</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#718096] dark:text-[#94A3B8]" />
        </button>

        <button
          type="button"
          onClick={onViewReports}
          className="w-full flex items-center justify-between p-3.5 bg-white dark:bg-[#0F172A] rounded-2xl border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle hover:border-[#3157A4] dark:hover:border-blue-500/50 transition-all group"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#EBF1FA] dark:bg-blue-950/70 text-[#3157A4] dark:text-[#60A5FA] flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-[#172B4D] dark:text-white group-hover:text-[#3157A4] dark:group-hover:text-[#60A5FA]">
                My Submitted Grievances
              </p>
              <p className="text-[10px] text-[#718096] dark:text-[#94A3B8]">Track progress & engineer remarks</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#718096] dark:text-[#94A3B8]" />
        </button>
      </div>

      {/* Emergency Helplines Pill Card */}
      <div className="bg-[#F0FDF4] dark:bg-emerald-950/40 border border-[#BBF7D0] dark:border-emerald-800/40 rounded-2xl p-3.5 text-xs text-[#166534] dark:text-emerald-300">
        <div className="flex items-center gap-1.5 font-bold mb-1.5">
          <PhoneCall className="w-3.5 h-3.5 text-[#166534] dark:text-emerald-400" />
          <span>Emergency Municipal Contacts</span>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[11px] opacity-90 font-medium">
          <p>Swachhata Call: <strong className="text-emerald-900 dark:text-emerald-200">1969</strong></p>
          <p>Water Leakage: <strong className="text-emerald-900 dark:text-emerald-200">1916</strong></p>
          <p>Electricity Hazard: <strong className="text-emerald-900 dark:text-emerald-200">1912</strong></p>
          <p>National Emergency: <strong className="text-emerald-900 dark:text-emerald-200">112</strong></p>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        type="button"
        onClick={onLogout}
        className="w-full flex items-center justify-center gap-2 p-3 bg-white dark:bg-[#0F172A] hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl border border-[#DCE6F0] dark:border-[#1E293B] hover:border-rose-200 dark:hover:border-rose-800 text-xs font-bold transition-all shadow-subtle"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out Citizen Profile</span>
      </button>
    </div>
  );
}
