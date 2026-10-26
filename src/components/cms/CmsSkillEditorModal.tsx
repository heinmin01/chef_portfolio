import React, { useState, useEffect } from 'react';
import { SkillItem } from '../../types/portfolio';
import { X, Award, Check } from 'lucide-react';

interface CmsSkillEditorModalProps {
  skill: SkillItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (skillData: Omit<SkillItem, 'id' | 'order'>) => void;
}

export const CmsSkillEditorModal: React.FC<CmsSkillEditorModalProps> = ({
  skill,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'techniques' as SkillItem['category'],
    level: 95,
    years: '15+ yrs',
    description: '',
    tags: '',
    highlighted: false,
  });

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        years: skill.years,
        description: skill.description,
        tags: skill.tags.join(', '),
        highlighted: skill.highlighted,
      });
    } else {
      setFormData({
        name: '',
        category: 'techniques',
        level: 90,
        years: '10+ yrs',
        description: '',
        tags: 'Mastery, Culinary Craft',
        highlighted: false,
      });
    }
  }, [skill, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const tagsArray = formData.tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      name: formData.name,
      category: formData.category,
      level: Number(formData.level),
      years: formData.years || '10+ yrs',
      description: formData.description,
      tags: tagsArray,
      highlighted: formData.highlighted,
    });
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card max-w-2xl w-full rounded-3xl overflow-hidden border border-[#dfb877]/30 shadow-2xl relative max-h-[90vh] flex flex-col bg-[#141416]"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#dfb877]/15 flex items-center justify-between bg-[#0e0e11] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#dfb877]/20 border border-[#dfb877]/40 flex items-center justify-center text-[#dfb877]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                {skill ? 'Edit Culinary Mastery' : 'Add New Culinary Skill'}
              </h3>
              <p className="text-xs text-gray-400">
                Define the gastronomic craft, proficiency rating, and technical background
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1c1d22] text-gray-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          {/* Skill Name */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Culinary Discipline / Skill Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Saucier Craftsmanship & Bone Marrow Reductions"
              className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
            />
          </div>

          {/* Category & Years */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as SkillItem['category'] })
                }
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              >
                <option value="techniques">Techniques & Craft</option>
                <option value="philosophy">Philosophy & Fermentation</option>
                <option value="operations">Leadership & Architecture</option>
                <option value="beverage">Beverage & Sommelier</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Experience Duration
              </label>
              <input
                type="text"
                value={formData.years}
                onChange={(e) => setFormData({ ...formData, years: e.target.value })}
                placeholder="e.g. 18+ yrs"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>
          </div>

          {/* Mastery Level Slider */}
          <div className="space-y-2 p-4 bg-[#0a0a0b] rounded-2xl border border-[#dfb877]/15">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase tracking-wider text-gray-400 font-semibold">
                Mastery Proficiency
              </span>
              <span className="font-mono text-sm font-bold text-[#dfb877] tabular-nums">
                {formData.level}%
              </span>
            </div>
            <input
              type="range"
              min="50"
              max="100"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
              className="w-full accent-[#dfb877] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>Advanced (50%)</span>
              <span>Expert (80%)</span>
              <span>Master / Luminary (100%)</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Technique Description & Philosophical Context
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detail the technical execution, origin, thermal ranges, or tools involved..."
              className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#dfb877] resize-none"
            />
          </div>

          {/* Tags & Signature Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Sub-skills & Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="Yanagiba Knife, Slicing, Umami Extraction"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>

            <div className="space-y-1.5 flex flex-col justify-end pt-1">
              <label className="flex items-center gap-3 p-3 bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl cursor-pointer hover:border-[#dfb877]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.highlighted}
                  onChange={(e) => setFormData({ ...formData, highlighted: e.target.checked })}
                  className="rounded text-[#dfb877] focus:ring-[#dfb877] accent-[#dfb877] w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Mark as Signature Mastery</span>
                  <span className="text-gray-400 text-[11px]">Displays 'Signature' gold pill on site</span>
                </div>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#dfb877]/15 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs uppercase tracking-wider text-gray-400 hover:text-white rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{skill ? 'Update Skill' : 'Add to Portfolio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
