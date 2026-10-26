import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  Globe,
  MapPin,
  TrendingUp,
  Users,
  Clock,
  Send,
  Eye,
  Smartphone,
  Monitor,
  Tablet,
  Compass,
  Sparkles,
  RefreshCw,
  Trash2,
  ExternalLink,
} from 'lucide-react';

export const CmsTrafficGeoManager: React.FC = () => {
  const { data, simulatePatronVisit, clearAnalytics } = usePortfolio();
  const [selectedGeoCity, setSelectedGeoCity] = useState<string | null>(null);

  const analytics = data.analytics || {
    visitors: [],
    dishViews: {},
    dailyCounts: {},
  };

  const visitors = analytics.visitors || [];

  // Calculate high-level metrics
  const totalVisitors = visitors.length;
  const totalViews = Object.values(analytics.dailyCounts).reduce((a, b) => a + b, 0) || totalVisitors * 3;
  const avgDwellSeconds =
    totalVisitors > 0
      ? Math.round(visitors.reduce((acc, v) => acc + (v.dwellTimeSeconds || 120), 0) / totalVisitors)
      : 180;

  const inquiryCount = data.inquiries.length;
  const conversionRate = totalVisitors > 0 ? ((inquiryCount / totalVisitors) * 100).toFixed(1) : '0.0';

  // Group visitors by Country
  const countryMap: Record<
    string,
    { name: string; flag: string; count: number; code: string; topCity: string }
  > = {};
  visitors.forEach((v) => {
    if (!countryMap[v.country]) {
      countryMap[v.country] = {
        name: v.country,
        flag: v.flag,
        count: 0,
        code: v.countryCode,
        topCity: v.city,
      };
    }
    countryMap[v.country].count += 1;
  });

  const sortedCountries = Object.values(countryMap).sort((a, b) => b.count - a.count);

  // Group visitors by City
  const cityMap: Record<string, { city: string; country: string; flag: string; count: number; lat: number; lng: number }> = {};
  visitors.forEach((v) => {
    if (!cityMap[v.city]) {
      cityMap[v.city] = {
        city: v.city,
        country: v.country,
        flag: v.flag,
        count: 0,
        lat: v.lat,
        lng: v.lng,
      };
    }
    cityMap[v.city].count += 1;
  });

  const sortedCities = Object.values(cityMap).sort((a, b) => b.count - a.count);

  // Device split
  const deviceCounts = { desktop: 0, mobile: 0, tablet: 0 };
  visitors.forEach((v) => {
    if (v.device === 'desktop') deviceCounts.desktop += 1;
    else if (v.device === 'mobile') deviceCounts.mobile += 1;
    else deviceCounts.tablet += 1;
  });

  // Top Viewed Dishes
  const dishViewsList = data.dishes
    .map((dish) => ({
      dish,
      views: analytics.dishViews[dish.id] || (dish.featured ? 140 : 85),
    }))
    .sort((a, b) => b.views - a.views);

  // Filter visitors if city selected
  const displayedVisitors = selectedGeoCity
    ? visitors.filter((v) => v.city === selectedGeoCity)
    : visitors;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141416] p-6 rounded-2xl border border-[#dfb877]/15">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-xl text-white">
              Website Traffic & Patron Geo-Location Analytics
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Telemetry
            </span>
          </div>
          <p className="text-xs text-gray-400 font-light mt-1">
            Real-time visitor origin tracking, geographic density maps, device categorization, and gastronomic dish engagement
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={simulatePatronVisit}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#1c1d22] hover:bg-[#25262c] text-[#dfb877] border border-[#dfb877]/30 text-xs font-semibold rounded-xl transition-all shadow-sm"
            title="Simulate a real-time visit from a gastronomic capital (Tokyo, Zurich, NY, Paris, London)"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#dfb877]" />
            <span>Simulate VIP Visit</span>
          </button>

          <button
            onClick={clearAnalytics}
            className="p-2 text-gray-400 hover:text-red-400 bg-[#0a0a0b] hover:bg-red-500/10 border border-[#dfb877]/15 rounded-xl transition-colors"
            title="Clear Traffic History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Performance Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="uppercase tracking-wider font-semibold">Total Page Views</span>
            <TrendingUp className="w-4 h-4 text-[#dfb877]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            +24.8% vs previous period
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="uppercase tracking-wider font-semibold">Unique Patrons</span>
            <Users className="w-4 h-4 text-[#dfb877]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
            {totalVisitors.toLocaleString()}
          </div>
          <div className="text-[11px] text-gray-400">
            Across {sortedCountries.length} countries
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="uppercase tracking-wider font-semibold">Avg Dwell Time</span>
            <Clock className="w-4 h-4 text-[#dfb877]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-white tabular-nums">
            {Math.floor(avgDwellSeconds / 60)}m {avgDwellSeconds % 60}s
          </div>
          <div className="text-[11px] text-emerald-400 font-medium">
            Deep menu & tasting review
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span className="uppercase tracking-wider font-semibold">Inquiry Conversion</span>
            <Send className="w-4 h-4 text-[#dfb877]" />
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#dfb877] tabular-nums">
            {conversionRate}%
          </div>
          <div className="text-[11px] text-gray-400">
            {inquiryCount} banquet consultation requests
          </div>
        </div>
      </div>

      {/* Global Geo Distribution & Interactive World Visualization */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dfb877]/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#dfb877]/20 border border-[#dfb877]/30 flex items-center justify-center text-[#dfb877]">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">
                Global Patron Geography & Hotspots
              </h4>
              <p className="text-xs text-gray-400 font-light">
                Concentration of high-net-worth patrons, collectors, and Michelin inspectors browsing your portfolio
              </p>
            </div>
          </div>

          {selectedGeoCity && (
            <button
              onClick={() => setSelectedGeoCity(null)}
              className="text-xs text-[#dfb877] hover:underline self-start sm:self-auto"
            >
              Showing: {selectedGeoCity} (Clear Filter)
            </button>
          )}
        </div>

        {/* Stylized Dark Luxury World Map Graphic */}
        <div className="relative w-full aspect-[21/9] min-h-[220px] max-h-80 rounded-2xl overflow-hidden bg-[#070709] border border-[#dfb877]/20 flex items-center justify-center p-4">
          {/* Subtle Grid Lines */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(223,184,119,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(223,184,119,0.15) 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />

          {/* World SVG Map Silhouettes */}
          <svg
            className="w-full h-full text-[#1c1d22] fill-current opacity-60"
            viewBox="0 0 1000 500"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* North America */}
            <path d="M120,80 Q220,60 280,120 Q320,180 260,260 Q180,240 140,160 Z" />
            {/* South America */}
            <path d="M260,280 Q320,290 310,380 Q280,450 240,400 Q230,320 260,280 Z" />
            {/* Europe */}
            <path d="M460,90 Q540,80 560,140 Q530,190 470,180 Q450,130 460,90 Z" />
            {/* Africa */}
            <path d="M470,200 Q560,200 570,300 Q540,400 490,380 Q460,280 470,200 Z" />
            {/* Asia */}
            <path d="M580,80 Q780,60 840,180 Q780,280 620,220 Q570,160 580,80 Z" />
            {/* Japan Island Arc */}
            <path d="M840,140 Q855,145 850,170 Q840,160 840,140 Z" />
            {/* Australia */}
            <path d="M780,320 Q880,330 860,410 Q770,420 780,320 Z" />
          </svg>

          {/* Interactive City Hub Coordinates */}
          {[
            { city: 'Tokyo', flag: '🇯🇵', x: '84%', y: '32%', count: cityMap['Tokyo']?.count || 1 },
            { city: 'New York', flag: '🇺🇸', x: '26%', y: '28%', count: cityMap['New York']?.count || 1 },
            { city: 'San Francisco', flag: '🇺🇸', x: '18%', y: '33%', count: cityMap['San Francisco']?.count || 1 },
            { city: 'Zurich', flag: '🇨🇭', x: '49%', y: '26%', count: cityMap['Zurich']?.count || 1 },
            { city: 'Paris', flag: '🇫🇷', x: '46%', y: '25%', count: cityMap['Paris']?.count || 1 },
            { city: 'London', flag: '🇬🇧', x: '44%', y: '23%', count: cityMap['London']?.count || 1 },
            { city: 'Singapore', flag: '🇸🇬', x: '75%', y: '56%', count: cityMap['Singapore']?.count || 1 },
            { city: 'Dubai', flag: '🇦🇪', x: '62%', y: '37%', count: cityMap['Dubai']?.count || 1 },
          ].map((hub) => {
            const isSelected = selectedGeoCity === hub.city;

            return (
              <button
                key={hub.city}
                onClick={() => setSelectedGeoCity(isSelected ? null : hub.city)}
                style={{ left: hub.x, top: hub.y }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all z-20 ${
                  isSelected ? 'scale-125' : 'hover:scale-110'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#dfb877]/30 animate-ping absolute" />
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center text-[10px] shadow-lg ${
                      isSelected
                        ? 'bg-[#dfb877] border-white text-black ring-2 ring-[#dfb877]'
                        : 'bg-[#141416] border-[#dfb877] text-white'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#dfb877]" />
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0e0e11]/95 border border-[#dfb877]/30 px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white whitespace-nowrap shadow-xl opacity-90 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none">
                    <span>{hub.flag}</span>
                    <span>{hub.city}</span>
                    <span className="text-[#dfb877] font-mono">({hub.count})</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Top Countries & City Tables (2 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Countries Table */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#dfb877] font-bold block">
              Top Countries of Origin
            </span>

            <div className="space-y-2">
              {sortedCountries.slice(0, 5).map((c) => {
                const percentage = totalVisitors > 0 ? Math.round((c.count / totalVisitors) * 100) : 0;

                return (
                  <div
                    key={c.name}
                    className="p-3 rounded-xl bg-[#0a0a0b]/60 border border-[#dfb877]/10 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-lg">{c.flag}</span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                        <div className="text-[10px] text-gray-400">Hub: {c.topCity}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 h-1.5 bg-[#141416] rounded-full overflow-hidden border border-[#dfb877]/10 hidden sm:block">
                        <div
                          className="h-full bg-gradient-to-r from-[#dfb877] to-[#f8e4be] rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#dfb877] tabular-nums">
                        {c.count} ({percentage}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Cities Table */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider text-[#dfb877] font-bold block">
              Top Metropolitan Centers
            </span>

            <div className="space-y-2">
              {sortedCities.slice(0, 5).map((city) => (
                <div
                  key={city.city}
                  onClick={() =>
                    setSelectedGeoCity(selectedGeoCity === city.city ? null : city.city)
                  }
                  className={`p-3 rounded-xl border flex items-center justify-between gap-4 cursor-pointer transition-all ${
                    selectedGeoCity === city.city
                      ? 'bg-[#dfb877]/15 border-[#dfb877]'
                      : 'bg-[#0a0a0b]/60 border-[#dfb877]/10 hover:border-[#dfb877]/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg">{city.flag}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-white truncate">{city.city}</div>
                      <div className="text-[10px] text-gray-400">{city.country}</div>
                    </div>
                  </div>

                  <div className="text-xs font-mono font-bold text-white tabular-nums">
                    {city.count} patrons
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dish & Project Popularity + Technology Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Most Viewed Signature Creations */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 sm:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Eye className="w-4 h-4 text-[#dfb877]" />
              <h4 className="font-serif font-bold text-base text-white">
                Gastronomic Dish & Project Engagement
              </h4>
            </div>
            <span className="text-[11px] text-gray-400">Tasting note views</span>
          </div>

          <div className="space-y-3">
            {dishViewsList.map(({ dish, views }, idx) => (
              <div
                key={dish.id}
                className="p-3.5 rounded-xl bg-[#0a0a0b]/60 border border-[#dfb877]/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#141416] border border-[#dfb877]/20 flex items-center justify-center text-xs font-mono text-[#dfb877] shrink-0">
                    0{idx + 1}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-serif font-bold text-white truncate">
                      {dish.title}
                    </h5>
                    <span className="text-[10px] text-[#dfb877]/80 uppercase tracking-wider block">
                      {dish.course}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-semibold text-[#f8e4be] tabular-nums">
                    {views} views
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base text-white">
              Device Category Split
            </h4>
            <p className="text-xs text-gray-400 font-light">
              Patron browsing hardware distribution
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-[#0a0a0b]/60 border border-[#dfb877]/10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-white">
                <Monitor className="w-4 h-4 text-[#dfb877]" />
                <span>Desktop Workstation</span>
              </div>
              <span className="font-mono text-xs font-bold text-[#dfb877]">
                {deviceCounts.desktop} (
                {totalVisitors > 0 ? Math.round((deviceCounts.desktop / totalVisitors) * 100) : 0}%)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0a0b]/60 border border-[#dfb877]/10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-white">
                <Smartphone className="w-4 h-4 text-[#dfb877]" />
                <span>Mobile Smartphone</span>
              </div>
              <span className="font-mono text-xs font-bold text-[#dfb877]">
                {deviceCounts.mobile} (
                {totalVisitors > 0 ? Math.round((deviceCounts.mobile / totalVisitors) * 100) : 0}%)
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0a0a0b]/60 border border-[#dfb877]/10 flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-white">
                <Tablet className="w-4 h-4 text-[#dfb877]" />
                <span>Tablet / iPad</span>
              </div>
              <span className="font-mono text-xs font-bold text-[#dfb877]">
                {deviceCounts.tablet} (
                {totalVisitors > 0 ? Math.round((deviceCounts.tablet / totalVisitors) * 100) : 0}%)
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#141416] border border-[#dfb877]/20 text-[11px] text-gray-400">
            💡 Most private dining inquiries originate from Executive Desktops & iPads.
          </div>
        </div>
      </div>

      {/* Real-Time Patron Activity Stream */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-[#dfb877]/10 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#dfb877]" />
            <h4 className="font-serif font-bold text-base text-white">
              Recent Visitor Activity Log
            </h4>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            Showing {displayedVisitors.length} sessions
          </span>
        </div>

        <div className="space-y-2.5 overflow-x-auto">
          {displayedVisitors.map((vis) => (
            <div
              key={vis.id}
              className="p-3.5 rounded-xl bg-[#0a0a0b]/60 border border-[#dfb877]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-xl shrink-0">{vis.flag}</span>
                <div className="min-w-0">
                  <div className="text-white font-semibold truncate flex items-center gap-1.5">
                    <span>{vis.city}, {vis.country}</span>
                    <span className="text-[10px] text-gray-500 font-mono">({vis.device})</span>
                  </div>
                  <div className="text-[11px] text-gray-400 truncate">
                    Referrer: <span className="text-[#f8e4be]">{vis.referrer}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-400 shrink-0 self-end sm:self-auto text-[11px]">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#dfb877]" />
                  <span className="font-mono tabular-nums">{vis.dwellTimeSeconds}s dwell</span>
                </div>
                <div className="font-mono text-gray-500">
                  {new Date(vis.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {displayedVisitors.length === 0 && (
            <div className="text-center py-8 text-gray-500 text-xs">
              No recent visitors logged.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
