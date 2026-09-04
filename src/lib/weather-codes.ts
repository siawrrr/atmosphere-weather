export interface WeatherCondition {
  label: string;
  iconName: string;
}

export const weatherCodeMap: Record<number, WeatherCondition> = {
  0: { label: "Clear Sky", iconName: "Sun" },
  1: { label: "Mainly Clear", iconName: "SunDim" },
  2: { label: "Partly Cloudy", iconName: "CloudSun" },
  3: { label: "Overcast", iconName: "Cloud" },
  45: { label: "Foggy", iconName: "CloudFog" },
  48: { label: "Icy Fog", iconName: "CloudFog" },
  51: { label: "Light Drizzle", iconName: "CloudDrizzle" },
  53: { label: "Moderate Drizzle", iconName: "CloudDrizzle" },
  55: { label: "Dense Drizzle", iconName: "CloudDrizzle" },
  61: { label: "Slight Rain", iconName: "CloudRain" },
  63: { label: "Moderate Rain", iconName: "CloudRain" },
  65: { label: "Heavy Rain", iconName: "CloudRain" },
  71: { label: "Slight Snow", iconName: "CloudSnow" },
  73: { label: "Moderate Snow", iconName: "CloudSnow" },
  75: { label: "Heavy Snow", iconName: "CloudSnow" },
  77: { label: "Snow Grains", iconName: "CloudSnow" },
  80: { label: "Light Showers", iconName: "CloudRain" },
  81: { label: "Moderate Showers", iconName: "CloudRain" },
  82: { label: "Violent Showers", iconName: "CloudLightning" },
  85: { label: "Snow Showers", iconName: "CloudSnow" },
  86: { label: "Heavy Snow Showers", iconName: "CloudSnow" },
  95: { label: "Thunderstorm", iconName: "CloudLightning" },
  96: { label: "Thunderstorm with Hail", iconName: "CloudLightning" },
  99: { label: "Severe Thunderstorm", iconName: "CloudLightning" },
};

export function getWeatherCondition(code: number): WeatherCondition {
  return weatherCodeMap[code] || { label: "Variable", iconName: "Cloud" };
}