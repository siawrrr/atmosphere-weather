"use client";

import React, { useEffect, useState } from "react";
import { DailyForecast } from "@/components/DailyForecast";
import { HourlyForecast } from "@/components/HourlyForecast";
import { WeatherMetrics } from "@/components/WeatherMetrics";
import { getWeatherCondition } from "@/lib/weather-codes";
import { ProcessedWeatherData } from "@/types/weather";
import { Search, Settings, Minus, Square, X, RefreshCw } from "lucide-react";

export default function Home() {
  const [data, setData] = useState<ProcessedWeatherData | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchWeather = async (param: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/weather?${param}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silently handle
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeather(`q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => fetchWeather(`lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`),
        () => fetchWeather("q=Tokyo")
      );
    } else {
      fetchWeather("q=Tokyo");
    }
  }, []);

  const condition = data ? getWeatherCondition(data.current.weatherCode) : { label: "Clear" };

  return (
    <main className="w-full min-h-screen flex items-center justify-center p-4 sm:p-8">
      {/* Fluent App Window Container */}
      <div className="acrylic-window w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col">
        {/* Windows 11 Titlebar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="text-white/80 font-medium tracking-tight">Lively Weather (Beta)</span>
          </div>

          {/* Search a place input */}
          <form onSubmit={handleSearch} className="relative w-64">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a place"
              className="w-full bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/15 rounded-lg px-3 py-1 pr-7 text-xs text-white placeholder-white/40 focus:outline-none transition-all"
            />
            <Search className="w-3.5 h-3.5 text-white/40 absolute right-2 top-2 pointer-events-none" />
          </form>

          {/* Windows titlebar control actions */}
          <div className="flex items-center gap-3 text-white/60">
            <RefreshCw
              className={`w-3.5 h-3.5 cursor-pointer hover:text-white transition-colors ${loading ? "animate-spin" : ""}`}
              onClick={() => data && fetchWeather(`lat=${data.location.latitude}&lon=${data.location.longitude}`)}
            />
            <Settings className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-white/10">
              <Minus className="w-3 h-3 cursor-pointer hover:text-white" />
              <Square className="w-2.5 h-2.5 cursor-pointer hover:text-white" />
              <X className="w-3.5 h-3.5 cursor-pointer hover:text-red-400" />
            </div>
          </div>
        </div>

        {/* Window Body */}
        {data && (
          <div className="p-6 flex flex-col gap-6">
            {/* Centered Hero Header */}
            <div className="flex flex-col items-center justify-center text-center">
              <h1 className="text-xl font-medium text-white/90 tracking-wide">
                {data.location.name}
                {data.location.country ? `, ${data.location.country}` : ""}
              </h1>
              <div className="text-6xl font-light text-white my-1 tracking-tight">
                {data.current.temperature}°
              </div>
              <p className="text-xs text-white/70 font-normal">{condition.label}</p>
              <p className="text-[11px] text-white/40">Feels like {data.current.apparentTemperature}°</p>
            </div>

            {/* Top Cards: 7-Day Forecast (Left) + Temperature Hill Graph (Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5 h-[230px]">
                <DailyForecast daily={data.daily} />
              </div>
              <div className="md:col-span-7 h-[230px]">
                <HourlyForecast hourly={data.hourly} />
              </div>
            </div>

            {/* Bottom Cards: The 6-widget acrylic metrics */}
            <WeatherMetrics current={data.current} today={data.daily[0]} />
          </div>
        )}
      </div>
    </main>
  );
}