/* Shared UI helpers and app chrome. */

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

function missionProgress() {
  const points = [
    state.mythAnswer !== null,
    state.todayMood !== null,
    state.journalDone,
    state.registered.size > 0 || state.savedSupport.size > 0,
  ];
  return points.filter(Boolean).length;
}

function openHelpline() {
  const veil = document.createElement('div');
  veil.className = 'modal-veil';
  veil.innerHTML = `
    <div class="modal-sheet">
      <div class="sheet-grab"></div>
      <h2><i data-lucide="phone-call"></i> Need support?</h2>
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
      toast('phone', `Opening ${HELPLINE.label} - ${HELPLINE.number}`);
    }
  });
}

function launcherHTML() {
  return `
    <div class="phone-home">
      <div class="home-date">
        <span>Wednesday</span>
        <strong>June 10</strong>
      </div>
      <div class="home-widget">
        <span class="eyebrow"><i data-lucide="map-pin"></i> Calabarzon</span>
        <h2>IDADAIT 2026</h2>
        <p>Tap DDB to start.</p>
      </div>
      <div class="app-grid">
        <button class="home-app muted-app" aria-label="Messages">
          <span><i data-lucide="message-circle"></i></span><b>Messages</b>
        </button>
        <button class="home-app muted-app" aria-label="Calendar">
          <span><i data-lucide="calendar-days"></i></span><b>Calendar</b>
        </button>
        <button class="home-app ddb-app-icon" data-action="launch-app" aria-label="Open DDB app">
          <span><i data-lucide="shield-check"></i></span><b>DDB</b>
        </button>
        <button class="home-app muted-app" aria-label="Camera">
          <span><i data-lucide="camera"></i></span><b>Camera</b>
        </button>
      </div>
      <div class="launcher-dock">
        <span><i data-lucide="phone"></i></span>
        <span><i data-lucide="compass"></i></span>
        <span><i data-lucide="music"></i></span>
        <span><i data-lucide="settings"></i></span>
      </div>
      <div class="toast-zone"></div>
    </div>`;
}

function headerHTML() {
  return `
    <div class="app-header">
      <div class="brand">
        <span class="brand-name">DDB</span>
        <span class="brand-tag">Region IV-A</span>
      </div>
      <div class="header-actions">
        <button class="avatar-btn" data-action="go-profile" aria-label="Open private profile">KA</button>
      </div>
    </div>`;
}

function navHTML() {
  const tabs = [
    { id: 'today', icon: 'sparkles', label: 'Today' },
    { id: 'learn', icon: 'book-open-check', label: 'Learn' },
    { id: 'breathe', icon: 'wind', label: 'Breathe' },
    { id: 'community', icon: 'users', label: 'Support' },
  ];
  return `
    <nav class="bottom-nav four-nav">
      ${tabs.map((t) => `
        <button class="nav-btn ${state.tab === t.id ? 'active' : ''}" data-action="nav" data-tab="${t.id}">
          <i data-lucide="${t.icon}"></i><span>${t.label}</span>
        </button>`).join('')}
    </nav>`;
}
