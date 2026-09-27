import {
  Activity,
  Building,
  Phone,
  MapPin,
  Calendar,
  Construction,
  Trash2,
  Lightbulb,
  Droplets,
  Award,
} from 'lucide-react';
import type { WardMetrics, IssueCategory } from '../../types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface WardAnalyticsTabProps {
  metrics: WardMetrics;
}

export function WardAnalyticsTab({ metrics }: WardAnalyticsTabProps) {
  const getCategoryIcon = (category: IssueCategory) => {
    switch (category) {
      case 'roads-infrastructure':
        return <Construction className="w-4 h-4 text-amber-600" />;
      case 'cleanliness':
        return <Trash2 className="w-4 h-4 text-emerald-600" />;
      case 'street-lighting':
        return <Lightbulb className="w-4 h-4 text-blue-600" />;
      case 'water-drainage':
        return <Droplets className="w-4 h-4 text-cyan-600" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Ward Title & Health Score Dial */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ward Info & Efficiency Score */}
        <Card className="lg:col-span-2 p-6 sm:p-7 border border-slate-200 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-saffron-600 uppercase tracking-wide">
                  {metrics.municipality}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-medium text-slate-500">{metrics.zone}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {metrics.wardName} ({metrics.wardCode})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Live municipal performance & neighborhood public service metrics.
              </p>
            </div>

            {/* Health Score Pill Badge */}
            <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200/90 rounded-2xl p-3 sm:px-4 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-sm">
                {metrics.healthScore}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-emerald-900 uppercase">
                    Ward Health Score
                  </span>
                  <Badge variant="success" className="text-[10px] px-1.5 py-0">
                    TOP 5%
                  </Badge>
                </div>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                  Green Zone • High Municipal Efficiency
                </p>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Monthly Grievances</p>
              <p className="text-2xl font-bold text-slate-900">{metrics.totalReportedMonth}</p>
              <p className="text-[11px] text-slate-400">Total filed in ward</p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Resolution Rate</p>
              <p className="text-2xl font-bold text-tirangaGreen-700">{metrics.resolutionRate}%</p>
              <p className="text-[11px] text-emerald-700 font-medium">
                {metrics.totalResolvedMonth} resolved
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-slate-900">{metrics.avgResolutionDays} Days</p>
              <p className="text-[11px] text-emerald-700 font-semibold">
                56% faster than city avg
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-500 font-medium">Active Field Crews</p>
              <p className="text-2xl font-bold text-chakra-800">{metrics.activeFieldTeams}</p>
              <p className="text-[11px] text-slate-400">On duty today</p>
            </div>
          </div>
        </Card>

        {/* Ward Leadership & Councillor Contact */}
        <Card className="p-6 border border-slate-200 bg-gradient-to-br from-slate-50 to-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-chakra-100 text-chakra-800 flex items-center justify-center">
                <Building className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  Ward Authority
                </p>
                <p className="text-sm font-bold text-slate-900">{metrics.councillor.name}</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-200/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{metrics.councillor.office}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Public Hearing: Mon - Fri (10:00 AM - 1:00 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-saffron-600 shrink-0" />
                <a
                  href={`tel:${metrics.councillor.phone}`}
                  className="font-bold text-chakra-800 hover:underline"
                >
                  {metrics.councillor.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-5 p-3 rounded-xl bg-saffron-50/70 border border-saffron-200 text-xs text-saffron-900 flex items-center gap-2">
            <Award className="w-4 h-4 text-saffron-600 shrink-0" />
            <span>Ward 45-B ranked #3 in South Delhi Swachhata rankings.</span>
          </div>
        </Card>
      </div>

      {/* Category Performance Breakdown */}
      <Card className="p-6 sm:p-7 border border-slate-200 bg-white">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Departmental Resolution Performance
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Breakdown of public grievances across core civic departments in Ward 45-B.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full hidden sm:inline-block">
            Updated Hourly
          </span>
        </div>

        <div className="space-y-5">
          {metrics.categories.map((cat) => (
            <div key={cat.category} className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-bold text-slate-800">
                  {getCategoryIcon(cat.category)}
                  <span>{cat.label}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500">
                    {cat.count} Issues Reported
                  </span>
                  <span className="font-extrabold text-tirangaGreen-700">
                    {cat.resolvedPercent}% Resolved
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-chakra-700 via-saffron-500 to-tirangaGreen-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.resolvedPercent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
