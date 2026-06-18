/* Today tab: interactive dashboard layout. */

function missionProgress() {
  let p = 0;
  if (state.todayMythId && state.mythAnswers[state.todayMythId] !== undefined) p++;
  if (state.todayMood !== null) p++;
  if (state.journalDone) p++;
  if (state.registered.size > 0 || state.savedSupport.size > 0) p++;
  return p;
}

function heroCardHTML() {
  const p = missionProgress();
  let icon = 'shield';
  let badgeName = 'Base Shield';
  let color = 'var(--teal)';
  
  if (state.streak >= 30) {
    icon = 'flame';
    badgeName = 'Flame of Clarity';
    color = 'var(--red)';
  } else if (state.streak >= 20) {
    icon = 'sword';
    badgeName = 'Sword of Truth';
    color = 'var(--blue)';
  } else if (state.streak >= 7) {
    icon = 'scale';
    badgeName = 'Golden Scales';
    color = 'var(--yellow)';
  } else if (state.streak >= 1) {
    icon = 'shield';
    badgeName = 'Base Shield';
    color = 'var(--teal)';
  } else {
    icon = 'lock';
    badgeName = 'Base Shield (Locked)';
    color = 'var(--muted)';
  }

  // Use dynamic profile name instead of hardcoded 'Kai' /* added for Profile module — see SRS.md §6.1 */
  const name = state.profileName || 'Kai';

  let miniImgHTML = '';
  if (state.streak >= 1) {
    let imgSrc = 'assets/streak_base_shield.png';
    if (state.streak >= 30) imgSrc = 'assets/streak_flame_of_clarity.png';
    else if (state.streak >= 20) imgSrc = 'assets/streak_sword_of_truth.png';
    else if (state.streak >= 7) imgSrc = 'assets/streak_golden_scales.png';
    
    miniImgHTML = `<img src="${imgSrc}" class="streak-badge-mini-img" alt="" />`;
  } else {
    miniImgHTML = `<i data-lucide="lock"></i>`;
  }

  return `
    <div class="hero-card">
      <div class="streak-badge" style="color: ${color}; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; font-weight: 700;">
        ${miniImgHTML}
        <span>${state.streak}-Day Streak: ${badgeName}</span>
      </div>

      <h1>Hi ${name}. Build one safer habit today.</h1>
      <div class="progress-strip">
        <span style="width:${p * 25}%"></span>
      </div>
      <small>${p}/4 today</small>
    </div>`;
}

function gentlePromptHTML() {
  if (state.todayMood !== 'stormy' && state.todayMood !== 'rainy') return '';
  return `
    <div class="card gentle-prompt">
      <div class="card-title"><i data-lucide="cloud-rain" style="vertical-align: middle; margin-right: 6px;"></i> Rough weather today?</div>
      <p class="card-sub">It's okay to feel overwhelmed. Would you like to try a 1-minute breathing exercise before journaling?</p>
      <div style="display: flex; gap: 8px; margin-top: 12px;">
        <button class="btn btn-primary" data-action="nav" data-tab="relax" style="flex: 1; padding: 10px; font-size: 0.9rem;">Breathe</button>
        <button class="btn btn-ghost" data-action="helpline" style="flex: 1; padding: 10px; font-size: 0.9rem;">Talk to someone</button>
      </div>
    </div>`;
}

function questGridHTML() {
  const p1 = state.todayMythId && state.mythAnswers[state.todayMythId] !== undefined;
  const p2 = state.todayMood !== null;
  const p3 = state.journalDone;
  const p4 = state.registered.size > 0 || state.savedSupport.size > 0;

  const cards = [
    { id: 'learn', icon: 'shield-question', label: '1 Truth', openLabel: p1 ? 'Cleared ✓' : 'Play now', done: p1 },
    { id: 'mood', icon: 'cloud-sun', label: 'Check-in', openLabel: p2 ? 'Logged ✓' : 'How are you?', done: p2 },
    { id: 'reflect', icon: 'feather', label: 'Reflect', openLabel: p3 ? 'Saved ✓' : 'Write your 1%', done: p3 },
    { id: 'support', icon: 'heart-handshake', label: 'Support', openLabel: p4 ? 'Done ✓' : 'Choose what fits', done: p4 }
  ];

  return `
    <div class="quest-grid">
      ${cards.map(c => `
        <div class="quest-card ${c.done ? 'done' : ''} ${state.expandedQuest === c.id ? 'active' : ''}" data-action="toggle-quest" data-quest="${c.id}">
          <i data-lucide="${c.icon}"></i>
          <div class="qc-label">${c.label}</div>
          <div class="qc-status">${c.openLabel}</div>
        </div>
      `).join('')}
    </div>`;
}

