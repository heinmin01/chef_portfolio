import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { CmsHeader } from './CmsHeader';
import { CmsProjectsManager } from './CmsProjectsManager';
import { CmsSkillsManager } from './CmsSkillsManager';
import { CmsContactManager } from './CmsContactManager';
import { CmsJourneyManager } from './CmsJourneyManager';
import { CmsProfileManager } from './CmsProfileManager';
import { CmsInquiriesManager } from './CmsInquiriesManager';
import { CmsTrafficGeoManager } from './CmsTrafficGeoManager';
import { CmsSettingsManager } from './CmsSettingsManager';

export const CmsWorkspace: React.FC = () => {
  const { cmsTab } = usePortfolio();

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-gray-200 flex flex-col">
      <CmsHeader />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        {cmsTab === 'dishes' && <CmsProjectsManager />}
        {cmsTab === 'skills' && <CmsSkillsManager />}
        {cmsTab === 'contact' && <CmsContactManager />}
        {cmsTab === 'journey' && <CmsJourneyManager />}
        {cmsTab === 'profile' && <CmsProfileManager />}
        {cmsTab === 'inquiries' && <CmsInquiriesManager />}
        {cmsTab === 'analytics' && <CmsTrafficGeoManager />}
        {cmsTab === 'settings' && <CmsSettingsManager />}
      </main>
    </div>
  );
};
