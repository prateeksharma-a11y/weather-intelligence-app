import React from 'react';
import { MapPin } from 'lucide-react';
import { GeoLocation } from '../types/weather';

export const POPULAR_CITIES: GeoLocation[] = [
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', country_code: 'JP', timezone: 'Asia/Tokyo' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', admin1: 'New York', country_code: 'US', timezone: 'America/New_York' },
  { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom', country_code: 'GB', timezone: 'Europe/London' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', country_code: 'FR', timezone: 'Europe/Paris' },
  { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia', country_code: 'AU', timezone: 'Australia/Sydney' },
  { id: 1275339, name: 'Mumbai', latitude: 19.0728, longitude: 72.8826, country: 'India', country_code: 'IN', timezone: 'Asia/Kolkata' },
  { id: 1835848, name: 'Seoul', latitude: 37.566, longitude: 126.9784, country: 'South Korea', country_code: 'KR', timezone: 'Asia/Seoul' }
];

interface PopularCitiesProps {
  onSelectCity: (location: GeoLocation) => void;
  selectedCityName?: string;
}

export const PopularCities: React.FC<PopularCitiesProps> = ({ onSelectCity, selectedCityName }) => {
  return (
    <div id="popular-cities-bar" className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 whitespace-nowrap flex items-center gap-1">
        <MapPin className="w-3.5 h-3.5 text-sky-500" />
        Popular:
      </span>
      <div className="flex items-center gap-2">
        {POPULAR_CITIES.map((city) => {
          const isSelected = selectedCityName?.toLowerCase() === city.name.toLowerCase();
          return (
            <button
              key={city.id}
              id={`btn-city-${city.name.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => onSelectCity(city)}
              className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-sky-500 text-white border-sky-500 shadow-sm shadow-sky-500/30 font-semibold'
                  : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-sky-300 hover:bg-sky-50/50 dark:hover:bg-slate-700/80'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
