import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, SlidersHorizontal, Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { data, activeView, setActiveView, isEditMode, setIsEditMode } = usePortfolio();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 sm:h-24 flex items-center justify-between gap-8">
        {/* Zone 1: Single Brand Element */}
        <a href="#about" className="flex items-center gap-3 group shrink-0 whitespace-nowrap">
          <div className="w-10 h-10 rounded-full border border-[#dfb877]/40 flex items-center justify-center bg-[#141416] group-hover:border-[#dfb877] transition-all duration-300">
            <span className="font-serif text-sm font-bold text-[#dfb877] tracking-wider">
              {data.profile.monogram || 'CMT'}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wider text-white group-hover:text-[#f8e4be] transition-colors leading-none">
              {data.profile.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#dfb877] font-medium mt-1">
              {data.profile.title}
            </span>
          </div>
        </a>

        {/* Zone 2: Concise Nav Links (Single line) */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
          <a href="#journey" className="hover:text-[#dfb877] transition-colors whitespace-nowrap shrink-0">
            Journey
          </a>
          <a href="#signature" className="hover:text-[#dfb877] transition-colors whitespace-nowrap shrink-0">
            Creations
          </a>
          <a href="#skills" className="hover:text-[#dfb877] transition-colors whitespace-nowrap shrink-0">
            Masteries
          </a>
          <a href="#press" className="hover:text-[#dfb877] transition-colors whitespace-nowrap shrink-0">
            Acclaim
          </a>
          <a href="#reserve" className="hover:text-[#dfb877] transition-colors whitespace-nowrap shrink-0">
            Reserve
          </a>
        </nav>

        {/* Zone 3: Primary Action & CMS Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Quick Edit Mode Toggle */}
          <button
            onClick={() => setIsEditMode((prev) => !prev)}
            title={isEditMode ? 'Exit Quick Edit Mode' : 'Enable Inline CMS Edit Mode'}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 border whitespace-nowrap ${
              isEditMode
                ? 'bg-[#dfb877]/20 text-[#f8e4be] border-[#dfb877]/60 shadow-[0_0_12px_rgba(223,184,119,0.25)]'
                : 'bg-[#141416] text-gray-400 hover:text-white border-[#dfb877]/20 hover:border-[#dfb877]/40'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#dfb877]" />
            <span>{isEditMode ? 'Editing On' : 'Quick Edit'}</span>
          </button>

          {/* Primary Action Button: Open CMS Studio */}
          <button
            onClick={() => setActiveView(activeView === 'cms' ? 'website' : 'cms')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-black bg-[#dfb877] hover:bg-[#f8e4be] rounded-lg transition-all duration-300 shadow-md gold-glow-subtle whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{activeView === 'cms' ? 'Exit CMS' : 'CMS Studio'}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e11] border-b border-[#dfb877]/20 px-6 py-6 space-y-4">
          <div className="flex flex-col gap-4 text-xs uppercase tracking-widest font-medium text-gray-300">
            <a
              href="#journey"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#dfb877] transition-colors"
            >
              Journey
            </a>
            <a
              href="#signature"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#dfb877] transition-colors"
            >
              Signature Creations
            </a>
            <a
              href="#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#dfb877] transition-colors"
            >
              Culinary Masteries
            </a>
            <a
              href="#press"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#dfb877] transition-colors"
            >
              Press & Acclaim
            </a>
            <a
              href="#reserve"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#dfb877] transition-colors"
            >
              Reserve an Experience
            </a>
          </div>
          <div className="pt-4 border-t border-[#dfb877]/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setActiveView('cms');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-[#dfb877] text-black rounded-lg"
            >
              <Sparkles className="w-4 h-4" />
              Open CMS Management Studio
            </button>
            <button
              onClick={() => {
                setIsEditMode((prev) => !prev);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-4 text-xs text-center text-gray-300 bg-[#141416] border border-[#dfb877]/20 rounded-lg"
            >
              {isEditMode ? 'Disable Inline Edit' : 'Enable Inline Quick Edit'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
