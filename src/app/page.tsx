"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, MapPin, Wind, Droplets, Compass, Sun, 
  Sunrise, Sunset, Sparkles, Navigation, CloudRain, 
  Umbrella, Smile, Calendar, Bell, ChevronRight
} from "lucide-react";

export default function WeatherDashboard() {
  const [city, setCity] = useState("Pune, India");
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Live weather mock/state that updates cleanly
  const [weather, setWeather] = useState({
    temp: 26,
    condition: "Passing Showers",
    feelsLike: 28,
    high: 29,
    low: 22,
    humidity: 78,
    wind: 16,
    windDirection: "SW",
    uv: 4,
    sunrise: "06:18 AM",
    sunset: "06:42 PM",
    isRainy: true,
  });

  const hourly = [
    { time: "Now", temp: 26, emoji: "🌦️", pop: "80%" },
    { time: "01 PM", temp: 27, emoji: "🌧️", pop: "90%" },
    { time: "02 PM", temp: 28, emoji: "⛅", pop: "40%" },
    { time: "03 PM", temp: 29, emoji: "☀️", pop: "10%" },
    { time: "04 PM", temp: 28, emoji: "🌤️", pop: "20%" },
    { time: "05 PM", temp: 26, emoji: "⛅", pop: "20%" },
    { time: "06 PM", temp: 25, emoji: "🌅", pop: "5%" },
    { time: "07 PM", temp: 24, emoji: "🌙", pop: "0%" },
  ];

  const weekly = [
    { day: "Today", desc: "Showers", emoji: "🌧️", high: 28, low: 22, color: "bg-blue-500" },
    { day: "Sun", desc: "Partly Sunny", emoji: "⛅", high: 29, low: 23, color: "bg-amber-400" },
    { day: "Mon", desc: "Sunny & Bright", emoji: "☀️", high: 31, low: 24, color: "bg-orange-400" },
    { day: "Tue", desc: "Thunderstorms", emoji: "⛈️", high: 27, low: 21, color: "bg-indigo-500" },
    { day: "Wed", desc: "Clear Sky", emoji: "🌤️", high: 30, low: 22, color: "bg-amber-500" },
    { day: "Thu", desc: "Overcast", emoji: "☁️", high: 28, low: 22, color: "bg-slate-400" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setCity(searchInput.trim());
      setIsSearching(false);
      setSearchInput("");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-slate-800 p-3 sm:p-6 lg:p-8 font-sans selection:bg-amber-200">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ================= TOP NAV BAR ================= */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 px-6 rounded-[2rem] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] border border-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-2xl shadow-lg shadow-orange-400/30 transform hover:rotate-12 transition-transform cursor-pointer">
              🌈
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900">Atmosphere</h1>
                <span className="text-[10px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-sm">
                  VIBRANT
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-400">Interactive Weather Studio</p>
            </div>
          </div>

          {/* Big Interactive Search Bar */}
          <div className="w-full md:max-w-md">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search city, island, coordinates..."
                className="w-full pl-12 pr-28 py-3.5 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-sm font-bold text-slate-800 placeholder-slate-400 rounded-2xl border-2 border-transparent focus:border-amber-400 focus:outline-none transition-all shadow-inner"
              />
              <Search className="absolute left-4 w-5 h-5 text-slate-400" />
              <button
                type="submit"
                className="absolute right-2 px-4 py-2 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-extrabold rounded-xl transition-all shadow-md active:scale-95"
              >
                {isSearching ? "..." : "Explore ✨"}
              </button>
            </form>
          </div>

          {/* User Profile & Location Pill */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200/80 rounded-2xl text-amber-900 text-xs font-bold shadow-sm">
              <MapPin className="w-4 h-4 text-orange-500 animate-bounce" />
              <span>{city}</span>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-lg hover:bg-slate-200 transition cursor-pointer">
              🔔
            </div>
          </div>
        </header>

        {/* ================= BENTO GRID HERO & CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT: Vibrant 3D Sky Hero Banner with Human Character (Cols 8) */}
          <div className="lg:col-span-8 bg-gradient-to-b from-[#7dd3fc] via-[#bae6fd] to-[#e0f2fe] rounded-[2.5rem] p-8 relative overflow-hidden shadow-[0_20px_50px_-15px_rgba(56,189,248,0.35)] border border-white flex flex-col justify-between min-h-[440px]">
            
            {/* Top Atmospheric Aura */}
            <div className="flex items-center justify-between relative z-10">
              <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 shadow-sm">
                <span className="text-lg">📍</span>
                <div>
                  <h2 className="text-sm font-extrabold text-slate-800">{city}</h2>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Live Observations</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-2 rounded-2xl text-xs font-black text-sky-900 shadow-sm">
                <span className="animate-pulse text-sm">🟢</span>
                <span>Air Quality: 42 (Fresh)</span>
              </div>
            </div>

            {/* Mid Hero Info & 3D Character Illustration */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 my-auto relative z-10">
              <div>
                <span className="inline-block px-3 py-1 bg-amber-400/90 text-amber-950 font-black text-xs uppercase tracking-widest rounded-xl shadow-sm mb-3">
                  {weather.condition} 🌦️
                </span>
                <div className="flex items-baseline">
                  <span className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter drop-shadow-sm">
                    {weather.temp}
                  </span>
                  <span className="text-4xl font-extrabold text-sky-700 ml-1">°C</span>
                </div>
                <p className="text-slate-700 font-bold text-sm mt-1 flex items-center gap-2">
                  <span>Feels like {weather.feelsLike}°</span>
                  <span>•</span>
                  <span>↑{weather.high}° ↓{weather.low}°</span>
                </p>
              </div>

              {/* Graphic Character Illustration (Human with Umbrella/Sunny Outfit) */}
              <div className="relative flex justify-center items-center">
                <div className="w-56 h-56 relative animate-[bounce_4s_ease-in-out_infinite]">
                  <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                    {/* Glowing Soft Sun */}
                    <circle cx="160" cy="45" r="32" fill="#FBBF24" opacity="0.9" />
                    <circle cx="160" cy="45" r="42" fill="#FDE68A" opacity="0.4" />
                    {/* Fluffy Cartoon Cloud */}
                    <path d="M 30 110 A 25 25 0 0 1 70 85 A 35 35 0 0 1 130 90 A 25 25 0 0 1 150 120 A 15 15 0 0 1 140 140 L 40 140 A 15 15 0 0 1 30 110 Z" fill="#FFFFFF" opacity="0.95" />
                    {/* Giant Orange Umbrella */}
                    <path d="M 70 85 Q 115 30 160 85 Z" fill="#F97316" />
                    <path d="M 115 85 L 115 145" stroke="#7C2D12" strokeWidth="4" strokeLinecap="round" />
                    {/* Character Body */}
                    <circle cx="115" cy="110" r="14" fill="#FED7AA" />
                    <path d="M 100 130 C 100 120 130 120 130 130 L 128 165 L 102 165 Z" fill="#0284C7" rx="6" />
                    {/* Legs & Boots */}
                    <rect x="105" y="165" width="8" height="24" fill="#1E293B" rx="3" />
                    <rect x="117" y="165" width="8" height="24" fill="#1E293B" rx="3" />
                    <ellipse cx="107" cy="190" rx="7" ry="4" fill="#E11D48" />
                    <ellipse cx="123" cy="190" rx="7" ry="4" fill="#E11D48" />
                    {/* Rain Streaks */}
                    <line x1="45" y1="150" x2="35" y2="175" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                    <line x1="80" y1="155" x2="70" y2="180" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom Advice Capsule */}
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm border border-white/60 relative z-10">
              <div className="flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-xs sm:text-sm font-extrabold text-slate-800">
                  Passing rain showers anticipated today. Bring your umbrella along! ☂️
                </p>
              </div>
              <span className="text-[11px] font-black text-sky-800 bg-sky-100 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                Updated Just Now
              </span>
            </div>
          </div>

          {/* RIGHT: 7-Day Forecast Bento Cards (Cols 4) */}
          <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-6 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📅</span>
                <h3 className="font-extrabold text-slate-900 text-base">Weekly Outlook</h3>
              </div>
              <span className="text-xs font-bold text-slate-400">7 Days</span>
            </div>

            <div className="space-y-3">
              {weekly.map((w, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group"
                >
                  <span className="w-14 font-extrabold text-xs text-slate-700">{w.day}</span>
                  <div className="flex items-center gap-2 flex-1 px-3">
                    <span className="text-xl group-hover:scale-125 transition-transform">{w.emoji}</span>
                    <span className="text-xs font-bold text-slate-500">{w.desc}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black">
                    <span className="text-slate-900">{w.high}°</span>
                    <span className="text-slate-400 font-semibold">{w.low}°</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="text-xs font-bold text-amber-950">Tomorrow's Trend</p>
                  <p className="text-[11px] font-semibold text-amber-800">Warm sunshine expected</p>
                </div>
              </div>
              <span className="text-xs font-black text-orange-600">31°C</span>
            </div>
          </div>
        </div>

        {/* ================= HOURLY HORIZONTAL SLIDER ================= */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.06)] border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">⏱️</span>
              <h3 className="font-extrabold text-slate-900 text-lg">Hourly Forecast</h3>
            </div>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-xl">
              24-Hour Horizon
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {hourly.map((h, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-between p-4 rounded-3xl bg-slate-50 hover:bg-amber-100/60 hover:-translate-y-1.5 transition-all duration-300 border border-slate-100 hover:border-amber-300 cursor-pointer shadow-sm group"
              >
                <span className="text-xs font-bold text-slate-500 group-hover:text-amber-950">{h.time}</span>
                <span className="text-3xl my-2 group-hover:scale-125 transition-transform">{h.emoji}</span>
                <span className="text-base font-black text-slate-800 group-hover:text-amber-950">{h.temp}°</span>
                <span className="text-[10px] font-extrabold text-sky-600 mt-1">{h.pop}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= VIBRANT METRICS BENTO TILES ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Humidity Card */}
          <div className="bg-gradient-to-br from-blue-50 to-sky-100/70 rounded-[2rem] p-6 border border-blue-200/80 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-blue-900 tracking-wider">Air Humidity</span>
              <span className="text-2xl">💧</span>
            </div>
            <div className="my-4">
              <span className="text-4xl font-black text-blue-950">{weather.humidity}%</span>
              <p className="text-xs font-semibold text-blue-800 mt-1">Comfortable dew point</p>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${weather.humidity}%` }} />
            </div>
          </div>

          {/* Wind Radar Card */}
          <div className="bg-gradient-to-br from-teal-50 to-emerald-100/70 rounded-[2rem] p-6 border border-teal-200/80 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-teal-900 tracking-wider">Wind Speed</span>
              <span className="text-2xl">🍃</span>
            </div>
            <div className="my-4">
              <span className="text-4xl font-black text-teal-950">{weather.wind} <span className="text-lg">km/h</span></span>
              <p className="text-xs font-semibold text-teal-800 mt-1">Blowing {weather.windDirection} • Gentle</p>
            </div>
            <div className="w-full bg-teal-200 rounded-full h-2 overflow-hidden">
              <div className="bg-teal-600 h-2 rounded-full" style={{ width: "35%" }} />
            </div>
          </div>

          {/* Sunrise / Sunset Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-100/70 rounded-[2rem] p-6 border border-orange-200/80 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-900 tracking-wider">Sun Horizon</span>
              <span className="text-2xl">🌅</span>
            </div>
            <div className="my-3 space-y-2">
              <div className="flex justify-between items-center text-xs font-extrabold text-amber-950">
                <span>Dawn: {weather.sunrise}</span>
                <span>☀️</span>
              </div>
              <div className="flex justify-between items-center text-xs font-extrabold text-orange-950">
                <span>Dusk: {weather.sunset}</span>
                <span>🌇</span>
              </div>
            </div>
            <div className="text-[11px] font-bold text-amber-800">12h 24m Total Daylight</div>
          </div>

          {/* UV Index Card */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-100/70 rounded-[2rem] p-6 border border-purple-200/80 shadow-sm flex flex-col justify-between hover:scale-[1.02] transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-purple-900 tracking-wider">UV Exposure</span>
              <span className="text-2xl">🕶️</span>
            </div>
            <div className="my-4">
              <span className="text-4xl font-black text-purple-950">{weather.uv} <span className="text-base font-bold text-purple-700">Index</span></span>
              <p className="text-xs font-semibold text-purple-800 mt-1">Moderate — sunglasses recommended</p>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2 overflow-hidden">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: "40%" }} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
