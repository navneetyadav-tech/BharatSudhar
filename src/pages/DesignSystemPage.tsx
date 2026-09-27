import { useState } from 'react';
import {
  Layers,
  Sparkles,
  CheckCircle2,
  Phone,
  Search,
  MapPin,
  Camera,
  Activity,
  ThumbsUp,
  RefreshCw,
  Building,
} from 'lucide-react';
import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { IssueCard } from '../components/common/IssueCard';
import { Badge } from '../components/common/Badge';
import { Alert } from '../components/common/Alert';
import {
  FormField,
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  FileUpload,
} from '../components/forms';
import {
  Skeleton,
  SkeletonText,
  SkeletonStatCard,
  SkeletonIssueCard,
  Spinner,
  EmptyState,
} from '../components/feedback';
import type { CivicIssue } from '../types';

export function DesignSystemPage() {
  const [activeTab, setActiveTab] = useState<
    'all' | 'buttons' | 'forms' | 'cards' | 'badges-alerts' | 'states' | 'typography'
  >('all');

  // Interactive Button test states
  const [buttonLoading, setButtonLoading] = useState(false);
  const [fullWidthToggle, setFullWidthToggle] = useState(false);

  // Interactive Form test states
  const [testInput, setTestInput] = useState('Sector 15, Near Community Center');
  const [testTextarea, setTestTextarea] = useState('Severe water leakage observed on main pipeline.');
  const [testSelect, setTestSelect] = useState('roads');
  const [testCheck1, setTestCheck1] = useState(true);
  const [testCheck2, setTestCheck2] = useState(false);
  const [testRadio, setTestRadio] = useState('urgent');

  // Interactive Issue Card Mock
  const sampleIssue: CivicIssue = {
    id: 'BS-2026-104',
    title: 'Broken Streetlight & Dark Corridor',
    description: 'Pedestrian stretch outside government school has had non-functional lights for 2 weeks.',
    category: 'street-lighting',
    status: 'in-progress',
    priority: 'urgent',
    location: {
      address: 'Ward 14, Ring Road Junction',
      city: 'Bhopal',
      pincode: '462001',
    },
    reportedAt: '1 hour ago',
    updatedAt: 'Just now',
    upvotes: 68,
    reportedBy: 'Meera Chawla',
  };

  const navTabs = [
    { id: 'all', label: 'Overview' },
    { id: 'typography', label: 'Typography & Spacing' },
    { id: 'buttons', label: 'Buttons' },
    { id: 'forms', label: 'Form Controls' },
    { id: 'cards', label: 'Cards & Metrics' },
    { id: 'badges-alerts', label: 'Badges & Alerts' },
    { id: 'states', label: 'Loading & Empty States' },
  ] as const;

  return (
    <div className="py-10 space-y-12 pb-24">
      {/* Design System Header */}
      <section className="border-b border-slate-200/90 pb-8 bg-gradient-to-b from-chakra-50/40 via-white to-transparent">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-chakra-900 text-white shadow-sm">
                <Layers className="w-3.5 h-3.5" />
                Bharat Sudhar Design System
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-saffron-100 text-saffron-900 border border-saffron-200">
                Civic-Tech • v1.0
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                Mobile-First
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Indian Civic-Tech Design System
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Engineered with the authority, trust, and clarity of premier Indian public digital infrastructure (India Stack, DigiLocker, CoWIN), structured for maximum civic engagement and 100% mobile accessibility.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-saffron-600 shrink-0 mt-0.5" />
              <span>
                <strong>Design Philosophy:</strong> Clean • Trustworthy • Modern • Government-Service Inspired • Minimal • Mobile-First. Transparently independent without pretending to be an official government portal.
              </span>
            </div>
          </div>

          {/* Navigation Filter Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-chakra-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* 1. TYPOGRAPHY & COLOR TOKENS */}
      {(activeTab === 'all' || activeTab === 'typography') && (
        <section id="typography">
          <Container>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>1. Typography & Civic Color Tokens</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Clean hierarchy using Plus Jakarta Sans for titles and Inter for high-density mobile readability.
                </p>
              </div>

              {/* Color Swatches */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-chakra-900 text-white shadow-sm space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-chakra-200">Primary (Navy)</p>
                  <p className="text-base font-extrabold">#0F2B5C</p>
                  <p className="text-[11px] text-chakra-300">Ashoka Navy • Authority & Trust</p>
                </div>
                <div className="p-4 rounded-xl bg-saffron-600 text-white shadow-sm space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-saffron-100">Saffron Accent</p>
                  <p className="text-base font-extrabold">#EA580C</p>
                  <p className="text-[11px] text-saffron-200">Tiranga Saffron • Citizen Action</p>
                </div>
                <div className="p-4 rounded-xl bg-tirangaGreen-600 text-white shadow-sm space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-100">Civic Green</p>
                  <p className="text-base font-extrabold">#16A34A</p>
                  <p className="text-[11px] text-emerald-100">Resolution • Verification</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-100 text-slate-900 border border-slate-300 space-y-1">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Surface Slate</p>
                  <p className="text-base font-extrabold">#F8FAFC</p>
                  <p className="text-[11px] text-slate-500">Neutral • High Readability</p>
                </div>
              </div>

              {/* Typography Scale Demonstration */}
              <Card className="p-6 space-y-4 bg-white border-slate-200">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400">Display / Hero Headline</span>
                  <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Ab Har Nagrik Zimmedaar
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400">Heading 1 (H1)</span>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Municipal Ward Grievance Redressal
                  </h1>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400">Heading 2 (H2)</span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Community Infrastructure & Safety Audits
                  </h2>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400">Body Large (Leading Relaxed)</span>
                  <p className="text-base text-slate-600 leading-relaxed">
                    Bharat Sudhar bridges Indian citizens directly with local municipal bodies to ensure rapid verification, repair, and photographic audit of public issues.
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono text-slate-400">Monospace Tracking Code & Microcopy</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-chakra-900 bg-chakra-50 px-2 py-0.5 rounded border border-chakra-200">
                      REF-ID: BS-2026-8921
                    </span>
                    <span className="text-xs text-slate-400">
                      PINCODE: 110001 (Ward 42-A)
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </Container>
        </section>
      )}

      {/* 2. BUTTONS */}
      {(activeTab === 'all' || activeTab === 'buttons') && (
        <section id="buttons">
          <Container>
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">2. Buttons & Actions</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Minimum 44px touch targets on mobile viewports. Supports 8 variants, icons, and loading states.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    leftIcon={<RefreshCw className={`w-3.5 h-3.5 ${buttonLoading ? 'animate-spin' : ''}`} />}
                    onClick={() => setButtonLoading(!buttonLoading)}
                  >
                    Toggle Loading
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setFullWidthToggle(!fullWidthToggle)}
                  >
                    {fullWidthToggle ? 'Standard Width' : 'Test Full Width'}
                  </Button>
                </div>
              </div>

              {/* Button Variants Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Primary (Ashoka Navy)</span>
                  <Button
                    variant="primary"
                    isLoading={buttonLoading}
                    isFullWidth={fullWidthToggle}
                    leftIcon={<Building className="w-4 h-4" />}
                  >
                    Acknowledge Report
                  </Button>
                </Card>

                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Saffron CTA (Submission)</span>
                  <Button
                    variant="saffron"
                    isLoading={buttonLoading}
                    isFullWidth={fullWidthToggle}
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    Submit Issue Now
                  </Button>
                </Card>

                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Tiranga Green (Resolution)</span>
                  <Button
                    variant="green"
                    isLoading={buttonLoading}
                    isFullWidth={fullWidthToggle}
                    leftIcon={<CheckCircle2 className="w-4 h-4" />}
                  >
                    Mark as Resolved
                  </Button>
                </Card>

                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Outline</span>
                  <Button
                    variant="outline"
                    isLoading={buttonLoading}
                    isFullWidth={fullWidthToggle}
                    leftIcon={<ThumbsUp className="w-4 h-4" />}
                  >
                    Citizen Upvote
                  </Button>
                </Card>

                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Secondary Slate</span>
                  <Button
                    variant="secondary"
                    isLoading={buttonLoading}
                    isFullWidth={fullWidthToggle}
                  >
                    Cancel Action
                  </Button>
                </Card>

                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Destructive (Danger)</span>
                  <Button
                    variant="destructive"
                    isLoading={buttonLoading}
                    isFullWidth={fullWidthToggle}
                  >
                    Withdraw Report
                  </Button>
                </Card>

                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Ghost Toolbar</span>
                  <Button
                    variant="ghost"
                    isLoading={buttonLoading}
                    isFullWidth={fullWidthToggle}
                  >
                    Secondary Action
                  </Button>
                </Card>

                <Card className="p-4 space-y-3">
                  <span className="text-xs font-semibold text-slate-500">Link Variant</span>
                  <div className="pt-2">
                    <Button variant="link">
                      View Municipal Charter →
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Sizes Row */}
              <Card className="p-5 space-y-3">
                <span className="text-xs font-semibold text-slate-500">Sizes Comparison</span>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="primary">Small (sm: 36px)</Button>
                  <Button size="md" variant="saffron">Medium (md: 44px Touch Target)</Button>
                  <Button size="lg" variant="primary">Large (lg: 48px Touch Target)</Button>
                </div>
              </Card>
            </div>
          </Container>
        </section>
      )}

      {/* 3. FORM CONTROLS */}
      {(activeTab === 'all' || activeTab === 'forms') && (
        <section id="forms">
          <Container>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-slate-900">3. Form Control System</h2>
                <p className="text-xs text-slate-500 mt-1">
                  High-contrast, mobile-friendly forms with validation styling, icons, and camera capture dropzones.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Text Inputs & Select */}
                <Card className="p-6 space-y-5">
                  <FormField
                    label="Landmark / Street Address"
                    required
                    helperText="Mention nearby shops, metro gates, or pole numbers."
                  >
                    <Input
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
                      showClear
                      onClear={() => setTestInput('')}
                    />
                  </FormField>

                  <FormField
                    label="Search Ward or Pincode"
                    helperText="Real-time filter for municipal ward ledger."
                  >
                    <Input
                      placeholder="e.g. 110001 or Connaught Place..."
                      leftIcon={<Search className="w-4 h-4 text-slate-400" />}
                    />
                  </FormField>

                  <FormField label="Civic Issue Category" required>
                    <Select
                      value={testSelect}
                      onChange={(e) => setTestSelect(e.target.value)}
                      options={[
                        { value: 'cleanliness', label: 'Swachhata & Waste Management' },
                        { value: 'roads', label: 'Road Infrastructure & Potholes' },
                        { value: 'water', label: 'Water Leakage & Sewage' },
                        { value: 'lighting', label: 'Streetlighting & Electrical Safety' },
                      ]}
                    />
                  </FormField>

                  <FormField
                    label="Description of Concern"
                    required
                    helperText="Provide observations to assist the field engineer."
                  >
                    <Textarea
                      rows={3}
                      maxLength={250}
                      currentLength={testTextarea.length}
                      value={testTextarea}
                      onChange={(e) => setTestTextarea(e.target.value)}
                    />
                  </FormField>

                  <FormField
                    label="Input Error Example"
                    error="Please provide a valid 10-digit Indian mobile number for OTP."
                  >
                    <Input
                      error
                      defaultValue="98100"
                      leftIcon={<Phone className="w-4 h-4 text-rose-500" />}
                    />
                  </FormField>
                </Card>

                {/* File Upload, Checkbox, & Radio Group */}
                <Card className="p-6 space-y-6">
                  <FormField label="Evidence Capture">
                    <FileUpload />
                  </FormField>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <span className="block text-xs font-semibold text-slate-800">
                      Priority Assessment (Radio Cards)
                    </span>
                    <RadioGroup
                      name="priority"
                      value={testRadio}
                      onChange={setTestRadio}
                      options={[
                        {
                          value: 'urgent',
                          label: 'Urgent Hazard',
                          description: 'Risk to human life, road blockage, or live wire.',
                        },
                        {
                          value: 'standard',
                          label: 'Standard Issue',
                          description: 'Normal municipal maintenance required within SLA.',
                        },
                      ]}
                    />
                  </div>

                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <span className="block text-xs font-semibold text-slate-800">
                      Civic Consent Checkboxes
                    </span>
                    <Checkbox
                      id="check-1"
                      label="Public Visibility Consent"
                      description="I allow this issue description and location to be listed on the public civic ledger."
                      checked={testCheck1}
                      onChange={(e) => setTestCheck1(e.target.checked)}
                    />
                    <Checkbox
                      id="check-2"
                      label="Notify Me via SMS/WhatsApp"
                      description="Receive automatic updates when the ward engineer marks this issue as in-progress or resolved."
                      checked={testCheck2}
                      onChange={(e) => setTestCheck2(e.target.checked)}
                    />
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 4. CARDS & METRICS */}
      {(activeTab === 'all' || activeTab === 'cards') && (
        <section id="cards">
          <Container>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-slate-900">4. Cards & KPI Metrics</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Compound card architecture, government-service stat indicators, and live grievance cards.
                </p>
              </div>

              {/* StatCards KPI Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                  title="Issues Resolved"
                  value="11,850+"
                  subtext="Verified by citizens with photo proof"
                  accentColor="green"
                  trend={{ value: '+14% this month', isPositive: true }}
                  icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                />
                <StatCard
                  title="Active Citizens"
                  value="38,420"
                  subtext="Exercising civic ownership"
                  accentColor="chakra"
                  trend={{ value: '+2,100 new', isPositive: true }}
                  icon={<Building className="w-5 h-5 text-chakra-700" />}
                />
                <StatCard
                  title="Avg Resolution"
                  value="48 Hours"
                  subtext="Ward engineer turnaround SLA"
                  accentColor="saffron"
                  trend={{ value: 'Within Target', isPositive: true }}
                  icon={<Activity className="w-5 h-5 text-saffron-600" />}
                />
                <StatCard
                  title="Municipal Wards"
                  value="420 Wards"
                  subtext="Across 18 smart city clusters"
                  accentColor="amber"
                  icon={<MapPin className="w-5 h-5 text-amber-600" />}
                />
              </div>

              {/* IssueCard Demonstration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <span className="block text-xs font-semibold text-slate-500 mb-2">
                    Civic Grievance Item Card (Standard Pattern)
                  </span>
                  <IssueCard issue={sampleIssue} onUpvote={() => {}} />
                </div>

                {/* Card Variants */}
                <div className="space-y-4">
                  <span className="block text-xs font-semibold text-slate-500 mb-2">
                    Card Accent Borders & Headers
                  </span>
                  <Card variant="accent-saffron">
                    <CardHeader>
                      <CardTitle>Saffron Accent Header</CardTitle>
                      <CardDescription>
                        Used for high-priority citizen calls to action or urgent warnings.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-slate-600">
                        Content area styled with high contrast slate typography and clear layout spacing.
                      </p>
                    </CardContent>
                  </Card>

                  <Card variant="accent-chakra">
                    <CardHeader>
                      <CardTitle>Ashoka Navy Accent Header</CardTitle>
                      <CardDescription>
                        Used for official audit summaries and municipal guidelines.
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between items-center text-xs">
                      <span className="text-slate-500">Citizen Charter Compliance</span>
                      <Button size="sm" variant="outline">Learn More</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 5. BADGES & ALERTS */}
      {(activeTab === 'all' || activeTab === 'badges-alerts') && (
        <section id="badges-alerts">
          <Container>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-slate-900">5. Badges, Roles & Alert Banners</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Status pills with pulsating live indicators, civic roles, and accessible alert boxes.
                </p>
              </div>

              {/* Badges Demonstration */}
              <Card className="p-6 space-y-5 bg-white">
                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Grievance Status Pills (with Live Pulse)
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge status="submitted" withDot />
                    <Badge status="under-review" withDot />
                    <Badge status="in-progress" withDot />
                    <Badge status="resolved" withDot />
                    <Badge status="rejected" withDot />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Priority Badges
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge priority="urgent" />
                    <Badge priority="high" />
                    <Badge priority="medium" />
                    <Badge priority="low" />
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Citizen Level & Role Badges
                  </span>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge role="verified-citizen" />
                    <Badge role="ward-champion" />
                    <Badge role="civic-volunteer" />
                  </div>
                </div>
              </Card>

              {/* Alerts Demonstration */}
              <div className="space-y-3">
                <Alert
                  variant="info"
                  title="Public Notice: Monsoon Road Drainage Drive"
                  description="Municipal teams are actively clearing stormwater drains across Sector 4 to 12. Please report clogged drains before Friday."
                  isDismissible
                  action={
                    <Button size="sm" variant="outline" className="text-xs bg-white">
                      View Schedule
                    </Button>
                  }
                />

                <Alert
                  variant="success"
                  title="Complaint Resolved by Municipal Corporation"
                  description="Issue #BS-2026-084 has been marked resolved. A verification team has inspected the newly installed LED streetlights."
                  isDismissible
                />

                <Alert
                  variant="warning"
                  title="High Waterlogging Warning Issued"
                  description="Underpass near Outer Ring Road experiencing localized flooding. Traffic diverted to Service Lane B."
                  isDismissible
                />

                <Alert
                  variant="error"
                  title="Critical Safety Alert: Exposed Power Cable"
                  description="An open transformer cable was detected at Subhash Nagar. Emergency electricity discom team has been dispatched."
                  isDismissible
                />
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* 6. LOADING & EMPTY STATES */}
      {(activeTab === 'all' || activeTab === 'states') && (
        <section id="states">
          <Container>
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-xl font-bold text-slate-900">6. Loading & Empty States</h2>
                <p className="text-xs text-slate-500 mt-1">
                  Smooth shimmer animations, dual-tone civic spinners, and purpose-built empty illustrations.
                </p>
              </div>

              {/* Skeletons & Spinners */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="p-6 space-y-4">
                  <span className="text-xs font-semibold text-slate-500 block">
                    Dual-Tone Civic Spinners
                  </span>
                  <div className="flex items-center gap-6 py-4 justify-center">
                    <Spinner size="sm" />
                    <Spinner size="md" />
                    <Spinner size="lg" />
                    <Spinner size="xl" />
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-semibold text-slate-500 block mb-2">
                      Base Skeleton Primitives
                    </span>
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full shrink-0" />
                      <div className="space-y-1.5 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-xs font-semibold text-slate-500 block mb-2">
                      Text Skeletons (Shimmer)
                    </span>
                    <SkeletonText lines={3} />
                  </div>
                </Card>

                <div className="space-y-4">
                  <span className="text-xs font-semibold text-slate-500 block">
                    Skeleton Stat Card
                  </span>
                  <SkeletonStatCard />
                </div>

                <div className="space-y-4">
                  <span className="text-xs font-semibold text-slate-500 block">
                    Skeleton Grievance Card
                  </span>
                  <SkeletonIssueCard />
                </div>
              </div>

              {/* Empty States */}
              <div className="space-y-4 pt-4">
                <span className="text-xs font-semibold text-slate-500 block">
                  Civic Empty State Presets
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <EmptyState
                    type="no-issues"
                    primaryAction={{
                      label: 'Report an Issue',
                      onClick: () => {},
                      icon: <Camera className="w-4 h-4" />,
                    }}
                    secondaryAction={{
                      label: 'Switch Ward',
                      onClick: () => {},
                    }}
                  />

                  <EmptyState
                    type="all-resolved"
                    primaryAction={{
                      label: 'Congratulate Ward Team',
                      onClick: () => {},
                      icon: <ThumbsUp className="w-4 h-4" />,
                    }}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
