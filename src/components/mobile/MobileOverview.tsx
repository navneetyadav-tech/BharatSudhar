import { Plus, ArrowRight, Clock, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import type { MobileReport } from './types';

interface MobileOverviewProps {
  userName: string;
  reports: MobileReport[];
  onStartReport: () => void;
  onViewReport: (report: MobileReport) => void;
  onViewAllReports: () => void;
}

export function MobileOverview({
  userName,
  reports,
  onStartReport,
  onViewReport,
  onViewAllReports,
}: MobileOverviewProps) {
  const totalCount = reports.length;
  const activeCount = reports.filter((r) => r.status !== 'resolved').length;
  const resolvedCount = reports.filter((r) => r.status === 'resolved').length;

  return (
    <div className="space-y-5 pb-6">
      {/* Welcome Banner with Civic Smart City Background */}
      <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-[#274682] via-[#3157A4] to-[#1c3668] text-white shadow-subtle border border-[#3157A4]/30">
        {/* Civic backdrop texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-luminosity scale-105"
          style={{ backgroundImage: "url('/images/civic-hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#172B4D]/60 via-transparent to-[#172B4D]/40 pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-white/95 text-[10px] sm:text-xs font-semibold mb-2 backdrop-blur-md border border-white/20 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
              Citizen Overview Portal
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight">
              Welcome, {userName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-100/90 mt-1 max-w-md leading-relaxed">
              Your civic dashboard for reporting and tracking local community issues.
            </p>
          </div>

          {/* Prominent "+ Report a Problem" Button */}
          <button
            type="button"
            onClick={onStartReport}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] active:scale-98 text-[#172B4D] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all w-full sm:w-auto shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Report a Problem</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards with Top Accent Borders */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {/* Card 1: Total reports filed (Primary Navy Blue Top Border) */}
        <div className="bg-white rounded-2xl border border-[#DCE6F0] shadow-subtle overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 transition-all hover:border-[#3157A4]/40">
          <div className="h-1 -mt-3.5 -mx-3.5 sm:-mt-4 sm:-mx-4 bg-[#3157A4] mb-2 sm:mb-3" />
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#172B4D] leading-none">
              {totalCount}
            </div>
            <p className="text-[11px] sm:text-xs text-[#718096] font-medium mt-1.5 leading-snug">
              Total reports filed
            </p>
          </div>
        </div>

        {/* Card 2: Currently active (Lemon Yellow Top Border) */}
        <div className="bg-white rounded-2xl border border-[#DCE6F0] shadow-subtle overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 transition-all hover:border-[#FACC15]/40">
          <div className="h-1 -mt-3.5 -mx-3.5 sm:-mt-4 sm:-mx-4 bg-[#FACC15] mb-2 sm:mb-3" />
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#172B4D] leading-none">
              {activeCount}
            </div>
            <p className="text-[11px] sm:text-xs text-[#718096] font-medium mt-1.5 leading-snug">
              Currently active
            </p>
          </div>
        </div>

        {/* Card 3: Resolved (Success Green Top Border) */}
        <div className="bg-white rounded-2xl border border-[#DCE6F0] shadow-subtle overflow-hidden flex flex-col justify-between p-3.5 sm:p-4 transition-all hover:border-[#22A982]/40">
          <div className="h-1 -mt-3.5 -mx-3.5 sm:-mt-4 sm:-mx-4 bg-[#22A982] mb-2 sm:mb-3" />
          <div>
            <div className="text-2xl sm:text-4xl font-extrabold text-[#172B4D] leading-none">
              {resolvedCount}
            </div>
            <p className="text-[11px] sm:text-xs text-[#718096] font-medium mt-1.5 leading-snug">
              Resolved
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-[#172B4D]">
            Recent activity
          </h3>
          {reports.length > 0 && (
            <button
              type="button"
              onClick={onViewAllReports}
              className="text-xs font-semibold text-[#3157A4] hover:text-[#254483] flex items-center gap-1 transition-colors"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {reports.length === 0 ? (
          /* Empty State */
          <div className="border border-dashed border-[#DCE6F0] rounded-2xl p-8 sm:p-12 text-center bg-white shadow-subtle">
            <p className="text-xs sm:text-sm text-[#718096] max-w-sm mx-auto mb-4">
              You haven't reported anything yet. Spotted a civic issue nearby?
            </p>
            <button
              type="button"
              onClick={onStartReport}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#F4F8FC] border border-[#DCE6F0] hover:bg-[#EBF2FA] active:bg-[#E2EDF8] text-xs sm:text-sm font-semibold text-[#172B4D] shadow-subtle transition-colors"
            >
              Report it now
            </button>
          </div>
        ) : (
          /* Populated recent activity cards */
          <div className="space-y-2.5">
            {reports.slice(0, 3).map((report) => (
              <div
                key={report.id}
                onClick={() => onViewReport(report)}
                className="bg-white rounded-2xl border border-[#DCE6F0] p-3.5 sm:p-4 shadow-subtle hover:border-[#3157A4]/40 hover:shadow-card transition-all cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {report.photoUrl ? (
                    <img
                      src={report.photoUrl}
                      alt={report.categoryName}
                      className="w-12 h-12 rounded-xl object-cover border border-[#DCE6F0] shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-[#EBF2FA] text-[#3157A4] flex items-center justify-center font-bold text-xl shrink-0">
                      {report.categoryEmoji || '📋'}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-xs sm:text-sm text-[#172B4D] truncate">
                        {report.categoryName}
                      </span>
                      <span className="text-[10px] font-mono font-semibold text-[#718096]">
                        #{report.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-[11px] text-[#718096]">
                      <span className="flex items-center gap-1 truncate max-w-[140px] sm:max-w-[200px]">
                        <MapPin className="w-3 h-3 text-[#718096] shrink-0" />
                        <span className="truncate">{report.location.locality || 'Ward Area'}</span>
                      </span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-[#718096]" />
                        <span>{report.timestamp}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      report.status === 'resolved'
                        ? 'bg-[#22A982]/10 text-[#22A982] border border-[#22A982]/20'
                        : report.status === 'in-progress'
                        ? 'bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047]'
                        : 'bg-[#3157A4]/10 text-[#3157A4] border border-[#3157A4]/20'
                    }`}
                  >
                    {report.status === 'resolved' ? (
                      <CheckCircle2 className="w-2.5 h-2.5" />
                    ) : (
                      <AlertCircle className="w-2.5 h-2.5" />
                    )}
                    <span>
                      {report.status === 'resolved'
                        ? 'Resolved'
                        : report.status === 'in-progress'
                        ? 'In Action'
                        : 'Under Review'}
                    </span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#718096]" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
