import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    staleTime: Infinity,
  });
};

export const useEmergencies = () => {
  return useQuery({
    queryKey: ["emergencies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emergencies")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    staleTime: Infinity,
  });
};

export const useEmergenciesByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["emergencies", "category", categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("emergencies")
        .select("*")
        .eq("category_id", categoryId)
        .order("sort_order");
      if (error) throw error;
      return data;
    },
    staleTime: Infinity,
  });
};

export const useEmergencyDetail = (id: string | undefined) => {
  return useQuery({
    queryKey: ["emergency-detail", id],
    queryFn: async () => {
      if (!id) throw new Error("No ID");
      
      const [emergencyRes, stepsRes, alternativesRes, triageRes] = await Promise.all([
        supabase.from("emergencies").select("*").eq("id", id).single(),
        supabase.from("emergency_steps").select("*").eq("emergency_id", id).order("step_number"),
        supabase.from("no_kit_alternatives").select("*").eq("emergency_id", id).order("sort_order"),
        supabase.from("triage_questions").select("*").eq("emergency_id", id).order("sort_order"),
      ]);

      if (emergencyRes.error) throw emergencyRes.error;

      return {
        emergency: emergencyRes.data,
        steps: stepsRes.data ?? [],
        noKitAlternatives: alternativesRes.data ?? [],
        triage: triageRes.data ?? [],
      };
    },
    enabled: !!id,
    staleTime: Infinity,
  });
};
