/* =====================================================
   APP.JS — Kalma prototype shell
   Tabs: journal | breathe | community | profile
   ===================================================== */

const state = {
  tab: 'journal',
  todayMood: null,        // weather id picked today
  factHtml: null,         // fact shown after mood pick
  journalDone: false,
  streak: 7,
  registered: new Set(),
  breathing: false,
};

const app = document.getElementById('app');
const phone = document.getElementById('phone');
const phoneWrap = document.getElementById('phoneWrap');

let breatheTimer = null;
let countTimer = null;

/* ---------------- device frame switching ---------------- */

function setDevice(key) {
  const d = DEVICES[key];
  const root = document.documentElement.style;
  root.setProperty('--dev-w', d.w + 'px');
  root.setProperty('--dev-h', d.h + 'px');
  root.setProperty('--dev-radius', d.radius + 'px');
  root.setProperty('--status-h', d.statusH + 'px');
  phone.className = 'phone device-' + key;
  document.querySelectorAll('.dp-option').forEach((b) => {
    b.classList.toggle('active', b.dataset.device === key);
  });
  fitPhone(d);
}

function fitPhone(d) {
  d = d || DEVICES[document.querySelector('.dp-option.active').dataset.device];
  const scale = Math.min(1, (window.innerHeight - 56) / d.h, (window.innerWidth - 540) / d.w);
  phoneWrap.style.setProperty('--phone-scale', Math.max(scale, 0.45));
}

document.getElementById('devicePanel').addEventListener('click', (e) => {
  const btn = e.target.closest('.dp-option');
  if (btn) setDevice(btn.dataset.device);
});
window.addEventListener('resize', () => fitPhone());

/* ---------------- tiny helpers ---------------- */

function icons() {
  if (window.lucide) lucide.createIcons();
}

