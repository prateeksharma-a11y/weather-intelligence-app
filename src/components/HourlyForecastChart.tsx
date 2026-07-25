import React, { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  BarChart, 
  Bar 
} from 'recharts';
import { Thermometer, CloudRain, Wind, Sun, Clock } from 'lucide-react';
import { HourlyForecastItem, WeatherUnits } from '../types/weather';
import { convertTemp, convertWindSpeed } from '../utils/unitConversions';
import { getWeatherCodeInfo } from '../utils/weatherCodes';

interface HourlyForecastChartProps {
  hourly: HourlyForecastItem[];
  units: WeatherUnits;
}

type MetricType = 'temperature' | 'precipitation' | 'wind' | 'uv';

export const HourlyForecastChart: React.FC<HourlyForecastChartProps> = ({ hourly, units }) => {
  const [activeMetric, setActiveMetric] = useState<MetricType>('temperature');

  // Prepare next 24 hours of data
  const chartData = hourly.slice(0, 24).map(item => {
    const weatherInfo = getWeatherCodeInfo(item.weatherCode);
    return {
      time: item.formattedTime,
      rawTime: item.time,
      temp: convertTemp(item.temperature, units.temperature),
      apparentTemp: convertTemp(item.apparentTemperature, units.temperature),
      precipProb: item.precipitationProbability,
      precipMm: item.precipitation,
      windSpeed: convertWindSpeed(item.windSpeed, units.windSpeed),
      uvIndex: item.uvIndex,
      humidity: item.relativeHumidity,
      conditionLabel: weatherInfo.label,
      weatherCode: item.weatherCode
    };
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      const weatherInfo = getWeatherCodeInfo(dataPoint.weatherCode);
      const WeatherIcon = weatherInfo.icon;

      return (
        <div className="bg-slate-900/95 dark:bg-slate-800/95 text-white p-3 rounded-xl shadow-xl border border-slate-700/80 text-xs backdrop-blur-md space-y-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-700 pb-1.5 font-bold text-sky-300">
            <span>{label}</span>
            <div className="flex items-center gap-1">
              <WeatherIcon className="w-4 h-4 text-amber-400" />
              <span>{dataPoint.conditionLabel}</span>
            </div>
          </div>

          <div className="space-y-1">
            {activeMetric === 'temperature' && (
              <>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Temperature:</span>
                  <span className="font-bold">{dataPoint.temp}°{units.temperature === 'celsius' ? 'C' : 'F'}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Feels Like:</span>
                  <span>{dataPoint.apparentTemp}°{units.temperature === 'celsius' ? 'C' : 'F'}</span>
                </div>
              </>
            )}

            {activeMetric === 'precipitation' && (
              <>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Rain Chance:</span>
                  <span className="font-bold text-cyan-400">{dataPoint.precipProb}%</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Amount:</span>
                  <span>{dataPoint.precipMm} mm</span>
                </div>
              </>
            )}

            {activeMetric === 'wind' && (
              <div className="flex justify-between gap-4">
                <span className="text-slate-400">Wind Speed:</span>
                <span className="font-bold text-sky-400">{dataPoint.windSpeed} {units.windSpeed === 'mph' ? 'mph' : 'km/h'}</span>
              </div>
            )}

            {activeMetric === 'uv' && (
              <>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">UV Index:</span>
                  <span className="font-bold text-amber-400">{dataPoint.uvIndex}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400">Humidity:</span>
                  <span>{dataPoint.humidity}%</span>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="hourly-forecast-chart-card" className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-6">
      
      {/* Chart Header & Metric Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-sky-500" />
            24-Hour Forecast Trend
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hourly progression for temperature, rain risk, wind, and UV index
          </p>
        </div>

        {/* Metric Selector Tabs */}
        <div id="metric-tabs" className="flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            id="tab-metric-temp"
            onClick={() => setActiveMetric('temperature')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'temperature'
                ? 'bg-white dark:bg-slate-800 text-sky-600 dark:text-sky-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Thermometer className="w-3.5 h-3.5" />
            Temp
          </button>

          <button
            id="tab-metric-rain"
            onClick={() => setActiveMetric('precipitation')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'precipitation'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            Precipitation
          </button>

          <button
            id="tab-metric-wind"
            onClick={() => setActiveMetric('wind')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'wind'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            Wind
          </button>

          <button
            id="tab-metric-uv"
            onClick={() => setActiveMetric('uv')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              activeMetric === 'uv'
                ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <Sun className="w-3.5 h-3.5" />
            UV Index
          </button>
        </div>
      </div>

      {/* Main Chart Canvas */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeMetric === 'precipitation' ? (
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} unit="%" domain={[0, 100]} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="precipProb" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : (
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="uvGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomTooltip />} />

              {activeMetric === 'temperature' && (
                <>
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#tempGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="apparentTemp"
                    stroke="#94a3b8"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    fill="none"
                  />
                </>
              )}

              {activeMetric === 'wind' && (
                <Area
                  type="monotone"
                  dataKey="windSpeed"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#windGradient)"
                />
              )}

              {activeMetric === 'uv' && (
                <Area
                  type="monotone"
                  dataKey="uvIndex"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#uvGradient)"
                />
              )}
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Quick Hourly Cards Carousel */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 overflow-x-auto flex gap-3 pb-2 no-scrollbar">
        {chartData.slice(0, 12).map((item, idx) => {
          const weatherInfo = getWeatherCodeInfo(item.weatherCode);
          const IconComponent = weatherInfo.icon;
          return (
            <div
              key={idx}
              className="flex-shrink-0 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800 text-center w-20 space-y-1"
            >
              <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                {item.time}
              </div>
              <IconComponent className="w-5 h-5 mx-auto text-sky-500 my-1" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">
                {item.temp}°
              </div>
              <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">
                {item.precipProb}% rain
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
