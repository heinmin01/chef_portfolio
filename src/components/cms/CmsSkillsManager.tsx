import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { SkillItem } from '../../types/portfolio';
import { CmsSkillEditorModal } from './CmsSkillEditorModal';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Award,
  Sparkles,
} from 'lucide-react';

export const CmsSkillsManager: React.FC = () => {
  const { data, addSkill, updateSkill, deleteSkill, reorderSkills } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingSkill, setEditingSkill] = useState<SkillItem | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const filteredSkills = data.skills.filter((skill) => {
    const matchesCategory = categoryFilter === 'all' || skill.category === categoryFilter;
    const matchesQuery =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  });

  const handleOpenNew = () => {
    setEditingSkill(null);
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (skill: SkillItem) => {
    setEditingSkill(skill);
    setIsEditorOpen(true);
  };

  const handleSave = (skillData: Omit<SkillItem, 'id' | 'order'>) => {
    if (editingSkill) {
      updateSkill(editingSkill.id, skillData);
    } else {
      addSkill(skillData);
    }
  };

  const handleDelete = (skill: SkillItem) => {
    if (window.confirm(`Delete "${skill.name}" from culinary masteries?`)) {
      deleteSkill(skill.id);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const newSkills = [...data.skills];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newSkills.length) return;

    const temp = newSkills[index];
    newSkills[index] = newSkills[targetIndex];
    newSkills[targetIndex] = temp;

    reorderSkills(newSkills);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <div>
          <h3 className="font-serif font-bold text-xl text-white">
            Culinary Masteries & Skill Tree
          </h3>
          <p className="text-xs text-gray-400 font-light mt-1">
            Update technical proficiencies, years practiced, and specialized techniques showcased on your portfolio
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md gold-glow-subtle whitespace-nowrap self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Culinary Skill</span>
        </button>
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
            placeholder="Search masteries, ingredients, or knife arts..."
            className="w-full bg-[#141416] border border-[#dfb877]/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-[#dfb877]"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All' },
            { id: 'techniques', label: 'Techniques' },
            { id: 'philosophy', label: 'Philosophy' },
            { id: 'operations', label: 'Leadership' },
            { id: 'beverage', label: 'Sommelier' },
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

      {/* Skills List */}
      <div className="space-y-3">
        {filteredSkills.map((skill, index) => (
          <div
            key={skill.id}
            className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#dfb877]/40 transition-all"
          >
            {/* Details */}
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase tracking-wider text-[#dfb877] font-semibold bg-[#dfb877]/10 px-2 py-0.5 rounded">
                  {skill.category}
                </span>
                <span className="text-xs text-gray-400 font-mono tabular-nums">
                  {skill.years}
                </span>
                {skill.highlighted && (
                  <span className="text-[10px] uppercase font-bold text-[#f8e4be] bg-[#dfb877]/20 px-2 py-0.5 rounded border border-[#dfb877]/40">
                    Signature
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <h4 className="font-serif font-bold text-base text-white">
                  {skill.name}
                </h4>
                <span className="text-xs font-mono font-semibold text-[#dfb877] tabular-nums">
                  {skill.level}% Mastery
                </span>
              </div>

              <p className="text-xs text-gray-300 font-light line-clamp-1">
                {skill.description}
              </p>

              {/* Progress Bar */}
              <div className="w-full max-w-md h-1.5 bg-[#0a0a0b] rounded-full overflow-hidden border border-[#dfb877]/10 mt-1">
                <div
                  className="h-full bg-gradient-to-r from-[#dfb877] to-[#f8e4be] rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
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
                  disabled={index === data.skills.length - 1}
                  onClick={() => handleMove(index, 'down')}
                  title="Move Down"
                  className="p-1 text-gray-400 hover:text-white disabled:opacity-30 disabled:hover:text-gray-400"
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Edit */}
              <button
                onClick={() => handleOpenEdit(skill)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1c1d22] hover:bg-[#dfb877] text-white hover:text-black border border-[#dfb877]/30 rounded-lg transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              {/* Delete */}
              <button
                onClick={() => handleDelete(skill)}
                className="p-2 text-gray-400 hover:text-red-400 bg-[#0a0a0b] hover:bg-red-500/10 border border-[#dfb877]/15 hover:border-red-500/30 rounded-lg transition-colors"
                title="Delete Skill"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {filteredSkills.length === 0 && (
          <div className="text-center py-16 glass-card rounded-2xl space-y-3">
            <p className="text-gray-400 text-sm">No skills found matching your query.</p>
            <button
              onClick={handleOpenNew}
              className="px-4 py-2 bg-[#dfb877] text-black text-xs font-semibold rounded-lg"
            >
              Add First Skill
            </button>
          </div>
        )}
      </div>

      {/* Skill Editor Modal */}
      <CmsSkillEditorModal
        skill={editingSkill}
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
};
