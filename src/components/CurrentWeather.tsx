import React from "react";
import { CurrentWeatherData, LocationData } from "@/types/weather";
import { getWeatherCondition } from "@/lib/weather-codes";
import { WeatherIcon } from "./WeatherIcon";
import { MapPin } from "lucide-react";

interface CurrentWeatherProps {
  location: LocationData;
  current: CurrentWeatherData;
}

export function CurrentWeather({ location, current }: CurrentWeatherProps) {
  const condition = getWeatherCondition(current.weatherCode);

  return (
    <div className="w-full bg-glass-surface backdrop-blur-acrylic border border-glass-border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-300">
          <MapPin className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium tracking-wide">
            {location.name}
            {location.country ? `, ${location.country}` : ""}
          </span>
        </div>
        <span className="text-xs font-semibold px-3 py-1 bg-white/10 rounded-full text-slate-300 border border-white/10">
          {condition.label}
        </span>
      </div>

      <div className="my-8 flex items-baseline justify-between">
        <div className="flex items-baseline">
          <span className="text-7xl sm:text-8xl font-extralight tracking-tighter text-white">
            {current.temperature}
          </span>
          <span className="text-3xl sm:text-4xl text-blue-400 font-light ml-1">°C</span>
        </div>
        <div className="p-4 rounded-3xl bg-white/5 border border-glass-border text-blue-300">
          <WeatherIcon name={condition.iconName} className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-glass-border">
        <span>Feels like {current.apparentTemperature}°C</span>
        <span>Wind: {current.windSpeed} km/h</span>
      </div>
    </div>
  );
}