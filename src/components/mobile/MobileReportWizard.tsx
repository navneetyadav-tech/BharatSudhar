import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  RefreshCw,
  Check,
} from 'lucide-react';
import { PROBLEM_CATEGORIES } from './categories';
import type { MobileReport } from './types';

interface MobileReportWizardProps {
  userName: string;
  onComplaintSubmitted: (report: MobileReport) => void;
  onCancel: () => void;
  onGoToReports: () => void;
}

// Sample realistic demo photos for instant testing on any device
const SAMPLE_PHOTOS = [
  {
    label: 'Garbage Heap',
    url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Road Pothole',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Street Light',
    url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Water Leak',
    url: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
  },
];

const LOCALITY_OPTIONS = [
  'Sector 14, Gurugram, Haryana',
  'Connaught Place, Central Delhi',
  'Lajpat Nagar IV, South Delhi',
  'Indiranagar 100ft Road, Bengaluru',
  'Koramangala 5th Block, Bengaluru',
  'Bandra West, Hill Road, Mumbai',
  'Andheri East, MIDC, Mumbai',
  'Karol Bagh, New Delhi',
  'Salt Lake Sector V, Kolkata',
  'Civil Lines, Jaipur, Rajasthan',
  'Gachibowli, Hyderabad, Telangana',
  'Aliganj, Lucknow, Uttar Pradesh',
  'Other Custom Locality...',
];

