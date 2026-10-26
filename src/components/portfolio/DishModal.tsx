import React, { useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Sparkles, Utensils, Wine, HeartHandshake } from 'lucide-react';

export const DishModal: React.FC = () => {
  const { selectedDishForModal, setSelectedDishForModal } = usePortfolio();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedDishForModal(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedDishForModal]);

  if (!selectedDishForModal) return null;

  const dish = selectedDishForModal;

  return (
    <div
      onClick={() => setSelectedDishForModal(null)}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-2xl w-full rounded-3xl overflow-hidden border border-[#dfb877]/30 shadow-2xl relative max-h-[90vh] flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedDishForModal(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#0a0a0b]/80 border border-[#dfb877]/30 text-gray-300 hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-[#1c1d22] shrink-0">
          <img
            src={dish.imageUrl}
            alt={dish.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-transparent to-black/30" />
          <div className="absolute bottom-4 left-6 right-6">
            <span className="text-xs uppercase tracking-widest text-[#dfb877] font-semibold block mb-1">
              {dish.course}
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {dish.title}
            </h3>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Ingredients Breakdown */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#dfb877] font-semibold">
              <Utensils className="w-3.5 h-3.5" />
              <span>Components & Ingredients</span>
            </div>
            <p className="text-sm text-gray-300 font-light leading-relaxed bg-[#0a0a0b]/60 p-4 rounded-xl border border-[#dfb877]/10">
              {dish.ingredients}
            </p>
          </div>

          {/* Tasting & Flavor Profile */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#dfb877] font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tasting Profile & Cadence</span>
            </div>
            <p className="text-sm text-gray-200 font-serif italic leading-relaxed bg-[#dfb877]/5 p-4 rounded-xl border border-[#dfb877]/20">
              "{dish.flavorNotes}"
            </p>
          </div>

          {/* Sommelier Pairing if exists */}
          {dish.winePairing && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#dfb877] font-semibold">
                <Wine className="w-3.5 h-3.5" />
                <span>Sommelier Wine & Sake Pairing</span>
              </div>
              <p className="text-sm text-gray-300 font-light bg-[#0a0a0b]/60 p-4 rounded-xl border border-[#dfb877]/10">
                {dish.winePairing}
              </p>
            </div>
          )}

          {/* Dietary Tags */}
          {dish.dietaryTags && dish.dietaryTags.length > 0 && (
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="text-[#dfb877] text-[10px] uppercase font-bold tracking-wider">
                Notes:
              </span>
              {dish.dietaryTags.map((tag, i) => (
                <span key={i} className="px-2.5 py-0.5 rounded-full bg-[#1c1d22] text-gray-300 text-[11px] border border-[#dfb877]/15">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setSelectedDishForModal(null)}
              className="px-6 py-2.5 bg-[#dfb877] text-black text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#f8e4be] transition-colors"
            >
              Close Tasting Notes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
