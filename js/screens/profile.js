/* Profile screen: private progress, calendar, badges, and settings. */

function profileHTML() {
  const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    .map((d) => `<span class="cal-dow">${d}</span>`).join('');
  let cells = '<span></span>';
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

  const badges = PROGRESS_BADGES.map((b) => `
    <div class="badge ${b.locked ? 'locked' : ''}">
      <span class="badge-icon ${b.grad}"><i data-lucide="${b.icon}"></i></span>
      <span><b>${b.name}</b><small>${b.desc}</small></span>
    </div>`).join('');

  return `
    <div class="screen">
      <div class="profile-head">
        <div class="profile-ava">KA</div>
        <div>
          <h1>Kai - 17</h1>
          <p><i data-lucide="lock"></i> Private. No followers.</p>
        </div>
      </div>

      <div class="wrapped">
        <h3>${WRAPPED.title}</h3>
        <p>${WRAPPED.body}</p>
      </div>

      <div class="progress-card">
        <div class="progress-mark"><i data-lucide="shield-check"></i></div>
        <div>
          <div class="seal-lockup">
            <span>DDB</span><span>Region IV-A</span><span>IDADAIT 2026</span>
          </div>
          <h2>Golden Scales unlocked</h2>
          <p>${state.streak}-day streak.</p>
        </div>
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
        <div class="card-title">Progress</div>
        <div class="badge-row">${badges}</div>
      </div>

      <div class="privacy-controls">
        <button><i data-lucide="smartphone"></i> Local journal storage</button>
        <button><i data-lucide="trash-2"></i> Delete my data</button>
        <button><i data-lucide="languages"></i> English / Filipino</button>
      </div>
    </div>`;
}
