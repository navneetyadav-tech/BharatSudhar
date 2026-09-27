import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-saffron-500 selection:text-white">
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
