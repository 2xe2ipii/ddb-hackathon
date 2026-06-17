/* Community tab: support resources, events, and rollout story. */

function supportResourcesHTML() {
  return SUPPORT_RESOURCES.map((r) => {
    const saved = state.savedSupport.has(r.id);
    return `
      <div class="resource-row">
        <span><i data-lucide="${r.icon}"></i></span>
        <div>
          <b>${r.title}</b>
          <small>${r.meta}</small>
        </div>
        <button data-action="${r.id === 'r1' ? 'helpline' : 'save-resource'}" data-resource="${r.id}">
          ${saved ? 'Saved' : r.action}
        </button>
      </div>`;
  }).join('');
}

function partnerStripHTML() {
  return `
    <div class="partner-strip">
      <span>With</span>
      ${PARTNERS.map((p) => `<b>${p}</b>`).join('')}
    </div>`;
}

function deploymentHTML() {
  return `
    <div class="deployment-card">
      <div class="deployment-head">
        <span class="eyebrow"><i data-lucide="network"></i> Distribution loop</span>
        <h3>Rollout path</h3>
        <p>School. Barangay. Region.</p>
      </div>
      <div class="deploy-metrics">
        <span><b>42</b><small>schools</small></span>
        <span><b>18</b><small>SK partners</small></span>
        <span><b>0</b><small>journals shared</small></span>
      </div>
      <div class="deploy-steps">
        ${DEPLOYMENT_STEPS.map((step) => `
          <div>
            <i data-lucide="${step.icon}"></i>
            <span><b>${step.title}</b><small>${step.body}</small></span>
          </div>`).join('')}
      </div>
    </div>`;
}

function communityHTML() {
  let modalHTML = '';
  if (state.eventModalOpen) {
    const ev = EVENTS.find(e => e.id === state.eventModalOpen);
    if (ev) {
      modalHTML = `
        <div class="overlay" data-action="close-event-info" style="position: absolute; inset: 0; background: rgba(0,0,0,0.6); z-index: 100; display: flex; align-items: flex-end; animation: fade-in 0.2s ease;">
          <div class="modal" style="width: 100%; background: var(--surface); border-radius: 24px 24px 0 0; padding: 24px; animation: slide-up 0.3s ease;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
              <div>
                <span class="eyebrow" style="margin-bottom: 8px;"><i data-lucide="${ev.icon}"></i> ${ev.kind}</span>
                <h2 style="font-size: 20px; font-weight: 900; line-height: 1.3;">${ev.title}</h2>
              </div>
              <button class="icon-btn" data-action="close-event-info" style="background: var(--card); border: 1px solid var(--line); border-radius: 50%; padding: 8px; color: var(--text);">
                <i data-lucide="x"></i>
              </button>
            </div>
            <p style="font-size: 14.5px; line-height: 1.6; color: var(--muted); margin-bottom: 24px;">
              ${ev.description || 'No description available for this event.'}
            </p>
            <div class="event-meta" style="margin-bottom: 24px; display: flex; flex-direction: column; gap: 8px;">
              <span style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--text);"><i data-lucide="calendar" style="color: var(--teal);"></i> ${ev.date}</span>
              <span style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--text);"><i data-lucide="clock" style="color: var(--teal);"></i> ${ev.time}</span>
              <span style="display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: var(--text);"><i data-lucide="map-pin" style="color: var(--teal);"></i> ${ev.place}</span>
            </div>
            <button class="btn btn-primary" data-action="close-event-info" style="width: 100%;">Got it</button>
          </div>
        </div>
        <style>
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        </style>
      `;
    }
  }

  if (state.igStoryModalOpen) {
    modalHTML += `
      <div class="overlay" data-action="close-ig-story" style="position: absolute; inset: 0; background: #000; z-index: 200; display: flex; align-items: center; justify-content: center; animation: story-zoom-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
        <img src="assets/ig_template.jpg" style="width: 100%; height: 100%; object-fit: cover; border-radius: 16px; box-shadow: 0 4px 30px rgba(0,0,0,0.5);" alt="IG Story Template">
        <button class="icon-btn" data-action="close-ig-story" style="position: absolute; top: 24px; right: 24px; background: rgba(0,0,0,0.5); border: none; border-radius: 50%; padding: 12px; color: #fff; z-index: 201;">
          <i data-lucide="x"></i>
        </button>
      </div>
      <style>
        @keyframes story-zoom-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      </style>
    `;
  }

  const cards = EVENTS.map((ev) => {
    const isReg = state.registered.has(ev.id);
    return `
      <div class="card event-card">
        <div class="event-band ${ev.band}" style="display: flex; justify-content: space-between; align-items: center;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="event-icon"><i data-lucide="${ev.icon}"></i></span>
            <span class="event-kind">${ev.kind}</span>
          </div>
          <button class="icon-btn" data-action="open-event-info" data-event="${ev.id}" style="color: var(--text);">
            <i data-lucide="info"></i>
          </button>
        </div>
        <div class="event-body">
          <h3>${ev.title}</h3>
          <div class="event-meta">
            <span><i data-lucide="calendar"></i> ${ev.date}</span>
            <span><i data-lucide="clock"></i> ${ev.time}</span>
            <span><i data-lucide="map-pin"></i> ${ev.place}</span>
          </div>
          <div class="event-actions">
            <button class="btn ${isReg ? 'btn-registered' : 'btn-register'}" data-action="register" data-event="${ev.id}">
              ${isReg ? '<i data-lucide="check"></i> Registered' : '<i data-lucide="ticket"></i> Register'}
            </button>
            <button class="btn btn-ig" data-action="share-ig" data-event="${ev.id}">
              <i data-lucide="instagram"></i> IG Story
            </button>
          </div>
        </div>
      </div>`;
  }).join('');

  const tab = state.communityTab || 'support';

  const toggleHTML = `
    <style>
      .community-toggle {
        display: flex;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 999px;
        padding: 4px;
        margin-bottom: 16px;
      }
      .community-toggle button {
        flex: 1;
        padding: 10px 16px;
        border-radius: 999px;
        border: none;
        background: transparent;
        color: var(--muted);
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .community-toggle button.active {
        background: var(--card);
        color: var(--text);
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      }
    </style>
    <div class="community-toggle">
      <button class="${tab === 'support' ? 'active' : ''}" data-action="switch-community-tab" data-tab="support">Support</button>
      <button class="${tab === 'activities' ? 'active' : ''}" data-action="switch-community-tab" data-tab="activities">Activities</button>
    </div>
  `;

  let contentHTML = '';

  if (tab === 'support') {
    contentHTML = `
      <div class="region-banner">
        <i data-lucide="map-pin"></i> Calabarzon - Region IV-A
      </div>

      ${partnerStripHTML()}

      <div class="card">
        <span class="eyebrow"><i data-lucide="life-buoy"></i> Support directory</span>
        <div class="resource-list">${supportResourcesHTML()}</div>
      </div>

      ${deploymentHTML()}
    `;
  } else {
    contentHTML = `
      ${cards}
    `;
  }

  return `
    <div class="screen">
      <div class="greeting" style="margin-bottom: 12px;">
        <h1>Community</h1>
        <p>Events, help, and local programs.</p>
      </div>

      ${toggleHTML}
      ${contentHTML}

      <div class="admin-card">
        <i data-lucide="database-zap"></i>
        <div>
          <b>Content desk</b>
          <small>Facts, helplines, events, advisories.</small>
        </div>
      </div>

      <p class="privacy-note"><i data-lucide="megaphone"></i> Announcements only. No public posting.</p>
    </div>
    ${modalHTML}`;
}
