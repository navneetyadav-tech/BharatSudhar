import { useState } from 'react';
import { CheckCheck, Clock, ShieldAlert, Building2, CheckCircle2 } from 'lucide-react';
import type { CivicNotification } from './types';

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
    title: 'Civic Karma Reward',
    message: 'You earned +50 Civic Karma points for contributing geo-verified civic evidence in your ward.',
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

interface MobileNotificationsProps {
  notifications?: CivicNotification[];
  onMarkAllRead?: () => void;
  onMarkSingleRead?: (id: string) => void;
}

export function MobileNotifications({
  notifications: externalNotifications,
  onMarkAllRead: externalMarkAllRead,
  onMarkSingleRead: externalMarkSingleRead,
}: MobileNotificationsProps = {}) {
  const [internalNotifications, setInternalNotifications] = useState<CivicNotification[]>(INITIAL_NOTIFICATIONS);

  const notifications = externalNotifications ?? internalNotifications;

  const handleMarkAllRead = () => {
    if (externalMarkAllRead) {
      externalMarkAllRead();
    } else {
      setInternalNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    }
  };

  const handleToggleRead = (id: string) => {
    if (externalMarkSingleRead) {
      externalMarkSingleRead(id);
    } else {
      setInternalNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="space-y-4 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div>
          <h2 className="text-2xl font-extrabold text-[#172B4D] tracking-tight">
            Notifications
          </h2>
          <p className="text-xs text-[#718096]">
            Municipal updates, complaint milestones, and ward announcements.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#3157A4] hover:text-[#254483] transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {notifications.map((item) => (
          <div
            key={item.id}
            onClick={() => handleToggleRead(item.id)}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              item.isRead
                ? 'bg-white border-[#DCE6F0] shadow-subtle'
                : 'bg-white border-[#3157A4]/40 shadow-subtle ring-1 ring-[#3157A4]/20'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'municipal_alert'
                    ? 'bg-[#FEF9C3] text-[#854D0E] border border-[#FDE047]'
                    : item.type === 'resolution'
                    ? 'bg-[#22A982]/10 text-[#22A982]'
                    : 'bg-[#3157A4]/10 text-[#3157A4]'
                }`}
              >
                {item.type === 'municipal_alert' ? (
                  <ShieldAlert className="w-4 h-4" />
                ) : item.type === 'resolution' ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <Building2 className="w-4 h-4" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs sm:text-sm font-bold text-[#172B4D] leading-tight">
                    {item.title}
                  </h4>
                  {!item.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#EAB308] shrink-0" />
                  )}
                </div>

                <p className="text-xs text-[#718096] mt-1 leading-relaxed">
                  {item.message}
                </p>

                <div className="flex items-center gap-1 mt-2 text-[10px] text-[#718096] font-medium">
                  <Clock className="w-3 h-3" />
                  <span>{item.time}</span>
                  {item.reportId && (
                    <span className="ml-2 font-mono font-bold text-[#3157A4]">
                      Ref: #{item.reportId}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
