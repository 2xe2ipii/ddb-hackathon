/* Profile screen: private progress, calendar, badges, and settings. */

function getMoodInsight(s) {
  const hasCheckin = s.relaxCheckinState === 'completed';
  const isCalmToday = s.todayMood === 'sunny' || s.todayMood === 'breezy';
  
  if (hasCheckin && isCalmToday) {
    return "You tend to feel calmer on days you do a Relax check-in.";
  } else if (hasCheckin) {
    return "Completing a Relax check-in is helping you process emotions today.";
  } else if (s.streak >= 7) {
    return `Your ${s.streak}-day streak shows great dedication to your mental well-being.`;
  } else if (s.todayMood) {
    const label = s.todayMood === 'sunny' || s.todayMood === 'breezy' ? 'calm' : 'thoughtful';
    return `You felt ${label} today. Reflecting in your journal can help capture this feeling.`;
  } else {
    return "Consistency is key. Try doing a Relax check-in to see how it affects your day.";
  }
}

function achievementsHTML() {
  const unlockedIds = getUnlockedIds(state);
  const total = ACHIEVEMENTS.length;
  const earned = unlockedIds.size;

  const nudge = getNextBadgeNudge(state);
  const nudgeHTML = nudge ? `
    <div class="achv-nudge">
      <i data-lucide="sparkles"></i>
      <span>Next Badge: <strong>${nudge.badge.name}</strong> (${nudge.text})</span>
    </div>` : '';

  const visibleList = state.achievementsExpanded ? ACHIEVEMENTS : ACHIEVEMENTS.slice(0, 4);

  const cards = visibleList.map((a) => {
    const unlocked = unlockedIds.has(a.id);
    return `
      <div class="badge ${unlocked ? '' : 'locked'}">
        <span class="badge-icon ${a.grad}">
          <i data-lucide="${a.icon}"></i>
        </span>
        <span>
          <b>${a.name}</b>
          <small>${unlocked ? a.desc : getAchievementHint(a, state)}</small>
        </span>
        ${unlocked ? '<i data-lucide="check" class="badge-earned-tick"></i>' : ''}
      </div>`;
  }).join('');

  const buttonHTML = `
    <button class="btn-show-more" data-action="toggle-achievements-expand">
      ${state.achievementsExpanded ? 'Show less <i data-lucide="chevron-up"></i>' : `Show all (${total - 4} more) <i data-lucide="chevron-down"></i>`}
    </button>`;

  return `
    <div class="card achievements-card">
      <div class="achievements-head">
        <span class="eyebrow"><i data-lucide="award"></i> Achievements</span>
        <span class="achv-count">${earned}/${total} unlocked</span>
      </div>
      ${nudgeHTML}
      <div class="card-title" style="margin-top: 14px;">Progress</div>
      <div class="badge-row">${cards}</div>
      ${buttonHTML}
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
  const moodInsight = getMoodInsight(state);

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
        <div class="wrapped-insight">${moodInsight}</div>
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
        <button class="btn-disabled" disabled><i data-lucide="smartphone"></i> Local journal storage (Saved)</button>
        <button data-action="delete-data"><i data-lucide="trash-2"></i> Delete my data</button>
        <button class="btn-disabled" disabled><i data-lucide="languages"></i> English / Filipino (Coming soon)</button>
        <button data-action="toggle-theme"><i data-lucide="${state.theme === 'light' ? 'moon' : 'sun'}"></i> ${state.theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
      </div>
    </div>`;
}