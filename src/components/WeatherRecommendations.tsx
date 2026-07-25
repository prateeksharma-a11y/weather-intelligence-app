import React, { useState } from 'react';
import { 
  Sparkles, 
  Activity, 
  Shirt, 
  Sun, 
  Car, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Award,
  Filter
} from 'lucide-react';
import { WeatherData, PlanningRecommendation, RecommendationCategory } from '../types/weather';
import { generateWeatherRecommendations } from '../utils/recommendationEngine';

interface WeatherRecommendationsProps {
  data: WeatherData;
}

export const WeatherRecommendations: React.FC<WeatherRecommendationsProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<RecommendationCategory | 'all'>('all');
  const recommendations = generateWeatherRecommendations(data);

  const filtered = selectedCategory === 'all'
    ? recommendations
    : recommendations.filter(r => r.category === selectedCategory);

  const getCategoryIcon = (cat: RecommendationCategory) => {
    switch (cat) {
      case 'outdoor': return <Activity className="w-4 h-4 text-emerald-500" />;
      case 'clothing': return <Shirt className="w-4 h-4 text-sky-500" />;
      case 'health': return <Sun className="w-4 h-4 text-amber-500" />;
      case 'travel': return <Car className="w-4 h-4 text-purple-500" />;
    }
  };

  const getLevelBadge = (level: PlanningRecommendation['level']) => {
    switch (level) {
      case 'ideal':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <Award className="w-3.5 h-3.5" /> Ideal Conditions
          </span>
        );
      case 'good':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-500/10 text-sky-700 dark:text-sky-400 border border-sky-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" /> Good Condition
          </span>
        );
      case 'caution':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> Exercise Caution
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-500/20">
            <ShieldAlert className="w-3.5 h-3.5" /> Weather Advisory
          </span>
        );
    }
  };

  return (
    <div id="weather-recommendations-section" className="p-6 rounded-3xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-700/80 shadow-lg space-y-6">
      
      {/* Title & Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 animate-spin" style={{ animationDuration: '6s' }} />
            Intelligence & Activity Recommendations
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Actionable planning insights synthesized from real-time Open-Meteo metrics
          </p>
        </div>

        {/* Filter Pills */}
        <div id="category-filter-pills" className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Insights
          </button>
          <button
            onClick={() => setSelectedCategory('outdoor')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedCategory === 'outdoor'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Sports
          </button>
          <button
            onClick={() => setSelectedCategory('clothing')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedCategory === 'clothing'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" /> Outfit
          </button>
          <button
            onClick={() => setSelectedCategory('health')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedCategory === 'health'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Sun className="w-3.5 h-3.5" /> UV & Health
          </button>
          <button
            onClick={() => setSelectedCategory('travel')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
              selectedCategory === 'travel'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            <Car className="w-3.5 h-3.5" /> Travel
          </button>
        </div>
      </div>

      {/* Recommendation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(rec => (
          <div
            key={rec.id}
            id={`rec-card-${rec.id}`}
            className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800 space-y-3 hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700 shadow-xs">
                    {getCategoryIcon(rec.category)}
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {rec.title}
                  </h4>
                </div>
                {getLevelBadge(rec.level)}
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {rec.summary}
              </p>
            </div>

            {/* Action Checkpoints */}
            <div className="pt-2 border-t border-slate-200/50 dark:border-slate-800 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Action Items:
              </div>
              <ul className="space-y-1">
                {rec.actionItems.map((item, idx) => (
                  <li key={idx} className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
