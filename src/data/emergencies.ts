// Types kept for backward compatibility — data now lives in Supabase
export type EmergencyCategory = "trauma" | "environmental" | "medical" | "poisoning";

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

export interface CategoryInfo {
  id: EmergencyCategory;
  title: string;
  subtitle: string;
  emoji: string;
  borderClass: string;
  bgClass: string;
}

// These arrays are now empty — use useCategories/useEmergencies hooks instead
export const categories: CategoryInfo[] = [];
export const emergencies: never[] = [];
