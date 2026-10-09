import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  MapPin,
  Crosshair,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  X,
  UploadCloud,
  Sparkles,
  Navigation,
  Send,
  Trash2,
  ShieldCheck,
  Building,
  Milestone,
  ChevronDown,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { FormField } from '../forms/FormField';
import { Textarea } from '../forms/Textarea';
import { useAuth } from '../../context/AuthContext';
import type { DashboardGrievance, IssueCategory, IssuePriority } from '../../types';

interface RegisterComplaintFormProps {
  onComplaintRegistered: (grievance: DashboardGrievance) => void;
  onCancel?: () => void;
}

const COMPLAINT_TYPES: {
  value: IssueCategory;
  label: string;
  icon: string;
  description: string;
  suggestedPriority: IssuePriority;
}[] = [
  {
    value: 'roads-infrastructure',
    label: 'Roads & Infrastructure (Potholes, broken roads, damaged footpaths)',
    icon: '🛣️',
    description: 'Cratered roads, broken curb stones, open manholes, damaged sidewalks.',
    suggestedPriority: 'high',
  },
  {
    value: 'cleanliness',
    label: 'Swachhata & Waste Management (Garbage dumps, overflowing bins)',
    icon: '🗑️',
    description: 'Unattended waste heaps, open dumping, dead animal carcass, dirty public spaces.',
    suggestedPriority: 'medium',
  },
  {
    value: 'water-drainage',
    label: 'Water Supply & Sewerage (Pipeline leaks, blocked drains, waterlogging)',
    icon: '💧',
    description: 'Freshwater line bursts, sewage overflow, contaminated tap water, blocked nullah.',
    suggestedPriority: 'urgent',
  },
  {
    value: 'street-lighting',
    label: 'Street Lighting & Electrical (Dark stretches, broken poles)',
    icon: '💡',
    description: 'Non-functional street lamps, dangling high-voltage wires, damaged feeder pillars.',
    suggestedPriority: 'medium',
  },
  {
    value: 'traffic-safety',
    label: 'Traffic & Road Safety (Broken dividers, missing signage, blind spots)',
    icon: '🚦',
    description: 'Damaged crash barriers, broken signal lights, illegal parking causing gridlock.',
    suggestedPriority: 'high',
  },
  {
    value: 'parks-greenery',
    label: 'Parks & Urban Greenery (Fallen trees, wild bushes obstructing paths)',
    icon: '🌳',
    description: 'Dangerous overhanging branches, dry trees at risk of falling, unmaintained parks.',
    suggestedPriority: 'low',
  },
  {
    value: 'other',
    label: 'Other Civic & Public Nuisance (Encroachments, stray hazards, noise)',
    icon: '📢',
    description: 'Encroachment on public pavements, unauthorized construction, stray dog packs.',
    suggestedPriority: 'medium',
  },
];

