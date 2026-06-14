/* Relax tab: PHQ-4 check-in, dynamic breathing exercises, and grounding toolkit. */

const RELAX_EXERCISES = {
  'box': {
    id: 'box',
    name: 'Box Breathing',
    tagline: '4-4-4-4 steady square',
    patternText: 'INHALE 4s - HOLD 4s - EXHALE 4s - HOLD 4s',
    phases: [
      { name: 'Inhale', secs: 4, scale: 1 },
      { name: 'Hold', secs: 4, scale: 1 },
      { name: 'Exhale', secs: 4, scale: 0.55 },
      { name: 'Hold', secs: 4, scale: 0.55 },
    ]
  },
  '478': {
    id: '478',
    name: '4-7-8 Calm Down',
    tagline: 'Long exhale to ease panic',
    patternText: 'INHALE 4s - HOLD 7s - EXHALE 8s',
    phases: [
      { name: 'Inhale', secs: 4, scale: 1 },
      { name: 'Hold', secs: 7, scale: 1 },
      { name: 'Exhale', secs: 8, scale: 0.55 },
    ]
  },
  'coherent': {
    id: 'coherent',
    name: 'Coherent Breathing',
    tagline: '5-5 balance and focus',
    patternText: 'INHALE 5s - EXHALE 5s',
    phases: [
      { name: 'Inhale', secs: 5, scale: 1 },
      { name: 'Exhale', secs: 5, scale: 0.55 },
    ]
  }
};

const PHQ4_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless"
];

function getRelaxScore() {
  let total = 0;
  for (let i = 0; i < 4; i++) {
    total += state.relaxCheckinAnswers[i] || 0;
  }
  return total;
}

function getRelaxBand(score) {
  if (score <= 2) return { label: 'Minimal', desc: 'Your responses suggest minimal distress right now.' };
  if (score <= 5) return { label: 'Mild', desc: 'Your responses suggest mild stress. A short reset can help.' };
  if (score <= 8) return { label: 'Moderate', desc: 'Your responses suggest moderate distress. Extra support may help.' };
  return { label: 'Severe', desc: 'Your responses suggest you have been carrying a lot. Talking to someone can really help.' };
}

function renderCheckinSection() {
  if (state.relaxCheckinState === 'not_started') {
    return `
      <div class="relax-card">
        <h3><i data-lucide="heart"></i> How have you been feeling?</h3>
        <p>A quick 4-question check-in (about 1 minute). Private and just for you.</p>
        <button class="btn btn-primary" data-action="start-checkin" style="margin-top: 12px;">Start check-in</button>
      </div>
    `;
  }

  if (state.relaxCheckinState === 'in_progress') {
    const qIndex = state.relaxCheckinIndex;
    const progressPercent = ((qIndex) / 4) * 100;
    
    return `
      <div class="relax-card relax-assessment">
        <div class="assessment-header">
          <button class="icon-btn" data-action="retake-checkin"><i data-lucide="x"></i></button>
          <div class="progress-bar"><div class="progress-fill" style="width: ${progressPercent}%"></div></div>
          <span class="step-count">${qIndex + 1}/4</span>
        </div>
        <div class="assessment-body">
          <p class="assessment-intro">Over the last 2 weeks, how often have you been bothered by:</p>
          <h3 class="assessment-question">${PHQ4_QUESTIONS[qIndex]}</h3>
          
          <div class="assessment-options">
            <button class="assessment-opt" data-action="answer-checkin" data-score="0">Not at all</button>
            <button class="assessment-opt" data-action="answer-checkin" data-score="1">Several days</button>
            <button class="assessment-opt" data-action="answer-checkin" data-score="2">More than half the days</button>
            <button class="assessment-opt" data-action="answer-checkin" data-score="3">Nearly every day</button>
          </div>
        </div>
        <div class="assessment-footer">
          <p><i data-lucide="lock"></i> Your answers stay private on this device.</p>
        </div>
      </div>
    `;
  }

  if (state.relaxCheckinState === 'completed') {
    const score = getRelaxScore();
    const band = getRelaxBand(score);
    const isHigh = score >= 6;
    
    return `
      <div class="relax-card result-card">
        <h3>✅ Check-in complete</h3>
        <div class="result-score">
          <span class="score-num">${score}/12</span>
          <span class="score-band band-${band.label.toLowerCase()}">${band.label}</span>
        </div>
        <p>${band.desc}</p>
        
        ${isHigh ? `
          <button class="btn btn-primary" data-action="helpline" style="margin-top: 12px; width: 100%;">
            <i data-lucide="phone"></i> Talk to someone - 1553
          </button>
        ` : `
          <p class="result-suggest">We've picked a breathing exercise that may help below.</p>
        `}
        <button class="btn" data-action="retake-checkin" style="margin-top: 12px; width: 100%;">Retake check-in</button>
      </div>
    `;
  }
}

