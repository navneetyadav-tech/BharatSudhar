import {
  Activity,
  CheckCircle2,
  Clock,
  Award,
  AlertCircle,
  MapPin,
  Radio,
} from 'lucide-react';
import type { WardActivityItem } from '../../types';
import { Card } from '../common/Card';

interface WardActivityFeedProps {
  activities: WardActivityItem[];
}

export function WardActivityFeed({ activities }: WardActivityFeedProps) {
  const getActionBadge = (actionType: WardActivityItem['actionType']) => {
    switch (actionType) {
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Resolved
          </span>
        );
      case 'dispatched':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-saffron-800 bg-saffron-50 border border-saffron-200 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3 text-saffron-600" />
            Field Dispatched
          </span>
        );
      case 'milestone':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-800 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
            <Award className="w-3 h-3 text-purple-600" />
            Ward Milestone
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
            <AlertCircle className="w-3 h-3 text-blue-600" />
            New Grievance
          </span>
        );
    }
  };

  return (
    <Card className="p-6 border border-slate-200 bg-white">
      {/* Feed Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-chakra-800" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Live Ward 45-B Civic Activity
          </h3>
        </div>

        {/* Live Broadcast Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold">
          <Radio className="w-3 h-3 animate-pulse" />
          <span>LIVE BROADCAST</span>
        </div>
      </div>

      {/* Activity Timeline Items */}
      <div className="divide-y divide-slate-100">
        {activities.map((item) => (
          <div key={item.id} className="py-4 first:pt-0 last:pb-0 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {getActionBadge(item.actionType)}
                <span className="font-mono text-xs font-semibold text-slate-500">
                  {item.issueId}
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-400">{item.timestamp}</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>

            <p className="text-xs text-slate-600 leading-normal">{item.description}</p>

            <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-500 pt-0.5">
              <span className="font-semibold text-slate-700">{item.actor}</span>
              <span className="text-slate-300">•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-saffron-600" />
                {item.location}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
