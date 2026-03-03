import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, Baby, ChevronLeft, ChevronRight, CheckCircle2, Phone, Volume2 } from "lucide-react";
import { emergencies } from "@/data/emergencies";
import { Switch } from "@/components/ui/switch";

type AgeGroup = "adult" | "child" | null;

const EmergencyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ageGroup, setAgeGroup] = useState<AgeGroup>(null);
  const [hasKit, setHasKit] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [triageStarted, setTriageStarted] = useState(false);
  const [voiceMode, setVoiceMode] = useState(false);

  const emergency = emergencies.find((e) => e.id === id);
  if (!emergency) return <div className="p-8 text-center text-muted-foreground">Emergency not found</div>;

  const Icon = emergency.icon;

  // Combined triage screen: age + kit + voice
  if (!ageGroup) {
    return (
      <div className="flex min-h-screen flex-col bg-background px-5 pb-28 pt-6">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <ArrowLeft size={18} /> Back
        </button>

        {/* Emergency header */}
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ backgroundColor: emergency.bgColor }}>
            <Icon size={28} style={{ color: emergency.color }} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{emergency.title}</h1>
            <p className="text-xs text-muted-foreground">{emergency.steps.length} steps · Quick Assessment</p>
          </div>
        </div>

        {/* Voice guide toggle */}
        <div className="mt-6 card-neumorphic flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Volume2 size={18} className="text-primary" />
            <div>
              <p className="text-sm font-bold text-foreground">Voice Guide Mode</p>
              <p className="text-[10px] text-muted-foreground">Read instructions aloud</p>
            </div>
          </div>
          <Switch checked={voiceMode} onCheckedChange={setVoiceMode} />
        </div>

        {/* Age selection */}
        <div className="mt-6">
          <p className="mb-3 text-sm font-bold text-foreground">Is the victim an Adult or a Child?</p>
          <div className="flex gap-3">
            <button
              onClick={() => setAgeGroup("adult")}
              className={`card-neumorphic flex flex-1 flex-col items-center gap-2 border-2 p-5 transition-colors ${
                ageGroup === "adult" ? "border-success" : "border-transparent"
              }`}
            >
              <User size={28} className="text-primary" />
              <span className="text-sm font-bold text-foreground">Adult</span>
              <span className="text-[10px] text-muted-foreground">12+ years</span>
            </button>
            <button
              onClick={() => setAgeGroup("child")}
              className={`card-neumorphic flex flex-1 flex-col items-center gap-2 border-2 p-5 transition-colors ${
                ageGroup === "child" ? "border-success" : "border-transparent"
              }`}
            >
              <Baby size={28} className="text-secondary" />
              <span className="text-sm font-bold text-foreground">Child</span>
              <span className="text-[10px] text-muted-foreground">Under 12</span>
            </button>
          </div>
        </div>

        {/* No kit toggle */}
        {emergency.noKitAlternatives.length > 0 && (
          <div className="mt-6 card-neumorphic flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-bold text-foreground">No First-Aid Kit?</p>
              <p className="text-[10px] text-muted-foreground">Show household alternatives</p>
            </div>
            <Switch checked={!hasKit} onCheckedChange={(v) => setHasKit(!v)} />
          </div>
        )}

        {/* Emergency call */}
        <a
          href="tel:108"
          className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-emergency py-4 text-sm font-bold text-emergency-foreground shadow-emergency transition-transform active:scale-[0.98]"
        >
          <Phone size={16} /> Call Emergency Services (108)
        </a>
      </div>
    );
  }

  const steps = emergency.steps;
  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-28">
      {/* Sticky header */}
      <div className="sticky top-0 z-30 bg-background/90 px-5 pb-3 pt-6 backdrop-blur-md">
        <button
          onClick={() => {
            if (currentStep > 0) setCurrentStep(currentStep - 1);
            else setAgeGroup(null);
          }}
          className="mb-3 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <ArrowLeft size={18} />
          {currentStep > 0 ? "Previous" : "Back"}
        </button>
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">{emergency.title}</h1>
          <span className="text-xs font-medium text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </span>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Step card */}
      <div className="flex-1 px-5 pt-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25 }}
          >
            <div className="card-neumorphic overflow-hidden">
              {/* Illustration area */}
              <div className="flex h-40 items-center justify-center rounded-t-2xl" style={{ backgroundColor: emergency.bgColor }}>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-card/60 backdrop-blur-sm">
                  <Icon size={40} style={{ color: emergency.color }} />
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="mb-1 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                    {step.step}
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">Step {step.step}</span>
                </div>
                <h2 className="mt-2 text-lg font-bold text-foreground">{step.instruction}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.detail}</p>

                {/* Age-specific note */}
                {ageGroup === "child" && step.childNote && (
                  <div className="mt-3 rounded-xl bg-secondary/10 p-3">
                    <p className="text-xs font-medium text-secondary">👶 For children: {step.childNote}</p>
                  </div>
                )}
                {ageGroup === "adult" && step.adultNote && (
                  <div className="mt-3 rounded-xl bg-primary/10 p-3">
                    <p className="text-xs font-medium text-primary">🧑 {step.adultNote}</p>
                  </div>
                )}

                {/* Navigation buttons inside card */}
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
                    disabled={currentStep === 0}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-muted py-3 text-sm font-bold text-muted-foreground disabled:opacity-40"
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-primary py-3 text-sm font-bold text-primary-foreground shadow-glow"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={() => navigate("/")}
                      className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-success py-3 text-sm font-bold text-success-foreground"
                    >
                      <CheckCircle2 size={16} /> Done
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* No kit banner */}
        {!hasKit && emergency.noKitAlternatives.length > 0 && currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-2xl bg-warning/10 p-4"
          >
            <p className="mb-2 text-xs font-bold text-warning">🏠 No Kit Mode — Use these alternatives:</p>
            {emergency.noKitAlternatives.map((alt, i) => (
              <div key={i} className="mb-1 flex items-center gap-2 text-xs">
                <span className="text-muted-foreground line-through">{alt.standard}</span>
                <span className="text-foreground">→ {alt.alternative}</span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Triage on last step */}
        {currentStep === steps.length - 1 && emergency.triage.length > 0 && (
          <TriageSection triage={emergency.triage} />
        )}
      </div>

      {/* Bottom call bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 safe-bottom">
        <div className="mx-auto max-w-md px-4 pb-3">
          <a
            href="tel:108"
            className="flex items-center justify-center gap-2 rounded-2xl bg-emergency py-3.5 text-sm font-bold text-emergency-foreground shadow-emergency transition-transform active:scale-[0.98]"
          >
            <Phone size={16} /> Call 108 / 112
          </a>
        </div>
      </div>
    </div>
  );
};

// Extracted triage component
const TriageSection = ({ triage }: { triage: { question: string; yesAction: string; noAction: string }[] }) => {
  const [triageIndex, setTriageIndex] = useState<number | null>(null);
  const [triageAnswer, setTriageAnswer] = useState<string | null>(null);

  return (
    <div className="mt-6">
      <h3 className="mb-3 text-sm font-bold text-foreground">🔍 Quick Assessment</h3>
      {triage.map((t, i) => (
        <div key={i} className="mb-3 card-soft p-4">
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
  );
};

export default EmergencyDetailPage;
