import { 
  Sun, 
  CloudSun, 
  Cloud, 
  CloudFog, 
  CloudDrizzle, 
  CloudRain, 
  CloudSnow, 
  CloudLightning, 
  CloudHail, 
  Snowflake,
  LucideIcon
} from 'lucide-react';

export interface WeatherCodeInfo {
  code: number;
  label: string;
  icon: LucideIcon;
  bgGradientLight: string;
  bgGradientDark: string;
  cardBg: string;
  category: 'clear' | 'cloudy' | 'fog' | 'rain' | 'snow' | 'thunderstorm';
}

export const WMO_CODES: Record<number, WeatherCodeInfo> = {
  0: {
    code: 0,
    label: 'Clear Sky',
    icon: Sun,
    bgGradientLight: 'from-amber-400/20 via-sky-300/20 to-blue-500/10',
    bgGradientDark: 'from-amber-950/40 via-sky-950/30 to-slate-900',
    cardBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/30',
    category: 'clear'
  },
  1: {
    code: 1,
    label: 'Mainly Clear',
    icon: CloudSun,
    bgGradientLight: 'from-sky-400/20 via-blue-300/20 to-indigo-500/10',
    bgGradientDark: 'from-sky-950/40 via-blue-950/30 to-slate-900',
    cardBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/30',
    category: 'clear'
  },
  2: {
    code: 2,
    label: 'Partly Cloudy',
    icon: CloudSun,
    bgGradientLight: 'from-blue-400/20 via-sky-200/20 to-slate-400/10',
    bgGradientDark: 'from-blue-950/40 via-sky-950/30 to-slate-900',
    cardBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/30',
    category: 'cloudy'
  },
  3: {
    code: 3,
    label: 'Overcast',
    icon: Cloud,
    bgGradientLight: 'from-slate-400/20 via-zinc-300/20 to-slate-500/10',
    bgGradientDark: 'from-slate-950/50 via-zinc-900/40 to-slate-900',
    cardBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/30',
    category: 'cloudy'
  },
  45: {
    code: 45,
    label: 'Foggy',
    icon: CloudFog,
    bgGradientLight: 'from-slate-300/30 via-zinc-200/20 to-slate-400/10',
    bgGradientDark: 'from-zinc-900/60 via-slate-900/50 to-slate-950',
    cardBg: 'bg-zinc-500/10 text-zinc-700 dark:text-zinc-300 border-zinc-200/50 dark:border-zinc-800/30',
    category: 'fog'
  },
  48: {
    code: 48,
    label: 'Depositing Rime Fog',
    icon: CloudFog,
    bgGradientLight: 'from-teal-300/20 via-slate-300/20 to-slate-400/10',
    bgGradientDark: 'from-teal-950/40 via-slate-900/50 to-slate-950',
    cardBg: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200/50 dark:border-teal-800/30',
    category: 'fog'
  },
  51: {
    code: 51,
    label: 'Light Drizzle',
    icon: CloudDrizzle,
    bgGradientLight: 'from-cyan-400/20 via-blue-300/20 to-slate-400/10',
    bgGradientDark: 'from-cyan-950/40 via-blue-950/30 to-slate-900',
    cardBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/30',
    category: 'rain'
  },
  53: {
    code: 53,
    label: 'Moderate Drizzle',
    icon: CloudDrizzle,
    bgGradientLight: 'from-cyan-500/20 via-blue-400/20 to-slate-500/10',
    bgGradientDark: 'from-cyan-950/50 via-blue-950/40 to-slate-900',
    cardBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-200/50 dark:border-cyan-800/30',
    category: 'rain'
  },
  55: {
    code: 55,
    label: 'Dense Drizzle',
    icon: CloudDrizzle,
    bgGradientLight: 'from-cyan-600/20 via-blue-500/20 to-slate-600/10',
    bgGradientDark: 'from-cyan-950/60 via-blue-950/50 to-slate-900',
    cardBg: 'bg-cyan-600/10 text-cyan-800 dark:text-cyan-200 border-cyan-300/50 dark:border-cyan-800/30',
    category: 'rain'
  },
  56: {
    code: 56,
    label: 'Light Freezing Drizzle',
    icon: CloudDrizzle,
    bgGradientLight: 'from-teal-400/20 via-cyan-300/20 to-slate-400/10',
    bgGradientDark: 'from-teal-950/50 via-cyan-950/40 to-slate-900',
    cardBg: 'bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-200/50 dark:border-teal-800/30',
    category: 'rain'
  },
  57: {
    code: 57,
    label: 'Dense Freezing Drizzle',
    icon: CloudDrizzle,
    bgGradientLight: 'from-teal-500/20 via-cyan-400/20 to-slate-500/10',
    bgGradientDark: 'from-teal-950/60 via-cyan-950/50 to-slate-900',
    cardBg: 'bg-teal-600/10 text-teal-800 dark:text-teal-200 border-teal-300/50 dark:border-teal-800/30',
    category: 'rain'
  },
  61: {
    code: 61,
    label: 'Slight Rain',
    icon: CloudRain,
    bgGradientLight: 'from-blue-400/20 via-indigo-300/20 to-slate-400/10',
    bgGradientDark: 'from-blue-950/50 via-indigo-950/40 to-slate-900',
    cardBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/30',
    category: 'rain'
  },
  63: {
    code: 63,
    label: 'Moderate Rain',
    icon: CloudRain,
    bgGradientLight: 'from-blue-500/25 via-indigo-400/20 to-slate-500/10',
    bgGradientDark: 'from-blue-950/60 via-indigo-950/50 to-slate-900',
    cardBg: 'bg-blue-600/10 text-blue-800 dark:text-blue-200 border-blue-300/50 dark:border-blue-800/30',
    category: 'rain'
  },
  65: {
    code: 65,
    label: 'Heavy Rain',
    icon: CloudRain,
    bgGradientLight: 'from-blue-600/30 via-indigo-500/25 to-slate-600/10',
    bgGradientDark: 'from-blue-950/70 via-indigo-950/60 to-slate-900',
    cardBg: 'bg-blue-700/15 text-blue-900 dark:text-blue-200 border-blue-400/50 dark:border-blue-700/40',
    category: 'rain'
  },
  66: {
    code: 66,
    label: 'Light Freezing Rain',
    icon: CloudRain,
    bgGradientLight: 'from-sky-500/20 via-teal-400/20 to-slate-500/10',
    bgGradientDark: 'from-sky-950/60 via-teal-950/50 to-slate-900',
    cardBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/30',
    category: 'rain'
  },
  67: {
    code: 67,
    label: 'Heavy Freezing Rain',
    icon: CloudRain,
    bgGradientLight: 'from-sky-600/30 via-teal-500/25 to-slate-600/10',
    bgGradientDark: 'from-sky-950/70 via-teal-950/60 to-slate-900',
    cardBg: 'bg-sky-600/15 text-sky-800 dark:text-sky-200 border-sky-300/50 dark:border-sky-800/30',
    category: 'rain'
  },
  71: {
    code: 71,
    label: 'Slight Snow Fall',
    icon: CloudSnow,
    bgGradientLight: 'from-indigo-300/20 via-slate-200/20 to-blue-200/10',
    bgGradientDark: 'from-indigo-950/40 via-slate-900/50 to-slate-950',
    cardBg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/30',
    category: 'snow'
  },
  73: {
    code: 73,
    label: 'Moderate Snow Fall',
    icon: Snowflake,
    bgGradientLight: 'from-indigo-400/25 via-slate-300/20 to-blue-300/10',
    bgGradientDark: 'from-indigo-950/50 via-slate-900/60 to-slate-950',
    cardBg: 'bg-indigo-500/15 text-indigo-800 dark:text-indigo-200 border-indigo-300/50 dark:border-indigo-800/30',
    category: 'snow'
  },
  75: {
    code: 75,
    label: 'Heavy Snow Fall',
    icon: Snowflake,
    bgGradientLight: 'from-indigo-500/30 via-slate-400/25 to-blue-400/15',
    bgGradientDark: 'from-indigo-950/70 via-slate-900/70 to-slate-950',
    cardBg: 'bg-indigo-600/15 text-indigo-900 dark:text-indigo-100 border-indigo-400/50 dark:border-indigo-700/40',
    category: 'snow'
  },
  77: {
    code: 77,
    label: 'Snow Grains',
    icon: CloudSnow,
    bgGradientLight: 'from-slate-300/20 via-indigo-200/20 to-blue-200/10',
    bgGradientDark: 'from-slate-900/50 via-indigo-950/40 to-slate-950',
    cardBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/30',
    category: 'snow'
  },
  80: {
    code: 80,
    label: 'Slight Rain Showers',
    icon: CloudRain,
    bgGradientLight: 'from-blue-400/20 via-sky-300/20 to-indigo-400/10',
    bgGradientDark: 'from-blue-950/50 via-sky-950/40 to-slate-900',
    cardBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200/50 dark:border-blue-800/30',
    category: 'rain'
  },
  81: {
    code: 81,
    label: 'Moderate Rain Showers',
    icon: CloudRain,
    bgGradientLight: 'from-blue-500/25 via-sky-400/20 to-indigo-500/10',
    bgGradientDark: 'from-blue-950/60 via-sky-950/50 to-slate-900',
    cardBg: 'bg-blue-600/10 text-blue-800 dark:text-blue-200 border-blue-300/50 dark:border-blue-800/30',
    category: 'rain'
  },
  82: {
    code: 82,
    label: 'Violent Rain Showers',
    icon: CloudRain,
    bgGradientLight: 'from-blue-600/30 via-indigo-600/25 to-slate-600/10',
    bgGradientDark: 'from-blue-950/80 via-indigo-950/70 to-slate-900',
    cardBg: 'bg-blue-700/20 text-blue-900 dark:text-blue-100 border-blue-400/50 dark:border-blue-700/40',
    category: 'rain'
  },
  85: {
    code: 85,
    label: 'Slight Snow Showers',
    icon: CloudSnow,
    bgGradientLight: 'from-indigo-300/20 via-sky-200/20 to-slate-300/10',
    bgGradientDark: 'from-indigo-950/40 via-sky-950/30 to-slate-950',
    cardBg: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-200/50 dark:border-indigo-800/30',
    category: 'snow'
  },
  86: {
    code: 86,
    label: 'Heavy Snow Showers',
    icon: CloudSnow,
    bgGradientLight: 'from-indigo-500/30 via-sky-400/25 to-slate-400/15',
    bgGradientDark: 'from-indigo-950/70 via-sky-950/60 to-slate-950',
    cardBg: 'bg-indigo-600/15 text-indigo-800 dark:text-indigo-200 border-indigo-300/50 dark:border-indigo-800/30',
    category: 'snow'
  },
  95: {
    code: 95,
    label: 'Thunderstorm',
    icon: CloudLightning,
    bgGradientLight: 'from-purple-500/25 via-amber-500/20 to-slate-600/15',
    bgGradientDark: 'from-purple-950/60 via-amber-950/40 to-slate-950',
    cardBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200/50 dark:border-purple-800/30',
    category: 'thunderstorm'
  },
  96: {
    code: 96,
    label: 'Thunderstorm with Hail',
    icon: CloudHail,
    bgGradientLight: 'from-purple-600/30 via-amber-600/20 to-slate-700/20',
    bgGradientDark: 'from-purple-950/70 via-amber-950/50 to-slate-950',
    cardBg: 'bg-purple-600/15 text-purple-800 dark:text-purple-200 border-purple-300/50 dark:border-purple-800/30',
    category: 'thunderstorm'
  },
  99: {
    code: 99,
    label: 'Heavy Hail Thunderstorm',
    icon: CloudHail,
    bgGradientLight: 'from-purple-700/35 via-amber-700/25 to-slate-800/25',
    bgGradientDark: 'from-purple-950/80 via-amber-950/60 to-slate-950',
    cardBg: 'bg-purple-700/20 text-purple-900 dark:text-purple-100 border-purple-400/50 dark:border-purple-700/40',
    category: 'thunderstorm'
  }
};

export function getWeatherCodeInfo(code: number): WeatherCodeInfo {
  return WMO_CODES[code] || {
    code,
    label: 'Unknown Condition',
    icon: Cloud,
    bgGradientLight: 'from-slate-300/20 via-zinc-200/20 to-slate-400/10',
    bgGradientDark: 'from-slate-900/50 via-zinc-900/40 to-slate-950',
    cardBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-200/50 dark:border-slate-800/30',
    category: 'cloudy'
  };
}
