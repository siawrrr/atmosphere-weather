"use client";

import React from "react";
import { HourlyForecastItem } from "@/types/weather";
import { getWeatherCondition } from "@/lib/weather-codes";
import { WeatherIcon } from "./WeatherIcon";

interface HourlyForecastProps {
  hourly: HourlyForecastItem[];
}

export function HourlyForecast({ hourly }: HourlyForecastProps) {
  const points = hourly.slice(0, 12);
  if (points.length === 0) return null;

  const temps = points.map((p) => p.temperature);
  const minTemp = Math.min(...temps) - 2;
  const maxTemp = Math.max(...temps) + 2;
  const range = maxTemp - minTemp || 1;

  const width = 560;
  const height = 110;
  const paddingX = 24;
  const paddingY = 22;

  const getX = (i: number) => paddingX + (i * (width - 2 * paddingX)) / (points.length - 1);
  const getY = (t: number) => height - paddingY - ((t - minTemp) / range) * (height - 2 * paddingY);

  const coords = points.map((p, i) => ({ x: getX(i), y: getY(p.temperature), temp: p.temperature }));

  const pathD = coords.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x},${pt.y}`;
    const prev = arr[i - 1];
    const cx = (prev.x + pt.x) / 2;
    return `${acc} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`;
  }, "");

  const areaD = `${pathD} L ${coords[coords.length - 1].x},${height} L ${coords[0].x},${height} Z`;

  return (
    <div className="acrylic-card rounded-2xl p-4 flex flex-col justify-between h-full">
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 overflow-visible">
          <defs>
            <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
            </linearGradient>
          </defs>

          {/* Shaded area underneath */}
          <path d={areaD} fill="url(#curveGradient)" />

          {/* Main stroke line */}
          <path d={pathD} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />

          {/* Dots and temperature text */}
          {coords.map((pt, i) => (
            <g key={i}>
              <circle cx={pt.x} cy={pt.y} r="2.5" fill="#ffffff" />
              <text
                x={pt.x}
                y={pt.y - 8}
                fontSize="10"
                fill="rgba(255,255,255,0.85)"
                textAnchor="middle"
              >
                {pt.temp}°
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Hourly weather icons & time row */}
      <div className="grid grid-flow-col auto-cols-fr gap-1 pt-2 border-t border-white/10">
        {points.map((p, i) => {
          const condition = getWeatherCondition(p.weatherCode);
          const time = new Date(p.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
          return (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="text-yellow-300">
                <WeatherIcon name={condition.iconName} className="w-3.5 h-3.5" />
              </div>
              <span className="text-[9px] text-white/50">{time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
