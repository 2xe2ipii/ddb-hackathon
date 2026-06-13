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
  const cards = EVENTS.map((ev) => {
    const isReg = state.registered.has(ev.id);
    return `
      <div class="card event-card">
        <div class="event-band ${ev.band}">
          <span class="event-icon"><i data-lucide="${ev.icon}"></i></span>
          <span class="event-kind">${ev.kind}</span>
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

  return `
    <div class="screen">
      <div class="greeting">
        <h1>Community</h1>
        <p>Events, help, and local programs.</p>
      </div>

      <div class="region-banner">
        <i data-lucide="map-pin"></i> Calabarzon - Region IV-A
      </div>

      ${partnerStripHTML()}

      <div class="card">
        <span class="eyebrow"><i data-lucide="life-buoy"></i> Support directory</span>
        <div class="resource-list">${supportResourcesHTML()}</div>
      </div>

      ${cards}

      ${deploymentHTML()}

      <div class="admin-card">
        <i data-lucide="database-zap"></i>
        <div>
          <b>Content desk</b>
          <small>Facts, helplines, events, advisories.</small>
        </div>
      </div>

      <p class="privacy-note"><i data-lucide="megaphone"></i> Announcements only. No public posting.</p>
    </div>`;
}
