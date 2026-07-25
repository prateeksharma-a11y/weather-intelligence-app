import { GeoLocation, WeatherData, HourlyForecastItem, DailyForecastItem } from '../types/weather';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Searches cities using Open-Meteo Geocoding API
 * @param query City name query string
 * @returns List of matching GeoLocation objects
 */
export async function searchCities(query: string, signal?: AbortSignal): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const url = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(trimmed)}&count=10&language=en&format=json`;

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Geocoding API HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      elevation: item.elevation,
      feature_code: item.feature_code,
      country_code: item.country_code,
      country: item.country || '',
      admin1: item.admin1 || '',
      admin2: item.admin2 || '',
      timezone: item.timezone || 'auto',
      population: item.population
    }));
  } catch (err: any) {
    if (err.name === 'AbortError') {
      return [];
    }
    console.error('Error searching cities:', err);
    throw new Error(err.message || 'Failed to search cities from Open-Meteo Geocoding API.');
  }
}

/**
 * Fetches current weather, 24-hour hourly forecast, and 7-day forecast from Open-Meteo
 */
export async function fetchWeatherData(
  location: GeoLocation,
  signal?: AbortSignal
): Promise<WeatherData> {
  const { latitude, longitude } = location;

  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'weather_code',
      'cloud_cover',
      'pressure_msl',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m'
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'precipitation_probability',
      'precipitation',
      'weather_code',
      'wind_speed_10m',
      'uv_index',
      'is_day'
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'apparent_temperature_max',
      'apparent_temperature_min',
      'sunrise',
      'sunset',
      'uv_index_max',
      'precipitation_sum',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'wind_direction_10m_dominant'
    ].join(','),
    timezone: location.timezone || 'auto'
  });

  const url = `${FORECAST_BASE_URL}?${params.toString()}`;

  try {
    const response = await fetch(url, { signal });
    if (!response.ok) {
      throw new Error(`Open-Meteo Forecast API HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.current || !data.hourly || !data.daily) {
      throw new Error('Incomplete weather payload received from Open-Meteo API.');
    }

    // Process Current Weather
    const current = {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      relativeHumidity: data.current.relative_humidity_2m,
      isDay: Boolean(data.current.is_day),
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      cloudCover: data.current.cloud_cover,
      pressureMsl: data.current.pressure_msl,
      windSpeed: data.current.wind_speed_10m,
      windDirection: data.current.wind_direction_10m,
      windGusts: data.current.wind_gusts_10m
    };

    // Process Hourly Forecast (up to 48 hours for detail)
    const hourlyTimes: string[] = data.hourly.time || [];
    const hourly: HourlyForecastItem[] = hourlyTimes.slice(0, 48).map((timeStr: string, idx: number) => {
      const dateObj = new Date(timeStr);
      const formattedTime = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

      return {
        time: timeStr,
        formattedTime,
        temperature: data.hourly.temperature_2m[idx],
        apparentTemperature: data.hourly.apparent_temperature[idx],
        relativeHumidity: data.hourly.relative_humidity_2m[idx],
        precipitationProbability: data.hourly.precipitation_probability[idx] || 0,
        precipitation: data.hourly.precipitation[idx] || 0,
        weatherCode: data.hourly.weather_code[idx],
        windSpeed: data.hourly.wind_speed_10m[idx],
        uvIndex: data.hourly.uv_index[idx] || 0,
        isDay: Boolean(data.hourly.is_day[idx])
      };
    });

    // Process Daily Forecast (7 Days)
    const dailyTimes: string[] = data.daily.time || [];
    const daily: DailyForecastItem[] = dailyTimes.slice(0, 7).map((dateStr: string, idx: number) => {
      const dateObj = new Date(dateStr + 'T00:00:00');
      const dayName = idx === 0 ? 'Today' : dateObj.toLocaleDateString([], { weekday: 'short' });
      const formattedDate = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

      const formatSunTime = (sunStr: string) => {
        if (!sunStr) return '--:--';
        const d = new Date(sunStr);
        return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
      };

      return {
        date: dateStr,
        formattedDate,
        dayName,
        weatherCode: data.daily.weather_code[idx],
        tempMax: data.daily.temperature_2m_max[idx],
        tempMin: data.daily.temperature_2m_min[idx],
        apparentTempMax: data.daily.apparent_temperature_max[idx],
        apparentTempMin: data.daily.apparent_temperature_min[idx],
        sunrise: formatSunTime(data.daily.sunrise[idx]),
        sunset: formatSunTime(data.daily.sunset[idx]),
        uvIndexMax: data.daily.uv_index_max[idx] || 0,
        precipitationSum: data.daily.precipitation_sum[idx] || 0,
        precipitationProbabilityMax: data.daily.precipitation_probability_max[idx] || 0,
        windSpeedMax: data.daily.wind_speed_10m_max[idx] || 0,
        windDirectionDominant: data.daily.wind_direction_10m_dominant[idx] || 0
      };
    });

    return {
      location,
      current,
      hourly,
      daily,
      timezone: data.timezone || location.timezone,
      fetchedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw err;
    }
    console.error('Error fetching weather data from Open-Meteo:', err);
    throw new Error(err.message || 'Unable to load weather forecast for selected location.');
  }
}
