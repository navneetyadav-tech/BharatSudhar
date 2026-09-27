import { Link } from 'react-router-dom';
import { PhoneCall, ShieldCheck, Heart, ExternalLink, Layers, AlertCircle } from 'lucide-react';
import { Container } from '../common/Container';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const helplines = [
    { name: 'Swachh Bharat Helpline', number: '1969', desc: 'Sanitation & Cleanliness' },
    { name: 'National Emergency', number: '112', desc: 'Police, Fire, Ambulance' },
    { name: 'Municipal Grievances', number: '1913', desc: 'Civic Infrastructure' },
    { name: 'Road Safety & Highway', number: '1073', desc: 'National Highway Assistance' },
  ];

  return (
    <footer className="bg-white text-[#172B4D] border-t border-[#DCE6F0] mt-auto">
      {/* Citizen Pledge Banner */}
      <div className="bg-[#F0F5FD] border-b border-[#DCE6F0] py-6">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-white border border-[#DCE6F0] text-[#3157A4] shadow-subtle shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[#172B4D] font-bold text-base sm:text-lg">
                  Citizen Pledge: &ldquo;Ab Har Nagrik Zimmedaar&rdquo;
                </h4>
                <p className="text-xs sm:text-sm text-[#718096]">
                  Together we protect public infrastructure, maintain clean streets, and uphold civic duties.
                </p>
              </div>
            </div>
            <Link
              to="/about#pledge"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#3157A4] bg-white hover:bg-[#EBF1FA] border border-[#DCE6F0] rounded-xl transition-colors shadow-subtle shrink-0"
            >
              Take the Digital Pledge
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Container>
      </div>

      <Container className="py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#3157A4] text-white shadow-subtle shrink-0">
                <svg className="w-4 h-4 text-white" viewBox="0 0 100 100" fill="none" stroke="currentColor">
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="5"/>
                  <circle cx="50" cy="50" r="10" fill="currentColor"/>
                  <g stroke="currentColor" strokeWidth="3">
                    <line x1="50" y1="8" x2="50" y2="92" />
                    <line x1="8" y1="50" x2="92" y2="50" />
                    <line x1="20" y1="20" x2="80" y2="80" />
                    <line x1="20" y1="80" x2="80" y2="20" />
                    <line x1="32" y1="12" x2="68" y2="88" />
                    <line x1="12" y1="32" x2="88" y2="68" />
                    <line x1="68" y1="12" x2="32" y2="88" />
                    <line x1="88" y1="32" x2="12" y2="68" />
                  </g>
                </svg>
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FACC15] ring-1 ring-white" />
                <span className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-[#22A982] ring-1 ring-white" />
              </div>
              <span className="text-xl font-bold text-[#172B4D] tracking-tight">
                Bharat<span className="text-[#3157A4]">Sudhar</span>
              </span>
            </div>
            <p className="text-xs text-[#3157A4] font-semibold tracking-wide uppercase">
              Ab Har Nagrik Zimmedaar
            </p>
            <p className="text-sm text-[#718096] leading-relaxed">
              An open civic-tech initiative empowering citizens across India to document, track, and collaborate with civic authorities for cleaner, safer, and better-maintained communities.
            </p>
            <div className="flex items-start gap-2 p-2.5 rounded-xl bg-[#F0F5FD] border border-[#DCE6F0] text-[11px] text-[#718096]">
              <AlertCircle className="w-4 h-4 text-[#EAB308] shrink-0 mt-0.5" />
              <span>
                <strong className="text-[#172B4D]">Civic-Tech Notice:</strong> Bharat Sudhar is an independent citizen platform and is not an official portal of any government ministry.
              </span>
            </div>
          </div>

          {/* Column 2: Navigation & System */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold uppercase tracking-wider text-[#172B4D]">
              Civic Portal
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-[#718096] hover:text-[#3157A4] transition-colors">
                  Citizen Portal Home
                </Link>
              </li>
              <li>
                <Link to="/issues" className="text-[#718096] hover:text-[#3157A4] transition-colors">
                  Explore Civic Grievances
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#718096] hover:text-[#3157A4] transition-colors">
                  Citizen Charter & Mission
                </Link>
              </li>
              <li>
                <Link to="/design-system" className="text-[#3157A4] hover:text-[#264585] transition-colors inline-flex items-center gap-1.5 font-medium">
                  <Layers className="w-3.5 h-3.5" />
                  Civic Design System
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Emergency & Civic Helplines */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-[#3157A4]" />
              <h5 className="text-sm font-bold uppercase tracking-wider text-[#172B4D]">
                Public Helplines
              </h5>
            </div>
            <div className="space-y-2.5">
              {helplines.map((item) => (
                <div key={item.number} className="text-xs p-2.5 rounded-xl bg-[#F4F8FC] border border-[#DCE6F0]">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-[#172B4D]">{item.name}</span>
                    <a href={`tel:${item.number}`} className="font-mono font-bold text-[#3157A4] hover:underline">
                      {item.number}
                    </a>
                  </div>
                  <span className="text-[#718096] text-[11px]">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Community Responsibility */}
          <div className="space-y-4">
            <h5 className="text-sm font-bold uppercase tracking-wider text-[#172B4D]">
              Citizen Accountability
            </h5>
            <p className="text-xs text-[#718096] leading-relaxed">
              Constructive participation ensures rapid municipal response. All submitted reports must include accurate locations and photographic proof.
            </p>
            <div className="p-3.5 rounded-xl bg-[#F0F5FD] border border-[#DCE6F0] space-y-1.5">
              <span className="text-xs font-semibold text-[#3157A4] block">
                Ethical Civic Tech
              </span>
              <p className="text-[11px] text-[#718096]">
                Data privacy, open standards, and citizen dignity are paramount. No personal biometric or sensitive data is ever stored.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#DCE6F0] mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#718096]">
          <p>© {currentYear} Bharat Sudhar. Non-commercial civic-tech initiative.</p>
          <div className="flex items-center gap-1 text-[#718096]">
            <span>Crafted with care</span>
            <Heart className="w-3.5 h-3.5 text-[#EAB308] fill-[#EAB308]" />
            <span>for active Indian citizens</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
