import React from "react";
import { CurrentWeatherData, DailyForecastItem } from "@/types/weather";
import { Droplets, Wind, Gauge, Sun, Sunrise, Sunset } from "lucide-react";

interface WeatherMetricsProps {
  current: CurrentWeatherData;
  today: DailyForecastItem;
}

export function WeatherMetrics({ current, today }: WeatherMetricsProps) {
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "--:--";
    return new Date(timeStr).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const metrics = [
    {
      label: "Humidity",
      value: `${current.relativeHumidity}%`,
      sub: `Dew point comfortable`,
      icon: Droplets,
    },
    {
      label: "Wind",
      value: `${current.windSpeed} km/h`,
      sub: `Direction: ${current.windDirection}°`,
      icon: Wind,
    },
    {
      label: "Pressure",
      value: `${current.surfacePressure} hPa`,
      sub: `Standard atmospheric`,
      icon: Gauge,
    },
    {
      label: "UV Index",
      value: `${current.uvIndex}`,
      sub: current.uvIndex > 5 ? "High exposure" : "Low exposure",
      icon: Sun,
    },
    {
      label: "Sunrise",
      value: formatTime(today?.sunrise),
      sub: "Dawn",
      icon: Sunrise,
    },
    {
      label: "Sunset",
      value: formatTime(today?.sunset),
      sub: "Dusk",
      icon: Sunset,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-glass-surface backdrop-blur-acrylic border border-glass-border flex flex-col justify-between"
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">{m.label}</span>
              <Icon className="w-4 h-4 text-blue-400" />
            </div>
            <div className="my-1">
              <span className="text-2xl font-bold text-white">{m.value}</span>
            </div>
            <span className="text-[11px] text-slate-400">{m.sub}</span>
          </div>
        );
      })}
    </div>
  );
}