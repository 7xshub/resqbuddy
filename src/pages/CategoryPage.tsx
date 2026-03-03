import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { emergencies, categories } from "@/data/emergencies";
import EmergencyCallBar from "@/components/EmergencyCallBar";
import BottomNav from "@/components/BottomNav";

const CategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === id);
  const items = emergencies.filter((e) => e.category === id);

  if (!category) return <div className="p-8 text-center text-muted-foreground">Category not found</div>;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-36">
      {/* Header */}
      <div className="px-5 pb-2 pt-6">
        <button onClick={() => navigate("/")} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft size={18} /> Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{category.emoji.slice(0, 2)}</span>
          <div>
            <h1 className="text-xl font-bold text-foreground">{category.title}</h1>
            <p className="text-xs text-muted-foreground">{category.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Emergency list */}
      <div className="mt-4 flex flex-col gap-3 px-5">
        {items.map((emergency, i) => {
          const Icon = emergency.icon;
          return (
            <motion.button
              key={emergency.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/emergency/${emergency.id}`)}
              className="card-neumorphic flex items-center gap-4 p-4 text-left"
            >
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: emergency.bgColor }}
              >
                <Icon size={24} style={{ color: emergency.color }} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{emergency.title}</p>
                <p className="text-xs text-muted-foreground">
                  {emergency.steps.length} steps · {emergency.noKitAlternatives.length > 0 ? "No-kit mode" : "Standard"}
                </p>
              </div>
              {emergency.severity === "critical" && (
                <span className="flex items-center gap-1 rounded-full bg-emergency/10 px-2 py-1 text-[10px] font-bold text-emergency">
                  <AlertTriangle size={10} /> CRITICAL
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <EmergencyCallBar />
      <BottomNav />
    </div>
  );
};

export default CategoryPage;
