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
    const storyEvent = (Array.isArray(UPCOMING_NEAR_YOU) ? UPCOMING_NEAR_YOU : [])
      .find(u => u.id === state.igStoryModalOpen);
    const storyAlt = storyEvent ? storyEvent.title : 'DDB event flyer';
    const storyImage = storyEvent ? storyEvent.image : '';
    modalHTML += `
      <div class="overlay ig-composer-overlay" data-action="close-ig-story">
        <div class="ig-top-bar">
          <button class="ig-icon-btn" data-action="close-ig-story" aria-label="Close">
            <i data-lucide="x"></i>
          </button>
          <button class="ig-icon-btn" aria-label="Text">
            <span class="ig-aa">Aa</span>
          </button>
        </div>

        <div class="ig-side-tools">
          <button class="ig-icon-btn ig-icon-btn--sm" aria-label="Sticker"><i data-lucide="smile-plus"></i></button>
          <button class="ig-icon-btn ig-icon-btn--sm" aria-label="Music"><i data-lucide="music"></i></button>
          <button class="ig-icon-btn ig-icon-btn--sm" aria-label="Effects"><i data-lucide="wand-2"></i></button>
          <button class="ig-icon-btn ig-icon-btn--sm" aria-label="More"><i data-lucide="chevron-down"></i></button>
        </div>

        <div class="ig-canvas">
          ${storyImage ? `
            <img class="ig-event-photo" src="${storyImage}" alt="${storyAlt}" />
          ` : ''}
          <button class="ig-learn-more">
            <i data-lucide="link"></i> LEARN MORE
          </button>
        </div>

        <div class="ig-caption-row">Add a caption...</div>

        <div class="ig-bottom-bar">
          <button class="ig-pill">
            <span class="ig-pill-ava ig-pill-ava--your"><i data-lucide="hand"></i></span>
            <span>Your story</span>
          </button>
          <button class="ig-pill">
            <span class="ig-pill-ava ig-pill-ava--cf"><i data-lucide="star"></i></span>
            <span>Close Friends</span>
          </button>
          <button class="ig-send" aria-label="Send">
            <i data-lucide="arrow-right"></i>
          </button>
        </div>
      </div>
      <style>
        @keyframes story-zoom-in {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }
      </style>
    `;
  }

  const upcomingHTML = (Array.isArray(UPCOMING_NEAR_YOU) && UPCOMING_NEAR_YOU.length) ? `
    <div class="ddb-upcoming-stack">
      <div class="ddb-upcoming-head">
        <span class="eyebrow"><i data-lucide="calendar-clock"></i> Upcoming activities</span>
      </div>
      ${UPCOMING_NEAR_YOU.map((u) => {
        const isReg = state.registered.has(u.id);
        return `
        <div class="upcoming-card">
          <div class="upcoming-poster">
            <img src="${u.image}" alt="${u.title}" loading="lazy" />
          </div>
          <div class="upcoming-side">
            <div class="upcoming-info">
              <span class="upcoming-kind">${u.kind}</span>
              <h4>${u.title}</h4>
              <div class="upcoming-meta">
                <span><i data-lucide="calendar"></i> ${u.date}</span>
                <span><i data-lucide="map-pin"></i> ${u.place}</span>
              </div>
            </div>
            <div class="upcoming-actions">
              <button class="btn ${isReg ? 'btn-registered' : 'btn-register'}" data-action="register" data-event="${u.id}">
                ${isReg ? '<i data-lucide="check"></i> Registered' : '<i data-lucide="ticket"></i> Register'}
              </button>
              <button class="btn btn-ig" data-action="share-ig" data-event="${u.id}">
                <i data-lucide="instagram"></i> IG Story
              </button>
            </div>
          </div>
        </div>
      `;
      }).join('')}
    </div>
  ` : '';

  const postsHTML = (Array.isArray(DDB_POSTS) && DDB_POSTS.length) ? `
    <div class="ddb-feed">
      <div class="ddb-feed-head">
        <span class="eyebrow"><i data-lucide="rss"></i> From the Dangerous Drugs Board</span>
        <small>Official posts and updates</small>
      </div>
      ${DDB_POSTS.map((p) => {
        const expanded = state.expandedPosts && state.expandedPosts[p.id];
        const captionParas = p.caption.split('\n').filter(Boolean);
        const previewParas = expanded ? captionParas : captionParas.slice(0, 1);
        const needsToggle = captionParas.length > 1;
        const galleryHTML = p.images.length === 1
          ? `<div class="post-gallery single"><img src="${p.images[0]}" alt="${p.title}" loading="lazy" /></div>`
          : `<div class="post-gallery scroll">
              ${p.images.map((img, i) => `<img src="${img}" alt="${p.title} (${i + 1}/${p.images.length})" loading="lazy" />`).join('')}
            </div>
            <div class="post-gallery-count"><i data-lucide="images"></i> ${p.images.length} photos</div>`;
        return `
          <article class="post-card">
            <header class="post-head">
              <div class="post-avatar"><i data-lucide="${p.icon}"></i></div>
              <div class="post-meta">
                <b>Dangerous Drugs Board</b>
                <small><span class="post-tag">${p.tag}</span> · ${p.date}</small>
              </div>
            </header>
            <h3 class="post-title">${p.title}</h3>
            ${galleryHTML}
            <div class="post-caption">
              ${previewParas.map((para) => `<p>${para}</p>`).join('')}
              ${needsToggle ? `
                <button class="post-toggle" data-action="toggle-post" data-post="${p.id}">
                  ${expanded ? 'Show less' : 'Read more'} <i data-lucide="${expanded ? 'chevron-up' : 'chevron-down'}"></i>
                </button>
              ` : ''}
            </div>
            <div class="post-tags">
              ${p.hashtags.map((h) => `<span>${h}</span>`).join('')}
            </div>
          </article>
        `;
      }).join('')}
    </div>
  ` : '';

  const cards = `${upcomingHTML}${postsHTML}`;

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
