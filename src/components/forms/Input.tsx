import React from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClear?: () => void;
  showClear?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error = false,
      leftIcon,
      rightIcon,
      onClear,
      showClear = false,
      value,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
            {leftIcon}
          </span>
        )}

        <input
          type={type}
          ref={ref}
          disabled={disabled}
          value={value}
          className={cn(
            'w-full min-h-[44px] rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-colors duration-150',
            'focus:border-chakra-600 focus:outline-none focus:ring-2 focus:ring-chakra-500/20',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400 disabled:border-slate-200',
            leftIcon && 'pl-10',
            (rightIcon || (showClear && value)) && 'pr-10',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900',
            className
          )}
          {...props}
        />

        {showClear && value && !disabled && onClear && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 focus:outline-none"
            aria-label="Clear input value"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {rightIcon && !showClear && (
          <span className="absolute right-3.5 flex items-center pointer-events-none text-slate-400">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
