import {
  ShieldCheck,
  PlusCircle,
  FileText,
  Clock,
  CheckCircle2,
  Zap,
  MapPin,
  LogOut,
} from 'lucide-react';
import type { CitizenProfile } from '../../types';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Card } from '../common/Card';

interface CitizenHeaderProps {
  citizen: CitizenProfile;
  onReportClick: () => void;
  onLogout?: () => void;
}

export function CitizenHeader({ citizen, onReportClick, onLogout }: CitizenHeaderProps) {


  return (
    <div className="space-y-6">
      {/* Master Profile Banner Card */}
      <Card className="relative overflow-hidden border border-slate-200/90 bg-gradient-to-br from-white via-slate-50/60 to-saffron-50/20 shadow-sm p-6 sm:p-8">
        {/* Subtle decorative background watermarks */}
        <div className="absolute -top-16 -right-16 w-48 h-48 bg-saffron-200/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-chakra-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Avatar & Identity Details */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {/* Avatar with Verified Ring */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-chakra-900 via-chakra-800 to-saffron-600 text-white font-extrabold text-xl sm:text-2xl flex items-center justify-center shadow-md shadow-chakra-900/10">
                {citizen.avatar}
              </div>
              <div
                className="absolute -bottom-1.5 -right-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-600 border-2 border-white text-white flex items-center justify-center shadow"
                title="Verified Citizen Identity"
              >
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
            </div>

            {/* Name, Roles, and Ward */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  {citizen.name}
                </h1>
                <Badge variant="chakra" withDot className="font-semibold">
                  Verified Nagrik
                </Badge>
                <Badge variant="saffron" className="font-medium">
                  Level {citizen.level}: {citizen.levelTitle}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-slate-600">
                <span className="inline-flex items-center gap-1 font-medium text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-saffron-600" />
                  {citizen.city}{citizen.district ? `, ${citizen.district}` : ''}, {citizen.state}
                </span>
                {citizen.email && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-700 font-mono text-xs">{citizen.email}</span>
                  </>
                )}
                <span className="text-slate-300">•</span>
                <span>{citizen.role}</span>
              </div>
            </div>
          </div>

          {/* Right: Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 lg:shrink-0">


            {/* Quick Actions CTA */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="saffron"
                size="md"
                leftIcon={<PlusCircle className="w-4 h-4" />}
                onClick={onReportClick}
                className="font-bold shadow-md shadow-saffron-600/15"
              >
                Report Grievance
              </Button>
              {onLogout && (
                <Button
                  variant="outline"
                  size="md"
                  leftIcon={<LogOut className="w-4 h-4" />}
                  onClick={onLogout}
                  className="font-bold text-xs text-rose-600 border-slate-200 hover:bg-rose-50 hover:border-rose-300"
                  title="Sign out of Citizen Account"
                >
                  Sign Out
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Reported */}
        <Card hoverEffect className="p-4 sm:p-5 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                My Grievances
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {citizen.stats.totalReported}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Total lodged in ward</p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-chakra-50 border border-chakra-200 text-chakra-800 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
          </div>
        </Card>

        {/* In Action / Progress */}
        <Card hoverEffect className="p-4 sm:p-5 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Under Action
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-saffron-700 mt-1">
                {citizen.stats.inAction}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">Active municipal crews</p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-saffron-50 border border-saffron-200 text-saffron-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </Card>

        {/* Resolved */}
        <Card hoverEffect className="p-4 sm:p-5 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Resolved & Verified
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-tirangaGreen-700 mt-1">
                {citizen.stats.totalResolved}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {Math.round((citizen.stats.totalResolved / citizen.stats.totalReported) * 100)}% resolution rate
              </p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-tirangaGreen-50 border border-tirangaGreen-200 text-tirangaGreen-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
        </Card>

        {/* Avg Resolution Speed */}
        <Card hoverEffect className="p-4 sm:p-5 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Avg Resolution
              </p>
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                {citizen.stats.avgResolutionHours}h
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                25% faster than average
              </p>
            </div>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
