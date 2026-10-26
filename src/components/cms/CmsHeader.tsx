import React from 'react';
import { usePortfolio, CmsTab, ViewMode } from '../../context/PortfolioContext';
import {
  Sparkles,
  UtensilsCrossed,
  Award,
  Phone,
  Compass,
  User,
  Inbox,
  Settings,
  LayoutTemplate,
  Columns,
  Eye,
  CheckCircle,
  ExternalLink,
  Globe,
} from 'lucide-react';

export const CmsHeader: React.FC = () => {
  const { data, activeView, setActiveView, cmsTab, setCmsTab, lastSaved } = usePortfolio();

  const tabs: { id: CmsTab; label: string; icon: React.FC<{ className?: string }>; count?: number }[] = [
    { id: 'dishes', label: 'Dishes & Projects', icon: UtensilsCrossed, count: data.dishes.length },
    { id: 'skills', label: 'Skills & Masteries', icon: Award, count: data.skills.length },
    { id: 'contact', label: 'Contact Details', icon: Phone },
    { id: 'journey', label: 'Career Journey', icon: Compass, count: data.milestones.length },
    { id: 'profile', label: 'Chef Profile & Hero', icon: User },
    {
      id: 'inquiries',
      label: 'Reservations',
      icon: Inbox,
      count: data.inquiries.filter((i) => i.status === 'new').length,
    },
    {
      id: 'analytics',
      label: 'Traffic & Geo',
      icon: Globe,
      count: data.analytics?.visitors?.length,
    },
    { id: 'settings', label: 'Backup & Sync', icon: Settings },
  ];

  return (
    <div className="bg-[#141416] border-b border-[#dfb877]/20 sticky top-0 z-40">
      {/* Upper Bar: Title & View Switches */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#dfb877] text-black flex items-center justify-center font-bold font-serif text-sm shadow-md">
            CMS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide">
                Chef Atelier CMS Studio
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#dfb877] bg-[#dfb877]/10 px-2 py-0.5 rounded-full border border-[#dfb877]/25">
                <CheckCircle className="w-3 h-3 text-[#dfb877]" />
                <span>Live Sync</span>
              </span>
            </div>
            <div className="text-[11px] text-gray-400 font-light truncate max-w-[200px] sm:max-w-none">
              Editing: <span className="text-[#f8e4be]">{data.profile.name}</span>'s Gastronomic Portfolio
            </div>
          </div>
        </div>

        {/* View Mode Controls (Desktop) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Segmented View Switcher */}
          <div className="hidden md:flex items-center bg-[#0a0a0b] p-1 rounded-xl border border-[#dfb877]/20">
            <button
              onClick={() => setActiveView('website')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'website'
                  ? 'bg-[#dfb877] text-black shadow-sm font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Full Website Visitor View"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </button>
            <button
              onClick={() => setActiveView('split')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'split'
                  ? 'bg-[#dfb877] text-black shadow-sm font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Side-by-side CMS Editor and Live Updating Website"
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Split Studio</span>
            </button>
            <button
              onClick={() => setActiveView('cms')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeView === 'cms'
                  ? 'bg-[#dfb877] text-black shadow-sm font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
              title="Dedicated Fullscreen CMS Workspace"
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              <span>CMS Workspace</span>
            </button>
          </div>

          {/* Quick Exit to Website */}
          <button
            onClick={() => setActiveView('website')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-black bg-[#1c1d22] hover:bg-[#dfb877] border border-[#dfb877]/30 rounded-lg transition-all"
          >
            <span>Preview Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Lower Bar: Navigation Tabs */}
      <div className="border-t border-[#dfb877]/10 bg-[#0e0e11] px-4 sm:px-6 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-1 sm:gap-2 h-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = cmsTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setCmsTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#dfb877] text-black font-semibold shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-[#1c1d22]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#dfb877]'}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums ${
                      isActive
                        ? 'bg-black/20 text-black'
                        : 'bg-[#1c1d22] text-[#f8e4be] border border-[#dfb877]/20'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
