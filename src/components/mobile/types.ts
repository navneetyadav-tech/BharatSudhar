export type MobileTab = 'overview' | 'explore' | 'report' | 'my-reports' | 'profile' | 'notifications';

export interface ProblemCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface MobileReport {
  id: string;
  category: string;
  categoryName: string;
  categoryEmoji: string;
  photoUrl: string;
  additionalPhotoUrl?: string;
  location: {
    locality: string;
    addressText: string;
    latitude?: number;
    longitude?: number;
  };
  description: string;
  status: 'under-review' | 'in-progress' | 'resolved';
  createdAt: string;
  timestamp: string;
  isAnonymous?: boolean;
  assignedDepartment?: string;
  officialRemarks?: string;
}

export interface CivicNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'status_update' | 'municipal_alert' | 'resolution';
  isRead: boolean;
  reportId?: string;
}
