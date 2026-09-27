import { cn } from '../../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export function Spinner({ size = 'md', className, label = 'Loading...' }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div className="inline-flex items-center gap-2.5 justify-center" role="status">
      <div
        className={cn(
          'rounded-full border-slate-200 border-t-chakra-800 border-r-saffron-500 animate-spin',
          sizes[size],
          className
        )}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
}
