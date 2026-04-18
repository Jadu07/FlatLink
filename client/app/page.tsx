"use client";

import Image from "next/image";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const popularCities = ["Bengaluru", "Mumbai", "Pune", "Delhi"];

  const handleSearch = (city?: string) => {
    const query = city || searchQuery;
    if (query.trim()) {
      router.push(`/explore-listings?query=${encodeURIComponent(query.trim())}`);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <main className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-20 lg:py-0">
      <div className="absolute inset-0">
        <Image
          src="/images/city_map_pattern.png"
          alt="Map Pattern Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6">
        <div className="animate-in fade-in slide-in-from-bottom-12 overflow-hidden rounded-[4rem] border border-white bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] duration-1000">
          <div className="flex min-h-[600px] flex-col lg:flex-row">
            
            <div className="flex flex-1 flex-col justify-center space-y-8 p-12 lg:p-24">
              <div className="space-y-4">
                <h1 className="text-6xl font-black leading-[0.9] tracking-tighter text-zinc-950 lg:text-[5.5rem]">
                  Find your <br /> people.
                </h1>
                <p className="text-xl font-medium text-zinc-400 lg:text-2xl">
                  Rooms, PGs, and compatible flatmates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="group relative block w-full max-w-md">
                  <Search className="absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#164E44]" />
                  <input
                    type="text"
                    placeholder="Where are you looking?"
                    aria-label="Search for locations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="h-16 w-full rounded-2xl border border-zinc-200 bg-zinc-50/50 pl-14 pr-16 text-lg outline-none placeholder:text-zinc-400 transition-all focus:border-[#164E44] focus:ring-4 focus:ring-[#164E44]/5"
                  />
                  <button 
                    onClick={() => handleSearch()}
                    aria-label="Submit search"
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl border border-zinc-100 bg-zinc-50 text-zinc-400 transition-colors hover:text-zinc-950"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-zinc-400">Popular Cities :</span>
                  {popularCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleSearch(city)}
                      className="rounded-full bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200 hover:text-zinc-900"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pointer-events-none flex flex-1 items-center justify-center">
              <div className="relative h-[500px] w-full -translate-x-12 lg:h-[600px] lg:-translate-x-20">
                <Image
                  src="/images/illustration.svg"
                  alt="City life illustration"
                  fill
                  className="object-contain pr-5 translate-y-4 scale-[3.5]"
                  priority
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}