import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  MapPin,
  ArrowRight,
  Sparkles,
  Camera,
  Lightbulb,
  Droplets,
  Construction,
  Trash2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Container } from '../components/common/Container';
import { CivicIssuesSlider } from '../components/home/CivicIssuesSlider';
import { env } from '../config/env';

export function HomePage() {
  const { openLoginModal, isAuthenticated } = useAuth();


  const categories = [
    {
      title: 'Swachhata & Waste',
      desc: 'Garbage accumulation, uncollected bins, open dumping',
      icon: Trash2,
      color: 'bg-[#E8F7F2] dark:bg-emerald-950/60 text-[#22A982] dark:text-[#34D399] border-[#D1EFE5] dark:border-emerald-800/40',
    },
    {
      title: 'Roads & Potholes',
      desc: 'Dangerous craters, broken footpaths, road blockages',
      icon: Construction,
      color: 'bg-[#FEF9C3] dark:bg-yellow-950/60 text-[#854D0E] dark:text-[#FACC15] border-[#FDE047] dark:border-yellow-800/40',
    },
    {
      title: 'Street Lighting & Safety',
      desc: 'Non-functional streetlights, dark zones, wire hazards',
      icon: Lightbulb,
      color: 'bg-[#EBF1FA] dark:bg-blue-950/60 text-[#3157A4] dark:text-[#60A5FA] border-[#DCE6F0] dark:border-blue-800/40',
    },
    {
      title: 'Water & Drainage',
      desc: 'Pipeline leaks, overflowing sewers, contaminated water',
      icon: Droplets,
      color: 'bg-[#E8F7F2] dark:bg-emerald-950/60 text-[#22A982] dark:text-[#34D399] border-[#D1EFE5] dark:border-emerald-800/40',
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Spot & Capture',
      desc: 'Notice a broken streetlight, open pothole, or garbage heap? Snap a clear photo with your smartphone.',
      icon: Camera,
    },
    {
      step: '02',
      title: 'Geotag & Submit',
      desc: 'Provide the exact landmark or pin your location. Bharat Sudhar routes it to the local municipal ward authority.',
      icon: MapPin,
    },
    {
      step: '03',
      title: 'Track to Resolution',
      desc: 'Receive live updates as civic teams acknowledge, repair, and verify work completion with photo proof.',
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="flex flex-col space-y-16 pb-20 bg-[#F4F8FC] dark:bg-[#0B132B] transition-colors w-full max-w-full overflow-x-hidden">
      {/* Hero Section with India Gate Background & Clean Brand Layout */}
      <section className="relative overflow-hidden w-full max-w-full pt-8 pb-16 lg:pt-16 lg:pb-28 border-b border-[#DCE6F0] dark:border-[#1E293B]">
        {/* India Gate Background Image with 3D Tricolor Ribbon */}
        <div
          className="absolute inset-0 bg-cover bg-right lg:bg-center bg-no-repeat transition-transform duration-1000 scale-100 opacity-90 dark:opacity-40"
          style={{ backgroundImage: "url('/images/india-gate-hero-bg.jpg')" }}
        />
        {/* Soft atmospheric gradient wash on left for crystal-clear readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent lg:via-white/70 dark:from-[#0B132B] dark:via-[#0B132B]/90 dark:to-transparent pointer-events-none" />

        <Container className="relative z-10 pt-2 lg:pt-8">
          <div className="max-w-2xl lg:max-w-3xl space-y-5 sm:space-y-6 text-left">
            {/* Main Brand Title: Bharat Sudhar with leaf accent */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="relative inline-flex flex-wrap items-baseline gap-2 sm:gap-3">
                {/* Bharat in Navy Blue / White */}
                <span className="text-4xl sm:text-6xl xl:text-7xl font-black font-poppins text-[#0B2545] dark:text-white tracking-tight drop-shadow-xs transition-colors">
                  Bharat
                </span>

                {/* Sudhar with Tiranga Gradient & Sprout Leaves */}
                <span className="relative text-4xl sm:text-6xl xl:text-7xl font-black font-poppins bg-gradient-to-r from-[#FF671F] via-[#F35D07] to-[#046A38] bg-clip-text text-transparent tracking-tight">
                  Sudhar
                  {/* Sprout Green Leaves atop Sudhar */}
                  <span className="absolute -top-3 -right-5 sm:-top-5 sm:-right-8 select-none pointer-events-none">
                    <svg className="w-6 h-6 sm:w-10 sm:h-10 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5c0 3 3 5 5 5 1 0 2-.5 3-1.5C13 14 16 11 17 8z" fill="#2E7D32" />
                      <path d="M12 5c-3 1-5 4-6 6.5" stroke="#81C784" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                    </svg>
                  </span>
                </span>
              </h1>
            </div>

            {/* Slogan Pill Badge */}
            <div>
              <div className="inline-flex items-center px-4 sm:px-5 py-1.5 sm:py-2 rounded-2xl bg-[#EBF3FB] dark:bg-[#1E293B] border border-[#CFE1F5] dark:border-[#334155] shadow-xs">
                <span className="text-xs sm:text-base font-extrabold text-[#0B2545] dark:text-[#FACC15] tracking-tight font-poppins">
                  {env.appSlogan || 'Ab Har Nagrik Zimmedaar'}
                </span>
              </div>
            </div>

            {/* Descriptive Subtitle */}
            <p className="text-sm sm:text-lg lg:text-xl text-[#1C2A38] dark:text-[#CBD5E1] font-medium max-w-2xl leading-relaxed">
              A citizen-driven digital platform for reporting, prioritizing and tracking real-world civic issues.
            </p>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {isAuthenticated ? (
                <Link to="/dashboard" className="w-full sm:w-auto">
                  <Button
                    variant="saffron"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="w-full sm:w-auto font-black font-poppins text-sm sm:text-base shadow-md px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#FF671F] to-[#E65100] text-white hover:from-[#E65100] hover:to-[#D84315] hover:scale-102 transition-all justify-center"
                  >
                    Open Citizen Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="saffron"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={openLoginModal}
                  className="w-full sm:w-auto font-black font-poppins text-sm sm:text-base shadow-md px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#FF671F] to-[#E65100] text-white hover:from-[#E65100] hover:to-[#D84315] hover:scale-102 transition-all justify-center"
                >
                  Report Civic Issue Now
                </Button>
              )}
              <Link to="/about" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto font-bold font-poppins text-sm sm:text-base px-6 py-3 sm:py-3.5 rounded-xl bg-white/90 dark:bg-[#1E293B] border-[#D0E2F5] dark:border-[#334155] text-[#0B2545] dark:text-white hover:bg-white dark:hover:bg-[#334155] transition-all shadow-xs justify-center"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            {/* Civic Guarantee / Trust Badges */}
            <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#4A5568] dark:text-[#94A3B8] font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A982] dark:text-[#34D399] shrink-0" />
                Direct Municipal Integration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A982] dark:text-[#34D399] shrink-0" />
                Transparent Civic Tracking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A982] dark:text-[#34D399] shrink-0" />
                100% Free Public Initiative
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Sliding Real Civic Issues (Garbage, Waste, Pothole, Street Light, Dirty Public Toilet) */}
      <CivicIssuesSlider />


      {/* Core Civic Categories */}
      <section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3157A4] dark:text-[#60A5FA] bg-white dark:bg-[#1E293B] px-3.5 py-1 rounded-full border border-[#DCE6F0] dark:border-[#334155] shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-[#3157A4] dark:text-[#60A5FA]" />
              Civic Categories
            </div>
            <h2 className="text-3xl font-black font-poppins text-[#172B4D] dark:text-white tracking-tight">
              What Can You Help Improve Today?
            </h2>
            <p className="text-[#718096] dark:text-[#94A3B8] text-sm font-medium">
              Select an area needing attention in your locality. Every report contributes to national cleanliness and road safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.title} hoverEffect className="group cursor-pointer bg-white dark:bg-[#0F172A] border border-[#DCE6F0] dark:border-[#1E293B] rounded-2xl shadow-subtle hover:border-[#3157A4]/40 dark:hover:border-blue-500/40 transition-all">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${cat.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-base font-bold text-[#172B4D] dark:text-white">
                      {cat.title}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1 text-[#718096] dark:text-[#94A3B8] font-medium">
                      {cat.desc}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* 3-Step Citizen Workflow */}
      <section className="bg-white dark:bg-[#0F172A] py-16 border-y border-[#DCE6F0] dark:border-[#1E293B] transition-colors">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-black font-poppins text-[#172B4D] dark:text-white tracking-tight">
              How Bharat Sudhar Works
            </h2>
            <p className="text-[#718096] dark:text-[#94A3B8] text-sm font-medium">
              Three seamless steps to exercise your civic responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#F4F8FC] dark:bg-[#111C35] p-8 rounded-2xl border border-[#DCE6F0] dark:border-[#1E293B] shadow-subtle flex flex-col items-start relative hover:border-[#3157A4]/30 dark:hover:border-blue-500/40 transition-all"
                >
                  <span className="text-4xl font-black text-[#DCE6F0] dark:text-[#1E293B] absolute top-6 right-6 select-none font-mono">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#3157A4] text-white flex items-center justify-center mb-6 shadow-subtle">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold font-poppins text-[#172B4D] dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#718096] dark:text-[#94A3B8] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
