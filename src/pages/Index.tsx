import { motion } from "framer-motion";
import { HeartPulse, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories, emergencies } from "@/data/emergencies";
import EmergencyCallBar from "@/components/EmergencyCallBar";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const hasSearch = search.trim().length > 0;
  const filtered = hasSearch
    ? emergencies.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-36">
      {/* Header */}
      <div className="px-5 pt-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <HeartPulse size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-foreground">ResQbuddy</h1>
            <p className="text-[10px] text-muted-foreground">Emergency Guide</p>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-5 px-5">
        <h2 className="text-xl font-bold text-foreground">Emergency Guide Selection</h2>
        <p className="mt-1 text-xs text-muted-foreground">Offline-first first-aid assistance</p>
      </div>

      {/* Search */}
      <div className="mt-4 px-5">
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search emergencies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl bg-card py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
          />
        </div>
      </div>

      {/* Search results */}
      {hasSearch && (
        <div className="mt-4 flex flex-col gap-2 px-5">
          {filtered.map((em) => {
            const Icon = em.icon;
            return (
              <motion.button
                key={em.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/emergency/${em.id}`)}
                className="card-soft flex items-center gap-3 p-3 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: em.bgColor }}>
                  <Icon size={20} style={{ color: em.color }} />
                </div>
                <span className="text-sm font-bold text-foreground">{em.title}</span>
              </motion.button>
            );
          })}
          {filtered.length === 0 && (
            <p className="mt-4 text-center text-sm text-muted-foreground">No results for "{search}"</p>
          )}
        </div>
      )}

      {/* Category grid */}
      {!hasSearch && (
        <div className="mt-5 grid grid-cols-2 gap-4 px-5">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(`/category/${cat.id}`)}
              className={`card-neumorphic flex flex-col items-center gap-3 border-2 p-5 ${cat.borderClass}`}
            >
              <span className="text-3xl leading-none">{cat.emoji}</span>
              <span className="text-sm font-bold text-foreground">{cat.title}</span>
              <span className="text-[10px] text-muted-foreground text-center leading-tight">{cat.subtitle}</span>
            </motion.button>
          ))}
        </div>
      )}

      <EmergencyCallBar />
      <BottomNav />
    </div>
  );
};

export default Index;
