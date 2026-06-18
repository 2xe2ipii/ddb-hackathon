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
    description: 'Join youth leaders from across the region to discuss mental health, digital wellness, and creating positive online spaces. Features keynote speakers, interactive workshops, and networking opportunities.',
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
    description: 'An online open house introducing the new Peer Support Network in Lipa City. Learn how to become a peer counselor, recognize warning signs in friends, and access local mental health resources.',
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
    description: 'Volunteer as a facilitator for the upcoming International Day Against Drug Abuse and Illicit Trafficking (IDADAIT) caravan. Help run activities, distribute materials, and guide participants in your local barangay.',
    date: 'June 26',
    time: '8:00 AM',
    place: 'Calamba, Laguna',
    band: '',
  },
];

const PROGRESS_BADGES = [
  { icon: 'shield', grad: 'g1', name: 'Base Shield', desc: 'First mission', locked: false },
  { icon: 'scale', grad: 'g2', name: 'Golden Scales', desc: '7-day streak', locked: false },
  { icon: 'sword', grad: 'g3', name: 'Sword of Truth', desc: '20-day streak', locked: false },
  { icon: 'flame', grad: 'g4', name: 'Flame of Clarity', desc: '30-day badge', locked: true },
];

const MOOD_HISTORY = {
  1: 3, 2: 4, 3: 2, 4: 4, 5: 5, 6: 4, 7: 3, 8: 5, 9: 4,
};

const WRAPPED = {
  title: 'June so far',
  body: '<strong>15</strong> check-ins. <strong>12</strong> myths cleared. <strong>1</strong> event joined.',
};

/* =====================================================
   UPCOMING_NEAR_YOU — flyer-style upcoming events shown
   in Today tab. Images sourced from DDB official posts.
   ===================================================== */
const UPCOMING_NEAR_YOU = [
  {
    id: 'un1',
    kind: 'Mobile App Challenge',
    title: 'DDB Hackathon 2026',
    date: 'June 26, 2026',
    place: 'Region IV-A',
    image: 'assets/content/UPCOMING%20NEAR%20YOU/ddb%20hackathon.jpg',
    cta: 'Learn more',
  },
  {
    id: 'un2',
    kind: 'National Conference',
    title: 'National Research Conference on Drug Abuse Prevention and Control',
    date: 'July 2026',
    place: 'Open to researchers & students',
    image: 'assets/content/UPCOMING%20NEAR%20YOU/national%20research%20conference%20on%20drug%20abuse%20prevention%20and%20control.jpg',
    cta: 'View details',
  },
  {
    id: 'un3',
    kind: 'Public Consultation',
    title: 'Open Invitation: Early Warning System for NPS',
    date: 'June 17, 2026 · 9:00 AM',
    place: 'Online via Webex',
    image: 'assets/content/UPCOMING%20NEAR%20YOU/open%20invitation.jpg',
    cta: 'Join consultation',
  },
];

/* =====================================================
   DDB_POSTS — Facebook-style feed sourced from the
   Dangerous Drugs Board's official posts.
   ===================================================== */
