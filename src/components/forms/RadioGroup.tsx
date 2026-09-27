import React from 'react';
import { cn } from '../../utils/cn';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  layout?: 'stacked' | 'cards' | 'inline';
  error?: boolean;
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  layout = 'cards',
  error = false,
  className,
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn(
        layout === 'cards' && 'grid grid-cols-1 sm:grid-cols-2 gap-3',
        layout === 'stacked' && 'space-y-2',
        layout === 'inline' && 'flex flex-wrap gap-4',
        className
      )}
    >
      {options.map((opt) => {
        const isSelected = value === opt.value;
        const inputId = `${name}-${opt.value}`;

        if (layout === 'cards') {
          return (
            <label
              key={opt.value}
              htmlFor={inputId}
              className={cn(
                'relative flex items-start gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none',
                isSelected
                  ? 'border-chakra-800 bg-chakra-50/50 shadow-sm ring-1 ring-chakra-800'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50',
                opt.disabled && 'opacity-50 cursor-not-allowed',
                error && 'border-rose-300'
              )}
            >
              <input
                id={inputId}
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={opt.disabled}
                onChange={() => onChange(opt.value)}
                className="h-4 w-4 mt-0.5 border-slate-300 text-chakra-900 focus:ring-chakra-500 cursor-pointer"
              />
              <div className="space-y-0.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  {opt.icon && <span className="text-slate-500">{opt.icon}</span>}
                  <span className="font-semibold text-slate-900">{opt.label}</span>
                </div>
                {opt.description && (
                  <p className="text-xs text-slate-500 leading-normal">
                    {opt.description}
                  </p>
                )}
              </div>
            </label>
          );
        }

        return (
          <label
            key={opt.value}
            htmlFor={inputId}
            className={cn(
              'flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm select-none',
              opt.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              id={inputId}
              type="radio"
              name={name}
              value={opt.value}
              checked={isSelected}
              disabled={opt.disabled}
              onChange={() => onChange(opt.value)}
              className="h-4 w-4 border-slate-300 text-chakra-900 focus:ring-chakra-500 cursor-pointer"
            />
            <span className="font-medium text-slate-800">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
