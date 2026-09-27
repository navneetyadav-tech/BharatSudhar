import React from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
  variant?: 'default' | 'subtle' | 'accent-saffron' | 'accent-chakra';
}

export function Card({
  className,
  hoverEffect = false,
  glass = false,
  variant = 'default',
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    default: 'bg-white border-[#DCE6F0] shadow-card',
    subtle: 'bg-[#F0F5FD] border-[#DCE6F0] shadow-none',
    'accent-saffron': 'bg-white border-[#DCE6F0] border-t-3 border-t-[#FACC15] shadow-card',
    'accent-chakra': 'bg-white border-[#DCE6F0] border-t-3 border-t-[#3157A4] shadow-card',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border text-[#172B4D] transition-all duration-200',
        variantStyles[variant],
        hoverEffect && 'hover:shadow-card-hover hover:-translate-y-0.5 hover:border-[#B8CDE6]',
        glass && 'glass-card',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-5 sm:p-6', className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn('text-base sm:text-lg font-bold leading-snug tracking-tight text-[#172B4D]', className)}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-xs sm:text-sm text-[#718096] leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('p-5 sm:p-6 pt-0', className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center p-5 sm:p-6 pt-0 border-t border-slate-100 mt-4', className)} {...props}>
      {children}
    </div>
  );
}
