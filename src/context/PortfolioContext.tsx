import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PortfolioData,
  ProjectDish,
  SkillItem,
  ContactInfo,
  ProfileInfo,
  JourneyMilestone,
  ReservationInquiry,
  VisitorLog,
  TrafficAnalyticsData,
} from '../types/portfolio';
import { INITIAL_PORTFOLIO_DATA } from '../data/initialPortfolioData';
import {
  detectDevice,
  detectBrowser,
  detectClientGeoLocation,
  generateSimulatedPatron,
} from '../utils/trafficTracker';

export type CmsTab =
  | 'dishes'
  | 'skills'
  | 'contact'
  | 'journey'
  | 'profile'
  | 'inquiries'
  | 'analytics'
  | 'settings';

export type ViewMode = 'website' | 'split' | 'cms';

interface PortfolioContextType {
  data: PortfolioData;
  activeView: ViewMode;
  setActiveView: (view: ViewMode) => void;
  cmsTab: CmsTab;
  setCmsTab: (tab: CmsTab) => void;
  isEditMode: boolean;
  setIsEditMode: (val: boolean | ((prev: boolean) => boolean)) => void;
  lastSaved: Date | null;

  // Dishes (Projects)
  addDish: (dish: Omit<ProjectDish, 'id' | 'order'>) => void;
  updateDish: (id: string, updates: Partial<ProjectDish>) => void;
  deleteDish: (id: string) => void;
  reorderDishes: (dishes: ProjectDish[]) => void;

  // Skills
  addSkill: (skill: Omit<SkillItem, 'id' | 'order'>) => void;
  updateSkill: (id: string, updates: Partial<SkillItem>) => void;
  deleteSkill: (id: string) => void;
  reorderSkills: (skills: SkillItem[]) => void;

  // Contact
  updateContact: (contact: Partial<ContactInfo>) => void;

  // Profile / Hero
  updateProfile: (profile: Partial<ProfileInfo>) => void;

  // Journey / Milestones
  addMilestone: (milestone: Omit<JourneyMilestone, 'id'>) => void;
  updateMilestone: (id: string, updates: Partial<JourneyMilestone>) => void;
  deleteMilestone: (id: string) => void;

  // Inquiries / Reservations
  addInquiry: (inquiry: Omit<ReservationInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: ReservationInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // Analytics & Geo-location
  recordDishView: (dishId: string) => void;
  addVisitorLog: (visitor: VisitorLog) => void;
  simulatePatronVisit: () => void;
  clearAnalytics: () => void;

  // Management
  resetToDefault: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonStr: string) => boolean;

  // Modal
  selectedDishForModal: ProjectDish | null;
  setSelectedDishForModal: (dish: ProjectDish | null) => void;
}

