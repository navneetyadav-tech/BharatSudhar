import { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Phone,
  Building2,
  FileCheck,
  ChevronRight,
  Sparkles,
  Download,
} from 'lucide-react';
import type { DashboardGrievance } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

interface IssueTimelineModalProps {
  issue: DashboardGrievance | null;
  isOpen: boolean;
  onClose: () => void;
  onAdvanceStage?: (issueId: string) => void;
}

export function IssueTimelineModal({
  issue,
  isOpen,
  onClose,
  onAdvanceStage,
}: IssueTimelineModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen || !issue) return null;

  const handleDownloadReceipt = () => {
    setDownloadSuccess(true);
    setTimeout(() => {
      setDownloadSuccess(false);
    }, 2500);
  };

  const stepsList = [
    { label: 'Submitted', desc: 'Registered by citizen' },
    { label: 'Acknowledged', desc: 'Triaged by Ward' },
    { label: 'Dispatched', desc: 'Field crew assigned' },
    { label: 'Resolved', desc: 'Verified & closed' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Dark Dim Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Center */}
      <div className="flex min-h-full items-center justify-center p-3 sm:p-4 text-center">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-slate-200 animate-scale-in">
          {/* Header */}
          <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-200 bg-slate-50/80">
            <div className="space-y-1.5 pr-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-bold text-chakra-800 bg-chakra-50 border border-chakra-200 px-2 py-0.5 rounded">
                  {issue.id}
                </span>
                <Badge status={issue.status} withDot>
                  {issue.status.replace('-', ' ').toUpperCase()}
                </Badge>
                <Badge priority={issue.priority}>
                  {issue.priority.toUpperCase()} PRIORITY
                </Badge>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                {issue.title}
              </h2>

              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
                <span>
                  {issue.location.address}, {issue.location.ward}, {issue.location.city} - {issue.location.pincode}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 sm:p-6 space-y-6 max-h-[72vh] overflow-y-auto">
            {/* Visual Multi-step Stepper */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Resolution Workflow Stage
              </p>
              <div className="grid grid-cols-4 gap-2 relative">
                {stepsList.map((step, idx) => {
                  const isDone = idx < issue.stepIndex || issue.stepIndex === 3;
                  const isCurrent = idx === issue.stepIndex && issue.stepIndex !== 3;

                  return (
                    <div key={step.label} className="text-center relative">
                      {/* Step Circle */}
                      <div className="flex justify-center mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            isDone
                              ? 'bg-tirangaGreen-600 text-white shadow-sm'
                              : isCurrent
                              ? 'bg-saffron-500 text-white ring-4 ring-saffron-100 animate-pulse'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                        </div>
                      </div>

                      <p
                        className={`text-xs font-bold ${
                          isDone
                            ? 'text-tirangaGreen-800'
                            : isCurrent
                            ? 'text-saffron-800'
                            : 'text-slate-500'
                        }`}
                      >
                        {step.label}
                      </p>
                      <p className="text-[10px] text-slate-400 hidden sm:block mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Official Municipal Remarks Callout */}
            {issue.officialRemarks && (
              <div className="bg-chakra-50/70 border border-chakra-200 rounded-xl p-4 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-chakra-900">
                  <Building2 className="w-4 h-4 text-chakra-700" />
                  <span>Latest Official Municipal Update</span>
                </div>
                <p className="text-slate-700 leading-relaxed pl-5">
                  &ldquo;{issue.officialRemarks}&rdquo;
                </p>
                <div className="pl-5 text-[11px] text-chakra-800 font-medium">
                  {issue.estimatedResolution}
                </div>
              </div>
            )}

            {/* Assigned Officer Card (if available) */}
            {issue.assignedOfficer && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-white text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{issue.assignedOfficer.name}</p>
                    <p className="text-slate-500">
                      {issue.assignedOfficer.designation} • {issue.assignedOfficer.department}
                    </p>
                  </div>
                </div>

                {issue.assignedOfficer.phone && (
                  <a
                    href={`tel:${issue.assignedOfficer.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors self-start sm:self-auto"
                  >
                    <Phone className="w-3.5 h-3.5 text-saffron-600" />
                    <span>{issue.assignedOfficer.phone}</span>
                  </a>
                )}
              </div>
            )}

            {/* Geotagged Photo & GPS Evidence Card */}
            {(issue.photo || issue.livePhoto || issue.coordinates) && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-saffron-600" />
                    Geotagged Evidence & GPS Coordinates
                  </span>
                  {issue.coordinates && (
                    <span className="font-mono text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                      GPS: {issue.coordinates.latitude.toFixed(5)}°N, {issue.coordinates.longitude.toFixed(5)}°E (±{issue.coordinates.accuracy || 5}m)
                    </span>
                  )}
                </div>

                {(issue.photo || issue.livePhoto) && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center">
                    <img
                      src={issue.photo || issue.livePhoto}
                      alt="Captured evidence"
                      className="max-h-64 w-full object-contain"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Detailed Timeline Events */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Audit & Verification Timeline</span>
              </h3>

              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {issue.timeline.map((event) => (
                  <div key={event.id} className="relative group">
                    {/* Timeline Node Icon */}
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 bg-white flex items-center justify-center ${
                        event.isCompleted
                          ? 'border-tirangaGreen-600 text-tirangaGreen-600'
                          : 'border-slate-300 text-slate-300'
                      }`}
                    >
                      {event.isCompleted ? (
                        <div className="w-2 h-2 rounded-full bg-tirangaGreen-600" />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      )}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900">
                          {event.title}
                        </span>
                        <span className="text-[11px] font-medium text-slate-500">
                          {event.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-normal">
                        {event.description}
                      </p>

                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="font-semibold text-slate-700">{event.actor}</span>
                        {event.actorRole && (
                          <>
                            <span>•</span>
                            <span>{event.actorRole}</span>
                          </>
                        )}
                      </div>

                      {event.officialRemark && (
                        <div className="mt-1.5 p-2 rounded bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900">
                          <strong>Note:</strong> {event.officialRemark}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Interactive Demo Action: Advance Stage */}
            {issue.stepIndex < 3 && onAdvanceStage && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onAdvanceStage(issue.id)}
                leftIcon={<Sparkles className="w-3.5 h-3.5 text-saffron-600" />}
                className="text-xs"
              >
                Simulate Next Stage <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            )}

            {issue.stepIndex === 3 && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                Grievance Officially Resolved & Closed
              </span>
            )}

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleDownloadReceipt}
                leftIcon={<Download className="w-3.5 h-3.5" />}
                className="text-xs"
              >
                {downloadSuccess ? 'Downloaded!' : 'Civic Receipt'}
              </Button>

              <Button variant="primary" size="sm" onClick={onClose} className="text-xs">
                Done
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
