import { useState } from 'react';
import {
  X,
  Bell,
  CheckCheck,
  CheckCircle2,
  Clock,
  ShieldAlert,
  Award,
  ArrowRight,
} from 'lucide-react';
import type { CivicNotification } from './types';

interface MobileNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: CivicNotification[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (id: string) => void;
  onViewReportsTab: () => void;
}

export function MobileNotificationDrawer({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onViewReportsTab,
}: MobileNotificationDrawerProps) {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const filteredNotifications = notifications.filter((n) =>
    filter === 'unread' ? !n.isRead : true
  );

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Notification Panel */}
      <aside
        className="relative w-full sm:w-[400px] max-w-full bg-white dark:bg-[#0F172A] text-[#172B4D] dark:text-[#E2E8F0] h-full shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out animate-slide-left overflow-y-auto border-l border-[#DCE6F0] dark:border-[#1E293B]"
        aria-label="Notification Panel"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#DCE6F0] dark:border-[#1E293B] flex items-center justify-between bg-gradient-to-l from-[#F4F8FC] to-white dark:from-[#1E293B] dark:to-[#0F172A]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#3157A4]/10 dark:bg-[#60A5FA]/20 flex items-center justify-center text-[#3157A4] dark:text-[#60A5FA] relative">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#FACC15] ring-2 ring-white dark:ring-[#0F172A]" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xs font-black uppercase tracking-wider text-[#3157A4] dark:text-[#60A5FA]">
                  Notifications
                </h2>
                {unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-black bg-[#FEF9C3] dark:bg-yellow-950/70 text-[#854D0E] dark:text-[#FACC15] border border-[#FDE047] dark:border-yellow-700/50">
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[#718096] dark:text-[#94A3B8]">
                Municipal & civic alerts
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="text-[11px] font-bold text-[#3157A4] dark:text-[#60A5FA] hover:text-[#274682] dark:hover:text-[#93C5FD] flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[#EBF1FA] dark:hover:bg-[#1E293B] transition-colors"
                title="Mark all as read"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Read all</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-xl bg-white dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] text-[#718096] dark:text-[#94A3B8] hover:text-[#172B4D] dark:hover:text-white hover:bg-[#F4F8FC] dark:hover:bg-[#334155] flex items-center justify-center transition-colors shadow-xs"
              title="Close notifications"
              aria-label="Close notifications"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="p-3 border-b border-[#DCE6F0] dark:border-[#1E293B] bg-[#F8FAFC] dark:bg-[#0B132B]/80 flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              filter === 'all'
                ? 'bg-[#3157A4] dark:bg-[#3B82F6] text-white shadow-xs'
                : 'bg-white dark:bg-[#1E293B] text-[#718096] dark:text-[#94A3B8] border border-[#DCE6F0] dark:border-[#334155] hover:text-[#172B4D] dark:hover:text-white'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
              filter === 'unread'
                ? 'bg-[#3157A4] dark:bg-[#3B82F6] text-white shadow-xs'
                : 'bg-white dark:bg-[#1E293B] text-[#718096] dark:text-[#94A3B8] border border-[#DCE6F0] dark:border-[#334155] hover:text-[#172B4D] dark:hover:text-white'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notification Items List */}
        <div className="p-3 flex-1 space-y-2.5 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="py-12 text-center">
              <CheckCircle2 className="w-10 h-10 text-[#22A982] mx-auto mb-2 opacity-80" />
              <p className="text-xs font-bold text-[#172B4D] dark:text-white">You're all caught up!</p>
              <p className="text-[11px] text-[#718096] dark:text-[#94A3B8] mt-0.5">No new alerts at this moment</p>
            </div>
          ) : (
            filteredNotifications.map((notif) => {
              return (
                <div
                  key={notif.id}
                  onClick={() => onMarkAsRead(notif.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer relative ${
                    notif.isRead
                      ? 'bg-white dark:bg-[#111C35] border-[#E2E8F0] dark:border-[#1E293B] opacity-80 hover:opacity-100'
                      : 'bg-[#F4F8FC] dark:bg-[#16223F] border-[#B8CDE6] dark:border-[#2D4577] shadow-xs hover:border-[#3157A4]'
                  }`}
                >
                  {!notif.isRead && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#3157A4] dark:bg-[#60A5FA]" />
                  )}
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 shrink-0">
                      {notif.type === 'municipal_alert' ? (
                        <div className="w-7 h-7 rounded-lg bg-[#FEF9C3] dark:bg-yellow-950/70 text-[#854D0E] dark:text-[#FACC15] flex items-center justify-center">
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                      ) : notif.type === 'resolution' ? (
                        <div className="w-7 h-7 rounded-lg bg-[#E8F7F2] dark:bg-emerald-950/70 text-[#22A982] dark:text-[#34D399] flex items-center justify-center">
                          <Award className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-[#EBF1FA] dark:bg-blue-950/70 text-[#3157A4] dark:text-[#60A5FA] flex items-center justify-center">
                          <Clock className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 pr-3">
                      <h3 className="text-xs font-bold text-[#172B4D] dark:text-white leading-tight">
                        {notif.title}
                      </h3>
                      <p className="text-[11px] text-[#4A5568] dark:text-[#94A3B8] mt-1 leading-relaxed">
                        {notif.message}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#E2E8F0]/60 dark:border-[#1E293B] text-[10px] text-[#718096] dark:text-[#64748B]">
                        <span>{notif.time}</span>
                        {notif.reportId && (
                          <span className="text-[#3157A4] dark:text-[#60A5FA] font-bold">
                            {notif.reportId}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-3 border-t border-[#DCE6F0] dark:border-[#1E293B] bg-white dark:bg-[#0F172A]">
          <button
            type="button"
            onClick={() => {
              onClose();
              onViewReportsTab();
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#F4F8FC] dark:bg-[#1E293B] hover:bg-[#EBF1FA] dark:hover:bg-[#334155] text-[#3157A4] dark:text-[#60A5FA] font-bold text-xs transition-colors border border-[#DCE6F0] dark:border-[#334155]"
          >
            <span>View All in My Reports</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </div>
  );
}
