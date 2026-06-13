/* Device-frame switching and viewport fitting. */

function setDevice(key) {
  const d = DEVICES[key];
  const root = document.documentElement.style;
  root.setProperty('--dev-w', d.w + 'px');
  root.setProperty('--dev-h', d.h + 'px');
  root.setProperty('--dev-radius', d.radius + 'px');
  root.setProperty('--status-h', d.statusH + 'px');
  phone.className = 'phone device-' + key;
  document.querySelectorAll('.dp-option').forEach((b) => {
    b.classList.toggle('active', b.dataset.device === key);
  });
  fitPhone(d);
}

function fitPhone(d) {
  d = d || DEVICES[document.querySelector('.dp-option.active').dataset.device];
  const scale = Math.min(1, (window.innerHeight - 56) / d.h, (window.innerWidth - 540) / d.w);
  phoneWrap.style.setProperty('--phone-scale', Math.max(scale, 0.45));
}

function initDeviceFrame() {
  document.getElementById('devicePanel').addEventListener('click', (e) => {
    const btn = e.target.closest('.dp-option');
    if (btn) setDevice(btn.dataset.device);
  });
  window.addEventListener('resize', () => fitPhone());
  setDevice('iphone');
}
