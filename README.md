# DDB - IDADAIT 2026 Mobile App Challenge Prototype

A high-fidelity, clickable frontend prototype for the **Dangerous Drugs Board (DDB) Mobile App Challenge**. The prototype now starts like a real phone: judges first see a simulated mobile home screen, then tap the official **DDB** app icon to open the experience.

The app concept is a government-ready youth prevention companion for **Calabarzon / Region IV-A**: private, non-punitive, and focused on daily prevention habits.

## Run It

No build step is required.

```powershell
npx serve .
```

Or open `index.html` directly in a browser.

Icons and fonts load from CDN (Lucide, Google Fonts), so an internet connection is needed for full fidelity.

## What's Inside

```text
dbb-hackathon/
|-- index.html          # desktop backdrop, phone frame, script loading order
|-- styles/
|   |-- frame.css       # simulated phone hardware and device selector
|   `-- app.css         # DDB app UI, launcher, screens, components
|-- js/
|   |-- data.js         # mock DDB content, events, resources, badges
|   |-- app.js          # render routing, delegated events, boot
|   |-- core/
|   |   |-- state.js    # shared state and DOM anchors
|   |   |-- device.js   # device-frame switching and fit logic
|   |   `-- ui.js       # launcher, header, nav, toast, helpline
|   `-- screens/
|       |-- today.js    # Today tab and daily check-in flow
|       |-- learn.js    # Learn tab
|       |-- breathe.js  # Breathe tab and breathing engine
|       |-- community.js# Support/Community tab
|       `-- profile.js  # Profile screen
`-- README.md
```

## Team Ownership

- **Today / daily check-in:** `js/screens/today.js`
- **Learn:** `js/screens/learn.js`
- **Breathe:** `js/screens/breathe.js`
- **Support / Community:** `js/screens/community.js`
- **Profile:** `js/screens/profile.js`
- **Shared data:** `js/data.js`
- **Shared app shell:** `js/core/*`
- **Routing/events only:** `js/app.js`

## Feature Map

| Area | What to try |
|---|---|
| **Phone launcher** | Start on the simulated phone home screen, then tap the **DDB** app icon. |
| **Today** | Follow one active mission step at a time: debunk one myth, check mood, save a private 1% reflection, then choose one support action. |
| **Learn** | Move through one learning card at a time: myth/fact first, then a short quiz. |
| **Breathe** | Run the 4-7-8 breathing mini-game, open the 1553 helpline sheet, or save a support path for a friend. |
| **Support** | Browse Region IV-A support resources, register for DDB/community events, and see the school/SK/barangay rollout loop plus admin/content model. |
| **Profile** | View progress, mood calendar, achievements, privacy controls, and monthly wrapped. |

## Product Thesis

**DDB turns prevention from a one-time seminar into a daily private habit: learn one truth, regulate one feeling, and connect to one safe support.**

## Design Notes

- **Tone:** private, supportive, youth-friendly, non-punitive.
- **Government-ready:** verified content labels, resource directory, one-way official announcements, admin-update model, privacy controls.
- **Privacy:** no followers, no public posting, no popularity counts.
- **Theme:** dark navy surfaces, calming teal and muted blue, no aggressive warning palette.
