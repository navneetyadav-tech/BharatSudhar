import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  PlusCircle,
  FileText,
  Bell,
} from 'lucide-react';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileOverview } from './MobileOverview';
import { MobileReportWizard } from './MobileReportWizard';
import { MobileMyReports } from './MobileMyReports';
import { MobileNotifications } from './MobileNotifications';
import type { MobileTab, MobileReport } from './types';
import { useAuth } from '../../context/AuthContext';

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
    { id: 'report', label: 'Report a Problem', icon: PlusCircle },
    { id: 'my-reports', label: 'My Reports', icon: FileText },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-[#F4F8FC] text-[#172B4D] font-sans flex flex-col selection:bg-[#3157A4] selection:text-white">
      {/* Top Universal App Header */}
      <MobileHeader
        userName={userName}
        onUpdateUserName={handleUpdateUserName}
        onLogout={handleLogout}
        isFrameMode={isFrameMode}
        onToggleFrameMode={() => setIsFrameMode((prev) => !prev)}
      />

      {/* Main Container Wrapper */}
      <div className={`flex-1 w-full flex justify-center ${isMobileScreen ? 'py-0 px-0' : 'py-6 px-4'}`}>
        {/* Container Framing: Native phone view on mobile devices, or Frame vs Desktop view on desktop */}
        <div
          className={`w-full transition-all duration-300 ${
            isMobileScreen
              ? 'flex flex-col min-h-full max-w-full'
              : isFrameMode
              ? 'max-w-md border border-[#DCE6F0] rounded-3xl shadow-card bg-white overflow-hidden min-h-[820px] flex flex-col'
              : 'max-w-5xl mx-auto flex gap-6'
          }`}
        >
          {/* Desktop Sidebar (Shown only on desktop when Desktop View is active) */}
          {!isMobileScreen && !isFrameMode && (
            <aside className="hidden md:flex flex-col w-56 bg-white border border-[#DCE6F0] rounded-2xl p-3 shrink-0 self-start shadow-subtle">
              <span className="text-[10px] font-bold text-[#718096] uppercase tracking-wider px-3 py-1">
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
                          ? 'bg-[#EBF2FA] text-[#3157A4] font-bold shadow-subtle'
                          : 'text-[#718096] hover:bg-[#F4F8FC] hover:text-[#172B4D]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-[#3157A4]' : 'text-[#718096]'}`} />
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
            className={`flex-1 bg-[#F4F8FC] p-3.5 sm:p-5 overflow-y-auto ${
              isMobileScreen || isFrameMode ? 'pb-24' : 'pb-8'
            }`}
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

            {/* NOTIFICATIONS TAB */}
            {activeTab === 'notifications' && <MobileNotifications />}
          </main>

          {/* Bottom Navigation Bar (Active on Mobile Phone, and inside Desktop Mobile Frame mode) */}
          {(isMobileScreen || isFrameMode) && (
            <MobileBottomNav
              activeTab={activeTab}
              onSelectTab={(tab) => setActiveTab(tab)}
              reportsCount={reports.length}
              unreadNotificationsCount={2}
            />
          )}
        </div>
      </div>
    </div>
  );
}
