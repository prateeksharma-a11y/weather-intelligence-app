import React from 'react';
import { CloudSun, Navigation, Compass, RefreshCw } from 'lucide-react';
import { WeatherUnits, TemperatureUnit, WindSpeedUnit } from '../types/weather';

interface NavbarProps {
  units: WeatherUnits;
  onUnitsChange: (units: WeatherUnits) => void;
  onUseLocation: () => void;
  isLoadingLocation: boolean;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  units,
  onUnitsChange,
  onUseLocation,
  isLoadingLocation,
  onRefresh,
  isRefreshing,
  lastUpdated
}) => {
  const toggleTempUnit = () => {
    const nextTemp: TemperatureUnit = units.temperature === 'celsius' ? 'fahrenheit' : 'celsius';
    const nextWind: WindSpeedUnit = nextTemp === 'fahrenheit' ? 'mph' : 'kmh';
    onUnitsChange({
      temperature: nextTemp,
      windSpeed: nextWind
    });
  };

  return (
    <header id="app-navbar" className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div id="brand-container" className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20">
            <CloudSun className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Weather Intelligence
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800/40">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                Open-Meteo Live
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Real-time Geocoding & Forecast Intelligence
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div id="nav-actions" className="flex items-center gap-2 sm:gap-3">
          
          {/* Refresh Button */}
          {lastUpdated && (
            <button
              id="btn-refresh-weather"
              onClick={onRefresh}
              disabled={isRefreshing}
              title="Refresh weather data"
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-medium"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-600' : ''}`} />
              <span className="hidden md:inline">Updated {lastUpdated}</span>
            </button>
          )}

          {/* Current Location GPS Button */}
          <button
            id="btn-use-location"
            onClick={onUseLocation}
            disabled={isLoadingLocation}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-sky-700 dark:text-sky-300 bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/50 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 rounded-lg transition-all"
            title="Use current device coordinates"
          >
            {isLoadingLocation ? (
              <RefreshCw className="w-4 h-4 animate-spin text-sky-600" />
            ) : (
              <Navigation className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">My Location</span>
          </button>

          {/* Temperature Unit Toggle Button */}
          <button
            id="btn-unit-toggle"
            onClick={toggleTempUnit}
            className="flex items-center justify-between p-1 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold"
            title="Toggle between Celsius (°C) and Fahrenheit (°F)"
          >
            <span
              className={`px-2.5 py-1 rounded-md transition-all ${
                units.temperature === 'celsius'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              °C
            </span>
            <span
              className={`px-2.5 py-1 rounded-md transition-all ${
                units.temperature === 'fahrenheit'
                  ? 'bg-white dark:bg-slate-700 text-sky-600 dark:text-sky-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              °F
            </span>
          </button>
        </div>

      </div>
    </header>
  );
};