const DDB_POSTS = [
  {
    id: 'p1',
    title: 'CRUSADA Program: Drug-Free Community Recognition',
    tag: 'Community Program',
    icon: 'shield-check',
    date: 'June 16, 2026',
    images: [
      'assets/content/%5B1%5DCRUSADA%20Program/image1.jpg',
      'assets/content/%5B1%5DCRUSADA%20Program/image2.jpg',
      'assets/content/%5B1%5DCRUSADA%20Program/image3.jpg',
    ],
    caption: `A community's commitment is proven through established systems, practices, and collective responsibility that are sustained over time. One community recently demonstrated exactly this, showing how residents themselves can take an active role in advancing efforts in drug prevention and control.

The Damayan ng Magkakapitbahay ng 511 Purok 2 Sucat Muntinlupa Inc. Homeowners Association received recognition as a Drug-Free Community under the Community Response: Unified Strategy Against Drug Abuse (CRUSADA) Program of the City Government of Muntinlupa following the successful completion of the program's standards and requirements.

Representing the Dangerous Drugs Board (DDB), Permanent Member - Undersecretary Abad Osit noted that addressing drug-related concerns extends beyond law enforcement and requires attention to public health, social development, family welfare, and community empowerment.`,
    hashtags: ['#DangerousDrugsBoard', '#BagongPilipinas'],
  },
  {
    id: 'p2',
    title: 'Open Invitation: Early Warning System for NPS',
    tag: 'Public Consultation',
    icon: 'megaphone',
    date: 'June 16, 2026',
    images: [
      'assets/content/%5B2%5DOpen%20Invitation/image1.jpg',
    ],
    caption: `OPEN INVITATION
Emerging challenges call for collective action.

New psychoactive substances continue to emerge in different parts of the world, often evolving faster than existing monitoring and control mechanisms. Their changing composition, appearance, and effects present growing challenges for public health, public safety, and regulatory systems.

In response, the Dangerous Drugs Board (DDB) will conduct a Public Consultation on the proposed Early Warning System for New Psychoactive Substances on 17 June 2026 from 9:00 AM – 4:00 PM (PHT) via Webex.

Every voice matters in shaping policies that protect public health and safety.`,
    hashtags: ['#DangerousDrugsBoard', '#BagongPilipinas'],
  },
  {
    id: 'p3',
    title: 'Judiciary Month: 125 Years of the Supreme Court',
    tag: 'National Commemoration',
    icon: 'landmark',
    date: 'June 14, 2026',
    images: [
      'assets/content/%5B3%5DJudiciary%20Month/image1.jpg',
    ],
    caption: `The Dangerous Drugs Board joins the nation in commemorating the 125th Founding Anniversary of the Supreme Court of the Philippines and the observance of Judiciary Month 2026.

For 125 years, the Supreme Court has served as a pillar of justice and the rule of law, continuously evolving to meet the changing needs of the times while remaining steadfast in its constitutional mandate.

As this year's celebration highlights "SC: 125 Years of Tradition and Innovation," the DDB recognizes the vital role of the judiciary in strengthening institutions, promoting accountability, and upholding the principles that underpin a just and orderly society.`,
    hashtags: ['#DangerousDrugsBoard', '#BagongPilipinas'],
  },
  {
    id: 'p4',
    title: 'GINHAWA Student Well-Being Summit 2026',
    tag: 'Youth & Education',
    icon: 'graduation-cap',
    date: 'June 13, 2026',
    images: [
      'assets/content/%5B4%5DGINHAWA/image1.jpg',
      'assets/content/%5B4%5DGINHAWA/image2.jpg',
      'assets/content/%5B4%5DGINHAWA/image3.jpg',
      'assets/content/%5B4%5DGINHAWA/image4.jpg',
      'assets/content/%5B4%5DGINHAWA/image5.jpg',
      'assets/content/%5B4%5DGINHAWA/image6.jpg',
    ],
    caption: `Student leaders, guidance counselors, educators, researchers, and policymakers came together at the GINHAWA Student Well-Being Summit 2026 to examine the realities shaping student life in higher education. Organized by the Commission on Higher Education (CHED), the summit drew participants from across the country into a shared conversation on the student experience.

The Dangerous Drugs Board (DDB), led by Chairperson - Secretary Oscar Valenzuela, contributed perspectives grounded in prevention, public health, and evidence-informed practice. Secretary Valenzuela highlighted the role of preventive education in supporting healthy development, resilience, and informed decision-making among young people.

Sessions explored themes such as mental health, coping strategies, help-seeking behavior, peer support, belongingness, and healthy relationships — bringing student experiences into dialogue with prevention and public health perspectives.`,
    hashtags: ['#DangerousDrugsBoard', '#BagongPilipinas'],
  },
  {
    id: 'p5',
    title: '128th Philippine Independence Day',
    tag: 'National Commemoration',
    icon: 'flag',
    date: 'June 12, 2026',
    images: [
      'assets/content/%5B5%5DIndependence%20Day/image1.jpg',
      'assets/content/%5B5%5DIndependence%20Day/image2.jpg',
      'assets/content/%5B5%5DIndependence%20Day/image3.jpg',
      'assets/content/%5B5%5DIndependence%20Day/image4.jpg',
    ],
    caption: `Independence Day serves as a reminder of the sacrifices and collective efforts that shaped our nation's history and secured the freedom that Filipinos continue to honor and uphold today.

During the 128th Anniversary of the Proclamation of Philippine Independence, President Ferdinand R. Marcos Jr. spearheaded the flag-raising and wreath-laying rites at the Jose Rizal National Monument in Rizal Park, Manila.

Dangerous Drugs Board (DDB) Chairperson-Secretary Oscar Valenzuela, together with Permanent Members Undersecretary Armando Ramolete and Undersecretary Abad Osit, led the delegation in the ceremonies alongside other government agencies.

Sa paggunita ng Araw ng Kalayaan, kaisa ang DDB sa patuloy na pagpapahalaga sa diwa ng kasarinlan at sa pagpapatibay ng sama-samang pagkilos tungo sa isang mas malusog, ligtas, at mas maunlad na bayan.`,
    hashtags: ['#DangerousDrugsBoard', '#BagongPilipinas'],
  },
];

/* =====================================================
   DDB_SHORTS — YouTube Shorts from the Dangerous Drugs
   Board's official channel. Add new entries by pasting
   the 11-character video ID into "videoId".
   ===================================================== */
const DDB_SHORTS = [
  {
    videoId: 'Sr74YNmH-0o',
    tag: 'DDBunks · Episode 02',
    title: 'Saan napupunta ang mga nakumpiskang illegal na droga?',
  },
  {
    videoId: 'mg2H3yYrH0o',
    tag: 'DDBunks · Episode 03',
    title: 'Doc, pareseta po!',
  },
  {
    videoId: 'At_YGCbPCis',
    tag: 'DDBunks · Episode 04',
    title: 'May "mukha" ba ang gumagamit ng illegal na droga?',
  },
  {
    videoId: 'J8tU4W24gL8',
    tag: 'DDBunks · Season 02 · Episode 01',
    title: 'Anong uri ng sakit ang substance use disorder?',
  },
  {
    videoId: '3XNhsQ7z_qc',
    tag: 'DDBunks · Season 02 · Episode 02',
    title: 'Kung ganoon ang magulang, ganoon na rin ba ang anak?',
  },
  {
    videoId: 'DL2yCx90HtY',
    tag: 'DDBunks · Season 02 · Episode 03',
    title: 'Temporary boost or health risk?',
  },
];