function toast(iconName, msg) {
  const zone = app.querySelector('.toast-zone');
  if (!zone) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<i data-lucide="${iconName}"></i><span>${msg}</span>`;
  zone.appendChild(t);
  icons();
  setTimeout(() => {
    t.classList.add('leaving');
    setTimeout(() => t.remove(), 320);
  }, 2600);
}

function openHelpline() {
  const veil = document.createElement('div');
  veil.className = 'modal-veil';
  veil.innerHTML = `
    <div class="modal-sheet">
      <div class="sheet-grab"></div>
      <h2><i data-lucide="phone-call"></i> You're not alone</h2>
      <p>${HELPLINE.note}</p>
      <div class="hotline-num">
        <div>
          <small>${HELPLINE.label}</small>
          <b>${HELPLINE.number}</b>
        </div>
        <i data-lucide="headphones" style="width:26px;height:26px;color:var(--blue)"></i>
      </div>
      <button class="btn btn-primary" data-action="call"><i data-lucide="phone"></i> Call ${HELPLINE.number} now</button>
      <button class="btn modal-close" data-action="close-modal">Not right now</button>
    </div>`;
  app.appendChild(veil);
  icons();
  veil.addEventListener('click', (e) => {
    if (e.target === veil || e.target.closest('[data-action="close-modal"]')) veil.remove();
    if (e.target.closest('[data-action="call"]')) {
      veil.remove();
      toast('phone', `Dialing ${HELPLINE.label} — ${HELPLINE.number}…`);
    }
  });
}

/* ---------------- screen templates ---------------- */

function headerHTML() {
  return `
    <div class="app-header">
      <div class="brand">
        <span class="brand-name">Kalma</span>
        <span class="brand-tag">Your private sanctuary · IDADAIT 2026</span>
      </div>
      <button class="avatar-btn" data-action="go-profile" aria-label="Open private profile">KA</button>
    </div>`;
}

function journalHTML() {
  const weatherRow = WEATHER.map(
    (w) => `
      <button class="weather-btn ${state.todayMood === w.id ? 'selected' : ''}" data-action="pick-mood" data-mood="${w.id}">
        <i data-lucide="${w.icon}"></i><span>${w.label}</span>
      </button>`
  ).join('');

  const factBlock = state.factHtml
    ? `<div class="fact-card">
         <span class="eyebrow"><i data-lucide="lightbulb"></i> Did you know?</span>
         <p>${state.factHtml}</p>
       </div>`
    : '';

  const reflectBlock = state.factHtml && !state.journalDone
    ? `<div class="card reflect">
         <span class="eyebrow"><i data-lucide="sparkles"></i> The 1% Reflection</span>
         <div class="card-title">What was your 1% positive moment today?</div>
         <p class="card-sub">Small counts. A good meal, a kind word, a deep breath.</p>
         <textarea id="reflectInput" placeholder="Today, one small good thing was…"></textarea>
         <button class="btn btn-primary" data-action="submit-journal"><i data-lucide="feather"></i> Log my 1%</button>
       </div>`
    : '';

  const doneBlock = state.journalDone
    ? `<div class="card done-card">
         <div class="done-ring"><i data-lucide="check"></i></div>
         <div class="card-title">Checked in. See you tomorrow 🌙</div>
         <p class="card-sub">Your entry is saved privately on this device. No likes, no followers, no judgment.</p>
       </div>`
    : '';

  return `
    <div class="screen">
      <div class="greeting">
        <h1>Magandang araw, Kai 👋</h1>
        <p>Wednesday · June 10, 2026 · Lipa City</p>
        <span class="streak-chip"><i data-lucide="flame"></i> Current streak: ${state.streak} days</span>
      </div>

      <div class="card">
        <span class="eyebrow"><i data-lucide="cloud-sun"></i> Daily check-in</span>
        <div class="card-title">What's your mental weather right now?</div>
        <p class="card-sub">No wrong answers — weather just passes through.</p>
        <div class="weather-row">${weatherRow}</div>
      </div>

      ${factBlock}
      ${reflectBlock}
      ${doneBlock}

      <p class="privacy-note"><i data-lucide="lock"></i> Everything here is private &amp; anonymous</p>
    </div>`;
}

function breatheHTML() {
  return `
    <div class="breathe-screen">
      <div class="breathe-top">
        <div>
          <h1>Breathe</h1>
          <p>4–7–8 calming rhythm</p>
        </div>
        <button class="helpline-btn" data-action="helpline">
          <i data-lucide="phone-call"></i> ${HELPLINE.number}
        </button>
      </div>

      <div class="orb-stage">
        <div class="orb-rings"></div>
        <div class="orb" id="orb">
          <div class="orb-label">
            <div class="orb-phase" id="orbPhase">Ready?</div>
            <div class="orb-count" id="orbCount">tap start below</div>
          </div>
        </div>
      </div>

      <div class="breathe-meta">
        <div class="pattern">INHALE 4s · HOLD 7s · EXHALE 8s</div>
        <div class="cycles" id="cycleNote">Used by therapists to lower stress in under a minute</div>
      </div>
      <div class="breathe-cta">
        <button class="btn btn-primary" id="breatheBtn" data-action="toggle-breathe">
          <i data-lucide="wind"></i> Start breathing
        </button>
      </div>
    </div>`;
}

function communityHTML() {
  const cards = EVENTS.map((ev) => {
    const isReg = state.registered.has(ev.id);
    return `
      <div class="card event-card">
        <div class="event-band ${ev.band}">
          <span class="event-icon"><i data-lucide="${ev.icon}"></i></span>
          <span class="event-kind">${ev.kind}</span>
        </div>
        <div class="event-body">
          <h3>${ev.title}</h3>
          <div class="event-meta">
            <span><i data-lucide="calendar"></i> ${ev.date}</span>
            <span><i data-lucide="clock"></i> ${ev.time}</span>
            <span><i data-lucide="map-pin"></i> ${ev.place}</span>
          </div>
          <div class="event-actions">
            <button class="btn ${isReg ? 'btn-registered' : 'btn-register'}" data-action="register" data-event="${ev.id}">
              ${isReg ? '<i data-lucide="check"></i> Registered' : '<i data-lucide="ticket"></i> Register'}
            </button>
            <button class="btn btn-ig" data-action="share-ig" data-event="${ev.id}">
              <i data-lucide="instagram"></i> IG Story
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="screen">
      <div class="greeting">
        <h1>Community</h1>
        <p>Real events. Real people. One-way feed — zero noise.</p>
      </div>
      <div class="region-banner">
        <i data-lucide="map-pin"></i> Showing events for Calabarzon · Region IV-A
      </div>
      ${cards}
      <p class="privacy-note"><i data-lucide="megaphone"></i> Curated by DDB &amp; local partners — not a social feed</p>
    </div>`;
}

function profileHTML() {
  /* June 2026 — June 1 falls on Monday; render Sun-first grid */
  const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    .map((d) => `<span class="cal-dow">${d}</span>`).join('');
  let cells = '<span></span>'; // single offset: Sun empty, Mon = 1
  for (let day = 1; day <= 30; day++) {
    const mood = day === 10 && state.todayMood
      ? WEATHER.find((w) => w.id === state.todayMood).value
      : MOOD_HISTORY[day];
    const cls = [
      'cal-day',
      mood ? 'm' + mood : '',
      day === 10 ? 'today' : '',
      day > 10 ? 'future' : '',
    ].join(' ');
    cells += `<span class="${cls}">${day}</span>`;
  }

  const badges = BADGES.map(
    (b) => `
      <div class="badge ${b.locked ? 'locked' : ''}">
        <span class="badge-icon ${b.grad}"><i data-lucide="${b.icon}"></i></span>
        <span><b>${b.name}</b><small>${b.desc}</small></span>
      </div>`
  ).join('');

  return `
    <div class="screen">
      <div class="profile-head">
        <div class="profile-ava">KA</div>
        <div>
          <h1>Kai · 17</h1>
          <p><i data-lucide="lock"></i> Private space — no followers, no counts</p>
        </div>
      </div>

      <div class="wrapped">
        <h3>${WRAPPED.title}</h3>
        <p>${WRAPPED.body}</p>
      </div>

      <div class="card">
        <span class="eyebrow"><i data-lucide="calendar-heart"></i> Mood calendar</span>
        <div class="card-title">June 2026</div>
        <div class="cal-grid">${dows}${cells}</div>
        <div class="cal-legend">
          stormy
          <i style="background:rgba(110,143,181,0.18)"></i>
          <i style="background:rgba(86,165,175,0.24)"></i>
          <i style="background:rgba(69,196,176,0.32)"></i>
          <i style="background:rgba(69,196,176,0.55)"></i>
          <i style="background:var(--teal)"></i>
          sunny
        </div>
      </div>

      <div class="card">
        <span class="eyebrow"><i data-lucide="award"></i> Achievements</span>
        <div class="card-title">Quiet wins</div>
        <div class="badge-row">${badges}</div>
      </div>
    </div>`;
}

function navHTML() {
  const tabs = [
    { id: 'journal', icon: 'notebook-pen', label: 'Journal' },
    { id: 'breathe', icon: 'wind', label: 'Breathe' },
    { id: 'community', icon: 'users', label: 'Community' },
  ];
  return `
    <nav class="bottom-nav">
      ${tabs.map((t) => `
        <button class="nav-btn ${state.tab === t.id ? 'active' : ''}" data-action="nav" data-tab="${t.id}">
          <i data-lucide="${t.icon}"></i><span>${t.label}</span>
        </button>`).join('')}
    </nav>`;
}

/* ---------------- breathing engine ---------------- */

const PHASES = [
  { name: 'Inhale', secs: 4, scale: 1 },
  { name: 'Hold', secs: 7, scale: 1 },
  { name: 'Exhale', secs: 8, scale: 0.55 },
];

function stopBreathing() {
  state.breathing = false;
  clearTimeout(breatheTimer);
  clearInterval(countTimer);
  breatheTimer = countTimer = null;
}

function runPhase(idx, cycle) {
  const orb = document.getElementById('orb');
  const phaseEl = document.getElementById('orbPhase');
  const countEl = document.getElementById('orbCount');
  const cycleEl = document.getElementById('cycleNote');
  if (!orb || !state.breathing) return;

  const p = PHASES[idx];
  phaseEl.textContent = p.name;
  if (cycleEl) cycleEl.textContent = `Cycle ${cycle} — you're doing great`;

  orb.style.transition = `transform ${p.secs}s cubic-bezier(0.45, 0, 0.3, 1)`;
  orb.style.transform = `scale(${p.scale})`;

  let remaining = p.secs;
  countEl.textContent = remaining + 's';
  clearInterval(countTimer);
  countTimer = setInterval(() => {
    remaining -= 1;
    if (remaining > 0) countEl.textContent = remaining + 's';
  }, 1000);

  breatheTimer = setTimeout(() => {
    const next = (idx + 1) % PHASES.length;
    runPhase(next, next === 0 ? cycle + 1 : cycle);
  }, p.secs * 1000);
}

