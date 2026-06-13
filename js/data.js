/* =====================================================
   DATA.JS - DDB prototype data
   Localized for Calabarzon / Region IV-A (IDADAIT 2026)
   ===================================================== */

const DEVICES = {
  iphone: { name: 'iPhone 14 Pro Max', w: 430, h: 932, radius: 55, statusH: 59 },
  pixel: { name: 'Google Pixel 7', w: 412, h: 915, radius: 34, statusH: 46 },
  galaxy: { name: 'Samsung Galaxy S23', w: 380, h: 800, radius: 28, statusH: 42 },
};

const HELPLINE = {
  label: 'Region IV-A Crisis Line',
  number: '1553',
  note: 'Call anytime. You do not have to explain everything first.',
};

const WEATHER = [
  { id: 'stormy', label: 'Stormy', icon: 'cloud-lightning', value: 1 },
  { id: 'rainy', label: 'Rainy', icon: 'cloud-rain', value: 2 },
  { id: 'cloudy', label: 'Cloudy', icon: 'cloud', value: 3 },
  { id: 'breezy', label: 'Breezy', icon: 'cloud-sun', value: 4 },
  { id: 'sunny', label: 'Sunny', icon: 'sun', value: 5 },
];

const MYTH_CARDS = [
  {
    id: 'm1',
    statement: 'Trying shabu once is harmless if you only do it out of curiosity.',
    answer: 'myth',
    source: 'DDB note',
    explanation: 'Even early use can affect sleep, mood, judgment, and risk-taking.',
  },
  {
    id: 'm2',
    statement: 'Stress, loneliness, and peer pressure can increase vulnerability to substance use.',
    answer: 'fact',
    source: 'Well-being',
    explanation: 'Sleep, support, movement, and trusted people lower risk.',
  },
  {
    id: 'm3',
    statement: 'Real friends will respect a clear no and help you leave a risky situation.',
    answer: 'fact',
    source: 'Refusal skill',
    explanation: 'A short no works better with an exit plan.',
  },
];

const QUIZ = [
  {
    id: 'q1',
    question: 'Which response is the safest when someone pressures you to try an illegal drug?',
    options: [
      'Say no clearly, move away, and message a trusted person',
      'Stay quiet and hope they stop asking',
      'Try it once so they stop pressuring you',
    ],
    answer: 0,
    explanation: 'Say no. Move away. Message someone safe.',
  },
  {
    id: 'q2',
    question: 'What is one healthy way to handle a craving, panic wave, or intense urge?',
    options: [
      'Wait it out alone without telling anyone',
      'Name the feeling, breathe slowly, and contact support',
      'Scroll online until it disappears',
    ],
    answer: 1,
    explanation: 'Name it. Breathe out slowly. Contact support.',
  },
];

const SUPPORT_RESOURCES = [
  {
    id: 'r1',
    icon: 'phone-call',
    title: 'Region IV-A Crisis Line',
    meta: '1553 - 24/7',
    action: 'Call now',
  },
  {
    id: 'r2',
    icon: 'school',
    title: 'School Guidance / BKD Referral',
    meta: 'For you or a friend',
    action: 'Save contact',
  },
  {
    id: 'r3',
    icon: 'map',
    title: 'LGU Prevention Desk',
    meta: 'Nearby programs',
    action: 'Find nearby',
  },
];

const PARTNERS = [
  'DDB',
  'BKD',
  'NDEP',
  'SK',
  'LGU',
];

const DEPLOYMENT_STEPS = [
  {
    icon: 'school',
    title: 'School / BKD',
    body: 'QR onboarding during orientation.',
  },
  {
    icon: 'landmark',
    title: 'Barangay / SK',
    body: 'Local events and help paths.',
  },
  {
    icon: 'bar-chart-3',
    title: 'Regional view',
    body: 'Aggregate stats only.',
  },
];

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
    place: 'Online - Zoom',
    band: 'alt',
  },
  {
    id: 'ev3',
    kind: 'Volunteer',
    icon: 'heart-handshake',
    title: 'IDADAIT 2026 Barangay Caravan: Volunteer Facilitators',
    date: 'June 26',
    time: '8:00 AM',
    place: 'Calamba, Laguna',
    band: '',
  },
];

const PROGRESS_BADGES = [
  { icon: 'shield', grad: 'g1', name: 'Base Shield', desc: 'First mission', locked: false },
  { icon: 'scale', grad: 'g2', name: 'Golden Scales', desc: '7-day streak', locked: false },
  { icon: 'sword', grad: 'g3', name: 'Sword of Truth', desc: 'Debunked 20 myths', locked: false },
  { icon: 'flame', grad: 'g4', name: 'Flame of Clarity', desc: '30-day badge', locked: true },
];

const MOOD_HISTORY = {
  1: 3, 2: 4, 3: 2, 4: 4, 5: 5, 6: 4, 7: 3, 8: 5, 9: 4,
};

const WRAPPED = {
  title: 'June so far',
  body: '<strong>15</strong> check-ins. <strong>12</strong> myths cleared. <strong>1</strong> event joined.',
};
