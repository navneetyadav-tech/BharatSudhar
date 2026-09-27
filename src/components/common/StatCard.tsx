import React from 'react';
import { Card } from './Card';
import { cn } from '../../utils/cn';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  accentColor?: 'chakra' | 'saffron' | 'green' | 'amber';
  className?: string;
}

export function StatCard({
  title,
  value,
  subtext,
  icon,
  trend,
  accentColor = 'chakra',
  className,
}: StatCardProps) {
  const accentClasses = {
    chakra: 'bg-chakra-50 text-chakra-800 border-chakra-200',
    saffron: 'bg-saffron-50 text-saffron-700 border-saffron-200',
    green: 'bg-tirangaGreen-50 text-tirangaGreen-700 border-tirangaGreen-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
  };

  return (
    <Card hoverEffect className={cn('p-5 sm:p-6 bg-white border-slate-200', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs sm:text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {value}
            </span>
            {trend && (
              <span
                className={cn(
                  'text-xs font-bold px-1.5 py-0.5 rounded',
                  trend.isPositive
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-amber-50 text-amber-700'
                )}
              >
                {trend.value}
              </span>
            )}
          </div>
          {subtext && (
            <p className="text-xs text-slate-500 mt-1 leading-normal">{subtext}</p>
          )}
        </div>
        <div
          className={cn(
            'w-11 h-11 rounded-xl flex items-center justify-center border shrink-0',
            accentClasses[accentColor]
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}
