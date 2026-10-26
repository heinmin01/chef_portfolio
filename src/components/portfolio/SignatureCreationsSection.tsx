import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectDish } from '../../types/portfolio';
import { Sparkles, PlusCircle, Edit3, Trash2, Wine, Eye } from 'lucide-react';

export const SignatureCreationsSection: React.FC = () => {
  const {
    data,
    setSelectedDishForModal,
    isEditMode,
    setActiveView,
    setCmsTab,
    deleteDish,
  } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredDishes = data.dishes.filter((dish) => {
    if (activeCategory === 'all') return true;
    return dish.category === activeCategory;
  });

  return (
    <section id="signature" className="py-28 px-6 border-t border-[#dfb877]/10 bg-[#0a0a0b]/80 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#dfb877]">
                Gastronomic Portfolio
              </span>
              {isEditMode && (
                <button
                  onClick={() => {
                    setActiveView('cms');
                    setCmsTab('dishes');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#dfb877]/20 border border-[#dfb877]/50 text-[#f8e4be] text-[11px] rounded-full hover:bg-[#dfb877]/30 transition-all"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Manage in CMS</span>
                </button>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Signature Creations
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-gray-400 max-w-md font-light leading-relaxed">
              Each signature creation balances unexpected flavor profiles, rare seasonal ingredients, and artistic visual harmony. Click any dish to view tasting notes.
            </p>
            {isEditMode && (
              <button
                onClick={() => {
                  setActiveView('cms');
                  setCmsTab('dishes');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#dfb877] text-black text-xs font-semibold rounded-lg hover:bg-[#f8e4be] transition-all shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Dish</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: 'All Creations' },
            { id: 'mains', label: 'Grand Mains' },
            { id: 'seafood', label: 'Raw & Marine' },
            { id: 'starters', label: 'Amuse-Bouche' },
            { id: 'desserts', label: 'Confections' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#dfb877] text-black shadow-md'
                  : 'bg-[#141416] text-gray-400 hover:text-white border border-[#dfb877]/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {filteredDishes.map((dish) => {
            const isSpanTwo = dish.featured;

            return (
              <div
                key={dish.id}
                onClick={() => setSelectedDishForModal(dish)}
                className={`group glass-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 relative flex flex-col ${
                  isSpanTwo ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                {/* Image Container with zoom */}
                <div
                  className={`img-hover-zoom relative w-full bg-[#1c1d22] ${
                    isSpanTwo ? 'h-72 sm:h-96' : 'h-72 sm:h-80'
                  }`}
                >
                  <img
                    src={dish.imageUrl}
                    alt={dish.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback placeholder container
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/40 to-transparent opacity-90 transition-opacity group-hover:opacity-95" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#dfb877] bg-[#0a0a0b]/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#dfb877]/25">
                      {dish.category}
                    </span>

                    <div className="flex items-center gap-2">
                      {dish.winePairing && (
                        <span
                          title={dish.winePairing}
                          className="w-7 h-7 rounded-full bg-[#0a0a0b]/80 border border-[#dfb877]/30 flex items-center justify-center text-[#dfb877]"
                        >
                          <Wine className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <span className="bg-[#dfb877] text-black px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider group-hover:bg-[#f8e4be] transition-colors flex items-center gap-1 shadow-sm">
                        <Eye className="w-3 h-3" />
                        <span>Tasting Notes</span>
                      </span>
                    </div>
                  </div>

                  {/* Bottom Dish Information */}
                  <div className="absolute bottom-6 left-6 right-6 space-y-2">
                    <span className="text-xs uppercase tracking-widest text-[#dfb877] font-medium block">
                      {dish.course}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-[#f8e4be] transition-colors leading-snug">
                      {dish.title}
                    </h3>
                    <p className="text-xs text-gray-300 font-light line-clamp-1">
                      {dish.ingredients}
                    </p>
                  </div>
                </div>

                {/* Inline Edit Buttons if Edit Mode */}
                {isEditMode && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="p-3 bg-[#141416] border-t border-[#dfb877]/15 flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-400 text-[11px]">Dish #{dish.order}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setActiveView('cms');
                          setCmsTab('dishes');
                        }}
                        className="p-1.5 hover:text-[#dfb877] text-gray-300 rounded transition-colors"
                        title="Edit Dish in CMS"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${dish.title}"?`)) {
                            deleteDish(dish.id);
                          }
                        }}
                        className="p-1.5 hover:text-red-400 text-gray-400 rounded transition-colors"
                        title="Delete Dish"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredDishes.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl space-y-3">
            <p className="text-gray-400 text-sm">No creations found in this category.</p>
            {isEditMode && (
              <button
                onClick={() => {
                  setActiveView('cms');
                  setCmsTab('dishes');
                }}
                className="px-4 py-2 bg-[#dfb877] text-black text-xs font-semibold rounded-lg"
              >
                Add Dish to this Category
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
