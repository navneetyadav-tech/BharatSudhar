import React from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  description?: string;
  error?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      error = false,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || (typeof label === 'string' ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex items-start gap-3 select-none">
        <div className="flex items-center h-5 mt-0.5">
          <input
            id={inputId}
            type="checkbox"
            ref={ref}
            disabled={disabled}
            className={cn(
              'h-4 w-4 rounded border-slate-300 text-chakra-800 focus:ring-chakra-500 focus:ring-2 focus:ring-offset-1 transition-colors cursor-pointer',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-rose-500',
              className
            )}
            {...props}
          />
        </div>

        {(label || description) && (
          <div className="text-xs sm:text-sm leading-normal">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  'font-medium text-slate-800 cursor-pointer block',
                  disabled && 'opacity-60 cursor-not-allowed'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
