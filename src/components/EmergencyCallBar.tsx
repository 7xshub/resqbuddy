import { Phone } from "lucide-react";
import { motion } from "framer-motion";

const EmergencyCallBar = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-16 left-0 right-0 z-50 px-4"
    >
      <div className="mx-auto max-w-md">
        <a
          href="tel:108"
          className="flex items-center justify-center gap-2 rounded-2xl bg-emergency py-3.5 text-sm font-bold text-emergency-foreground shadow-emergency transition-transform active:scale-[0.98]"
        >
          <Phone size={16} />
          EMERGENCY CALL
        </a>
      </div>
    </motion.div>
  );
};

export default EmergencyCallBar;