function expandedContentHTML() {
  if (!state.expandedQuest) return '';

  let content = '';
  if (state.expandedQuest === 'learn') {
    const todayMyth = MYTH_CARDS.find(m => m.id === state.todayMythId) || MYTH_CARDS[0];
    content = mythCardHTML(todayMyth, 'today');
  } else if (state.expandedQuest === 'mood') {
    content = `
      <div class="card active-step-card" style="margin-bottom: 16px;">
        <div class="card-title">What's your mental weather right now?</div>
        <p class="card-sub">Just name the weather.</p>
        <div class="weather-row">${weatherPickerHTML()}</div>
      </div>`;
  } else if (state.expandedQuest === 'reflect') {
    content = `
      <div class="card reflect active-step-card" style="margin-bottom: 16px;">
        <div class="card-title">What was your 1% positive moment today?</div>
        <p class="card-sub">One small good thing.</p>
        <textarea id="reflectInput" placeholder="Today, one small good thing was...">${state.reflection || ''}</textarea>
        <button class="btn btn-primary" data-action="submit-journal"><i data-lucide="feather"></i> Save privately</button>
      </div>`;
  } else if (state.expandedQuest === 'support') {
    content = `
      <div class="card active-step-card" style="margin-bottom: 16px;">
        <div class="card-title">Support</div>
        <p class="card-sub">Choose what fits right now.</p>
        <div class="step-actions">
          <button class="support-tile urgent" data-action="helpline">
            <i data-lucide="phone-call"></i>
            <span><b>Call 1553</b><small>For urgent support</small></span>
          </button>
          <button class="support-tile" data-action="save-resource" data-resource="r2">
            <i data-lucide="school"></i>
            <span><b>Save counselor contact</b><small>For later or for a friend</small></span>
          </button>
        </div>
      </div>`;
  }

  return `
    <div class="expanded-quest-container">
      ${content}
    </div>`;
}

function communityCardHTML() {
  if (!Array.isArray(UPCOMING_NEAR_YOU) || UPCOMING_NEAR_YOU.length === 0) return '';

  const flyers = UPCOMING_NEAR_YOU.map((u) => `
    <div class="flyer-card" data-action="nav" data-tab="community">
      <div class="flyer-image">
        <img src="${u.image}" alt="${u.title}" loading="lazy" />
        <span class="flyer-kind">${u.kind}</span>
      </div>
      <div class="flyer-body">
        <h4>${u.title}</h4>
        <div class="flyer-meta">
          <span><i data-lucide="calendar"></i> ${u.date}</span>
          <span><i data-lucide="map-pin"></i> ${u.place}</span>
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="upcoming-near-you" style="margin-top: 16px;">
      <div class="card-title" style="font-size: 0.9rem; color: var(--muted); margin-bottom: 10px; display:flex; align-items:center; justify-content:space-between;">
        <span><i data-lucide="map-pin" style="width:14px; height:14px; vertical-align: middle;"></i> Upcoming near you</span>
        <button class="link-btn" data-action="nav" data-tab="community" style="background:none; border:none; color:var(--teal); font-size: 0.8rem; font-weight: 800; cursor:pointer;">
          See all <i data-lucide="arrow-right" style="width:12px;height:12px;vertical-align:middle;"></i>
        </button>
      </div>
      <div class="flyer-scroll">
        ${flyers}
      </div>
    </div>`;
}

function allDoneHTML() {
  return `
    <div class="card done-card" style="margin-bottom: 16px;">
      <div class="done-ring"><i data-lucide="shield-check"></i></div>
      <div class="card-title">You're done for today.</div>
      <p class="card-sub">One truth. One check-in. One next step.</p>
    </div>`;
}

function mythCardHTML(card, location = 'learn') {
  const answered = state.mythAnswers[card.id] !== undefined;
  const correct = answered && state.mythAnswers[card.id] === card.answer;

  return `
    <div class="card myth-card" style="margin-bottom: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 20px; padding: 20px;">
      <div class="card-title" style="font-size: 1.1rem; line-height: 1.5; margin-bottom: 16px;">${card.statement}</div>
      <div class="myth-actions" style="display: flex; gap: 12px;">
        <button class="btn ${state.mythAnswers[card.id] === 'myth' ? 'btn-selected' : 'btn-ghost'}" data-action="answer-myth" data-id="${card.id}" data-answer="myth" style="flex: 1; padding: 12px; border-radius: 12px;">
          <i data-lucide="x"></i> Myth
        </button>
        <button class="btn ${state.mythAnswers[card.id] === 'fact' ? 'btn-selected' : 'btn-ghost'}" data-action="answer-myth" data-id="${card.id}" data-answer="fact" style="flex: 1; padding: 12px; border-radius: 12px;">
          <i data-lucide="check"></i> Fact
        </button>
      </div>
      ${answered ? `
        <div class="answer-panel ${correct ? 'right' : 'wrong'}" style="margin-top: 16px; padding: 16px; border-radius: 12px;">
          <strong>${correct ? 'Correct.' : 'Not quite.'}</strong>
          <p style="margin-top: 8px;">${correct ? card.explanationCorrect : card.explanationIncorrect}</p>
        </div>
        ${location === 'learn'
          ? `<p class="learn-next-note"><i data-lucide="arrow-down"></i> Scroll for more.</p>`
          : ''}` : ''}
    </div>`;
}

function weatherPickerHTML() {
  return WEATHER.map((w) => `
    <button class="weather-btn ${state.todayMood === w.id ? 'selected' : ''}" data-action="pick-mood" data-mood="${w.id}">
      <i data-lucide="${w.icon}"></i><span>${w.label}</span>
    </button>`).join('');
}

function todayHTML() {
  const p = missionProgress();
  const isDone = p === 4;

  return `
    <div class="screen">
      ${heroCardHTML()}
      ${gentlePromptHTML()}
      ${isDone ? allDoneHTML() : questGridHTML()}
      ${!isDone ? expandedContentHTML() : ''}
      ${communityCardHTML()}
    </div>`;
}
