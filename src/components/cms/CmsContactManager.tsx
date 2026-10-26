import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Instagram,
  Linkedin,
  ExternalLink,
  Check,
  Sparkles,
} from 'lucide-react';

export const CmsContactManager: React.FC = () => {
  const { data, updateContact } = usePortfolio();
  const [formState, setFormState] = useState({ ...data.contact });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContact(formState);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Contact Details & Atelier Concierge Settings
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            Modify direct correspondence email, phone numbers, atelier location, seasonal availability notice, and external links
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl font-medium animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Updated across live portfolio!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form (2 cols) */}
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-8 space-y-6"
        >
          {/* Primary Correspondence */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#dfb877] font-bold border-b border-[#dfb877]/10 pb-2">
              Primary Concierge Channels
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#dfb877]" />
                  <span>Primary Email Address *</span>
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  placeholder="e.g. heinmin1823@gmail.com"
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#dfb877]" />
                  <span>Atelier Telephone / WhatsApp</span>
                </label>
                <input
                  type="text"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  placeholder="e.g. +1 (917) 540-8291"
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#dfb877]" />
                <span>Atelier Base & Residences</span>
              </label>
              <input
                type="text"
                value={formState.location}
                onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                placeholder="e.g. Tokyo · Manhattan · Worldwide Engagements"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>
          </div>

          {/* Availability Status */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs uppercase tracking-widest text-[#dfb877] font-bold border-b border-[#dfb877]/10 pb-2">
              Seasonal Availability Notice
            </h4>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#dfb877]" />
                <span>Notice Banner Text</span>
              </label>
              <textarea
                rows={2}
                value={formState.availability}
                onChange={(e) => setFormState({ ...formState, availability: e.target.value })}
                placeholder="e.g. Accepting Private Atelier & Bespoke Dinners for 2026/2027 Season"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#dfb877] resize-none"
              />
            </div>
          </div>

          {/* External Profile Links */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs uppercase tracking-widest text-[#dfb877] font-bold border-b border-[#dfb877]/10 pb-2">
              External & Social Profiles
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                  <Instagram className="w-3.5 h-3.5 text-[#dfb877]" />
                  <span>Instagram Profile URL</span>
                </label>
                <input
                  type="url"
                  value={formState.instagram}
                  onChange={(e) => setFormState({ ...formState, instagram: e.target.value })}
                  placeholder="https://instagram.com/chef..."
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5 text-[#dfb877]" />
                  <span>LinkedIn Profile URL</span>
                </label>
                <input
                  type="url"
                  value={formState.linkedin}
                  onChange={(e) => setFormState({ ...formState, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-[#dfb877]" />
                  <span>Michelin Guide Listing URL</span>
                </label>
                <input
                  type="url"
                  value={formState.michelinGuideUrl}
                  onChange={(e) => setFormState({ ...formState, michelinGuideUrl: e.target.value })}
                  placeholder="https://guide.michelin.com/..."
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#dfb877]" />
                  <span>Press Kit Anchor / Link</span>
                </label>
                <input
                  type="text"
                  value={formState.pressKitUrl}
                  onChange={(e) => setFormState({ ...formState, pressKitUrl: e.target.value })}
                  placeholder="#press or https://..."
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
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
              <span>Save Contact Changes</span>
            </button>
          </div>
        </form>

        {/* Live Preview Card (1 col) */}
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#dfb877] font-bold">
            Live Preview on Website
          </div>

          <div className="glass-card rounded-2xl p-6 space-y-4 border border-[#dfb877]/30 bg-[#0e0e11]">
            <div className="text-xs text-gray-400 uppercase tracking-widest">
              Visitor Contact Snapshot
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141416] border border-[#dfb877]/20 flex items-center justify-center text-[#dfb877] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase text-[#dfb877] font-semibold">Email</div>
                  <div className="text-xs text-white truncate font-medium">{formState.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141416] border border-[#dfb877]/20 flex items-center justify-center text-[#dfb877] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase text-[#dfb877] font-semibold">Phone</div>
                  <div className="text-xs text-white truncate font-medium">{formState.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141416] border border-[#dfb877]/20 flex items-center justify-center text-[#dfb877] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase text-[#dfb877] font-semibold">Location</div>
                  <div className="text-xs text-white truncate font-medium">{formState.location}</div>
                </div>
              </div>
            </div>

            {formState.availability && (
              <div className="p-3 rounded-lg bg-[#141416] border border-[#dfb877]/20 text-[11px] text-[#f8e4be]">
                ✨ {formState.availability}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
