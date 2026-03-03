import { motion } from "framer-motion";
import { ArrowLeft, Shield, Heart, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <div className="px-5 pt-8">
        <button onClick={() => navigate("/")} className="mb-4 flex items-center gap-2 text-muted-foreground">
          <ArrowLeft size={20} /> Home
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 text-2xl font-bold text-foreground">About FirstAid</h1>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            An offline-first emergency first-aid PWA that delivers illustrated, age-aware, decision-based life-saving guidance in low-connectivity situations.
          </p>

          <div className="flex flex-col gap-4">
            <div className="card-elevated p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
                <Globe size={20} className="text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Works Offline</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                100% functional without internet. Install once, use anywhere — even in airplane mode.
              </p>
            </div>
            <div className="card-elevated p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-secondary/20">
                <Heart size={20} className="text-secondary" />
              </div>
              <h3 className="font-bold text-foreground">Medically Verified</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Based on WHO First Aid Guidelines, Indian Red Cross Manual, and NIH research.
              </p>
            </div>
            <div className="card-elevated p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-emergency/10">
                <Shield size={20} className="text-emergency" />
              </div>
              <h3 className="font-bold text-foreground">For Everyone</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Designed for non-medical individuals. Simple icons, clear steps, no jargon.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <BottomNav />
    </div>
  );
};

export default AboutPage;
