import {
  Bug, Flame, Bone, Thermometer, Wind, Droplets,
  Brain, Waves, Zap, HeartPulse
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

export interface EmergencyStep {
  step: number;
  instruction: string;
  detail: string;
  adultNote?: string;
  childNote?: string;
}

export interface NoKitAlternative {
  standard: string;
  alternative: string;
}

export interface TriageQuestion {
  question: string;
  yesAction: string;
  noAction: string;
}

export type EmergencyCategory = "trauma" | "environmental" | "medical" | "poisoning";

export interface EmergencyData {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  severity: "critical" | "high" | "moderate";
  category: EmergencyCategory;
  steps: EmergencyStep[];
  noKitAlternatives: NoKitAlternative[];
  triage: TriageQuestion[];
}

export interface CategoryInfo {
  id: EmergencyCategory;
  title: string;
  subtitle: string;
  emoji: string;
  borderClass: string;
  bgClass: string;
}

export const categories: CategoryInfo[] = [
  { id: "trauma", title: "Trauma", subtitle: "Fractures, Bleeding", emoji: "🩹🦴💉", borderClass: "category-border-trauma", bgClass: "category-bg-trauma" },
  { id: "environmental", title: "Environmental", subtitle: "Snake Bite, Heatstroke, Drowning", emoji: "🐍☀️🌊⚡", borderClass: "category-border-environmental", bgClass: "category-bg-environmental" },
  { id: "medical", title: "Medical", subtitle: "Heart Attack, Seizures, Choking", emoji: "❤️🧠💨", borderClass: "category-border-medical", bgClass: "category-bg-medical" },
  { id: "poisoning", title: "Poisoning & Burns", subtitle: "Burns, Chemical exposure", emoji: "🔥🧪☠️", borderClass: "category-border-poisoning", bgClass: "category-bg-poisoning" },
];

export const emergencies: EmergencyData[] = [
  {
    id: "snake-bite",
    title: "Snake Bite",
    icon: Bug,
    color: "hsl(152, 55%, 50%)",
    bgColor: "hsl(152, 55%, 92%)",
    severity: "critical",
    category: "environmental",
    steps: [
      { step: 1, instruction: "Keep calm & still", detail: "Do NOT run. Movement spreads venom faster.", adultNote: "Sit or lie down immediately.", childNote: "Hold child still, comfort them." },
      { step: 2, instruction: "Remove jewelry", detail: "Remove rings, bracelets near the bite before swelling starts." },
      { step: 3, instruction: "Immobilize the limb", detail: "Keep bitten area below heart level. Do NOT elevate." },
      { step: 4, instruction: "Mark the time", detail: "Note the time of bite. Circle swelling edge with pen if available." },
      { step: 5, instruction: "Do NOT cut or suck", detail: "Never cut the wound or try to suck out venom. No tourniquets." },
      { step: 6, instruction: "Get to hospital ASAP", detail: "Anti-venom is the only effective treatment. Call 108 immediately." },
    ],
    noKitAlternatives: [
      { standard: "Bandage", alternative: "Clean cloth strip or dupatta" },
      { standard: "Splint", alternative: "Straight stick or rolled newspaper" },
      { standard: "Marker/Pen", alternative: "Any pen to mark swelling" },
    ],
    triage: [
      { question: "Is the person breathing normally?", yesAction: "Keep them calm and still. Proceed with first aid.", noAction: "Start rescue breathing. Call 108 immediately." },
      { question: "Is there severe swelling spreading rapidly?", yesAction: "Rush to hospital. This may be a venomous bite.", noAction: "Still go to hospital but less urgent." },
    ],
  },
  {
    id: "burns",
    title: "Burns",
    icon: Flame,
    color: "hsl(24, 95%, 58%)",
    bgColor: "hsl(24, 95%, 92%)",
    severity: "high",
    category: "poisoning",
    steps: [
      { step: 1, instruction: "Cool with water", detail: "Run cool (not ice cold) water over burn for 10-20 minutes.", childNote: "Use lukewarm water for children to avoid shock." },
      { step: 2, instruction: "Remove clothing", detail: "Gently remove clothing near burn unless stuck to skin." },
      { step: 3, instruction: "Cover loosely", detail: "Use clean, non-stick covering. Do NOT use cotton wool." },
      { step: 4, instruction: "Do NOT apply", detail: "No toothpaste, butter, ice, or oil. These trap heat." },
      { step: 5, instruction: "Watch for shock", detail: "If burn is large, watch for pale skin, rapid pulse, confusion." },
    ],
    noKitAlternatives: [
      { standard: "Sterile dressing", alternative: "Clean cotton cloth or clean plastic wrap" },
      { standard: "Burn gel", alternative: "Aloe vera leaf (natural)" },
    ],
    triage: [
      { question: "Is the burn larger than the person's palm?", yesAction: "This is a serious burn. Call 108.", noAction: "Treat at home with cool water and clean covering." },
      { question: "Is the skin white, brown, or charred?", yesAction: "Third-degree burn. Do NOT apply water. Rush to hospital.", noAction: "Continue cooling with water." },
    ],
  },
  {
    id: "fractures",
    title: "Fractures",
    icon: Bone,
    color: "hsl(210, 30%, 45%)",
    bgColor: "hsl(210, 30%, 92%)",
    severity: "high",
    category: "trauma",
    steps: [
      { step: 1, instruction: "Don't move the area", detail: "Keep the injured limb completely still." },
      { step: 2, instruction: "Support the injury", detail: "Use padding around the area for support." },
      { step: 3, instruction: "Immobilize with splint", detail: "Splint should extend beyond joints above and below fracture." },
      { step: 4, instruction: "Apply ice pack", detail: "Wrap ice in cloth, apply for 20 minutes. Reduces swelling." },
      { step: 5, instruction: "Seek medical help", detail: "All suspected fractures need X-ray confirmation." },
    ],
    noKitAlternatives: [
      { standard: "Splint", alternative: "Rolled newspaper, cardboard, or straight stick" },
      { standard: "Bandage", alternative: "Torn cloth strips, dupatta, or belt" },
      { standard: "Ice pack", alternative: "Bag of frozen vegetables in cloth" },
    ],
    triage: [
      { question: "Is bone visible through skin?", yesAction: "Open fracture! Cover with clean cloth. Call 108 immediately.", noAction: "Immobilize and get to hospital." },
    ],
  },
  {
    id: "heatstroke",
    title: "Heatstroke",
    icon: Thermometer,
    color: "hsl(0, 72%, 60%)",
    bgColor: "hsl(0, 72%, 93%)",
    severity: "critical",
    category: "environmental",
    steps: [
      { step: 1, instruction: "Move to shade", detail: "Get person out of sun immediately into coolest area available." },
      { step: 2, instruction: "Cool rapidly", detail: "Pour cool water over body. Fan the person continuously." },
      { step: 3, instruction: "Remove excess clothing", detail: "Loosen or remove heavy clothing." },
      { step: 4, instruction: "Apply cold packs", detail: "Place on neck, armpits, and groin for fastest cooling." },
      { step: 5, instruction: "Give small sips", detail: "Only if conscious. Cool water with salt if available.", childNote: "Small frequent sips for children." },
      { step: 6, instruction: "Call emergency", detail: "Heatstroke can be fatal. Call 108 if no improvement in 10 min." },
    ],
    noKitAlternatives: [
      { standard: "Cold packs", alternative: "Wet cloth or water bottles" },
      { standard: "ORS packets", alternative: "Water + pinch of salt + sugar" },
    ],
    triage: [
      { question: "Is the person conscious?", yesAction: "Give cool water sips. Continue cooling.", noAction: "Place in recovery position. Call 108 NOW." },
    ],
  },
  {
    id: "choking",
    title: "Choking",
    icon: Wind,
    color: "hsl(280, 50%, 55%)",
    bgColor: "hsl(280, 50%, 93%)",
    severity: "critical",
    category: "medical",
    steps: [
      { step: 1, instruction: "Ask: Can you cough?", detail: "If they can cough forcefully, encourage them to keep coughing." },
      { step: 2, instruction: "Give 5 back blows", detail: "Lean person forward. Hit firmly between shoulder blades.", adultNote: "Use heel of hand, firm blows.", childNote: "For infant: lay face down on forearm, support head." },
      { step: 3, instruction: "Give 5 abdominal thrusts", detail: "Stand behind, fist above navel, pull sharply inward and upward.", adultNote: "Standard Heimlich maneuver.", childNote: "For infant: 2 fingers on breastbone, gentle chest thrusts." },
      { step: 4, instruction: "Repeat cycle", detail: "Alternate 5 back blows and 5 thrusts until object comes out." },
      { step: 5, instruction: "If unconscious", detail: "Begin CPR. Call 108 immediately." },
    ],
    noKitAlternatives: [],
    triage: [
      { question: "Can the person speak or cry?", yesAction: "Mild blockage. Encourage coughing. Monitor closely.", noAction: "Severe blockage. Start back blows immediately." },
    ],
  },
  {
    id: "bleeding",
    title: "Bleeding",
    icon: Droplets,
    color: "hsl(0, 80%, 50%)",
    bgColor: "hsl(0, 80%, 93%)",
    severity: "high",
    category: "trauma",
    steps: [
      { step: 1, instruction: "Apply direct pressure", detail: "Press firmly with clean cloth on wound. Do NOT remove." },
      { step: 2, instruction: "Elevate the area", detail: "Raise injured area above heart level if possible." },
      { step: 3, instruction: "Add more cloth", detail: "If blood soaks through, add more cloth on top. Don't remove first one." },
      { step: 4, instruction: "Apply pressure point", detail: "Press artery against bone between wound and heart." },
      { step: 5, instruction: "Keep person warm", detail: "Cover with blanket. Watch for signs of shock." },
    ],
    noKitAlternatives: [
      { standard: "Gauze", alternative: "Clean cloth, towel, or clean clothing" },
      { standard: "Bandage", alternative: "Torn cloth strips or dupatta" },
    ],
    triage: [
      { question: "Is blood spurting or pulsing?", yesAction: "Arterial bleeding! Apply maximum pressure. Call 108.", noAction: "Apply steady pressure. Monitor for 10 minutes." },
    ],
  },
  {
    id: "seizures",
    title: "Seizures",
    icon: Brain,
    color: "hsl(45, 90%, 55%)",
    bgColor: "hsl(45, 90%, 92%)",
    severity: "high",
    category: "medical",
    steps: [
      { step: 1, instruction: "Clear the area", detail: "Move furniture and sharp objects away from person." },
      { step: 2, instruction: "Protect the head", detail: "Place something soft under head. Cushion it.", childNote: "Hold infant gently, protect head." },
      { step: 3, instruction: "Do NOT restrain", detail: "Never hold person down or put anything in mouth." },
      { step: 4, instruction: "Time the seizure", detail: "If longer than 5 minutes, call 108 immediately." },
      { step: 5, instruction: "Recovery position", detail: "After seizure stops, turn on side. Stay with them." },
    ],
    noKitAlternatives: [
      { standard: "Cushion", alternative: "Folded clothing or towel under head" },
    ],
    triage: [
      { question: "Has the seizure lasted more than 5 minutes?", yesAction: "Call 108 immediately. This is an emergency.", noAction: "Monitor and comfort. Most seizures stop on their own." },
    ],
  },
  {
    id: "drowning",
    title: "Drowning",
    icon: Waves,
    color: "hsl(200, 70%, 50%)",
    bgColor: "hsl(200, 70%, 92%)",
    severity: "critical",
    category: "environmental",
    steps: [
      { step: 1, instruction: "Get person out", detail: "Remove from water. Use a rope or branch if possible—don't jump in unless trained." },
      { step: 2, instruction: "Check breathing", detail: "Look, listen, feel for breathing for 10 seconds." },
      { step: 3, instruction: "Start rescue breaths", detail: "Give 5 initial rescue breaths if not breathing.", childNote: "Gentle puffs for children/infants." },
      { step: 4, instruction: "Begin CPR", detail: "30 chest compressions, 2 breaths. Repeat.", adultNote: "Push hard 5-6cm deep.", childNote: "Use 2 fingers for infants." },
      { step: 5, instruction: "Recovery position", detail: "If breathing resumes, turn on side. Keep warm." },
      { step: 6, instruction: "Call 108", detail: "Even if person recovers, they need hospital evaluation." },
    ],
    noKitAlternatives: [
      { standard: "Rescue equipment", alternative: "Rope, long stick, plastic bottle as float" },
      { standard: "Blanket", alternative: "Dry clothing to keep warm" },
    ],
    triage: [
      { question: "Is the person breathing?", yesAction: "Recovery position. Keep warm. Call 108.", noAction: "Start CPR immediately. Call 108." },
    ],
  },
  {
    id: "electric-shock",
    title: "Electric Shock",
    icon: Zap,
    color: "hsl(55, 85%, 50%)",
    bgColor: "hsl(55, 85%, 92%)",
    severity: "critical",
    category: "environmental",
    steps: [
      { step: 1, instruction: "Cut the power", detail: "Turn off power source. Do NOT touch person if still connected." },
      { step: 2, instruction: "Use non-conductor", detail: "If can't cut power, use dry wood or rubber to separate person from source." },
      { step: 3, instruction: "Check breathing", detail: "Once safe, check for breathing and pulse." },
      { step: 4, instruction: "Start CPR if needed", detail: "If no breathing/pulse, begin CPR immediately." },
      { step: 5, instruction: "Treat burns", detail: "Electric shock often causes burns at entry/exit points." },
      { step: 6, instruction: "Call 108", detail: "All electric shock victims need hospital evaluation." },
    ],
    noKitAlternatives: [
      { standard: "Insulated gloves", alternative: "Dry wooden stick, rubber chappal, plastic chair" },
    ],
    triage: [
      { question: "Is the person still in contact with power source?", yesAction: "Do NOT touch them! Cut power first or use non-conductor.", noAction: "Check breathing and begin first aid." },
    ],
  },
  {
    id: "heart-attack",
    title: "Heart Attack",
    icon: HeartPulse,
    color: "hsl(350, 75%, 55%)",
    bgColor: "hsl(350, 75%, 92%)",
    severity: "critical",
    category: "medical",
    steps: [
      { step: 1, instruction: "Call 108 immediately", detail: "Time is critical. Call emergency services first." },
      { step: 2, instruction: "Sit person down", detail: "Help them sit in comfortable position, knees bent." },
      { step: 3, instruction: "Give Aspirin", detail: "If available and not allergic, give 1 adult aspirin (300mg) to chew." },
      { step: 4, instruction: "Loosen clothing", detail: "Loosen tight clothing around chest and neck." },
      { step: 5, instruction: "Monitor breathing", detail: "If person becomes unconscious and stops breathing, start CPR.", adultNote: "30 compressions, 2 breaths. Push 5-6cm deep.", childNote: "Rare in children. Use child CPR ratios." },
      { step: 6, instruction: "Stay with them", detail: "Keep person calm and still until help arrives." },
    ],
    noKitAlternatives: [
      { standard: "Aspirin", alternative: "Disprin or any soluble aspirin from nearby shop" },
    ],
    triage: [
      { question: "Is the person conscious?", yesAction: "Sit them down, give aspirin, call 108.", noAction: "Check breathing. Start CPR if not breathing. Call 108." },
    ],
  },
];
