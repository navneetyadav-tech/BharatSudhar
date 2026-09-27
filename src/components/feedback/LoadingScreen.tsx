import { Loader2 } from 'lucide-react';

export function LoadingScreen({ message = 'Loading Bharat Sudhar...' }: { message?: string }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8">
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-14 h-14 rounded-full border-4 border-slate-100 border-t-chakra-700 border-r-saffron-500 animate-spin" />
        <Loader2 className="w-6 h-6 text-chakra-800 absolute animate-pulse" />
      </div>
      <p className="text-sm font-medium text-slate-600 animate-pulse">{message}</p>
    </div>
  );
}
