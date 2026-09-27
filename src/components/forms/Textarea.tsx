import React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  maxLength?: number;
  currentLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      error = false,
      maxLength,
      currentLength,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative w-full">
        <textarea
          ref={ref}
          disabled={disabled}
          maxLength={maxLength}
          className={cn(
            'w-full min-h-[100px] rounded-lg border border-slate-300 bg-white p-3.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-150',
            'focus:border-chakra-600 focus:outline-none focus:ring-2 focus:ring-chakra-500/20',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />

        {maxLength !== undefined && (
          <div className="text-[11px] text-right text-slate-400 mt-1 font-mono">
            {currentLength ?? 0} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
