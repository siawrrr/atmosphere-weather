"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Navigation, Compass, Sparkles, X } from "lucide-react";

interface HeaderProps {
  onSearch: (city: string) => void;
  onLocate: () => void;
}

export function Header({ onSearch, onLocate }: HeaderProps) {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey: Cmd+K or Ctrl+K auto-focuses search bar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
      inputRef.current?.blur();
    }
  };

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between gap-5 py-4 px-6 glass-panel border border-white/10 shadow-2xl relative z-30 transition-all duration-300">
      {/* Brand & Identity */}
      <div className="flex items-center gap-3.5 group cursor-pointer">
        <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 group-hover:scale-110 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all duration-300">
          <Compass className="w-6 h-6 animate-[spin_12s_linear_infinite]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Atmosphere
            </h1>
            <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Live
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Fluent Weather Engine</p>
        </div>
      </div>

      {/* Big Animated Search Bar & Actions */}
      <div className="flex items-center gap-3 w-full md:w-auto flex-1 md:max-w-xl justify-end">
        <form
          onSubmit={handleSubmit}
          className={`relative w-full transition-all duration-300 rounded-2xl p-[1px] ${
            isFocused
              ? "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_25px_rgba(56,189,248,0.35)]"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          <div className="relative flex items-center bg-slate-950/80 backdrop-blur-xl rounded-[15px] px-4 py-2.5">
            <Search
              className={`w-5 h-5 transition-all duration-300 mr-3 shrink-0 ${
                isFocused ? "text-cyan-400 scale-110" : "text-slate-400"
              }`}
            />
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search city, coordinates or airport..."
              className="w-full bg-transparent text-sm md:text-base text-white placeholder-slate-400 focus:outline-none tracking-wide"
            />

            {input && (
              <button
                type="button"
                onClick={() => setInput("")}
                className="p-1 text-slate-400 hover:text-white rounded-full hover:bg-white/10 transition-colors mr-2"
                aria-label="Clear input"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="hidden sm:flex items-center gap-1 shrink-0 pl-2 border-l border-white/10">
              <kbd className="px-2 py-0.5 text-[11px] font-semibold text-slate-300 bg-white/5 border border-white/10 rounded shadow-inner">
                ⌘K
              </kbd>
            </div>

            <button
              type="submit"
              className="ml-3 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-xs rounded-xl shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Go</span>
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Current Location Button with Hover Pulse */}
        <button
          onClick={onLocate}
          type="button"
          title="Use current location"
          className="p-3 bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 hover:border-cyan-400/50 rounded-2xl text-slate-300 hover:text-cyan-300 transition-all duration-300 shadow-lg group shrink-0"
        >
          <Navigation className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
        </button>
      </div>
    </header>
  );
}
