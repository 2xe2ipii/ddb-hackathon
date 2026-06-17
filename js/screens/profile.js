/* Profile screen: private progress, calendar, badges, and settings. */

function getAnimClass(delay) {
  // Only animate sections on first entry to the profile tab.
  // If .profile-hero already exists, we're re-rendering within the same tab
  // (button click, filter, etc.) — skip animation to avoid jarring flash.
  const isFirstEntry = !document.querySelector('.profile-hero');
  return isFirstEntry ? `profile-animate" style="--delay: ${delay}` : `profile-no-anim`;
}

/* --- Wrapped: live computed stats from state --- */
function getWrappedStats(s) {
  const quizCount = Object.keys(s.quizAnswers || {}).length;
  const mythCount = Object.keys(s.mythAnswers || {}).length;
  const eventCount = s.registered ? s.registered.size : 0;
  const resourceCount = s.savedSupport ? s.savedSupport.size : 0;
  const hasCheckin = s.relaxCheckinState === 'completed';

  const parts = [];
  if (mythCount > 0) parts.push(`<strong>${mythCount}</strong> myth${mythCount !== 1 ? 's' : ''} cleared`);
  if (quizCount > 0) parts.push(`<strong>${quizCount}</strong> quiz question${quizCount !== 1 ? 's' : ''} answered`);
  if (eventCount > 0) parts.push(`<strong>${eventCount}</strong> event${eventCount !== 1 ? 's' : ''} joined`);
  if (resourceCount > 0) parts.push(`<strong>${resourceCount}</strong> support resource${resourceCount !== 1 ? 's' : ''} saved`);
  if (hasCheckin) parts.push(`<strong>1</strong> self check-in done`);

  if (parts.length === 0) return 'Start your first activity to see your monthly recap here.';
  if (parts.length === 1) return parts[0] + ' this month.';
  const last = parts.pop();
  return parts.join(', ') + ', and ' + last + ' this month.';
}

function getMoodInsight(s) {
  const hasCheckin = s.relaxCheckinState === 'completed';
  const isCalmToday = s.todayMood === 'sunny' || s.todayMood === 'breezy';
  const quizCount = Object.keys(s.quizAnswers || {}).length;
  const mythCount = Object.keys(s.mythAnswers || {}).length;

  if (s.streak >= 20) {
    return `${s.streak} days and counting — you've built something real. Keep showing up.`;
  } else if (hasCheckin && isCalmToday) {
    return 'Completing today\'s self check-in and feeling calmer today is a pattern worth noticing. Keep building self-awareness.';
  } else if (hasCheckin) {
    return 'Completing today\'s self check-in is a quiet act of self-care. It matters more than you think.';
  } else if (quizCount >= 5 && mythCount >= 5) {
    return 'You cleared the myths and the quiz. That knowledge stays with you — and it protects others too.';
  } else if (s.streak >= 7) {
    return `${s.streak} days in a row. That kind of consistency is rare and worth protecting.`;
  } else if (s.todayMood === 'stormy' || s.todayMood === 'rainy') {
    return 'Hard days are part of it. You still showed up today — that counts.';
  } else if (s.todayMood) {
    const label = isCalmToday ? 'bright' : 'steady';
    return `Today feels ${label}. Logging it here is a small act of self-awareness.`;
  } else {
    return 'Consistency is the foundation. Try a Relax check-in to see how it shapes your day.';
  }
}

/* --- Achievement category filter chips --- */
function categoryChipsHTML(s) {
  const filter = s.achievementCategoryFilter || null;
  const cats = [
    { id: null,        label: 'All',        icon: 'layers' },
    { id: 'streak',    label: 'Streak',     icon: 'flame' },
    { id: 'learn',     label: 'Learn',      icon: 'book-open-check' },
    { id: 'mental',    label: 'Mind',       icon: 'heart-pulse' },
    { id: 'community', label: 'Community',  icon: 'users' },
  ];
  return `<div class="achv-filter-chips">
    ${cats.map(c => `
      <button class="achv-chip ${filter === c.id ? 'active' : ''}" data-action="filter-achievement-category" data-cat="${c.id === null ? 'all' : c.id}">
        <i data-lucide="${c.icon}"></i>${c.label}
      </button>`).join('')}
  </div>`;
}

