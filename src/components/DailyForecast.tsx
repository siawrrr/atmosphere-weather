import React from "react";
import { DailyForecastItem } from "@/types/weather";
import { getWeatherCondition } from "@/lib/weather-codes";
import { WeatherIcon } from "./WeatherIcon";

interface DailyForecastProps {
  daily: DailyForecastItem[];
}

export function DailyForecast({ daily }: DailyForecastProps) {
  const formatDay = (dateStr: string, index: number) => {
    if (index === 0) return "Today";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="w-full bg-glass-surface backdrop-blur-acrylic border border-glass-border rounded-3xl p-6">
      <h2 className="text-sm font-medium text-slate-300 mb-4 tracking-wide uppercase">
        7-Day Forecast
      </h2>
      <div className="flex flex-col divide-y divide-glass-border">
        {daily.map((item, idx) => {
          const condition = getWeatherCondition(item.weatherCode);
          return (
            <div key={idx} className="flex items-center justify-between py-3">
              <span className="w-16 text-sm font-medium text-slate-300">
                {formatDay(item.date, idx)}
              </span>
              <div className="flex items-center gap-3 text-slate-300 flex-1 justify-center">
                <WeatherIcon name={condition.iconName} className="w-5 h-5 text-blue-300" />
                <span className="text-xs text-slate-400 hidden sm:inline">{condition.label}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-white font-medium">{item.temperatureMax}°</span>
                <span className="text-slate-500">{item.temperatureMin}°</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}