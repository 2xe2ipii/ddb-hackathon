# 📱 DDB Mobile App Challenge Prototype — IDADAIT 2026

<!-- Aligned with DDB Hackathon Judging Tracks and Expected Impact -->

A premium, interactive frontend prototype developed for the **Dangerous Drugs Board (DDB) Mobile App Challenge** in observance of the **2026 International Day Against Drug Abuse and Illicit Trafficking (IDADAIT)**.

This companion application acts as a government-ready youth prevention tool tailored for **Calabarzon / Region IV-A**. Designed with an **offline-first, non-punitive, and judgment-free** philosophy, the application aims to turn prevention from a one-time seminar into a daily private habit of education, self-care, and community support.

---

## 🚀 Getting Started

No build steps are required. To prevent browser CORS warnings when loading modular scripts, run the app using a local web server:

```powershell
# Run local server from the root directory
npx serve .
```

*Note: An active internet connection is recommended to pull assets and icons from CDNs (Google Fonts, Lucide Icons).*

---

## 🎯 Required App Tracks Alignment

This prototype fully covers the three core thematic tracks required by the **DDB Mobile App Challenge**:

### 🧠 TRACK 1: KNOWLEDGE (Interactive Prevention Education)
* **Myth vs. Fact Cards:** Flip interactive fact sheets correcting misconceptions about substance abuse.
* **Daily Quizzes:** Interactive multiple-choice quizzes designed to test and reinforce preventive knowledge with instant feedback.
* **Knowledge Achievements:** Unlocks special badges (e.g., *Myth Buster*, *Perfect Score*) to incentivize continuous learning.

### 🤝 TRACK 2: COMMUNITY SUPPORT (Directories & Registration)
* **Region IV-A Resources Directory:** Localized support groups, helpline cards, and counselor maps.
* **Event Registrations:** Tappable registration systems for local drug abuse prevention seminars, webinars, and youth assemblies.
* **Friend-in-Need Safeguard:** Direct action buttons allowing users to pin support resources for friends in distress.

### 🍃 TRACK 3: MENTAL HEALTH (Self-Assessment & Well-being)
* **Mood Tracker Weather:** A dynamic emotional check-in tool where users log their mood weather (e.g., Sunny, Rainy, Stormy).
* **PHQ-4 self-assessment:** A clean, guided 4-question mental health questionnaire.
* **4-7-8 Breathing Engine:** Dynamic, sensory pacing bubble using visual cues to support stress regulation.
* **Private Micro-Journaling:** Save a personal "1% daily reflection" card stored locally.

---

## 🌟 Target Audience & Design Philosophy

* **Target Users:** Designed for Filipinos aged **13 and above**, focusing heavily on late adolescence (**ages 15–19**), which accounts for **40% of reported first drug use** in DDB's 2024 statistical analyses.
* **"Kalma" Aesthetic Language:** Dark navy surfaces, calming teal accents, and muted gold highlights. Rejects aggressive or punitive warning red palettes (except the Flame of Clarity streak icon) to foster safety and comfort.
* **Empowering & Non-Punitive:** The app relies on constructive habit-building, self-reflection, and education rather than strict monitoring or social shaming.

---

## 📱 Interactive Prototype Features

* **Simulated OS Launcher & Framer:** Tapping the **DDB App Icon** inside a simulated smartphone home screen starts the prototype. Features seamless viewport scaling and frame switching among **iPhone, Pixel, and Galaxy** devices.
* **High-Fidelity Achievements & Nudge:** Includes 13 interactive badges checked in real-time against local state with staggered unlock toast notifications and an interactive progression nudge banner.
* **Tagalog Translation & Preferences:** Real-time Tagalog translation toggle alongside colorblind and text scaling controls for inclusive user flow adjustments.

---

## 📊 Expected Impact & Relevance to DDB Advocacy

* **Early Intervention:** Direct education correcting misconceptions about substance use reduces the probability of first-time drug use.
* **Filling the Professional Care Gap:** With only **1,821 mental health specialists in the Philippines (as of 2024)**, the app's PHQ-4 tools, breathing exercises, and helpline directories serve as immediate digital first-aid.
* **Eliminating Stigma through Absolute Privacy:** Since social stigma is a primary barrier to seeking help, the app is built without public followers or rankings. All user reflections and check-ins are stored 100% on-device in `localStorage`. Users can wipe their details instantly with a functional **"Delete All Data"** control.

---

## ⚖️ Judging Criteria Matrix Alignment

| Criterion | Score Allocation | How the Prototype Delivers |
|---|---|---|
| **User Experience (UX)** | **30%** | Features a Tagalog translation toggle, text scaling, clear navigation tabs, dynamic mood analytics, and a multi-device test frame. |
| **Visual Design** | **25%** | Premium "Kalma" dark mode theme, curated HSL color rules, light-theme fallback overrides, and subtle micro-animations. |
| **Innovation & Impact** | **25%** | Private zero-tracking architecture, offline-ready emergency counselor pins, interactive badges, and shareable wrapped summaries. |
| **Feasibility** | **20%** | Pure HTML/Vanilla CSS/JS, modular design pattern, zero heavy dependencies, and fully compatible with hybrid wrappers (Cordova/Capacitor). |

---

## 📁 Codebase Architecture

```text
ddb-hackathon/
│
├── index.html              # Shell container, simulated phone hardware, script loading order
│
├── styles/
│   ├── frame.css           # Hardware simulation, device selector, scaling styles
│   └── app.css             # Core DDB app layout, screen styling, typography & dark/light theme
│
└── js/
    ├── app.js              # Application routing, click routing, and lifecycle hooks
    ├── data.js             # Mock static content (Events, Resources, Myths, Quizzes)
    │
    ├── core/
    │   ├── device.js       # Logic for viewport scaling and mobile framing
    │   ├── state.js        # Global reactive state (saves/loads from localStorage)
    │   └── ui.js           # Launcher screen, layout, and real-time Tagalog translation engine
    │
    └── screens/
        ├── achievements.js # Pure badge unlock check logic and dynamic state triggers
        ├── community.js    # Region IV-A resource map, events registry, and SK/School loops
        ├── learn.js        # Fact sheets and gamified quizzes
        ├── profile.js      # Identity card, wrapped stats, mood heatmap, and preferences UI
        ├── relax.js        # Breathing engine, PHQ-4 screening, and emergency hotlines
        └── today.js        # Daily mood selection and check-in tasks
```
