import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { getIcon } from "@/lib/icon-map";
import type { Tables } from "@/integrations/supabase/types";

interface EmergencyCardProps {
  emergency: Tables<"emergencies">;
  index: number;
}

const EmergencyCard = ({ emergency, index }: EmergencyCardProps) => {
  const navigate = useNavigate();
  const Icon = getIcon(emergency.icon_name);

  return (
    <motion.button
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/emergency/${emergency.id}`)}
      className="card-neumorphic flex items-center gap-3 p-4 text-left transition-shadow"
    >
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: emergency.bg_color }}
      >
        <Icon size={24} style={{ color: emergency.color }} />
      </div>
      <div className="flex-1">
        <span className="text-sm font-bold text-foreground">{emergency.title}</span>
        {emergency.severity === "critical" && (
          <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-emergency/10 px-1.5 py-0.5 text-[9px] font-bold text-emergency">
            <AlertTriangle size={8} /> CRITICAL
          </span>
        )}
      </div>
    </motion.button>
  );
};

export default EmergencyCard;
