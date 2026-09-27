import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('animate-shimmer rounded-lg bg-slate-200/80', className)}
      {...props}
    />
  );
}

export function SkeletonText({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn('space-y-2.5 w-full', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            'h-4',
            i === lines - 1 ? 'w-3/5' : i % 2 === 1 ? 'w-4/5' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export function SkeletonStatCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3', className)}>
      <div className="flex justify-between items-start">
        <div className="space-y-2 w-2/3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-36" />
        </div>
        <Skeleton className="w-11 h-11 rounded-xl" />
      </div>
      <Skeleton className="h-3 w-4/5" />
    </div>
  );
}

export function SkeletonIssueCard({ className }: { className?: string }) {
  return (
    <div className={cn('p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-4', className)}>
      <div className="flex justify-between items-center">
        <Skeleton className="h-5 w-24 rounded" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4" />
      <SkeletonText lines={2} />
      <div className="pt-2 flex justify-between items-center border-t border-slate-100">
        <Skeleton className="h-8 w-28 rounded-lg" />
        <Skeleton className="h-4 w-20" />
      </div>
    </div>
  );
}
