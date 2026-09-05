import React from "react";
import { CurrentWeatherData, DailyForecastItem } from "@/types/weather";

interface WeatherMetricsProps {
  current: CurrentWeatherData;
  today: DailyForecastItem;
}

export function WeatherMetrics({ current, today }: WeatherMetricsProps) {
  const formatTime = (timeStr?: string) => {
    if (!timeStr) return "--:--";
    return new Date(timeStr).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const cards = [
    {
      title: "Air Humidity",
      value: `${current.relativeHumidity}%`,
      subtitle: "Pleasant & normal",
      emoji: "💧",
      bg: "bg-blue-50 border-blue-200/70 text-blue-900",
    },
    {
      title: "Wind Speed",
      value: `${current.windSpeed} km/h`,
      subtitle: `Direction ${current.windDirection}°`,
      emoji: "🍃",
      bg: "bg-teal-50 border-teal-200/70 text-teal-900",
    },
    {
      title: "Sunrise",
      value: formatTime(today?.sunrise),
      subtitle: "Early dawn",
      emoji: "🌅",
      bg: "bg-amber-50 border-amber-200/70 text-amber-900",
    },
    {
      title: "Sunset",
      value: formatTime(today?.sunset),
      subtitle: "Golden hour dusk",
      emoji: "🌇",
      bg: "bg-purple-50 border-purple-200/70 text-purple-900",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`bento-card p-5 border flex flex-col justify-between ${card.bg} hover:scale-[1.02]`}
        >
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider opacity-70">
              {card.title}
            </span>
            <span className="text-2xl">{card.emoji}</span>
          </div>

          <div className="my-3">
            <span className="text-3xl font-black tracking-tight">{card.value}</span>
          </div>

          <span className="text-xs font-semibold opacity-75">{card.subtitle}</span>
        </div>
      ))}
    </div>
  );
}
