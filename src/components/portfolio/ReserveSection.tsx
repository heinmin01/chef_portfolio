import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Mail, Phone, MapPin, Calendar, Check, Edit3, Send, Sparkles } from 'lucide-react';

export const ReserveSection: React.FC = () => {
  const { data, addInquiry, isEditMode, setActiveView, setCmsTab } = usePortfolio();
  const { contact } = data;

  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    experienceType: 'Private Estate Dinner',
    guests: '8-12 Guests',
    targetDate: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.fullName || !formState.email) return;

    addInquiry({
      fullName: formState.fullName,
      email: formState.email,
      experienceType: formState.experienceType,
      guests: formState.guests,
      targetDate: formState.targetDate || 'Flexible / To be confirmed',
      notes: formState.notes,
    });

    setSubmitted(true);
    setFormState({
      fullName: '',
      email: '',
      experienceType: 'Private Estate Dinner',
      guests: '8-12 Guests',
      targetDate: '',
      notes: '',
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 6000);
  };

  return (
    <section id="reserve" className="py-28 px-6 border-t border-[#dfb877]/10 bg-[#0a0a0b] relative overflow-hidden">
      {/* Ambient Glows */}
      <div className="glow-bg w-96 h-96 bg-[#dfb877] -bottom-20 -left-20" />
      <div className="glow-bg w-96 h-96 bg-[#9e7533] top-20 -right-20" />

      <div className="max-w-5xl mx-auto space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#dfb877]">
              Bespoke Dining
            </span>
            {isEditMode && (
              <button
                onClick={() => {
                  setActiveView('cms');
                  setCmsTab('contact');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#dfb877]/20 border border-[#dfb877]/50 text-[#f8e4be] text-[11px] rounded-full hover:bg-[#dfb877]/30 transition-all"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Contact Details</span>
              </button>
            )}
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Reserve an Experience
          </h2>
          <p className="text-sm text-gray-400 font-light leading-relaxed">
            Inquire for private estate catering, brand consultancies, or bespoke culinary pop-up engagements worldwide.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="glass-card rounded-2xl p-6 space-y-3 group transition-all hover:border-[#dfb877]/50 block"
          >
            <div className="w-10 h-10 rounded-xl bg-[#141416] border border-[#dfb877]/20 flex items-center justify-center text-[#dfb877] group-hover:scale-105 transition-transform">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-widest text-[#dfb877] font-semibold">
              Direct Concierge
            </div>
            <div className="text-sm font-medium text-white group-hover:text-[#f8e4be] transition-colors break-all">
              {contact.email}
            </div>
          </a>

          <a
            href={`tel:${contact.phone}`}
            className="glass-card rounded-2xl p-6 space-y-3 group transition-all hover:border-[#dfb877]/50 block"
          >
            <div className="w-10 h-10 rounded-xl bg-[#141416] border border-[#dfb877]/20 flex items-center justify-center text-[#dfb877] group-hover:scale-105 transition-transform">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-widest text-[#dfb877] font-semibold">
              Atelier Line
            </div>
            <div className="text-sm font-medium text-white group-hover:text-[#f8e4be] transition-colors">
              {contact.phone}
            </div>
          </a>

          <div className="glass-card rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#141416] border border-[#dfb877]/20 flex items-center justify-center text-[#dfb877]">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-widest text-[#dfb877] font-semibold">
              Atelier Base
            </div>
            <div className="text-sm font-medium text-white">
              {contact.location}
            </div>
          </div>
        </div>

        {/* Availability Banner */}
        {contact.availability && (
          <div className="p-4 rounded-xl bg-[#141416]/90 border border-[#dfb877]/30 text-center text-xs text-[#f8e4be] font-medium tracking-wide flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dfb877] shrink-0" />
            <span>{contact.availability}</span>
          </div>
        )}

        {/* Reservation Form */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {submitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in duration-300">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#dfb877]/20 border-2 border-[#dfb877] flex items-center justify-center text-[#dfb877]">
                <Check className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-white">
                Consultation Request Transmitted
              </h3>
              <p className="text-sm text-gray-300 max-w-md mx-auto font-light leading-relaxed">
                Thank you for your inquiry. Chef Chit Min Thu's private concierge will review your banquet parameters and respond within 24 hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 text-xs uppercase tracking-wider font-semibold bg-[#141416] text-[#dfb877] border border-[#dfb877]/30 rounded-lg hover:bg-[#1c1d22]"
                >
                  Send Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.fullName}
                    onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                    placeholder="e.g. Lord Julian Harrington"
                    className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb877] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. j.harrington@estate.com"
                    className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb877] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block">
                    Experience Type
                  </label>
                  <select
                    value={formState.experienceType}
                    onChange={(e) => setFormState({ ...formState, experienceType: e.target.value })}
                    className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb877] transition-colors"
                  >
                    <option value="Private Estate Dinner">Private Estate Dinner</option>
                    <option value="Corporate Gala Catering">Corporate Gala Catering</option>
                    <option value="Restaurant Advisory">Restaurant Advisory</option>
                    <option value="Keynote / Cooking Masterclass">Keynote / Masterclass</option>
                    <option value="Bespoke Cellar & Tasting">Bespoke Cellar & Tasting</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block">
                    Estimated Guests
                  </label>
                  <input
                    type="text"
                    value={formState.guests}
                    onChange={(e) => setFormState({ ...formState, guests: e.target.value })}
                    placeholder="e.g. 10 Guests"
                    className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb877] transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={formState.targetDate}
                    onChange={(e) => setFormState({ ...formState, targetDate: e.target.value })}
                    className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#dfb877] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-400 font-semibold block">
                  Dietary Notes & Location Details
                </label>
                <textarea
                  rows={4}
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  placeholder="Specify venue location (city/estate), kitchen equipment specifications, dietary restrictions, or sommelier requests..."
                  className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl p-4 text-sm text-white focus:outline-none focus:border-[#dfb877] transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-400 font-light text-center sm:text-left">
                  Inquiries receive prompt attention from Chef Chit Min Thu's direct atelier.
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md gold-glow-subtle flex items-center justify-center gap-2 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Consultation Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
