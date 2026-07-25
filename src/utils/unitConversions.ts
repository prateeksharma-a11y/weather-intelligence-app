import { TemperatureUnit, WindSpeedUnit } from '../types/weather';

export function convertTemp(tempCelsius: number, unit: TemperatureUnit): number {
  if (unit === 'fahrenheit') {
    return Math.round((tempCelsius * 9) / 5 + 32);
  }
  return Math.round(tempCelsius);
}

export function formatTemp(tempCelsius: number, unit: TemperatureUnit): string {
  const converted = convertTemp(tempCelsius, unit);
  return `${converted}°${unit === 'celsius' ? 'C' : 'F'}`;
}

export function convertWindSpeed(speedKmh: number, unit: WindSpeedUnit): number {
  if (unit === 'mph') {
    return Math.round(speedKmh * 0.621371);
  }
  if (unit === 'ms') {
    return Math.round((speedKmh / 3.6) * 10) / 10;
  }
  return Math.round(speedKmh);
}

export function formatWindSpeed(speedKmh: number, unit: WindSpeedUnit): string {
  const value = convertWindSpeed(speedKmh, unit);
  const unitLabel = unit === 'mph' ? 'mph' : unit === 'ms' ? 'm/s' : 'km/h';
  return `${value} ${unitLabel}`;
}

export function getWindDirectionDegrees(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

export function getUvCategory(uvIndex: number): { label: string; color: string } {
  if (uvIndex <= 2) return { label: 'Low', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20' };
  if (uvIndex <= 5) return { label: 'Moderate', color: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20' };
  if (uvIndex <= 7) return { label: 'High', color: 'text-orange-600 dark:text-orange-400 bg-orange-500/10 border-orange-500/20' };
  if (uvIndex <= 10) return { label: 'Very High', color: 'text-red-600 dark:text-red-400 bg-red-500/10 border-red-500/20' };
  return { label: 'Extreme', color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20' };
}
