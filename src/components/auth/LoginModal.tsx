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
  const { loginWithEmail } = useAuth();

  // Step 1: Profile & Location, Step 2: Email & Verification
  const [step, setStep] = useState<1 | 2>(1);

  // Form states
  const [fullName, setFullName] = useState('');
  const [state] = useState(MAHARASHTRA_STATE);
  const [district, setDistrict] = useState(MAHARASHTRA_DISTRICTS[2].name); // Pune
  const [city, setCity] = useState(MAHARASHTRA_DISTRICTS[2].cities[0]); // Pune City
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

  // When district changes, update default city
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
    setStep(1);
    setError(null);
    setCodeSent(false);
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

  // Step 1: Validate details and move to Step 2 (Email & Verification)
  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!district || !city) {
      setError('Please select district and city');
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
      setOtpCode('123456'); // Pre-fill convenience demo code
    }, 400);
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
      if (onSuccess) onSuccess();
      handleClose();
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

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      {/* Dark Dim Backdrop with blur */}
      <div
        className="fixed inset-0 bg-slate-900/75 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div className="relative z-10 w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all border border-slate-200 my-auto animate-scale-in">
        {/* Top Tiranga Ribbon Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-saffron-500 via-white to-tirangaGreen-600" />

        {/* Header */}
        <div className="flex items-start justify-between p-5 pb-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            {/* Crest */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-chakra-900 to-chakra-950 text-white flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-5 h-5 text-saffron-400" />
            </div>
            <div>
              <h3 id="login-modal-title" className="text-lg font-bold text-slate-900 leading-tight">
                {step === 1 ? 'Citizen Portal Login' : 'Email & Verification'}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {step === 1 ? 'Step 1: Maharashtra Civic Profile' : 'Step 2: Enter Email & Code'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          {/* STEP 1: Profile & Location (No Email on this screen) */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-3.5 animate-fade-in">
              {/* Quick Fill Test Bar */}
              <div className="p-2.5 rounded-xl bg-saffron-50/70 border border-saffron-200/90 text-xs text-saffron-900 flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-medium text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-saffron-600 shrink-0" />
                  Maharashtra Nagrik Portal
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoProfile}
                  className="text-[11px] font-bold text-chakra-800 hover:underline bg-white px-2 py-0.5 rounded border border-saffron-300 shadow-2xs transition-colors"
                >
                  Auto-fill Demo
                </button>
              </div>

              {/* Full Name */}
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
                    className="pl-9 text-sm font-medium"
                    required
                    autoFocus
                  />
                </div>
              </FormField>

              {/* State (Fixed to Maharashtra) */}
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

              {/* District & City Dropdowns */}
              <div className="grid grid-cols-2 gap-2.5">
                <FormField label="District" required>
                  <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-slate-400">
                      <Building className="w-3.5 h-3.5" />
                    </span>
                    <select
                      value={district}
                      onChange={(e) => handleDistrictChange(e.target.value)}
                      className="w-full pl-8 pr-2 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500 bg-white"
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

                <FormField label="City / Area" required>
                  <div className="relative flex items-center">
                    <span className="absolute left-2.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pl-8 pr-2 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500 bg-white"
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
                className="font-bold shadow-sm mt-1 text-sm"
              >
                Next: Email & Verification
              </Button>
            </form>
          )}

          {/* STEP 2: Email & Verification Code (Both on this same page) */}
          {step === 2 && (
            <form onSubmit={handleVerifyAndLogin} className="space-y-3.5 animate-fade-in">
              {/* Profile Summary Badge */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{fullName}</p>
                  <p className="text-slate-500 text-[10px]">
                    {city}, {district}, Maharashtra
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError(null);
                  }}
                  className="text-chakra-700 font-bold hover:underline text-xs"
                >
                  Edit
                </button>
              </div>

              {/* Email Address Input */}
              <FormField
                label="Enter Email Address"
                required
                error={error && !email.trim() ? error : undefined}
              >
                <div className="space-y-1.5">
                  <div className="relative flex items-center">
                    <span className="absolute left-3 text-slate-400">
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
                      className="w-full pl-9 pr-20 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-chakra-500"
                      required
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => handleSendEmailCode()}
                      disabled={!email.trim() || !email.includes('@')}
                      className="absolute right-1 px-2.5 py-1 bg-chakra-900 text-white rounded text-[11px] font-bold hover:bg-chakra-950 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      <Send className="w-2.5 h-2.5" />
                      <span>{codeSent ? 'Resend' : 'Send Code'}</span>
                    </button>
                  </div>

                  {!email && (
                    <button
                      type="button"
                      onClick={handleFillDemoEmail}
                      className="text-[10px] text-chakra-700 hover:underline font-medium flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-saffron-600" />
                      Auto-fill: anand.deshmukh@gmail.com
                    </button>
                  )}
                </div>
              </FormField>

              {/* Sent Confirmation Badge */}
              {codeSent && (
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>
                    Code sent to <strong>{email}</strong>
                  </span>
                </div>
              )}

              {/* 6-Digit Email Verification Code Input on the Same Screen */}
              <FormField
                label="Enter 6-Digit Verification Code"
                required
                error={error && otpCode.length !== 6 ? error : undefined}
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
                    value={otpCode}
                    onChange={(e) => {
                      setOtpCode(e.target.value.replace(/\D/g, ''));
                      setError(null);
                    }}
                    className="w-full text-center tracking-widest text-xl font-mono font-bold py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-chakra-500"
                    required
                  />
                </div>
              </FormField>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setStep(1)}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  className="font-bold border-slate-300 text-xs"
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
                  className="font-bold shadow-sm text-xs sm:text-sm"
                >
                  Verify & Enter Dashboard
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* Footer Note */}
        <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 text-center text-[11px] text-slate-500">
          Maharashtra Public Civic Portal • Direct Access
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
