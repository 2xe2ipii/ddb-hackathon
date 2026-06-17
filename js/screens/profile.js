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

function handleAvatarFileSelect(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Center crop to square to maintain aspect ratio and prevent squishing
        const size = Math.min(img.width, img.height);
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        
        canvas.width = 128;
        canvas.height = 128;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 128, 128);
        
        const previewUrl = canvas.toDataURL('image/jpeg', 0.85);
        
        // Update UI preview element
        const preview = document.getElementById('editAvatarPreview');
        if (preview) {
          preview.style.backgroundImage = `url(${previewUrl})`;
          preview.style.backgroundSize = 'cover';
          preview.style.backgroundPosition = 'center';
          preview.style.color = 'transparent';
          preview.textContent = ''; // Hide initials
        }
        
        // Store base64 temporarily until Save
        window.tempProfilePic = previewUrl;
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function profileHTML() {
  const dows = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    .map((d) => `<span class="cal-dow">${d}</span>`).join('');
  
  let cells = '<span></span>';
  for (let day = 1; day <= 30; day++) {
    const moodVal = day === 10 && state.todayMood
      ? WEATHER.find((w) => w.id === state.todayMood).value
      : MOOD_HISTORY[day];
    
    // Check if there is an active mood filter, and if this day matches it
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
      day === 10 ? 'today' : '',
      day > 10 ? 'future' : '',
      isDimmed ? 'dimmed' : '',
      (state.selectedMoodFilter !== null && isMatch && moodVal) ? 'highlighted' : '',
    ].join(' ').trim();
    cells += `<span class="${cls}">${day}</span>`;
  }

  const unlockedIds = getUnlockedIds(state);
  const moodInsight = getMoodInsight(state);

  const initials = (state.profileName || 'Kai').substring(0, 2).toUpperCase();
  const avatarStyle = state.profilePic ? `background-image: url(${state.profilePic}); background-size: cover; background-position: center; color: transparent;` : '';
  const avatarContent = state.profilePic ? '' : initials;

  // Generate edit profile modal if open
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

  // Generate share modal if open
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
                  <span class="ss-label">Quizzes Met</span>
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
                <p><i data-lucide="lock"></i> Private & Safe. No judgement.</p>
                <small>IDADAIT 2026 Mobile Challenge</small>
              </div>
            </div>
          </div>
          
          <div class="share-actions-row">
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
      <div class="profile-head">
        <div class="profile-ava" style="${avatarStyle}">${avatarContent}</div>
        <div class="profile-info-block">
          <div class="profile-name-row">
            <h1>${state.profileName || 'Kai'} - ${state.profileAge || 17}</h1>
            <button class="btn-icon-edit" data-action="edit-profile" aria-label="Edit Profile">
              <i data-lucide="pencil"></i>
            </button>
          </div>
          <p><i data-lucide="lock"></i> Private. No followers.</p>
        </div>
      </div>

      <div class="wrapped">
        <div class="wrapped-header">
          <h3>${WRAPPED.title}</h3>
          <button class="btn-share-wrapped" data-action="open-share-impact" title="Share Impact Card">
            <i data-lucide="share-2"></i>
          </button>
        </div>
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
        <div class="card-head-row">
          <div class="card-title">June 2026</div>
          ${state.selectedMoodFilter !== null ? `<button class="btn-clear-filter" data-action="clear-mood-filter"><i data-lucide="x-circle"></i> Clear filter</button>` : ''}
        </div>
        <div class="cal-grid">${dows}${cells}</div>
        <div class="cal-legend">
          <span class="legend-text">stormy</span>
          <div class="legend-swatches">
            <i class="legend-swatch swatch-m1 ${state.selectedMoodFilter === '1' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="1" title="Highlight stormy mood"></i>
            <i class="legend-swatch swatch-m2 ${state.selectedMoodFilter === '2' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="2" title="Highlight cloudy mood"></i>
            <i class="legend-swatch swatch-m3 ${state.selectedMoodFilter === '3' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="3" title="Highlight breezy mood"></i>
            <i class="legend-swatch swatch-m4 ${state.selectedMoodFilter === '4' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="4" title="Highlight sunny mood"></i>
            <i class="legend-swatch swatch-m5 ${state.selectedMoodFilter === '5' ? 'active' : ''}" data-action="toggle-mood-filter" data-mood="5" title="Highlight radiant mood"></i>
          </div>
          <span class="legend-text">sunny</span>
        </div>
      </div>

      ${achievementsHTML()}

      <div class="card settings-card">
        <span class="eyebrow"><i data-lucide="settings"></i> Settings & Privacy</span>
        <div class="settings-list">
          <div class="settings-row btn-disabled">
            <span class="settings-label"><i data-lucide="smartphone"></i> Local journal storage</span>
            <span class="settings-badge badge-green">Saved</span>
          </div>
          
          <button class="settings-row" data-action="delete-data">
            <span class="settings-label"><i data-lucide="trash-2"></i> Delete my data</span>
            <span class="settings-badge badge-danger">Reset</span>
          </button>
          
          <div class="settings-row btn-disabled">
            <span class="settings-label"><i data-lucide="languages"></i> App language</span>
            <span class="settings-value">English <small style="color: var(--muted); opacity: 0.7;">(Filipino soon)</small></span>
          </div>

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
          
          <button class="settings-row" data-action="toggle-theme">
            <span class="settings-label"><i data-lucide="${state.theme === 'light' ? 'moon' : 'sun'}"></i> Theme Mode</span>
            <span class="settings-value">${state.theme === 'light' ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>
      
      ${editModalHTML}
      ${shareModalHTML}
    </div>`;
}