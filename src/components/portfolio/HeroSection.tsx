import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ArrowDown, Edit3, ChevronRight, Award, Flame, Globe2, UtensilsCrossed } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { data, isEditMode, setActiveView, setCmsTab } = usePortfolio();
  const { profile } = data;

  return (
    <section id="about" className="min-h-screen flex flex-col justify-between relative pt-32 pb-16 px-6 overflow-hidden">
      {/* Hero Ambient Background Image with scrim */}
      <div
        className="absolute inset-0 z-0 opacity-20 bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: `url('/src/assets/images/hero_culinary_atelier_1792982470366.jpg')`,
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0a0a0b]/80 via-[#0a0a0b]/90 to-[#0a0a0b] pointer-events-none" />

      {/* Ambient Gold Highlights */}
      <div className="glow-bg w-[32rem] h-[32rem] bg-[#dfb877] top-10 -left-20" />
      <div className="glow-bg w-[36rem] h-[36rem] bg-[#9e7533] top-[40%] -right-32" />

      {/* Hero Content */}
      <div className="max-w-5xl mx-auto my-auto relative z-10 text-center space-y-8 pt-8">
        {/* Inline Edit Trigger */}
        {isEditMode && (
          <div className="flex justify-center mb-2">
            <button
              onClick={() => {
                setActiveView('cms');
                setCmsTab('profile');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#dfb877]/20 border border-[#dfb877]/60 text-[#f8e4be] text-xs rounded-full hover:bg-[#dfb877]/30 transition-all"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Hero & Profile in CMS</span>
            </button>
          </div>
        )}

        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141416]/80 border border-[#dfb877]/20 text-[#dfb877] text-xs font-semibold uppercase tracking-[0.25em]">
          <Award className="w-3.5 h-3.5 text-[#dfb877]" />
          <span>{profile.kicker}</span>
        </div>

        {/* Display Headline */}
        <h1
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-white tracking-tight leading-[1.12]"
          style={{ textWrap: 'balance' }}
        >
          <span className="text-gold-gradient block sm:inline">{profile.name}</span>
          <span className="block text-2xl sm:text-4xl md:text-5xl font-light text-gray-200 mt-3 sm:mt-4">
            {profile.heroHeadline}
          </span>
        </h1>

        {/* Bio Copy */}
        <p className="text-sm sm:text-base md:text-lg text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          {profile.heroBio}
        </p>

        {/* CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#journey"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-lg gold-glow-subtle flex items-center justify-center gap-2"
          >
            <span>Explore Culinary Journey</span>
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="#signature"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#141416] hover:bg-[#1c1d22] text-white hover:text-[#dfb877] border border-[#dfb877]/25 hover:border-[#dfb877]/60 font-semibold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span>Signature Creations</span>
          </a>
        </div>
      </div>

      {/* 4-Column KPI Strip below hero (Domain standard) */}
      <div className="max-w-6xl mx-auto w-full relative z-10 pt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card rounded-2xl p-5 text-center space-y-1.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-[#dfb877] text-2xl sm:text-3xl font-serif font-bold tabular-nums">
              <Award className="w-5 h-5 text-[#dfb877]" />
              <span>{profile.stats.michelinStars}</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Michelin Recognition
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-[#dfb877] text-2xl sm:text-3xl font-serif font-bold tabular-nums">
              <Flame className="w-5 h-5 text-[#dfb877]" />
              <span>{profile.stats.yearsMastery}</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Years of Mastery
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-[#dfb877] text-2xl sm:text-3xl font-serif font-bold tabular-nums">
              <Globe2 className="w-5 h-5 text-[#dfb877]" />
              <span>{profile.stats.countriesTravelled}</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Countries Travelled
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center space-y-1.5 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-[#dfb877] text-2xl sm:text-3xl font-serif font-bold tabular-nums">
              <UtensilsCrossed className="w-5 h-5 text-[#dfb877]" />
              <span>{profile.stats.privateBanquets}</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-gray-400 font-medium">
              Private Banquets
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