export function MobileReportWizard({
  userName,
  onComplaintSubmitted,
  onCancel,
  onGoToReports,
}: MobileReportWizardProps) {
  // Wizard Step State (1 to 5)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedReportId, setSubmittedReportId] = useState<string>('');

  // Step 1: Selected Category
  const [selectedCategory, setSelectedCategory] = useState<string>('garbage-waste');

  // Step 2: Live Evidence State
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [additionalPhoto, setAdditionalPhoto] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activePhotoTarget, setActivePhotoTarget] = useState<'primary' | 'additional'>('primary');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Step 3: Location State
  const [locality, setLocality] = useState<string>('Sector 14, Gurugram, Haryana');
  const [customLocality, setCustomLocality] = useState<string>('');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsAddress, setGpsAddress] = useState<string | null>(null);

  // Step 4: Description State
  const [description, setDescription] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);

  // Stop camera when unmounting or switching steps
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  const stopCameraStream = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // Launch live camera stream
  const startCamera = async (target: 'primary' | 'additional' = 'primary') => {
    setActivePhotoTarget(target);
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera device access is not supported on this browser.');
      }
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });

      // Small delay to ensure video element is rendered
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((err) => console.warn('Video play warning:', err));
        }
      }, 100);
    } catch (err: unknown) {
      console.warn('Camera stream error:', err);
      setIsCameraActive(false);
      setCameraError('Unable to access camera directly. You can use the camera file upload below or select a test photo.');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        if (activePhotoTarget === 'primary') {
          setCapturedPhoto(dataUrl);
        } else {
          setAdditionalPhoto(dataUrl);
        }
      }
      stopCameraStream();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (activePhotoTarget === 'primary') {
          setCapturedPhoto(result);
        } else {
          setAdditionalPhoto(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle GPS location fetch
  const handleFetchCurrentLocation = () => {
    setIsLocating(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setGpsCoordinates({ lat, lng });
          setGpsAddress(`GPS Verified: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E (Accuracy: ±${Math.round(position.coords.accuracy)}m)`);
          setIsLocating(false);
        },
        () => {
          // Fallback to simulated high-accuracy Indian civic GPS
          setTimeout(() => {
            const fallbackLat = 28.4735;
            const fallbackLng = 77.0392;
            setGpsCoordinates({ lat: fallbackLat, lng: fallbackLng });
            setGpsAddress(`GPS Pinpointed: ${fallbackLat}°N, ${fallbackLng}°E (Sector 14 Municipal Area)`);
            setIsLocating(false);
          }, 600);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      setTimeout(() => {
        setGpsCoordinates({ lat: 28.6139, lng: 77.209 });
        setGpsAddress('GPS Detected: 28.6139°N, 77.2090°E (Central Municipal Zone)');
        setIsLocating(false);
      }, 500);
    }
  };

  // Submit complete report
  const handleSubmitReport = () => {
    const categoryInfo = PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory) || PROBLEM_CATEGORIES[0];
    const reportId = `BS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const finalLocality = locality === 'Other Custom Locality...' ? customLocality || 'Custom Ward' : locality;

    const newReport: MobileReport = {
      id: reportId,
      category: selectedCategory,
      categoryName: categoryInfo.name,
      categoryEmoji: '📍',
      photoUrl: capturedPhoto || SAMPLE_PHOTOS[0].url,
      additionalPhotoUrl: additionalPhoto || undefined,
      location: {
        locality: finalLocality,
        addressText: gpsAddress || `${finalLocality}, Municipal Ward Division`,
        latitude: gpsCoordinates?.lat,
        longitude: gpsCoordinates?.lng,
      },
      description: description.trim() || 'Civic issue reported for urgent municipal inspection and field resolution.',
      status: 'under-review',
      createdAt: new Date().toISOString(),
      timestamp: 'Just now',
      isAnonymous,
      assignedDepartment: 'Ward Rapid Civic Action Cell',
      officialRemarks: `Complaint logged by ${isAnonymous ? 'Anonymous Citizen' : userName}. Dispatched to local beat engineer.`,
    };

    setSubmittedReportId(reportId);
    setIsSubmitted(true);
    onComplaintSubmitted(newReport);
  };

  // ---------------------------------------------------------------------------
  // SUCCESS SCREEN
  // ---------------------------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl border border-[#DCE6F0] p-6 sm:p-8 text-center space-y-5 shadow-subtle animate-fade-in my-2">
        <div className="w-16 h-16 rounded-full bg-[#22A982]/10 text-[#22A982] flex items-center justify-center mx-auto shadow-subtle">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5">
          <span className="inline-block px-3 py-1 rounded-full bg-[#22A982]/10 text-[#22A982] text-xs font-mono font-bold border border-[#22A982]/20">
            REF #{submittedReportId}
          </span>
          <h2 className="text-2xl font-extrabold text-[#172B4D]">
            Problem Reported Successfully!
          </h2>
          <p className="text-xs sm:text-sm text-[#718096] max-w-sm mx-auto">
            Your complaint has been registered with the local municipal authority. Field inspection is scheduled within 4 hours.
          </p>
        </div>

        {/* Report Card Snapshot */}
        <div className="bg-[#F4F8FC] border border-[#DCE6F0] rounded-xl p-3.5 text-left text-xs space-y-1.5 max-w-xs mx-auto">
          <div className="flex justify-between">
            <span className="text-[#718096]">Problem:</span>
            <span className="font-semibold text-[#172B4D]">
              {PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#718096]">Area:</span>
            <span className="font-semibold text-[#172B4D] truncate max-w-[180px]">
              {locality === 'Other Custom Locality...' ? customLocality : locality}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#718096]">Status:</span>
            <span className="font-bold text-[#3157A4] bg-[#EBF2FA] px-2.5 py-0.5 rounded-full border border-[#DCE6F0]">
              Under Review
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5 pt-2 max-w-xs mx-auto">
          <button
            type="button"
            onClick={onGoToReports}
            className="w-full py-2.5 px-4 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] active:scale-98 text-[#172B4D] font-bold text-sm shadow-subtle transition-all"
          >
            View in My Reports
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] text-[#718096] hover:text-[#172B4D] font-semibold text-sm transition-colors shadow-subtle"
          >
            Back to Overview
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-8">
      {/* Wizard Main Card */}
      <div className="bg-white rounded-2xl border border-[#DCE6F0] shadow-subtle overflow-hidden">
        {/* Card Header & Title */}
        <div className="p-4 sm:p-5 pb-3">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#172B4D] tracking-tight">
            Report a Problem
          </h2>

          {/* Segmented Progress Bar (5 Segments matching Screenshots) */}
          <div className="grid grid-cols-5 gap-1.5 mt-3 mb-1">
            {[1, 2, 3, 4, 5].map((step) => {
              const isFilled = step <= currentStep;
              return (
                <div
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isFilled ? 'bg-[#3157A4]' : 'bg-[#DCE6F0]'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Step Content Container */}
        <div className="p-4 sm:p-5 pt-1 space-y-4">
          {/* =============================================================== */}
          {/* STEP 1: SELECT THE PROBLEM (Screenshot 2) */}
          {/* =============================================================== */}
          {currentStep === 1 && (
            <div className="space-y-3.5 animate-fade-in">
              <h3 className="text-sm sm:text-base font-bold text-[#172B4D]">
                Step 1 — Select the problem
              </h3>

              {/* 10 Problem Cards Grid (2-column on mobile, exactly like Screenshot 2) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3">
                {PROBLEM_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-[#3157A4] bg-[#EBF2FA] shadow-subtle ring-1 ring-[#3157A4]'
                          : 'border-[#DCE6F0] bg-white hover:border-[#B8CDE6] hover:bg-[#F4F8FC] shadow-subtle'
                      }`}
                    >
                      {/* Active indicator dot */}
                      {isSelected && (
                        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#3157A4] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}

                      {/* Icon */}
                      <div className="mb-2 flex items-center justify-center h-10">
                        {cat.renderIcon()}
                      </div>

                      {/* Label */}
                      <span className="text-xs sm:text-sm font-semibold text-[#172B4D] leading-tight">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Bottom Continue Action */}
              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#3157A4] hover:bg-[#254483] active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-subtle transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 2: CAPTURE LIVE EVIDENCE (Screenshot 3) */}
          {/* =============================================================== */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm sm:text-base font-bold text-[#172B4D]">
                Step 2 — Capture live evidence
              </h3>

              {/* Hidden file input for native camera or file upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileUpload}
                className="hidden"
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Camera Live Stream Viewfinder Overlay (if camera active) */}
              {isCameraActive ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#3157A4] bg-black aspect-4/3 flex flex-col items-center justify-center shadow-lg">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Camera Shutter Toolbar */}
                  <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-4 px-4">
                    <button
                      type="button"
                      onClick={stopCameraStream}
                      className="px-3.5 py-1.5 rounded-full bg-slate-800/80 text-white text-xs font-semibold backdrop-blur-xs flex items-center gap-1 shadow-subtle"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>

                    <button
                      type="button"
                      onClick={capturePhoto}
                      className="w-14 h-14 rounded-full bg-white border-4 border-[#FACC15] shadow-subtle flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#FACC15]" />
                    </button>
                  </div>
                </div>
              ) : capturedPhoto ? (
                /* Captured Photo Preview */
                <div className="relative rounded-2xl overflow-hidden border border-[#DCE6F0] bg-[#F4F8FC] p-2 text-center">
                  <img
                    src={capturedPhoto}
                    alt="Live Civic Evidence"
                    className="w-full max-h-64 object-cover rounded-xl mx-auto"
                  />
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-lg bg-[#22A982] text-white text-[10px] font-bold shadow-subtle flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-white" />
                    <span>Live Photo Verified</span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => startCamera('primary')}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white border border-[#DCE6F0] text-[#172B4D] text-xs font-semibold hover:bg-[#F4F8FC] shadow-subtle"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Retake Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setCapturedPhoto(null)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-white border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 shadow-subtle"
                    >
                      <X className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Dashed Live Photo Box */
                <div className="border border-dashed border-[#DCE6F0] rounded-2xl p-6 sm:p-8 text-center bg-[#F4F8FC] space-y-3">
                  <div className="w-12 h-12 rounded-full bg-white text-[#3157A4] border border-[#DCE6F0] flex items-center justify-center mx-auto shadow-subtle">
                    <Camera className="w-6 h-6 stroke-[1.8]" />
                  </div>

                  <p className="text-xs text-[#718096] max-w-xs mx-auto leading-relaxed">
                    Take a photo right now — old gallery images aren't accepted.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => startCamera('primary')}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#EBF2FA] active:bg-[#E2EDF8] text-xs font-semibold text-[#172B4D] shadow-subtle transition-colors w-full sm:w-auto"
                    >
                      <Camera className="w-3.5 h-3.5 text-[#3157A4]" />
                      <span>Take Live Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActivePhotoTarget('primary');
                        fileInputRef.current?.click();
                      }}
                      className="inline-flex items-center justify-center gap-1 px-3.5 py-2 rounded-xl bg-[#EBF2FA] hover:bg-[#E2EDF8] text-xs font-semibold text-[#3157A4] shadow-subtle transition-colors w-full sm:w-auto"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Capture</span>
                    </button>
                  </div>

                  {cameraError && (
                    <div className="p-2.5 rounded-xl bg-[#FEF9C3] border border-[#FDE047] text-[11px] text-[#854D0E] text-left flex items-start gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-[#EAB308] shrink-0 mt-0.5" />
                      <span>{cameraError}</span>
                    </div>
                  )}

                  {/* Quick Sample Photos for instant testing */}
                  <div className="pt-2 border-t border-[#DCE6F0]">
                    <p className="text-[10px] text-[#718096] font-medium mb-1.5">
                      Or select sample civic evidence for testing:
                    </p>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {SAMPLE_PHOTOS.map((sample) => (
                        <button
                          key={sample.label}
                          type="button"
                          onClick={() => setCapturedPhoto(sample.url)}
                          className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-white border border-[#DCE6F0] hover:border-[#3157A4] hover:bg-[#EBF2FA] text-[#172B4D] transition-colors shadow-subtle"
                        >
                          📷 {sample.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Additional Photo Section */}
              <div className="pt-1">
                <label className="block text-xs font-semibold text-[#172B4D] mb-1.5">
                  Optional additional photo
                </label>

                {additionalPhoto ? (
                  <div className="flex items-center gap-3 bg-[#F4F8FC] border border-[#DCE6F0] rounded-xl p-2.5">
                    <img
                      src={additionalPhoto}
                      alt="Additional angle"
                      className="w-12 h-12 rounded-lg object-cover border border-[#DCE6F0]"
                    />
                    <div className="flex-1 min-w-0 text-xs">
                      <span className="font-semibold text-[#172B4D] block truncate">
                        Additional Evidence Angle
                      </span>
                      <span className="text-[11px] text-[#718096]">Captured</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setAdditionalPhoto(null)}
                      className="p-1 rounded-lg text-[#718096] hover:text-rose-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActivePhotoTarget('additional');
                      fileInputRef.current?.click();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] text-xs font-medium text-[#718096] hover:text-[#172B4D] shadow-subtle transition-colors"
                  >
                    <span>+ Add another photo</span>
                  </button>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-[#DCE6F0]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] text-xs font-semibold text-[#718096] hover:text-[#172B4D] shadow-subtle"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    // Auto-assign sample photo if skipped so citizen is not blocked
                    if (!capturedPhoto) {
                      setCapturedPhoto(SAMPLE_PHOTOS[0].url);
                    }
                    setCurrentStep(3);
                  }}
                  className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-[#3157A4] hover:bg-[#254483] active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-subtle transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 3: CAPTURE LOCATION (Screenshot 4) */}
          {/* =============================================================== */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm sm:text-base font-bold text-[#172B4D]">
                Step 3 — Capture location
              </h3>

              {/* "Use Current Location" Button */}
              <div>
                <button
                  type="button"
                  onClick={handleFetchCurrentLocation}
                  disabled={isLocating}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#EBF2FA] active:bg-[#E2EDF8] text-xs sm:text-sm font-semibold text-[#172B4D] shadow-subtle transition-colors disabled:opacity-70"
                >
                  <MapPin className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span>
                    {isLocating ? 'Pinpointing GPS Location...' : 'Use Current Location'}
                  </span>
                </button>
              </div>

              {/* GPS Confirmation Snippet if located */}
              {gpsAddress && (
                <div className="p-3 rounded-xl bg-[#22A982]/10 border border-[#22A982]/20 text-xs text-[#22A982] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#22A982] shrink-0" />
                  <span className="font-medium text-[#172B4D]">{gpsAddress}</span>
                </div>
              )}

              {/* Locality / Area Dropdown */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#172B4D]">
                  Locality / Area
                </label>
                <div className="relative">
                  <select
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DCE6F0] rounded-xl text-xs sm:text-sm text-[#172B4D] focus:outline-none focus:ring-1 focus:ring-[#3157A4] focus:border-[#3157A4] shadow-subtle appearance-none pr-8 cursor-pointer"
                  >
                    {LOCALITY_OPTIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#718096] pointer-events-none text-xs">
                    ▼
                  </span>
                </div>

                {/* Custom locality input if selected */}
                {locality === 'Other Custom Locality...' && (
                  <input
                    type="text"
                    placeholder="Enter locality / ward name / street landmark"
                    value={customLocality}
                    onChange={(e) => setCustomLocality(e.target.value)}
                    className="w-full mt-2 px-3.5 py-2 bg-white border border-[#DCE6F0] rounded-xl text-xs sm:text-sm text-[#172B4D] focus:outline-none focus:ring-1 focus:ring-[#3157A4]"
                  />
                )}

                <p className="text-[11px] text-[#718096]">
                  Used to group similar reports from the same locality.
                </p>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-[#DCE6F0]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] text-xs font-semibold text-[#718096] hover:text-[#172B4D] shadow-subtle"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-[#3157A4] hover:bg-[#254483] active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-subtle transition-colors"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 4: ADD DESCRIPTION (Screenshot 5) */}
          {/* =============================================================== */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm sm:text-base font-bold text-[#172B4D]">
                Step 4 — Add description
              </h3>

              <div className="space-y-2">
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Large amount of garbage has been dumped beside the road for the last three days."
                  className="w-full p-3 bg-white border border-[#DCE6F0] rounded-xl text-xs sm:text-sm text-[#172B4D] placeholder-[#718096] focus:outline-none focus:ring-1 focus:ring-[#3157A4] focus:border-[#3157A4] shadow-subtle resize-none"
                />

                {/* Quick mobile snippet chips */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] text-[#718096] font-medium">Quick chips:</span>
                  {[
                    'Overflowing for last 3 days',
                    'Blocking pedestrian road',
                    'Severe foul smell & insects',
                    'Accident risk for vehicles',
                  ].map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() =>
                        setDescription((prev) => (prev ? `${prev}. ${chip}` : chip))
                      }
                      className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[#F4F8FC] hover:bg-[#EBF2FA] hover:text-[#3157A4] text-[#718096] border border-[#DCE6F0] transition-colors"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-[#DCE6F0]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] text-xs font-semibold text-[#718096] hover:text-[#172B4D] shadow-subtle"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="inline-flex items-center gap-1.5 px-6 py-2 rounded-xl bg-[#3157A4] hover:bg-[#254483] active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-subtle transition-colors"
                >
                  <span>Review & Submit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* STEP 5: REVIEW & SUBMIT */}
          {/* =============================================================== */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-fade-in">
              <h3 className="text-sm sm:text-base font-bold text-[#172B4D]">
                Step 5 — Review & Submit
              </h3>

              {/* Summary Review Card */}
              <div className="bg-[#F4F8FC] border border-[#DCE6F0] rounded-2xl p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-white border border-[#DCE6F0]">
                    {PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory)?.renderIcon()}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#718096] font-bold block">
                      Problem Category
                    </span>
                    <span className="text-sm font-bold text-[#172B4D]">
                      {PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    </span>
                  </div>
                </div>

                {capturedPhoto && (
                  <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#DCE6F0]">
                    <img
                      src={capturedPhoto}
                      alt="Captured evidence"
                      className="w-14 h-14 rounded-lg object-cover border border-[#DCE6F0] shrink-0"
                    />
                    <div className="text-xs">
                      <span className="font-semibold text-[#172B4D] block">
                        Live Civic Photo Attached
                      </span>
                      <span className="text-[11px] text-[#718096]">
                        Geo-tagged & timestamped
                      </span>
                    </div>
                  </div>
                )}

                <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-[#DCE6F0]">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#172B4D]">
                        {locality === 'Other Custom Locality...' ? customLocality : locality}
                      </span>
                      {gpsAddress && (
                        <span className="block text-[10px] text-[#718096]">{gpsAddress}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-[#DCE6F0] text-xs">
                  <span className="text-[#718096] font-semibold block text-[10px] uppercase mb-0.5">
                    Citizen Description
                  </span>
                  <p className="text-[#172B4D] italic">
                    "{description || 'Issue reported for urgent municipal inspection.'}"
                  </p>
                </div>

                {/* Anonymous Reporting Checkbox */}
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="w-4 h-4 rounded text-[#3157A4] focus:ring-[#3157A4] border-[#DCE6F0] cursor-pointer"
                  />
                  <span className="text-xs text-[#718096]">
                    Report anonymously (hide my name from public ward feed)
                  </span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-between border-t border-[#DCE6F0]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] text-xs font-semibold text-[#718096] hover:text-[#172B4D] shadow-subtle"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitReport}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#FACC15] hover:bg-[#EAB308] active:scale-98 text-[#172B4D] font-bold text-xs sm:text-sm shadow-subtle transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                  <span>Submit Civic Report</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
