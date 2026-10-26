import React, { useState, useEffect } from 'react';
import { ProjectDish } from '../../types/portfolio';
import { CulinaryImagePicker } from './CulinaryImagePicker';
import { X, Sparkles, Utensils, Wine, Check, Image as ImageIcon } from 'lucide-react';

interface CmsDishEditorModalProps {
  dish: ProjectDish | null; // null if adding new
  isOpen: boolean;
  onClose: () => void;
  onSave: (dishData: Omit<ProjectDish, 'id' | 'order'>) => void;
}

export const CmsDishEditorModal: React.FC<CmsDishEditorModalProps> = ({
  dish,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    course: '',
    category: 'mains' as ProjectDish['category'],
    ingredients: '',
    flavorNotes: '',
    winePairing: '',
    imageUrl: '/src/assets/images/dish_truffle_wagyu_1792982470493.jpg',
    featured: false,
    dietaryTags: '',
  });

  useEffect(() => {
    if (dish) {
      setFormData({
        title: dish.title,
        course: dish.course,
        category: dish.category,
        ingredients: dish.ingredients,
        flavorNotes: dish.flavorNotes,
        winePairing: dish.winePairing || '',
        imageUrl: dish.imageUrl,
        featured: dish.featured,
        dietaryTags: (dish.dietaryTags || []).join(', '),
      });
    } else {
      setFormData({
        title: '',
        course: 'Signature Course',
        category: 'mains',
        ingredients: '',
        flavorNotes: '',
        winePairing: '',
        imageUrl: '/src/assets/images/dish_truffle_wagyu_1792982470493.jpg',
        featured: false,
        dietaryTags: 'Seasonal, Umami Craft',
      });
    }
  }, [dish, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const tagsArray = formData.dietaryTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: formData.title,
      course: formData.course || 'Seasonal Course',
      category: formData.category,
      ingredients: formData.ingredients,
      flavorNotes: formData.flavorNotes,
      winePairing: formData.winePairing || undefined,
      imageUrl: formData.imageUrl || '/src/assets/images/dish_truffle_wagyu_1792982470493.jpg',
      featured: formData.featured,
      dietaryTags: tagsArray,
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
        className="glass-card max-w-3xl w-full rounded-3xl overflow-hidden border border-[#dfb877]/30 shadow-2xl relative max-h-[92vh] flex flex-col bg-[#141416]"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#dfb877]/15 flex items-center justify-between bg-[#0e0e11] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#dfb877]/20 border border-[#dfb877]/40 flex items-center justify-center text-[#dfb877]">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                {dish ? 'Edit Signature Creation' : 'Add New Signature Creation'}
              </h3>
              <p className="text-xs text-gray-400">
                Update gastronomic components, tasting notes, and sommelier pairing
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
          {/* Title & Course */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Dish Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. A5 Miyazaki Wagyu & Truffle Jus"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Course Type / Subtitle
              </label>
              <input
                type="text"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                placeholder="e.g. Autumn Tasting Course VI"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>
          </div>

          {/* Category & Featured Bento Toggle */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Menu Category
              </label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value as ProjectDish['category'] })
                }
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              >
                <option value="mains">Grand Mains</option>
                <option value="seafood">Raw & Marine</option>
                <option value="starters">Amuse-Bouche & Starters</option>
                <option value="desserts">Grand Finale Desserts</option>
                <option value="kaiseki">Kaiseki Seasonal</option>
              </select>
            </div>

            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="flex items-center gap-3 p-2.5 bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl cursor-pointer hover:border-[#dfb877]/40 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded text-[#dfb877] focus:ring-[#dfb877] accent-[#dfb877] w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-semibold text-white block">Featured Bento Card</span>
                  <span className="text-gray-400 text-[11px]">Takes double-width prominence</span>
                </div>
              </label>
            </div>
          </div>

          {/* Ingredients & Flavor Profile */}
          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Ingredients & Culinary Components
            </label>
            <textarea
              rows={2}
              value={formData.ingredients}
              onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
              placeholder="e.g. Hokkaido Dayboat Scallops, Finger Lime Pearls, Compressed Green Apple, Yuzu-Kaffir Emulsion"
              className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#dfb877] resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
              Tasting Profile & Flavor Notes
            </label>
            <textarea
              rows={2}
              value={formData.flavorNotes}
              onChange={(e) => setFormData({ ...formData, flavorNotes: e.target.value })}
              placeholder="e.g. Crisp citrus acidity opening into sweet marine tenderness with refreshing herbaceous finish."
              className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#dfb877] resize-none"
            />
          </div>

          {/* Sommelier Pairing & Dietary Tags */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Sommelier Wine & Sake Pairing
              </label>
              <input
                type="text"
                value={formData.winePairing}
                onChange={(e) => setFormData({ ...formData, winePairing: e.target.value })}
                placeholder="e.g. 2016 Domaine Armand Rousseau Gevrey-Chambertin"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Dietary & Flavor Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.dietaryTags}
                onChange={(e) => setFormData({ ...formData, dietaryTags: e.target.value })}
                placeholder="Gluten-Free, High-Umami, Raw Marine"
                className="w-full bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#dfb877]"
              />
            </div>
          </div>

          {/* Image Picker */}
          <div className="space-y-3 pt-2 border-t border-[#dfb877]/10">
            <CulinaryImagePicker
              currentUrl={formData.imageUrl}
              onSelect={(url) => setFormData({ ...formData, imageUrl: url })}
            />

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold block">
                Direct Image URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 bg-[#0a0a0b] border border-[#dfb877]/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#dfb877]"
                />
                {formData.imageUrl && (
                  <div className="w-10 h-10 rounded-lg overflow-hidden border border-[#dfb877]/30 shrink-0 bg-[#0a0a0b]">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
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
              <span>{dish ? 'Save Creation' : 'Publish to Portfolio'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
