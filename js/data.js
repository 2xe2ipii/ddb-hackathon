/* =====================================================
   DATA.JS — mock data for the Kalma prototype
   Localized for Calabarzon / Region IV-A (IDADAIT 2026)
   ===================================================== */

const DEVICES = {
  iphone: { name: 'iPhone 14 Pro Max', w: 430, h: 932, radius: 55, statusH: 59 },
  pixel:  { name: 'Google Pixel 7',    w: 412, h: 915, radius: 34, statusH: 46 },
  galaxy: { name: 'Samsung Galaxy S23', w: 380, h: 800, radius: 28, statusH: 42 },
};

const HELPLINE = {
  label: 'Region IV-A Crisis Line',
  number: '1553',
  note: 'Free, confidential, and available 24/7. Talking to someone is a sign of strength — never a mark against you.',
};

/* mental weather options (value drives the heatmap intensity) */
const WEATHER = [
  { id: 'stormy', label: 'Stormy',  icon: 'cloud-lightning', value: 1 },
  { id: 'rainy',  label: 'Rainy',   icon: 'cloud-rain',      value: 2 },
  { id: 'cloudy', label: 'Cloudy',  icon: 'cloud',           value: 3 },
  { id: 'breezy', label: 'Breezy',  icon: 'cloud-sun',       value: 4 },
  { id: 'sunny',  label: 'Sunny',   icon: 'sun',             value: 5 },
];

/* "Did you know?" knowledge track — keyed loosely to mood */
const FACTS = {
  low: [
    'When you feel overwhelmed, <strong>cortisol spikes</strong> in your body. Slow, extended exhales activate the vagus nerve — nature’s built-in reset button. Try the Breathe tab for 2 minutes.',
    'Cravings and anxious waves typically <strong>peak and pass within 15–20 minutes</strong>. Naming the feeling ("I notice stress") measurably lowers its intensity. You’re already doing it.',
  ],
  mid: [
    'Your brain’s reward system keeps developing until about <strong>age 25</strong>. Every healthy coping habit you practice now literally wires in easier calm for future-you.',
    '<strong>Connection is protection.</strong> Studies show that youth with one trusted adult or peer group are significantly less likely to misuse substances. Check the Community tab — your people are nearby.',
  ],
  high: [
    'Savoring a good moment for just <strong>15 seconds</strong> helps encode it into long-term memory — psychologists call it "taking in the good." Bottle today’s weather!',
    'Gratitude journaling is linked to <strong>better sleep and lower stress hormones</strong> in as little as two weeks. Your 1% reflections are compound interest for the mind.',
  ],
};

const EVENTS = [
  {
    id: 'ev1',
    kind: 'Youth Summit',
    icon: 'sparkles',
    title: 'Sulong Kabataan Calabarzon: Digital Wellness Summit',
    date: 'Next Saturday',
    time: '2:00 PM',
    place: 'Batangas City Convention Center',
    band: '',
  },
  {
    id: 'ev2',
    kind: 'Online Webinar',
    icon: 'video',
    title: 'Lipa City Peer Support Network: Open House',
    date: 'Thursday',
    time: '7:00 PM',
    place: 'Online · Zoom',
    band: 'alt',
  },
  {
    id: 'ev3',
    kind: 'Volunteer',
    icon: 'heart-handshake',
    title: 'IDADAIT 2026 Barangay Caravan: Volunteer Facilitators',
    date: 'June 26 (IDADAIT Day)',
    time: '8:00 AM',
    place: 'Calamba, Laguna',
    band: '',
  },
];

const BADGES = [
  { icon: 'brain',           grad: 'g1', name: 'Calm Mind',        desc: '10 breathing sessions', locked: false },
  { icon: 'heart-handshake', grad: 'g2', name: 'Community Pillar', desc: 'Joined a local event',  locked: false },
  { icon: 'sparkles',        grad: 'g3', name: '1% Better',        desc: '15 reflections logged', locked: false },
  { icon: 'shield',          grad: 'g4', name: 'Steady Streak',    desc: '14-day streak — locked', locked: true },
];

/* June 2026 mood history (1–5). June 1 is a Monday. Today = June 10. */
const MOOD_HISTORY = {
  1: 3, 2: 4, 3: 2, 4: 4, 5: 5, 6: 4, 7: 3, 8: 5, 9: 4,
};

const WRAPPED = {
  title: 'Your June so far ✨',
  body: 'You tracked <strong>15 positive days</strong> and attended <strong>1 local event</strong> this month. Quiet, steady progress — exactly how it’s done.',
};