/* --- Achievements card with progress bars --- */
function achievementsHTML(unlockedIds) {
  const total = ACHIEVEMENTS.length;
  const earned = unlockedIds.size;

  const nudge = getNextBadgeNudge(state);
  const categoryTabs = {
    streak: 'today',
    learn: 'learn',
    mental: 'relax',
    community: 'community'
  };
  const targetTab = nudge ? (categoryTabs[nudge.badge.category] || 'today') : 'today';

  const nudgeHTML = nudge ? `
    <div class="achv-nudge" data-action="nav" data-tab="${targetTab}" title="Go to ${targetTab} tab to work on this badge">
      <i data-lucide="sparkles"></i>
      <span style="flex: 1;">Next: <strong>${nudge.badge.name}</strong> — ${nudge.text}</span>
      <i data-lucide="chevron-right" style="width: 14px; height: 14px; opacity: 0.7; flex-shrink: 0;"></i>
    </div>` : '';

  const filter = state.achievementCategoryFilter || null;
  const filtered = filter ? ACHIEVEMENTS.filter(a => a.category === filter) : ACHIEVEMENTS;
  const visibleList = state.achievementsExpanded ? filtered : filtered.slice(0, 4);

  const cards = visibleList.map((a) => {
    const unlocked = unlockedIds.has(a.id);
    let progressBarHTML = '';
    if (!unlocked && typeof a.progress === 'function') {
      const prog = a.progress(state);
      if (prog && prog.target > 0) {
        const pct = Math.min(100, Math.round((prog.current / prog.target) * 100));
        progressBarHTML = `
          <div class="badge-prog-track">
            <div class="badge-prog-fill" style="width: ${pct}%"></div>
          </div>`;
      }
    }
    return `
      <div class="badge ${unlocked ? 'badge-earned' : 'locked'}">
        <span class="badge-icon ${a.grad}">
          <i data-lucide="${a.icon}"></i>
        </span>
        <span class="badge-text-col">
          <b>${a.name}</b>
          <small>${unlocked ? a.desc : getAchievementHint(a, state)}</small>
          ${progressBarHTML}
        </span>
        ${unlocked ? '<span class="badge-check-dot"><i data-lucide="check"></i></span>' : ''}
      </div>`;
  }).join('');

  const showMoreNeeded = filtered.length > 4;
  const buttonHTML = showMoreNeeded ? `
    <button class="btn-show-more" data-action="toggle-achievements-expand">
      ${state.achievementsExpanded ? 'Show less <i data-lucide="chevron-up"></i>' : `Show all (${filtered.length - 4} more) <i data-lucide="chevron-down"></i>`}
    </button>` : '';

  return `
    <div class="card achievements-card ${getAnimClass('0.25s')}">
      <div class="achievements-head">
        <span class="eyebrow"><i data-lucide="award"></i> Achievements</span>
        <span class="achv-count">${earned}/${total} unlocked</span>
      </div>
      ${nudgeHTML}
      ${categoryChipsHTML(state)}
      <div class="badge-row">${cards}</div>
      ${buttonHTML}
    </div>`;
}

/* --- Avatar file-select handler (called inline via onchange) --- */
function handleAvatarFileSelect(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        canvas.width = 128;
        canvas.height = 128;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 128, 128);
        const previewUrl = canvas.toDataURL('image/jpeg', 0.85);
        const preview = document.getElementById('editAvatarPreview');
        if (preview) {
          preview.style.backgroundImage = `url(${previewUrl})`;
          preview.style.backgroundSize = 'cover';
          preview.style.backgroundPosition = 'center';
          preview.style.color = 'transparent';
          preview.textContent = '';
        }
        window.tempProfilePic = previewUrl;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

