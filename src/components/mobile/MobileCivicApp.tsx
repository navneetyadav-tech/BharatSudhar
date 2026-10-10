import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  PlusCircle,
  FileText,
  User,
} from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileTopBar } from './MobileTopBar';
import { MobileOptionDrawer } from './MobileOptionDrawer';
import { MobileNotificationDrawer } from './MobileNotificationDrawer';
import { MobileOverview } from './MobileOverview';
import { MobileReportWizard } from './MobileReportWizard';
import { MobileMyReports } from './MobileMyReports';
import { MobileProfile } from './MobileProfile';
import { MobileNotifications } from './MobileNotifications';
import { MobileExploreIssues } from './MobileExploreIssues';
import type { MobileTab, MobileReport, CivicNotification } from './types';
import { useAuth } from '../../context/AuthContext';

const INITIAL_NOTIFICATIONS: CivicNotification[] = [
  {
    id: 'n1',
    title: 'Ward Swachhata Inspection Scheduled',
    message: 'Municipal sanitary inspector team will conduct door-to-door waste segregation audit this Saturday at 10:00 AM.',
    time: '25 mins ago',
    type: 'municipal_alert',
    isRead: false,
  },
  {
    id: 'n2',
    title: 'Field Team Dispatched for Pothole Patching',
    message: 'Complaint #BS-2026-081: Cold-mix asphalt repair truck has arrived on site. Expected completion within 3 hours.',
    time: '2 hours ago',
    type: 'status_update',
    isRead: false,
    reportId: 'BS-2026-081',
  },
  {
    id: 'n3',
    title: 'Grievance Verified',
    message: 'Municipal officers have verified the civic evidence and assigned an inspection crew in your ward.',
    time: 'Yesterday',
    type: 'resolution',
    isRead: true,
  },
  {
    id: 'n4',
    title: 'Broken Streetlight Restored',
    message: 'Electrical division has replaced the high-pressure sodium bulb on Main Lane with a high-efficiency LED fixture.',
    time: '2 days ago',
    type: 'resolution',
    isRead: true,
  },
];

