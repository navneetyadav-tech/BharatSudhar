import { useState } from 'react';
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronRight,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import type { MobileReport } from './types';

interface MobileMyReportsProps {
  reports: MobileReport[];
  onStartReport: () => void;
  onAdvanceReportStage: (reportId: string) => void;
}

export function MobileMyReports({
  reports,
  onStartReport,
  onAdvanceReportStage,
}: MobileMyReportsProps) {
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  const filteredReports = reports.filter((r) => {
    if (filter === 'active') return r.status !== 'resolved';
    if (filter === 'resolved') return r.status === 'resolved';
    return true;
  });

  return (
    <div className="space-y-4 pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] tracking-tight">
            My Reports
          </h2>
          <p className="text-xs text-[#718096]">
            Real-time tracking of complaints filed with your municipal corporation.
          </p>
        </div>

        <button
          type="button"
          onClick={onStartReport}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#172B4D] font-bold text-xs shadow-subtle transition-all shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Report</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-[#DCE6F0] shadow-subtle">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            filter === 'all'
              ? 'bg-[#EBF2FA] text-[#3157A4] shadow-subtle font-bold'
              : 'text-[#718096] hover:text-[#172B4D]'
          }`}
        >
          All ({reports.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('active')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            filter === 'active'
              ? 'bg-[#EBF2FA] text-[#3157A4] shadow-subtle font-bold'
              : 'text-[#718096] hover:text-[#172B4D]'
          }`}
        >
          Active ({reports.filter((r) => r.status !== 'resolved').length})
        </button>
        <button
          type="button"
          onClick={() => setFilter('resolved')}
          className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
            filter === 'resolved'
              ? 'bg-[#EBF2FA] text-[#3157A4] shadow-subtle font-bold'
              : 'text-[#718096] hover:text-[#172B4D]'
          }`}
        >
          Resolved ({reports.filter((r) => r.status === 'resolved').length})
        </button>
      </div>

      {/* Reports List */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#DCE6F0] p-8 text-center space-y-3 shadow-subtle">
          <p className="text-xs sm:text-sm text-[#718096]">
            No complaints found in this category.
          </p>
          <button
            type="button"
            onClick={onStartReport}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FACC15] text-[#172B4D] text-xs font-bold hover:bg-[#EAB308] shadow-subtle"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Report a Problem Now</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const isExpanded = selectedReportId === report.id;
            return (
              <div
                key={report.id}
                className="bg-white rounded-2xl border border-[#DCE6F0] overflow-hidden shadow-subtle hover:border-[#3157A4]/30 hover:shadow-card transition-all"
              >
                {/* Main Card Content */}
                <div className="p-3.5 sm:p-4 space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">📍</span>
                      <div>
                        <h4 className="font-bold text-sm text-[#172B4D] leading-tight">
                          {report.categoryName}
                        </h4>
                        <span className="font-mono text-[10px] text-[#718096]">
                          #{report.id}
                        </span>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                        report.status === 'resolved'
                          ? 'bg-[#22A982]/10 text-[#22A982] border border-[#22A982]/20'
                          : report.status === 'in-progress'
                          ? 'bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047]'
                          : 'bg-[#3157A4]/10 text-[#3157A4] border border-[#3157A4]/20'
                      }`}
                    >
                      {report.status === 'resolved' ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <AlertCircle className="w-3 h-3" />
                      )}
                      <span>
                        {report.status === 'resolved'
                          ? 'Resolved'
                          : report.status === 'in-progress'
                          ? 'In Action'
                          : 'Under Review'}
                      </span>
                    </span>
                  </div>

                  {/* Photo & Description Row */}
                  <div className="flex gap-3 items-start">
                    {report.photoUrl && (
                      <img
                        src={report.photoUrl}
                        alt={report.categoryName}
                        className="w-16 h-16 rounded-xl object-cover border border-[#DCE6F0] shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#172B4D] line-clamp-2 italic">
                        "{report.description}"
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#718096]">
                        <span className="flex items-center gap-1 truncate max-w-[150px]">
                          <MapPin className="w-3 h-3 text-[#718096] shrink-0" />
                          <span className="truncate">{report.location.locality}</span>
                        </span>
                        <span className="flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3 text-[#718096]" />
                          <span>{report.timestamp}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status Progress Line */}
                  <div className="pt-2 border-t border-[#DCE6F0]">
                    <div className="flex items-center justify-between text-[10px] text-[#718096] font-semibold mb-1">
                      <span>Complaint Registered</span>
                      <span>Field Inspection</span>
                      <span>Action Taken</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="h-1.5 rounded-full bg-[#22A982]" />
                      <div
                        className={`h-1.5 rounded-full ${
                          report.status === 'in-progress' || report.status === 'resolved'
                            ? 'bg-[#FACC15]'
                            : 'bg-[#DCE6F0]'
                        }`}
                      />
                      <div
                        className={`h-1.5 rounded-full ${
                          report.status === 'resolved' ? 'bg-[#22A982]' : 'bg-[#DCE6F0]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Expand/Collapse Toggle & Demo Action */}
                  <div className="pt-1 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedReportId(isExpanded ? null : report.id)
                      }
                      className="text-xs font-semibold text-[#3157A4] hover:text-[#254483] flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? 'Hide details' : 'View tracking timeline'}</span>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>

                    {/* Stage Advancement Simulation Button for Demo */}
                    {report.status !== 'resolved' && (
                      <button
                        type="button"
                        onClick={() => onAdvanceReportStage(report.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#718096] bg-[#F4F8FC] hover:bg-[#EBF2FA] hover:text-[#172B4D] border border-[#DCE6F0] px-2.5 py-1 rounded-lg transition-colors shadow-subtle"
                        title="Simulate municipal stage advance"
                      >
                        <Sparkles className="w-3 h-3 text-[#EAB308]" />
                        <span>Advance Stage (Demo)</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Timeline Details */}
                {isExpanded && (
                  <div className="bg-[#F4F8FC] p-4 border-t border-[#DCE6F0] space-y-3 text-xs animate-fade-in">
                    <div className="space-y-1">
                      <span className="font-bold text-[#172B4D] block">
                        Assigned Department:
                      </span>
                      <span className="text-[#718096]">
                        {report.assignedDepartment || 'Ward Rapid Civic Action Cell'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="font-bold text-[#172B4D] block">Official Remarks:</span>
                      <div className="p-2.5 rounded-xl bg-white border border-[#DCE6F0] text-[#172B4D] text-xs">
                        {report.officialRemarks ||
                          'Grievance logged into municipal registry. Junior engineer assigned for on-site assessment.'}
                      </div>
                    </div>

                    <div className="text-[11px] text-[#718096] pt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#22A982]" />
                      <span>Tamper-proof municipal audit ledger verification ID: #{report.id}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
