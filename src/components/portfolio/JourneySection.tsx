import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MapPin, Edit3, PlusCircle } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const { data, isEditMode, setActiveView, setCmsTab } = usePortfolio();
  const [filter, setFilter] = useState<'all' | 'apprenticeship' | 'michelin' | 'executive'>('all');

  const filteredMilestones = data.milestones.filter((m) => {
    if (filter === 'all') return true;
    return m.category === filter;
  });

  return (
    <section id="journey" className="py-28 px-6 relative bg-[#0a0a0b]">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#dfb877]">
              The Chronicle
            </span>
            {isEditMode && (
              <button
                onClick={() => {
                  setActiveView('cms');
                  setCmsTab('journey');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#dfb877]/20 border border-[#dfb877]/50 text-[#f8e4be] text-[11px] rounded-full hover:bg-[#dfb877]/30 transition-all"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Milestones</span>
              </button>
            )}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Interactive Culinary Journey
          </h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed max-w-xl mx-auto">
            A step-by-step visual odyssey detailing key milestones from historic Parisian kitchens to modern private gastronomy.
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center justify-center flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === 'all'
                ? 'bg-[#dfb877] text-black shadow-md'
                : 'bg-[#141416] text-gray-400 hover:text-white border border-[#dfb877]/20'
            }`}
          >
            All Milestones
          </button>
          <button
            onClick={() => setFilter('apprenticeship')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === 'apprenticeship'
                ? 'bg-[#dfb877] text-black shadow-md'
                : 'bg-[#141416] text-gray-400 hover:text-white border border-[#dfb877]/20'
            }`}
          >
            Apprenticeship
          </button>
          <button
            onClick={() => setFilter('michelin')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === 'michelin'
                ? 'bg-[#dfb877] text-black shadow-md'
                : 'bg-[#141416] text-gray-400 hover:text-white border border-[#dfb877]/20'
            }`}
          >
            Michelin Stages
          </button>
          <button
            onClick={() => setFilter('executive')}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              filter === 'executive'
                ? 'bg-[#dfb877] text-black shadow-md'
                : 'bg-[#141416] text-gray-400 hover:text-white border border-[#dfb877]/20'
            }`}
          >
            Executive & Private
          </button>
        </div>

        {/* Timeline Items */}
        <div className="relative space-y-16 sm:space-y-24">
          {/* Vertical Timeline Guide Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 bg-gradient-to-b from-[#dfb877]/80 via-[#c6994e]/30 to-transparent pointer-events-none" />

          {filteredMilestones.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  isEven ? '' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node Indicator on Center Axis */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-[#0a0a0b] border-2 border-[#dfb877] z-10 items-center justify-center text-[#dfb877] font-serif text-sm font-bold shadow-xl gold-glow">
                  {item.orderIndex || String(index + 1).padStart(2, '0')}
                </div>

                {/* Photo Card */}
                <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card rounded-3xl p-3 group transition-all">
                    <div className="img-hover-zoom rounded-2xl relative aspect-[16/10] bg-[#1c1d22]">
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Resilient fallback
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute bottom-4 left-4 bg-[#0a0a0b]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium text-[#f8e4be] flex items-center gap-2 border border-[#dfb877]/20">
                        <MapPin className="w-3.5 h-3.5 text-[#dfb877]" />
                        <span>{item.location} • {item.period}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div
                  className={`w-full md:w-1/2 space-y-4 ${
                    isEven ? 'md:pl-12 md:text-left' : 'md:pr-12 md:text-right'
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#dfb877]/10 border border-[#dfb877]/20 text-[#f8e4be] text-xs font-semibold uppercase tracking-wider ${
                      !isEven ? 'md:ml-auto' : ''
                    }`}
                  >
                    {item.badge}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                    {item.title}
                  </h3>

                  <div className="text-xs uppercase tracking-widest text-[#dfb877]/80 font-medium">
                    {item.establishment}
                  </div>

                  <p className="text-sm text-gray-300 font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Clean unboxed tags with typographic separators */}
                  <div
                    className={`pt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400 ${
                      !isEven ? 'md:justify-end' : ''
                    }`}
                  >
                    {item.tags.map((tag, tIdx) => (
                      <React.Fragment key={tIdx}>
                        <span>{tag}</span>
                        {tIdx < item.tags.length - 1 && (
                          <span className="text-[#dfb877]/40" aria-hidden="true">
                            ·
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
