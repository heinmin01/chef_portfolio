import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { JourneyMilestone } from '../../types/portfolio';
import { Plus, Edit2, Trash2, MapPin, Calendar, Check, X } from 'lucide-react';

export const CmsJourneyManager: React.FC = () => {
  const { data, addMilestone, updateMilestone, deleteMilestone } = usePortfolio();

  const [editingMilestone, setEditingMilestone] = useState<JourneyMilestone | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    period: '',
    location: '',
    badge: '',
    title: '',
    establishment: '',
    category: 'apprenticeship' as JourneyMilestone['category'],
    description: '',
    tags: '',
    imageUrl: '',
  });

  const handleOpenNew = () => {
    setEditingMilestone(null);
    setFormData({
      period: '2024 – Present',
      location: 'Tokyo & Manhattan',
      badge: 'Culinary Venture',
      title: 'Global Atelier Pop-Up Series',
      establishment: 'Chit Min Thu Gastronomy • Founder',
      category: 'executive',
      description: 'Curating multi-sensory pop-up dinners celebrating rare ingredients and antique sake vintages.',
      tags: 'Pop-Up, Rare Spirits, Kaiseki Modern',
      imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m: JourneyMilestone) => {
    setEditingMilestone(m);
    setFormData({
      period: m.period,
      location: m.location,
      badge: m.badge,
      title: m.title,
      establishment: m.establishment,
      category: m.category,
      description: m.description,
      tags: m.tags.join(', '),
      imageUrl: m.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    const tagsArr = formData.tags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingMilestone) {
      updateMilestone(editingMilestone.id, {
        ...formData,
        tags: tagsArr,
      });
    } else {
      addMilestone({
        orderIndex: String(data.milestones.length + 1).padStart(2, '0'),
        ...formData,
        tags: tagsArr,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Career Journey & Milestone Timeline
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            Manage your career progression, stages at Michelin-starred restaurants, and private atelier milestones
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Milestone</span>
        </button>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {data.milestones.map((m, index) => (
          <div
            key={m.id}
            className="glass-card rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#dfb877]/40 transition-all"
          >
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#0a0a0b] border border-[#dfb877]/30 flex items-center justify-center font-serif text-sm font-bold text-[#dfb877] shrink-0">
                {m.orderIndex || String(index + 1).padStart(2, '0')}
              </div>

              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider text-[#dfb877] font-semibold bg-[#dfb877]/10 px-2 py-0.5 rounded">
                    {m.badge}
                  </span>
                  <span className="text-xs text-gray-400 font-light flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#dfb877]" />
                    <span>{m.location} • {m.period}</span>
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-white truncate">
                  {m.title}
                </h4>

                <div className="text-xs text-[#dfb877]/80 truncate">
                  {m.establishment}
                </div>

                <p className="text-xs text-gray-300 font-light truncate">
                  {m.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => handleOpenEdit(m)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1c1d22] hover:bg-[#dfb877] text-white hover:text-black border border-[#dfb877]/30 rounded-lg transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete milestone "${m.title}"?`)) {
                    deleteMilestone(m.id);
                  }
                }}
                className="p-2 text-gray-400 hover:text-red-400 bg-[#0a0a0b] hover:bg-red-500/10 border border-[#dfb877]/15 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Milestone Modal */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-w-2xl w-full rounded-3xl overflow-hidden border border-[#dfb877]/30 shadow-2xl relative max-h-[90vh] flex flex-col bg-[#141416]"
          >
            <div className="p-6 border-b border-[#dfb877]/15 flex items-center justify-between bg-[#0e0e11] shrink-0">
              <h3 className="font-serif font-bold text-lg text-white">
                {editingMilestone ? 'Edit Career Milestone' : 'Add Career Milestone'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1c1d22] text-gray-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-gray-400 font-semibold block">
                    Milestone Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-gray-400 font-semibold block">
                    Badge / Tagline
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-gray-400 font-semibold block">
                    Location & Period
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Paris, France"
                    className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase text-gray-400 font-semibold block">
                    Years / Timeframe
                  </label>
                  <input
                    type="text"
                    value={formData.period}
                    onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                    placeholder="e.g. 2012 – 2015"
                    className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-gray-400 font-semibold block">
                  Establishment & Position
                </label>
                <input
                  type="text"
                  value={formData.establishment}
                  onChange={(e) => setFormData({ ...formData, establishment: e.target.value })}
                  placeholder="e.g. Ryugin Tokyo • Sous Chef"
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-gray-400 font-semibold block">
                  Timeline Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as JourneyMilestone['category'],
                    })
                  }
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                >
                  <option value="apprenticeship">Apprenticeship</option>
                  <option value="michelin">Michelin Stages</option>
                  <option value="executive">Executive & Private</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-gray-400 font-semibold block">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#dfb877] resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs uppercase text-gray-400 font-semibold block">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
              </div>

              <div className="pt-4 border-t border-[#dfb877]/15 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#dfb877] text-black font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#f8e4be]"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
