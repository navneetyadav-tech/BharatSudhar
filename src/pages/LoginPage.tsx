import { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  CheckCircle2,
  Sparkles,
  MapPin,
  Building,
  User,
  Send,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Container } from '../components/common/Container';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { FormField } from '../components/forms/FormField';
import { Input } from '../components/common/Input';
import {
  MAHARASHTRA_STATE,
  MAHARASHTRA_DISTRICTS,
} from '../data/maharashtraData';

export function LoginPage() {
  const navigate = useNavigate();
  const { loginWithEmail, isAuthenticated } = useAuth();

  // If already authenticated, redirect directly to dashboard - no button needed
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Step state: 1 = Civic Profile & Location, 2 = Email & Verification
  const [step, setStep] = useState<1 | 2>(1);

  // Form states
  const [fullName, setFullName] = useState('');
  const [state] = useState(MAHARASHTRA_STATE);
  const [district, setDistrict] = useState(MAHARASHTRA_DISTRICTS[2].name); // Default: Pune
  const [city, setCity] = useState(MAHARASHTRA_DISTRICTS[2].cities[0]); // Default: Pune City
  const [email, setEmail] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Available cities for currently selected district
  const availableCities = useMemo(() => {
    const selectedDistObj = MAHARASHTRA_DISTRICTS.find(
      (d) => d.name.toLowerCase() === district.toLowerCase()
    );
    return selectedDistObj ? selectedDistObj.cities : [];
  }, [district]);

  // When district changes, default to first city of that district
  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
    const selectedDistObj = MAHARASHTRA_DISTRICTS.find(
      (d) => d.name.toLowerCase() === newDistrict.toLowerCase()
    );
    if (selectedDistObj && selectedDistObj.cities.length > 0) {
      setCity(selectedDistObj.cities[0]);
    } else {
      setCity('');
    }
  };

  // Step 1: Validate profile details and move to Step 2 (Email & Verification)
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!district || !city) {
      setError('Please select your Maharashtra district and city');
      return;
    }

    setError(null);
    setStep(2);
  };

  // Step 2: Send code to the entered email
  const handleSendEmailCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }

    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setCodeSent(true);
      setOtpCode('123456'); // Pre-fill demo verification code
    }, 450);
  };

  // Step 2: Verify code and land directly on dashboard
  const handleVerifyAndLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter your email address');
      return;
    }
    if (!otpCode.trim() || (otpCode.trim() !== '123456' && otpCode.length !== 6)) {
      setError('Invalid verification code. Enter demo code: 123456');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginWithEmail({
        name: fullName.trim() || 'Maharashtra Nagrik',
        email: email.trim(),
        state,
        district,
        city,
      });
      // Direct landing on dashboard - no intermediary button
      navigate('/dashboard', { replace: true });
    }, 400);
  };

  const handleFillDemoProfile = () => {
    setFullName('Anand Deshmukh');
    setDistrict('Pune');
    setCity('Pune City');
    setError(null);
  };

  const handleFillDemoEmail = () => {
    setEmail('anand.deshmukh@gmail.com');
    setError(null);
  };

  // If already authenticated, show nothing while redirecting
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 bg-[#F4F8FC]">
      <Container size="sm">
        <div className="space-y-6">
          {/* Back to Home Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#718096] hover:text-[#172B4D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Landing Page</span>
          </Link>

          {/* Main Two-Page Login Card */}
          <Card className="p-6 sm:p-8 border border-[#DCE6F0] bg-white shadow-card rounded-2xl relative overflow-hidden">
            {/* Top Subtle Civic Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#3157A4] via-[#FACC15] to-[#22A982]" />

            {/* Brand Crest & Step Progress Indicator */}
            <div className="text-center space-y-3 pb-6 border-b border-[#DCE6F0]">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#3157A4] text-white shadow-subtle mb-1">
                <ShieldCheck className="w-6 h-6 text-[#EAB308]" />
              </div>
              <h1 className="text-2xl font-extrabold text-[#172B4D] tracking-tight">
                {step === 1 ? 'Citizen Civic Profile' : 'Email & Verification'}
              </h1>
              <p className="text-xs text-[#718096] max-w-sm mx-auto">
                {step === 1
                  ? 'Step 1: Enter your personal name and Maharashtra location details.'
                  : 'Step 2: Enter your email and verify the security code to access your dashboard.'}
              </p>

              {/* Two-Page Progress Indicator */}
              <div className="flex items-center justify-center gap-2 pt-2">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      step === 1
                        ? 'bg-[#3157A4] text-white shadow-subtle'
                        : 'bg-[#22A982] text-white'
                    }`}
                  >
                    {step === 2 ? '✓' : '1'}
                  </span>
                  <span className={`text-xs font-bold ${step === 1 ? 'text-[#172B4D]' : 'text-[#718096]'}`}>
                    1. Profile & Location
                  </span>
                </div>

                <div className={`w-10 h-0.5 ${step === 2 ? 'bg-[#22A982]' : 'bg-[#DCE6F0]'}`} />

                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      step === 2
                        ? 'bg-[#FACC15] text-[#172B4D] shadow-subtle font-bold'
                        : 'bg-[#F4F8FC] text-[#718096] border border-[#DCE6F0]'
                    }`}
                  >
                    2
                  </span>
                  <span className={`text-xs font-bold ${step === 2 ? 'text-[#172B4D]' : 'text-[#718096]'}`}>
                    2. Email & Verification
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 space-y-5">
              {/* PAGE 1: Civic Profile & Maharashtra Location (No Email on this page) */}
              {step === 1 && (
                <form onSubmit={handleNextStep} className="space-y-4 animate-fade-in">
                  {/* Quick Fill Test Bar */}
                  <div className="p-3.5 rounded-xl bg-[#F4F8FC] border border-[#DCE6F0] text-xs text-[#172B4D] flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Sparkles className="w-4 h-4 text-[#EAB308] shrink-0" />
                      Maharashtra Nagrik Registration
                    </span>
                    <button
                      type="button"
                      onClick={handleFillDemoProfile}
                      className="text-[11px] font-bold text-[#3157A4] hover:underline bg-white px-3 py-1 rounded-lg border border-[#DCE6F0] shadow-subtle transition-colors"
                    >
                      Auto-fill Demo
                    </button>
                  </div>

                  {/* Full Name */}
                  <FormField label="Full Name" required error={error && !fullName.trim() ? error : undefined}>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-[#718096]">
                        <User className="w-4 h-4" />
                      </span>
                      <Input
                        placeholder="e.g. Anand Deshmukh"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          setError(null);
                        }}
                        className="pl-10 font-medium rounded-xl border-[#DCE6F0]"
                        required
                        autoFocus
                      />
                    </div>
                  </FormField>

                  {/* State (Fixed to Maharashtra) */}
                  <FormField label="State" required>
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-[#718096]">
                        <MapPin className="w-4 h-4" />
                      </span>
                      <select
                        value={state}
                        disabled
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE6F0] bg-[#F4F8FC] text-sm font-semibold text-[#172B4D] cursor-not-allowed"
                      >
                        <option value="Maharashtra">Maharashtra (Active State)</option>
                      </select>
                    </div>
                  </FormField>

                  {/* District & City Dropdowns Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Maharashtra District Dropdown */}
                    <FormField label="District (Maharashtra)" required>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-[#718096]">
                          <Building className="w-4 h-4" />
                        </span>
                        <select
                          value={district}
                          onChange={(e) => handleDistrictChange(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20 bg-white"
                          required
                        >
                          {MAHARASHTRA_DISTRICTS.map((d) => (
                            <option key={d.id} value={d.name}>
                              {d.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormField>

                    {/* City / Taluka Dropdown (Dependent on District) */}
                    <FormField label="City / Area" required>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-[#718096]">
                          <MapPin className="w-4 h-4" />
                        </span>
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20 bg-white"
                          required
                        >
                          {availableCities.map((cityName) => (
                            <option key={cityName} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </FormField>
                  </div>

                  <Button
                    type="submit"
                    variant="saffron"
                    isFullWidth
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                    className="font-bold shadow-subtle mt-2 text-sm rounded-xl"
                  >
                    Next: Email & Verification
                  </Button>
                </form>
              )}

              {/* PAGE 2: Email & Verification Code (Both on this same page) */}
              {step === 2 && (
                <form onSubmit={handleVerifyAndLogin} className="space-y-4 animate-fade-in">
                  {/* Citizen Profile Summary Banner */}
                  <div className="p-3.5 rounded-xl bg-[#F4F8FC] border border-[#DCE6F0] text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-[#172B4D]">{fullName}</p>
                      <p className="text-[#718096] text-[11px] mt-0.5">
                        {city}, {district}, Maharashtra
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError(null);
                      }}
                      className="text-[#3157A4] font-bold hover:underline text-xs"
                    >
                      Edit Profile
                    </button>
                  </div>

                  {/* Email Address Input on Page 2 */}
                  <FormField
                    label="Enter Email Address"
                    required
                    error={error && !email.trim() ? error : undefined}
                  >
                    <div className="space-y-2">
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-[#718096]">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          placeholder="e.g. anand.deshmukh@gmail.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setError(null);
                            setCodeSent(false);
                          }}
                          className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20"
                          required
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSendEmailCode()}
                          disabled={!email.trim() || !email.includes('@')}
                          className="absolute right-1.5 px-3 py-1.5 bg-[#3157A4] text-white rounded-lg text-xs font-bold hover:bg-[#254483] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-subtle"
                        >
                          <Send className="w-3 h-3" />
                          <span>{codeSent ? 'Resend' : 'Send Code'}</span>
                        </button>
                      </div>

                      {/* Quick demo email autofill option */}
                      {!email && (
                        <button
                          type="button"
                          onClick={handleFillDemoEmail}
                          className="text-[11px] text-[#3157A4] hover:underline font-medium flex items-center gap-1"
                        >
                          <Sparkles className="w-3 h-3 text-[#EAB308]" />
                          Use demo: anand.deshmukh@gmail.com
                        </button>
                      )}
                    </div>
                  </FormField>

                  {/* Confirmation that code was sent */}
                  {codeSent && (
                    <div className="p-3 rounded-xl bg-[#22A982]/10 border border-[#22A982]/20 text-xs text-[#22A982] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#22A982] shrink-0" />
                      <span>
                        Verification code sent to <strong className="text-[#172B4D]">{email}</strong>
                      </span>
                    </div>
                  )}

                  {/* 6-Digit Email Verification Code Input on the Same Page */}
                  <FormField
                    label="Enter 6-Digit Email Verification Code"
                    required
                    error={error && otpCode.length !== 6 ? error : undefined}
                    helperText="Demo code: 123456"
                  >
                    <div className="relative flex items-center">
                      <span className="absolute left-3.5 text-[#718096]">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="123456"
                        value={otpCode}
                        onChange={(e) => {
                          setOtpCode(e.target.value.replace(/\D/g, ''));
                          setError(null);
                        }}
                        className="w-full text-center tracking-widest text-xl font-mono font-bold py-2.5 rounded-xl border border-[#DCE6F0] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20"
                        required
                      />
                    </div>
                  </FormField>

                  {/* Verification & Direct Landing CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      onClick={() => setStep(1)}
                      leftIcon={<ArrowLeft className="w-4 h-4" />}
                      className="w-full sm:w-auto font-bold border-[#DCE6F0] text-xs rounded-xl"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="saffron"
                      size="md"
                      isFullWidth
                      isLoading={isLoading}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold shadow-subtle text-sm rounded-xl"
                    >
                      Verify & Enter Dashboard
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Bottom Reassurance */}
            <div className="mt-6 pt-4 border-t border-[#DCE6F0] text-center text-xs text-[#718096]">
              Government of Maharashtra & Citizen Civic-Tech Initiative • Privacy Protected
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
