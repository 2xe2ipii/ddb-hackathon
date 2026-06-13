/* Today tab: one active daily step at a time. */

function missionRailHTML() {
  const items = [
    { id: 'learn', done: state.mythAnswer !== null, label: 'Learn' },
    { id: 'mood', done: state.todayMood !== null, label: 'Check in' },
    { id: 'reflect', done: state.journalDone, label: 'Reflect' },
    { id: 'support', done: state.registered.size > 0 || state.savedSupport.size > 0, label: 'Support' },
  ];
  const active = items.find((item) => !item.done)?.id || 'done';

  return `
    <div class="mission-rail">
      ${items.map((item) => `
        <div class="mission-dot ${item.done ? 'done' : ''} ${active === item.id ? 'active' : ''}">
          <b>${items.indexOf(item) + 1}</b>
          <span>${item.label}</span>
        </div>`).join('')}
    </div>`;
}

function activeMissionHTML() {
  if (state.mythAnswer === null) {
    return mythCardHTML('today');
  }

  if (state.todayMood === null) {
    return `
      <div class="card active-step-card">
        <div class="card-title">What's your mental weather right now?</div>
        <p class="card-sub">Just name the weather.</p>
        <div class="weather-row">${weatherPickerHTML()}</div>
      </div>`;
  }

  if (!state.journalDone) {
    return `
      <div class="card reflect active-step-card">
        <div class="card-title">What was your 1% positive moment today?</div>
        <p class="card-sub">One small good thing.</p>
        <textarea id="reflectInput" placeholder="Today, one small good thing was..."></textarea>
        <button class="btn btn-primary" data-action="submit-journal"><i data-lucide="feather"></i> Save privately</button>
      </div>`;
  }

  if (state.registered.size === 0 && state.savedSupport.size === 0) {
    return `
      <div class="card active-step-card">
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
    <div class="card done-card">
      <div class="done-ring"><i data-lucide="shield-check"></i></div>
      <div class="card-title">You're done for today.</div>
      <p class="card-sub">One truth. One check-in. One next step.</p>
    </div>`;
}

function mythCardHTML(location) {
  const card = MYTH_CARDS[state.mythIndex];
  const answered = state.mythAnswer !== null;
  const correct = answered && state.mythAnswer === card.answer;

  return `
    <div class="card myth-card">
      <div class="card-title">${card.statement}</div>
      <div class="myth-actions">
        <button class="btn ${state.mythAnswer === 'myth' ? 'btn-selected' : 'btn-ghost'}" data-action="answer-myth" data-answer="myth">
          <i data-lucide="x"></i> Myth
        </button>
        <button class="btn ${state.mythAnswer === 'fact' ? 'btn-selected' : 'btn-ghost'}" data-action="answer-myth" data-answer="fact">
          <i data-lucide="check"></i> Fact
        </button>
      </div>
      ${answered ? `
        <div class="answer-panel ${correct ? 'right' : 'wrong'}">
          <strong>${correct ? 'Correct.' : 'Not quite.'}</strong>
          <p>${card.explanation}</p>
        </div>
        ${location === 'learn'
          ? `<button class="btn btn-primary wide-btn" data-action="learn-mode" data-mode="quiz"><i data-lucide="arrow-right"></i> Take quiz</button>`
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
  const progress = missionProgress();

  return `
    <div class="screen">
      <div class="hero-card">
        <div class="region-shape" aria-hidden="true"></div>
        <h1>Hi Kai. Build one safer habit today.</h1>
        <p>Learn. Check in. Take one next step.</p>
        <div class="progress-strip">
          <span style="width:${progress * 25}%"></span>
        </div>
        <small>${progress}/4 today</small>
      </div>

      ${missionRailHTML()}
      ${activeMissionHTML()}
    </div>`;
}
