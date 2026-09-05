import React from "react";
import { CurrentWeatherData, DailyForecastItem } from "@/types/weather";
import { Droplets, Wind, Gauge, Sun, Sunrise, Sunset, ArrowUpRight } from "lucide-react";

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
      sub: "Dew point comfortable",
      icon: Droplets,
      color: "text-blue-400",
      bgGlow: "group-hover:shadow-blue-500/20",
    },
    {
      label: "Wind",
      value: `${current.windSpeed} km/h`,
      sub: `Direction: ${current.windDirection}°`,
      icon: Wind,
      color: "text-sky-400",
      bgGlow: "group-hover:shadow-sky-500/20",
    },
    {
      label: "Pressure",
      value: `${current.surfacePressure} hPa`,
      sub: "Standard atmospheric",
      icon: Gauge,
      color: "text-emerald-400",
      bgGlow: "group-hover:shadow-emerald-500/20",
    },
    {
      label: "UV Index",
      value: `${current.uvIndex}`,
      sub: current.uvIndex > 5 ? "High exposure" : "Low exposure",
      icon: Sun,
      color: "text-amber-400",
      bgGlow: "group-hover:shadow-amber-500/20",
    },
    {
      label: "Sunrise",
      value: formatTime(today?.sunrise),
      sub: "Dawn",
      icon: Sunrise,
      color: "text-orange-400",
      bgGlow: "group-hover:shadow-orange-500/20",
    },
    {
      label: "Sunset",
      value: formatTime(today?.sunset),
      sub: "Dusk",
      icon: Sunset,
      color: "text-indigo-400",
      bgGlow: "group-hover:shadow-indigo-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className={`glass-panel p-5 flex flex-col justify-between group cursor-default transition-all duration-300 hover:border-white/25 ${m.bgGlow}`}
          >
            {/* Top Label & Micro Icon */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-slate-200 transition-colors">
                {m.label}
              </span>
              <div className={`p-2 rounded-xl bg-white/5 border border-white/10 ${m.color} group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300 shadow-sm`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            {/* Bold Metric Value */}
            <div className="my-1.5 flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {m.value}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>

            {/* Subtext description */}
            <span className="text-[11px] font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
              {m.sub}
            </span>
          </div>
        );
      })}
    </div>
  );
}
