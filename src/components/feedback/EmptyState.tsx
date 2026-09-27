import React from 'react';
import { ClipboardCheck, SearchX, CheckCircle2, ShieldAlert, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

export interface EmptyStateProps {
  type?: 'no-issues' | 'no-search' | 'all-resolved' | 'custom';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  type = 'no-issues',
  title,
  description,
  icon,
  primaryAction,
  secondaryAction,
  className,
}: EmptyStateProps) {
  const presets = {
    'no-issues': {
      icon: <ClipboardCheck className="w-10 h-10 text-chakra-800" />,
      title: title || 'No Active Civic Issues',
      description:
        description ||
        'There are no pending civic hazards reported in this area. Notice an issue? Exercise your civic duty and submit a report.',
      iconBg: 'bg-chakra-50 border-chakra-200',
    },
    'no-search': {
      icon: <SearchX className="w-10 h-10 text-slate-500" />,
      title: title || 'No Matches Found',
      description:
        description ||
        'We could not find any grievances matching your search query or filters. Try adjusting keywords or clearing status filters.',
      iconBg: 'bg-slate-100 border-slate-200',
    },
    'all-resolved': {
      icon: <CheckCircle2 className="w-10 h-10 text-emerald-600" />,
      title: title || 'All Ward Issues Resolved!',
      description:
        description ||
        'Outstanding work! All verified reports in this ward have been attended to by municipal response teams and active citizens.',
      iconBg: 'bg-emerald-50 border-emerald-200',
    },
    custom: {
      icon: icon || <ShieldAlert className="w-10 h-10 text-saffron-600" />,
      title: title || 'No Records Available',
      description: description || 'There is currently no information to display here.',
      iconBg: 'bg-saffron-50 border-saffron-200',
    },
  };

  const current = presets[type];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 sm:p-12 text-center bg-white rounded-2xl border border-slate-200/90 shadow-sm max-w-lg mx-auto',
        className
      )}
    >
      <div
        className={cn(
          'w-20 h-20 rounded-2xl flex items-center justify-center border mb-6 shadow-sm relative',
          current.iconBg
        )}
      >
        {current.icon}
        <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-saffron-600">
          <Sparkles className="w-3.5 h-3.5" />
        </span>
      </div>

      <h4 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 tracking-tight">
        {current.title}
      </h4>

      <p className="text-xs sm:text-sm text-slate-500 max-w-sm leading-relaxed mb-6">
        {current.description}
      </p>

      {(primaryAction || secondaryAction) && (
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          {primaryAction && (
            <Button
              variant="saffron"
              size="md"
              leftIcon={primaryAction.icon}
              onClick={primaryAction.onClick}
              className="w-full sm:w-auto font-semibold"
            >
              {primaryAction.label}
            </Button>
          )}

          {secondaryAction && (
            <Button
              variant="outline"
              size="md"
              onClick={secondaryAction.onClick}
              className="w-full sm:w-auto"
            >
              {secondaryAction.label}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
