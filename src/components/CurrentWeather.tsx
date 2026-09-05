import React from "react";
import { CurrentWeatherData, LocationData } from "@/types/weather";
import { getWeatherCondition } from "@/lib/weather-codes";
import { WeatherIcon } from "./WeatherIcon";
import { MapPin, Sparkles, ArrowUpRight, Wind, Thermometer } from "lucide-react";

interface CurrentWeatherProps {
  location: LocationData;
  current: CurrentWeatherData;
}

export function CurrentWeather({ location, current }: CurrentWeatherProps) {
  const condition = getWeatherCondition(current.weatherCode);

  return (
    <div className="w-full glass-panel p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden group cursor-default transition-all duration-500 hover:shadow-[0_25px_60px_rgba(56,189,248,0.2)]">
      {/* Dynamic Animated Ambient Glow Behind Card */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-gradient-to-br from-cyan-500/25 via-blue-600/20 to-indigo-600/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-gradient-to-tr from-purple-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Location & Status Header */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <MapPin className="w-4 h-4 text-cyan-400 animate-bounce" style={{ animationDuration: "2.5s" }} />
          <span className="text-sm font-semibold tracking-wide text-white">
            {location.name}
            {location.country ? `, ${location.country}` : ""}
          </span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>{condition.label}</span>
        </div>
      </div>

      {/* Main Temp & Animated Weather Icon */}
      <div className="my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
        <div>
          <div className="flex items-baseline">
            <span className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-transparent select-none drop-shadow-sm">
              {Math.round(current.temperature)}
            </span>
            <span className="text-4xl sm:text-5xl font-light text-cyan-400 ml-1">°C</span>
          </div>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Real-time atmospheric analysis
          </p>
        </div>

        {/* Floating Weather Icon with Ambient Halo */}
        <div className="relative self-center sm:self-auto">
          <div className="absolute inset-0 bg-cyan-400/20 rounded-3xl blur-2xl group-hover:bg-cyan-400/35 transition-colors duration-500" />
          <div className="relative p-6 rounded-3xl bg-white/[0.07] border border-white/15 text-cyan-300 shadow-xl backdrop-blur-xl animate-float group-hover:scale-105 transition-transform duration-300">
            <WeatherIcon name={condition.iconName} className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_10px_20px_rgba(56,189,248,0.4)]" />
          </div>
        </div>
      </div>

      {/* Micro-Details Footer */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 pt-5 border-t border-white/10 relative z-10">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-white/10 text-cyan-400">
            <Thermometer className="w-3.5 h-3.5" />
          </div>
          <span>Feels like <strong className="text-white font-semibold">{current.apparentTemperature}°C</strong></span>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-white/10 text-cyan-400">
            <Wind className="w-3.5 h-3.5" />
          </div>
          <span>Wind: <strong className="text-white font-semibold">{current.windSpeed} km/h</strong></span>
        </div>
      </div>
    </div>
  );
}