const UNMASK_ROUNDS = [
  {
    id: 'u1',
    imageFile: 'assets/unmask/crystalline.png',
    clues: [
      "Shiny, crystal-like, and white",
      "Street names include \"ice\" and \"shabu\""
    ],
    question: "What is this?",
    options: [
      "Table salt",
      "MSG seasoning",
      "Crushed ice",
      "Methamphetamine"
    ],
    answer: 3,
    explanation: "Methamphetamine in its crystalline form is often called \"ice\" or \"shabu.\" It is the most abused substance in the Philippines and causes severe physical and mental deterioration. If you encounter this, do not touch it — report immediately."
  },
  {
    id: 'u2',
    imageFile: 'assets/unmask/packaging.png',
    clues: [
      "No label, no brand, no regulation seal",
      "Commonly found near schools"
    ],
    question: "What is most likely inside?",
    options: [
      "Powdered medicine",
      "An illegal substance",
      "Laundry detergent",
      "Flour sample"
    ],
    answer: 1,
    explanation: "Small unmarked zip-lock sachets with powdery residue are one of the most common drug paraphernalia found in the Philippines. Legitimate substances always come in labeled, sealed, and regulated packaging."
  },
  {
    id: 'u3',
    imageFile: 'assets/unmask/foil.png',
    clues: [
      "A common household item being misused",
      "Burn marks suggest something was heated underneath"
    ],
    question: "What is this used for here?",
    options: [
      "Storing leftovers",
      "Craft project",
      "Inhaling a substance",
      "Shaping jewelry"
    ],
    answer: 2,
    explanation: "Rolled or folded aluminum foil with burn marks is a common tool used to heat and inhale drugs like shabu. Finding this item alongside other suspicious materials is a serious red flag."
  },
  {
    id: 'u4',
    imageFile: 'assets/unmask/pill.png',
    clues: [
      "No prescription marking or brand name",
      "Often offered at parties or called a \"happy pill\""
    ],
    question: "Why is this dangerous?",
    options: [
      "It dissolves too fast",
      "It looks like candy",
      "It is unidentified",
      "It is past its expiry"
    ],
    answer: 2,
    explanation: "Unbranded, unlabeled pills are a major red flag. Drugs like ecstasy (MDMA) and other synthetic substances are often distributed as small colorful tablets. Never take any pill that was not prescribed to you by a licensed doctor."
  },
  {
    id: 'u5',
    imageFile: 'assets/unmask/vape.png',
    clues: [
      "Legal in some forms, but easily misused",
      "Unusually sweet or chemical smell when used"
    ],
    question: "What makes this a red flag?",
    options: [
      "It is overpriced",
      "It has no brand",
      "It produces too much vapor",
      "It may contain illegal substances"
    ],
    answer: 3,
    explanation: "Vape devices can be easily loaded with THC oil, synthetic cannabinoids, or other illegal substances. The lack of a brand and an unusual smell are warning signs. Report suspicious vape use to a trusted adult."
  },
  {
    id: 'u6',
    imageFile: 'assets/unmask/spoon.png',
    clues: [
      "A kitchen item found outside the kitchen",
      "Held over a flame repeatedly"
    ],
    question: "What does this indicate?",
    options: [
      "Melting sugar",
      "Heating drugs",
      "Fixing a candle",
      "Science homework"
    ],
    answer: 1,
    explanation: "A spoon with burn marks on the underside is a known piece of drug paraphernalia used to heat and dissolve substances before injection or inhalation. If found alongside other suspicious items, report it immediately."
  },
  {
    id: 'u7',
    imageFile: 'assets/unmask/warning.png',
    clues: [
      "Internally recognized as a danger sign",
      "Appears on toxic or harmful contents"
    ],
    question: "What should you do if you find this unlabeled?",
    options: [
      "Open it carefully",
      "Smell it to identify",
      "Report it",
      "Throw it away"
    ],
    answer: 2,
    explanation: "Warning symbols on unlabeled packets indicate a potentially toxic or dangerous substance. Never open, smell, or touch unknown marked packets. Alert an adult or barangay official immediately."
  },
  {
    id: 'u8',
    imageFile: 'assets/unmask/offer.png',
    clues: [
      "Something is being offered without being asked for",
      "The moment feels urgent or pressured"
    ],
    question: "What is the safest response?",
    options: [
      "Ask what it is first",
      "Take it just once",
      "Decline and leave",
      "Accept to avoid conflict"
    ],
    answer: 2,
    explanation: "Peer pressure often happens during vulnerable moments. No matter the context, declining an unknown substance is always the right choice. Seeking support from a counselor or trusted adult is a healthier way to cope with stress."
  }
];

