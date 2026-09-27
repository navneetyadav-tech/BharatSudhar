import React from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps {
  id?: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export function FormField({
  id,
  label,
  required = false,
  helperText,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('w-full space-y-1.5', className)}>
      {label && (
        <label
          htmlFor={id}
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-800"
        >
          <span>{label}</span>
          {required && (
            <span className="text-rose-600 text-sm font-bold" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div>{children}</div>

      {error ? (
        <p id={id ? `${id}-error` : undefined} className="text-xs font-medium text-rose-600 animate-in fade-in duration-150">
          {error}
        </p>
      ) : helperText ? (
        <p id={id ? `${id}-helper` : undefined} className="text-xs text-slate-500">
          {helperText}
        </p>
      ) : null}
    </div>
  );
}
