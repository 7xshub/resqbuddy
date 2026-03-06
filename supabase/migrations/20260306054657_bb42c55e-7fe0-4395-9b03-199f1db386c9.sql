
-- Categories table
CREATE TABLE public.categories (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  emoji TEXT NOT NULL,
  border_class TEXT NOT NULL,
  bg_class TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (true);

-- Emergencies table
CREATE TABLE public.emergencies (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  color TEXT NOT NULL,
  bg_color TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('critical', 'high', 'moderate')),
  category_id TEXT NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.emergencies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Emergencies are publicly readable" ON public.emergencies FOR SELECT USING (true);

-- Emergency steps table
CREATE TABLE public.emergency_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emergency_id TEXT NOT NULL REFERENCES public.emergencies(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  instruction TEXT NOT NULL,
  detail TEXT NOT NULL,
  adult_note TEXT,
  child_note TEXT,
  UNIQUE (emergency_id, step_number)
);

ALTER TABLE public.emergency_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Steps are publicly readable" ON public.emergency_steps FOR SELECT USING (true);

-- No-kit alternatives table
CREATE TABLE public.no_kit_alternatives (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emergency_id TEXT NOT NULL REFERENCES public.emergencies(id) ON DELETE CASCADE,
  standard_item TEXT NOT NULL,
  alternative_item TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.no_kit_alternatives ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Alternatives are publicly readable" ON public.no_kit_alternatives FOR SELECT USING (true);

-- Triage questions table
CREATE TABLE public.triage_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  emergency_id TEXT NOT NULL REFERENCES public.emergencies(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  yes_action TEXT NOT NULL,
  no_action TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

ALTER TABLE public.triage_questions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Triage questions are publicly readable" ON public.triage_questions FOR SELECT USING (true);

-- Indexes
CREATE INDEX idx_emergencies_category ON public.emergencies(category_id);
CREATE INDEX idx_steps_emergency ON public.emergency_steps(emergency_id);
CREATE INDEX idx_alternatives_emergency ON public.no_kit_alternatives(emergency_id);
CREATE INDEX idx_triage_emergency ON public.triage_questions(emergency_id);
