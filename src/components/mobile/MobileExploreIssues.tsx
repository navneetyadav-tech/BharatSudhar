import { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  ThumbsUp,
  AlertCircle,
  CheckCircle2,
  Plus,
  Building2,
} from 'lucide-react';
import type { CivicIssue } from '../../types';

const COMMUNITY_ISSUES: CivicIssue[] = [
  {
    id: 'BS-2026-081',
    title: 'Severe Pothole Cluster near Metro Gate 3',
    description: 'Multiple deep craters causing heavy traffic slowdown and risk of two-wheeler skidding during rain.',
    category: 'roads-infrastructure',
    status: 'in-progress',
    priority: 'urgent',
    location: {
      address: 'Ring Road, Near Metro Gate 3',
      city: 'New Delhi',
      ward: 'Ward 45-B',
      pincode: '110024',
    },
    reportedAt: '2 hours ago',
    updatedAt: '30 mins ago',
    upvotes: 42,
    reportedBy: 'Rajesh Sharma',
  },
  {
    id: 'BS-2026-082',
    title: 'Uncollected Community Garbage Dump',
    description: 'Secondary waste bin overflowing onto the pedestrian footpath for past 3 days. Stray animal menace.',
    category: 'cleanliness',
    status: 'under-review',
    priority: 'high',
    location: {
      address: 'Sector 14 Market Lane',
      city: 'Gurugram',
      ward: 'Ward 12',
      pincode: '122001',
    },
    reportedAt: '5 hours ago',
    updatedAt: '1 hour ago',
    upvotes: 29,
    reportedBy: 'Rahul Sengupta',
  },
  {
    id: 'BS-2026-083',
    title: 'Broken Drinking Water Pipeline Leakage',
    description: 'Fresh municipal water gushing onto the road since early morning. Localized waterlogging.',
    category: 'water-drainage',
    status: 'in-progress',
    priority: 'urgent',
    location: {
      address: 'Civil Lines, Cross Road 4',
      city: 'Jaipur',
      ward: 'Ward 8',
      pincode: '302006',
    },
    reportedAt: '30 mins ago',
    updatedAt: 'Just now',
    upvotes: 56,
    reportedBy: 'Ananya Deshmukh',
  },
  {
    id: 'BS-2026-084',
    title: 'Faulty High-Mast Streetlight Repaired',
    description: 'Completely dark stretch on outer highway junction was restored with high efficiency LED fixtures.',
    category: 'street-lighting',
    status: 'resolved',
    priority: 'medium',
    location: {
      address: 'NH-48 Bypass Flyover',
      city: 'Bengaluru',
      ward: 'Ward 184',
      pincode: '560100',
    },
    reportedAt: '2 days ago',
    updatedAt: 'Yesterday',
    upvotes: 94,
    reportedBy: 'Vikram Joshi',
  },
];

interface MobileExploreIssuesProps {
  onStartReport: () => void;
}

