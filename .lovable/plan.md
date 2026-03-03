

## UI Overhaul Plan — ResQudbuddy Style

Based on the 5 reference images, here is the redesign plan to match that neumorphic, clean, rounded UI with category-based navigation, combined triage screen, and a splash/welcome page.

---

### Key Design Changes

**From the images:**
1. **Splash/Welcome Page** — App logo, tagline "Life-saving guidance, anywhere, anytime", three feature badges (Offline Ready, Step-by-Step, One-Tap Call), and a "Get Started" CTA button.
2. **Emergency Guide Selection** — Categories displayed as large 2-column cards with emoji illustrations and colored borders (Trauma=blue, Environmental=green, Medical=blue, Poisoning=orange). Search bar at top. Red "EMERGENCY CALL" button.
3. **Combined Triage Screen** — Age selection (Adult/Child) and "No First-Aid Kit?" toggle on one screen (instead of separate screens). Voice Guide Mode toggle. Red "Call Emergency Services" button at bottom.
4. **Step-by-step Instructions** — Large card with illustration area, bold instruction text, Previous/Next buttons inside the card. "No Kit Mode" tip below in orange banner. Red "Call 911" bar at very bottom.
5. **Bottom Nav** — 5 tabs: Home, Triage/Guides, Guide, Map (placeholder), Profile/Settings. Dark background with active blue highlight.

---

### Implementation Plan

#### 1. Create Splash/Welcome Page (`src/pages/WelcomePage.tsx`)
- Centered layout with app logo (HeartPulse + cross icon composed via CSS/SVG)
- App name "ResQudbuddy" with tagline
- Three circular feature badges: Offline Ready, Step-by-Step, One-Tap Call
- Blue "Get Started" button navigating to home
- Use `localStorage` to skip on return visits

#### 2. Redesign Home/Index Page (`src/pages/Index.tsx`)
- Top search bar (rounded, full width, with search icon)
- Title: "Emergency Guide Selection" with subtitle "Offline-first first-aid assistance"
- **4 category cards** in 2x2 grid with emoji clusters and colored borders:
  - Trauma (blue border): Fractures, Bleeding
  - Environmental (green border): Snake Bite, Heatstroke, Drowning, Electric Shock
  - Medical (blue border): Heart Attack, Seizures, Choking
  - Poisoning (orange border): Burns (or add as separate)
- Each category card navigates to a category sub-page listing individual emergencies
- Red pill "EMERGENCY CALL" button above bottom nav

#### 3. Create Category Page (`src/pages/CategoryPage.tsx`)
- Lists individual emergencies within a category
- Each item is a card that navigates to the emergency detail

#### 4. Redesign Emergency Detail Triage (`src/pages/EmergencyDetail.tsx`)
- **Combine age + kit selection into one screen** (as shown in triage image)
- Top: back arrow + emergency title + progress indicator
- Voice Guide Mode toggle (UI only, placeholder)
- Large neumorphic card with "Is the victim an Adult or a Child?"
- Adult button with green border when selected, Child button in grey
- "No First-Aid Kit?" toggle switch below
- Red "Call Emergency Services" button at bottom
- On proceed → step-by-step view

#### 5. Redesign Step View (inside `EmergencyDetail.tsx`)
- Top: Emergency title + "Step X of Y" + progress bar
- Large white card containing:
  - Illustration area (placeholder icon/SVG)
  - Bold instruction text centered
  - Previous (grey) and Next (blue) pill buttons side by side
- Below card: orange "No Kit Mode" tip banner (if no-kit toggled)
- Bottom: Red "Call 911 (or local emergency number)" bar

#### 6. Update Bottom Nav (`src/components/BottomNav.tsx`)
- 5 tabs: Home, Guides, Map, Alerts/Notifications, Settings
- Dark background (#1F1F1F), rounded container
- Active tab: blue icon with highlight pill

#### 7. Update Emergency Call Bar (`src/components/EmergencyCallBar.tsx`)
- Full-width red pill button: "EMERGENCY CALL" with phone icon
- Positioned above bottom nav

#### 8. Update Color System (`src/index.css`)
- Refine neumorphic shadows: inner shadows on buttons for pressed state
- Category border colors: blue (#2563EB), green (#16A34A), orange (#EA580C), red (#DC2626)
- Keep existing soft background palette

#### 9. Update Routes (`src/App.tsx`)
- Add `/welcome` route for splash page
- Add `/category/:id` route for category drill-down
- Root `/` shows Index (home with categories)

---

### Files to Create
- `src/pages/WelcomePage.tsx`
- `src/pages/CategoryPage.tsx`

### Files to Modify
- `src/pages/Index.tsx` — Category grid redesign
- `src/pages/EmergencyDetail.tsx` — Combined triage + redesigned step view
- `src/components/BottomNav.tsx` — 5-tab dark nav
- `src/components/EmergencyCallBar.tsx` — Full-width red button style
- `src/components/EmergencyCard.tsx` — Update card style for category listing
- `src/data/emergencies.ts` — Add `category` field to each emergency
- `src/App.tsx` — New routes
- `src/index.css` — Neumorphic utility classes, category border colors

