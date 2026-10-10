export type IssueCategory = 
  | 'cleanliness'
  | 'roads-infrastructure'
  | 'water-drainage'
  | 'street-lighting'
  | 'traffic-safety'
  | 'parks-greenery'
  | 'other';

export type IssueStatus = 'submitted' | 'under-review' | 'in-progress' | 'resolved' | 'rejected';

export type IssuePriority = 'low' | 'medium' | 'high' | 'urgent';

export interface CivicIssue {
  id: string;
  title: string;
  description: string;
  category: IssueCategory;
  status: IssueStatus;
  priority: IssuePriority;
  location: {
    address: string;
    city: string;
    ward?: string;
    pincode: string;
    area?: string;
    road?: string;
    landmark?: string;
    latitude?: number;
    longitude?: number;
  };
  photo?: string;
  livePhoto?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
    accuracy?: number;
    addressText?: string;
  };
  reportedAt: string;
  updatedAt: string;
  upvotes: number;
  reportedBy: string;
}

export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  badge?: string;
}

export interface HelplineItem {
  service: string;
  number: string;
  description: string;
}

export interface CitizenProfile {
  id: string;
  name: string;
  avatar: string;
  ward: string;
  city: string;
  district?: string;
  state: string;
  email?: string;
  pincode: string;
  role: string;
  isVerified: boolean;
  civicKarma: number;
  level: number;
  levelTitle: string;
  nextLevelKarma: number;
  joinedDate: string;
  isAuthority?: boolean;
  department?: string;
  designation?: string;
  municipality?: string;
  badgeNumber?: string;
  stats: {
    totalReported: number;
    totalResolved: number;
    inAction: number;
    avgResolutionHours: number;
    upvotesReceived: number;
  };
}

export interface TimelineEvent {
  id: string;
  title: string;
  timestamp: string;
  stage: 'submitted' | 'acknowledged' | 'dispatched' | 'resolved';
  actor: string;
  actorRole?: string;
  description: string;
  photoUrl?: string;
  officialRemark?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
}

export interface DashboardGrievance extends CivicIssue {
  stepIndex: number; // 0: Submitted, 1: Acknowledged, 2: Dispatched, 3: Resolved
  progressPercent: number;
  estimatedResolution: string;
  officialRemarks: string;
  assignedOfficer?: {
    name: string;
    designation: string;
    department: string;
    phone?: string;
  };
  timeline: TimelineEvent[];
  beforePhoto?: string;
  afterPhoto?: string;
}

export interface WardMetrics {
  wardCode: string;
  wardName: string;
  municipality: string;
  zone: string;
  healthScore: number;
  healthStatus: 'excellent' | 'good' | 'moderate' | 'critical';
  totalReportedMonth: number;
  totalResolvedMonth: number;
  resolutionRate: number;
  avgResolutionDays: number;
  cityAvgResolutionDays: number;
  activeFieldTeams: number;
  councillor: {
    name: string;
    party?: string;
    phone: string;
    office: string;
  };
  categories: {
    category: IssueCategory;
    label: string;
    count: number;
    resolvedPercent: number;
  }[];
}

export interface WardActivityItem {
  id: string;
  issueId: string;
  title: string;
  category: IssueCategory;
  actionType: 'reported' | 'dispatched' | 'resolved' | 'milestone';
  timestamp: string;
  ward: string;
  location: string;
  actor: string;
  description: string;
  photoUrl?: string;
}

export interface WardLeader {
  rank: number;
  name: string;
  avatar: string;
  badge: string;
  karma: number;
  issuesResolved: number;
  isCurrentUser?: boolean;
}
