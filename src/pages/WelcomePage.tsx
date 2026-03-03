import { motion } from "framer-motion";
import { HeartPulse, Wifi, ListChecks, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const features = [
  { icon: Wifi, label: "Offline Ready", desc: "Works without internet" },
  { icon: ListChecks, label: "Step-by-Step", desc: "Visual instructions" },
  { icon: Phone, label: "One-Tap Call", desc: "Emergency dial 108/112" },
];

const WelcomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("resqbuddy-onboarded")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleGetStarted = () => {
    localStorage.setItem("resqbuddy-onboarded", "true");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        {/* Logo */}
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-primary shadow-glow">
          <HeartPulse size={48} className="text-primary-foreground" />
          <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-lg bg-emergency text-xs font-bold text-emergency-foreground">
            +
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-foreground">ResQbuddy</h1>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Life-saving guidance, anywhere, anytime
        </p>
      </motion.div>

      {/* Feature badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-10 flex gap-4"
      >
        {features.map((f) => (
          <div key={f.label} className="flex flex-col items-center gap-2">
            <div className="card-neumorphic flex h-16 w-16 items-center justify-center">
              <f.icon size={24} className="text-primary" />
            </div>
            <span className="text-xs font-bold text-foreground">{f.label}</span>
            <span className="text-[10px] text-muted-foreground">{f.desc}</span>
          </div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleGetStarted}
        className="mt-12 w-full max-w-xs rounded-2xl bg-primary py-4 text-center text-sm font-bold text-primary-foreground shadow-glow transition-transform"
      >
        Get Started
      </motion.button>

      <p className="mt-4 text-[10px] text-muted-foreground">
        Based on WHO & Indian Red Cross guidelines
      </p>
    </div>
  );
};

export default WelcomePage;
