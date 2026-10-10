import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  User,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Truck,
  Sun,
  Moon,
  LogOut,
  Sparkles,
  Layers,
  MapPin,
  X,
  Send,
  Camera,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { BharatSudharLogo } from '../common/BharatSudharLogo';
import { Container } from '../common/Container';

export interface AdminCivicIssue {
  id: string;
  title: string;
  category: 'swachhata' | 'roads' | 'lighting' | 'water' | 'sanitation';
  categoryLabel: string;
  description: string;
  location: string;
  ward: string;
  reportedBy: string;
  reportedAt: string;
  status: 'under-review' | 'in-progress' | 'resolved';
  priority: 'urgent' | 'high' | 'normal';
  photoUrl: string;
  assignedUnit?: string;
  assignedOfficer?: string;
  officialRemarks?: string;
  resolutionPhoto?: string;
  resolvedAt?: string;
}

const DEFAULT_ADMIN_ISSUES: AdminCivicIssue[] = [
  {
    id: 'BS-MH-8492',
    title: 'Major Overflowing Garbage Bin near Market Corner',
    category: 'swachhata',
    categoryLabel: 'Swachhata & Waste',
    description: 'Commercial vegetable waste dumping causing severe foul smell and stray animal congregation near main lane.',
    location: 'Near Mahatma Phule Mandai, Pune',
    ward: 'Ward 45-B',
    reportedBy: 'Anand Deshmukh (+91 98231-44120)',
    reportedAt: '1 hour ago',
    status: 'under-review',
    priority: 'urgent',
    photoUrl: '/images/garbage-dump.jpg',
  },
  {
    id: 'BS-MH-8488',
    title: 'Dangerous Crater Pothole on Arterial Road',
    category: 'roads',
    categoryLabel: 'Roads & Infrastructure',
    description: 'Deep road depression causing two-wheelers to slip during rain. Immediate cold-mix asphalt patching needed.',
    location: 'Fergusson College Road, Shivajinagar, Pune',
    ward: 'Ward 45-B',
    reportedBy: 'Sunita Joshi (+91 97652-33109)',
    reportedAt: '3 hours ago',
    status: 'in-progress',
    priority: 'urgent',
    photoUrl: '/images/pothole-issue.jpg',
    assignedUnit: 'Road Patch Crew #04 (Asphalt Van)',
    assignedOfficer: 'Er. R. K. Shinde (JE Roads)',
    officialRemarks: 'Crew dispatched with 2 tonnes cold mix. Patch work underway on site.',
  },
  {
    id: 'BS-MH-8475',
    title: 'Extensive Single-Use Plastic Waste Dump',
    category: 'swachhata',
    categoryLabel: 'Waste Management',
    description: 'Plastic packaging and discarded bottles clogging stormwater drainage entrance along pedestrian sidewalk.',
    location: 'Near Sambhaji Park, JM Road, Pune',
    ward: 'Ward 45-B',
    reportedBy: 'Vikas Kulkarni (+91 94220-88123)',
    reportedAt: 'Yesterday',
    status: 'in-progress',
    priority: 'high',
    photoUrl: '/images/plastic-waste.jpg',
    assignedUnit: 'PMC Cleanliness Squad #12',
    assignedOfficer: 'Sanitary Inspector Pawar',
    officialRemarks: 'Drain mouth cleared. Waste compactor vehicle en route to pick up bagged litter.',
  },
  {
    id: 'BS-MH-8461',
    title: 'High-Mast Streetlight Outage at Critical Junction',
    category: 'lighting',
    categoryLabel: 'Lighting & Safety',
    description: 'Main intersection pitch dark for past 3 days. Safety hazard for evening pedestrians and women commuters.',
    location: 'Karve Road - Paud Road Junction, Pune',
    ward: 'Ward 45-B',
    reportedBy: 'Pooja Gaikwad (+91 99221-55440)',
    reportedAt: '2 days ago',
    status: 'resolved',
    priority: 'high',
    photoUrl: '/images/broken-streetlight.jpg',
    assignedUnit: 'Electrical Division Hydraulic Crane #02',
    assignedOfficer: 'Er. Amit Salve',
    officialRemarks: 'Defective LED driver and high-mast fuse replaced. Illumination tested and restored.',
    resolutionPhoto: '/images/broken-streetlight.jpg',
    resolvedAt: 'Today, 11:30 AM',
  },
  {
    id: 'BS-MH-8450',
    title: 'Unsanitary Public Toilet with Water Leakage',
    category: 'sanitation',
    categoryLabel: 'Sanitation & Hygiene',
    description: 'Broken tap valve causing continuous water wastage and blocked drainage inside public facility.',
    location: 'Swargate Bus Station Complex, Pune',
    ward: 'Ward 45-B',
    reportedBy: 'Kailash Jadhav (+91 98811-90022)',
    reportedAt: '2 days ago',
    status: 'resolved',
    priority: 'normal',
    photoUrl: '/images/dirty-toilet.jpg',
    assignedUnit: 'PMC Sanitation Maintenance Team #01',
    assignedOfficer: 'Plumbing Foreman More',
    officialRemarks: 'Replaced brass ball valve and cleared drain choke. Facility sanitized.',
    resolvedAt: 'Yesterday, 4:00 PM',
  },
];

