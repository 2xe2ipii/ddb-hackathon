/* Profile screen: private progress, calendar, badges, and settings. */

function achievementsHTML() {
  const unlockedIds = getUnlockedIds(state);
  const total = ACHIEVEMENTS.length;
  const earned = unlockedIds.size;

  const cards = ACHIEVEMENTS.map((a) => {
    const unlocked = unlockedIds.has(a.id);
    const isOpen = state.profileBadgeOpen === a.id;
    return `
      <div class="badge ${unlocked ? '' : 'locked'} ${isOpen ? 'badge-open' : ''}" data-action="toggle-badge-hint" data-badge="${a.id}">
        <span class="badge-icon ${a.grad}">
          <i data-lucide="${unlocked ? a.icon : 'lock'}"></i>
        </span>
        <span>
          <b>${a.name}</b>
          <small>${unlocked ? a.desc : (isOpen ? getAchievementHint(a, state) : 'Locked - tap to see how')}</small>
        </span>
        ${unlocked ? '<i data-lucide="check" class="badge-earned-tick"></i>' : ''}
      </div>`;
  }).join('');

  return `
    <div class="card achievements-card">
      <div class="achievements-head">
        <span class="eyebrow"><i data-lucide="award"></i> Achievements</span>
        <span class="achv-count">${earned}/${total} unlocked</span>
      </div>
      <div class="card-title">Progress</div>
      <div class="badge-row">${cards}</div>
    </div>`;
}

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

  const unlockedIds = getUnlockedIds(state);

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
          <h2>${unlockedIds.size}/${ACHIEVEMENTS.length} badges earned</h2>
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

      ${achievementsHTML()}

      <div class="privacy-controls">
        <button><i data-lucide="smartphone"></i> Local journal storage</button>
        <button><i data-lucide="trash-2"></i> Delete my data</button>
        <button><i data-lucide="languages"></i> English / Filipino</button>
        <button data-action="toggle-theme"><i data-lucide="${state.theme === 'light' ? 'moon' : 'sun'}"></i> ${state.theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
      </div>
    </div>`;
}