function toggleBreathing() {
  const btn = document.getElementById('breatheBtn');
  const orb = document.getElementById('orb');
  if (state.breathing) {
    stopBreathing();
    btn.innerHTML = '<i data-lucide="wind"></i> Start breathing';
    document.getElementById('orbPhase').textContent = 'Paused';
    document.getElementById('orbCount').textContent = 'tap start to resume';
    orb.style.transition = 'transform 1.2s ease';
    orb.style.transform = 'scale(0.55)';
  } else {
    state.breathing = true;
    btn.innerHTML = '<i data-lucide="pause"></i> End session';
    runPhase(0, 1);
  }
  icons();
}

/* ---------------- render & events ---------------- */

function render() {
  stopBreathing();
  const screens = {
    journal: journalHTML,
    breathe: breatheHTML,
    community: communityHTML,
    profile: profileHTML,
  };
  app.innerHTML = headerHTML() + screens[state.tab]() + navHTML() + '<div class="toast-zone"></div>';
  icons();
}

app && app.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  switch (action) {
    case 'nav':
      state.tab = el.dataset.tab;
      render();
      break;

    case 'go-profile':
      state.tab = 'profile';
      render();
      break;

    case 'pick-mood': {
      state.todayMood = el.dataset.mood;
      const v = WEATHER.find((w) => w.id === state.todayMood).value;
      const pool = v <= 2 ? FACTS.low : v === 3 ? FACTS.mid : FACTS.high;
      state.factHtml = pool[Math.floor(Math.random() * pool.length)];
      state.journalDone = false;
      render();
      break;
    }

    case 'submit-journal': {
      const txt = document.getElementById('reflectInput').value.trim();
      if (!txt) {
        toast('feather', 'Even three words count — give it a try ✍️');
        return;
      }
      state.journalDone = true;
      state.streak += 1;
      render();
      setTimeout(() => toast('flame', `Current Streak: ${state.streak} days — keep glowing!`), 350);
      break;
    }

    case 'toggle-breathe':
      toggleBreathing();
      break;

    case 'helpline':
      openHelpline();
      break;

    case 'register': {
      const id = el.dataset.event;
      if (state.registered.has(id)) return;
      state.registered.add(id);
      render();
      setTimeout(() => toast('ticket', 'You’re in! Details sent to your inbox 💌'), 250);
      break;
    }

    case 'share-ig':
      toast('instagram', 'Story template ready — opening Instagram…');
      break;
  }
});

/* ---------------- boot ---------------- */

setDevice('iphone');
render();
