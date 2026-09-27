import React, { useRef, useState } from 'react';
import { Camera, UploadCloud, X, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { cn } from '../../utils/cn';
import { Button } from '../common/Button';

export interface FileUploadProps {
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  onFileSelect?: (file: File | null) => void;
  error?: string;
  className?: string;
}

export function FileUpload({
  label = 'Upload Photo Proof / Evidence',
  accept = 'image/*',
  maxSizeMB = 5,
  onFileSelect,
  error,
  className,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = (file: File) => {
    setFileError(null);
    if (file.size > maxSizeMB * 1024 * 1024) {
      setFileError(`File size exceeds maximum allowed limit of ${maxSizeMB}MB.`);
      return;
    }

    setSelectedFile(file);
    onFileSelect?.(file);

    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleProcessFile(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFileError(null);
    onFileSelect?.(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={cn('w-full space-y-2', className)}>
      {label && (
        <span className="block text-xs sm:text-sm font-semibold text-slate-800">
          {label}
        </span>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
      />

      {selectedFile ? (
        <div className="relative flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Evidence preview"
              className="w-14 h-14 object-cover rounded-lg border border-slate-200 shrink-0"
            />
          ) : (
            <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 shrink-0">
              <ImageIcon className="w-6 h-6" />
            </div>
          )}

          <div className="flex-1 min-w-0 text-xs">
            <p className="font-semibold text-slate-800 truncate">{selectedFile.name}</p>
            <p className="text-slate-500 text-[11px] mt-0.5">
              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready to submit
            </p>
            <div className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px] mt-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Verified format</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRemove}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
            aria-label="Remove uploaded file"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          className={cn(
            'flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl bg-slate-50/70 hover:bg-slate-50 border-slate-300 transition-colors cursor-pointer text-center group',
            (error || fileError) && 'border-rose-300 bg-rose-50/40'
          )}
        >
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-chakra-800 group-hover:scale-105 transition-transform mb-3 shadow-sm">
            <Camera className="w-6 h-6" />
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            Tap to snap a photo or browse device
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            JPG, PNG, or WEBP (Max {maxSizeMB}MB)
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
              className="pointer-events-none text-xs"
            >
              Select Image
            </Button>
          </div>
        </div>
      )}

      {(error || fileError) && (
        <p className="text-xs font-medium text-rose-600">
          {error || fileError}
        </p>
      )}
    </div>
  );
}
