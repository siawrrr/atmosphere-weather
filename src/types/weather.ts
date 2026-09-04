export interface LocationData {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherData {
  temperature: number;
  apparentTemperature: number;
  relativeHumidity: number;
  weatherCode: number;
  windSpeed: number;
  windDirection: number;
  surfacePressure: number;
  uvIndex: number;
  isDay: number;
}

export interface HourlyForecastItem {
  time: string;
  temperature: number;
  weatherCode: number;
  precipitationProbability: number;
}

export interface DailyForecastItem {
  date: string;
  weatherCode: number;
  temperatureMax: number;
  temperatureMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
}

export interface ProcessedWeatherData {
  location: LocationData;
  current: CurrentWeatherData;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
}