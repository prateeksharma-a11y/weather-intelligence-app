import { WeatherData, PlanningRecommendation } from '../types/weather';
import { getWeatherCodeInfo } from './weatherCodes';

export function generateWeatherRecommendations(data: WeatherData): PlanningRecommendation[] {
  const recommendations: PlanningRecommendation[] = [];
  const current = data.current;
  const today = data.daily[0];
  const next24Hours = data.hourly.slice(0, 24);
  const weatherInfo = getWeatherCodeInfo(current.weatherCode);

  // 1. Outdoor Sports & Activity Planner
  const isRainy = weatherInfo.category === 'rain' || weatherInfo.category === 'thunderstorm';
  const isSnowy = weatherInfo.category === 'snow';
  const isHighWind = current.windSpeed > 35;
  const isExtremeTemp = current.temperature > 35 || current.temperature < 0;

  let outdoorLevel: 'ideal' | 'good' | 'caution' | 'warning' = 'ideal';
  let outdoorTitle = 'Excellent Day for Outdoor Activities';
  let outdoorSummary = 'Current conditions are very favorable for running, cycling, and outdoor recreation.';
  const outdoorActions: string[] = [];

  if (isRainy || isSnowy) {
    outdoorLevel = 'warning';
    outdoorTitle = 'Suboptimal Outdoor Conditions';
    outdoorSummary = `Precipitation (${weatherInfo.label.toLowerCase()}) makes outdoor sports slippery and challenging.`;
    outdoorActions.push('Prefer indoor workouts or gym training', 'Keep waterproof outerwear handy if heading out');
  } else if (isHighWind) {
    outdoorLevel = 'caution';
    outdoorTitle = 'Gusty Wind Advisory for Outdoors';
    outdoorSummary = `Wind speeds reaching ${current.windSpeed} km/h may impact cycling, tennis, or high-altitude hikes.`;
    outdoorActions.push('Exercise caution on open bike paths', 'Avoid wooded areas with brittle branches');
  } else if (current.temperature > 32) {
    outdoorLevel = 'caution';
    outdoorTitle = 'Heat Advisory for Outdoor Sports';
    outdoorSummary = `High temperature (${Math.round(current.temperature)}°C) increases heat exhaustion risk during intense exercise.`;
    outdoorActions.push('Plan workouts early morning before 9:00 AM or after sunset', 'Hydrate frequently with electrolyte drinks');
  } else if (current.temperature < 5) {
    outdoorLevel = 'caution';
    outdoorTitle = 'Cold Weather Workout Notice';
    outdoorSummary = `Chilly conditions (${Math.round(current.temperature)}°C). Warm-ups are essential to prevent muscle strain.`;
    outdoorActions.push('Wear thermal moisture-wicking layers', 'Extend warm-up and cool-down routines');
  } else {
    outdoorActions.push('Great window for running, hiking, or park walks', 'Comfortable ambient temperature and manageable winds');
  }

  // Find best 3-hour outdoor window in next 24 hours
  let bestHour = next24Hours[0];
  if (next24Hours.length > 0) {
    const suitableHours = next24Hours.filter(
      h => h.precipitationProbability < 20 && h.temperature >= 15 && h.temperature <= 28 && h.windSpeed < 25
    );
    if (suitableHours.length > 0) {
      bestHour = suitableHours[0];
      outdoorActions.push(`Prime outdoor window predicted around ${bestHour.formattedTime} (${Math.round(bestHour.temperature)}°C, ${bestHour.precipitationProbability}% rain risk)`);
    }
  }

  recommendations.push({
    id: 'outdoor-planner',
    category: 'outdoor',
    level: outdoorLevel,
    title: outdoorTitle,
    summary: outdoorSummary,
    actionItems: outdoorActions,
    iconName: 'Activity'
  });

  // 2. Clothing & Outfit Recommendations
  let clothingLevel: 'ideal' | 'good' | 'caution' | 'warning' = 'good';
  let clothingTitle = 'Standard Smart Casual Attire';
  let clothingSummary = 'Comfortable weather. Light layers will suit you throughout the day.';
  const clothingActions: string[] = [];

  const temp = current.temperature;
  const maxRainProb = today ? today.precipitationProbabilityMax : 0;

  if (temp < 0) {
    clothingLevel = 'warning';
    clothingTitle = 'Heavy Winter & Thermal Gear Required';
    clothingSummary = 'Sub-zero temperatures call for insulated outerwear, gloves, and thermal base layers.';
    clothingActions.push('Wear heavy down jacket or winter coat', 'Insulated boots, beanie hat, and thermal gloves', 'Scarf or neck gaiter for wind protection');
  } else if (temp < 12) {
    clothingLevel = 'caution';
    clothingTitle = 'Cold Weather Layering Recommended';
    clothingSummary = 'Cool to chilly conditions. Medium jacket or heavy sweater needed.';
    clothingActions.push('Fleece sweater, denim, or trench coat', 'Closed shoes or boots', 'Light scarf if windy');
  } else if (temp < 20) {
    clothingLevel = 'good';
    clothingTitle = 'Mild Weather - Light Jacket / Cardigan';
    clothingSummary = 'Pleasant temperatures with cool breezes in shade or evening.';
    clothingActions.push('Long sleeves or t-shirt with a light hoodie or cardigan', 'Pants, denim, or comfortable chinos');
  } else if (temp > 28) {
    clothingLevel = 'caution';
    clothingTitle = 'Warm Weather - Breathable Light Fabrics';
    clothingSummary = 'Warm to hot conditions. Opt for light-colored cotton or linen clothing.';
    clothingActions.push('Linen shirts, t-shirts, shorts, or light dresses', 'UV-protective sunglasses and wide-brim hat', 'Breathable open footwear');
  } else {
    clothingActions.push('T-shirt or casual shirt with comfortable pants', 'Light outer layer for late evening');
  }

  if (maxRainProb > 40 || current.precipitation > 0) {
    clothingActions.push('Carry a compact umbrella or waterproof raincoat');
  }

  recommendations.push({
    id: 'clothing-guide',
    category: 'clothing',
    level: clothingLevel,
    title: clothingTitle,
    summary: clothingSummary,
    actionItems: clothingActions,
    iconName: 'Shirt'
  });

  // 3. UV & Health Advisories
  const maxUv = today ? today.uvIndexMax : 0;
  let uvLevel: 'ideal' | 'good' | 'caution' | 'warning' = 'good';
  let uvTitle = 'Low UV Risk & Comfortable Humidity';
  let uvSummary = `Current UV Index is low (${maxUv}). Minimal sun risk for average skin types.`;
  const uvActions: string[] = [];

  if (maxUv >= 8) {
    uvLevel = 'warning';
    uvTitle = 'Very High UV Radiation Alert';
    uvSummary = `Peak UV Index will reach ${maxUv}. Unprotected skin can burn quickly in 15 minutes.`;
    uvActions.push('Apply SPF 50+ broad-spectrum sunscreen', 'Wear broad-brimmed hats and polarized sunglasses', 'Seek shade between 11:00 AM and 4:00 PM');
  } else if (maxUv >= 5) {
    uvLevel = 'caution';
    uvTitle = 'Moderate UV Protection Advised';
    uvSummary = `Peak UV Index reaches ${maxUv}. Moderate protection recommended for outdoor exposure.`;
    uvActions.push('Apply SPF 30+ sunscreen if outdoors over 30 mins', 'Wear sunglasses');
  } else {
    uvActions.push('Safe to enjoy outdoors without heavy sun protection', 'Good natural sunlight exposure for Vitamin D intake');
  }

  if (current.relativeHumidity > 80) {
    uvActions.push(`High humidity (${current.relativeHumidity}%) may increase perceived mugginess`);
  } else if (current.relativeHumidity < 25) {
    uvActions.push(`Low humidity (${current.relativeHumidity}%) - keep lip balm and skin moisturizer handy`);
  }

  recommendations.push({
    id: 'health-uv',
    category: 'health',
    level: uvLevel,
    title: uvTitle,
    summary: uvSummary,
    actionItems: uvActions,
    iconName: 'Sun'
  });

  // 4. Travel & Driving / Commute Intelligence
  let travelLevel: 'ideal' | 'good' | 'caution' | 'warning' = 'ideal';
  let travelTitle = 'Clear & Safe Road Conditions';
  let travelSummary = 'Visibility is good and roadways are dry for smooth commuting.';
  const travelActions: string[] = [];

  if (weatherInfo.category === 'thunderstorm') {
    travelLevel = 'warning';
    travelTitle = 'Thunderstorm Hazard Alert';
    travelSummary = 'Lightning, sudden downpours, and potential local street flooding possible.';
    travelActions.push('Delay non-essential driving during heavy downpours', 'Maintain extra braking distance behind vehicles', 'Watch out for reduced visibility and hydroplaning');
  } else if (weatherInfo.category === 'fog') {
    travelLevel = 'caution';
    travelTitle = 'Low Visibility Fog Warning';
    travelSummary = 'Dense fog reported. Road visibility is significantly reduced.';
    travelActions.push('Use low-beam headlights or fog lights', 'Reduce driving speed and avoid tailgating', 'Listen for traffic cues at intersections');
  } else if (weatherInfo.category === 'snow') {
    travelLevel = 'warning';
    travelTitle = 'Winter Driving / Slippery Roads Alert';
    travelSummary = 'Snow accumulation and potential ice patches on transit routes.';
    travelActions.push('Ensure winter tires or chains are fitted', 'Allow 15-20 minutes extra travel time for public transit', 'Keep windshield washer fluid topped up');
  } else if (current.windGusts > 50) {
    travelLevel = 'caution';
    travelTitle = 'High Wind Gusts on Highways';
    travelSummary = `Wind gusts up to ${current.windGusts} km/h may sway high-profile vehicles.`;
    travelActions.push('Keep both hands firm on steering wheel on open bridges', 'Be cautious near high-sided trucks');
  } else {
    travelActions.push('Transit and flight departures likely operating normally', 'Ideal conditions for road trips and city commutes');
  }

  recommendations.push({
    id: 'travel-commute',
    category: 'travel',
    level: travelLevel,
    title: travelTitle,
    summary: travelSummary,
    actionItems: travelActions,
    iconName: 'Car'
  });

  return recommendations;
}
