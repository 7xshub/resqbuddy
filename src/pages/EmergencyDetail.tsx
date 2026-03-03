import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Baby, User, Package, PackageX, ChevronRight, CheckCircle2 } from "lucide-react";
import { emergencies } from "@/data/emergencies";
import EmergencyCallBar from "@/components/EmergencyCallBar";

type AgeGroup = "adult" | "child" | null;

const EmergencyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const [hasKit, setHasKit] = useState<boolean | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [triageIndex, setTriageIndex] = useState<number | null>(null);
  const [triageAnswer, setTriageAnswer] = useState<string | null>(null);

  const emergency = emergencies.find((e) => e.id === id);
  if (!emergency) return <div className="p-8 text-center">Emergency not found</div>;

  const Icon = emergency.icon;

  // Age selection screen
  if (!ageGroup) {
    return (
      <div className="flex min-h-screen flex-col bg-background px-5 pb-24 pt-6">
        <button onClick={() => navigate("/")} className="mb-6 flex items-center gap-2 text-muted-foreground">
          <ArrowLeft size={20} /> Back
        </button>
        <div className="flex flex-col items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-3xl" style={{ backgroundColor: emergency.bgColor }}>
            <Icon size={40} style={{ color: emergency.color }} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{emergency.title}</h1>
          <p className="text-center text-sm text-muted-foreground">Who needs help?</p>
        </div>
        <div className="mt-8 flex flex-col gap-4">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setAgeGroup("adult")}
            className="card-elevated flex items-center gap-4 p-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
              <User size={24} className="text-primary" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">Adult</p>
              <p className="text-xs text-muted-foreground">Age 12 and above</p>
            </div>
            <ChevronRight size={18} className="ml-auto text-muted-foreground" />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setAgeGroup("child")}
            className="card-elevated flex items-center gap-4 p-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/20">
              <Baby size={24} className="text-secondary" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">Child / Infant</p>
              <p className="text-xs text-muted-foreground">Under 12 years</p>
            </div>
            <ChevronRight size={18} className="ml-auto text-muted-foreground" />
          </motion.button>
        </div>
        <EmergencyCallBar />
      </div>
    );
  }

  // Kit selection
  if (hasKit === null && emergency.noKitAlternatives.length > 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background px-5 pb-24 pt-6">
        <button onClick={() => setAgeGroup(null)} className="mb-6 flex items-center gap-2 text-muted-foreground">
          <ArrowLeft size={20} /> Back
        </button>
        <h1 className="mb-2 text-xl font-bold text-foreground">{emergency.title}</h1>
        <p className="mb-8 text-sm text-muted-foreground">Do you have a first-aid kit available?</p>
        <div className="flex flex-col gap-4">
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setHasKit(true)} className="card-elevated flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-success/10">
              <Package size={24} className="text-success" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">Yes, I have a kit</p>
              <p className="text-xs text-muted-foreground">Standard first-aid supplies</p>
            </div>
          </motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => setHasKit(false)} className="card-elevated flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-warning/10">
              <PackageX size={24} className="text-warning" />
            </div>
            <div className="text-left">
              <p className="font-bold text-foreground">No kit available</p>
              <p className="text-xs text-muted-foreground">I'll use household items</p>
            </div>
          </motion.button>
        </div>
        <EmergencyCallBar />
      </div>
    );
  }

  const steps = emergency.steps;
  const step = steps[currentStep];

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/80 px-5 pb-3 pt-6 backdrop-blur-lg">
        <button
          onClick={() => {
            if (currentStep > 0) setCurrentStep(currentStep - 1);
            else setHasKit(null);
          }}
          className="mb-3 flex items-center gap-2 text-muted-foreground"
        >
          <ArrowLeft size={20} />
          {currentStep > 0 ? "Previous step" : "Back"}
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">{emergency.title}</h1>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
            {ageGroup === "child" ? "👶 Child" : "🧑 Adult"}
          </span>
        </div>
        {/* Progress */}
        <div className="mt-3 flex gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= currentStep ? "bg-primary" : "bg-muted"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 px-5 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold"
                style={{ backgroundColor: emergency.bgColor, color: emergency.color }}
              >
                {step.step}
              </div>
              <h2 className="text-xl font-bold text-foreground">{step.instruction}</h2>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>

            {/* Age-specific note */}
            {ageGroup === "child" && step.childNote && (
              <div className="mb-4 rounded-2xl bg-secondary/10 p-4">
                <p className="text-sm font-medium text-secondary">👶 For children: {step.childNote}</p>
              </div>
            )}
            {ageGroup === "adult" && step.adultNote && (
              <div className="mb-4 rounded-2xl bg-primary/10 p-4">
                <p className="text-sm font-medium text-primary">🧑 {step.adultNote}</p>
              </div>
            )}

            {/* No kit alternatives on first step */}
            {currentStep === 0 && hasKit === false && emergency.noKitAlternatives.length > 0 && (
              <div className="mt-4 rounded-2xl bg-warning/10 p-4">
                <p className="mb-3 text-xs font-bold text-warning">🏠 No Kit? Use these alternatives:</p>
                {emergency.noKitAlternatives.map((alt, i) => (
                  <div key={i} className="mb-2 flex items-start gap-2 text-sm">
                    <span className="text-muted-foreground line-through">{alt.standard}</span>
                    <span className="text-foreground">→ {alt.alternative}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Triage section on last step */}
        {currentStep === steps.length - 1 && emergency.triage.length > 0 && (
          <div className="mt-6">
            <h3 className="mb-3 text-sm font-bold text-foreground">🔍 Quick Assessment</h3>
            {emergency.triage.map((t, i) => (
              <div key={i} className="mb-3 rounded-2xl bg-card p-4 shadow-sm">
                <p className="mb-3 text-sm font-medium text-foreground">{t.question}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setTriageIndex(i); setTriageAnswer("yes"); }}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                      triageIndex === i && triageAnswer === "yes"
                        ? "bg-success text-success-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => { setTriageIndex(i); setTriageAnswer("no"); }}
                    className={`flex-1 rounded-xl px-3 py-2 text-xs font-bold transition-colors ${
                      triageIndex === i && triageAnswer === "no"
                        ? "bg-emergency text-emergency-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    No
                  </button>
                </div>
                {triageIndex === i && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-sm font-medium text-foreground"
                  >
                    → {triageAnswer === "yes" ? t.yesAction : t.noAction}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="fixed bottom-20 left-0 right-0 z-30 px-5">
        <div className="mx-auto flex max-w-md gap-3">
          {currentStep < steps.length - 1 ? (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setCurrentStep(currentStep + 1)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-bold text-primary-foreground shadow-glow"
            >
              Next Step <ChevronRight size={16} />
            </motion.button>
          ) : (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/")}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-success py-4 text-sm font-bold text-success-foreground"
            >
              <CheckCircle2 size={16} /> Done
            </motion.button>
          )}
        </div>
      </div>

      <EmergencyCallBar />
    </div>
  );
};

export default EmergencyDetailPage;
