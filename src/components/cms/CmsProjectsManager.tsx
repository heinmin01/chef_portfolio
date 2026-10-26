import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectDish } from '../../types/portfolio';
import { CmsDishEditorModal } from './CmsDishEditorModal';
import { FoodPhotoOptimizerModal } from './FoodPhotoOptimizerModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Sparkles,
  Wine,
  Eye,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export const CmsProjectsManager: React.FC = () => {
  const { data, addDish, updateDish, deleteDish, reorderDishes, setSelectedDishForModal } =
    usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingDish, setEditingDish] = useState<ProjectDish | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isOptimizerOpen, setIsOptimizerOpen] = useState(false);

  const filteredDishes = data.dishes.filter((dish) => {
    const matchesCategory = categoryFilter === 'all' || dish.category === categoryFilter;
    const matchesQuery =
      dish.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.ingredients.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const handleOpenNew = () => {
    setEditingDish(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (dish: ProjectDish) => {
    setEditingDish(dish);
    setIsEditorOpen(true);
  };

  const handleSave = (dishData: Omit<ProjectDish, 'id' | 'order'>) => {
    if (editingDish) {
      updateDish(editingDish.id, dishData);
    } else {
      addDish(dishData);
    }
  };

  const handleDelete = (dish: ProjectDish) => {
    if (window.confirm(`Are you sure you want to delete "${dish.title}" from your portfolio?`)) {
      deleteDish(dish.id);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newDishes = [...data.dishes];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newDishes.length) return;

    const temp = newDishes[index];
    newDishes[index] = newDishes[targetIndex];
    newDishes[targetIndex] = temp;

    reorderDishes(newDishes);
  };

  const handleOptimizedImageForNewDish = (dataUrl: string) => {
    // Open new dish modal pre-filled with the optimized photo!
    setEditingDish({
      id: '',
      title: 'New Culinary Creation',
      course: 'Seasonal Tasting Course',
      category: 'mains',
      ingredients: 'Hyper-seasonal ingredients, reduction jus, botanical infusion',
      flavorNotes: 'Harmonious balance of umami, crisp acidity, and delicate texture.',
      imageUrl: dataUrl,
      featured: false,
      dietaryTags: ['Seasonal'],
      order: data.dishes.length + 1,
    });
    setIsEditorOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Gastronomic Projects & Signature Dishes
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            Add, update recipes, tasting notes, and arrange showcase dishes appearing in the Bento grid
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsOptimizerOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1d22] hover:bg-[#25262c] text-[#dfb877] border border-[#dfb877]/30 hover:border-[#dfb877]/60 font-semibold text-xs uppercase tracking-wider rounded-xl transition-all whitespace-nowrap shadow-sm"
            title="Upload and convert heavy camera photos to low-latency WebP"
          >
            <Zap className="w-4 h-4 fill-[#dfb877]" />
            <span>Raw Photo Optimizer</span>
          </button>

          <button
            onClick={handleOpenNew}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Signature Creation</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search creations, ingredients, or courses..."
            className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#dfb877]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'mains', label: 'Mains' },
            { id: 'seafood', label: 'Marine' },
            { id: 'starters', label: 'Starters' },
            { id: 'desserts', label: 'Desserts' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                categoryFilter === cat.id
                  ? 'bg-[#dfb877] text-black font-semibold'
                  : 'bg-[#141416] text-gray-400 hover:text-white border border-[#dfb877]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Table / Cards */}
      <div className="space-y-3">
        {filteredDishes.map((dish, index) => (
          <div
            key={dish.id}
            className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#dfb877]/40 transition-all"
          >
            {/* Left: Thumbnail & Details */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Thumbnail */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#1c1d22] border border-[#dfb877]/20 shrink-0 relative group">
                <img
                  src={dish.imageUrl}
                  alt={dish.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                {dish.featured && (
                  <span
                    title="Featured Double Card"
                    className="absolute top-1 left-1 px-1.5 py-0.2 bg-[#dfb877] text-black text-[9px] font-bold uppercase rounded"
                  >
                    Bento
                  </span>
                )}
              </div>

              {/* Text Info */}
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] uppercase tracking-wider text-[#dfb877] font-semibold bg-[#dfb877]/10 px-2 py-0.5 rounded">
                    {dish.course}
                  </span>
                  <span className="text-[10px] uppercase text-gray-400">
                    Category: {dish.category}
                  </span>
                  {dish.winePairing && (
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Wine className="w-3 h-3 text-[#dfb877]" />
                      <span className="truncate max-w-[150px]">{dish.winePairing}</span>
                    </span>
                  )}
                </div>

                <h4 className="font-serif font-bold text-base text-white truncate">
                  {dish.title}
                </h4>

                <p className="text-xs text-gray-300 font-light truncate">
                  {dish.ingredients}
                </p>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              {/* Preview in Tasting Modal */}
              <button
                onClick={() => setSelectedDishForModal(dish)}
                title="Preview Tasting Notes Modal"
                className="p-2 text-gray-400 hover:text-[#dfb877] bg-[#0a0a0b] hover:bg-[#1c1d22] border border-[#dfb877]/15 rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>

              {/* Move Order */}
              <div className="flex flex-col gap-0.5">
                <button
                  disabled={index === 0}
                  onClick={() => handleMove(index, 'up')}
                  title="Move Up"
                  className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={index === data.dishes.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  title="Move Down"
                  className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Edit */}
              <button
                onClick={() => handleOpenEdit(dish)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1c1d22] hover:bg-[#dfb877] text-white hover:text-black border border-[#dfb877]/30 rounded-lg transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(dish)}
                className="p-2 text-gray-400 hover:text-red-400 bg-[#0a0a0b] hover:bg-red-500/10 border border-[#dfb877]/15 hover:border-red-500/30 rounded-lg transition-colors"
                title="Delete Dish"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredDishes.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl space-y-3">
            <p className="text-gray-400 text-sm">No creations found matching your query.</p>
            <button
              onClick={handleOpenNew}
              className="px-4 py-2 bg-[#dfb877] text-black text-xs font-semibold rounded-lg"
            >
              Add First Dish
            </button>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <CmsDishEditorModal
        dish={editingDish}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
      />

      {/* Raw Food Photo Optimizer Lab Modal */}
      <FoodPhotoOptimizerModal
        isOpen={isOptimizerOpen}
        onClose={() => setIsOptimizerOpen(false)}
        onApplyOptimizedImage={handleOptimizedImageForNewDish}
      />
    </div>
  );
};

