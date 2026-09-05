"use client";

import React, { useState } from "react";
import { Search, MapPin, Bell, Calendar, Sparkles } from "lucide-react";

interface HeaderProps {
  onSearch: (city: string) => void;
  onLocate: () => void;
}

export function Header({ onSearch, onLocate }: HeaderProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-4 py-3 px-6 bg-white rounded-3xl shadow-sm border border-slate-150 mb-6">
      {/* User / Brand Profile Pill */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-xl shadow-md shadow-orange-500/20">
            ☀️
          </div>
          <div>
            <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Atmosphere</span>
              <span className="text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">PRO</span>
            </div>
            <h1 className="text-base font-extrabold text-slate-800 tracking-tight">Weather Station</h1>
          </div>
        </div>
      </div>

      {/* Big Rounded Search Input */}
      <div className="w-full md:max-w-md">
        <form onSubmit={handleSubmit} className="relative w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search country, city or airport..."
            className="w-full pl-11 pr-24 py-3 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm font-semibold text-slate-800 placeholder-slate-400 rounded-2xl border border-transparent focus:border-amber-400 focus:outline-none transition-all shadow-inner"
          />
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
          <button
            type="submit"
            className="absolute right-2 top-2 px-3.5 py-1.5 bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold rounded-xl transition-all duration-200"
          >
            Find
          </button>
        </form>
      </div>

      {/* Quick Action Capsules */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onLocate}
          title="Detect my location"
          className="flex items-center gap-1.5 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold rounded-2xl transition-all active:scale-95 cursor-pointer"
        >
          <MapPin className="w-4 h-4 text-amber-600" />
          <span>Locate Me</span>
        </button>

        <div className="p-2.5 bg-slate-100 rounded-2xl text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer">
          <Calendar className="w-4 h-4" />
        </div>
        <div className="p-2.5 bg-slate-100 rounded-2xl text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 bg-orange-500 rounded-full absolute top-2 right-2 border-2 border-white" />
        </div>
      </div>
    </header>
  );
}
