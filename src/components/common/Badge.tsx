import React from 'react';
import { cn } from '../../utils/cn';
import type { IssueStatus, IssuePriority } from '../../types';
import { CheckCircle2, ShieldCheck, Flame } from 'lucide-react';

export type CitizenBadgeRole = 'verified-citizen' | 'ward-champion' | 'civic-volunteer';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'saffron' | 'chakra' | 'success' | 'warning' | 'danger' | 'slate';
  status?: IssueStatus;
  priority?: IssuePriority;
  role?: CitizenBadgeRole;
  withDot?: boolean;
}

export function Badge({
  className,
  variant = 'default',
  status,
  priority,
  role,
  withDot = false,
  children,
  ...props
}: BadgeProps) {
  let resolvedVariant = variant;
  let customIcon: React.ReactNode = null;

  if (status) {
    switch (status) {
      case 'resolved':
        resolvedVariant = 'success';
        customIcon = <CheckCircle2 className="w-3 h-3 text-emerald-700 shrink-0" />;
        break;
      case 'in-progress':
        resolvedVariant = 'saffron';
        break;
      case 'under-review':
        resolvedVariant = 'chakra';
        break;
      case 'submitted':
        resolvedVariant = 'warning';
        break;
      case 'rejected':
        resolvedVariant = 'danger';
        break;
    }
  } else if (priority) {
    switch (priority) {
      case 'urgent':
        resolvedVariant = 'danger';
        customIcon = <Flame className="w-3 h-3 text-rose-600 shrink-0" />;
        break;
      case 'high':
        resolvedVariant = 'saffron';
        break;
      case 'medium':
        resolvedVariant = 'warning';
        break;
      case 'low':
        resolvedVariant = 'slate';
        break;
    }
  } else if (role) {
    switch (role) {
      case 'verified-citizen':
        resolvedVariant = 'chakra';
        customIcon = <ShieldCheck className="w-3.5 h-3.5 text-chakra-700 shrink-0" />;
        break;
      case 'ward-champion':
        resolvedVariant = 'saffron';
        customIcon = <Flame className="w-3.5 h-3.5 text-saffron-600 shrink-0" />;
        break;
      case 'civic-volunteer':
        resolvedVariant = 'success';
        customIcon = <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />;
        break;
    }
  }

  const variants = {
    default: 'bg-[#EBF1FA] text-[#3157A4] border-[#DCE6F0]',
    saffron: 'bg-[#FEF9C3] text-[#854D0E] border-[#FDE047] font-semibold',
    chakra: 'bg-[#EBF1FA] text-[#3157A4] border-[#DCE6F0] font-semibold',
    success: 'bg-[#E8F7F2] text-[#1B8768] border-[#A3DFCC] font-semibold',
    warning: 'bg-[#FEF9C3] text-[#854D0E] border-[#FDE047] font-semibold',
    danger: 'bg-rose-50 text-rose-800 border-rose-200 font-semibold',
    slate: 'bg-[#F0F5FD] text-[#718096] border-[#DCE6F0] font-medium',
  };

  const dotColors = {
    default: 'bg-[#3157A4]',
    saffron: 'bg-[#EAB308]',
    chakra: 'bg-[#3157A4]',
    success: 'bg-[#22A982]',
    warning: 'bg-[#EAB308]',
    danger: 'bg-rose-500',
    slate: 'bg-[#718096]',
  };

  // Label formatting helper
  const getDisplayLabel = () => {
    if (children) return children;
    if (status) {
      return status.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    }
    if (priority) {
      return priority.charAt(0).toUpperCase() + priority.slice(1) + ' Priority';
    }
    if (role) {
      return role.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
    }
    return '';
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs tracking-wide transition-colors select-none',
        variants[resolvedVariant],
        className
      )}
      {...props}
    >
      {customIcon ? (
        customIcon
      ) : withDot ? (
        <span
          className={cn('h-1.5 w-1.5 rounded-full animate-pulse', dotColors[resolvedVariant])}
          aria-hidden="true"
        />
      ) : null}
      <span>{getDisplayLabel()}</span>
    </span>
  );
}
