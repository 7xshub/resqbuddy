import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const EmergencyCallBar = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-20 left-4 right-4 z-50 flex items-center justify-between rounded-2xl bg-emergency p-3 px-5 shadow-emergency sm:left-auto sm:right-6 sm:w-80"
    >
      <span className="text-sm font-bold text-emergency-foreground">
        Emergency? Call now
      </span>
      <div className="flex gap-2">
        <a
          href="tel:108"
          className="flex items-center gap-1.5 rounded-xl bg-emergency-foreground/20 px-3 py-2 text-xs font-bold text-emergency-foreground backdrop-blur-sm transition-transform active:scale-95"
        >
          <Phone size={14} />
          108
        </a>
        <a
          href="tel:112"
          className="flex items-center gap-1.5 rounded-xl bg-emergency-foreground/20 px-3 py-2 text-xs font-bold text-emergency-foreground backdrop-blur-sm transition-transform active:scale-95"
        >
          <Phone size={14} />
          112
        </a>
      </div>
    </motion.div>
  );
};

export default EmergencyCallBar;