export function MobileCivicApp() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Citizen Name (Defaulting to authenticated user or stored name)
  const [userName, setUserName] = useState<string>(() => {
    if (user?.name) return user.name;
    try {
      const stored = localStorage.getItem('bharat_sudhar_citizen_name');
      if (stored) return stored;
    } catch {
      // Fallback
    }
    return 'Anand Deshmukh';
  });

  // Sync citizen name if user profile updates
  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
    }
  }, [user?.name]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Current active navigation tab
  const [activeTab, setActiveTab] = useState<MobileTab>('overview');

  // Detect if current device or viewport is mobile (< 768px)
  const [isMobileScreen, setIsMobileScreen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reports list persisted in localStorage
  const [reports, setReports] = useState<MobileReport[]>(() => {
    try {
      const stored = localStorage.getItem('bharat_sudhar_mobile_reports');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  // Toggle for desktop preview frame (Phone Frame vs Desktop View)
  const [isFrameMode, setIsFrameMode] = useState<boolean>(true);

  // Sync citizen name to storage
  const handleUpdateUserName = (newName: string) => {
    setUserName(newName);
    try {
      localStorage.setItem('bharat_sudhar_citizen_name', newName);
    } catch {
      // Ignore
    }
  };

  // Sync reports to storage
  useEffect(() => {
    try {
      localStorage.setItem('bharat_sudhar_mobile_reports', JSON.stringify(reports));
    } catch {
      // Ignore
    }
  }, [reports]);

  // Civic Notifications State
  const [notifications, setNotifications] = useState<CivicNotification[]>(INITIAL_NOTIFICATIONS);
  const unreadNotificationsCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkSingleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Option Drawer (Left) & Notification Drawer (Right)
  const [isOptionDrawerOpen, setIsOptionDrawerOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Handle new complaint submitted
  const handleComplaintSubmitted = (newReport: MobileReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  // Simulate advancing stage of a report
  const handleAdvanceReportStage = (reportId: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === reportId) {
          if (r.status === 'under-review') {
            return {
              ...r,
              status: 'in-progress',
              officialRemarks: 'MCD Rapid Response vehicle and junior engineer dispatched on-site. Work in progress.',
            };
          }
          if (r.status === 'in-progress') {
            return {
              ...r,
              status: 'resolved',
              officialRemarks: 'Work completed by municipal field division. Spot photographed and closed.',
            };
          }
        }
        return r;
      })
    );
  };

  // Navigation Items for Desktop Sidebar
  const navSidebarItems: { id: MobileTab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'explore', label: 'Explore Issues', icon: Compass },
    { id: 'report', label: 'Report a Problem', icon: PlusCircle },
    { id: 'my-reports', label: 'My Reports', icon: FileText },
    { id: 'profile', label: 'Citizen Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FC] dark:bg-[#0B132B] text-[#172B4D] dark:text-[#E2E8F0] font-sans flex flex-col relative overflow-hidden selection:bg-[#3157A4] selection:text-white transition-colors duration-300">
      {/* Dynamic Civic Background Wallpaper with subtle overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-[0.08] dark:opacity-[0.04] transition-all duration-700"
        style={{ backgroundImage: "url('/images/civic-hero-bg.jpg')" }}
      />
      {/* Ambient gradient mesh */}
      <div className="fixed inset-0 bg-gradient-to-b from-[#EBF2FA]/70 dark:from-[#0F172A]/70 via-[#F4F8FC]/85 dark:via-[#0B132B]/85 to-[#F4F8FC] dark:to-[#0B132B] pointer-events-none" />
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-[#3157A4]/5 dark:bg-[#38BDF8]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-[#22A982]/5 dark:bg-[#34D399]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Universal App Header (Only on desktop to allow view toggling) */}
      {!isMobileScreen && (
        <MobileHeader
          userName={userName}
          onUpdateUserName={handleUpdateUserName}
          onLogout={handleLogout}
          isFrameMode={isFrameMode}
          onToggleFrameMode={() => setIsFrameMode((prev) => !prev)}
          onOpenNotificationPane={() => setIsNotificationDrawerOpen(true)}
          unreadNotificationsCount={unreadNotificationsCount}
          onOpenProfile={() => setActiveTab('profile')}
          onOpenDashboard={() => setActiveTab('overview')}
        />
      )}

      {/* Main Container Wrapper */}
      <div className={`flex-1 w-full flex justify-center relative z-10 ${isMobileScreen ? 'py-0 px-0' : 'py-6 px-4'}`}>
        {/* Container Framing: Native phone view on mobile devices, or Frame vs Desktop view on desktop */}
        <div
          className={`w-full transition-all duration-300 ${
            isMobileScreen
              ? 'flex flex-col min-h-full max-w-full'
              : isFrameMode
              ? 'max-w-md border border-slate-200/90 dark:border-slate-800 rounded-3xl shadow-2xl bg-white dark:bg-[#0F172A] overflow-hidden min-h-[820px] flex flex-col ring-1 ring-slate-900/5 dark:ring-white/10'
              : 'max-w-5xl mx-auto flex gap-6'
          }`}
        >
          {/* Mobile UI Top Bar with Option Pane (Left) and [Mobile/Desktop, Day/Night, Notification, Profile] (Right) */}
          {(isMobileScreen || isFrameMode) && (
            <MobileTopBar
              onOpenOptionPane={() => setIsOptionDrawerOpen(true)}
              onOpenNotificationPane={() => setIsNotificationDrawerOpen(true)}
              onOpenProfile={() => setActiveTab('profile')}
              isFrameMode={isFrameMode}
              onToggleFrameMode={isMobileScreen ? undefined : () => setIsFrameMode((prev) => !prev)}
              unreadCount={unreadNotificationsCount}
              userName={userName}
            />
          )}

          {/* Desktop Sidebar (Shown only on desktop when Desktop View is active) */}
          {!isMobileScreen && !isFrameMode && (
            <aside className="hidden md:flex flex-col w-56 bg-white dark:bg-[#0F172A] border border-[#DCE6F0] dark:border-[#1E293B] rounded-2xl p-3 shrink-0 self-start shadow-subtle">
              <span className="text-[10px] font-bold text-[#718096] dark:text-[#94A3B8] uppercase tracking-wider px-3 py-1">
                Citizen Portal
              </span>
              <nav className="space-y-1 mt-1">
                {navSidebarItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[#EBF2FA] dark:bg-[#1E293B] text-[#3157A4] dark:text-[#60A5FA] font-bold shadow-subtle'
                          : 'text-[#718096] dark:text-[#94A3B8] hover:bg-[#F4F8FC] dark:hover:bg-[#1E293B] hover:text-[#172B4D] dark:hover:text-[#F8FAFC]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#3157A4] dark:text-[#60A5FA]' : 'text-[#718096] dark:text-[#94A3B8]'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.id === 'my-reports' && reports.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FACC15] text-[#172B4D]">
                          {reports.length}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </aside>
          )}

          {/* Core Screen Viewport */}
          <main
            className="flex-1 bg-[#F4F8FC] dark:bg-[#0B132B] p-3.5 sm:p-5 overflow-y-auto pb-24 transition-colors"
          >
            {/* OVERVIEW TAB (Screenshot 1) */}
            {activeTab === 'overview' && (
              <MobileOverview
                userName={userName}
                reports={reports}
                onStartReport={() => setActiveTab('report')}
                onViewReport={() => setActiveTab('my-reports')}
                onViewAllReports={() => setActiveTab('my-reports')}
              />
            )}

            {/* EXPLORE / PUBLIC ISSUES TAB */}
            {activeTab === 'explore' && (
              <MobileExploreIssues
                onStartReport={() => setActiveTab('report')}
              />
            )}

            {/* REPORT A PROBLEM WIZARD (Screenshots 2 to 5) */}
            {activeTab === 'report' && (
              <MobileReportWizard
                userName={userName}
                onComplaintSubmitted={handleComplaintSubmitted}
                onCancel={() => setActiveTab('overview')}
                onGoToReports={() => setActiveTab('my-reports')}
              />
            )}

            {/* MY REPORTS TAB */}
            {activeTab === 'my-reports' && (
              <MobileMyReports
                reports={reports}
                onStartReport={() => setActiveTab('report')}
                onAdvanceReportStage={handleAdvanceReportStage}
              />
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <MobileProfile
                userName={userName}
                onUpdateUserName={handleUpdateUserName}
                reports={reports}
                onStartReport={() => setActiveTab('report')}
                onViewReports={() => setActiveTab('my-reports')}
                onLogout={handleLogout}
              />
            )}

            {/* NOTIFICATIONS TAB (Available via deep link or notifications panel) */}
            {activeTab === 'notifications' && (
              <MobileNotifications
                notifications={notifications}
                onMarkAllRead={handleMarkAllRead}
                onMarkSingleRead={handleMarkSingleRead}
              />
            )}
          </main>

          {/* Bottom Navigation Bar (Centered for Mobile Screen, Smartphone Frame, and Desktop View) */}
          <MobileBottomNav
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            reportsCount={reports.length}
          />
        </div>
      </div>

      {/* Option Drawer (Slide-in from Left) */}
      <MobileOptionDrawer
        isOpen={isOptionDrawerOpen}
        onClose={() => setIsOptionDrawerOpen(false)}
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        userName={userName}
        onUpdateUserName={handleUpdateUserName}
        onLogout={handleLogout}
        isFrameMode={isFrameMode}
        onToggleFrameMode={() => setIsFrameMode((prev) => !prev)}
        reportsCount={reports.length}
      />

      {/* Notification Drawer (Slide-in from Right) */}
      <MobileNotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllRead}
        onMarkAsRead={handleMarkSingleRead}
        onViewReportsTab={() => setActiveTab('my-reports')}
      />
    </div>
  );
}