const STORAGE_KEY = 'chef_portfolio_cms_data_v1';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.profile && parsed.dishes && parsed.skills && parsed.contact) {
          // ensure analytics exists
          if (!parsed.analytics) {
            parsed.analytics = INITIAL_PORTFOLIO_DATA.analytics;
          }
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return INITIAL_PORTFOLIO_DATA;
  });

  const [activeView, setActiveView] = useState<ViewMode>('website');
  const [cmsTab, setCmsTab] = useState<CmsTab>('dishes');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(() => new Date());
  const [selectedDishForModal, setSelectedDishForModal] = useState<ProjectDish | null>(null);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      setLastSaved(new Date());
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }, [data]);

  // Real client session tracking on mount
  useEffect(() => {
    const trackClientSession = async () => {
      try {
        const sessionKey = 'cmt_session_recorded_v1';
        if (sessionStorage.getItem(sessionKey)) return;
        sessionStorage.setItem(sessionKey, 'true');

        const geo = await detectClientGeoLocation();
        const todayStr = new Date().toISOString().slice(0, 10);

        const newLog: VisitorLog = {
          id: `vis-${Date.now()}`,
          timestamp: new Date().toISOString(),
          country: geo.country,
          countryCode: geo.countryCode,
          flag: geo.flag,
          city: geo.city,
          region: geo.region,
          lat: geo.lat,
          lng: geo.lng,
          device: detectDevice(),
          browser: detectBrowser(),
          referrer: document.referrer || 'Direct Visit (Portfolio)',
          sectionsViewed: ['Hero', 'Signature Creations'],
          dwellTimeSeconds: 45,
        };

        setData((prev) => {
          const currentAnalytics = prev.analytics || {
            visitors: [],
            dishViews: {},
            dailyCounts: {},
          };

          return {
            ...prev,
            analytics: {
              ...currentAnalytics,
              visitors: [newLog, ...(currentAnalytics.visitors || [])].slice(0, 100),
              dailyCounts: {
                ...currentAnalytics.dailyCounts,
                [todayStr]: (currentAnalytics.dailyCounts[todayStr] || 0) + 1,
              },
            },
          };
        });
      } catch (e) {
        // quiet error
      }
    };

    trackClientSession();
  }, []);

  // Dishes (Projects) CRUD
  const addDish = useCallback((dish: Omit<ProjectDish, 'id' | 'order'>) => {
    setData((prev) => {
      const newDish: ProjectDish = {
        ...dish,
        id: `dish-${Date.now()}`,
        order: prev.dishes.length + 1,
      };
      return {
        ...prev,
        dishes: [...prev.dishes, newDish],
      };
    });
  }, []);

  const updateDish = useCallback((id: string, updates: Partial<ProjectDish>) => {
    setData((prev) => ({
      ...prev,
      dishes: prev.dishes.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    }));
  }, []);

  const deleteDish = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      dishes: prev.dishes.filter((d) => d.id !== id),
    }));
  }, []);

  const reorderDishes = useCallback((dishes: ProjectDish[]) => {
    setData((prev) => ({
      ...prev,
      dishes: dishes.map((dish, idx) => ({ ...dish, order: idx + 1 })),
    }));
  }, []);

  // Skills CRUD
  const addSkill = useCallback((skill: Omit<SkillItem, 'id' | 'order'>) => {
    setData((prev) => {
      const newSkill: SkillItem = {
        ...skill,
        id: `skill-${Date.now()}`,
        order: prev.skills.length + 1,
      };
      return {
        ...prev,
        skills: [...prev.skills, newSkill],
      };
    });
  }, []);

  const updateSkill = useCallback((id: string, updates: Partial<SkillItem>) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...updates } : s)),
    }));
  }, []);

  const deleteSkill = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  }, []);

  const reorderSkills = useCallback((skills: SkillItem[]) => {
    setData((prev) => ({
      ...prev,
      skills: skills.map((skill, idx) => ({ ...skill, order: idx + 1 })),
    }));
  }, []);

  // Contact Info
  const updateContact = useCallback((contactUpdates: Partial<ContactInfo>) => {
    setData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        ...contactUpdates,
      },
    }));
  }, []);

  // Profile / Hero
  const updateProfile = useCallback((profileUpdates: Partial<ProfileInfo>) => {
    setData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        ...profileUpdates,
        stats: {
          ...prev.profile.stats,
          ...(profileUpdates.stats || {}),
        },
      },
    }));
  }, []);

  // Journey / Milestones
  const addMilestone = useCallback((milestone: Omit<JourneyMilestone, 'id'>) => {
    setData((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          ...milestone,
          id: `milestone-${Date.now()}`,
        },
      ],
    }));
  }, []);

  const updateMilestone = useCallback((id: string, updates: Partial<JourneyMilestone>) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  }, []);

  const deleteMilestone = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
  }, []);

  // Inquiries
  const addInquiry = useCallback(
    (inquiry: Omit<ReservationInquiry, 'id' | 'createdAt' | 'status'>) => {
      setData((prev) => ({
        ...prev,
        inquiries: [
          {
            ...inquiry,
            id: `inq-${Date.now()}`,
            createdAt: new Date().toISOString(),
            status: 'new',
          },
          ...prev.inquiries,
        ],
      }));
    },
    []
  );

  const updateInquiryStatus = useCallback((id: string, status: ReservationInquiry['status']) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.map((inq) => (inq.id === id ? { ...inq, status } : inq)),
    }));
  }, []);

  const deleteInquiry = useCallback((id: string) => {
    setData((prev) => ({
      ...prev,
      inquiries: prev.inquiries.filter((inq) => inq.id !== id),
    }));
  }, []);

  // Analytics & Geo methods
  const recordDishView = useCallback((dishId: string) => {
    setData((prev) => {
      const analytics = prev.analytics || { visitors: [], dishViews: {}, dailyCounts: {} };
      return {
        ...prev,
        analytics: {
          ...analytics,
          dishViews: {
            ...analytics.dishViews,
            [dishId]: (analytics.dishViews[dishId] || 0) + 1,
          },
        },
      };
    });
  }, []);

  const addVisitorLog = useCallback((visitor: VisitorLog) => {
    const todayStr = new Date().toISOString().slice(0, 10);
    setData((prev) => {
      const analytics = prev.analytics || { visitors: [], dishViews: {}, dailyCounts: {} };
      return {
        ...prev,
        analytics: {
          ...analytics,
          visitors: [visitor, ...analytics.visitors].slice(0, 100),
          dailyCounts: {
            ...analytics.dailyCounts,
            [todayStr]: (analytics.dailyCounts[todayStr] || 0) + 1,
          },
        },
      };
    });
  }, []);

  const simulatePatronVisit = useCallback(() => {
    const simLog = generateSimulatedPatron();
    addVisitorLog(simLog);
  }, [addVisitorLog]);

  const clearAnalytics = useCallback(() => {
    if (window.confirm('Reset all website traffic telemetry and visitor logs?')) {
      setData((prev) => ({
        ...prev,
        analytics: {
          visitors: [],
          dishViews: {},
          dailyCounts: {},
        },
      }));
    }
  }, []);

  // Reset & Import/Export
  const resetToDefault = useCallback(() => {
    if (
      window.confirm(
        'Reset all portfolio and CMS content back to the original website template? Any unsaved custom additions will be reverted.'
      )
    ) {
      setData(INITIAL_PORTFOLIO_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PORTFOLIO_DATA));
    }
  }, []);

  const exportDataJson = useCallback(() => {
    return JSON.stringify(data, null, 2);
  }, [data]);

  const importDataJson = useCallback((jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.profile && parsed.dishes && parsed.skills && parsed.contact) {
        if (!parsed.analytics) {
          parsed.analytics = INITIAL_PORTFOLIO_DATA.analytics;
        }
        setData(parsed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        return true;
      }
    } catch (e) {
      console.error('Import error:', e);
    }
    return false;
  }, []);

  // When a dish is opened in modal, record dish view
  const handleSetSelectedDish = useCallback(
    (dish: ProjectDish | null) => {
      setSelectedDishForModal(dish);
      if (dish && dish.id) {
        recordDishView(dish.id);
      }
    },
    [recordDishView]
  );

  return (
    <PortfolioContext.Provider
      value={{
        data,
        activeView,
        setActiveView,
        cmsTab,
        setCmsTab,
        isEditMode,
        setIsEditMode,
        lastSaved,
        addDish,
        updateDish,
        deleteDish,
        reorderDishes,
        addSkill,
        updateSkill,
        deleteSkill,
        reorderSkills,
        updateContact,
        updateProfile,
        addMilestone,
        updateMilestone,
        deleteMilestone,
        addInquiry,
        updateInquiryStatus,
        deleteInquiry,
        recordDishView,
        addVisitorLog,
        simulatePatronVisit,
        clearAnalytics,
        resetToDefault,
        exportDataJson,
        importDataJson,
        selectedDishForModal,
        setSelectedDishForModal: handleSetSelectedDish,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