export function MobileExploreIssues({ onStartReport }: MobileExploreIssuesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [issues, setIssues] = useState<CivicIssue[]>(COMMUNITY_ISSUES);
  const [upvotedIds, setUpvotedIds] = useState<Record<string, boolean>>({});

  const handleToggleUpvote = (id: string) => {
    setUpvotedIds((prev) => {
      const isCurrentlyUpvoted = !!prev[id];
      const newUpvoted = !isCurrentlyUpvoted;

      setIssues((prevIssues) =>
        prevIssues.map((issue) => {
          if (issue.id === id) {
            return {
              ...issue,
              upvotes: isCurrentlyUpvoted ? issue.upvotes - 1 : issue.upvotes + 1,
            };
          }
          return issue;
        })
      );

      return { ...prev, [id]: newUpvoted };
    });
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (issue.location.ward ? issue.location.ward.toLowerCase().includes(searchQuery.toLowerCase()) : false);

    const matchesCategory =
      selectedCategory === 'all' || issue.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 pb-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 sm:p-5 border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBF1FA] dark:bg-[#1E293B] text-[#3157A4] dark:text-[#60A5FA] text-[10px] sm:text-xs font-bold mb-1.5 border border-[#DCE6F0] dark:border-[#334155]">
              <Building2 className="w-3 h-3 text-[#3157A4] dark:text-[#60A5FA]" />
              City Public Feed
            </div>
            <h2 className="text-lg sm:text-xl font-black font-poppins text-[#172B4D] dark:text-white tracking-tight">
              Explore Community Issues
            </h2>
            <p className="text-xs text-[#718096] dark:text-[#94A3B8] mt-0.5 font-medium">
              Live civic grievances verified and reported in your municipality
            </p>
          </div>

          <button
            type="button"
            onClick={onStartReport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] text-[#172B4D] font-extrabold text-xs shadow-subtle transition-transform active:scale-95 shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span className="hidden xs:inline">Report</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="mt-3.5 relative">
          <Search className="w-4 h-4 text-[#718096] dark:text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by locality, ward, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#F4F8FC] dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] rounded-xl text-[#172B4D] dark:text-white placeholder-[#718096] dark:placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/30 focus:border-[#3157A4] font-medium"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar text-xs">
          {[
            { id: 'all', label: 'All Issues' },
            { id: 'roads-infrastructure', label: 'Roads & Potholes' },
            { id: 'cleanliness', label: 'Waste Management' },
            { id: 'water-drainage', label: 'Water & Sewage' },
            { id: 'street-lighting', label: 'Street Lighting' },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#3157A4] dark:bg-[#3B82F6] text-white shadow-xs font-bold'
                  : 'bg-[#F4F8FC] dark:bg-[#1E293B] text-[#718096] dark:text-[#94A3B8] hover:text-[#172B4D] dark:hover:text-white border border-[#DCE6F0] dark:border-[#334155]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {filteredIssues.length === 0 ? (
          <div className="bg-white dark:bg-[#0F172A] rounded-2xl p-8 text-center border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle">
            <AlertCircle className="w-8 h-8 text-[#718096] dark:text-[#94A3B8] mx-auto mb-2 opacity-60" />
            <p className="text-sm font-bold text-[#172B4D] dark:text-white">No community issues found</p>
            <p className="text-xs text-[#718096] dark:text-[#94A3B8] mt-1 font-medium">Try clearing your filters or search keywords</p>
          </div>
        ) : (
          filteredIssues.map((issue) => {
            const isUpvoted = !!upvotedIds[issue.id];
            return (
              <div
                key={issue.id}
                className="bg-white dark:bg-[#0F172A] rounded-2xl p-4 border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle hover:border-[#B8CDE6] dark:hover:border-blue-500/40 transition-all"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold text-[#3157A4] dark:text-[#60A5FA] bg-[#EBF1FA] dark:bg-[#1E293B] px-2 py-0.5 rounded-full border border-[#DCE6F0] dark:border-[#334155]">
                        #{issue.id}
                      </span>
                      {issue.status === 'resolved' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#22A982] dark:text-[#34D399] bg-[#E8F7F2] dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-[#D1EFE5] dark:border-emerald-700/40">
                          <CheckCircle2 className="w-3 h-3" />
                          Resolved
                        </span>
                      ) : issue.status === 'in-progress' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#CA8A04] dark:text-[#FACC15] bg-[#FEF9C3] dark:bg-yellow-950/60 px-2 py-0.5 rounded-full border border-[#FDE047] dark:border-yellow-700/40">
                          <Clock className="w-3 h-3" />
                          In Progress
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#3157A4] dark:text-[#60A5FA] bg-[#EBF1FA] dark:bg-blue-950/60 px-2 py-0.5 rounded-full border border-[#DCE6F0] dark:border-blue-700/40">
                          Under Review
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-[#172B4D] dark:text-white leading-snug">
                      {issue.title}
                    </h3>
                  </div>

                  {/* Upvote Button */}
                  <button
                    type="button"
                    onClick={() => handleToggleUpvote(issue.id)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-bold transition-all shrink-0 active:scale-95 ${
                      isUpvoted
                        ? 'bg-[#3157A4] dark:bg-[#3B82F6] text-white border-[#3157A4] dark:border-[#3B82F6] shadow-xs'
                        : 'bg-[#F4F8FC] dark:bg-[#1E293B] text-[#718096] dark:text-[#94A3B8] hover:text-[#3157A4] dark:hover:text-white border border-[#DCE6F0] dark:border-[#334155]'
                    }`}
                    title="Upvote this civic report"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-white' : ''}`} />
                    <span>{issue.upvotes}</span>
                  </button>
                </div>

                <p className="text-xs text-[#718096] dark:text-[#94A3B8] mt-2 line-clamp-2 leading-relaxed font-medium">
                  {issue.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-[#F4F8FC] dark:border-[#1E293B] flex items-center justify-between text-[11px] text-[#718096] dark:text-[#94A3B8] gap-2 flex-wrap font-medium">
                  <div className="flex items-center gap-1 truncate max-w-[220px]">
                    <MapPin className="w-3 h-3 text-[#3157A4] dark:text-[#60A5FA] shrink-0" />
                    <span className="truncate">{issue.location.address}{issue.location.ward ? `, ${issue.location.ward}` : ''}</span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Clock className="w-3 h-3" />
                    <span>{issue.reportedAt}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
