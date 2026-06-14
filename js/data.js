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
    explanationCorrect: 'Correct. Even early use can disrupt your brain chemistry, affecting sleep, mood, judgment, and risk-taking.',
    explanationIncorrect: 'It\'s actually a myth. Trying it even once can disrupt brain chemistry, leading to unpredictable changes in sleep, mood, and judgment.'
  },
  {
    id: 'm2',
    statement: 'Stress, loneliness, and peer pressure can increase vulnerability to substance use.',
    answer: 'fact',
    source: 'Well-being',
    explanationCorrect: 'Spot on. Building a support system and healthy habits are your best defense against these vulnerabilities.',
    explanationIncorrect: 'This is actually a fact. High stress and isolation make substances seem like an easy escape, which is why a strong support system is vital.'
  },
  {
    id: 'm3',
    statement: 'Real friends will respect a clear no and help you leave a risky situation.',
    answer: 'fact',
    source: 'Refusal skill',
    explanationCorrect: 'Exactly. A strong, short "no" combined with an exit plan is a great way to handle pressure.',
    explanationIncorrect: 'It\'s a fact. People who truly care about your well-being won\'t push you to do things you\'re uncomfortable with.'
  },
  {
    id: 'm4',
    statement: 'Vaping is just harmless water vapor and is a completely safe alternative to smoking.',
    answer: 'myth',
    source: 'Health Fact',
    explanationCorrect: 'Correct. Vapes often contain highly addictive nicotine and chemicals that can severely damage developing lungs.',
    explanationIncorrect: 'Not quite. Vapes are not just water; they contain harmful chemicals and addictive nicotine that can damage developing lungs.'
  },
  {
    id: 'm5',
    statement: 'Regular exercise, hobbies, and adequate sleep can significantly lower the risk of substance abuse.',
    answer: 'fact',
    source: 'Well-being',
    explanationCorrect: 'You got it. Healthy daily habits build your resilience against stress, keeping your mind and body balanced.',
    explanationIncorrect: 'This is a fact. Building healthy habits actually strengthens your brain\'s natural ability to handle stress and anxiety without relying on substances.'
  },
  {
    id: 'm6',
    statement: 'Prescription medications are always safe to use, even if they aren\'t prescribed to you by a doctor.',
    answer: 'myth',
    source: 'Safety Note',
    explanationCorrect: 'That\'s right. Using someone else\'s prescription can cause severe, unpredictable health reactions.',
    explanationIncorrect: 'Actually, it\'s a myth. Medications are prescribed based on an individual\'s specific health profile; sharing them can be very dangerous.'
  },
  {
    id: 'm7',
    statement: 'Experiencing anxiety or depression is a sign of personal weakness.',
    answer: 'myth',
    source: 'Mental Health',
    explanationCorrect: 'Absolutely. Mental health challenges are medical conditions, and asking for help shows profound self-awareness and strength.',
    explanationIncorrect: 'This is a common myth. Struggling with mental health is not a weakness; it\'s a medical condition, and reaching out takes real courage.'
  },
  {
    id: 'm8',
    statement: 'You can build a tolerance to alcohol, making it safe for you to drink larger amounts over time.',
    answer: 'myth',
    source: 'Health Fact',
    explanationCorrect: 'Correct. Tolerance just means your brain is struggling to feel the effects, which heavily increases the risk of organ damage.',
    explanationIncorrect: 'Try looking at it this way: tolerance just means your body needs more of the substance to feel it, which actually increases the risk of severe organ damage.'
  },
  {
    id: 'm9',
    statement: "You can't get addicted if you only use drugs occasionally.",
    answer: 'myth',
    source: 'Health Fact',
    explanationCorrect: "Even occasional use can lead to dependence — addiction risk depends on the substance, dosage, and individual factors, not just frequency.",
    explanationIncorrect: "Actually, this is a myth — occasional use still carries addiction risk."
  },
  {
    id: 'm10',
    statement: "Vaping is completely safe because it's just water vapor.",
    answer: 'myth',
    source: 'Health Fact',
    explanationCorrect: "Vape aerosol contains nicotine, chemicals, and metals — not just water vapor — and can harm developing lungs.",
    explanationIncorrect: "This is a myth — vape aerosol contains harmful substances beyond water vapor."
  },
  {
    id: 'm11',
    statement: "Talking about mental health struggles can help reduce stigma.",
    answer: 'fact',
    source: 'Mental Health',
    explanationCorrect: "Open conversations about mental health help normalize seeking support and reduce shame around it.",
    explanationIncorrect: "Actually, this is a fact — open dialogue helps reduce stigma."
  }
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
    explanationCorrect: 'Spot on. Saying a clear no, moving away, and messaging someone safe is the best exit strategy.',
    explanationIncorrect: 'Not quite. The safest strategy is to say no clearly, remove yourself from the situation, and reach out to someone you trust.',
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
    explanationCorrect: 'Exactly. Naming the feeling, taking slow breaths, and contacting support helps you ride out the wave safely.',
    explanationIncorrect: 'Try this instead: naming the feeling, breathing slowly, and reaching out to your support system is a much safer way to handle intense urges.',
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
    explanationCorrect: 'Great answer. Making a quick excuse and leaving the area safely removes you from the pressure without escalating the situation.',
    explanationIncorrect: 'Actually, the safest approach is to make a quick excuse to leave the area. This removes you from the situation without starting an argument.',
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
    explanationCorrect: 'Right. Stepping away to breathe and reset lowers your body\'s stress levels and actually improves your focus.',
    explanationIncorrect: 'Not quite. A healthier approach is taking a short walk and doing breathing exercises. It resets your stress levels and helps you focus better later.',
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
    explanationCorrect: 'Absolutely. Reaching out privately with empathy shows you care and creates a safe space for them to open up.',
    explanationIncorrect: 'A better approach is to reach out privately and listen without judgment. Showing empathy creates a safe space for them to share what\'s going on.',
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
    explanationCorrect: 'Correct. Caffeine only masks the depressant effects, making you feel less drunk than you are, which can lead to dangerous overconsumption.',
    explanationIncorrect: 'Actually, it\'s false. Caffeine just masks the depressant effects of alcohol, which makes you feel artificially alert and increases the risk of dangerous overconsumption.',
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
    explanationCorrect: 'You got it. The calming pattern is: inhale for 4 seconds, hold your breath for 7 seconds, and exhale slowly for 8 seconds.',
    explanationIncorrect: 'Not quite. The "7" stands for holding your breath. The full pattern is: inhale for 4, hold for 7, and exhale slowly for 8 seconds to calm your nervous system.',
  },
  {
    id: 'q8',
    question: "What is one early warning sign of drug misuse in a friend?",
    options: [
      "Sudden change in friend groups and behavior",
      "Getting better grades",
      "Sleeping at normal hours",
      "Eating healthier"
    ],
    answer: 0,
    explanationCorrect: "Sudden changes in social circles, mood, or routine can be early signs worth paying attention to.",
    explanationIncorrect: "The correct answer is sudden behavioral and social changes."
  },
  {
    id: 'q9',
    question: "Which of these is a healthy way to cope with stress?",
    options: [
      "Bottling it up",
      "Talking to a trusted friend or counselor",
      "Avoiding all responsibilities",
      "Isolating completely"
    ],
    answer: 1,
    explanationCorrect: "Talking to someone you trust is a proven way to process stress healthily.",
    explanationIncorrect: "The healthiest option here is talking to a trusted friend or counselor."
  }
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
