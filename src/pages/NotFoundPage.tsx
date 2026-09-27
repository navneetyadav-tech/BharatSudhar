import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Container } from '../components/common/Container';

export function NotFoundPage() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center py-16">
      <Container size="md">
        <div className="text-center space-y-6 bg-white p-10 rounded-3xl border border-slate-200 shadow-card">
          <div className="mx-auto w-20 h-20 rounded-2xl bg-saffron-50 border border-saffron-200 flex items-center justify-center text-saffron-600">
            <Compass className="w-10 h-10 animate-spin-slow" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-chakra-800 bg-chakra-50 px-3 py-1 rounded-full border border-chakra-200">
              Error 404 — Route Not Found
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lost Your Way in the City?
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
              The page or civic resource you requested could not be located. It may have been relocated or updated.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                leftIcon={<Home className="w-4 h-4" />}
                className="w-full"
              >
                Back to Citizen Portal
              </Button>
            </Link>
            <Button
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => window.history.back()}
              className="w-full sm:w-auto"
            >
              Previous Page
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100 text-xs text-slate-400">
            Bharat Sudhar • Ab Har Nagrik Zimmedaar
          </div>
        </div>
      </Container>
    </div>
  );
}
