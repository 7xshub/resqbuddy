import { motion } from "framer-motion";
import { HeartPulse, Search, Wifi, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";
import { emergencies } from "@/data/emergencies";
import EmergencyCard from "@/components/EmergencyCard";
import EmergencyCallBar from "@/components/EmergencyCallBar";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const [search, setSearch] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const filtered = emergencies.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      {/* Header */}
      <div className="px-5 pb-2 pt-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emergency/10">
              <HeartPulse size={22} className="text-emergency" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">FirstAid</h1>
              <p className="text-[10px] text-muted-foreground">Emergency Guide</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5 shadow-sm">
            {isOnline ? (
              <Wifi size={12} className="text-success" />
            ) : (
              <WifiOff size={12} className="text-warning" />
            )}
            <span className="text-[10px] font-medium text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 rounded-3xl bg-gradient-active p-5"
        >
          <h2 className="text-lg font-bold text-primary-foreground">
            Stay Calm. Act Fast.
          </h2>
          <p className="mt-1 text-xs text-primary-foreground/80">
            Tap an emergency below for step-by-step illustrated guidance. Works completely offline.
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mt-5">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search emergencies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Emergency Grid */}
      <div className="mt-4 px-5">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Select Emergency
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {filtered.map((emergency, i) => (
            <EmergencyCard key={emergency.id} emergency={emergency} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            No emergencies found for "{search}"
          </p>
        )}
      </div>

      <EmergencyCallBar />
      <BottomNav />
    </div>
  );
};

export default Index;
