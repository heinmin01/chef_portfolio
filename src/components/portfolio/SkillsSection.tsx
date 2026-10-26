import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, Edit3, PlusCircle, CheckCircle2 } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { data, isEditMode, setActiveView, setCmsTab } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredSkills = data.skills.filter((skill) => {
    if (activeCategory === 'all') return true;
    return skill.category === activeCategory;
  });

  return (
    <section id="skills" className="py-28 px-6 border-t border-[#dfb877]/10 bg-[#0a0a0b] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#dfb877]">
                Technical Rigor & Heritage
              </span>
              {isEditMode && (
                <button
                  onClick={() => {
                    setActiveView('cms');
                    setCmsTab('skills');
                  }}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#dfb877]/20 border border-[#dfb877]/50 text-[#f8e4be] text-[11px] rounded-full hover:bg-[#dfb877]/30 transition-all"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit in CMS</span>
                </button>
              )}
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              Culinary Masteries & Skills
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-gray-400 max-w-md font-light leading-relaxed">
              Refined over 22 years across three continents. Bridging centuries-old classical French precision with Japanese Kaiseki philosophy and cutting-edge molecular techniques.
            </p>
            {isEditMode && (
              <button
                onClick={() => {
                  setActiveView('cms');
                  setCmsTab('skills');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#dfb877] text-black text-xs font-semibold rounded-lg hover:bg-[#f8e4be] transition-all shrink-0"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center flex-wrap gap-2 pt-2">
          {[
            { id: 'all', label: 'All Masteries' },
            { id: 'techniques', label: 'Techniques & Craft' },
            { id: 'philosophy', label: 'Philosophy & Fermentation' },
            { id: 'operations', label: 'Leadership & Architecture' },
            { id: 'beverage', label: 'Beverage & Pairing' },
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

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-6 hover:border-[#dfb877]/40 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Top Row: Category & Experience */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#dfb877] uppercase tracking-widest font-semibold text-[10px]">
                    {skill.category}
                  </span>
                  <span className="text-gray-400 font-mono text-[11px] tabular-nums">
                    {skill.years}
                  </span>
                </div>

                {/* Skill Name */}
                <div className="space-y-1">
                  <h3 className="text-lg font-serif font-bold text-white flex items-center justify-between gap-2">
                    <span>{skill.name}</span>
                    {skill.highlighted && (
                      <span className="shrink-0 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#dfb877]/15 text-[#f8e4be] border border-[#dfb877]/30">
                        Signature
                      </span>
                    )}
                  </h3>
                </div>

                {/* Mastery Level Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-mono text-gray-400">
                    <span>Mastery Level</span>
                    <span className="text-[#dfb877] font-semibold tabular-nums">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#141416] rounded-full overflow-hidden border border-[#dfb877]/10">
                    <div
                      className="h-full bg-gradient-to-r from-[#dfb877] to-[#f8e4be] rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-gray-300 font-light leading-relaxed">
                  {skill.description}
                </p>
              </div>

              {/* Clean unboxed tags with typographic separators */}
              <div className="pt-3 border-t border-[#dfb877]/10 flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                {skill.tags.map((tag, tIdx) => (
                  <React.Fragment key={tIdx}>
                    <span>{tag}</span>
                    {tIdx < skill.tags.length - 1 && (
                      <span className="text-[#dfb877]/40" aria-hidden="true">
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
