import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  PlusCircle,
  MapPin,
  Clock,
  ThumbsUp,
  X,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Container } from '../components/common/Container';
import type { CivicIssue, IssueStatus } from '../types';

const INITIAL_ISSUES: CivicIssue[] = [
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
    description: 'Secondary waste bin overflowing onto the pedestrian footpath for the past 3 days. Foul smell and stray animal menace.',
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
    title: 'Broken Main Water Pipeline Leakage',
    description: 'Treated drinking water gushing onto the road since morning. Significant water wastage and localized waterlogging.',
    category: 'water-drainage',
    status: 'submitted',
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
    description: 'Complete dark stretch on outer highway junction was restored with new LED fixtures by the municipal team.',
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

export function IssuesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [issues, setIssues] = useState<CivicIssue[]>(INITIAL_ISSUES);
  
  // Quick Report Issue Modal state
  const isReportModalOpen = searchParams.get('action') === 'report';

  // New Issue form state
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleOpenReportModal = () => {
    setSearchParams({ action: 'report' });
    setSubmittedSuccess(false);
  };

  const handleCloseReportModal = () => {
    searchParams.delete('action');
    setSearchParams(searchParams);
  };

  const handleUpvote = (id: string) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, upvotes: issue.upvotes + 1 } : issue
      )
    );
  };

  const handleSubmitIssue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const newIssue: CivicIssue = {
      id: `BS-2026-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      description: newDescription || 'Civic hazard reported by citizen.',
      category: 'cleanliness',
      status: 'submitted',
      priority: 'high',
      location: {
        address: newLocation,
        city: 'Local Ward',
        pincode: '110001',
      },
      reportedAt: 'Just now',
      updatedAt: 'Just now',
      upvotes: 1,
      reportedBy: 'Responsible Citizen',
    };

    setIssues([newIssue, ...issues]);
    setSubmittedSuccess(true);
    setNewTitle('');
    setNewLocation('');
    setNewDescription('');

    setTimeout(() => {
      handleCloseReportModal();
      setSubmittedSuccess(false);
    }, 1800);
  };

  const filteredIssues = issues.filter((issue) => {
    const matchesQuery =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.location.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    return matchesQuery && matchesStatus;
  });

  return (
    <div className="py-10 space-y-8 bg-[#F4F8FC] min-h-screen">
      <Container>
        {/* Header and Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DCE6F0] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#3157A4] uppercase tracking-wide">
                Public Civic Ledger
              </span>
              <span className="text-[#DCE6F0]">•</span>
              <span className="text-xs font-medium text-[#718096]">
                Ab Har Nagrik Zimmedaar
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">
              Civic Issues & Grievances
            </h1>
            <p className="text-sm text-[#718096] mt-1">
              Explore reported public concerns or register a new issue in your ward.
            </p>
          </div>

          <Button
            variant="saffron"
            size="md"
            leftIcon={<PlusCircle className="w-4 h-4" />}
            onClick={handleOpenReportModal}
            className="self-start sm:self-auto font-bold rounded-xl shadow-subtle"
          >
            Report New Issue
          </Button>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by issue title, landmark, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#718096]" />}
              className="bg-white border-[#DCE6F0] rounded-xl text-[#172B4D]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-[#718096] shrink-0" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 px-3.5 rounded-xl border border-[#DCE6F0] bg-white text-sm text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20 shadow-subtle"
            >
              <option value="all">All Statuses ({issues.length})</option>
              <option value="submitted">Submitted</option>
              <option value="under-review">Under Review</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Issues Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          {filteredIssues.map((issue) => (
            <Card key={issue.id} hoverEffect className="flex flex-col justify-between bg-white border border-[#DCE6F0] rounded-2xl shadow-subtle hover:border-[#3157A4]/30 hover:shadow-card transition-all">
              <CardHeader>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold text-[#3157A4] bg-[#EBF2FA] px-2.5 py-0.5 rounded-lg border border-[#DCE6F0]">
                    {issue.id}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Badge status={issue.status as IssueStatus} withDot />
                    <Badge priority={issue.priority} />
                  </div>
                </div>
                <CardTitle className="text-base font-bold text-[#172B4D] leading-snug">
                  {issue.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-xs pt-1 text-[#718096]">
                  {issue.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-1.5 text-xs text-[#718096]">
                  <div className="flex items-center gap-1.5 text-[#172B4D] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#3157A4] shrink-0" />
                    <span>{issue.location.address}, {issue.location.city} ({issue.location.pincode})</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[#718096]">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#718096]" />
                      Reported {issue.reportedAt}
                    </span>
                    <span>•</span>
                    <span>By {issue.reportedBy}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-[#DCE6F0] pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<ThumbsUp className="w-3.5 h-3.5 text-[#3157A4]" />}
                  onClick={() => handleUpvote(issue.id)}
                  className="text-xs rounded-xl"
                >
                  Support / Upvote ({issue.upvotes})
                </Button>
                <span className="text-[11px] font-semibold text-[#3157A4] hover:underline cursor-pointer">
                  View Timeline →
                </span>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#DCE6F0] p-6 shadow-subtle">
            <p className="text-base font-semibold text-[#172B4D]">No civic issues match your search criteria.</p>
            <p className="text-xs text-[#718096] mt-1">Try clearing filters or search by city name.</p>
          </div>
        )}
      </Container>

      {/* Quick Report Issue Modal Dialog */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-card max-w-lg w-full p-6 border border-[#DCE6F0] relative animate-in zoom-in-95 duration-150">
            <button
              onClick={handleCloseReportModal}
              className="absolute top-5 right-5 p-1.5 text-[#718096] hover:text-[#172B4D] rounded-lg hover:bg-[#F4F8FC]"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {submittedSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-14 h-14 bg-[#22A982]/10 text-[#22A982] rounded-full flex items-center justify-center mx-auto shadow-subtle">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#172B4D]">
                  Issue Successfully Submitted!
                </h3>
                <p className="text-xs text-[#718096]">
                  Your civic report has been queued for municipal ward review under the Bharat Sudhar charter.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitIssue} className="space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#3157A4]">
                    <span>Citizen Report</span>
                    <span>•</span>
                    <span>Ab Har Nagrik Zimmedaar</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#172B4D]">
                    Report a Civic Hazard or Complaint
                  </h3>
                </div>

                <Input
                  label="Issue Title"
                  placeholder="e.g. Open Manhole near School Gate"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="rounded-xl border-[#DCE6F0]"
                />

                <Input
                  label="Exact Location / Landmark"
                  placeholder="e.g. Street 4, Subhash Nagar, Delhi"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="rounded-xl border-[#DCE6F0]"
                />

                <div className="space-y-1.5">
                  <label className="block text-sm font-medium text-[#172B4D]">
                    Description & Observations
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe the hazard and how long it has been present..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full rounded-xl border border-[#DCE6F0] p-3 text-sm text-[#172B4D] placeholder-[#718096] focus:border-[#3157A4] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20 shadow-subtle"
                  />
                </div>

                <div className="p-3 bg-[#F4F8FC] rounded-xl text-xs text-[#718096] border border-[#DCE6F0]">
                  💡 Tip: Make sure to mention landmarks to help the local ward team locate the spot quickly.
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button variant="ghost" type="button" onClick={handleCloseReportModal} className="rounded-xl">
                    Cancel
                  </Button>
                  <Button variant="saffron" type="submit" className="font-bold rounded-xl shadow-subtle">
                    Submit Civic Report
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
