import { motion } from "framer-motion";
import { type EmergencyData } from "@/data/emergencies";
import { useNavigate } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

interface EmergencyCardProps {
  emergency: EmergencyData;
  index: number;
}

const severityLabel = {
  critical: "CRITICAL",
  high: "URGENT",
  moderate: "MODERATE",
};

const EmergencyCard = ({ emergency, index }: EmergencyCardProps) => {
  const navigate = useNavigate();
  const Icon = emergency.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => navigate(`/emergency/${emergency.id}`)}
      className="card-elevated flex flex-col items-center gap-3 p-5 transition-shadow hover:shadow-glow active:shadow-glow"
    >
      <div
        className="flex h-14 w-14 items-center justify-center rounded-2xl"
        style={{ backgroundColor: emergency.bgColor }}
      >
        <Icon size={28} style={{ color: emergency.color }} />
      </div>
      <span className="text-sm font-bold text-foreground">{emergency.title}</span>
      {emergency.severity === "critical" && (
        <span className="flex items-center gap-1 rounded-full bg-emergency/10 px-2 py-0.5 text-[10px] font-bold text-emergency">
          <AlertTriangle size={10} />
          {severityLabel[emergency.severity]}
        </span>
      )}
    </motion.button>
  );
};

export default EmergencyCard;
