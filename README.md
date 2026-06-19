# 📱 Kalma — DDB Mobile App Challenge Prototype

### IDADAIT 2026 | Dangerous Drugs Board of the Philippines

**Kalma** is a premium, interactive mobile app prototype developed for the **Dangerous Drugs Board (DDB) Mobile App Challenge** in observance of the **2026 International Day Against Drug Abuse and Illicit Trafficking (IDADAIT)**.

Designed as a government-ready youth prevention companion for **Calabarzon / Region IV-A**, Kalma operates on an **offline-first, non-punitive, and judgment-free** philosophy — turning drug abuse prevention from a one-time seminar into a daily, private habit of education, self-care, and community support.

---

## 🚀 Getting Started

No build steps required. To avoid browser CORS warnings when loading modular scripts, run the app using a local web server:

```powershell
npx serve .
```

> An active internet connection is recommended to load assets from CDNs (Google Fonts, Lucide Icons).

---

## 🎯 App Tracks

Kalma fully covers the three core thematic tracks of the DDB Mobile App Challenge:

### 🧠 Track 1 — Knowledge (Interactive Prevention Education)

- **Myth vs. Fact Cards** — Flip interactive fact sheets that correct common misconceptions about substance abuse.
- **Daily Quizzes** — Multiple-choice quizzes with instant feedback to reinforce preventive knowledge.
- **Unmask Drugs** — Interactive identification game where users learn to recognize dangerous subtances and its existence.
- **Knowledge Achievements** — Unlock special badges (e.g., _Myth Buster_, _Perfect Score_) to motivate continuous learning.

### 🤝 Track 2 — Community Support (Directories & Registration)

- **Region IV-A Resources Directory** — Localized support groups, helpline cards, and counselor maps.
- **Event Registration** — Tappable sign-ups for local drug abuse prevention seminars, webinars, and youth assemblies.
- **Friend-in-Need Safeguard** — Direct action buttons to pin support resources for friends in distress.

### 🍃 Track 3 — Mental Health (Self-Assessment & Well-being)

- **Mood Tracker** — A dynamic emotional check-in tool where users log their daily mood weather (Sunny, Rainy, Stormy, etc.).
- **PHQ-4 Self-Assessment** — A clean, guided 4-question mental health screening questionnaire.
- **4-7-8 Breathing Engine** — An animated, sensory pacing bubble using visual cues for stress regulation.
- **Private Micro-Journaling** — Save a personal daily reflection card stored 100% on-device.

---

## 🌟 Target Audience & Design Philosophy

- **Target Users:** Filipinos aged **13 and above**, with a focus on late adolescence (**ages 15–19**), which accounts for **40% of reported first drug use** per DDB's 2024 statistical analyses.
- **"Kalma" Aesthetic Language:** Dark navy surfaces, calming teal accents, and muted gold highlights — rejecting aggressive, punitive warning palettes to foster a sense of safety and comfort.
- **Empowering & Non-Punitive:** Built on constructive habit-building, self-reflection, and education — not monitoring or social shaming.

---

## 📊 Expected Impact

- **Early Intervention** — Correcting misconceptions about substance use reduces the likelihood of first-time drug use among youth.
- **Filling the Professional Care Gap** — With only **1,821 mental health specialists in the Philippines (as of 2024)**, Kalma's PHQ-4 tools, breathing exercises, and helpline directories serve as immediate digital first-aid.
- **Eliminating Stigma through Absolute Privacy** — No public followers, no rankings. All user data is stored **100% on-device** in `localStorage`. Users can wipe all personal data instantly via a built-in **"Delete All Data"** control.

---

## ✨ Key Features

- **Simulated OS Launcher & Device Framer** — Tap the DDB App Icon inside a simulated smartphone home screen to launch the prototype. Supports viewport scaling and frame-switching across **iPhone, Pixel, and Galaxy** devices.
- **13 Interactive Achievement Badges** — Real-time badge unlock checks against local state, with staggered toast notifications and a progression nudge banner.
- **Tagalog Language Toggle** — Real-time Tagalog translation throughout the app.
- **Accessibility Controls** — Colorblind mode and text scaling support for inclusive use.

---

## 📁 Project Structure

```
ddb-hackathon/
│
├── index.html              # Shell container, device frame, script loading
│
├── styles/
│   ├── frame.css           # Hardware simulation, device selector, scaling
│   └── app.css             # Core layout, screen styling, typography, dark/light theme
│
└── js/
    ├── app.js              # Application routing, click handling, lifecycle hooks
    ├── data.js             # Static content (Events, Resources, Myths, Quizzes)
    │
    ├── core/
    │   ├── device.js       # Viewport scaling and mobile framing
    │   ├── state.js        # Global reactive state (persisted via localStorage)
    │   └── ui.js           # Launcher screen, layout, and Tagalog translation engine
    │
    └── screens/
        ├── achievements.js # Badge unlock logic and state triggers
        ├── community.js    # Region IV-A resource map, events, and SK/school loops
        ├── learn.js        # Fact sheets and gamified quizzes
        ├── profile.js      # Identity card, wrapped stats, mood heatmap, preferences
        ├── relax.js        # Breathing engine, PHQ-4 screening, emergency hotlines
        └── today.js        # Daily mood selection and check-in tasks
```