export function AdminPanel() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // Load issues from localStorage or fall back to default
  const [issues, setIssues] = useState<AdminCivicIssue[]>(() => {
    try {
      const stored = localStorage.getItem('bharat_sudhar_admin_issues');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return DEFAULT_ADMIN_ISSUES;
  });

  // Save to localStorage when issues update
  useEffect(() => {
    try {
      localStorage.setItem('bharat_sudhar_admin_issues', JSON.stringify(issues));
    } catch {
      // Fallback
    }
  }, [issues]);

  // Filters and Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');

  // Modals
  const [activeModal, setActiveModal] = useState<'dispatch' | 'remark' | 'resolve' | 'view' | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<AdminCivicIssue | null>(null);

  // Form states for modals
  const [dispatchUnit, setDispatchUnit] = useState('PMC Quick Response Van #03');
  const [dispatchOfficer, setDispatchOfficer] = useState('Er. R. K. Shinde (JE)');
  const [officialRemarkText, setOfficialRemarkText] = useState('');

  // Counts for KPI Bar
  const stats = useMemo(() => {
    const total = issues.length;
    const underReview = issues.filter((i) => i.status === 'under-review').length;
    const inProgress = issues.filter((i) => i.status === 'in-progress').length;
    const resolved = issues.filter((i) => i.status === 'resolved').length;
    const urgent = issues.filter((i) => i.priority === 'urgent' && i.status !== 'resolved').length;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;
    return { total, underReview, inProgress, resolved, urgent, resolutionRate };
  }, [issues]);

  // Filtered issues list
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.reportedBy.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
      const matchesPriority = selectedPriority === 'all' || issue.priority === selectedPriority;

      return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [issues, searchQuery, selectedCategory, selectedStatus, selectedPriority]);

  // Handlers for Authority Actions
  const handleOpenDispatchModal = (issue: AdminCivicIssue) => {
    setSelectedIssue(issue);
    setDispatchUnit('PMC Rapid Cleanliness Squad #05');
    setDispatchOfficer(user?.name ? `${user.name} (EWO)` : 'Er. Rajesh Deshmukh (EWO)');
    setActiveModal('dispatch');
  };

  const handleConfirmDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === selectedIssue.id) {
          return {
            ...item,
            status: 'in-progress',
            assignedUnit: dispatchUnit,
            assignedOfficer: dispatchOfficer,
            officialRemarks: `Field unit ${dispatchUnit} assigned by ${dispatchOfficer}. Inspection and repair work in progress.`,
          };
        }
        return item;
      })
    );
    setActiveModal(null);
  };

  const handleOpenRemarkModal = (issue: AdminCivicIssue) => {
    setSelectedIssue(issue);
    setOfficialRemarkText(issue.officialRemarks || '');
    setActiveModal('remark');
  };

  const handleSaveRemark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === selectedIssue.id) {
          return {
            ...item,
            officialRemarks: officialRemarkText.trim(),
          };
        }
        return item;
      })
    );
    setActiveModal(null);
  };

  const handleOpenResolveModal = (issue: AdminCivicIssue) => {
    setSelectedIssue(issue);
    setOfficialRemarkText('Work inspected on-site by municipal authority. Grievance resolved successfully.');
    setActiveModal('resolve');
  };

  const handleConfirmResolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIssue) return;

    setIssues((prev) =>
      prev.map((item) => {
        if (item.id === selectedIssue.id) {
          return {
            ...item,
            status: 'resolved',
            resolvedAt: 'Today, Just Now',
            officialRemarks: officialRemarkText.trim() || 'Work verified and closed by municipal authority.',
            resolutionPhoto: item.photoUrl,
          };
        }
        return item;
      })
    );
    setActiveModal(null);
  };

  const handleViewDetails = (issue: AdminCivicIssue) => {
    setSelectedIssue(issue);
    setActiveModal('view');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F4F8FC] dark:bg-[#0B132B] text-slate-900 dark:text-slate-100 font-sans transition-colors">
      {/* Top National Ribbon Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-saffron-500 via-white to-tirangaGreen-600 sticky top-0 z-50" />

      {/* Authority Control Center Header */}
      <header className="sticky top-1.5 z-40 bg-white/95 dark:bg-[#0F172A]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs">
        <Container>
          <div className="flex h-16 items-center justify-between gap-2 sm:gap-4">
            {/* Left: Brand & Admin Identity */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link to="/admin" className="flex items-center gap-1.5 sm:gap-2 group min-w-0">
                <div className="shrink-0 scale-90 sm:scale-100 origin-left">
                  <BharatSudharLogo size="sm" />
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                    <span className="text-sm sm:text-base font-black font-poppins text-[#0B2545] dark:text-white">
                      Bharat
                    </span>
                    <span className="text-sm sm:text-base font-black font-poppins bg-gradient-to-r from-saffron-500 to-tirangaGreen-600 bg-clip-text text-transparent">
                      Sudhar
                    </span>
                    <span className="px-1.5 sm:px-2 py-0.5 rounded-md bg-chakra-900 text-white font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider">
                      Admin
                    </span>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-slate-500 dark:text-slate-400 truncate hidden xs:inline">
                    Municipal Grievance Command Center • Maharashtra
                  </span>
                </div>
              </Link>
            </div>

            {/* Right: Officer Profile, Day/Night & Logout */}
            <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
              {/* Day / Night Toggle */}
              <button
                type="button"
                onClick={toggleTheme}
                title={isDark ? 'Day mode' : 'Night mode'}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors shrink-0"
              >
                {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-chakra-800" />}
              </button>

              {/* Link to Citizen Portal */}
              <Link
                to="/dashboard"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                title="View Citizen App"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Citizen View</span>
              </Link>

              {/* Active Authority Profile Card */}
              <div className="flex items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shrink-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-chakra-900 text-white font-black text-xs flex items-center justify-center shrink-0">
                  {user?.avatar || 'RD'}
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                    {user?.name || 'Er. Rajesh Deshmukh'}
                  </span>
                  <span className="text-[10px] font-bold text-saffron-600 dark:text-saffron-400 leading-tight">
                    {user?.department || 'Ward 45-B Officer (PMC)'}
                  </span>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleLogout}
                title="Sign Out of Authority Panel"
                className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Admin Dashboard Body */}
      <main className="py-6 sm:py-8">
        <Container>
          <div className="space-y-6">
            {/* Top Command Bar & Jurisdiction Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-chakra-950 via-chakra-900 to-chakra-950 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-saffron-500/20 text-saffron-400 border border-saffron-500/30 text-[11px] font-bold">
                  <Building className="w-3.5 h-3.5" />
                  <span>Pune Municipal Corporation (PMC) • Control Room 45-B</span>
                </div>
                <h1 className="text-xl sm:text-2xl font-black font-poppins tracking-tight">
                  Public Civic Grievance Triage & Resolution Console
                </h1>
                <p className="text-xs text-slate-300">
                  Live municipal action dispatching, resolution photo verifications, and ward SLA management.
                </p>
              </div>

              {/* Jurisdiction Selector Pill */}
              <div className="flex items-center gap-2 self-start md:self-auto bg-white/10 p-1.5 rounded-xl border border-white/15 text-xs">
                <MapPin className="w-4 h-4 text-saffron-400 shrink-0 ml-1" />
                <span className="font-bold text-slate-200 text-xs">Active Ward:</span>
                <span className="font-mono font-bold bg-white text-slate-900 px-2 py-0.5 rounded-md text-xs">
                  Ward 45-B (Shivajinagar-Kothrud)
                </span>
              </div>
            </div>

            {/* KPI Metrics Row */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
              {/* Total Grievances */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                  <span className="text-xs font-bold">Total Grievances</span>
                  <Layers className="w-4 h-4 text-chakra-800 dark:text-chakra-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-mono">
                  {stats.total}
                </div>
                <p className="text-[11px] font-medium text-slate-500 mt-1">Across all categories</p>
              </div>

              {/* Pending Review (Triage Required) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-xs bg-amber-50/20 dark:bg-amber-950/20">
                <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-2">
                  <span className="text-xs font-bold">Needs Triage</span>
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                  {stats.underReview}
                </div>
                <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-1">
                  Awaiting unit assignment
                </p>
              </div>

              {/* In Progress / Field Units Dispatched */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs bg-blue-50/20 dark:bg-blue-950/20">
                <div className="flex items-center justify-between text-blue-700 dark:text-blue-400 mb-2">
                  <span className="text-xs font-bold">Crews On-Site</span>
                  <Truck className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 font-mono">
                  {stats.inProgress}
                </div>
                <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 mt-1">
                  Active repair/cleanup
                </p>
              </div>

              {/* Resolved & Closed */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-xs bg-emerald-50/20 dark:bg-emerald-950/20">
                <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-2">
                  <span className="text-xs font-bold">Resolved & Closed</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  {stats.resolved}
                </div>
                <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1">
                  Photo proof verified
                </p>
              </div>

              {/* Ward SLA Resolution Rate */}
              <div className="col-span-2 lg:col-span-1 p-4 rounded-2xl bg-gradient-to-br from-saffron-500 to-saffron-600 text-white shadow-xs">
                <div className="flex items-center justify-between text-white/90 mb-2">
                  <span className="text-xs font-bold">Ward SLA Rate</span>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono">
                  {stats.resolutionRate}%
                </div>
                <p className="text-[11px] text-white/90 font-medium mt-1">Avg 24.8 hrs resolution</p>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search complaint by ID, locality, keyword or reporter name..."
                    className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-chakra-500 font-medium"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Status Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      selectedStatus === 'all'
                        ? 'bg-chakra-900 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    All ({issues.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('under-review')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      selectedStatus === 'under-review'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Triage Needed ({stats.underReview})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('in-progress')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      selectedStatus === 'in-progress'
                        ? 'bg-blue-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    In Progress ({stats.inProgress})
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStatus('resolved')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                      selectedStatus === 'resolved'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                    }`}
                  >
                    Resolved ({stats.resolved})
                  </button>
                </div>
              </div>

              {/* Category Pills & Priority Dropdown */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 font-bold flex items-center gap-1 mr-1">
                    <Filter className="w-3.5 h-3.5" />
                    Category:
                  </span>
                  {[
                    { id: 'all', label: 'All Categories' },
                    { id: 'swachhata', label: '🗑️ Swachhata & Waste' },
                    { id: 'roads', label: '🚧 Roads & Potholes' },
                    { id: 'lighting', label: '💡 Street Lighting' },
                    { id: 'sanitation', label: '🚽 Sanitation' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                        selectedCategory === cat.id
                          ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Priority Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold text-xs">Priority:</span>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-semibold"
                  >
                    <option value="all">All Priorities</option>
                    <option value="urgent">🔴 Urgent Only</option>
                    <option value="high">🟠 High Priority</option>
                    <option value="normal">🔵 Normal Priority</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Grievances Queue List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Grievances Action Queue</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                    {filteredIssues.length}
                  </span>
                </h2>
                <span className="text-xs text-slate-500 font-medium">
                  Showing real-time Maharashtra civic queue
                </span>
              </div>

              {filteredIssues.length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    No Complaints Match Filters
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting search parameters or clear filters to view all civic reports.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                      setSelectedPriority('all');
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-chakra-900 text-white text-xs font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {filteredIssues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                    >
                      {/* Left: Photo Thumbnail & Core Info */}
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Photo Thumbnail */}
                        <div
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 dark:border-slate-800 relative cursor-pointer group"
                          onClick={() => handleViewDetails(issue)}
                          title="View photo proof"
                        >
                          <img
                            src={issue.photoUrl}
                            alt={issue.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                            <Camera className="w-4 h-4" />
                          </div>
                        </div>

                        {/* Complaint Details */}
                        <div className="space-y-1.5 flex-1 min-w-0">
                          {/* Badges line */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-xs font-black text-chakra-800 dark:text-chakra-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                              {issue.id}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {issue.categoryLabel}
                            </span>

                            {/* Priority Badge */}
                            {issue.priority === 'urgent' && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Urgent (SLA 4h)
                              </span>
                            )}
                            {issue.priority === 'high' && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                                High Priority
                              </span>
                            )}

                            {/* Status Badge */}
                            {issue.status === 'under-review' && (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Triage Pending
                              </span>
                            )}
                            {issue.status === 'in-progress' && (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 flex items-center gap-1">
                                <Truck className="w-3 h-3" />
                                Unit Dispatched
                              </span>
                            )}
                            {issue.status === 'resolved' && (
                              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                Resolved
                              </span>
                            )}
                          </div>

                          {/* Title */}
                          <h3
                            className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-chakra-800 dark:hover:text-chakra-400 cursor-pointer transition-colors line-clamp-1"
                            onClick={() => handleViewDetails(issue)}
                          >
                            {issue.title}
                          </h3>

                          {/* Description */}
                          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                            {issue.description}
                          </p>

                          {/* Locality & Reporter */}
                          <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-rose-500" />
                              <strong className="text-slate-700 dark:text-slate-300">{issue.location}</strong>
                            </span>
                            <span className="flex items-center gap-1">
                              <User className="w-3 h-3 text-slate-400" />
                              {issue.reportedBy}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" />
                              {issue.reportedAt}
                            </span>
                          </div>

                          {/* Official remarks if present */}
                          {issue.officialRemarks && (
                            <div className="mt-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5 text-chakra-800 shrink-0 mt-0.5" />
                              <div>
                                <strong className="text-chakra-900 dark:text-chakra-300">Official Municipal Note: </strong>
                                <span>{issue.officialRemarks}</span>
                                {issue.assignedUnit && (
                                  <span className="block text-[10px] text-slate-500 mt-0.5">
                                    Assigned: <strong>{issue.assignedUnit}</strong>
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right: Quick Action Buttons */}
                      <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center gap-2 w-full lg:w-auto shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100 dark:border-slate-800">
                        {issue.status === 'under-review' && (
                          <button
                            type="button"
                            onClick={() => handleOpenDispatchModal(issue)}
                            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-chakra-900 hover:bg-chakra-950 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Dispatch Field Unit</span>
                          </button>
                        )}

                        {issue.status === 'in-progress' && (
                          <button
                            type="button"
                            onClick={() => handleOpenResolveModal(issue)}
                            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Mark as Resolved</span>
                          </button>
                        )}

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          <button
                            type="button"
                            onClick={() => handleOpenRemarkModal(issue)}
                            className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors"
                          >
                            Add Note
                          </button>
                          <button
                            type="button"
                            onClick={() => handleViewDetails(issue)}
                            className="flex-1 sm:flex-none px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-chakra-800 dark:text-chakra-300 font-bold text-xs transition-colors"
                          >
                            Inspect
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Field Units Dispatch Roster & Map Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Field Team A (Swachhata)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">PMC Compactor Truck #12</h4>
                <p className="text-xs text-slate-500">
                  Active in Kothrud Market zone. Cleared 4 bulk dumps this morning.
                </p>
                <div className="pt-1 text-[11px] text-chakra-800 font-semibold">
                  Crew: 4 sanitary workers • In Service
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Field Team B (Roads)</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Asphalt Patch Van #04</h4>
                <p className="text-xs text-slate-500">
                  On-site at FC Road repairing deep potholes. Expected finish: 2 hours.
                </p>
                <div className="pt-1 text-[11px] text-chakra-800 font-semibold">
                  Crew: 6 road workers + Roller • Active
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                  <span>Field Team C (Electrical)</span>
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Hydraulic Crane Bucket #02</h4>
                <p className="text-xs text-slate-500">
                  En route to Paud Road junction for high-mast feeder replacement.
                </p>
                <div className="pt-1 text-[11px] text-chakra-800 font-semibold">
                  Crew: 2 certified linemen • Dispatched
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>

      {/* ======================================================== */}
      {/* ACTION MODAL 1: DISPATCH FIELD UNIT                      */}
      {/* ======================================================== */}
      {activeModal === 'dispatch' && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-chakra-900 text-white flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Dispatch Municipal Field Unit
                  </h3>
                  <p className="text-[11px] text-slate-500">{selectedIssue.id} • {selectedIssue.location}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmDispatch} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Select Municipal Field Unit / Vehicle
                </label>
                <select
                  value={dispatchUnit}
                  onChange={(e) => setDispatchUnit(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold bg-white dark:bg-slate-800"
                >
                  <option value="PMC Cleanliness Squad #12 (Compactor)">
                    PMC Cleanliness Squad #12 (Garbage Compactor)
                  </option>
                  <option value="Road Maintenance Crew #04 (Asphalt Van)">
                    Road Maintenance Crew #04 (Asphalt Hot Mix)
                  </option>
                  <option value="Electrical Division Bucket Crane #02">
                    Electrical Division Bucket Crane #02 (Streetlights)
                  </option>
                  <option value="Drainage Jetting & Suction Unit #01">
                    Drainage Jetting & Suction Unit #01 (Water/Sewage)
                  </option>
                  <option value="Rapid Ward Encroachment Response Team">
                    Rapid Ward Encroachment Response Team
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Assigned Supervising Officer
                </label>
                <input
                  type="text"
                  value={dispatchOfficer}
                  onChange={(e) => setDispatchOfficer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold bg-white dark:bg-slate-800"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">Grievance:</span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">{selectedIssue.title}</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-chakra-900 hover:bg-chakra-950 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Confirm Dispatch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ACTION MODAL 2: ADD OFFICIAL REMARK                      */}
      {/* ======================================================== */}
      {activeModal === 'remark' && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                Add Official Municipal Note
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRemark} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Official Statement (Visible to Citizen)
                </label>
                <textarea
                  rows={3}
                  value={officialRemarkText}
                  onChange={(e) => setOfficialRemarkText(e.target.value)}
                  placeholder="e.g. Ward inspector visited site. Contractor instructed to complete clearance before 4 PM."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-800"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-chakra-900 hover:bg-chakra-950 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Save Official Remark</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ACTION MODAL 3: MARK RESOLVED                            */}
      {/* ======================================================== */}
      {activeModal === 'resolve' && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Verify & Close Grievance
                  </h3>
                  <p className="text-[11px] text-slate-500">{selectedIssue.id}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmResolve} className="p-5 space-y-4">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs space-y-1">
                <span className="font-bold text-emerald-900 dark:text-emerald-300">
                  Ready to Close: {selectedIssue.title}
                </span>
                <p className="text-emerald-800 dark:text-emerald-400 text-[11px]">
                  Closing this ticket will update the citizen tracking timeline and log SLA completion proof.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Resolution Remarks & Verification Note
                </label>
                <textarea
                  rows={2}
                  value={officialRemarkText}
                  onChange={(e) => setOfficialRemarkText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-medium bg-white dark:bg-slate-800"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mark Resolved & Close</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL 4: FULL COMPLAINT INSPECTION                       */}
      {/* ======================================================== */}
      {activeModal === 'view' && selectedIssue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-chakra-800">{selectedIssue.id}</span>
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                  {selectedIssue.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {/* Photo Proof */}
              <div className="rounded-xl overflow-hidden aspect-video bg-slate-900">
                <img
                  src={selectedIssue.photoUrl}
                  alt={selectedIssue.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Location:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedIssue.location}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Ward & Division:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedIssue.ward}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Reported By:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedIssue.reportedBy}</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                  <span className="text-slate-400 block text-[10px]">Timestamp:</span>
                  <strong className="text-slate-800 dark:text-slate-200">{selectedIssue.reportedAt}</strong>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[11px] font-bold block mb-1">Full Citizen Description:</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 p-3 rounded-xl leading-relaxed">
                  {selectedIssue.description}
                </p>
              </div>

              {selectedIssue.officialRemarks && (
                <div>
                  <span className="text-slate-400 text-[11px] font-bold block mb-1">Official Actions & Notes:</span>
                  <p className="text-xs text-slate-800 dark:text-slate-200 bg-chakra-50 dark:bg-chakra-950/40 p-3 rounded-xl border border-chakra-200 dark:border-chakra-800/40">
                    {selectedIssue.officialRemarks}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl bg-chakra-900 text-white text-xs font-bold"
              >
                Close Inspection View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
