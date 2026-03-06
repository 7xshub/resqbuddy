import {
  Bug, Flame, Bone, Thermometer, Wind, Droplets,
  Brain, Waves, Zap, HeartPulse
} from "lucide-react";
import { type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Bug,
  Flame,
  Bone,
  Thermometer,
  Wind,
  Droplets,
  Brain,
  Waves,
  Zap,
  HeartPulse,
};

export const getIcon = (name: string): LucideIcon => {
  return iconMap[name] || HeartPulse;
};
