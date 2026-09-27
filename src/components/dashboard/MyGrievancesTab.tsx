import { useState } from 'react';
import {
  Search,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  Construction,
  Trash2,
  Lightbulb,
  Droplets,
  HelpCircle,
  ThumbsUp,
} from 'lucide-react';
import type { DashboardGrievance, IssueCategory } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { EmptyState } from '../feedback/EmptyState';

interface MyGrievancesTabProps {
  grievances: DashboardGrievance[];
  onSelectIssue: (issue: DashboardGrievance) => void;
  onAdvanceStage?: (issueId: string) => void;
}

export function MyGrievancesTab({
  grievances,
  onSelectIssue,
  onAdvanceStage,
}: MyGrievancesTabProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-action' | 'resolved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const handleToggleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUpvotedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getCategoryIcon = (category: IssueCategory) => {
    switch (category) {
      case 'roads-infrastructure':
        return <Construction className="w-4 h-4 text-amber-600" />;
      case 'cleanliness':
        return <Trash2 className="w-4 h-4 text-emerald-600" />;
      case 'street-lighting':
        return <Lightbulb className="w-4 h-4 text-blue-600" />;
      case 'water-drainage':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      default:
        return <HelpCircle className="w-4 h-4 text-slate-500" />;
    }
  };

  const filtered = grievances.filter((item) => {
    // Filter status
    if (filterStatus === 'in-action') {
      if (item.status === 'resolved' || item.status === 'rejected') return false;
    } else if (filterStatus === 'resolved') {
      if (item.status !== 'resolved') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchId = item.id.toLowerCase().includes(q);
      const matchLoc = item.location.address.toLowerCase().includes(q);
      if (!matchTitle && !matchId && !matchLoc) return false;
    }

    return true;
  });

  const inActionCount = grievances.filter(
    (g) => g.status !== 'resolved' && g.status !== 'rejected'
  ).length;
  const resolvedCount = grievances.filter((g) => g.status === 'resolved').length;

  return (
    <div className="space-y-6">
      {/* Top Controls: Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Chips */}
        <div className="flex items-center gap-2 p-1 bg-slate-100/90 rounded-xl border border-slate-200/80 self-start">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({grievances.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('in-action')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === 'in-action'
                ? 'bg-white text-saffron-800 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3 h-3 text-saffron-600" />
            Under Action ({inActionCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('resolved')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === 'resolved'
                ? 'bg-white text-tirangaGreen-800 shadow-sm border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 text-tirangaGreen-600" />
            Resolved ({resolvedCount})
          </button>
        </div>

        {/* Search */}
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search by ID, title, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
      </div>

      {/* Grievances List */}
      {filtered.length === 0 ? (
        <EmptyState
          type={filterStatus === 'resolved' ? 'all-resolved' : 'no-search'}
          primaryAction={{
            label: 'Clear Filters',
            onClick: () => {
              setFilterStatus('all');
              setSearchQuery('');
            },
          }}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((grievance) => {
            const isUpvoted = upvotedIds[grievance.id];
            const currentVotes = grievance.upvotes + (isUpvoted ? 1 : 0);

            return (
              <Card
                key={grievance.id}
                hoverEffect
                onClick={() => onSelectIssue(grievance)}
                className="cursor-pointer border border-slate-200 bg-white p-5 sm:p-6 transition-all hover:border-chakra-400"
              >
                <div className="space-y-4">
                  {/* Top Bar: ID, Category, Status, Priority */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-chakra-800 bg-chakra-50 border border-chakra-200 px-2.5 py-0.5 rounded-md">
                        {grievance.id}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                        {getCategoryIcon(grievance.category)}
                        <span className="capitalize">
                          {grievance.category.replace('-', ' ')}
                        </span>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge priority={grievance.priority} className="text-[11px]">
                        {grievance.priority.toUpperCase()}
                      </Badge>
                      <Badge status={grievance.status} withDot className="text-[11px]">
                        {grievance.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Main Title & Description */}
                  <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-chakra-800 transition-colors">
                        {grievance.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 line-clamp-2">
                        {grievance.description}
                      </p>
                    </div>
                    {(grievance.photo || grievance.livePhoto) && (
                      <div className="shrink-0 relative">
                        <img
                          src={grievance.photo || grievance.livePhoto}
                          alt="Grievance evidence"
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-slate-200 shadow-xs"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                          Live Photo
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Progress Bar & Stage Indicator */}
                  <div className="space-y-1.5 bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-600 flex items-center gap-1">
                        <span>Resolution Progress:</span>
                        <span className="font-bold text-slate-800">
                          {grievance.stepIndex === 0 && 'Stage 1: Submitted'}
                          {grievance.stepIndex === 1 && 'Stage 2: Acknowledged & Work Order'}
                          {grievance.stepIndex === 2 && 'Stage 3: Field Crew Dispatched'}
                          {grievance.stepIndex === 3 && 'Stage 4: Verified & Resolved'}
                        </span>
                      </span>
                      <span
                        className={`font-bold ${
                          grievance.progressPercent === 100
                            ? 'text-tirangaGreen-700'
                            : 'text-saffron-700'
                        }`}
                      >
                        {grievance.progressPercent}%
                      </span>
                    </div>

                    <div className="w-full bg-slate-200/80 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          grievance.progressPercent === 100
                            ? 'bg-tirangaGreen-600'
                            : 'bg-gradient-to-r from-saffron-500 to-chakra-700'
                        }`}
                        style={{ width: `${grievance.progressPercent}%` }}
                      />
                    </div>

                    {/* Official Remarks Preview */}
                    <div className="flex items-start gap-1.5 pt-1 text-[11px] text-slate-600">
                      <span className="font-bold text-chakra-800 shrink-0">Official Note:</span>
                      <span className="truncate italic">&ldquo;{grievance.officialRemarks}&rdquo;</span>
                    </div>
                  </div>

                  {/* Bottom Meta & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-slate-100 text-xs text-slate-500">
                    <div className="flex flex-wrap items-center gap-y-1.5 gap-x-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                        {grievance.location.address}
                      </span>
                      {grievance.coordinates && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          GPS: {grievance.coordinates.latitude.toFixed(4)}°, {grievance.coordinates.longitude.toFixed(4)}°
                        </span>
                      )}
                      <span className="text-slate-300">•</span>
                      <span>Reported {grievance.reportedAt}</span>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Community Upvote */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleUpvote(grievance.id, e)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                          isUpvoted
                            ? 'bg-saffron-50 border-saffron-300 text-saffron-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                        title="Community Upvote"
                      >
                        <ThumbsUp className="w-3 h-3 text-saffron-600" />
                        <span>{currentVotes}</span>
                      </button>

                      {/* Simulate Stage Advance (if in progress) */}
                      {grievance.stepIndex < 3 && onAdvanceStage && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdvanceStage(grievance.id);
                          }}
                          className="hidden md:inline-flex items-center gap-1 text-[11px] font-semibold text-chakra-700 hover:text-chakra-900 bg-chakra-50 hover:bg-chakra-100 px-2 py-1 rounded-lg border border-chakra-200 transition-colors"
                          title="Simulate municipal status advance"
                        >
                          <Sparkles className="w-3 h-3 text-chakra-600" />
                          <span>Advance</span>
                        </button>
                      )}

                      {/* View Timeline Trigger */}
                      <Button
                        variant="secondary"
                        size="sm"
                        rightIcon={<ChevronRight className="w-3.5 h-3.5" />}
                        className="text-xs font-semibold py-1.5 px-3 min-h-[36px]"
                      >
                        Timeline
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
