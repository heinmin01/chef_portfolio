import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { data, setActiveView } = usePortfolio();

  return (
    <footer className="py-16 px-6 border-t border-[#dfb877]/10 bg-[#0a0a0b] text-center space-y-8 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Monogram Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#dfb877]/40 flex items-center justify-center bg-[#141416]">
            <span className="font-serif text-xs font-bold text-[#dfb877]">
              {data.profile.monogram}
            </span>
          </div>
          <span className="font-serif text-sm tracking-wider uppercase text-white font-medium">
            {data.profile.name} • Gastronomy Atelier
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center flex-wrap justify-center gap-8 text-xs uppercase tracking-widest text-gray-400">
          <a
            href={data.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#dfb877] transition-colors"
          >
            Instagram
          </a>
          <a
            href={data.contact.michelinGuideUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#dfb877] transition-colors"
          >
            Michelin Guide
          </a>
          <a
            href="#press"
            className="hover:text-[#dfb877] transition-colors"
          >
            Press Kit
          </a>
          <button
            onClick={() => setActiveView('cms')}
            className="text-[#dfb877] hover:text-[#f8e4be] transition-colors flex items-center gap-1 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>CMS Admin Studio</span>
          </button>
        </div>

        {/* Copyright */}
        <div className="text-xs text-gray-500 font-light">
          © {new Date().getFullYear()} {data.profile.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
