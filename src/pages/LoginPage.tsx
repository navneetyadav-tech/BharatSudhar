import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  CheckCircle2,
  Sparkles,
  Building,
  User,
  Send,
  LogIn,
  UserPlus,
  Zap,
  KeyRound,
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
  const [searchParams] = useSearchParams();
  const {
    loginWithEmail,
    signUp,
    loginAsDemo,
    loginAsAuthority,
    loginAsAuthorityDemo,
    isAuthenticated,
    isAuthority,
  } = useAuth();

  // If already authenticated, redirect to appropriate console
  useEffect(() => {
    if (isAuthenticated) {
      if (isAuthority) {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [isAuthenticated, isAuthority, navigate]);

  // Upper Sliding Selector: 'citizen' | 'authority'
  const initialType = searchParams.get('type') === 'authority' ? 'authority' : 'citizen';
  const [activeType, setActiveType] = useState<'citizen' | 'authority'>(initialType);

  // Citizen Mode switcher: 'login' | 'signup'
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [citizenTab, setCitizenTab] = useState<'login' | 'signup'>(initialMode);

  // Sign up step state: 1 = Civic Profile & Location, 2 = Email & Verification
  const [signupStep, setSignupStep] = useState<1 | 2>(1);

  // Sign up states
  const [fullName, setFullName] = useState('');
  const [state] = useState(MAHARASHTRA_STATE);
  const [district, setDistrict] = useState(MAHARASHTRA_DISTRICTS[2].name); // Default: Pune
  const [city, setCity] = useState(MAHARASHTRA_DISTRICTS[2].cities[0]); // Default: Pune City
  const [signupEmail, setSignupEmail] = useState('');
  const [signupCodeSent, setSignupCodeSent] = useState(false);
  const [signupOtp, setSignupOtp] = useState('');

  // Login states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginCodeSent, setLoginCodeSent] = useState(false);
  const [loginOtp, setLoginOtp] = useState('');

  // Authority states
  const [authorityEmail, setAuthorityEmail] = useState('rajesh.deshmukh@pmc.gov.in');
  const [authorityMunicipality, setAuthorityMunicipality] = useState('Pune Municipal Corporation (PMC)');
  const [authorityDepartment, setAuthorityDepartment] = useState('Solid Waste Management & Public Works');
  const [authorityPin, setAuthorityPin] = useState('admin123');

  // Common UI states
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Available cities for currently selected district
  const availableCities = useMemo(() => {
    const selectedDistObj = MAHARASHTRA_DISTRICTS.find(
      (d) => d.name.toLowerCase() === district.toLowerCase()
    );
    return selectedDistObj ? selectedDistObj.cities : [];
  }, [district]);

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

  // --- CITIZEN HANDLERS ---
  const handleSignUpNextStep = (e: React.FormEvent) => {
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
    setSignupStep(2);
  };

  const handleSendSignupCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!signupEmail.trim() || !signupEmail.includes('@') || !signupEmail.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSignupCodeSent(true);
      setSignupOtp('123456');
    }, 350);
  };

  const handleCompleteSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setError('Please enter your email address');
      return;
    }
    if (!signupOtp.trim() || (signupOtp.trim() !== '123456' && signupOtp.length !== 6)) {
      setError('Invalid verification code. Enter demo code: 123456');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      signUp({
        name: fullName.trim(),
        email: signupEmail.trim(),
        state,
        district,
        city,
      });
      navigate('/dashboard', { replace: true });
    }, 400);
  };

  const handleSendLoginCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setError('Please enter your registered email');
      return;
    }
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLoginCodeSent(true);
      setLoginOtp('123456');
    }, 350);
  };

  const handleCompleteLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setError('Please enter your email address');
      return;
    }
    if (!loginOtp.trim() || (loginOtp.trim() !== '123456' && loginOtp.length !== 6)) {
      setError('Invalid verification code. Enter demo code: 123456');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginWithEmail({
        email: loginEmail.trim(),
      });
      navigate('/dashboard', { replace: true });
    }, 350);
  };

  const handleQuickDemoCitizenLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginAsDemo();
      navigate('/dashboard', { replace: true });
    }, 300);
  };

  // --- AUTHORITY HANDLERS ---
  const handleQuickDemoAuthorityLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginAsAuthorityDemo();
      navigate('/admin', { replace: true });
    }, 300);
  };

  const handleCompleteAuthorityLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorityEmail.trim() || !authorityEmail.includes('@')) {
      setError('Please enter official municipal email address');
      return;
    }
    if (!authorityPin.trim()) {
      setError('Please enter official PIN or Passcode');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginAsAuthority({
        name: 'Er. Rajesh Deshmukh',
        email: authorityEmail.trim(),
        department: authorityDepartment,
        municipality: authorityMunicipality,
        designation: 'Executive Ward Officer (Class I)',
      });
      navigate('/admin', { replace: true });
    }, 400);
  };

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

          {/* Main Card */}
          <Card className="p-6 sm:p-8 border border-[#DCE6F0] bg-white shadow-card rounded-2xl relative overflow-hidden">
            {/* Top Civic Ribbon */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF671F] via-[#FACC15] to-[#046A38]" />

            {/* Header */}
            <div className="text-center space-y-3 pb-4 border-b border-[#DCE6F0]">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white shadow-subtle mb-1 ${
                  activeType === 'authority' ? 'bg-[#0B2545]' : 'bg-[#3157A4]'
                }`}
              >
                {activeType === 'authority' ? (
                  <Building className="w-6 h-6 text-[#FF671F]" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-[#EAB308]" />
                )}
              </div>
              <h1 className="text-2xl font-black text-[#172B4D] tracking-tight">
                {activeType === 'authority'
                  ? 'Municipal Authority Access'
                  : citizenTab === 'signup'
                  ? 'Citizen Account Registration'
                  : 'Citizen Portal Access'}
              </h1>
              <p className="text-xs text-[#718096] max-w-sm mx-auto font-medium">
                {activeType === 'authority'
                  ? 'Government of Maharashtra • Civic Action Command Center'
                  : 'Report, track, and monitor public grievances in Maharashtra.'}
              </p>

              {/* ======================================================== */}
              {/* UPPER SLIDING SELECTOR: CITIZEN vs AUTHORITY             */}
              {/* ======================================================== */}
              <div className="relative p-1 bg-slate-200/90 rounded-xl flex items-center shadow-inner max-w-xs mx-auto mt-4">
                {/* Sliding indicator */}
                <div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-out shadow-xs ${
                    activeType === 'citizen'
                      ? 'left-1 bg-white text-slate-900'
                      : 'left-[calc(50%)] bg-[#0B2545] text-white shadow-md'
                  }`}
                />

                <button
                  type="button"
                  onClick={() => {
                    setActiveType('citizen');
                    setError(null);
                  }}
                  className={`relative z-10 w-1/2 flex items-center justify-center gap-1.5 py-2 text-xs font-bold transition-colors ${
                    activeType === 'citizen' ? 'text-[#0B2545] font-extrabold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Citizen</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveType('authority');
                    setError(null);
                  }}
                  className={`relative z-10 w-1/2 flex items-center justify-center gap-1.5 py-2 text-xs font-bold transition-colors ${
                    activeType === 'authority' ? 'text-white font-extrabold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Authority</span>
                </button>
              </div>
            </div>

            <div className="pt-5 space-y-4">
              {/* ======================================================== */}
              {/* VIEW 1: CITIZEN FLOW                                     */}
              {/* ======================================================== */}
              {activeType === 'citizen' && (
                <div className="space-y-4 animate-fade-in">
                  {/* Citizen Sub-tab: Log In vs Sign Up */}
                  <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl border border-slate-200/80 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setCitizenTab('login');
                        setError(null);
                      }}
                      className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        citizenTab === 'login'
                          ? 'bg-white text-[#3157A4] shadow-xs border border-slate-200'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Log In</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCitizenTab('signup');
                        setError(null);
                      }}
                      className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold rounded-lg transition-all ${
                        citizenTab === 'signup'
                          ? 'bg-gradient-to-r from-[#FF671F] to-[#E65100] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Sign Up</span>
                    </button>
                  </div>

                  {/* Citizen Login Tab */}
                  {citizenTab === 'login' && (
                    <div className="space-y-4 animate-fade-in">
                      {/* 1-Click Demo Login */}
                      <div className="p-3.5 rounded-xl bg-[#F4F8FC] border border-[#DCE6F0] text-xs flex items-center justify-between gap-3">
                        <div>
                          <span className="flex items-center gap-1.5 font-bold text-[#172B4D] text-xs">
                            <Zap className="w-3.5 h-3.5 text-[#FF671F] shrink-0 fill-[#FF671F]" />
                            Instant Demo Citizen Login
                          </span>
                          <p className="text-[11px] text-[#718096] mt-0.5">
                            Anand Deshmukh • Pune Nagrik
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleQuickDemoCitizenLogin}
                          disabled={isLoading}
                          className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-[#FF671F] to-[#E65100] hover:from-[#E65100] hover:to-[#D84315] text-white font-bold rounded-lg text-xs shadow-subtle transition-all active:scale-95"
                        >
                          1-Click Login
                        </button>
                      </div>

                      <div className="relative flex items-center justify-center">
                        <div className="w-full border-t border-[#DCE6F0]" />
                        <span className="absolute bg-white px-3 text-[10px] font-bold text-[#718096] uppercase tracking-wider">
                          or log in with registered email
                        </span>
                      </div>

                      <form onSubmit={handleCompleteLogin} className="space-y-3.5">
                        <FormField
                          label="Registered Email Address"
                          required
                          error={error && !loginEmail.trim() ? error : undefined}
                        >
                          <div className="relative flex items-center">
                            <span className="absolute left-3.5 text-[#718096]">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input
                              type="email"
                              placeholder="e.g. anand.deshmukh@gmail.com"
                              value={loginEmail}
                              onChange={(e) => {
                                setLoginEmail(e.target.value);
                                setError(null);
                                setLoginCodeSent(false);
                              }}
                              className="w-full pl-10 pr-24 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20"
                              required
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={() => handleSendLoginCode()}
                              disabled={!loginEmail.trim() || !loginEmail.includes('@')}
                              className="absolute right-1.5 px-3 py-1.5 bg-[#3157A4] text-white rounded-lg text-xs font-bold hover:bg-[#254483] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-subtle"
                            >
                              <Send className="w-3 h-3" />
                              <span>{loginCodeSent ? 'Resend' : 'Send Code'}</span>
                            </button>
                          </div>
                        </FormField>

                        {loginCodeSent && (
                          <div className="p-3 rounded-xl bg-[#22A982]/10 border border-[#22A982]/20 text-xs text-[#22A982] flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#22A982] shrink-0" />
                            <span>
                              Security code sent to <strong className="text-[#172B4D]">{loginEmail}</strong>
                            </span>
                          </div>
                        )}

                        <FormField
                          label="6-Digit Verification Code"
                          required
                          error={error && loginOtp.length !== 6 ? error : undefined}
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
                              value={loginOtp}
                              onChange={(e) => {
                                setLoginOtp(e.target.value.replace(/\D/g, ''));
                                setError(null);
                              }}
                              className="w-full text-center tracking-widest text-xl font-mono font-bold py-2.5 rounded-xl border border-[#DCE6F0] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20"
                              required
                            />
                          </div>
                        </FormField>

                        <Button
                          type="submit"
                          variant="saffron"
                          size="md"
                          isFullWidth
                          isLoading={isLoading}
                          rightIcon={<ArrowRight className="w-4 h-4" />}
                          className="font-bold shadow-subtle text-sm rounded-xl"
                        >
                          Log In & Open Dashboard
                        </Button>
                      </form>
                    </div>
                  )}

                  {/* Citizen Sign Up Tab */}
                  {citizenTab === 'signup' && (
                    <div className="space-y-4 animate-fade-in">
                      {signupStep === 1 && (
                        <form onSubmit={handleSignUpNextStep} className="space-y-3.5 animate-fade-in">
                          <div className="p-3.5 rounded-xl bg-[#F4F8FC] border border-[#DCE6F0] text-xs text-[#172B4D] flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-medium">
                              <Sparkles className="w-4 h-4 text-[#EAB308] shrink-0" />
                              Maharashtra Citizen Registration
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setFullName('Anand Deshmukh');
                                setDistrict('Pune');
                                setCity('Pune City');
                                setError(null);
                              }}
                              className="text-[11px] font-bold text-[#3157A4] hover:underline bg-white px-3 py-1 rounded-lg border border-[#DCE6F0] shadow-subtle"
                            >
                              Auto-fill Demo
                            </button>
                          </div>

                          <FormField label="Full Name" required error={error && !fullName.trim() ? error : undefined}>
                            <Input
                              placeholder="e.g. Anand Deshmukh"
                              value={fullName}
                              onChange={(e) => {
                                setFullName(e.target.value);
                                setError(null);
                              }}
                              className="font-medium rounded-xl border-[#DCE6F0]"
                              required
                              autoFocus
                            />
                          </FormField>

                          <FormField label="State" required>
                            <select
                              value={state}
                              disabled
                              className="w-full px-4 py-2.5 rounded-xl border border-[#DCE6F0] bg-[#F4F8FC] text-sm font-semibold text-[#172B4D] cursor-not-allowed"
                            >
                              <option value="Maharashtra">Maharashtra (Active State)</option>
                            </select>
                          </FormField>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                            <FormField label="District" required>
                              <select
                                value={district}
                                onChange={(e) => handleDistrictChange(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] bg-white"
                                required
                              >
                                {MAHARASHTRA_DISTRICTS.map((d) => (
                                  <option key={d.id} value={d.name}>
                                    {d.name}
                                  </option>
                                ))}
                              </select>
                            </FormField>

                            <FormField label="City / Area" required>
                              <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] bg-white"
                                required
                              >
                                {availableCities.map((cityName) => (
                                  <option key={cityName} value={cityName}>
                                    {cityName}
                                  </option>
                                ))}
                              </select>
                            </FormField>
                          </div>

                          <Button
                            type="submit"
                            variant="saffron"
                            isFullWidth
                            rightIcon={<ArrowRight className="w-4 h-4" />}
                            className="font-bold shadow-subtle text-sm rounded-xl"
                          >
                            Next: Email & Verification
                          </Button>
                        </form>
                      )}

                      {signupStep === 2 && (
                        <form onSubmit={handleCompleteSignUp} className="space-y-3.5 animate-fade-in">
                          <div className="p-3.5 rounded-xl bg-[#F4F8FC] border border-[#DCE6F0] text-xs flex items-center justify-between">
                            <div>
                              <p className="font-bold text-[#172B4D]">{fullName}</p>
                              <p className="text-[#718096] text-[11px]">{city}, {district}, Maharashtra</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setSignupStep(1)}
                              className="text-[#3157A4] font-bold hover:underline text-xs"
                            >
                              Edit
                            </button>
                          </div>

                          <FormField label="Email Address" required error={error && !signupEmail.trim() ? error : undefined}>
                            <div className="relative flex items-center">
                              <input
                                type="email"
                                placeholder="e.g. anand.deshmukh@gmail.com"
                                value={signupEmail}
                                onChange={(e) => {
                                  setSignupEmail(e.target.value);
                                  setError(null);
                                  setSignupCodeSent(false);
                                }}
                                className="w-full pl-3.5 pr-24 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D]"
                                required
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => handleSendSignupCode()}
                                disabled={!signupEmail.trim() || !signupEmail.includes('@')}
                                className="absolute right-1.5 px-3 py-1.5 bg-[#3157A4] text-white rounded-lg text-xs font-bold"
                              >
                                {signupCodeSent ? 'Resend' : 'Send Code'}
                              </button>
                            </div>
                          </FormField>

                          {signupCodeSent && (
                            <div className="p-3 rounded-xl bg-[#22A982]/10 border border-[#22A982]/20 text-xs text-[#22A982] flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#22A982] shrink-0" />
                              <span>Code sent to <strong className="text-[#172B4D]">{signupEmail}</strong></span>
                            </div>
                          )}

                          <FormField
                            label="6-Digit Verification Code"
                            required
                            error={error && signupOtp.length !== 6 ? error : undefined}
                            helperText="Demo code: 123456"
                          >
                            <input
                              type="text"
                              maxLength={6}
                              placeholder="123456"
                              value={signupOtp}
                              onChange={(e) => {
                                setSignupOtp(e.target.value.replace(/\D/g, ''));
                                setError(null);
                              }}
                              className="w-full text-center tracking-widest text-xl font-mono font-bold py-2.5 rounded-xl border border-[#DCE6F0]"
                              required
                            />
                          </FormField>

                          <div className="flex items-center gap-3 pt-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="md"
                              onClick={() => setSignupStep(1)}
                              className="font-bold border-[#DCE6F0] text-xs rounded-xl"
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
                              Create Account & Open Portal
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* VIEW 2: AUTHORITY FLOW                                   */}
              {/* ======================================================== */}
              {activeType === 'authority' && (
                <div className="space-y-4 animate-fade-in">
                  {/* 1-Click Demo Officer Login Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#0B2545] to-[#1E3A8A] text-white shadow-subtle flex items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-1.5 text-[#FF671F] font-bold text-xs">
                        <Zap className="w-3.5 h-3.5 fill-[#FF671F] shrink-0" />
                        <span>Instant 1-Click Officer Login</span>
                      </div>
                      <p className="text-sm font-bold text-white mt-0.5">
                        Er. Rajesh Deshmukh
                      </p>
                      <p className="text-[11px] text-slate-300">
                        Executive Ward Officer • PMC Pune (Ward 45-B)
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuickDemoAuthorityLogin}
                      disabled={isLoading}
                      className="shrink-0 px-3.5 py-2 bg-gradient-to-r from-[#FF671F] to-[#E65100] hover:from-[#E65100] hover:to-[#D84315] text-white font-bold rounded-xl text-xs shadow-subtle transition-all active:scale-95"
                    >
                      1-Click Login
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-[#DCE6F0]" />
                    <span className="absolute bg-white px-3 text-[10px] font-bold text-[#718096] uppercase tracking-wider">
                      or official credentials
                    </span>
                  </div>

                  <form onSubmit={handleCompleteAuthorityLogin} className="space-y-3.5">
                    <FormField
                      label="Official Government Email"
                      required
                      error={error && !authorityEmail.trim() ? error : undefined}
                    >
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-[#718096]">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          value={authorityEmail}
                          onChange={(e) => {
                            setAuthorityEmail(e.target.value);
                            setError(null);
                          }}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D]"
                          required
                        />
                      </div>
                    </FormField>

                    <FormField label="Municipal Corporation" required>
                      <select
                        value={authorityMunicipality}
                        onChange={(e) => setAuthorityMunicipality(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] bg-white"
                      >
                        <option value="Pune Municipal Corporation (PMC)">Pune Municipal Corporation (PMC)</option>
                        <option value="Brihanmumbai Municipal Corporation (BMC)">Brihanmumbai Municipal Corp (BMC - Mumbai)</option>
                        <option value="Nagpur Municipal Corporation (NMC)">Nagpur Municipal Corporation (NMC)</option>
                        <option value="Thane Municipal Corporation (TMC)">Thane Municipal Corporation (TMC)</option>
                        <option value="Pimpri-Chinchwad Municipal Corporation (PCMC)">Pimpri-Chinchwad Corp (PCMC)</option>
                        <option value="Nashik Municipal Corporation (NMC)">Nashik Municipal Corporation (NMC)</option>
                      </select>
                    </FormField>

                    <FormField label="Department Division" required>
                      <select
                        value={authorityDepartment}
                        onChange={(e) => setAuthorityDepartment(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D] bg-white"
                      >
                        <option value="Solid Waste Management & Public Works">Solid Waste Management & Sanitation</option>
                        <option value="Roads & Pothole Infrastructure">Roads & Pothole Infrastructure</option>
                        <option value="Street Lighting & Electrical Division">Street Lighting & Electrical Division</option>
                        <option value="Water Supply & Sewerage Division">Water Supply & Sewerage Division</option>
                        <option value="Ward General Administration & Grievance Cell">Ward General Administration</option>
                      </select>
                    </FormField>

                    <FormField
                      label="Official Security PIN / Passcode"
                      required
                      helperText="Demo passcode: admin123"
                    >
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 text-[#718096]">
                          <KeyRound className="w-4 h-4" />
                        </span>
                        <input
                          type="password"
                          value={authorityPin}
                          onChange={(e) => {
                            setAuthorityPin(e.target.value);
                            setError(null);
                          }}
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#DCE6F0] text-sm font-semibold text-[#172B4D]"
                          required
                        />
                      </div>
                    </FormField>

                    <Button
                      type="submit"
                      variant="saffron"
                      size="md"
                      isFullWidth
                      isLoading={isLoading}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      className="font-bold shadow-subtle text-sm rounded-xl bg-[#0B2545] hover:bg-[#172B4D] text-white"
                    >
                      Log In as Authority & Open Admin Panel
                    </Button>
                  </form>
                </div>
              )}
            </div>

            {/* Bottom Reassurance */}
            <div className="mt-5 pt-3 border-t border-[#DCE6F0] text-center text-xs text-[#718096]">
              {activeType === 'authority'
                ? 'Authorized Access for Maharashtra Municipal Ward Officers'
                : 'Account persistently saved on this device • Never asks for repeated login'}
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
