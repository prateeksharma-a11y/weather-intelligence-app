import React from 'react';
import { AlertTriangle, RefreshCw, MapPin, Search } from 'lucide-react';
import { POPULAR_CITIES } from './PopularCities';
import { GeoLocation } from '../types/weather';

interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
  onSelectCity?: (city: GeoLocation) => void;
  title?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onRetry,
  onSelectCity,
  title = 'City or Weather Data Not Found'
}) => {
  return (
    <div id="error-alert-card" className="p-6 rounded-3xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 shadow-lg space-y-4 my-4 max-w-2xl mx-auto">
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-2xl bg-rose-500 text-white shadow-md shadow-rose-500/20 flex-shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1 flex-1">
          <h3 className="text-base font-bold text-rose-900 dark:text-rose-200">
            {title}
          </h3>
          <p className="text-xs text-rose-700 dark:text-rose-300 leading-relaxed">
            {message}
          </p>
        </div>
      </div>

      {/* Suggested Quick Recoveries */}
      {onSelectCity && (
        <div className="pt-3 border-t border-rose-200/60 dark:border-rose-800/40 space-y-2">
          <div className="text-xs font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-1">
            <Search className="w-3.5 h-3.5" />
            Try searching one of these popular cities instead:
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {POPULAR_CITIES.slice(0, 4).map(city => (
              <button
                key={city.id}
                onClick={() => onSelectCity(city)}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-rose-200 dark:border-rose-900 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors flex items-center gap-1 shadow-xs"
              >
                <MapPin className="w-3 h-3 text-sky-500" />
                {city.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Manual Retry Button */}
      {onRetry && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onRetry}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Retry Request
          </button>
        </div>
      )}
    </div>
  );
};
