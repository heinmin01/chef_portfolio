import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { User, Award, Flame, Globe2, UtensilsCrossed, Check } from 'lucide-react';

export const CmsProfileManager: React.FC = () => {
  const { data, updateProfile } = usePortfolio();
  const [formState, setFormState] = useState({
    name: data.profile.name,
    title: data.profile.title,
    kicker: data.profile.kicker,
    monogram: data.profile.monogram,
    heroHeadline: data.profile.heroHeadline,
    heroBio: data.profile.heroBio,
    stats: { ...data.profile.stats },
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Chef Profile, Branding & Hero Configuration
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            Customize display name, initials monogram, professional title, hero headline, bio, and 4-column KPI strip
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl font-medium animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Profile updated across site!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        {/* Basic Brand Identity */}
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-[#dfb877] font-bold border-b border-[#dfb877]/10 pb-2">
            Chef Identity & Wordmark
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Full Display Name *
              </label>
              <input
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="e.g. Chit Min Thu"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Monogram Initials (2-3 chars)
              </label>
              <input
                type="text"
                maxLength={4}
                value={formState.monogram}
                onChange={(e) => setFormState({ ...formState, monogram: e.target.value })}
                placeholder="e.g. CMT"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877] uppercase font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Professional Subtitle
              </label>
              <input
                type="text"
                value={formState.title}
                onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                placeholder="e.g. Asian Culinary Professional"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Hero Pill Kicker
              </label>
              <input
                type="text"
                value={formState.kicker}
                onChange={(e) => setFormState({ ...formState, kicker: e.target.value })}
                placeholder="e.g. Michelin Stared Executive Chef & Gastronomer"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>
          </div>
        </div>

        {/* Hero Headline & Bio */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs uppercase tracking-widest text-[#dfb877] font-bold border-b border-[#dfb877]/10 pb-2">
            Hero Typography & Philosophy Bio
          </h4>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Main Display Headline
            </label>
            <input
              type="text"
              value={formState.heroHeadline}
              onChange={(e) => setFormState({ ...formState, heroHeadline: e.target.value })}
              placeholder="e.g. Crafting Culinary Experiences Beyond Emotion."
              className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Hero Introduction Bio
            </label>
            <textarea
              rows={3}
              value={formState.heroBio}
              onChange={(e) => setFormState({ ...formState, heroBio: e.target.value })}
              placeholder="Detail your two-decade journey, culinary heritage, and gastronomic vision..."
              className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#dfb877] resize-none"
            />
          </div>
        </div>

        {/* KPI Strip Counters */}
        <div className="space-y-4 pt-2">
          <h4 className="text-xs uppercase tracking-widest text-[#dfb877] font-bold border-b border-[#dfb877]/10 pb-2">
            Key Achievement Counters (4-Column Hero Strip)
          </h4>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-[#dfb877]" />
                <span>Michelin Stat</span>
              </label>
              <input
                type="text"
                value={formState.stats.michelinStars}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    stats: { ...formState.stats, michelinStars: e.target.value },
                  })
                }
                placeholder="3 ★"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#dfb877]" />
                <span>Years Mastery</span>
              </label>
              <input
                type="text"
                value={formState.stats.yearsMastery}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    stats: { ...formState.stats, yearsMastery: e.target.value },
                  })
                }
                placeholder="22+"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-[#dfb877]" />
                <span>Countries</span>
              </label>
              <input
                type="text"
                value={formState.stats.countriesTravelled}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    stats: { ...formState.stats, countriesTravelled: e.target.value },
                  })
                }
                placeholder="14"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877] font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#dfb877]" />
                <span>Banquets</span>
              </label>
              <input
                type="text"
                value={formState.stats.privateBanquets}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    stats: { ...formState.stats, privateBanquets: e.target.value },
                  })
                }
                placeholder="500+"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877] font-mono"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-[#dfb877]/15 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile & Hero</span>
          </button>
        </div>
      </form>
    </div>
  );
};
