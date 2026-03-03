import { motion } from "framer-motion";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const guides = [
  { title: "CPR Basics", desc: "Learn the universal CPR technique for adults and children.", icon: "🫀" },
  { title: "Recovery Position", desc: "How to place an unconscious breathing person safely.", icon: "🛌" },
  { title: "Wound Cleaning", desc: "Proper wound cleaning to prevent infection.", icon: "🩹" },
  { title: "Shock Management", desc: "Recognize and treat shock in emergency situations.", icon: "⚡" },
  { title: "When to Call 108", desc: "Know when the situation requires professional help.", icon: "📞" },
];

const GuidePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      <div className="px-5 pt-8">
        <button onClick={() => navigate("/")} className="mb-4 flex items-center gap-2 text-muted-foreground">
          <ArrowLeft size={20} /> Home
        </button>
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
            <BookOpen size={20} className="text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">First Aid Guide</h1>
        </div>

        <div className="flex flex-col gap-3">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-elevated flex items-start gap-4 p-5"
            >
              <span className="text-2xl">{guide.icon}</span>
              <div>
                <h3 className="font-bold text-foreground">{guide.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{guide.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default GuidePage;
