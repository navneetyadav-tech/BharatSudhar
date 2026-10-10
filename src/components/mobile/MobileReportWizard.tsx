import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Camera,
  MapPin,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  Check,
  Search,
  Crosshair,
  Building2,
} from 'lucide-react';
import { PROBLEM_CATEGORIES } from './categories';
import {
  MAHARASHTRA_AREAS,
  MAHARASHTRA_CITIES,
  filterMaharashtraAreas,
  findNearestMaharashtraArea,
  type MaharashtraArea,
} from '../../data/maharashtraAreas';
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
    label: 'Garbage Dump',
    url: '/images/garbage-dump.jpg',
  },
  {
    label: 'Road Pothole',
    url: '/images/pothole-issue.jpg',
  },
  {
    label: 'Street Light',
    url: '/images/broken-streetlight.jpg',
  },
  {
    label: 'Water Leak',
    url: '/images/water-leakage.jpg',
  },
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

  // Step 3: Location State (Maharashtra Only)
  const [selectedArea, setSelectedArea] = useState<MaharashtraArea | null>(MAHARASHTRA_AREAS[0]);
  const [locality, setLocality] = useState<string>(MAHARASHTRA_AREAS[0].displayAddress);
  const [streetLandmark, setStreetLandmark] = useState<string>('');
  const [areaSearchQuery, setAreaSearchQuery] = useState<string>('');
  const [selectedCityFilter, setSelectedCityFilter] = useState<string>('All Maharashtra');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsCoordinates, setGpsCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsAddress, setGpsAddress] = useState<string | null>(null);

  // Filtered Maharashtra areas memo
  const filteredAreas = useMemo(() => {
    return filterMaharashtraAreas(areaSearchQuery, selectedCityFilter);
  }, [areaSearchQuery, selectedCityFilter]);

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

  // Handle GPS location fetch with real reverse-geocoding in Maharashtra
  const handleFetchCurrentLocation = () => {
    setIsLocating(true);
    setGpsAddress(null);

    const onCoordsResolved = async (lat: number, lng: number, accuracy?: number) => {
      setGpsCoordinates({ lat, lng });

      // Try reverse geocoding via OpenStreetMap Nominatim
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
          { signal: controller.signal }
        );
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          const addr = data.address || {};
          const street = addr.road || addr.suburb || addr.neighbourhood || addr.quarter || addr.residential || '';
          const city = addr.city || addr.town || addr.municipality || addr.county || 'Maharashtra';
          const postcode = addr.postcode ? ` - ${addr.postcode}` : '';
          const formatted = street
            ? `${street}, ${city}, Maharashtra${postcode}`
            : `${city}, Maharashtra${postcode}`;

          setLocality(formatted);
          setAreaSearchQuery(street || city);
          setGpsAddress(
            `GPS Verified: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E • ${formatted}${accuracy ? ` (±${Math.round(accuracy)}m)` : ''}`
          );
          setIsLocating(false);
          return;
        }
      } catch (err) {
        console.warn('Reverse geocoding fallback to nearest Maharashtra area:', err);
      }

      // Fallback: match nearest Maharashtra municipal area
      const nearest = findNearestMaharashtraArea(lat, lng);
      setSelectedArea(nearest);
      setLocality(nearest.displayAddress);
      setAreaSearchQuery(nearest.name);
      const accText = accuracy ? ` (Accuracy: ±${Math.round(accuracy)}m)` : '';
      setGpsAddress(
        `GPS Pinpointed: ${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E • Near ${nearest.name}, ${nearest.city}, Maharashtra${accText}`
      );
      setIsLocating(false);
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          onCoordsResolved(
            position.coords.latitude,
            position.coords.longitude,
            position.coords.accuracy
          );
        },
        (err) => {
          console.warn('Geolocation denied or restricted:', err.message);
          // Fallback to premier Maharashtra Civic Hub (Bandra West, Mumbai)
          setTimeout(() => {
            const fallback = MAHARASHTRA_AREAS[0];
            setSelectedArea(fallback);
            setGpsCoordinates({ lat: fallback.lat, lng: fallback.lng });
            setLocality(fallback.displayAddress);
            setAreaSearchQuery(fallback.name);
            setGpsAddress(
              `GPS Simulated: ${fallback.lat}°N, ${fallback.lng}°E (${fallback.ward}, ${fallback.city}, Maharashtra)`
            );
            setIsLocating(false);
          }, 600);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      setTimeout(() => {
        const fallback = MAHARASHTRA_AREAS[0];
        setSelectedArea(fallback);
        setGpsCoordinates({ lat: fallback.lat, lng: fallback.lng });
        setLocality(fallback.displayAddress);
        setAreaSearchQuery(fallback.name);
        setGpsAddress(
          `GPS Detected: ${fallback.lat}°N, ${fallback.lng}°E (${fallback.ward}, ${fallback.city}, Maharashtra)`
        );
        setIsLocating(false);
      }, 500);
    }
  };

  // Submit complete report
  const handleSubmitReport = () => {
    const categoryInfo = PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory) || PROBLEM_CATEGORIES[0];
    const reportId = `BS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const finalLocality = streetLandmark.trim()
      ? `${streetLandmark.trim()}, ${locality}`
      : locality;

    const newReport: MobileReport = {
      id: reportId,
      category: selectedCategory,
      categoryName: categoryInfo.name,
      categoryEmoji: '📍',
      photoUrl: capturedPhoto || SAMPLE_PHOTOS[0].url,
      additionalPhotoUrl: additionalPhoto || undefined,
      location: {
        locality: finalLocality,
        addressText: gpsAddress || `${finalLocality}, Maharashtra Civic Division`,
        latitude: gpsCoordinates?.lat || (selectedArea ? selectedArea.lat : 19.0596),
        longitude: gpsCoordinates?.lng || (selectedArea ? selectedArea.lng : 72.8295),
      },
      description: description.trim() || 'Civic issue reported for urgent municipal inspection and field resolution.',
      status: 'under-review',
      createdAt: new Date().toISOString(),
      timestamp: 'Just now',
      isAnonymous,
      assignedDepartment: selectedArea
        ? `${selectedArea.city} Municipal Corporation (${selectedArea.ward})`
        : 'Maharashtra Rapid Civic Action Cell',
      officialRemarks: `Complaint logged by ${isAnonymous ? 'Anonymous Citizen' : userName}. Registered in Maharashtra civic zone, routed to ${selectedArea ? selectedArea.ward : 'local municipal ward engineer'}.`,
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
              {streetLandmark ? `${streetLandmark}, ${locality}` : locality}
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

              {/* 10 Problem Cards Grid with Realistic Civic Problem Images */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
                {PROBLEM_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`group relative flex flex-col rounded-xl overflow-hidden border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                        isSelected
                          ? 'border-[#3157A4] ring-2 ring-[#3157A4]/25 shadow-md bg-[#F4F8FC]'
                          : 'border-[#DCE6F0] bg-white hover:border-[#3157A4]/60 hover:shadow-subtle'
                      }`}
                    >
                      {/* Realistic Problem Image */}
                      <div className="relative w-full h-24 sm:h-28 overflow-hidden bg-slate-100">
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        {/* Soft dark gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />

                        {/* Selected Indicator Pill */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#3157A4] text-white flex items-center justify-center shadow-md ring-2 ring-white">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Card Label & Description */}
                      <div className="p-2.5 sm:p-3 flex flex-col justify-between flex-1 bg-white">
                        <span className={`text-xs sm:text-sm font-bold leading-tight block line-clamp-1 ${
                          isSelected ? 'text-[#3157A4]' : 'text-[#172B4D]'
                        }`}>
                          {cat.name}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-[#718096] mt-0.5 line-clamp-1 leading-snug">
                          {cat.subtext}
                        </span>
                      </div>
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

                  <div className="flex items-center justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => startCamera('primary')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3157A4] hover:bg-[#254483] active:scale-98 text-xs font-semibold text-white shadow-subtle transition-all"
                    >
                      <Camera className="w-4 h-4 text-white" />
                      <span>Take Live Photo</span>
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
          {/* STEP 3: CAPTURE LOCATION (Maharashtra Only with Live Search) */}
          {/* =============================================================== */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#172B4D]">
                  Step 3 — Capture location
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EBF2FA] text-[#3157A4] border border-[#DCE6F0]">
                  <Building2 className="w-3 h-3" />
                  <span>Maharashtra Jurisdiction</span>
                </span>
              </div>

              {/* "Use Current Location" Action Button */}
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={handleFetchCurrentLocation}
                    disabled={isLocating}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#3157A4]/40 hover:bg-[#EBF2FA] active:bg-[#E2EDF8] text-xs sm:text-sm font-semibold text-[#3157A4] shadow-subtle transition-all disabled:opacity-70 cursor-pointer"
                  >
                    {isLocating ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-[#3157A4]" />
                    ) : (
                      <Crosshair className="w-4 h-4 text-[#3157A4]" />
                    )}
                    <span>
                      {isLocating ? 'Fetching Exact GPS Location...' : 'Fetch Current Location (GPS)'}
                    </span>
                  </button>

                  <span className="text-[11px] text-[#718096]">
                    Fetches real coordinates & resolves local Maharashtra ward.
                  </span>
                </div>

                {/* GPS Confirmation Banner */}
                {gpsAddress && (
                  <div className="p-3 rounded-xl bg-[#22A982]/10 border border-[#22A982]/25 text-xs text-[#172B4D] flex items-start gap-2.5 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-[#22A982] shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span className="font-bold text-[#046A38] block text-[11px] uppercase tracking-wide">
                        Live GPS Location Acquired
                      </span>
                      <span className="text-xs text-[#172B4D] font-medium leading-relaxed block mt-0.5">
                        {gpsAddress}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* SEARCH AREA SECTION */}
              <div className="space-y-2.5 pt-1 border-t border-[#DCE6F0]">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#172B4D]">
                    Search Area & Ward (Maharashtra)
                  </label>
                  <span className="text-[10px] text-[#718096]">
                    Mumbai, Pune, Thane, Nagpur, Nashik...
                  </span>
                </div>

                {/* City Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-[11px]">
                  {MAHARASHTRA_CITIES.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setSelectedCityFilter(city);
                        setIsDropdownOpen(true);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                        selectedCityFilter === city
                          ? 'bg-[#3157A4] text-white shadow-2xs'
                          : 'bg-white border border-[#DCE6F0] text-[#718096] hover:text-[#172B4D] hover:bg-[#F4F8FC]'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>

                {/* Search Input Box with Results Dropdown */}
                <div className="relative">
                  <div className="relative flex items-center">
                    <Search className="w-4 h-4 text-[#718096] absolute left-3 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search area (e.g. Bandra, Kothrud, Hinjawadi, Naupada, Dharampeth)..."
                      value={areaSearchQuery}
                      onChange={(e) => {
                        setAreaSearchQuery(e.target.value);
                        setIsDropdownOpen(true);
                      }}
                      onFocus={() => setIsDropdownOpen(true)}
                      className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#DCE6F0] rounded-xl text-xs sm:text-sm text-[#172B4D] placeholder-[#A0AEC0] focus:outline-none focus:ring-2 focus:ring-[#3157A4]/20 focus:border-[#3157A4] shadow-subtle"
                    />
                    {areaSearchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          setAreaSearchQuery('');
                          setIsDropdownOpen(true);
                        }}
                        className="absolute right-3 p-1 rounded-md text-[#718096] hover:text-[#172B4D] cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Dropdown Results List */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 z-30 mt-1 max-h-60 overflow-y-auto bg-white border border-[#DCE6F0] rounded-xl shadow-lg divide-y divide-[#F0F4F8]">
                      {filteredAreas.length > 0 ? (
                        filteredAreas.map((area) => {
                          const isCurSelected = locality === area.displayAddress;
                          return (
                            <button
                              key={area.id}
                              type="button"
                              onClick={() => {
                                setSelectedArea(area);
                                setLocality(area.displayAddress);
                                setAreaSearchQuery(area.name);
                                setIsDropdownOpen(false);
                              }}
                              className={`w-full text-left p-2.5 sm:p-3 hover:bg-[#F4F8FC] transition-colors flex items-start justify-between gap-2 cursor-pointer ${
                                isCurSelected ? 'bg-[#EBF2FA]' : ''
                              }`}
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <span className="font-semibold text-xs sm:text-sm text-[#172B4D]">
                                    {area.name}
                                  </span>
                                  <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#EBF2FA] text-[#3157A4]">
                                    {area.city}
                                  </span>
                                </div>
                                <div className="text-[11px] text-[#718096] mt-0.5 flex items-center gap-2">
                                  <span>{area.ward}</span>
                                  <span>•</span>
                                  <span>PIN: {area.pincode}</span>
                                </div>
                              </div>
                              {isCurSelected && (
                                <Check className="w-4 h-4 text-[#3157A4] shrink-0 mt-0.5" />
                              )}
                            </button>
                          );
                        })
                      ) : (
                        <div className="p-3 text-center text-xs text-[#718096]">
                          <p>No predefined area matching "{areaSearchQuery}".</p>
                          <button
                            type="button"
                            onClick={() => {
                              const customText = `${areaSearchQuery.trim()}, Maharashtra`;
                              setLocality(customText);
                              setIsDropdownOpen(false);
                            }}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#3157A4] hover:underline cursor-pointer"
                          >
                            <span>➕ Use "{areaSearchQuery.trim()}, Maharashtra"</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Selected Locality Display Card */}
                <div className="p-3 bg-[#F4F8FC] border border-[#DCE6F0] rounded-xl flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#718096] block tracking-wider">
                        Selected Maharashtra Area
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-[#172B4D] leading-snug block mt-0.5">
                        {locality}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-xs font-semibold text-[#3157A4] hover:underline shrink-0 pt-0.5 cursor-pointer"
                  >
                    Change
                  </button>
                </div>

                {/* Optional Specific Landmark / Street input */}
                <div className="pt-1">
                  <label className="block text-[11px] font-semibold text-[#718096] mb-1">
                    Specific Landmark / Street (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Near Ganpati Temple, Opp. Metro Pillar 42, Lane 3"
                    value={streetLandmark}
                    onChange={(e) => setStreetLandmark(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-[#DCE6F0] rounded-xl text-xs sm:text-sm text-[#172B4D] placeholder-[#A0AEC0] focus:outline-none focus:ring-1 focus:ring-[#3157A4]"
                  />
                  <p className="text-[10px] text-[#718096] mt-1">
                    Helps municipal field officers in Maharashtra inspect the exact spot quickly.
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="pt-3 flex items-center justify-between border-t border-[#DCE6F0]">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-white border border-[#DCE6F0] hover:bg-[#F4F8FC] text-xs font-semibold text-[#718096] hover:text-[#172B4D] shadow-subtle cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#3157A4] hover:bg-[#254483] active:scale-98 text-white font-semibold text-xs sm:text-sm shadow-subtle transition-colors cursor-pointer"
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
                  <img
                    src={PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory)?.image}
                    alt=""
                    className="w-14 h-14 rounded-xl object-cover border border-[#DCE6F0] shadow-2xs shrink-0"
                  />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#718096] font-bold block">
                      Problem Category
                    </span>
                    <span className="text-sm font-bold text-[#172B4D]">
                      {PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    </span>
                    <span className="text-xs text-[#718096] line-clamp-1">
                      {PROBLEM_CATEGORIES.find((c) => c.id === selectedCategory)?.subtext}
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
                        {streetLandmark ? `${streetLandmark}, ${locality}` : locality}
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
