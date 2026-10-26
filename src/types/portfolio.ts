export interface ProjectDish {
  id: string;
  title: string;
  course: string;
  category: 'mains' | 'seafood' | 'starters' | 'desserts' | 'kaiseki' | 'all';
  ingredients: string;
  flavorNotes: string;
  winePairing?: string;
  imageUrl: string;
  featured: boolean; // Large bento card
  dietaryTags?: string[];
  order: number;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'techniques' | 'philosophy' | 'beverage' | 'operations';
  level: number; // 0 - 100
  years: string;
  description: string;
  tags: string[];
  highlighted: boolean;
  order: number;
}

export interface JourneyMilestone {
  id: string;
  orderIndex: string;
  period: string;
  location: string;
  badge: string;
  title: string;
  establishment: string;
  category: 'apprenticeship' | 'michelin' | 'executive';
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  availability: string;
  instagram: string;
  michelinGuideUrl: string;
  pressKitUrl: string;
  linkedin: string;
  whatsapp?: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  kicker: string;
  monogram: string;
  heroHeadline: string;
  heroBio: string;
  stats: {
    michelinStars: string;
    yearsMastery: string;
    countriesTravelled: string;
    privateBanquets: string;
  };
}

export interface PressReview {
  id: string;
  quote: string;
  source: string;
  author: string;
  year: string;
}

export interface ReservationInquiry {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  experienceType: string;
  guests: string;
  targetDate: string;
  notes: string;
  status: 'new' | 'contacted' | 'confirmed' | 'archived';
}

export interface VisitorLog {
  id: string;
  timestamp: string;
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
  device: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  referrer: string;
  sectionsViewed: string[];
  dwellTimeSeconds: number;
}

export interface DishViewStat {
  dishId: string;
  dishTitle: string;
  views: number;
}

export interface TrafficAnalyticsData {
  visitors: VisitorLog[];
  dishViews: Record<string, number>;
  dailyCounts: Record<string, number>; // date "YYYY-MM-DD" -> count
}

export interface PortfolioData {
  profile: ProfileInfo;
  dishes: ProjectDish[];
  skills: SkillItem[];
  milestones: JourneyMilestone[];
  press: PressReview[];
  contact: ContactInfo;
  inquiries: ReservationInquiry[];
  analytics?: TrafficAnalyticsData;
}