/* --- Main profile screen render --- */
function profileHTML() {
  const anim = getAnimClass;
  const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    .map((d) => `<span class="cal-dow">${d}</span>`).join('');

  // Dynamic calendar setup
  const todayDate = new Date();
  const todayDay = todayDate.getDate();
  const currentMonth = todayDate.getMonth();
  const currentYear = todayDate.getFullYear();
  const monthName = todayDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  // Number of days in the current month
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Day of the week for the 1st of the month
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun, 1 = Mon...

  // Deterministic mock mood values (1 to 5) for past days
  const getMockMoodForDay = (day) => {
    const moods = [3, 4, 2, 4, 5, 4, 3, 5, 4, 5, 3, 4, 4, 3, 5, 4, 2, 4, 5, 4, 3, 5, 4, 5, 3, 4, 4, 3, 5, 4];
    return moods[(day - 1) % moods.length];
  };

  const todayWeather = state.todayMood ? WEATHER.find((w) => w.id === state.todayMood) : null;
  let cells = '';
  // Add blank spacer cells for offset
  for (let i = 0; i < firstDayIndex; i++) {
    cells += '<span></span>';
  }

  for (let day = 1; day <= totalDays; day++) {
    const isToday = day === todayDay;
    const isFuture = day > todayDay;

    let moodVal = null;
    if (isToday) {
      moodVal = state.todayMood ? WEATHER.find((w) => w.id === state.todayMood).value : null;
    } else if (!isFuture) {
      moodVal = getMockMoodForDay(day);
    }

    let isMatch = true;
    let isDimmed = false;
    if (state.selectedMoodFilter !== null) {
      if (moodVal !== Number(state.selectedMoodFilter)) {
        isMatch = false;
        isDimmed = true;
      }
    }

    const cls = [
      'cal-day',
      moodVal ? 'm' + moodVal : '',
      isToday ? 'today' : '',
      isFuture ? 'future' : '',
      isDimmed ? 'dimmed' : '',
      (state.selectedMoodFilter !== null && isMatch && moodVal) ? 'highlighted' : '',
    ].join(' ').trim();

    // Show weather emoji inside the "today" cell if mood was logged
    const todayLabel = isToday && todayWeather ? `<span class="cal-today-emoji">${day}</span>` : day;
    cells += `<span class="${cls}">${todayLabel}</span>`;
  }

  const unlockedIds = getUnlockedIds(state);
  const moodInsight = getMoodInsight(state);

  // Avatar
  const initials = (state.profileName || 'Kai').substring(0, 2).toUpperCase();
  const avatarStyle = state.profilePic
    ? `background-image: url(${state.profilePic}); background-size: cover; background-position: center; color: transparent;`
    : '';
  const avatarContent = state.profilePic ? '' : initials;

  // Streak chip
  const streakChip = `<span class="profile-streak-chip"><i data-lucide="flame"></i>${state.streak}d</span>`;
  const badgeChip = `<span class="profile-badge-chip"><i data-lucide="award"></i>${unlockedIds.size}/${ACHIEVEMENTS.length}</span>`;

  // Live Wrapped stats
  const wrappedStats = getWrappedStats(state);

  // --- Modals ---
  let editModalHTML = '';
  if (state.profileEditing) {
    editModalHTML = `
      <div class="share-modal-overlay">
        <div class="share-modal-content edit-profile-content">
          <div class="share-modal-header">
            <span><i data-lucide="user"></i> Edit Profile</span>
          </div>
          <div class="edit-avatar-section">
            <div class="edit-avatar-preview" id="editAvatarPreview" style="${avatarStyle}">
              ${avatarContent}
            </div>
            <button class="btn btn-ghost btn-share-story" onclick="document.getElementById('avatarFileInput').click()">
              <i data-lucide="camera" style="width: 14px; height: 14px; margin-right: 4px;"></i> Upload Photo
            </button>
            <input type="file" id="avatarFileInput" accept="image/*" style="display: none;" onchange="handleAvatarFileSelect(this)">
          </div>
          <div class="edit-profile-form">
            <label class="form-label">Display Name</label>
            <input type="text" id="editNameInput" class="form-input" value="${state.profileName || 'Kai'}" placeholder="Enter name">
            <label class="form-label" style="margin-top:12px;">Age</label>
            <input type="number" id="editAgeInput" class="form-input" value="${state.profileAge || 17}" min="1" max="120">
          </div>
          <div class="edit-profile-actions">
            <button class="btn btn-ghost" data-action="close-edit-profile">Cancel</button>
            <button class="btn btn-primary" data-action="save-edit-profile">Save Changes</button>
          </div>
        </div>
      </div>`;
  }

  let shareModalHTML = '';
  if (state.shareModalOpen) {
    const earnedCount = unlockedIds.size;
    const totalBadges = ACHIEVEMENTS.length;
    const registeredCount = state.registered ? state.registered.size : 0;
    const quizCount = Object.keys(state.quizAnswers || {}).length;
    shareModalHTML = `
      <div class="share-modal-overlay" data-action="close-share-overlay">
        <div class="share-modal-content">
          <div class="share-modal-header">
            <span><i data-lucide="sparkles"></i> Monthly Impact Card</span>
            <button class="btn-close-share" data-action="close-share-impact">&times;</button>
          </div>
          <div class="story-preview-wrapper">
            <div class="story-card" id="storyCard">
              <div class="story-bg-circles">
                <div class="sc-1"></div>
                <div class="sc-2"></div>
              </div>
              <div class="story-header">
                <span class="story-logo">KALMA</span>
                <span class="story-subtitle">DDB CHALLENGE PROTOTYPE</span>
              </div>
              <div class="story-user">
                <div class="story-avatar" style="${avatarStyle}">${avatarContent}</div>
                <div>
                  <h3>${state.profileName || 'Kai'}, ${state.profileAge || 17}</h3>
                  <p><i data-lucide="map-pin"></i> Region IV-A</p>
                </div>
              </div>
              <div class="story-stats-grid">
                <div class="story-stat-box">
                  <span class="ss-val">${state.streak}</span>
                  <span class="ss-label">Day Streak</span>
                </div>
                <div class="story-stat-box">
                  <span class="ss-val">${earnedCount}/${totalBadges}</span>
                  <span class="ss-label">Badges Earned</span>
                </div>
                <div class="story-stat-box">
                  <span class="ss-val">${quizCount}</span>
                  <span class="ss-label">Quizzes Done</span>
                </div>
                <div class="story-stat-box">
                  <span class="ss-val">${registeredCount}</span>
                  <span class="ss-label">Events Joined</span>
                </div>
              </div>
              <div class="story-quote">
                "Taking care of my mind, one day at a time."
              </div>
              <div class="story-footer">
                <p><i data-lucide="lock"></i> Private &amp; Safe. No judgement.</p>
                <small>IDADAIT 2026 Mobile Challenge</small>
              </div>
            </div>
          </div>
          <!-- Buttons pinned at bottom, never overflow-hidden -->
          <div class="share-actions-row share-actions-pinned">
            <button class="btn btn-primary btn-save-story" data-action="save-story-image">
               <i data-lucide="download"></i> Save Image
            </button>
            <button class="btn btn-ghost btn-share-story" data-action="share-story-instagram">
              <i data-lucide="instagram"></i> Share to Stories
            </button>
          </div>
        </div>
      </div>`;
  }

  const isModalActive = state.shareModalOpen || state.profileEditing;

  return `
    <div class="screen ${isModalActive ? 'modal-open' : ''}">

      <!-- ── Profile Hero ── -->
      <div class="profile-hero ${anim('0s')}">
        <div class="profile-hero-bg"></div>
        <div class="profile-hero-inner">
          <div class="profile-ava" style="${avatarStyle}">${avatarContent}</div>
          <div class="profile-info-block">
            <div class="profile-name-row">
              <h1>${state.profileName || 'Kai'}</h1>
              <button class="btn-icon-edit" data-action="edit-profile" aria-label="Edit Profile">
                <i data-lucide="pencil"></i>
              </button>
            </div>
            <p class="profile-private-label"><i data-lucide="lock"></i> Private · ${state.profileAge || 17} y/o</p>
            <div class="profile-chips-row">
              ${streakChip}
              ${badgeChip}
            </div>
          </div>
        </div>
      </div>

      <!-- ── Wrapped ── -->
      <div class="wrapped ${anim('0.08s')}">
        <div class="wrapped-header">
          <h3>${WRAPPED.title}</h3>
          <button class="btn-share-wrapped" data-action="open-share-impact" title="Share Impact Card">
            <i data-lucide="share-2"></i>
          </button>
        </div>
        <p>${wrappedStats}</p>
        <div class="wrapped-insight">${moodInsight}</div>
      </div>

      <!-- ── Mood Calendar ── -->
      <div class="card ${anim('0.14s')}">
        <span class="eyebrow"><i data-lucide="calendar-heart"></i> Mood calendar</span>
        <div class="card-head-row">
          <div class="card-title">${monthName}</div>
          ${state.selectedMoodFilter !== null ? `<button class="btn-clear-filter" data-action="clear-mood-filter"><i data-lucide="x-circle"></i> Clear filter</button>` : ''}
        </div>
        <div class="cal-grid">${dows}${cells}</div>
        <div class="cal-legend">
          <span class="legend-text">stormy</span>
          <div class="legend-swatches">
            <i class="legend-swatch swatch-m1 ${state.selectedMoodFilter === '1' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="1" title="Highlight stormy mood"></i>
            <i class="legend-swatch swatch-m2 ${state.selectedMoodFilter === '2' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="2" title="Highlight rainy mood"></i>
            <i class="legend-swatch swatch-m3 ${state.selectedMoodFilter === '3' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="3" title="Highlight cloudy mood"></i>
            <i class="legend-swatch swatch-m4 ${state.selectedMoodFilter === '4' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="4" title="Highlight breezy mood"></i>
            <i class="legend-swatch swatch-m5 ${state.selectedMoodFilter === '5' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="5" title="Highlight sunny mood"></i>
          </div>
          <span class="legend-text">sunny</span>
        </div>
      </div>

      <!-- ── Achievements ── -->
      ${achievementsHTML(unlockedIds)}

      <!-- ── Privacy Explainer ── -->
      <div class="card privacy-card ${anim('0.28s')}">
        <div class="privacy-header">
          <i data-lucide="shield-check"></i>
          <h4>Private &amp; On-Device</h4>
        </div>
        <p class="privacy-intro">Your data is stored 100% locally in your browser's secure storage. No servers, no accounts, and no trackers.</p>
        <div class="privacy-list">
          <div class="privacy-item">
            <i data-lucide="feather"></i>
            <span><b>Reflections &amp; Journal</b> — Never uploaded; saved locally.</span>
          </div>
          <div class="privacy-item">
            <i data-lucide="calendar"></i>
            <span><b>Mental Weather history</b> — private to you; deleted on reset.</span>
          </div>
          <div class="privacy-item">
            <i data-lucide="wind"></i>
            <span><b>Relax Check-in answers</b> — temporary state, non-punitive.</span>
          </div>
        </div>
      </div>

      <!-- ── Settings & Privacy ── -->
      <div class="card settings-card ${anim('0.32s')}">
        <span class="eyebrow"><i data-lucide="settings"></i> Settings &amp; Privacy</span>

        <div class="settings-group-label">Storage &amp; Data</div>
        <div class="settings-list">
          <div class="settings-row btn-disabled">
            <span class="settings-label"><i data-lucide="smartphone"></i> Local journal storage</span>
            <span class="settings-badge badge-green">Saved</span>
          </div>
          <button class="settings-row" data-action="delete-data">
            <span class="settings-label"><i data-lucide="trash-2"></i> Delete my data</span>
            <span class="settings-badge badge-danger">Reset</span>
          </button>
        </div>

        <div class="settings-group-label">Accessibility</div>
        <div class="settings-list">
          <button class="settings-row" data-action="toggle-text-size">
            <span class="settings-label"><i data-lucide="type"></i> Text size</span>
            <span class="settings-value text-capitalize">${state.textSize || 'medium'}</span>
          </button>
          <button class="settings-row" data-action="toggle-colorblind">
            <span class="settings-label"><i data-lucide="eye"></i> Colorblind palette</span>
            <span class="settings-badge ${state.colorblindMode ? 'badge-teal' : 'badge-muted'}">
              ${state.colorblindMode ? 'Active' : 'Off'}
            </span>
          </button>
        </div>

        <div class="settings-group-label">Preferences</div>
        <div class="settings-list">
          <div class="settings-row btn-disabled">
            <span class="settings-label"><i data-lucide="languages"></i> App language</span>
            <span class="settings-value">English <small style="color: var(--muted); opacity: 0.7;">(Filipino soon)</small></span>
          </div>
          <button class="settings-row" data-action="toggle-theme">
            <span class="settings-label"><i data-lucide="${state.theme === 'light' ? 'moon' : 'sun'}"></i> Theme mode</span>
            <span class="settings-value">${state.theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

    </div>
    ${editModalHTML}
    ${shareModalHTML}`;
}