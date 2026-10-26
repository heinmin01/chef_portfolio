import React, { useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { CmsWorkspace } from './components/cms/CmsWorkspace';
import { Sparkles, Columns, Eye, SlidersHorizontal, ArrowLeft } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activeView, setActiveView, isEditMode, setIsEditMode } = usePortfolio();

  // Keyboard shortcut: Cmd+Shift+C or Ctrl+Shift+C to toggle CMS
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setActiveView(activeView === 'website' ? 'cms' : 'website');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeView, setActiveView]);

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-gray-200">
      {/* Website View */}
      {activeView === 'website' && (
        <>
          <PortfolioView />

          {/* Discreet Floating CMS Control Badge at bottom right */}
          <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
            <button
              onClick={() => setIsEditMode((prev) => !prev)}
              className={`px-3 py-2 text-xs font-semibold rounded-full border shadow-lg backdrop-blur-md transition-all flex items-center gap-1.5 ${
                isEditMode
                  ? 'bg-[#dfb877] text-black border-[#dfb877]'
                  : 'bg-[#141416]/90 text-gray-300 hover:text-white border-[#dfb877]/30'
              }`}
              title="Toggle inline edit icons on each section"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isEditMode ? 'Edit Mode Active' : 'Inline Edit'}</span>
            </button>

            <button
              onClick={() => setActiveView('cms')}
              className="px-4 py-2 bg-[#dfb877] hover:bg-[#f8e4be] text-black font-semibold text-xs uppercase tracking-wider rounded-full shadow-xl gold-glow flex items-center gap-2 transition-all"
              title="Open Full CMS Studio"
            >
              <Sparkles className="w-4 h-4" />
              <span>Open CMS Studio</span>
            </button>
          </div>
        </>
      )}

      {/* Split View (Side by side on desktop) */}
      {activeView === 'split' && (
        <div className="h-screen flex flex-col overflow-hidden bg-[#0a0a0b]">
          {/* Split Mode Floating Top Toolbar */}
          <div className="h-12 bg-[#141416] border-b border-[#dfb877]/20 px-6 flex items-center justify-between shrink-0 z-50">
            <div className="flex items-center gap-2 text-xs text-[#dfb877] font-semibold uppercase tracking-wider">
              <Columns className="w-4 h-4" />
              <span>Live Split Studio — Instant Real-Time Preview</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveView('website')}
                className="flex items-center gap-1 px-3 py-1 bg-[#1c1d22] hover:bg-[#dfb877] hover:text-black text-gray-300 text-xs rounded-lg transition-all"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Website</span>
              </button>
              <button
                onClick={() => setActiveView('cms')}
                className="flex items-center gap-1 px-3 py-1 bg-[#dfb877] text-black text-xs font-semibold rounded-lg hover:bg-[#f8e4be] transition-all"
              >
                <span>Full CMS</span>
              </button>
            </div>
          </div>

          {/* 2-Pane Container */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left Pane: CMS Workspace */}
            <div className="lg:w-1/2 h-full overflow-y-auto border-r border-[#dfb877]/15 bg-[#0e0e11]">
              <CmsWorkspace />
            </div>

            {/* Right Pane: Live Updating Website */}
            <div className="lg:w-1/2 h-full overflow-y-auto bg-[#0a0a0b]">
              <div className="sticky top-0 z-30 bg-[#141416]/95 backdrop-blur-md px-4 py-2 border-b border-[#dfb877]/15 flex items-center justify-between text-xs text-gray-400">
                <span className="text-[#dfb877] font-semibold">Live Visitor Viewport</span>
                <span className="text-[11px]">Real-time synchronization active</span>
              </div>
              <PortfolioView />
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen CMS Workspace */}
      {activeView === 'cms' && (
        <div>
          <CmsWorkspace />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <MainAppContent />
    </PortfolioProvider>
  );
}
