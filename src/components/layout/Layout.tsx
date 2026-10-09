import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0B132B] text-slate-900 dark:text-[#E2E8F0] font-sans selection:bg-saffron-500 selection:text-white transition-colors">
      {/* Top sticky navigation bar */}
      <Navbar />

      {/* Dynamic Route Content */}
      <main className="flex-1 flex flex-col w-full">
        <Outlet />
      </main>

      {/* Global Civic Footer */}
      <Footer />
    </div>
  );
}
