export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  country?: string;
  admin1?: string;
  admin2?: string;
  timezone: string;
  population?: number;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindSpeedUnit = 'kmh' | 'mph' | 'ms';

export interface WeatherUnits {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
}

export interface CurrentWeather {
  time: string;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  isDay: boolean;
  precipitation: number;
  weatherCode: number;
  cloudCover: number;
  pressureMsl: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
}

export interface HourlyForecastItem {
  time: string;
  formattedTime: string;
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  precipitationProbability: number;
  precipitation: number;
  weatherCode: number;
  windSpeed: number;
  uvIndex: number;
  isDay: boolean;
}

export interface DailyForecastItem {
  date: string;
  formattedDate: string;
  dayName: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  apparentTempMax: number;
  apparentTempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  windSpeedMax: number;
  windDirectionDominant: number;
}

export interface WeatherData {
  location: GeoLocation;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  timezone: string;
  fetchedAt: string;
}

export type RecommendationCategory = 'outdoor' | 'clothing' | 'health' | 'travel';
export type RecommendationLevel = 'ideal' | 'good' | 'caution' | 'warning';

export interface PlanningRecommendation {
  id: string;
  category: RecommendationCategory;
  level: RecommendationLevel;
  title: string;
  summary: string;
  actionItems: string[];
  iconName: string;
}

export interface SearchState {
  query: string;
  results: GeoLocation[];
  isSearching: boolean;
  error: string | null;
}
