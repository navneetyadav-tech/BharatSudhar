import { useState, useMemo, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  X,
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
  LogIn,
  UserPlus,
  Zap,
  Briefcase,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { FormField } from '../forms/FormField';
import {
  MAHARASHTRA_STATE,
  MAHARASHTRA_DISTRICTS,
} from '../../data/maharashtraData';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const navigate = useNavigate();
  const {
    loginModalMode,
    setLoginModalMode,
    loginType,
    setLoginType,
    loginWithEmail,
    signUp,
    loginAsDemo,
    loginAsAuthority,
    loginAsAuthorityDemo,
  } = useAuth();

  // Upper Sliding Selector: 'citizen' | 'authority'
  const [activeType, setActiveType] = useState<'citizen' | 'authority'>(loginType);

  // Citizen Sub-Tab: 'login' | 'signup'
  const [citizenTab, setCitizenTab] = useState<'login' | 'signup'>(loginModalMode);

  // Synchronize when opened with explicit mode or type
  useEffect(() => {
    setActiveType(loginType);
  }, [loginType, isOpen]);

  useEffect(() => {
    setCitizenTab(loginModalMode);
  }, [loginModalMode, isOpen]);

  // Citizen Sign Up Multi-Step (1: Profile & Location, 2: Email & Verification)
  const [signupStep, setSignupStep] = useState<1 | 2>(1);

  // Citizen Sign Up Form States
  const [fullName, setFullName] = useState('');
  const [state] = useState(MAHARASHTRA_STATE);
  const [district, setDistrict] = useState(MAHARASHTRA_DISTRICTS[2].name); // Pune default
  const [city, setCity] = useState(MAHARASHTRA_DISTRICTS[2].cities[0]); // Pune City
  const [signupEmail, setSignupEmail] = useState('');
  const [signupCodeSent, setSignupCodeSent] = useState(false);
  const [signupOtp, setSignupOtp] = useState('');

  // Citizen Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginCodeSent, setLoginCodeSent] = useState(false);
  const [loginOtp, setLoginOtp] = useState('');

  // Authority Form States
  const [authorityEmail, setAuthorityEmail] = useState('rajesh.deshmukh@pmc.gov.in');
  const [authorityMunicipality, setAuthorityMunicipality] = useState('Pune Municipal Corporation (PMC)');
  const [authorityDepartment, setAuthorityDepartment] = useState('Solid Waste Management & Public Works');
  const [authorityPin, setAuthorityPin] = useState('admin123');

  // UI States
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Available cities for currently selected district in citizen sign up
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

  const handleClose = useCallback(() => {
    setSignupStep(1);
    setError(null);
    setSignupCodeSent(false);
    setLoginCodeSent(false);
    onClose();
  }, [onClose]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // --- CITIZEN HANDLERS ---
  const handleSignUpNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!district || !city) {
      setError('Please select Maharashtra district and city');
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
      setError('Invalid code. Use demo code: 123456');
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
      if (onSuccess) onSuccess();
      handleClose();
      navigate('/dashboard', { replace: true });
    }, 400);
  };

  const handleSendLoginCode = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setError('Please enter your registered email address');
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
      if (onSuccess) onSuccess();
      handleClose();
      navigate('/dashboard', { replace: true });
    }, 350);
  };

  const handleQuickDemoCitizenLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginAsDemo();
      if (onSuccess) onSuccess();
      handleClose();
      navigate('/dashboard', { replace: true });
    }, 300);
  };

  // --- AUTHORITY HANDLERS ---
  const handleQuickDemoAuthorityLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      loginAsAuthorityDemo();
      if (onSuccess) onSuccess();
      handleClose();
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
      if (onSuccess) onSuccess();
      handleClose();
      navigate('/admin', { replace: true });
    }, 400);
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      {/* Dark Dim Backdrop with blur */}
      <div
        className="fixed inset-0 bg-slate-900/80 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#0F172A] text-left shadow-2xl transition-all border border-slate-200 dark:border-slate-800 my-auto animate-scale-in">
        {/* Top Tiranga Ribbon Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-saffron-500 via-white to-tirangaGreen-600" />

        {/* Modal Header */}
        <div className="flex items-start justify-between p-4 sm:p-5 pb-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-xs shrink-0 ${
                activeType === 'authority'
                  ? 'bg-gradient-to-br from-chakra-950 via-chakra-900 to-slate-900'
                  : 'bg-gradient-to-br from-chakra-900 to-chakra-950'
              }`}
            >
              {activeType === 'authority' ? (
                <Building className="w-5 h-5 text-saffron-400" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-saffron-400" />
              )}
            </div>
            <div>
              <h3 id="login-modal-title" className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {activeType === 'authority'
                  ? 'Municipal Authority Portal'
                  : citizenTab === 'signup'
                  ? 'Citizen Registration'
                  : 'Citizen Portal Login'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {activeType === 'authority'
                  ? 'Government of Maharashtra • Civic Action Control'
                  : 'Report, track, and monitor public grievances'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* UPPER SLIDING OPTION: CITIZEN vs AUTHORITY               */}
        {/* ======================================================== */}
        <div className="px-5 pt-4 bg-white dark:bg-[#0F172A]">
          <div className="relative p-1 bg-slate-200/90 dark:bg-slate-800 rounded-xl flex items-center shadow-inner">
            {/* Sliding Highlight Indicator */}
            <div
              className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg transition-all duration-300 ease-out shadow-xs ${
                activeType === 'citizen'
                  ? 'left-1 bg-white dark:bg-slate-700 text-slate-900 dark:text-white'
                  : 'left-[calc(50%)] bg-gradient-to-r from-chakra-900 to-chakra-950 text-white shadow-md'
              }`}
            />

            {/* Citizen Button */}
            <button
              type="button"
              onClick={() => {
                setActiveType('citizen');
                setLoginType('citizen');
                setError(null);
              }}
              className={`relative z-10 w-1/2 flex items-center justify-center gap-2 py-2 text-xs font-black transition-colors ${
                activeType === 'citizen'
                  ? 'text-chakra-950 dark:text-white font-extrabold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Citizen</span>
            </button>

            {/* Authority Button */}
            <button
              type="button"
              onClick={() => {
                setActiveType('authority');
                setLoginType('authority');
                setError(null);
              }}
              className={`relative z-10 w-1/2 flex items-center justify-center gap-2 py-2 text-xs font-black transition-colors ${
                activeType === 'authority'
                  ? 'text-white font-extrabold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Authority</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 pt-3 space-y-4">
          {/* ======================================================== */}
          {/* VIEW A: CITIZEN FLOW (Log In or Sign Up)                 */}
          {/* ======================================================== */}
          {activeType === 'citizen' && (
            <div className="space-y-4 animate-fade-in">
              {/* Citizen Sub-tabs (Log In vs Sign Up) */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setCitizenTab('login');
                    setLoginModalMode('login');
                    setError(null);
                  }}
                  className={`flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    citizenTab === 'login'
                      ? 'bg-white dark:bg-slate-900 text-chakra-900 dark:text-white shadow-xs border border-slate-200 dark:border-slate-700'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 text-chakra-800 dark:text-chakra-400" />
                  <span>Log In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCitizenTab('signup');
                    setLoginModalMode('signup');
                    setError(null);
                  }}
                  className={`flex items-center justify-center gap-2 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    citizenTab === 'signup'
                      ? 'bg-gradient-to-r from-saffron-500 to-saffron-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Sign Up</span>
                </button>
              </div>

              {/* Citizen Login Tab */}
              {citizenTab === 'login' && (
                <div className="space-y-3.5 animate-fade-in">
                  {/* 1-Click Demo Citizen Login */}
                  <div className="p-3 rounded-xl bg-saffron-50/70 border border-saffron-200/90 text-xs flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="flex items-center gap-1.5 font-bold text-saffron-950 text-xs">
                        <Zap className="w-3.5 h-3.5 text-saffron-600 shrink-0 fill-saffron-500" />
                        Instant Demo Citizen Login
                      </span>
                      <p className="text-[11px] text-saffron-800 truncate">
                        Anand Deshmukh • Pune Nagrik
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleQuickDemoCitizenLogin}
                      disabled={isLoading}
                      className="shrink-0 px-2.5 py-1.5 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold rounded-lg text-xs shadow-xs transition-all active:scale-95"
                    >
                      1-Click Login
                    </button>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="w-full border-t border-slate-200" />
                    <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      or log in with registered email
                    </span>
                  </div>

                  <form onSubmit={handleCompleteLogin} className="space-y-3.5">
                    <FormField
                      label="Registered Email"
                      required
                      error={error && !loginEmail.trim() ? error : undefined}
                    >
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-slate-400">
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
                          className="w-full pl-9 pr-24 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500"
                          required
                          autoFocus
                        />
                        <button
                          type="button"
                          onClick={() => handleSendLoginCode()}
                          disabled={!loginEmail.trim() || !loginEmail.includes('@')}
                          className="absolute right-1 px-2.5 py-1 bg-chakra-900 text-white rounded text-[11px] font-bold hover:bg-chakra-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 whitespace-nowrap shrink-0"
                        >
                          <Send className="w-2.5 h-2.5" />
                          <span>{loginCodeSent ? 'Resend' : 'Send Code'}</span>
                        </button>
                      </div>
                    </FormField>

                    {loginCodeSent && (
                      <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Security code sent to <strong>{loginEmail}</strong></span>
                      </div>
                    )}

                    <FormField
                      label="6-Digit Verification Code"
                      required
                      error={error && loginOtp.length !== 6 ? error : undefined}
                      helperText="Demo verification code: 123456"
                    >
                      <div className="relative flex items-center">
                        <span className="absolute left-3 text-slate-400">
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
                          className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-chakra-500"
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
                      className="font-bold shadow-xs text-xs sm:text-sm"
                    >
                      Log In & Open Dashboard
                    </Button>
                  </form>
                </div>
              )}

              {/* Citizen Sign Up Tab */}
              {citizenTab === 'signup' && (
                <div className="space-y-3.5 animate-fade-in">
                  <div className="flex items-center justify-between px-1 text-xs">
                    <span className="font-bold text-slate-700">
                      {signupStep === 1 ? 'Step 1 of 2: Maharashtra Profile' : 'Step 2 of 2: Email & Verification'}
                    </span>
                    <div className="flex gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${signupStep === 1 ? 'bg-saffron-500' : 'bg-emerald-500'}`} />
                      <span className={`w-2.5 h-2.5 rounded-full ${signupStep === 2 ? 'bg-saffron-500' : 'bg-slate-200'}`} />
                    </div>
                  </div>

                  {signupStep === 1 && (
                    <form onSubmit={handleSignUpNextStep} className="space-y-3 animate-fade-in">
                      <div className="p-2 rounded-xl bg-saffron-50/70 border border-saffron-200/90 text-xs text-saffron-900 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 font-medium text-[11px]">
                          <Sparkles className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
                          Maharashtra Citizen Portal
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setFullName('Anand Deshmukh');
                            setDistrict('Pune');
                            setCity('Pune City');
                            setError(null);
                          }}
                          className="text-[11px] font-bold text-chakra-800 hover:underline bg-white px-2 py-0.5 rounded border border-saffron-300 shadow-2xs"
                        >
                          Auto-fill Demo
                        </button>
                      </div>

                      <FormField label="Full Name" required error={error && !fullName.trim() ? error : undefined}>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-slate-400">
                            <User className="w-4 h-4" />
                          </span>
                          <Input
                            placeholder="e.g. Anand Deshmukh"
                            value={fullName}
                            onChange={(e) => {
                              setFullName(e.target.value);
                              setError(null);
                            }}
                            className="pl-9 text-xs sm:text-sm font-medium"
                            required
                            autoFocus
                          />
                        </div>
                      </FormField>

                      <FormField label="State" required>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-slate-400">
                            <MapPin className="w-4 h-4" />
                          </span>
                          <select
                            value={state}
                            disabled
                            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-800 cursor-not-allowed"
                          >
                            <option value="Maharashtra">Maharashtra (Active State)</option>
                          </select>
                        </div>
                      </FormField>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <FormField label="District" required>
                          <select
                            value={district}
                            onChange={(e) => handleDistrictChange(e.target.value)}
                            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500 bg-white"
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
                            className="w-full px-2.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500 bg-white"
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
                        className="font-bold shadow-xs mt-1 text-xs sm:text-sm"
                      >
                        Next: Email & Verification
                      </Button>
                    </form>
                  )}

                  {signupStep === 2 && (
                    <form onSubmit={handleCompleteSignUp} className="space-y-3 animate-fade-in">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                        <div>
                          <p className="font-bold text-slate-900">{fullName}</p>
                          <p className="text-slate-500 text-[10px]">{city}, {district}, Maharashtra</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSignupStep(1)}
                          className="text-chakra-700 font-bold hover:underline text-xs"
                        >
                          Edit
                        </button>
                      </div>

                      <FormField label="Email Address" required error={error && !signupEmail.trim() ? error : undefined}>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-slate-400">
                            <Mail className="w-4 h-4" />
                          </span>
                          <input
                            type="email"
                            placeholder="e.g. anand.deshmukh@gmail.com"
                            value={signupEmail}
                            onChange={(e) => {
                              setSignupEmail(e.target.value);
                              setError(null);
                              setSignupCodeSent(false);
                            }}
                            className="w-full pl-9 pr-24 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900"
                            required
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => handleSendSignupCode()}
                            disabled={!signupEmail.trim() || !signupEmail.includes('@')}
                            className="absolute right-1 px-2.5 py-1 bg-chakra-900 text-white rounded text-[11px] font-bold hover:bg-chakra-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 whitespace-nowrap shrink-0"
                          >
                            <Send className="w-2.5 h-2.5" />
                            <span>{signupCodeSent ? 'Resend' : 'Send Code'}</span>
                          </button>
                        </div>
                      </FormField>

                      {signupCodeSent && (
                        <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Code sent to <strong>{signupEmail}</strong></span>
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
                          className="w-full text-center tracking-widest text-lg font-mono font-bold py-2 rounded-lg border border-slate-300"
                          required
                        />
                      </FormField>

                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                        <Button
                          type="button"
                          variant="outline"
                          size="md"
                          onClick={() => setSignupStep(1)}
                          leftIcon={<ArrowLeft className="w-4 h-4" />}
                          className="font-bold border-slate-300 text-xs justify-center sm:w-auto"
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
                          className="font-bold shadow-xs text-xs sm:text-sm justify-center flex-1"
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
          {/* VIEW B: AUTHORITY FLOW (Municipal Officer Login)         */}
          {/* ======================================================== */}
          {activeType === 'authority' && (
            <div className="space-y-4 animate-fade-in">
              {/* 1-Click Demo Officer Login Card */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-chakra-950 to-chakra-900 text-white shadow-sm flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-saffron-400 font-bold text-xs">
                    <Zap className="w-3.5 h-3.5 fill-saffron-400 shrink-0" />
                    <span>Instant 1-Click Officer Login</span>
                  </div>
                  <p className="text-xs font-bold text-white mt-0.5 truncate">
                    Er. Rajesh Deshmukh
                  </p>
                  <p className="text-[10px] text-slate-300 truncate">
                    Executive Ward Officer • PMC Pune (Ward 45-B)
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoAuthorityLogin}
                  disabled={isLoading}
                  className="shrink-0 px-3 py-1.5 bg-gradient-to-r from-saffron-500 to-saffron-600 hover:from-saffron-600 hover:to-saffron-700 text-white font-bold rounded-lg text-xs shadow-xs transition-all active:scale-95"
                >
                  1-Click Login
                </button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="w-full border-t border-slate-200" />
                <span className="absolute bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  or municipal official credentials
                </span>
              </div>

              <form onSubmit={handleCompleteAuthorityLogin} className="space-y-3">
                {/* Official Email */}
                <FormField
                  label="Official Government Email"
                  required
                  error={error && !authorityEmail.trim() ? error : undefined}
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      type="email"
                      placeholder="e.g. officer.ward45@pmc.gov.in"
                      value={authorityEmail}
                      onChange={(e) => {
                        setAuthorityEmail(e.target.value);
                        setError(null);
                      }}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500"
                      required
                    />
                  </div>
                </FormField>

                {/* Municipal Corporation Selector */}
                <FormField label="Municipal Corporation" required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400">
                      <Building className="w-4 h-4" />
                    </span>
                    <select
                      value={authorityMunicipality}
                      onChange={(e) => setAuthorityMunicipality(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                    >
                      <option value="Pune Municipal Corporation (PMC)">Pune Municipal Corporation (PMC)</option>
                      <option value="Brihanmumbai Municipal Corporation (BMC)">Brihanmumbai Municipal Corp (BMC - Mumbai)</option>
                      <option value="Nagpur Municipal Corporation (NMC)">Nagpur Municipal Corporation (NMC)</option>
                      <option value="Thane Municipal Corporation (TMC)">Thane Municipal Corporation (TMC)</option>
                      <option value="Pimpri-Chinchwad Municipal Corporation (PCMC)">Pimpri-Chinchwad Corp (PCMC)</option>
                      <option value="Nashik Municipal Corporation (NMC)">Nashik Municipal Corporation (NMC)</option>
                    </select>
                  </div>
                </FormField>

                {/* Department Selector */}
                <FormField label="Department Division" required>
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400">
                      <Briefcase className="w-4 h-4" />
                    </span>
                    <select
                      value={authorityDepartment}
                      onChange={(e) => setAuthorityDepartment(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                    >
                      <option value="Solid Waste Management & Public Works">Solid Waste Management & Sanitation</option>
                      <option value="Roads & Pothole Infrastructure">Roads & Pothole Infrastructure</option>
                      <option value="Street Lighting & Electrical Division">Street Lighting & Electrical Division</option>
                      <option value="Water Supply & Sewerage Division">Water Supply & Sewerage Division</option>
                      <option value="Ward General Administration & Grievance Cell">Ward General Administration</option>
                    </select>
                  </div>
                </FormField>

                {/* Passcode / PIN */}
                <FormField
                  label="Official Security PIN / Passcode"
                  required
                  helperText="Demo passcode: admin123"
                >
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </span>
                    <input
                      type="password"
                      placeholder="admin123"
                      value={authorityPin}
                      onChange={(e) => {
                        setAuthorityPin(e.target.value);
                        setError(null);
                      }}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500"
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
                  className="font-bold shadow-xs text-xs sm:text-sm bg-chakra-900 hover:bg-chakra-950 text-white"
                >
                  Log In as Authority & Open Admin Panel
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
          {activeType === 'authority'
            ? 'Restricted Access for Authorized Maharashtra Civic Officers'
            : 'Once logged in, your session remains permanently active on this device.'}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
