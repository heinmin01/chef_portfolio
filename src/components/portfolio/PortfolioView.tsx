import React from 'react';
import { Navbar } from './Navbar';
import { HeroSection } from './HeroSection';
import { JourneySection } from './JourneySection';
import { SignatureCreationsSection } from './SignatureCreationsSection';
import { SkillsSection } from './SkillsSection';
import { PressSection } from './PressSection';
import { ReserveSection } from './ReserveSection';
import { DishModal } from './DishModal';
import { Footer } from './Footer';
import { usePortfolio } from '../../context/PortfolioContext';

export const PortfolioView: React.FC = () => {
  const { isEditMode } = usePortfolio();

  return (
    <div className={`min-h-screen bg-[#0a0a0b] text-gray-200 selection:bg-[#dfb877] selection:text-black relative ${
      isEditMode ? 'ring-1 ring-[#dfb877]/30' : ''
    }`}>
      {/* Live Navigation */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main>
        <HeroSection />
        <JourneySection />
        <SignatureCreationsSection />
        <SkillsSection />
        <PressSection />
        <ReserveSection />
      </main>

      {/* Tasting Notes Modal */}
      <DishModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};
