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
  {
    id: 'm4',
    statement: 'Vaping is just harmless water vapor and is a completely safe alternative to smoking.',
    answer: 'myth',
    source: 'Health Fact',
    explanation: 'Vapes contain harmful chemicals and highly addictive nicotine that can severely damage developing lungs.',
  },
  {
    id: 'm5',
    statement: 'Regular exercise, hobbies, and adequate sleep can significantly lower the risk of substance abuse.',
    answer: 'fact',
    source: 'Well-being',
    explanation: 'Healthy daily habits build your resilience against stress, reducing the urge to rely on harmful substances to cope.',
  },
  {
    id: 'm6',
    statement: 'Prescription medications are always safe to use, even if they aren\'t prescribed to you by a doctor.',
    answer: 'myth',
    source: 'Safety Note',
    explanation: 'Using someone else\'s prescription can cause severe health reactions and quickly lead to dependency.',
  },
  {
    id: 'm7',
    statement: 'Experiencing anxiety or depression is a sign of personal weakness.',
    answer: 'myth',
    source: 'Mental Health',
    explanation: 'Mental health challenges are medical conditions, and seeking help is actually a sign of strength and self-awareness.',
  },
  {
    id: 'm8',
    statement: 'You can build a tolerance to alcohol, making it safe for you to drink larger amounts over time.',
    answer: 'myth',
    source: 'Health Fact',
    explanation: 'Tolerance just means your brain needs more of the substance to feel the effects, heavily increasing the risk of organ damage.',
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
  {
    id: 'q3',
    question: 'A friend offers you an e-cigarette at a party and won\'t take no for an answer. What is the safest exit strategy?',
    options: [
      'Take one puff so they leave you alone',
      'Make an excuse that you need to make a call, and leave the area',
      'Get angry and start an argument with them'
    ],
    answer: 1,
    explanation: 'Removing yourself from the situation quickly and safely is the best way to handle persistent peer pressure.',
  },
  {
    id: 'q4',
    question: 'Which of the following is considered a healthy coping mechanism when you are feeling overwhelmed by schoolwork?',
    options: [
      'Taking a 15-minute walk and doing breathing exercises',
      'Drinking multiple energy drinks to stay up all night',
      'Ignoring the assignments until the last minute'
    ],
    answer: 0,
    explanation: 'Stepping away to breathe and reset helps lower your body\'s stress levels and actually improves your focus.',
  },
  {
    id: 'q5',
    question: 'What should you do if you notice a friend is suddenly withdrawing from activities they used to love and acting unusually secretive?',
    options: [
      'Assume they are just busy and ignore it',
      'Tell other people about their strange behavior',
      'Reach out privately to ask how they are doing and listen without judgment'
    ],
    answer: 2,
    explanation: 'Approaching them with privacy and empathy shows you care and creates a safe space for them to open up.',
  },
  {
    id: 'q6',
    question: 'True or False: Mixing energy drinks with alcohol reduces the intoxicating effects of the alcohol.',
    options: [
      'True, the caffeine cancels out the alcohol',
      'False, it only masks the effects, making you feel less drunk than you are',
      'True, it speeds up your metabolism'
    ],
    answer: 1,
    explanation: 'Caffeine masks the depressant effects of alcohol, which often leads to dangerous overconsumption.',
  },
  {
    id: 'q7',
    question: 'When practicing the 4-7-8 breathing technique for anxiety, what does the "7" stand for?',
    options: [
      'Inhale for 7 seconds',
      'Exhale for 7 seconds',
      'Hold your breath for 7 seconds'
    ],
    answer: 2,
    explanation: 'The calming pattern is: inhale for 4 seconds, hold for 7 seconds, and exhale slowly for 8 seconds.',
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
