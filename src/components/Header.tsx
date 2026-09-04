"use client";

import React, { useState } from "react";
import { Search, Navigation, Compass } from "lucide-react";

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
    <header className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-6 bg-glass-surface backdrop-blur-acrylic border border-glass-border rounded-2xl">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
          <Compass className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Atmosphere</h1>
          <p className="text-xs text-slate-400">Fluent Weather Client</p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <form onSubmit={handleSubmit} className="relative flex-1 sm:w-72">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search city..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-black/20 border border-glass-border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400/80 transition-all backdrop-blur-md"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400 pointer-events-none" />
        </form>

        <button
          onClick={onLocate}
          type="button"
          title="Use current location"
          className="p-2 bg-black/20 hover:bg-glass-hover border border-glass-border rounded-xl text-slate-300 hover:text-white transition-colors backdrop-blur-md"
        >
          <Navigation className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}