export function RegisterComplaintForm({
  onComplaintRegistered,
  onCancel,
}: RegisterComplaintFormProps) {
  const { user } = useAuth();

  // Form State
  const [complaintType, setComplaintType] = useState<IssueCategory>('roads-infrastructure');
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('high');
  const [description, setDescription] = useState('');

  // Structured Address State
  const [area, setArea] = useState('');
  const [road, setRoad] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState(user?.city || 'New Delhi');
  const [ward, setWard] = useState(user?.ward || 'Ward 45-B');
  const [pincode, setPincode] = useState(user?.pincode || '110024');
  const reporterName = user?.name || 'Verified Citizen';

  // Live Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Live Location State
  const [isLocating, setIsLocating] = useState(false);
  const [locationCoords, setLocationCoords] = useState<{
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: string;
  } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Stop camera stream safely when component unmounts or camera is closed
  useEffect(() => {
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [cameraStream]);

  // Bind video element to stream when camera becomes active
  useEffect(() => {
    if (isCameraActive && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch((err) => {
        console.warn('Video play error:', err);
      });
    }
  }, [isCameraActive, cameraStream]);

  // Update suggested priority when category changes
  const handleCategoryChange = (cat: IssueCategory) => {
    setComplaintType(cat);
    const matched = COMPLAINT_TYPES.find((c) => c.value === cat);
    if (matched) {
      setPriority(matched.suggestedPriority);
    }
  };

  // 1. Live Camera Handlers
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera is not supported on this browser or device.');
      }

      // Stop any existing stream first
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (err: unknown) {
      const errorMsg =
        err instanceof Error ? err.message : 'Unable to access device camera.';
      setCameraError(
        `${errorMsg} You can use "Browse Gallery" below to attach a photo.`
      );
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraActive(false);
  };

  const capturePhotoFromCamera = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw video frame
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Overlay Bharat Sudhar official verification stamp watermark
    const now = new Date();
    const timestampStr = `${now.toLocaleDateString('en-IN')} ${now.toLocaleTimeString('en-IN')}`;
    const gpsStr = locationCoords
      ? `GPS: ${locationCoords.latitude.toFixed(5)}°N, ${locationCoords.longitude.toFixed(5)}°E`
      : 'CIVIC VERIFIED PHOTO';

    // Dark gradient pill at bottom for readable watermark
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.fillRect(0, canvas.height - 48, canvas.width, 48);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(`BHARAT SUDHAR • ${timestampStr}`, 16, canvas.height - 26);

    ctx.fillStyle = '#facc15'; // lemon accent
    ctx.font = '13px sans-serif';
    ctx.fillText(gpsStr, 16, canvas.height - 10);

    const dataUrl = canvas.toDataURL('image/jpeg', 0.88);
    setCapturedPhoto(dataUrl);
    stopCamera();
  };

  // Fallback: Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setCameraError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setCapturedPhoto(event.target.result as string);
        setCameraError(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setCapturedPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 2. Live GPS Location Handler
  const fetchLiveLocation = () => {
    setLocationError(null);
    setIsLocating(true);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: Math.round(position.coords.accuracy),
          timestamp: new Date().toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        };
        setLocationCoords(coords);
        setIsLocating(false);

        // Smart auto-fill hints if fields are still blank
        if (!area) setArea('Defence Colony / Lajpat Nagar');
        if (!road) setRoad('Ring Road Junction');
        if (!landmark) setLandmark('Near Metro Station Pillar #142');
      },
      (error) => {
        setIsLocating(false);
        let message = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          message = 'Location permission was denied. You can manually enter your area and road below.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          message = 'Location request timed out. Please try again.';
        }
        setLocationError(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // 3. Form Validation & Submission
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!area.trim()) errors.area = 'Area / Colony is required';
    if (!road.trim()) errors.road = 'Road or Street name is required';
    if (!landmark.trim()) errors.landmark = 'Nearest landmark is required';
    if (!description.trim() || description.trim().length < 10) {
      errors.description = 'Please write at least 10 characters describing the issue.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const generatedId = `BS-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullAddress = `${landmark.trim()}, ${road.trim()}, ${area.trim()}, ${city} - ${pincode}`;
    const generatedTitle =
      title.trim() ||
      `${COMPLAINT_TYPES.find((c) => c.value === complaintType)?.label.split('(')[0].trim() || 'Civic Issue'} on ${road.trim()}`;

    const newGrievance: DashboardGrievance = {
      id: generatedId,
      title: generatedTitle,
      description: description.trim(),
      category: complaintType,
      status: 'submitted',
      priority,
      location: {
        address: fullAddress,
        city,
        ward,
        pincode,
        area: area.trim(),
        road: road.trim(),
        landmark: landmark.trim(),
        latitude: locationCoords?.latitude,
        longitude: locationCoords?.longitude,
      },
      photo: capturedPhoto || undefined,
      livePhoto: capturedPhoto || undefined,
      coordinates: locationCoords
        ? {
            latitude: locationCoords.latitude,
            longitude: locationCoords.longitude,
            accuracy: locationCoords.accuracy,
            addressText: fullAddress,
          }
        : undefined,
      reportedAt: 'Just now',
      updatedAt: 'Just now',
      upvotes: 1,
      reportedBy: reporterName,
      stepIndex: 0,
      progressPercent: 20,
      estimatedResolution: 'Triage within 4 hours by Ward Cell',
      officialRemarks: 'Grievance recorded in municipal ledger. Assigned to Ward 45-B rapid response dispatch.',
      timeline: [
        {
          id: `t-${Date.now()}`,
          title: 'Grievance Registered by Citizen',
          timestamp: 'Just now',
          stage: 'submitted',
          actor: `${reporterName} (${user?.role || 'Citizen Reporter'})`,
          description: description.trim(),
          photoUrl: capturedPhoto || undefined,
          isCompleted: true,
          isCurrent: true,
        },
        {
          id: `t2-${Date.now()}`,
          title: 'Ward Triage & Acknowledgment',
          timestamp: 'Scheduled within 4h',
          stage: 'acknowledged',
          actor: 'Ward 45-B Control Room',
          description: 'Geographic validation and field contractor work-order issue.',
          isCompleted: false,
        },
        {
          id: `t3-${Date.now()}`,
          title: 'Field Team & Material Dispatched',
          timestamp: 'Pending work order',
          stage: 'dispatched',
          actor: 'MCD Zone Maintenance Crew',
          description: 'On-site repair and rectification execution.',
          isCompleted: false,
        },
        {
          id: `t4-${Date.now()}`,
          title: 'Quality Audit & Verified Resolution',
          timestamp: 'Pending closure',
          stage: 'resolved',
          actor: 'Civic Quality Inspector',
          description: 'Citizen satisfaction callback & GPS photo audit.',
          isCompleted: false,
        },
      ],
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onComplaintRegistered(newGrievance);
    }, 500);
  };

  return (
    <Card className="border border-slate-200/90 shadow-sm rounded-2xl overflow-hidden bg-white">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-chakra-900 via-chakra-950 to-slate-900 text-white p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-saffron-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron-500/20 border border-saffron-400/30 text-xs font-bold text-saffron-300">
              <Sparkles className="w-3.5 h-3.5" />
              Official Municipal Grievance Ledger
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Register Civic Complaint
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              File a geotagged grievance with live camera photo, GPS coordinates, and detailed location to trigger prompt municipal action.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
            <span className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Official Municipal Filing
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
        {/* ================================================================= */}
        {/* SECTION 1: COMPLAINT TYPE (DROPDOWN LIST) */}
        {/* ================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold flex items-center justify-center">
              1
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Select Type of Complaint
            </h3>
            <span className="text-xs text-rose-500 font-semibold">*Required</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <FormField
                label="Type of Civic Complaint (Dropdown List)"
                helperText="Choose the category that matches your grievance for automatic routing to the relevant municipal department."
                required
              >
                <div className="relative">
                  <select
                    value={complaintType}
                    onChange={(e) => handleCategoryChange(e.target.value as IssueCategory)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 appearance-none shadow-xs pr-10 cursor-pointer"
                  >
                    {COMPLAINT_TYPES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </FormField>

              {/* Dynamic helper description of selected complaint type */}
              <div className="mt-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 rounded-lg p-2.5 flex items-center gap-2">
                <span className="text-base">
                  {COMPLAINT_TYPES.find((c) => c.value === complaintType)?.icon}
                </span>
                <span>
                  {COMPLAINT_TYPES.find((c) => c.value === complaintType)?.description}
                </span>
              </div>
            </div>

            {/* Urgency / Priority Selection */}
            <div>
              <FormField
                label="Urgency Level"
                helperText="Severity of public hazard"
                required
              >
                <div className="relative">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as IssuePriority)}
                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500 appearance-none shadow-xs pr-10 cursor-pointer"
                  >
                    <option value="low">🟢 Low — Routine Maintenance</option>
                    <option value="medium">🟡 Medium — Public Inconvenience</option>
                    <option value="high">🟠 High — Disrupting Traffic</option>
                    <option value="urgent">🔴 Urgent — Safety/Health Hazard</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </FormField>
            </div>
          </div>

          {/* Optional Short Title Field */}
          <FormField
            label="Complaint Summary / Title (Optional)"
            helperText="Leave blank to automatically use standard municipal summary."
          >
            <Input
              placeholder="e.g. Deep pothole crater near Metro Pillar 142"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-sm font-medium"
            />
          </FormField>
        </div>

        {/* ================================================================= */}
        {/* SECTION 2: LIVE CAMERA PHOTO & LIVE GPS LOCATION */}
        {/* ================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold flex items-center justify-center">
              2
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Live Camera Photo & Live GPS Location
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              (High priority for field teams)
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* SUB-SECTION 2A: LIVE CAMERA PHOTO */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                Live Photo Proof (Take by Camera)
              </label>

              {/* If camera is currently active: show live video viewfinder */}
              {isCameraActive ? (
                <div className="relative rounded-2xl overflow-hidden bg-black border-2 border-saffron-500 shadow-lg">
                  <video
                    ref={videoRef}
                    playsInline
                    autoPlay
                    muted
                    className="w-full h-64 object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Viewfinder crosshairs overlay */}
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div className="w-48 h-32 border-2 border-dashed border-white/60 rounded-xl flex items-center justify-center">
                      <Crosshair className="w-6 h-6 text-white/70" />
                    </div>
                  </div>

                  {/* Camera Toolbar */}
                  <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-3 px-4">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={stopCamera}
                      leftIcon={<X className="w-4 h-4" />}
                      className="text-xs font-bold shadow-md"
                    >
                      Cancel
                    </Button>
                    <button
                      type="button"
                      onClick={capturePhotoFromCamera}
                      className="px-5 py-2.5 rounded-full bg-saffron-600 hover:bg-saffron-500 text-white font-bold text-sm shadow-xl flex items-center gap-2 transition-transform active:scale-95 border-2 border-white"
                    >
                      <Camera className="w-4 h-4" />
                      Capture Photo
                    </button>
                  </div>
                </div>
              ) : capturedPhoto ? (
                /* Photo has been captured: show preview */
                <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 group">
                  <img
                    src={capturedPhoto}
                    alt="Captured complaint proof"
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Live Photo Captured
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={startCamera}
                      className="p-2 rounded-xl bg-white/90 text-slate-800 hover:bg-white text-xs font-bold shadow flex items-center gap-1.5 transition-colors"
                      title="Retake photo"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Retake
                    </button>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-colors"
                      title="Remove photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Idle state: Trigger camera or file upload */
                <div className="p-5 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/70 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-saffron-700 mx-auto shadow-sm">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Take Live Photo by Camera
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Snapping live photos increases resolution speed by 3x.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <Button
                      type="button"
                      variant="saffron"
                      size="sm"
                      onClick={startCamera}
                      leftIcon={<Camera className="w-4 h-4" />}
                      className="font-bold shadow-xs"
                    >
                      Open Live Camera
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      leftIcon={<UploadCloud className="w-4 h-4" />}
                      className="font-semibold text-xs border-slate-300"
                    >
                      Browse Gallery
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {cameraError && (
                    <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2 text-left">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                      <span>{cameraError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SUB-SECTION 2B: LIVE GPS LOCATION */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-bold text-slate-800">
                Live GPS Location Coordinates
              </label>

              {locationCoords ? (
                <div className="p-4 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 via-white to-slate-50 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-900 block">
                          GPS Coordinates Locked
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Accurate to ±{locationCoords.accuracy}m • {locationCoords.timestamp}
                        </span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={fetchLiveLocation}
                      isLoading={isLocating}
                      leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
                      className="text-xs font-bold border-slate-200"
                    >
                      Update GPS
                    </Button>
                  </div>

                  {/* Geolocation Coordinate Readouts */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white p-3 rounded-xl border border-slate-200">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">
                        Latitude
                      </span>
                      <span className="text-slate-800 font-bold">
                        {locationCoords.latitude.toFixed(6)}° N
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-sans font-bold">
                        Longitude
                      </span>
                      <span className="text-slate-800 font-bold">
                        {locationCoords.longitude.toFixed(6)}° E
                      </span>
                    </div>
                  </div>

                  <p className="text-[11px] text-emerald-800 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    Exact geotag will be transmitted directly to the municipal work vehicle navigation.
                  </p>
                </div>
              ) : (
                <div className="p-5 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50/70 text-center space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-chakra-800 mx-auto shadow-sm">
                    <Navigation className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Detect Live Location via Device GPS
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Grabs satellite coordinates for pin-point municipal dispatch.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={fetchLiveLocation}
                    isLoading={isLocating}
                    leftIcon={<Navigation className="w-4 h-4" />}
                    className="font-bold shadow-xs mx-auto"
                  >
                    Fetch Live GPS Location
                  </Button>

                  {locationError && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2 text-left">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
                      <span>{locationError}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 3: ADDRESS (AREA, ROAD, NEAR LANDMARK) */}
        {/* ================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold flex items-center justify-center">
              3
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Address Details (Area, Road, Near Landmark)
            </h3>
            <span className="text-xs text-rose-500 font-semibold">*Required</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. Area / Colony / Sector */}
            <FormField
              label="Area / Colony / Sector"
              error={validationErrors.area}
              required
            >
              <div className="relative">
                <Input
                  placeholder="e.g. Lajpat Nagar IV / Sector 14"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  leftIcon={<Building className="w-4 h-4 text-slate-400" />}
                />
              </div>
            </FormField>

            {/* 2. Road / Street Name */}
            <FormField
              label="Road / Street Name"
              error={validationErrors.road}
              required
            >
              <div className="relative">
                <Input
                  placeholder="e.g. Main Ring Road / Lane 4"
                  value={road}
                  onChange={(e) => setRoad(e.target.value)}
                  leftIcon={<Milestone className="w-4 h-4 text-slate-400" />}
                />
              </div>
            </FormField>

            {/* 3. Near Landmark */}
            <FormField
              label="Near Landmark"
              error={validationErrors.landmark}
              required
            >
              <div className="relative">
                <Input
                  placeholder="e.g. Near Metro Pillar 142 / Opp. SBI"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  leftIcon={<MapPin className="w-4 h-4 text-slate-400" />}
                />
              </div>
            </FormField>
          </div>

          {/* City, Ward and Pincode */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <FormField label="City / Municipality">
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. New Delhi"
              />
            </FormField>

            <FormField label="Ward No. / Zone">
              <Input
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                placeholder="e.g. Ward 45-B"
              />
            </FormField>

            <FormField label="Postal Pincode">
              <Input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="e.g. 110024"
              />
            </FormField>
          </div>

          {/* Combined Address Preview */}
          {(area || road || landmark) && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-saffron-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-900 block">Full Registered Location:</span>
                <span>
                  {[landmark, road, area, city, pincode].filter(Boolean).join(', ')}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ================================================================= */}
        {/* SECTION 4: DETAILED DESCRIPTION ("DISCRISION") */}
        {/* ================================================================= */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <span className="w-6 h-6 rounded-full bg-saffron-100 text-saffron-800 text-xs font-bold flex items-center justify-center">
              4
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              Detailed Description
            </h3>
            <span className="text-xs text-rose-500 font-semibold">*Required</span>
          </div>

          <FormField
            label="Describe the Complaint & Hazard"
            helperText="Mention severity, when this began, and any safety risk for pedestrians, school children, or vehicular commuters."
            error={validationErrors.description}
            required
          >
            <Textarea
              rows={4}
              placeholder="e.g. There is a deep dangerous crater on the road near the metro pillar. During rains it fills with water and has caused 2 two-wheeler accidents this week. Please patch and repair as early as possible."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-sm"
            />
          </FormField>

          {/* Quick Issue Tags Helper */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold text-slate-500">Quick details to append:</span>
            {[
              'Disrupting traffic flow',
              'Severe hazard at night',
              'Foul stench & mosquito breeding',
              'Risk to school children & pedestrians',
              'Open exposed live electric wires',
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() =>
                  setDescription((prev) =>
                    prev ? `${prev.trim()} • ${tag}.` : `${tag}.`
                  )
                }
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium transition-colors"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 5: REPORTER DETAILS & SUBMIT BUTTON */}
        {/* ================================================================= */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            Reporting as: <strong className="text-slate-800">{reporterName}</strong> ({ward})
          </div>

          <div className="flex items-center gap-3">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="font-bold border-slate-300"
              >
                Cancel
              </Button>
            )}

            <Button
              type="submit"
              variant="saffron"
              size="lg"
              isLoading={isSubmitting}
              leftIcon={<Send className="w-4 h-4" />}
              className="font-extrabold px-8 shadow-md"
            >
              Submit Civic Grievance
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
}
