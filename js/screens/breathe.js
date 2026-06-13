/* Breathe tab: support shortcuts and 4-7-8 animation. */

const PHASES = [
  { name: 'Inhale', secs: 4, scale: 1 },
  { name: 'Hold', secs: 7, scale: 1 },
  { name: 'Exhale', secs: 8, scale: 0.55 },
];

function breatheHTML() {
  return `
    <div class="breathe-screen">
      <div class="breathe-top">
        <div>
          <h1>Breathe</h1>
          <p>4-7-8 calming rhythm</p>
        </div>
        <button class="helpline-btn" data-action="helpline">
          <i data-lucide="phone-call"></i> ${HELPLINE.number}
        </button>
      </div>

      <div class="support-paths">
        <button data-action="helpline"><i data-lucide="siren"></i><span>I need help now</span></button>
        <button data-action="save-resource" data-resource="r2"><i data-lucide="users"></i><span>I'm worried about a friend</span></button>
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
        <div class="pattern">INHALE 4s - HOLD 7s - EXHALE 8s</div>
        <div class="cycles" id="cycleNote">Use this before your next move.</div>
      </div>
      <div class="breathe-cta">
        <button class="btn btn-primary" id="breatheBtn" data-action="toggle-breathe">
          <i data-lucide="wind"></i> Start breathing
        </button>
      </div>
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

  const p = PHASES[idx];
  phaseEl.textContent = p.name;
  if (cycleEl) cycleEl.textContent = `Cycle ${cycle} - stay with the rhythm`;

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
