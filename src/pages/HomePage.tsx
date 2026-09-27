import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CheckCircle2,
  Users,
  MapPin,
  ArrowRight,
  Sparkles,
  Camera,
  Activity,
  Lightbulb,
  Droplets,
  Construction,
  Trash2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription } from '../components/common/Card';
import { Container } from '../components/common/Container';
import { env } from '../config/env';

export function HomePage() {
  const { openLoginModal, isAuthenticated } = useAuth();
  const stats = [
    { label: 'Civic Grievances Resolved', value: '11,850+', icon: CheckCircle2, color: 'text-[#22A982]' },
    { label: 'Active Citizen Volunteers', value: '38,400+', icon: Users, color: 'text-[#3157A4]' },
    { label: 'Wards & Municipalities', value: '420+', icon: MapPin, color: 'text-[#CA8A04]' },
    { label: 'Average Resolution Time', value: '48 Hours', icon: Activity, color: 'text-[#3157A4]' },
  ];

  const categories = [
    {
      title: 'Swachhata & Waste',
      desc: 'Garbage accumulation, uncollected bins, open dumping',
      icon: Trash2,
      color: 'bg-[#E8F7F2] text-[#22A982] border-[#D1EFE5]',
    },
    {
      title: 'Roads & Potholes',
      desc: 'Dangerous craters, broken footpaths, road blockages',
      icon: Construction,
      color: 'bg-[#FEF9C3] text-[#854D0E] border-[#FDE047]',
    },
    {
      title: 'Street Lighting & Safety',
      desc: 'Non-functional streetlights, dark zones, wire hazards',
      icon: Lightbulb,
      color: 'bg-[#EBF1FA] text-[#3157A4] border-[#DCE6F0]',
    },
    {
      title: 'Water & Drainage',
      desc: 'Pipeline leaks, overflowing sewers, contaminated water',
      icon: Droplets,
      color: 'bg-[#E8F7F2] text-[#22A982] border-[#D1EFE5]',
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
    <div className="flex flex-col space-y-16 pb-20 bg-[#F4F8FC]">
      {/* Hero Section with Clean Civic Accents */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-[#EBF2FA]/80 via-[#F4F8FC] to-[#F4F8FC] border-b border-[#DCE6F0]">
        {/* Subtle decorative glow accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#3157A4]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-32 w-96 h-96 bg-[#22A982]/5 rounded-full blur-3xl pointer-events-none" />

        <Container>
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#DCE6F0] shadow-subtle animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#3157A4] animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-[#3157A4] tracking-wide uppercase">
                {env.appSlogan}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#172B4D] tracking-tight leading-[1.15]">
              Empowering Every Citizen To Build A Better Tomorrow With{' '}
              <span className="relative inline-block text-[#3157A4]">
                Bharat Sudhar
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#718096] max-w-2xl mx-auto leading-relaxed">
              Transforming complaints into collaborative civic action. Report local infrastructure issues, monitor ward resolution in real time, and take pride in your community.
            </p>

            {/* Centered Hero CTA */}
            <div className="pt-4 flex items-center justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button
                    variant="saffron"
                    size="lg"
                    rightIcon={<ArrowRight className="w-5 h-5" />}
                    className="text-base font-bold shadow-subtle px-8 py-3.5 rounded-xl"
                  >
                    Go to Citizen Dashboard
                  </Button>
                </Link>
              ) : (
                <Button
                  variant="saffron"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={openLoginModal}
                  className="text-base font-bold shadow-subtle px-8 py-3.5 rounded-xl"
                >
                  Citizen Portal Login
                </Button>
              )}
            </div>

            {/* Civic Guarantee / Trust Badges */}
            <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#718096] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A982]" />
                Direct Municipal Integration
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A982]" />
                Transparent Civic Tracking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#22A982]" />
                100% Free Public Initiative
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Impact Statistics */}
      <section className="-mt-12">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.label} hoverEffect className="p-6 bg-white border border-[#DCE6F0] rounded-2xl shadow-subtle">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#172B4D] tracking-tight">
                      {item.value}
                    </span>
                    <Icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[#718096]">
                    {item.label}
                  </p>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Core Civic Categories */}
      <section>
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3157A4] bg-white px-3.5 py-1 rounded-full border border-[#DCE6F0] shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-[#3157A4]" />
              Civic Categories
            </div>
            <h2 className="text-3xl font-bold text-[#172B4D] tracking-tight">
              What Can You Help Improve Today?
            </h2>
            <p className="text-[#718096] text-sm">
              Select an area needing attention in your locality. Every report contributes to national cleanliness and road safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Card key={cat.title} hoverEffect className="group cursor-pointer bg-white border border-[#DCE6F0] rounded-2xl shadow-subtle hover:border-[#3157A4]/40 transition-all">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${cat.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-base font-bold text-[#172B4D]">
                      {cat.title}
                    </CardTitle>
                    <CardDescription className="text-xs mt-1 text-[#718096]">
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
      <section className="bg-white py-16 border-y border-[#DCE6F0]">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-3xl font-bold text-[#172B4D] tracking-tight">
              How Bharat Sudhar Works
            </h2>
            <p className="text-[#718096] text-sm">
              Three seamless steps to exercise your civic responsibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="bg-[#F4F8FC] p-8 rounded-2xl border border-[#DCE6F0] shadow-subtle flex flex-col items-start relative hover:border-[#3157A4]/30 transition-all"
                >
                  <span className="text-4xl font-black text-[#DCE6F0] absolute top-6 right-6 select-none font-mono">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-xl bg-[#3157A4] text-white flex items-center justify-center mb-6 shadow-subtle">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#172B4D] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#718096] leading-relaxed">
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
