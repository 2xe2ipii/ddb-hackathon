# Kalma — DDB Mobile App Challenge Prototype

A high-fidelity, clickable frontend prototype for the **Dangerous Drugs Board (DDB) Mobile App Challenge**, themed for the **IDADAIT 2026** campaign. Kalma is a private, zero-judgment digital sanctuary for Filipino youth in **Calabarzon / Region IV-A** — empathetic, never punitive.

## Run it

No build step, no dependencies to install. Either:

```powershell
# Option A — any static server
npx serve .

# Option B — just open the file
start index.html
```

> Icons and fonts load from CDN (Lucide, Google Fonts), so an internet connection is needed for full fidelity.

## What's inside

```
dbb-hackathon/
├── index.html          # shell: backdrop, device frame, selector panel
├── styles/
│   ├── frame.css       # desktop backdrop + simulated phone hardware
│   └── app.css         # "Kalma" design system + all screens
├── js/
│   ├── data.js         # mock data (events, facts, badges, devices)
│   └── app.js          # state, routing, screens, breathing engine
└── README.md
```

## Feature map

| Area | What to try |
|---|---|
| **Device frame** | Floating panel (right) switches between iPhone 14 Pro Max (default, with Dynamic Island), Pixel 7, and Galaxy S23 — dimensions, radius, and cutout animate. |
| **Journal** (home) | Pick your "mental weather" → a contextual *Did you know?* fact appears → log your **1% Reflection** → streak toast fires. |
| **Breathe** | Animated 4–7–8 orb (Inhale 4s · Hold 7s · Exhale 8s) with live countdown and cycle counter. **Helpline button (1553)** top-right opens a bottom-sheet with one-tap call. |
| **Community** | One-way announcement feed for Region IV-A: Digital Wellness Summit, Lipa City Peer Support Open House, IDADAIT Barangay Caravan. Register + mock **Share to IG Story**. |
| **Profile** (avatar, top-right) | Privacy-first dashboard: June mood heatmap (today's check-in updates it live), abstract achievement badges, and a "Monthly Wrapped" banner. No follower counts — by design. |

## Design notes

- **Theme:** dark-mode default; deep navy (`#0b1220`) surfaces with calming teal (`#45c4b0`) and muted blue (`#6e8fb5`) — no aggressive reds/yellows.
- **Typography:** Nunito (rounded, friendly), heavy whitespace, pill buttons, abstract geometric accents.
- **Icons:** Lucide (open source) — no AI-generated imagery.
- **Helpline:** Region IV-A Crisis Line **1553**, surfaced prominently on the Breathe screen.