function renderExercisePicker() {
  const currentEx = state.relaxSelectedExercise;
  
  let suggestedId = 'box';
  if (state.relaxCheckinState === 'completed') {
    const score = getRelaxScore();
    if (score <= 2) suggestedId = 'coherent';
    else if (score <= 8) suggestedId = 'box';
    else suggestedId = '478';
  }

  return `
    <div class="exercise-picker">
      ${Object.values(RELAX_EXERCISES).map(ex => `
        <button class="ex-chip ${currentEx === ex.id ? 'active' : ''}" data-action="select-exercise" data-exercise="${ex.id}">
          <strong>${ex.name}</strong>
          ${suggestedId === ex.id ? '<span class="suggested-badge">Suggested</span>' : ''}
        </button>
      `).join('')}
    </div>
  `;
}

function renderGroundingToolkit() {
  const tools = [
    {
      id: '54321',
      icon: 'eye',
      title: '5-4-3-2-1 Grounding',
      desc: 'Notice your surroundings to anchor back to the present.',
      content: `
        <ol>
          <li>Name 5 things you can see around you.</li>
          <li>Name 4 things you can touch or feel.</li>
          <li>Name 3 things you can hear right now.</li>
          <li>Name 2 things you can smell.</li>
          <li>Name 1 thing you can taste.</li>
        </ol>
      `
    },
    {
      id: 'bodyscan',
      icon: 'scan-body',
      title: 'Body Scan',
      desc: 'Slowly release tension from head to toe.',
      content: `
        <ul>
          <li>Relax your forehead, eyes, and jaw.</li>
          <li>Drop your shoulders away from your ears.</li>
          <li>Loosen your hands and arms.</li>
          <li>Soften your chest and stomach.</li>
          <li>Let your legs and feet feel heavy and supported.</li>
        </ul>
      `
    }
  ];

  return `
    <div class="grounding-toolkit">
      <div class="flashing-affirmation-container" style="margin-bottom: 24px; padding: 16px; background: var(--bg-card); border-radius: 12px; text-align: center; border: 1px solid var(--border-color); color: var(--text-main);">
         <div id="flashing-affirmation" style="font-size: 1.1em; font-weight: 500; min-height: 3em; display: flex; align-items: center; justify-content: center; transition: opacity 0.5s ease;">
           This feeling is temporary. It will pass.
         </div>
      </div>
      <h3 class="toolkit-title">Grounding toolkit</h3>
      <div class="toolkit-cards">
        ${tools.map(t => {
          const isOpen = state.relaxToolkitOpen === t.id;
          return `
            <div class="toolkit-card ${isOpen ? 'open' : ''}">
              <div class="toolkit-header" data-action="toggle-toolkit" data-id="${t.id}">
                <div class="tk-title-row">
                  <i data-lucide="${t.icon}"></i>
                  <strong>${t.title}</strong>
                </div>
                <i data-lucide="${isOpen ? 'chevron-up' : 'chevron-down'}"></i>
              </div>
              <p class="tk-desc">${t.desc}</p>
              ${isOpen ? `<div class="tk-content">${t.content}</div>` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

function relaxHTML() {
  const currentEx = RELAX_EXERCISES[state.relaxSelectedExercise];
  
  return `
    <div class="breathe-screen">
      <div class="breathe-top">
        <div>
          <h1>Relax</h1>
          <p>Check in, breathe, and ground yourself</p>
        </div>
        <button class="helpline-btn" data-action="helpline">
          <i data-lucide="phone-call"></i> ${HELPLINE.number}
        </button>
      </div>

      <div class="support-paths">
        <button data-action="helpline"><i data-lucide="siren"></i><span>I need help now</span></button>
        <button data-action="save-resource" data-resource="r2"><i data-lucide="users"></i><span>I'm worried about a friend</span></button>
      </div>

      ${renderCheckinSection()}

      ${renderExercisePicker()}

      <div class="orb-stage" style="margin-top: 24px;">
        <div class="orb-rings"></div>
        <div class="orb" id="orb">
          <div class="orb-label">
            <div class="orb-phase" id="orbPhase">Ready?</div>
            <div class="orb-count" id="orbCount">tap start below</div>
          </div>
        </div>
      </div>

      <div class="breathe-meta">
        <div class="pattern">${currentEx.patternText}</div>
        <div class="cycles" id="cycleNote">${currentEx.tagline}</div>
      </div>
      
      <div class="breathe-cta">
        <button class="btn btn-primary" id="breatheBtn" data-action="toggle-breathe">
          <i data-lucide="wind"></i> Start breathing
        </button>
      </div>

      ${renderGroundingToolkit()}
    </div>`;
}

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

  const currentEx = RELAX_EXERCISES[state.relaxSelectedExercise];
  const phases = currentEx.phases;
  const p = phases[idx];
  
  phaseEl.textContent = p.name;
  if (cycleEl) cycleEl.textContent = `Cycle ${cycle} - ${currentEx.tagline}`;

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
    const next = (idx + 1) % phases.length;
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
