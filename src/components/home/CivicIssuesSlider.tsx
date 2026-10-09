import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Flame,
  LogIn,
} from 'lucide-react';

interface CivicIssueSlide {
  id: string;
  title: string;
  category: string;
  categoryBadge: string;
  image: string;
  location: string;
  reportedCount: string;
}

const CIVIC_SLIDES: CivicIssueSlide[] = [
  {
    id: 'garbage',
    title: 'Overflowing Garbage Dumps',
    category: 'Swachhata & Waste',
    categoryBadge: 'Garbage Dump',
    image: '/images/garbage-dump.jpg',
    location: 'Market Corners & Residential Spots',
    reportedCount: '2,890+ Reports Filed',
  },
  {
    id: 'waste',
    title: 'Accumulated Plastic Waste',
    category: 'Waste Management',
    categoryBadge: 'Plastic Waste',
    image: '/images/plastic-waste.jpg',
    location: 'Public Footpaths & Open Drains',
    reportedCount: '3,210+ Reports Filed',
  },
  {
    id: 'pothole',
    title: 'Dangerous Road Potholes',
    category: 'Roads & Infrastructure',
    categoryBadge: 'Deep Pothole',
    image: '/images/pothole-issue.jpg',
    location: 'Metro Corridors & Main Roads',
    reportedCount: '1,420+ Reports Filed',
  },
  {
    id: 'streetlight',
    title: 'Broken Street Lights',
    category: 'Lighting & Safety',
    categoryBadge: 'Street Light',
    image: '/images/broken-streetlight.jpg',
    location: 'Outer Highway Junctions & By-lanes',
    reportedCount: '1,150+ Reports Filed',
  },
  {
    id: 'toilet',
    title: 'Dirty Public Toilets',
    category: 'Sanitation & Hygiene',
    categoryBadge: 'Dirty Public Toilet',
    image: '/images/dirty-toilet.jpg',
    location: 'Bus Terminals & Commercial Markets',
    reportedCount: '870+ Reports Filed',
  },
];

export function CivicIssuesSlider() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-slide effect every 2.8 seconds, pauses on mouse hover / touch
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isPaused = false;
    const interval = setInterval(() => {
      if (!isPaused && container) {
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 30) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 2800);

    const onPause = () => { isPaused = true; };
    const onResume = () => { isPaused = false; };

    container.addEventListener('mouseenter', onPause);
    container.addEventListener('mouseleave', onResume);
    container.addEventListener('touchstart', onPause);
    container.addEventListener('touchend', onResume);

    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', onPause);
      container.removeEventListener('mouseleave', onResume);
      container.removeEventListener('touchstart', onPause);
      container.removeEventListener('touchend', onResume);
    };
  }, []);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Repeated slides for continuous carousel loop
  const displayedSlides = [...CIVIC_SLIDES, ...CIVIC_SLIDES, ...CIVIC_SLIDES];

  return (
    <section className="relative overflow-hidden w-full max-w-full py-8 sm:py-12 border-y border-[#DCE6F0] dark:border-[#1E293B] bg-gradient-to-b from-[#F4F8FC] via-white to-[#F4F8FC] dark:from-[#0B132B] dark:via-[#0F172A] dark:to-[#0B132B] transition-colors">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFF3EB] dark:bg-orange-950/60 text-[#FF671F] dark:text-orange-400 text-xs font-black border border-orange-200 dark:border-orange-800/60 shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-[#FF671F] text-[#FF671F]" />
            Nagrik Jagrukta • Citizen Grievance Action
          </div>

          {/* User Requested Question */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-poppins text-[#0B2545] dark:text-white tracking-tight leading-tight">
            See a Problem?{' '}
            <span className="bg-gradient-to-r from-[#FF671F] via-[#F35D07] to-[#046A38] bg-clip-text text-transparent">
              Report It Here!
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#718096] dark:text-[#94A3B8] font-medium pt-0.5">
            Garbage accumulation, plastic waste, broken potholes, dark street lights, and sanitation grievances.
          </p>
        </div>

        {/* Manual Arrow Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            type="button"
            onClick={() => handleManualScroll('left')}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] text-[#172B4D] dark:text-white hover:bg-[#F4F8FC] dark:hover:bg-[#334155] hover:border-[#FF671F] dark:hover:border-orange-400 flex items-center justify-center transition-all shadow-subtle active:scale-95 group"
            title="Scroll previous"
            aria-label="Scroll previous"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            type="button"
            onClick={() => handleManualScroll('right')}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#1E293B] border border-[#DCE6F0] dark:border-[#334155] text-[#172B4D] dark:text-white hover:bg-[#F4F8FC] dark:hover:bg-[#334155] hover:border-[#FF671F] dark:hover:border-orange-400 flex items-center justify-center transition-all shadow-subtle active:scale-95 group"
            title="Scroll next"
            aria-label="Scroll next"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Auto-sliding Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="w-full max-w-full flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6 py-2 select-none"
      >
        {displayedSlides.map((issue, index) => (
          <Link
            key={`${issue.id}-${index}`}
            to="/login"
            className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 rounded-2xl bg-white dark:bg-[#0F172A] border border-[#DCE6F0] dark:border-[#1E293B] hover:border-[#FF671F]/60 dark:hover:border-orange-500/60 shadow-card hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 group flex flex-col cursor-pointer no-underline"
            title={`Report ${issue.title}`}
          >
            {/* Image Box - Clicking takes to /login */}
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
              <img
                src={issue.image}
                alt={issue.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Hover Overlay: Prompts citizen to Log In & Report */}
              <div className="absolute inset-0 bg-[#0B2545]/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center z-20">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#FF671F] to-[#E65100] text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform mb-2">
                  <LogIn className="w-6 h-6" />
                </div>
                <span className="text-white font-black text-sm font-poppins drop-shadow-sm">
                  Report This Issue
                </span>
                <span className="text-xs text-orange-200 font-bold mt-0.5">
                  Click to Report →
                </span>
              </div>

              {/* Category Badge Overlay - No URGENT tag */}
              <div className="absolute top-3 left-3 z-10">
                <span className="px-2.5 py-1 rounded-full bg-white/95 dark:bg-slate-900/90 backdrop-blur-md text-[10px] sm:text-[11px] font-black text-[#0B2545] dark:text-white shadow-xs border border-white/20">
                  {issue.categoryBadge}
                </span>
              </div>

              {/* Bottom Locality Pill */}
              <div className="absolute bottom-2.5 left-3 right-3 z-10">
                <p className="text-[11px] text-slate-100 font-semibold truncate drop-shadow-xs">
                  📍 {issue.location}
                </p>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 bg-white dark:bg-[#0F172A]">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#3157A4] dark:text-[#60A5FA]">
                  {issue.category}
                </span>
                <h3 className="text-base sm:text-lg font-black font-poppins text-[#172B4D] dark:text-white leading-tight mt-0.5 group-hover:text-[#FF671F] dark:group-hover:text-orange-400 transition-colors">
                  {issue.title}
                </h3>
                <p className="text-[11px] text-[#718096] dark:text-[#94A3B8] font-medium mt-1">
                  {issue.reportedCount}
                </p>
              </div>

              {/* Call to action button */}
              <div className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FFF3EB] dark:bg-orange-950/40 group-hover:bg-gradient-to-r group-hover:from-[#FF671F] group-hover:to-[#E65100] text-[#FF671F] dark:text-orange-400 group-hover:text-white font-extrabold text-xs transition-all border border-[#FFD8BE] dark:border-orange-900/50 shadow-xs">
                <span>Report This Issue</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

