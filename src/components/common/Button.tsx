import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'saffron' | 'green' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isFullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed select-none active:scale-[0.98]';

    const variants = {
      primary:
        'bg-[#3157A4] text-white hover:bg-[#264585] focus-visible:ring-[#3157A4] shadow-subtle border border-transparent',
      saffron:
        'bg-[#FACC15] text-[#172B4D] hover:bg-[#EAB308] focus-visible:ring-[#FACC15] shadow-subtle border border-transparent font-bold',
      green:
        'bg-[#22A982] text-white hover:bg-[#1B8768] focus-visible:ring-[#22A982] shadow-subtle border border-transparent',
      secondary:
        'bg-[#EBF1FA] text-[#3157A4] hover:bg-[#DCE6F0] focus-visible:ring-[#3157A4] border border-[#DCE6F0]',
      outline:
        'border border-[#DCE6F0] bg-white text-[#172B4D] hover:bg-[#F4F8FC] hover:border-[#B8CDE6] focus-visible:ring-[#3157A4] shadow-subtle',
      ghost:
        'bg-transparent text-[#718096] hover:bg-[#F0F5FD] hover:text-[#172B4D] focus-visible:ring-[#3157A4] border border-transparent',
      destructive:
        'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 shadow-subtle border border-transparent',
      link:
        'bg-transparent text-[#3157A4] hover:text-[#264585] underline-offset-4 hover:underline p-0 h-auto font-medium border-0 focus-visible:ring-0',
    };

    // Mobile-first sizes respecting min 44px touch targets on mobile
    const sizes = {
      sm: 'text-xs px-3 py-2 min-h-[36px] gap-1.5',
      md: 'text-sm px-4 py-2.5 min-h-[44px] gap-2',
      lg: 'text-base px-6 py-3.5 min-h-[48px] gap-2.5',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          variant !== 'link' && sizes[size],
          isFullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>
        )}
        <span>{children}</span>
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
