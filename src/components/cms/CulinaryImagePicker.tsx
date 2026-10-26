import React, { useState, useRef } from 'react';
import { Image, Check, Zap, Upload, Sparkles } from 'lucide-react';
import { FoodPhotoOptimizerModal } from './FoodPhotoOptimizerModal';
import { OptimizationResult, formatBytes } from '../../utils/imageOptimizer';

export const CULINARY_IMAGE_PRESETS = [
  {
    name: 'A5 Wagyu & Black Truffle',
    url: '/src/assets/images/dish_truffle_wagyu_1792982470493.jpg',
    category: 'Mains',
  },
  {
    name: 'Hokkaido Scallops & Gold Leaf',
    url: '/src/assets/images/dish_kaiseki_scallop_1792982470876.jpg',
    category: 'Seafood',
  },
  {
    name: 'Imperial Golden Caviar Tartlet',
    url: '/src/assets/images/dish_osetra_caviar_1792982471896.jpg',
    category: 'Amuse-Bouche',
  },
  {
    name: 'Valrhona Chocolate & Bourbon',
    url: 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1000&q=80',
    category: 'Desserts',
  },
  {
    name: 'Michelin Kitchen Atelier & Plating',
    url: '/src/assets/images/hero_culinary_atelier_1792982470366.jpg',
    category: 'Atelier',
  },
  {
    name: 'Fine Dining King Salmon & Botanicals',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80',
    category: 'Mains',
  },
  {
    name: 'Kyoto Kaiseki Seasonal Table',
    url: 'https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=800&q=80',
    category: 'Kaiseki',
  },
  {
    name: 'Private Dining Crystal & Cellar',
    url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    category: 'Cellar',
  },
];

interface CulinaryImagePickerProps {
  currentUrl: string;
  onSelect: (url: string) => void;
}

export const CulinaryImagePicker: React.FC<CulinaryImagePickerProps> = ({ currentUrl, onSelect }) => {
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);
  const [recentOptimized, setRecentOptimized] = useState<OptimizationResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedRawFile, setSelectedRawFile] = useState<File | null>(null);

  const handleRawFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedRawFile(file);
      setIsOptimizerOpen(true);
    }
  };

  const handleApplyOptimized = (dataUrl: string, result?: OptimizationResult) => {
    onSelect(dataUrl);
    if (result) {
      setRecentOptimized(result);
    }
  };

  return (
    <div className="space-y-4">
      {/* Auto-Optimizer Helper Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#dfb877]/15 via-[#dfb877]/5 to-[#141416] border border-[#dfb877]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#dfb877] text-black flex items-center justify-center shrink-0 shadow-md">
            <Zap className="w-5 h-5 fill-black" />
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Upload & Auto-Optimize Raw Food Photo
              </span>
              <span className="text-[10px] bg-[#dfb877]/20 text-[#f8e4be] px-2 py-0.2 rounded-full border border-[#dfb877]/30">
                Low-Latency WebP
              </span>
            </div>
            <p className="text-[11px] text-gray-300 font-light leading-snug">
              Automatically scales heavy DSLR camera raw files to ultra-fast 1600px gallery assets with culinary tone balancing.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleRawFileSelected}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => {
              setSelectedRawFile(null);
              setIsOptimizerOpen(true);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle whitespace-nowrap"
          >
            <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Optimize Raw Photo</span>
          </button>
        </div>
      </div>

      {/* Notice if an image was recently optimized */}
      {recentOptimized && currentUrl.startsWith('data:image/') && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>
              Low-latency version generated: <strong className="font-mono">{formatBytes(recentOptimized.optimizedSize)}</strong> (saved {recentOptimized.savingsPercent}% from {formatBytes(recentOptimized.originalSize)})
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOptimizerOpen(true)}
            className="text-[11px] underline text-[#dfb877] hover:text-[#f8e4be]"
          >
            Adjust Quality
          </button>
        </div>
      )}

      {/* Preset Library Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span className="uppercase tracking-wider font-semibold text-[#dfb877]">
            Or Select from Curated Atelier Library
          </span>
          <span>8 pre-calibrated luxury plates</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {CULINARY_IMAGE_PRESETS.map((preset, idx) => {
            const isSelected = currentUrl === preset.url;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelect(preset.url)}
                className={`group relative rounded-xl overflow-hidden aspect-[4/3] border text-left transition-all ${
                  isSelected
                    ? 'border-[#dfb877] ring-2 ring-[#dfb877]/50'
                    : 'border-[#dfb877]/20 hover:border-[#dfb877]/50'
                }`}
              >
                <img
                  src={preset.url}
                  alt={preset.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-1.5 left-2 right-2 text-[10px] text-white font-medium truncate">
                  {preset.name}
                </div>
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#dfb877] text-black flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Optimizer Modal */}
      <FoodPhotoOptimizerModal
        isOpen={isOptimizerOpen}
        onClose={() => setIsOptimizerOpen(false)}
        initialFile={selectedRawFile}
        onApplyOptimizedImage={handleApplyOptimized}
      />
    </div>
  );
};
