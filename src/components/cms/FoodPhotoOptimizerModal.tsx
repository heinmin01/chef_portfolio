import React, { useState, useRef, useEffect } from 'react';
import {
  optimizeFoodPhoto,
  OptimizeOptions,
  OptimizationResult,
  formatBytes,
} from '../../utils/imageOptimizer';
import {
  Upload,
  Sparkles,
  Zap,
  Sliders,
  Check,
  Download,
  X,
  FileImage,
  Layers,
  ArrowRight,
  RefreshCw,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';

interface FoodPhotoOptimizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOptimizedImage: (dataUrl: string, result?: OptimizationResult) => void;
  initialFile?: File | null;
}

export const FoodPhotoOptimizerModal: React.FC<FoodPhotoOptimizerModalProps> = ({
  isOpen,
  onClose,
  onApplyOptimizedImage,
  initialFile = null,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(initialFile);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [previewMode, setPreviewMode] = useState<'optimized' | 'original' | 'split'>('optimized');

  // Optimization parameters
  const [preset, setPreset] = useState<'balanced' | 'fast' | 'retina' | 'custom'>('balanced');
  const [maxWidth, setMaxWidth] = useState<number>(1600);
  const [quality, setQuality] = useState<number>(0.82);
  const [aspectRatio, setAspectRatio] = useState<OptimizeOptions['aspectRatio']>('4:3');
  const [culinaryTone, setCulinaryTone] = useState<OptimizeOptions['culinaryTone']>('warm-atelier');
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // When initialFile changes
  useEffect(() => {
    if (initialFile) {
      setSelectedFile(initialFile);
    }
  }, [initialFile]);

  // Run optimization whenever file or settings change
  const triggerOptimization = async (fileToOptimize: File, currentSettings?: Partial<OptimizeOptions>) => {
    setIsProcessing(true);
    try {
      const opts: OptimizeOptions = {
        maxWidth,
        quality,
        aspectRatio,
        culinaryTone,
        format: 'image/webp',
        ...currentSettings,
      };
      const optResult = await optimizeFoodPhoto(fileToOptimize, opts);
      setResult(optResult);
    } catch (err) {
      console.error('Optimization error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (selectedFile && isOpen) {
      triggerOptimization(selectedFile);
    }
  }, [selectedFile, maxWidth, quality, aspectRatio, culinaryTone, isOpen]);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith('image/')) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setSelectedFile(files[0]);
    }
  };

  const applyPreset = (type: 'balanced' | 'fast' | 'retina') => {
    setPreset(type);
    if (type === 'balanced') {
      setMaxWidth(1600);
      setQuality(0.82);
    } else if (type === 'fast') {
      setMaxWidth(1000);
      setQuality(0.74);
    } else if (type === 'retina') {
      setMaxWidth(1920);
      setQuality(0.88);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement('a');
    a.href = result.dataUrl;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleApply = () => {
    if (!result) return;
    onApplyOptimizedImage(result.dataUrl, result);
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-4xl w-full rounded-3xl overflow-hidden border border-[#dfb877]/30 shadow-2xl relative max-h-[94vh] flex flex-col bg-[#141416]"
      >
        {/* Modal Top Bar */}
        <div className="p-5 border-b border-[#dfb877]/15 flex items-center justify-between bg-[#0e0e11] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#dfb877] text-black flex items-center justify-center shadow-md">
              <Zap className="w-5 h-5 fill-black" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Raw Food Photo Web Optimizer
                </h3>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#dfb877] bg-[#dfb877]/10 px-2 py-0.5 rounded-full border border-[#dfb877]/20">
                  Zero-Latency Engine
                </span>
              </div>
              <p className="text-xs text-gray-400 font-light">
                Converts heavy multi-megabyte DSLR raw food photos into ultra-fast, high-fidelity WebP assets
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1c1d22] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          {/* Upload Drop Zone if no file or replace */}
          {!selectedFile ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleFileDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-[#dfb877] bg-[#dfb877]/10 scale-[0.99]'
                  : 'border-[#dfb877]/30 hover:border-[#dfb877]/60 bg-[#0a0a0b]/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#141416] border border-[#dfb877]/30 flex items-center justify-center text-[#dfb877] mb-4 shadow-lg gold-glow-subtle">
                <Upload className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-white mb-2">
                Drop Raw Culinary Photography Here
              </h4>
              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed mb-4">
                Supports DSLR camera captures, RAW JPEGs, PNGs, and HEIC files up to 50MB. Automatically scales, compresses, and balances culinary color tones.
              </p>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#dfb877] text-black font-semibold text-xs rounded-xl shadow-md">
                Browse Files
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Metrics & Performance Strip */}
              {result && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0a0a0b] p-4 rounded-2xl border border-[#dfb877]/20">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-gray-400 block font-semibold">
                      Raw Original
                    </span>
                    <div className="text-sm font-mono text-gray-300">
                      {formatBytes(result.originalSize)}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono">
                      {result.originalWidth} × {result.originalHeight}px
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-[#dfb877] block font-semibold">
                      Web Optimized
                    </span>
                    <div className="text-sm font-mono font-bold text-[#dfb877]">
                      {formatBytes(result.optimizedSize)}
                    </div>
                    <div className="text-[10px] text-gray-400 font-mono">
                      {result.optimizedWidth} × {result.optimizedHeight}px · {result.format}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-emerald-400 block font-semibold">
                      Payload Reduction
                    </span>
                    <div className="text-sm font-mono font-bold text-emerald-400">
                      -{result.savingsPercent}% Smaller
                    </div>
                    <div className="text-[10px] text-gray-500">
                      Instant mobile delivery
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase text-gray-400 block font-semibold">
                      Processing Latency
                    </span>
                    <div className="text-sm font-mono text-white">
                      {result.durationMs}ms
                    </div>
                    <div className="text-[10px] text-emerald-400 font-medium">
                      Browser hardware-accel
                    </div>
                  </div>
                </div>
              )}

              {/* Preview Window with Viewport Mode Switch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 uppercase tracking-wider font-semibold text-[11px]">
                      Interactive Plating Preview
                    </span>
                    {isProcessing && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-[#dfb877] animate-pulse">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        <span>Optimizing...</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1 bg-[#0a0a0b] p-1 rounded-lg border border-[#dfb877]/15">
                    <button
                      type="button"
                      onClick={() => setPreviewMode('optimized')}
                      className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                        previewMode === 'optimized'
                          ? 'bg-[#dfb877] text-black font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Optimized WebP
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewMode('original')}
                      className={`px-2.5 py-1 text-[11px] rounded transition-colors ${
                        previewMode === 'original'
                          ? 'bg-[#dfb877] text-black font-semibold'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Raw Input
                    </button>
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-[#dfb877]/25 bg-[#0a0a0b] aspect-[16/10] sm:aspect-[2/1] max-h-80 flex items-center justify-center">
                  {result ? (
                    <img
                      src={previewMode === 'original' ? URL.createObjectURL(selectedFile) : result.dataUrl}
                      alt="Optimized Food Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-gray-500 text-xs">Processing image...</div>
                  )}

                  {/* Overlay Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#0a0a0b]/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] text-[#f8e4be] border border-[#dfb877]/20 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#dfb877]" />
                    <span>
                      {previewMode === 'original'
                        ? `Raw File (${formatBytes(selectedFile.size)})`
                        : `Web-Ready Asset (${result ? formatBytes(result.optimizedSize) : '...'})`}
                    </span>
                  </div>

                  {/* Change photo button */}
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setResult(null);
                    }}
                    className="absolute top-3 right-3 px-3 py-1 bg-[#0a0a0b]/80 hover:bg-[#0a0a0b] text-gray-300 hover:text-white border border-[#dfb877]/25 rounded-lg text-xs transition-colors backdrop-blur-sm"
                  >
                    Change Photo
                  </button>
                </div>
              </div>

              {/* Optimization Presets & Controls */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-[#dfb877] font-semibold">
                    Optimization Profile
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Tuned for high-end gastronomic presentations
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => applyPreset('balanced')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      preset === 'balanced'
                        ? 'border-[#dfb877] bg-[#dfb877]/10 ring-1 ring-[#dfb877]'
                        : 'border-[#dfb877]/15 bg-[#0a0a0b] hover:border-[#dfb877]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">🌟 Portfolio Gallery</span>
                      <span className="text-[10px] text-[#dfb877] font-mono">1600px · 82%</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-snug">
                      Optimal balance of crisp sauce reflection and snappy sub-second loading.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset('fast')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      preset === 'fast'
                        ? 'border-[#dfb877] bg-[#dfb877]/10 ring-1 ring-[#dfb877]'
                        : 'border-[#dfb877]/15 bg-[#0a0a0b] hover:border-[#dfb877]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">⚡ Ultra-Fast Mobile</span>
                      <span className="text-[10px] text-[#dfb877] font-mono">1000px · 74%</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-snug">
                      Sub-100KB files for lightning-speed browsing on mobile devices.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyPreset('retina')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      preset === 'retina'
                        ? 'border-[#dfb877] bg-[#dfb877]/10 ring-1 ring-[#dfb877]'
                        : 'border-[#dfb877]/15 bg-[#0a0a0b] hover:border-[#dfb877]/40'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">💎 Retina Plating Detail</span>
                      <span className="text-[10px] text-[#dfb877] font-mono">1920px · 88%</span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-light leading-snug">
                      Maximum micro-detail for caviar, black truffles, and delicate micro-greens.
                    </p>
                  </button>
                </div>

                {/* Fine-Tuning Controls Accordion / Options */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 bg-[#0a0a0b]/60 p-4 rounded-2xl border border-[#dfb877]/15">
                  {/* Aspect Ratio */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
                      Target Aspect Ratio
                    </label>
                    <select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value as any)}
                      className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#dfb877]"
                    >
                      <option value="4:3">4:3 (Fine Dining Standard)</option>
                      <option value="16:9">16:9 (Landscape Bento Card)</option>
                      <option value="1:1">1:1 (Square Presentation)</option>
                      <option value="original">Preserve Original Ratio</option>
                    </select>
                  </div>

                  {/* Culinary Toning */}
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block">
                      Culinary Plating Tone
                    </label>
                    <select
                      value={culinaryTone}
                      onChange={(e) => setCulinaryTone(e.target.value as any)}
                      className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#dfb877]"
                    >
                      <option value="warm-atelier">Warm Atelier Glow (Champagne Sear)</option>
                      <option value="crisp-contrast">Crisp Obsidian Contrast</option>
                      <option value="natural">Natural / Untouched Camera Raw</option>
                    </select>
                  </div>

                  {/* Quality Manual Slider */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="uppercase text-gray-400 font-semibold">WebP Quality</span>
                      <span className="font-mono text-[#dfb877] font-bold">
                        {Math.round(quality * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="0.95"
                      step="0.02"
                      value={quality}
                      onChange={(e) => {
                        setQuality(parseFloat(e.target.value));
                        setPreset('custom');
                      }}
                      className="w-full accent-[#dfb877] cursor-pointer mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="p-5 border-t border-[#dfb877]/15 bg-[#0e0e11] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-gray-400 font-light text-center sm:text-left">
            {result ? (
              <span>
                Generated <span className="text-[#dfb877] font-semibold">{result.filename}</span> ({formatBytes(result.optimizedSize)})
              </span>
            ) : (
              <span>Upload raw camera food photo to optimize for web</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs uppercase tracking-wider text-gray-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>

            {result && (
              <button
                type="button"
                onClick={handleDownload}
                title="Download optimized file to your computer"
                className="px-4 py-2.5 bg-[#1c1d22] hover:bg-[#25262c] text-[#dfb877] border border-[#dfb877]/30 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save File</span>
              </button>
            )}

            <button
              type="button"
              disabled={!result || isProcessing}
              onClick={handleApply}
              className="px-6 py-2.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle flex items-center gap-2 disabled:opacity-40"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Use in Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
