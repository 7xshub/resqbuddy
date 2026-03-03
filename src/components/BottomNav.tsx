import { Home, BookOpen, Shield } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Guide", path: "/guide" },
  { icon: Shield, label: "About", path: "/about" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
      <div className="mx-auto max-w-md">
        <div className="mx-3 mb-2 flex items-center justify-around rounded-3xl bg-foreground/95 px-4 py-3 backdrop-blur-xl">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center gap-1 px-4 py-1"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-2xl bg-primary/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Icon
                  size={20}
                  className={isActive ? "text-primary-foreground" : "text-muted-foreground"}
                />
                <span
                  className={`text-[10px] font-medium ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
