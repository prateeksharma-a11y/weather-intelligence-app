import React from 'react';
import { 
  MapPin, 
  Wind, 
  Droplets, 
  Gauge, 
  Sun, 
  Eye, 
  Sunrise, 
  Sunset, 
  Compass,
  CloudRain
} from 'lucide-react';
import { WeatherData, WeatherUnits } from '../types/weather';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { formatTemp, formatWindSpeed, getWindDirectionDegrees, getUvCategory } from '../utils/unitConversions';

interface CurrentWeatherCardProps {
  data: WeatherData;
  units: WeatherUnits;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ data, units }) => {
  const { location, current, daily } = data;
  const weatherInfo = getWeatherCodeInfo(current.weatherCode);
  const WeatherIcon = weatherInfo.icon;
  const today = daily[0];

  const uvCat = getUvCategory(today ? today.uvIndexMax : 0);
  const windDirLabel = getWindDirectionDegrees(current.windDirection);

  return (
    <div
      id="current-weather-hero-card"
      className={`relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-8 bg-gradient-to-br ${weatherInfo.bgGradientLight} dark:${weatherInfo.bgGradientDark} transition-all duration-300`}
    >
      {/* Decorative ambient background blur circle */}
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-sky-400/20 dark:bg-sky-500/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Column: Location & Main Temp */}
        <div className="space-y-4">
          
          {/* Location Badge */}
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
            <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0 animate-bounce" />
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {location.name}
              </h2>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {[location.admin1, location.country].filter(Boolean).join(', ')}
              </span>
            </div>
          </div>

          {/* Condition Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 shadow-sm">
            <WeatherIcon className="w-5 h-5 text-sky-500" />
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {weatherInfo.label}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 border-l border-slate-200 dark:border-slate-700 pl-2">
              {current.isDay ? 'Daytime' : 'Night'}
            </span>
          </div>

          {/* Temperature Hero Display */}
          <div className="flex items-baseline gap-4">
            <span className="text-6xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter">
              {formatTemp(current.temperature, units.temperature)}
            </span>
            <div className="space-y-1 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
              <div>Feels like <strong className="text-slate-900 dark:text-white">{formatTemp(current.apparentTemperature, units.temperature)}</strong></div>
              {today && (
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <span>High: <strong className="text-slate-800 dark:text-slate-200">{formatTemp(today.tempMax, units.temperature)}</strong></span>
                  <span>•</span>
                  <span>Low: <strong className="text-slate-800 dark:text-slate-200">{formatTemp(today.tempMin, units.temperature)}</strong></span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Key Weather Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
          
          {/* Wind Speed */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Wind className="w-4 h-4 text-sky-500" />
              <span>Wind</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {formatWindSpeed(current.windSpeed, units.windSpeed)}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                <Compass className="w-3 h-3 text-slate-400" />
                <span>{windDirLabel} ({current.windDirection}°)</span>
              </div>
            </div>
          </div>

          {/* Humidity */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Humidity</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {current.relativeHumidity}%
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {current.relativeHumidity > 70 ? 'High Moisture' : current.relativeHumidity < 30 ? 'Dry Air' : 'Comfortable'}
              </div>
            </div>
          </div>

          {/* Barometric Pressure */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Gauge className="w-4 h-4 text-indigo-500" />
              <span>Pressure</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {Math.round(current.pressureMsl)} hPa
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {current.pressureMsl > 1013 ? 'High Pressure' : 'Low Pressure'}
              </div>
            </div>
          </div>

          {/* UV Index */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Sun className="w-4 h-4 text-amber-500" />
              <span>Max UV Today</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {today ? today.uvIndexMax : '--'}
              </div>
              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border ${uvCat.color} mt-0.5`}>
                {uvCat.label}
              </span>
            </div>
          </div>

          {/* Cloud Cover */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <CloudRain className="w-4 h-4 text-teal-500" />
              <span>Cloud Cover</span>
            </div>
            <div className="mt-2">
              <div className="text-lg font-bold text-slate-900 dark:text-white">
                {current.cloudCover}%
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {current.cloudCover > 80 ? 'Overcast' : current.cloudCover > 30 ? 'Partly Cloudy' : 'Clear Skies'}
              </div>
            </div>
          </div>

          {/* Sun Times */}
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 flex flex-col justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <Sunrise className="w-4 h-4 text-amber-500" />
              <span>Sunrise / Sunset</span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Rise:</span> {today ? today.sunrise : '--'}
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>Set:</span> {today ? today.sunset : '--'}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
