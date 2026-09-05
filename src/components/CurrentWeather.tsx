import React from "react";
import { CurrentWeatherData, LocationData } from "@/types/weather";
import { getWeatherCondition } from "@/lib/weather-codes";
import { MapPin, Navigation } from "lucide-react";

interface CurrentWeatherProps {
  location: LocationData;
  current: CurrentWeatherData;
}

export function CurrentWeather({ location, current }: CurrentWeatherProps) {
  const condition = getWeatherCondition(current.weatherCode);
  const isRainy = condition.label.toLowerCase().includes("rain") || condition.label.toLowerCase().includes("shower");

  return (
    <div className="w-full bento-card p-8 bg-gradient-to-br from-sky-100 via-sky-50 to-amber-50 relative overflow-hidden flex flex-col justify-between border-sky-200/60">
      {/* Header Pill */}
      <div className="flex items-center justify-between z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 shadow-sm rounded-2xl text-xs font-bold text-slate-700">
          <MapPin className="w-3.5 h-3.5 text-sky-600" />
          <span>{location.name}{location.country ? `, ${location.country}` : ""}</span>
        </div>
        <span className="px-3 py-1 bg-sky-500/10 text-sky-700 rounded-xl text-xs font-extrabold uppercase">
          {condition.label}
        </span>
      </div>

      {/* Main Temp & Human Character Illustration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center my-6 z-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Weather Now</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-7xl md:text-8xl font-black tracking-tighter text-slate-900">
              {Math.round(current.temperature)}°
            </span>
            <span className="text-2xl font-bold text-slate-400">C</span>
          </div>
          <p className="text-sm font-semibold text-slate-600 mt-2">
            Feels like {Math.round(current.apparentTemperature)}° • {isRainy ? "Don't forget your umbrella! ☔" : "Great day for a walk! 🕶️"}
          </p>
        </div>

        {/* Dynamic Character Illustration */}
        <div className="relative flex justify-center items-center py-2">
          <div className="w-48 h-48 md:w-56 md:h-56 relative animate-float-slow">
            {isRainy ? (
              /* Rainy Day Character SVG */
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                <circle cx="100" cy="100" r="85" fill="#e0f2fe" opacity="0.6"/>
                <path d="M 60 70 Q 100 20 140 70 Z" fill="#f97316" />
                <path d="M 100 70 L 100 120" stroke="#7c2d12" strokeWidth="4" strokeLinecap="round"/>
                {/* Character */}
                <circle cx="100" cy="95" r="14" fill="#fed7aa"/>
                <path d="M 85 115 C 85 105 115 105 115 115 L 115 155 L 85 155 Z" fill="#0284c7" rx="8"/>
                <rect x="88" y="155" width="9" height="25" fill="#334155" rx="4"/>
                <rect x="103" y="155" width="9" height="25" fill="#334155" rx="4"/>
                {/* Rain drops */}
                <line x1="45" y1="50" x2="40" y2="70" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                <line x1="160" y1="45" x2="155" y2="65" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
                <line x1="150" y1="90" x2="145" y2="110" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
              </svg>
            ) : (
              /* Sunny Meadow Character SVG */
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                <circle cx="150" cy="50" r="30" fill="#facc15" />
                <path d="M 20 160 Q 100 120 180 160 L 180 200 L 20 200 Z" fill="#86efac" />
                {/* Character standing on hill */}
                <circle cx="100" cy="90" r="14" fill="#fed7aa"/>
                <path d="M 88 84 Q 100 75 112 84 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                <rect x="90" y="106" width="20" height="35" fill="#059669" rx="6"/>
                <rect x="92" y="140" width="6" height="25" fill="#1e293b" rx="3"/>
                <rect x="102" y="140" width="6" height="25" fill="#1e293b" rx="3"/>
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row Inside Hero */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-sky-200/60 z-10">
        <div className="bg-white/80 p-3 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Wind</span>
          <p className="text-sm font-extrabold text-slate-800">{current.windSpeed} km/h</p>
        </div>
        <div className="bg-white/80 p-3 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Humidity</span>
          <p className="text-sm font-extrabold text-slate-800">{current.relativeHumidity}%</p>
        </div>
        <div className="bg-white/80 p-3 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">Pressure</span>
          <p className="text-sm font-extrabold text-slate-800">{current.surfacePressure} hPa</p>
        </div>
        <div className="bg-white/80 p-3 rounded-2xl">
          <span className="text-[10px] uppercase font-bold text-slate-400">UV Rating</span>
          <p className="text-sm font-extrabold text-slate-800">{current.uvIndex} index</p>
        </div>
      </div>
    </div>
  );
}
