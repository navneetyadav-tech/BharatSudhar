import React, { useState } from 'react';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  description?: string;
  isDismissible?: boolean;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

export function Alert({
  className,
  variant = 'info',
  title,
  description,
  isDismissible = false,
  onDismiss,
  action,
  children,
  ...props
}: AlertProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  const variants = {
    info: {
      container: 'bg-blue-50/90 border-blue-200 text-blue-900',
      icon: <Info className="w-5 h-5 text-chakra-700 shrink-0 mt-0.5" />,
      titleColor: 'text-chakra-950 font-bold',
      bodyColor: 'text-chakra-800',
    },
    success: {
      container: 'bg-emerald-50/90 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />,
      titleColor: 'text-emerald-950 font-bold',
      bodyColor: 'text-emerald-800',
    },
    warning: {
      container: 'bg-amber-50/90 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />,
      titleColor: 'text-amber-950 font-bold',
      bodyColor: 'text-amber-800',
    },
    error: {
      container: 'bg-rose-50/90 border-rose-200 text-rose-900',
      icon: <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />,
      titleColor: 'text-rose-950 font-bold',
      bodyColor: 'text-rose-800',
    },
  };

  const current = variants[variant];

  return (
    <div
      role="alert"
      className={cn(
        'relative flex items-start gap-3.5 p-4 rounded-xl border shadow-sm transition-all duration-150',
        current.container,
        className
      )}
      {...props}
    >
      {current.icon}

      <div className="flex-1 text-sm space-y-1">
        {title && <h5 className={cn('text-sm leading-tight', current.titleColor)}>{title}</h5>}
        {description && <p className={cn('text-xs sm:text-sm leading-relaxed', current.bodyColor)}>{description}</p>}
        {children}
        {action && <div className="pt-2">{action}</div>}
      </div>

      {isDismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-slate-400"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
