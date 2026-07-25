import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronUp, Sun, Wind, Droplets, Sunrise, Sunset } from 'lucide-react';
import { DailyForecastItem, WeatherUnits } from '../types/weather';
import { getWeatherCodeInfo } from '../utils/weatherCodes';
import { formatTemp, formatWindSpeed, getWindDirectionDegrees, getUvCategory } from '../utils/unitConversions';

interface DailyForecastListProps {
  daily: DailyForecastItem[];
  units: WeatherUnits;
}

export const DailyForecastList: React.FC<DailyForecastListProps> = ({ daily, units }) => {
  const [expandedDayIndex, setExpandedDayIndex] = useState<number | null>(0);

  // Determine global min and max temp across the 7 days for relative progress bar rendering
  const minOverall = Math.min(...daily.map(d => d.tempMin));
  const maxOverall = Math.max(...daily.map(d => d.tempMax));
  const tempRange = maxOverall - minOverall || 1;

  const toggleExpand = (index: number) => {
    setExpandedDayIndex(prev => (prev === index ? null : index));
  };

  return (
    <div id="daily-forecast-section" className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-500" />
            7-Day Weather Forecast
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click any day to view detailed solar, wind, and precipitation breakdown
          </p>
        </div>
      </div>

      {/* 7-Day List */}
      <div className="space-y-2">
        {daily.map((day, idx) => {
          const weatherInfo = getWeatherCodeInfo(day.weatherCode);
          const IconComponent = weatherInfo.icon;
          const isExpanded = expandedDayIndex === idx;

          // Calculate percentage offsets for min-max bar
          const leftPercent = Math.max(0, Math.min(100, ((day.tempMin - minOverall) / tempRange) * 100));
          const rightPercent = Math.max(0, Math.min(100, ((day.tempMax - minOverall) / tempRange) * 100));
          const widthPercent = Math.max(8, rightPercent - leftPercent);

          const uvCat = getUvCategory(day.uvIndexMax);

          return (
            <div
              key={day.date}
              id={`daily-card-${idx}`}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isExpanded
                  ? 'bg-sky-50/40 dark:bg-slate-900/60 border-sky-300/80 dark:border-sky-800/80 shadow-md'
                  : 'bg-slate-50/60 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              {/* Row Summary Bar */}
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left gap-2 sm:gap-4"
              >
                {/* Day & Date */}
                <div className="w-24 sm:w-32 flex-shrink-0">
                  <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    {day.dayName}
                    {idx === 0 && (
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-sky-500 text-white">
                        Today
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400 dark:text-slate-500">
                    {day.formattedDate}
                  </div>
                </div>

                {/* Condition Icon & Label */}
                <div className="flex items-center gap-2.5 w-32 sm:w-44 flex-shrink-0">
                  <div className="p-1.5 rounded-lg bg-white dark:bg-slate-800 shadow-sm">
                    <IconComponent className="w-5 h-5 text-sky-500" />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate hidden sm:inline">
                    {weatherInfo.label}
                  </span>
                </div>

                {/* Rain Chance Pill */}
                <div className="w-16 flex-shrink-0 text-center">
                  {day.precipitationProbabilityMax > 0 ? (
                    <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 flex items-center justify-center gap-0.5">
                      <Droplets className="w-3 h-3" />
                      {day.precipitationProbabilityMax}%
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">0%</span>
                  )}
                </div>

                {/* Temperature Min-Max Range Bar */}
                <div className="flex-1 max-w-xs hidden md:flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 w-10 text-right">
                    {formatTemp(day.tempMin, units.temperature)}
                  </span>

                  <div className="flex-1 h-2 rounded-full bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-amber-500"
                      style={{
                        left: `${leftPercent}%`,
                        width: `${widthPercent}%`
                      }}
                    ></div>
                  </div>

                  <span className="text-xs font-bold text-slate-900 dark:text-white w-10">
                    {formatTemp(day.tempMax, units.temperature)}
                  </span>
                </div>

                {/* Mobile Temp Display */}
                <div className="md:hidden text-right text-xs font-bold text-slate-800 dark:text-slate-200">
                  {formatTemp(day.tempMax, units.temperature)} / {formatTemp(day.tempMin, units.temperature)}
                </div>

                {/* Expand Toggle Chevron */}
                <div className="text-slate-400 pl-1">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Details Panel */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-200/50 dark:border-slate-800/80 bg-white/50 dark:bg-slate-800/50 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  
                  {/* Feels Like Range */}
                  <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80">
                    <div className="text-[11px] text-slate-400 font-semibold mb-1">Apparent Range</div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {formatTemp(day.apparentTempMin, units.temperature)} to {formatTemp(day.apparentTempMax, units.temperature)}
                    </div>
                  </div>

                  {/* Wind & Gusts */}
                  <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80">
                    <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-sky-500" /> Max Wind
                    </div>
                    <div className="font-bold text-slate-800 dark:text-slate-200">
                      {formatWindSpeed(day.windSpeedMax, units.windSpeed)} ({getWindDirectionDegrees(day.windDirectionDominant)})
                    </div>
                  </div>

                  {/* UV & Sun */}
                  <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80">
                    <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5 text-amber-500" /> UV Index
                    </div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                      <span>{day.uvIndexMax}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded border ${uvCat.color}`}>
                        {uvCat.label}
                      </span>
                    </div>
                  </div>

                  {/* Solar Schedule */}
                  <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-900/80">
                    <div className="text-[11px] text-slate-400 font-semibold mb-1 flex items-center gap-1">
                      <Sunrise className="w-3.5 h-3.5 text-amber-500" /> Sun Schedule
                    </div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between text-[11px]">
                      <span><Sunrise className="w-3 h-3 inline text-amber-500 mr-0.5" />{day.sunrise}</span>
                      <span><Sunset className="w-3 h-3 inline text-amber-500 mr-0.5" />{day.sunset}</span>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
