import { VisitorLog } from '../types/portfolio';

// Common gastronomic centers for fallback / demo simulation
const GLOBAL_GASTRONOMY_HUBS = [
  { city: 'Tokyo', country: 'Japan', countryCode: 'JP', flag: '🇯🇵', region: 'Kanto', lat: 35.6762, lng: 139.6503 },
  { city: 'New York', country: 'United States', countryCode: 'US', flag: '🇺🇸', region: 'New York', lat: 40.7128, lng: -74.006 },
  { city: 'Zurich', country: 'Switzerland', countryCode: 'CH', flag: '🇨🇭', region: 'Zurich', lat: 47.3769, lng: 8.5417 },
  { city: 'Paris', country: 'France', countryCode: 'FR', flag: '🇫🇷', region: 'Île-de-France', lat: 48.8566, lng: 2.3522 },
  { city: 'London', country: 'United Kingdom', countryCode: 'GB', flag: '🇬🇧', region: 'Greater London', lat: 51.5074, lng: -0.1278 },
  { city: 'Singapore', country: 'Singapore', countryCode: 'SG', flag: '🇸🇬', region: 'Central', lat: 1.3521, lng: 103.8198 },
  { city: 'Milan', country: 'Italy', countryCode: 'IT', flag: '🇮🇹', region: 'Lombardy', lat: 45.4642, lng: 9.19 },
  { city: 'Dubai', country: 'United Arab Emirates', countryCode: 'AE', flag: '🇦🇪', region: 'Dubai', lat: 25.2048, lng: 55.2708 },
  { city: 'Hong Kong', country: 'Hong Kong', countryCode: 'HK', flag: '🇭🇰', region: 'Hong Kong Island', lat: 22.3193, lng: 114.1694 },
  { city: 'San Francisco', country: 'United States', countryCode: 'US', flag: '🇺🇸', region: 'California', lat: 37.7749, lng: -122.4194 },
];

/**
 * Detect client device category
 */
export function detectDevice(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Detect simplified browser string
 */
export function detectBrowser(): string {
  if (typeof window === 'undefined') return 'Web Browser';
  const ua = navigator.userAgent;
  let browser = 'Browser';
  let os = 'OS';

  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';

  if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('Linux')) os = 'Linux';

  return `${browser} / ${os}`;
}

/**
 * Resolve client geolocation via IP with fallback
 */
export async function detectClientGeoLocation(): Promise<{
  country: string;
  countryCode: string;
  flag: string;
  city: string;
  region: string;
  lat: number;
  lng: number;
}> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.country_name) {
        return {
          country: data.country_name,
          countryCode: data.country_code || 'US',
          flag: getCountryFlag(data.country_code || 'US'),
          city: data.city || 'Metropolitan Area',
          region: data.region || '',
          lat: data.latitude || 40.7128,
          lng: data.longitude || -74.006,
        };
      }
    }
  } catch {
    // Network or rate-limit fallback
  }

  // Graceful fallback to timezone-based estimation
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
  if (tz.includes('Tokyo') || tz.includes('Asia/Tokyo')) {
    return GLOBAL_GASTRONOMY_HUBS[0]; // Tokyo
  }
  if (tz.includes('Zurich') || tz.includes('Europe/Zurich')) {
    return GLOBAL_GASTRONOMY_HUBS[2]; // Zurich
  }
  if (tz.includes('Paris') || tz.includes('Europe/Paris')) {
    return GLOBAL_GASTRONOMY_HUBS[3]; // Paris
  }
  if (tz.includes('London') || tz.includes('Europe/London')) {
    return GLOBAL_GASTRONOMY_HUBS[4]; // London
  }
  if (tz.includes('Singapore') || tz.includes('Asia/Singapore')) {
    return GLOBAL_GASTRONOMY_HUBS[5]; // Singapore
  }

  // Default to New York
  return GLOBAL_GASTRONOMY_HUBS[1];
}

/**
 * Convert 2-letter country code to flag emoji
 */
export function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Generate a simulated VIP visitor log from a gastronomy hub (useful for testing)
 */
export function generateSimulatedPatron(): VisitorLog {
  const hub = GLOBAL_GASTRONOMY_HUBS[Math.floor(Math.random() * GLOBAL_GASTRONOMY_HUBS.length)];
  const referrers = [
    'https://guide.michelin.com',
    'https://www.nytimes.com/dining',
    'Instagram @gastronomy_atelier',
    'Direct Concierge Referral',
    'https://cosmic-cucurucho-4b7d3c.netlify.app',
    'Private Dining Agency VIP',
  ];
  const sections = [
    ['Hero', 'Signature Creations', 'Reserve'],
    ['Hero', 'Interactive Journey', 'Signature Creations'],
    ['Signature Creations', 'Culinary Masteries', 'Reserve'],
    ['Hero', 'Press Reviews', 'Reserve'],
  ];

  return {
    id: `vis-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    country: hub.country,
    countryCode: hub.countryCode,
    flag: hub.flag,
    city: hub.city,
    region: hub.region,
    lat: hub.lat + (Math.random() - 0.5) * 0.05,
    lng: hub.lng + (Math.random() - 0.5) * 0.05,
    device: Math.random() > 0.45 ? 'desktop' : Math.random() > 0.5 ? 'mobile' : 'tablet',
    browser: Math.random() > 0.5 ? 'Safari / macOS' : 'Chrome / Windows',
    referrer: referrers[Math.floor(Math.random() * referrers.length)],
    sectionsViewed: sections[Math.floor(Math.random() * sections.length)],
    dwellTimeSeconds: Math.floor(120 + Math.random() * 240),
  };
}
