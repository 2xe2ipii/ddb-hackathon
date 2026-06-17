/* Shared UI helpers and app chrome. */

function icons() {
  if (window.lucide) lucide.createIcons();
}

function toast(iconName, msg) {
  const zone = app.querySelector('.toast-zone');
  if (!zone) return;
  const t = document.createElement('div');
  t.className = 'toast';
  t.innerHTML = `<i data-lucide="${iconName}"></i><span>${msg}</span>`;
  zone.appendChild(t);
  icons();
  setTimeout(() => {
    t.classList.add('leaving');
    setTimeout(() => t.remove(), 320);
  }, 2600);
}

function missionProgress() {
  const points = [
    state.mythAnswer !== null,
    state.todayMood !== null,
    state.journalDone,
    state.registered.size > 0 || state.savedSupport.size > 0,
  ];
  return points.filter(Boolean).length;
}

function openHelpline() {
  const veil = document.createElement('div');
  veil.className = 'modal-veil';
  veil.innerHTML = `
    <div class="modal-sheet">
      <div class="sheet-grab"></div>
      <h2><i data-lucide="phone-call"></i> Need support?</h2>
      <p>${HELPLINE.note}</p>
      <div class="hotline-num">
        <div>
          <small>${HELPLINE.label}</small>
          <b>${HELPLINE.number}</b>
        </div>
        <i data-lucide="headphones" style="width:26px;height:26px;color:var(--blue)"></i>
      </div>
      <button class="btn btn-primary" data-action="call"><i data-lucide="phone"></i> Call ${HELPLINE.number} now</button>
      <button class="btn modal-close" data-action="close-modal">Not right now</button>
    </div>`;
  app.appendChild(veil);
  icons();
  veil.addEventListener('click', (e) => {
    if (e.target === veil || e.target.closest('[data-action="close-modal"]')) veil.remove();
    if (e.target.closest('[data-action="call"]')) {
      veil.remove();
      toast('phone', `Opening ${HELPLINE.label} - ${HELPLINE.number}`);
    }
  });
}

function launcherHTML() {
  return `
    <div class="phone-home">
      <div class="home-date">
        <span>Wednesday</span>
        <strong>June 10</strong>
      </div>
      <div class="home-widget">
        <span class="eyebrow"><i data-lucide="map-pin"></i> Calabarzon</span>
        <h2>IDADAIT 2026</h2>
        <p>Tap DDB to start.</p>
      </div>
      <div class="app-grid">
        <button class="home-app muted-app" aria-label="Messages">
          <span><i data-lucide="message-circle"></i></span><b>Messages</b>
        </button>
        <button class="home-app muted-app" aria-label="Calendar">
          <span><i data-lucide="calendar-days"></i></span><b>Calendar</b>
        </button>
        <button class="home-app ddb-app-icon" data-action="launch-app" aria-label="Open DDB app">
          <span><i data-lucide="shield-check"></i></span><b>DDB</b>
        </button>
        <button class="home-app muted-app" aria-label="Camera">
          <span><i data-lucide="camera"></i></span><b>Camera</b>
        </button>
      </div>
      <div class="launcher-dock">
        <span><i data-lucide="phone"></i></span>
        <span><i data-lucide="compass"></i></span>
        <span><i data-lucide="music"></i></span>
        <span><i data-lucide="settings"></i></span>
      </div>
      <div class="toast-zone"></div>
    </div>`;
}

function headerHTML() {
  let timerHTML = '';
  if (state.tab === 'learn' && state.quizOpened && state.quizFlowIndex < 5) {
    const q = QUIZ[state.quizFlowIndex];
    if (q && state.quizAnswers[q.id] === undefined && state.quizTimeLeft !== null) {
      timerHTML = `
        <div class="header-timer" style="position: absolute; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: 6px; font-weight: 800; color: var(--primary); font-size: 16px;">
          <i data-lucide="timer" style="width: 18px; height: 18px;"></i>
          <span id="header-timer-text">0:${state.quizTimeLeft.toString().padStart(2, '0')}</span>
        </div>`;
    }
  }

  const initials = (state.profileName || 'Kai').substring(0, 2).toUpperCase(); /* added for Achievements module — see SRS.md §5.3 */
  const avatarStyle = state.profilePic ? `background-image: url(${state.profilePic}); background-size: cover; background-position: center;` : ''; /* added for Achievements module — see SRS.md §5.3 */
  const avatarContent = state.profilePic ? '' : initials; /* added for Achievements module — see SRS.md §5.3 */

  return `
    <div class="app-header" style="position: relative;">
      <div class="brand">
        <span class="brand-name">DDB</span>
        <span class="brand-tag">Region IV-A</span>
      </div>
      ${timerHTML}
      <div class="header-actions">
        <button class="avatar-btn" data-action="go-profile" aria-label="Open private profile" style="${avatarStyle}">${avatarContent}</button>
      </div>
    </div>`;
}

function navHTML() {
  const tabs = [
    { id: 'today', icon: 'sparkles', label: 'Today' },
    { id: 'learn', icon: 'book-open-check', label: 'Learn' },
    { id: 'relax', icon: 'wind', label: 'Relax' },
    { id: 'community', icon: 'users', label: 'Support' },
  ];
  return `
    <nav class="bottom-nav four-nav">
      ${tabs.map((t) => `
        <button class="nav-btn ${state.tab === t.id ? 'active' : ''}" data-action="nav" data-tab="${t.id}">
          <i data-lucide="${t.icon}"></i><span>${t.label}</span>
        </button>`).join('')}
    </nav>`;
}

/* =====================================================
   TRANSLATION SYSTEM (English / Filipino Tagalog)
   ===================================================== */

const TRANSLATIONS = {
  // Navigation
  "Today": "Ngayon",
  "Learn": "Alamin",
  "Relax": "Mag-relax",
  "Support": "Suporta",

  // Today Tab
  "Build one safer habit today.": "Bumuo ng isang mas ligtas na gawi ngayon.",
  "Rough weather today?": "Mukhang maulap ang araw mo?",
  "It's okay to feel overwhelmed. Would you like to try a 1-minute breathing exercise before journaling?": "Ayos lang na mapagod o ma-overwhelm. Gusto mo bang sumubok ng 1-minutong ehersisyo sa paghinga bago mag-journal?",
  "Breathe": "Huminga",
  "Talk to someone": "Kausapin ang iba",
  "1 Truth": "1 Katotohanan",
  "Cleared ✓": "Nalutas ✓",
  "Play now": "Subukan ngayon",
  "Check-in": "Kamustahan",
  "Logged ✓": "Nai-log ✓",
  "How are you?": "Kumusta ka?",
  "Reflect": "Magnilay",
  "Saved ✓": "Nai-save ✓",
  "Write your 1%": "Isulat ang iyong 1%",
  "Choose what fits": "Piliin ang naaangkop",
  "What was your 1% positive moment today?": "Ano ang iyong 1% na positibong sandali ngayong araw?",
  "One small good thing.": "Isang maliit at mabuting bagay.",
  "Save privately": "I-save nang pribado",
  "What's your mental weather right now?": "Kamusta ang lagay ng iyong isip ngayon?",
  "Just name the weather.": "Piliin ang angkop na panahon.",
  "stormy": "mabagyo",
  "rainy": "maulan",
  "cloudy": "maulap",
  "breezy": "presko",
  "sunny": "maaraw",
  "Stormy": "Mabagyo",
  "Rainy": "Maulan",
  "Cloudy": "Maulap",
  "Breezy": "Presko",
  "Sunny": "Maaraw",
  "For urgent support": "Para sa agarang suporta",
  "Save counselor contact": "I-save ang contact ng counselor",
  "For later or for a friend": "Para sa iyo o sa isang kaibigan",
  "Upcoming near you": "Mga paparating na kaganapan malapit sa iyo",
  "Register Now": "Magrehistro Ngayon",
  "You're done for today.": "Tapos ka na para sa araw na ito.",
  "One truth. One check-in. One next step.": "Isang katotohanan. Isang check-in. Isang hakbang pasulong.",
  "Done ✓": "Tapos na ✓",
  "Today, one small good thing was...": "Ngayong araw, ang isang maliit na mabuting bagay ay...",
  "Choose what fits right now.": "Piliin ang naaangkop ngayon.",
  "Call 1553": "Tawagan ang 1553",

  // Learn Tab
  "Myth or Fact?": "Mito o Katotohanan?",
  "Test your knowledge": "Subukin ang kaalaman",
  "Correct.": "Tama.",
  "Not quite.": "Hindi masyado.",
  "Myth": "Mito",
  "Fact": "Katotohanan",
  "Truths": "Katotohanan",
  "Quiz": "Pagsusulit",
  "Learn & Grow": "Matuto at Lumago",
  "Scroll for more.": "Mag-scroll para sa iba pa.",
  "Truths Cleared": "Mga Katotohanang Nalutas",
  "Questions Answered": "Mga Tanong na Nasagot",
  "Daily Quiz": "Araw-araw na Pagsusulit",
  "Test your knowledge in 10s": "Subukin ang iyong kaalaman sa loob ng 10s",
  "Start Quiz": "Simulan ang Pagsusulit",
  "Time Left:": "Oras na Natitira:",
  "Next Question": "Susunod na Tanong",
  "Quiz Results": "Mga Resulta ng Pagsusulit",
  "scored": "nakakuha",
  "Try Again": "Subukan Muli",
  "Keep Going": "Ipagpatuloy",

  // Additional Learn Tab (New items for full translation)
  "Clear 5 misconceptions, then practice one safe choice.": "Linawin ang 5 maling paniniwala, pagkatapos ay magsanay ng isang ligtas na pasya.",
  "Myths vs facts": "Mito vs Katotohanan",
  "Myths vs Facts": "Mito vs Katotohanan",
  "Daily quiz": "Araw-araw na Pagsusulit",
  "Challenge a Myth": "Hamunin ang Mito",
  "All 5 completed": "Kumpleto na ang lahat ng 5",
  "Start Daily Quiz": "Simulan ang Araw-araw na Pagsusulit",
  "All 5 Cleared!": "Nalutas Lahat ng 5!",
  "You've uncovered the facts. Great job!": "Nalaman mo ang mga katotohanan. Magaling!",
  "Back to Learn": "Bumalik sa Alamin",
  "Swipe Left Myth, Right Fact": "I-swipe pakaliwa ang Mito, pakanan ang Katotohanan",
  "Correct!": "Tama!",
  "Incorrect": "Mali",
  "Next": "Susunod",
  "Quiz Completed!": "Tapos na ang Pagsusulit!",
  "Great job completing your daily quiz.": "Magaling sa pagtapos ng iyong araw-araw na pagsusulit.",
  "Time's up!": "Ubos na ang oras!",
  "Today's Recap": "Buod Ngayong Araw",
  "correct": "tama",
  "Close": "Isara",
  "stage unlocked": "na antas ay unlocked",
  "\"Golden Scales\" stage unlocked": "Ang antas ng \"Golden Scales\" ay na-unlock",
  "\"Sword of Truth\" stage unlocked": "Ang antas ng \"Sword of Truth\" ay na-unlock",
  "\"Flame of Clarity\" stage unlocked": "Ang antas ng \"Flame of Clarity\" ay na-unlock",

  // Relax Tab
  "Breathing": "Paghinga",
  "Self check-in": "Pag-check-in",
  "Start Breathing": "Simulan ang Paghinga",
  "Stop Breathing": "Itigil ang Paghinga",
  "Self Check-in": "Pag-check-in sa Sarili",
  "Take a deep breath and relax.": "Huminga nang malalim at mag-relax.",
  "Inhale": "Huminga Pailalim",
  "Hold": "Pigilan",
  "Exhale": "Huminga Palabas",
  "Self Check-in (PHQ-4)": "Pag-check-in sa Sarili (PHQ-4)",
  "A quick, private check-in of your mood. No judgment.": "Isang mabilis at pribadong pag-check-in ng iyong mood. Walang husga.",
  "Start Check-in": "Simulan ang Check-in",
  "Submit Check-in": "I-submit ang Check-in",
  "Check-in Completed": "Kumpleto na ang Check-in",
  "Your private scores have been saved. Take care of yourself today.": "Nai-save na ang iyong pribadong iskor. Alagaan ang iyong sarili ngayong araw.",
  "Relax Exercise": "Ehersisyo sa Pag-relax",
  "Choose a style that fits your mood": "Pumili ng estilo na angkop sa iyong mood",
  "Box Breathing": "Box Breathing",
  "4-7-8 Breathing": "4-7-8 Breathing",
  "Coherent Breathing": "Coherent Breathing",
  "Inhale: 4s | Hold: 4s | Exhale: 4s | Hold: 4s": "Huminga: 4s | Pigilan: 4s | Ibuga: 4s | Pigilan: 4s",
  "Inhale: 4s | Hold: 7s | Exhale: 8s": "Huminga: 4s | Pigilan: 7s | Ibuga: 8s",
  "Inhale: 5s | Exhale: 5s": "Huminga: 5s | Ibuga: 5s",

  // Additional Relax Tab (New items for full translation)
  "How have you been feeling?": "Kumusta ang pakiramdam mo nitong mga nakaraang araw?",
  "A quick 4-question check-in (about 1 minute). Private and just for you.": "Mabilis na check-in na may 4 na tanong (mga 1 minuto). Pribado at para sa iyo lamang.",
  "Start check-in": "Simulan ang check-in",
  "Over the last 2 weeks, how often have you been bothered by:": "Sa nakalipas na 2 linggo, gaano ka kadalas nagambala ng:",
  "Not at all": "Hindi kailanman",
  "Several days": "Ilang araw",
  "More than half the days": "Higit sa kalahati ng mga araw",
  "Nearly every day": "Halos araw-araw",
  "Your answers stay private on this device.": "Ang iyong mga sagot ay nananatiling pribado sa device na ito.",
  "Check-in complete": "Kumpleto na ang check-in",
  "We've picked a breathing exercise that may help below.": "Pumili kami ng ehersisyo sa paghinga sa ibaba na maaaring makatulong.",
  "Retake check-in": "Ulitin ang check-in",
  "Talk to someone - 1553": "Kausapin ang iba - 1553",
  "Minimal": "Minimal",
  "Mild": "Magaan",
  "Moderate": "Katamtaman",
  "Severe": "Matindi",
  "Your responses suggest minimal distress right now.": "Ipinapahiwatig ng iyong mga tugon ang kaunting stress sa ngayon.",
  "Your responses suggest mild stress. A short reset can help.": "Ipinapahiwatig ng iyong mga tugon ang magaan na stress. Makakatulong ang maikling pag-reset.",
  "Your responses suggest moderate distress. Extra support may help.": "Ipinapahiwatig ng iyong mga tugon ang katamtamang stress. Maaaring makatulong ang karagdagang suporta.",
  "Your responses suggest you have been carrying a lot. Talking to someone can really help.": "Ipinapahiwatig ng iyong mga tugon na marami kang dinadala. Malaki ang maitutulong ng pakikipag-usap sa iba.",
  "Relief space": "Relief space",
  "Notice your surroundings to anchor back to the present.": "Pansinin ang iyong paligid upang bumalik sa kasalukuyan.",
  "Slowly release tension from head to toe.": "Dahan-dahang pakawalan ang tensyon mula ulo hanggang paa.",
  "Ready?": "Handa na?",
  "tap start below": "i-tap ang simula sa ibaba",
  "tap start to resume": "i-tap ang simula para magpatuloy",
  "Paused": "Naka-pause",
  "End session": "Tapusin ang session",
  "Start breathing": "Simulan ang paghinga",
  "4-4-4-4 steady square": "4-4-4-4 regular na parisukat",
  "Long exhale to ease panic": "Mahabang pagbuga ng hininga para mabawasan ang kaba",
  "5-5 balance and focus": "5-5 balanse at pokus",
  "INHALE 4s - HOLD 4s - EXHALE 4s - HOLD 4s": "HINGA 4s - PIGIL 4s - IBUGA 4s - PIGIL 4s",
  "INHALE 4s - HOLD 7s - EXHALE 8s": "HINGA 4s - PIGIL 7s - IBUGA 8s",
  "INHALE 5s - EXHALE 5s": "HINGA 5s - IBUGA 5s",
  "Check in, breathe, and ground yourself": "Mag-check in, huminga, at i-ground ang iyong sarili",
  "I need help now": "Kailangan ko ng tulong ngayon",
  "I'm worried about a friend": "Nag-aalala ako sa isang kaibigan",

  // PHQ-4 Questions
  "Feeling nervous, anxious, or on edge": "Nakakaramdam ng kaba, pagkabalisa, o tensyon",
  "Not being able to stop or control worrying": "Hindi mapigilan o makontrol ang pag-aalala",
  "Little interest or pleasure in doing things": "Kawalan ng interes o saya sa paggawa ng mga bagay-bagay",
  "Feeling down, depressed, or hopeless": "Nakakaramdam ng lungkot, depresyon, o kawalan ng pag-asa",

  // Support / Community Tab
  "Community Support": "Suporta ng Komunidad",
  "Saved Resources": "Mga Nai-save na Resource",
  "Helpline": "Helpline",
  "Registered Events": "Mga Rehistradong Kaganapan",
  "Events": "Mga Kaganapan",
  "Local support and youth gatherings": "Lokal na suporta at mga pagtitipon ng kabataan",
  "Saved resources": "mga nai-save na resource",
  "counselor contacts and guides": "mga contact at gabay ng counselor",
  "counselor contact saved": "contact ng counselor ay nai-save",
  "registered": "nakarehistro",
  "Joined": "Pinasukan",
  "Registered": "Nakarehistro",
  "Save Counselor Contact": "I-save ang Contact ng Counselor",
  "School Guidance Counselor Office": "Opisina ng Guidance Counselor sa Paaralan",
  "Saved!": "Nai-save!",
  "Save contact": "I-save ang contact",
  "National Youth Mental Health Helpline": "Pambansang Helpline para sa Mental Health ng Kabataan",
  "Talk to a trained professional privately. Free 24/7.": "Kausapin ang isang sinanay na propesyonal nang pribado. Libre 24/7.",
  "Call Helpline": "Tawagan ang Helpline",
  "Register for Event": "Magrehistro sa Kaganapan",

  // Additional Community Tab (New items for full translation)
  "Community": "Komunidad",
  "Events, help, and local programs.": "Mga kaganapan, tulong, at lokal na programa.",
  "Calabarzon - Region IV-A": "Calabarzon - Rehiyon IV-A",
  "With": "Kasama ang",
  "Support directory": "Direktoryo ng suporta",
  "Register": "Magrehistro",
  "IG Story": "IG Story",
  "Distribution loop": "Loop ng pamamahagi",
  "Rollout path": "Daanan ng rollout",
  "School. Barangay. Region.": "Paaralan. Barangay. Rehiyon.",
  "schools": "mga paaralan",
  "SK partners": "mga partner na SK",
  "journals shared": "naihaging journal",
  "Content desk": "Desk ng nilalaman",
  "Facts, helplines, events, advisories.": "Katotohanan, helpline, kaganapan, advisory.",
  "Announcements only. No public posting.": "Mga inanunsyo lamang. Walang pampublikong pag-post.",

  // Profile Tab
  "Achievements": "Mga Nakamit",
  "Settings & Privacy": "Mga Setting at Privacy",
  "Storage & Data": "Storage at Data",
  "Local journal storage": "Lokal na imbakan ng journal",
  "Delete my data": "I-delete ang aking data",
  "Text size": "Laki ng teksto",
  "Colorblind palette": "Paleta ng colorblind",
  "App language": "Wika ng app",
  "Theme mode": "Tema",
  "Private & On-Device": "Pribado at nasa Device",
  "Your data is stored 100% locally in your browser's secure storage. No servers, no accounts, and no trackers.": "Ang iyong data ay 100% lokal na nakaimbak sa ligtas na imbakan ng iyong browser. Walang server, walang account, at walang tracker.",
  "Reflections & Journal": "Mga Pagninilay at Journal",
  "Never uploaded; saved locally.": "Hindi kailanman in-upload; nai-save nang lokal.",
  "— Never uploaded; saved locally.": "— Hindi kailanman in-upload; nai-save nang lokal.",
  "Mental Weather history": "Kasaysayan ng mental na panahon",
  "private to you; deleted on reset.": "pribado sa iyo; dine-delete sa pag-reset.",
  "— private to you; deleted on reset.": "— pribado sa iyo; dine-delete sa pag-reset.",
  "Relax Check-in answers": "Mga sagot sa Relax Check-in",
  "temporary state, non-punitive.": "pansamantalang estado, hindi parusa.",
  "— temporary state, non-punitive.": "— pansamantalang estado, hindi parusa.",
  "Private ·": "Pribado ·",
  "y/o": "taong gulang",
  "Monthly Impact Card": "Buwanang Impact Card",
  "Day Streak": "Araw na Streak",
  "Badges Earned": "Mga Badge na Nakuha",
  "Quizzes Done": "Mga Pagsusulit na Natapos",
  "Events Joined": "Mga Kaganapang Pinasukan",
  "Save Image": "I-save ang Larawan",
  "Share to Stories": "Ibahagi sa Stories",
  "Edit Profile": "I-edit ang Profile",
  "Display Name": "Pangalan",
  "Age": "Edad",
  "Cancel": "Kanselahin",
  "Save Changes": "I-save ang mga Pagbabago",
  "Upload Photo": "Mag-upload ng Larawan",
  "Show more": "Ipakita ang higit pa",
  "Show less": "Ipakita ang mas kaunti",
  "Show all": "Ipakita lahat",
  "Active": "Aktibo",
  "Off": "Naka-off",
  "Reset": "I-reset",
  "Saved": "Naka-save",
  "Light": "Maliwanag",
  "Dark": "Madilim",
  "small": "maliit",
  "medium": "katamtaman",
  "large": "malaki",
  "Small": "Maliit",
  "Medium": "Katamtaman",
  "Large": "Malaki",
  "Theme": "Tema",
  "June so far": "Hunyo sa kasalukuyan",
  "Clear filter": "I-clear ang filter",
  "All": "Lahat",
  "Streak": "Tuloy-tuloy",
  "Mind": "Isip",
  "unlocked": "unlocked",
  "Enter name": "Ilagay ang pangalan",
  "Mood calendar": "Kalendaryo ng mood",
  "Next:": "Susunod:",
  "Private & Safe. No judgement.": "Pribado at Ligtas. Walang panghuhusga.",
  "IDADAIT 2026 Mobile Challenge": "IDADAIT 2026 Hamon sa Mobile",
  "Taking care of my mind, one day at a time.": "Pag-aalaga sa aking isip, isang araw sa bawat pagkakataon.",
  "Completing today's self check-in and feeling calmer today is a pattern worth noticing. Keep building self-awareness.": "Ang pagkumpleto ng self check-in ngayon at pakiramdam na mas kalmado ay isang pattern na dapat mapansin. Ipagpatuloy ang pagbuo ng kamalayan sa sarili.",
  "Completing today's self check-in is a quiet act of self-care. It matters more than you think.": "Ang pagkumpleto ng self check-in ngayon ay isang tahimik na paraan ng pag-aalaga sa sarili. Mas mahalaga ito kaysa sa iyong iniisip.",
  "You cleared the myths and the quiz. That knowledge stays with you — and it protects others too.": "Nalutas mo ang mga mito at pagsusulit. Ang kaalamang iyan ay mananatili sa iyo — at makakatulong din sa iba.",
  "Hard days are part of it. You still showed up today — that counts.": "Bahagi ng buhay ang mga mahihirap na araw. Nagpakita ka pa rin ngayon — may halaga iyon.",
  "Today feels bright. Logging it here is a small act of self-awareness.": "Maliwanag ang pakiramdam ngayon. Ang pag-log nito dito ay isang maliit na hakbang ng pagkilala sa sarili.",
  "Today feels steady. Logging it here is a small act of self-awareness.": "Matatag ang pakiramdam ngayon. Ang pag-log nito dito ay isang maliit na hakbang ng pagkilala sa sarili.",
  "Consistency is the foundation. Try a Relax check-in to see how it shapes your day.": "Ang pagiging pare-pareho ang pundasyon. Subukan ang Relax check-in upang makita kung paano nito hinuhubog ang iyong araw.",

  // Badges names & descriptions & hints
  "Base Shield": "Pangunahing Kalasag",
  "Streak started": "Nagsimula na ang streak",
  "Complete 1 day to start your streak": "Kumpletuhin ang 1 araw para simulan ang streak",
  "Golden Scales": "Gintong Timbangan",
  "7-day streak": "7-araw na streak",
  "Reach a 7-day streak": "Abutin ang isang 7-araw na streak",
  "Sword of Truth": "Espada ng Katotohanan",
  "20-day streak": "20-araw na streak",
  "Reach a 20-day streak": "Abutin ang isang 20-araw na streak",
  "Flame of Clarity": "Apoy ng Linaw",
  "30-day streak": "30-araw na streak",
  "Reach a 30-day streak": "Abutin ang isang 30-araw na streak",
  "Myth Buster": "Tagalansag ng Mito",
  "Cleared 5 myths today": "Nalutas ang 5 mito ngayong araw",
  "Answer all 5 Myths vs Facts cards": "Sagutin ang lahat ng 5 card ng Mito vs Katotohanan",
  "Sharp Eye": "Matalas na Paningin",
  "5/5 myths correct, no mistakes": "5/5 tamang mito, walang mali",
  "Get all 5 myth cards right on the first try": "Makuha ang lahat ng 5 mito sa unang subok",
  "Quiz Whiz": "Henyo sa Pagsusulit",
  "Finished the daily quiz": "Natapos ang araw-araw na pagsusulit",
  "Answer all 5 daily quiz questions": "Sagutin ang lahat ng 5 tanong sa pagsusulit",
  "Perfect Score": "Perpektong Iskor",
  "5/5 correct on the daily quiz": "5/5 tama sa araw-araw na pagsusulit",
  "Answer every quiz question correctly": "Sagutin ang bawat tanong nang tama",
  "First Reflection": "Unang Pagninilay",
  "Wrote a journal entry": "Nagsulat ng journal entry",
  "Save your first private reflection": "I-save ang iyong unang pribadong pagninilay",
  "Open Book": "Bukas na Aklat",
  "Journaled 7 days total": "Nag-journal ng 7 araw sa kabuuan",
  "Self-Check Starter": "Panimulang Check-In",
  "Completed the PHQ-4 check-in": "Natapos ang PHQ-4 check-in",
  "Finish the Relax tab self check-in": "Tapusin ang self check-in sa tab na Relax",
  "Community Starter": "Panimula sa Komunidad",
  "Registered or saved a resource": "Nagrehistro o nag-save ng resource",
  "Register for an event or save a support resource": "Magrehistro sa kaganapan o mag-save ng resource",
  "Helping Hand": "Tulong na Kamay",
  "Saved a counselor contact for a friend": "Nag-save ng contact ng counselor para sa kaibigan",
  "Save the school guidance / counselor resource": "I-save ang resource ng school guidance counselor",

  // Toasts
  "DDB opened": "Nabuksan ang DDB",
  "Knowledge step completed": "Natapos ang hakbang sa kaalaman",
  "Mood saved privately": "Nai-save nang pribado ang mood",
  "Even three words count - give it a try": "Kahit tatlong salita ay mahalaga - subukan mo",
  "Reflection updated": "Na-update ang pagninilay",
  "Support resource saved": "Nai-save ang support resource",
  "All data deleted. Reset to Today.": "Na-delete ang lahat ng data. I-reset sa Ngayon.",
  "Advocacy story template ready": "Handa na ang template ng advocacy story",
  "Application restarted": "Na-restart ang application",
  "Reset to Day 7 state": "I-reset sa estado ng Araw 7",
  "Simulated Day 20+ state loaded!": "Na-load ang kunwaring estado ng Araw 20+!",
  "Saving Impact Card to device...": "Inililigtas ang Impact Card sa device...",
  "Image saved successfully!": "Matagumpay na nai-save ang larawan!",
  "Opening Instagram Stories...": "Binubuksan ang Instagram Stories...",
  "Story template shared!": "Naibahagi ang template ng story!",
  "Name cannot be empty": "Hindi maaaring walang laman ang pangalan",
  "Please enter a valid age (1-120)": "Mangyaring magpasok ng wastong edad (1-120)",
  "Profile updated!": "Na-update ang profile!",

  // Helpline
  "Need support?": "Kailangan ng suporta?",
  "Call anytime. You do not have to explain everything first.": "Tawagan kahit kailan. Hindi mo kainlangang ipaliwanag ang lahat sa simula.",
  "Not right now": "Hindi muna ngayon",
  "Crisis Line ng Rehiyon IV-A": "Crisis Line ng Rehiyon IV-A",

  // Affirmations
  "This feeling is temporary. It will pass.": "Ang nararamdamang ito ay pansamantala lamang. Lilipas din ito.",
  "I am safe right now in this moment.": "Ligtas ako sa kasalukuyang sandaling ito.",
  "I can handle this one step at a time.": "Kaya ko itong harapin nang dahan-dahan.",
  "It is okay to ask for help.": "Ayos lang na humingi ng tulong.",
  "I have gotten through hard moments before.": "Nakalampas na ako sa mga mahihirap na sandali noon.",
  "I am allowed to rest.": "Pinahihintulutan ko ang aking sarili na magpahinga.",
  "I can breathe through this.": "Kaya ko itong hingahan nang malalim.",
  "I release what I cannot control.": "Pinakakawalan ko ang mga bagay na hindi ko kontrolado.",
  "My feelings are valid.": "May saysay at totoo ang aking mga nararamdaman.",
  "I am doing my best.": "Ginagawa ko ang aking makakaya.",
  "I am gentle with myself.": "Mabait ako sa aking sarili.",
  "I choose peace over worry.": "Pinipili ko ang kapayapaan kaysa sa pag-aalala.",

  // Launcher Screen
  "Wednesday": "Miyerkules",
  "June 10": "Hunyo 10",
  "Messages": "Mga Mensahe",
  "Calendar": "Kalendaryo",
  "Camera": "Kamera",
  "Tap DDB to start.": "I-tap ang DDB para magsimula.",

  // Myths Statements
  "Trying shabu once is harmless if you only do it out of curiosity.": "Ang pagsubok ng shabu nang isang beses ay hindi masama kung dulot lamang ng kuryusidad.",
  "Stress, loneliness, and peer pressure can increase vulnerability to substance use.": "Ang stress, kalungkutan, at pressure mula sa mga kasamahan ay maaaring magdulot ng mas mataas na panganib sa paggamit ng bawal na gamot.",
  "Real friends will respect a clear no and help you leave a risky situation.": "Ang tunay na kaibigan ay rerespeto sa malinaw na \"hindi\" at tutulungan kang umalis sa mapanganib na sitwasyon.",
  "Vaping is just harmless water vapor and is a completely safe alternative to smoking.": "Ang vaping ay usok ng tubig lamang na walang pinsala at ganap na ligtas na alternatibo sa paninigarilyo.",
  "Regular exercise, hobbies, and adequate sleep can significantly lower the risk of substance abuse.": "Ang regular na ehersisyo, mga libangan, at sapat na tulog ay maaaring magdulot ng mas mababang panganib sa paggamit ng bawal na gamot.",
  "Prescription medications are always safe to use, even if they aren't prescribed to you by a doctor.": "Ang mga iniresetang gamot ay laging ligtas gamitin, kahit na hindi ito inireseta sa iyo ng doktor.",
  "Experiencing anxiety or depression is a sign of personal weakness.": "Ang pagkaranas ng pagkabalisa o depresyon ay isang tanda ng personal na kahinaan.",
  "You can build a tolerance to alcohol, making it safe for you to drink larger amounts over time.": "Maaari kang masanay sa alak, kaya ligtas nang uminom ng mas maraming alak sa paglipas ng panahon.",
  "You can't get addicted if you only use drugs occasionally.": "Hindi ka maa-addict kung gagamit ka lamang ng bawal na gamot paminsan-minsan.",
  "Vaping is completely safe because it's just water vapor.": "Ang vaping ay ganap na ligtas dahil ito ay usok ng tubig lamang.",
  "Talking about mental health struggles can help reduce stigma.": "Ang pakikipag-usap tungkol sa mga problema sa mental health ay makakatulong upang mabawasan ang stigma.",

  // Myth Explanations
  "Correct. Even early use can disrupt your brain chemistry, affecting sleep, mood, judgment, and risk-taking.": "Tama. Kahit ang unang paggamit ay maaaring makasira sa chemistry ng utak, na nakakaapekto sa pagtulog, mood, pagpapasya, at pagkuha ng panganib.",
  "It's actually a myth. Trying it even once can disrupt brain chemistry, leading to unpredictable changes in sleep, mood, and judgment.": "Ito ay mito. Kahit isang beses lamang ay maaaring makasira sa chemistry ng utak, na magdudulot ng hindi inaasahang pagbabago sa pagtulog, mood, at pagpapasya.",
  "Spot on. Building a support system and healthy habits are your best defense against these vulnerabilities.": "Tumpak. Ang pagbuo ng suporta at malusog na gawi ang pinakamahusay na depensa laban sa mga panganib na ito.",
  "This is actually a fact. High stress and isolation make substances seem like an easy escape, which is why a strong support system is vital.": "Ito ay katotohanan. Ang matinding stress at pag-iisa ay nagpapakita sa bawal na gamot bilang madaling takasan, kaya naman napakahalaga ng matibay na sistema ng suporta.",
  "Exactly. A strong, short \"no\" combined with an exit plan is a great way to handle pressure.": "Tumpak. Ang malinaw na 'hindi' kasabay ng exit plan ang mahusay na paraan laban sa pressure.",
  "It's a fact. People who truly care about your well-being won't push you to do things you're uncomfortable with.": "Ito ay katotohanan. Ang mga taong nagmamalasakit sa iyo ay hindi ka pipiliting gumawa ng mga bagay na hindi ka komportable.",
  "Correct. Vapes often contain highly addictive nicotine and chemicals that can severely damage developing lungs.": "Tama. Ang vapes ay naglalaman ng nicotine at mga kemikal na maaaring makapinsala nang malubha sa lumalaking baga.",
  "Not quite. Vapes are not just water; they contain harmful chemicals and addictive nicotine that can damage developing lungs.": "Hindi masyado. Ang vapes ay hindi lamang tubig; naglalaman ito ng mga kemikal at nicotine na maaaring makapinsala sa lumalaking baga.",
  "You got it. Healthy daily habits build your resilience against stress, keeping your mind and body balanced.": "Tumpak. Ang malusog na gawi araw-araw ay nagpapatatag laban sa stress, kaya balanse ang isip at katawan.",
  "This is a fact. Building healthy habits actually strengthens your brain's natural ability to handle stress and anxiety without relying on substances.": "Ito ay katotohanan. Ang malusog na gawi ay nagpapatibay sa kakayahan ng utak na harapin ang stress at kaba nang hindi umaasa sa bawal na gamot.",
  "That's right. Using someone else's prescription can cause severe, unpredictable health reactions.": "Tama. Ang paggamit ng reseta ng iba ay maaaring magdolot ng masamang reaksyon sa kalusugan.",
  "Actually, it's a myth. Medications are prescribed based on an individual's specific health profile; sharing them can be very dangerous.": "Ito ay mito. Ang gamot ay ibinibigay batay sa partikular na profile ng isang tao; ang pagbabahagi nito ay lubhang mapanganib.",
  "Absolutely. Mental health challenges are medical conditions, and asking for help shows profound self-awareness and strength.": "Tumpak. Ang mga problema sa mental health ay kondisyong medikal, at ang paghingi ng tulong ay nagpapakita ng lakas at kamalayan sa sarili.",
  "This is a common myth. Struggling with mental health is not a weakness; it's a medical condition, and reaching out takes real courage.": "Ito ay mito. Ang pakikipaglaban sa mental health ay hindi kahinaan kundi kondisyong medikal, at ang paglapit ay nangangailangan ng lakas ng loob.",
  "Correct. Tolerance just means your brain is struggling to feel the effects, which heavily increases the risk of organ damage.": "Tama. Ang tolerance ay nangangahulugang nahihirapan ang utak na maramdaman ang epekto, kaya tumataas ang panganib ng pinsala sa organ.",
  "Try looking at it this way: tolerance just means your body needs more of the substance to feel it, which actually increases the risk of severe organ damage.": "Ang tolerance ay nangangahulugang kailangan ng katawan ang mas marami upang maramdaman ito, na nagpapataas sa panganib ng malubhang pinsala sa organ.",
  "Even occasional use can lead to dependence — addiction risk depends on the substance, dosage, and individual factors, not just frequency.": "Kahit ang paminsan-minsang paggamit ay maaaring magdulot ng adiksyon — ang panganib ay depende sa uri ng gamot, dami, at personal na salik.",
  "Actually, this is a myth — occasional use still carries addiction risk.": "Sa katunayan, ito ay mito — ang paminsan-minsang paggamit ay may panganib pa rin ng adiksyon.",
  "Vape aerosol contains nicotine, chemicals, and metals — not just water vapor — and can harm developing lungs.": "Ang aerosol ng vape ay naglalaman ng nicotine, mga kemikal, at metal — hindi lamang usok ng tubig — at maaaring makasira sa lumalaking baga.",
  "This is a myth — vape aerosol contains harmful substances beyond water vapor.": "Ito ay mito — ang aerosol ng vape ay naglalaman ng mga mapanganib na sangkap bukod sa usok ng tubig.",
  "Open conversations about mental health help normalize seeking support and reduce shame around it.": "Ang bukas na talakayan tungkol sa mental health ay nakakatulong na gawing normal ang paghingi ng tulong at bawasan ang hiya.",
  "Actually, this is a fact — open dialogue helps reduce stigma.": "Sa katunayan, ito ay katotohanan — ang bukas na talakayan ay nakakatulong na mabawasan ang stigma.",

  // Quiz Questions & Options
  "Which response is the safest when someone pressures you to try an illegal drug?": "Ano ang pinakaligtas na tugon kapag pinilit ka ng iba na sumubok ng bawal na gamot?",
  "Say no clearly, move away, and message a trusted person": "Mag-hindi nang malinaw, lumayo, at mag-message sa pinagkakatiwalaang tao",
  "Stay quiet and hope they stop asking": "Manahimik na lamang at umasang hihinto sila sa pagtatanong",
  "Try it once so they stop pressuring you": "Subukan ito nang isang beses upang hindi ka na nila pilitin",
  "Spot on. Saying a clear no, moving away, and messaging someone safe is the best exit strategy.": "Tumpak. Ang malinaw na pag-hindi, paglayo, at pag-message sa taong ligtas ang pinakamahusay na paraan ng pag-alis.",
  "Not quite. The safest strategy is to say no clearly, remove yourself from the situation, and reach out to someone you trust.": "Hindi masyado. Ang pinakaligtas na paraan ay mag-hindi nang malinaw, umalis sa sitwasyon, at lumapit sa taong pinagkakatiwalaan.",

  "What is one healthy way to handle a craving, panic wave, or intense urge?": "Ano ang isang malusog na paraan upang harapin ang matinding pagnanasa o panic wave?",
  "Name the feeling, breathe slowly, and contact support": "Tukuyin ang nararamdaman, huminga nang dahan-dahan, at kontakin ang suporta",
  "Wait it out alone without telling anyone": "Hintayin itong lumipas nang mag-isa nang walang sinasabihan",
  "Scroll online until it disappears": "Mag-scroll online hanggang sa ito ay mawala",
  "Exactly. Naming the feeling, taking slow breaths, and contacting support helps you ride out the wave safely.": "Tumpak. Ang pagtukoy sa nararamdaman, paghinga nang dahan-dahan, at pakikipag-ugnayan sa suporta ay makakatulong sa iyo na malampasan ito nang ligtas.",
  "Try this instead: naming the feeling, breathing slowly, and reaching out to your support system is a much safer way to handle intense urges.": "Subukan ito: ang pagtukoy sa nararamdaman, paghinga nang dahan-dahan, at pakikipag-ugnayan sa suporta ay mas ligtas na paraan ng pagharap.",

  "A friend offers you an e-cigarette at a party and won't take no for an answer. What is the safest exit strategy?": "Inalok ka ng kaibigan ng e-cigarette sa isang party at ayaw tanggapin ang \"hindi\". Ano ang pinakaligtas na paraan ng pag-alis?",
  "Make an excuse that you need to make a call, and leave the area": "Magdahilan na kailangang tumawag sa telepono, at umalis sa lugar",
  "Take one puff so they leave you alone": "Hithit nang isang beses upang iwanan ka na nila",
  "Get angry and start an argument with them": "Magalit at makipagtalo sa kanila",
  "Great answer. Making a quick excuse and leaving the area safely removes you from the pressure without escalating the situation.": "Magandang sagot. Ang mabilis na pagdadahilan at pag-alis sa lugar ay ligtas na maglalayo sa iyo sa pressure nang hindi nagpapalala ng sitwasyon.",
  "Actually, the safest approach is to make a quick excuse to leave the area. This removes you from the situation without starting an argument.": "Sa katunayan, ang pinakaligtas na paraan ay magdahilan upang umalis sa lugar nang hindi nakikipagtalo.",

  "Which of the following is considered a healthy coping mechanism when you are feeling overwhelmed by schoolwork?": "Alin sa mga sumusunod ang malusog na paraan ng pagharap kapag ikaw ay napapagod sa mga gawain sa paaralan?",
  "Taking a 15-minute walk and doing breathing exercises": "Maglakad nang 15 minuto at gumawa ng mga ehersisyo sa paghinga",
  "Drinking multiple energy drinks to stay up all night": "Uminom ng maraming energy drink upang magpuyat buong gabi",
  "Ignoring the assignments until the last minute": "Balewalain ang mga asignatura hanggang sa huling sandali",
  "Right. Stepping away to breathe and reset lowers your body's stress levels and actually improves your focus.": "Tama. Ang paghinto upang huminga at mag-reset ay nagpapababa ng stress at nagpapabuti sa iyong focus.",
  "Not quite. A healthier approach is taking a short walk and doing breathing exercises. It resets your stress levels and helps you focus better later.": "Hindi masyado. Ang mas malusog na paraan ay maglakad nang sandali at gumawa ng ehersisyo sa paghinga.",

  "What should you do if you notice a friend is suddenly withdrawing from activities they used to love and acting unusually secretive?": "Ano ang dapat mong gawin kung napansin mong lumalayo ang kaibigan sa mga libangan at umaasal na may itinatago?",
  "Reach out privately to ask how they are doing and listen without judgment": "Makipag-usap nang pribado upang kamustahin sila at makinig nang walang husga",
  "Assume they are just busy and ignore it": "Ipagpalagay na abala lamang sila at balewalain ito",
  "Tell other people about their strange behavior": "Ibalita sa ibang tao ang kanilang kakaibang asal",
  "Absolutely. Reaching out privately with empathy shows you care and creates a safe space for them to open up.": "Tumpak. Ang pakikipag-usap nang pribado nang may empatiya ay nagpapakita na ikaw ay nagmamalasakit at lumilikha ng ligtas na espasyo para magbukas sila.",
  "A better approach is to reach out privately and listen without judgment. Showing empathy creates a safe space for them to share what's going on.": "Mas mabuti na makipag-usap nang pribado at makinig nang walang husga upang magkaroon ng ligtas na espasyo para ibahagi ang nangyayari.",

  "True or False: Mixing energy drinks with alcohol reduces the intoxicating effects of the alcohol.": "Tama o Mali: Ang paghahalo ng energy drink at alak ay nagpapababa sa epekto ng alak.",
  "True, the caffeine cancels out the alcohol": "Tama, kinakansela ng caffeine ang alak",
  "False, it only masks the effects, making you feel less drunk than you are": "Mali, itinatago lamang nito ang epekto, kaya parang hindi ka gaanong lasing",
  "True, it speeds up your metabolism": "Tama, pinabibilis nito ang iyong metabolismo",
  "Correct. Caffeine only masks the depressant effects, making you feel less drunk than you are, which can lead to dangerous overconsumption.": "Tama. Ang caffeine ay nagtatago lamang ng epekto ng alak, kaya parang hindi ka lasing, na maaaring magdulot ng labis na pag-inom.",
  "Actually, it's false. Caffeine just masks the depressant effects of alcohol, which makes you feel artificially alert and increases the risk of dangerous overconsumption.": "Sa katunayan, ito ay mali. Ang caffeine ay nagtatago lamang ng epekto ng alak, na nagpaparamdam na ikaw ay gising kahit lasing, kaya tumataas ang panganib.",

  "When practicing the 4-7-8 breathing technique for anxiety, what does the \"7\" stand for?": "Kapag nagsasagawa ng 4-7-8 breathing para sa kaba, ano ang ibig sabihin ng \"7\"?",
  "Inhale for 7 seconds": "Huminga pailalim nang 7 segundo",
  "Exhale for 7 seconds": "Huminga palabas nang 7 segundo",
  "Hold your breath for 7 seconds": "Pigilan ang paghinga nang 7 segundo",
  "You got it. The calming pattern is: inhale for 4 seconds, hold your breath for 7 seconds, and exhale slowly for 8 seconds.": "Nakuha mo. Ang pattern ay: huminga nang 4 na segundo, pigilan nang 7 segundo, at ibuga nang 8 segundo.",
  "Not quite. The \"7\" stands for holding your breath. The full pattern is: inhale for 4, hold for 7, and exhale slowly for 8 seconds to calm your nervous system.": "Hindi masyado. Ang '7' ay para sa pagpigil ng paghinga. Ang buong pattern ay: huminga nang 4s, pigilin nang 7s, at ibuga nang 8s.",

  "What is one early warning sign of drug misuse in a friend?": "Ano ang isang maagang babala ng maling paggamit ng gamot sa isang kaibigan?",
  "Sudden change in friend groups and behavior": "Biglang pagbabago sa sinasamahang barkada at asal",
  "Getting better grades": "Pagkuha ng mas mataas na grado",
  "Sleeping at normal hours": "Pagtulog sa normal na oras",
  "Eating healthier": "Pagkain nang mas malusog",
  "Sudden changes in social circles, mood, or routine can be early signs worth paying attention to.": "Ang biglaang pagbabago sa kaibigan, mood, o nakasanayan ay mga babalang dapat pansinin.",
  "The correct answer is sudden behavioral and social changes.": "Ang tamang sagot ay ang biglaang pagbabago sa asal at pakikipagkapwa.",

  "Which of these is a healthy way to cope with stress?": "Alin sa mga ito ang malusog na paraan upang harapin ang stress?",
  "Talking to a trusted friend or counselor": "Pakikipag-usap sa isang pinagkakatiwalaang kaibigan o counselor",
  "Bottling it up": "Itago na lamang sa sarili",
  "Avoiding all responsibilities": "Pag-iwas sa lahat ng responsibilidad",
  "Isolating completely": "Ganap na pag-iisa",
  "Talking to someone you trust is a proven way to process stress healthily.": "Ang pakikipag-usap sa pinagkakatiwalaan ay subok na paraan upang harapin ang stress sa malusog na paraan.",
  "The healthiest option here is talking to a trusted friend or counselor.": "Ang pinakamalusog na paraan dito ay pakikipag-usap sa isang pinagkakatiwalaang kaibigan o counselor.",

  // Support / Events
  "Region IV-A Crisis Line": "Crisis Line ng Rehiyon IV-A",
  "School Guidance / BKD Referral": "Referral sa Guidance ng Paaralan / BKD",
  "LGU Prevention Desk": "Prevention Desk ng LGU",
  "For you or a friend": "Para sa iyo o sa isang kaibigan",
  "Nearby programs": "Mga kalapit na programa",
  "Call now": "Tawagan ngayon",
  "Find nearby": "Hanapin sa malapit",
  "Save contact": "I-save ang contact",
  "Sulong Kabataan Calabarzon: Digital Wellness Summit": "Sulong Kabataan Calabarzon: Digital Wellness Summit",
  "Lipa City Peer Support Network: Open House": "Lipa City Peer Support Network: Open House",
  "IDADAIT 2026 Barangay Caravan: Volunteer Facilitators": "IDADAIT 2026 Barangay Caravan: Volunteer Facilitators",
  "Next Saturday": "Susunod na Sabado",
  "Thursday": "Huwebes",
  "June 26": "Hunyo 26",
  "Batangas City Convention Center": "Batangas City Convention Center",
  "Online - Zoom": "Online - Zoom",
  "Calamba, Laguna": "Calamba, Laguna",
  "Youth Summit": "Youth Summit",
  "Online Webinar": "Online Webinar",
  "Volunteer": "Volunteer",

  // Deployment Steps
  "School / BKD": "Paaralan / BKD",
  "Barangay / SK": "Barangay / SK",
  "Regional view": "Panrehiyong Pananaw",
  "QR onboarding during orientation.": "QR onboarding sa panahon ng oryentasyon.",
  "Local events and help paths.": "Mga lokal na kaganapan at tulong.",
  "Aggregate stats only.": "Pinagsama-samang istatistika lamang."
};

const MONTHS_FILIPINO = {
  "January": "Enero",
  "February": "Pebrero",
  "March": "Marso",
  "April": "Abril",
  "May": "Mayo",
  "June": "Hunyo",
  "July": "Hulyo",
  "August": "Agosto",
  "September": "Setyembre",
  "October": "Oktubre",
  "November": "Nobyembre",
  "December": "Disyembre"
};

function translateDOM(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let text = node.nodeValue.trim();
    if (!text) return;

    // Exact match
    if (TRANSLATIONS[text]) {
      node.nodeValue = node.nodeValue.replace(text, TRANSLATIONS[text]);
      return;
    }

    // Dynamic month labels e.g. "Hunyo 2026"
    for (let key in MONTHS_FILIPINO) {
      if (text.startsWith(key)) {
        node.nodeValue = node.nodeValue.replace(key, MONTHS_FILIPINO[key]);
        return;
      }
    }

    // Dynamic matching 1: Hi <name>. Build one safer habit today.
    if (text.startsWith("Hi ") && text.endsWith(". Build one safer habit today.")) {
      const name = text.slice(3, -30);
      node.nodeValue = `Kumusta ${name}. Bumuo ng isang mas ligtas na gawi ngayon.`;
      return;
    }

    // Dynamic matching 2: <num>-Day Streak: <badge>
    const streakRegex = /^(\d+)-Day Streak:\s*(.*)$/;
    const match = text.match(streakRegex);
    if (match) {
      const days = match[1];
      const badge = match[2];
      const translatedBadge = TRANSLATIONS[badge] || badge;
      node.nodeValue = `${days}-Araw na Streak: ${translatedBadge}`;
      return;
    }

    // Dynamic matching 3: Journal on 7 different days (<num>/7 so far)
    if (text.startsWith("Journal on 7 different days (")) {
      const parts = text.match(/\d+\/7/);
      if (parts) {
        node.nodeValue = `Mag-journal sa 7 magkakaibang araw (${parts[0]} sa ngayon)`;
        return;
      }
    }

    // Dynamic matching 4: <num> more day/days (with optional leading dash/dash-space)
    if (text.includes("more")) {
      const match = text.match(/^(?:—\s*|-\s*)?(\d+)\s+more\s+(.*)$/i);
      if (match) {
        const number = match[1];
        const type = match[2].trim();
        let transType = type;
        if (type.endsWith("myths")) transType = "pang mito";
        else if (type.endsWith("quiz questions")) transType = "pang tanong sa pagsusulit";
        else if (type.endsWith("correct myths")) transType = "pang tamang sagot sa mito";
        else if (type.endsWith("correct quiz answers")) transType = "pang tamang sagot sa pagsusulit";
        else if (type.endsWith("journal days")) transType = "pang araw ng pag-journal";
        else if (type.endsWith("days") || type.endsWith("day")) transType = "pang araw";
        
        node.nodeValue = node.nodeValue.replace(/\d+\s+more\s+.*$/i, `${number} ${transType}`);
        return;
      }
    }

    // Dynamic matching 5: <num> more myths/questions
    if (text.includes(" more ")) {
      const number = text.match(/^\d+/);
      if (number) {
        if (text.endsWith("myths")) {
          node.nodeValue = `${number[0]} pang mito`;
        } else if (text.endsWith("quiz questions")) {
          node.nodeValue = `${number[0]} pang tanong sa pagsusulit`;
        } else if (text.endsWith("correct myths")) {
          node.nodeValue = `${number[0]} pang tamang sagot sa mito`;
        } else if (text.endsWith("correct quiz answers")) {
          node.nodeValue = `${number[0]} pang tamang sagot sa pagsusulit`;
        } else if (text.endsWith("journal days")) {
          node.nodeValue = `${number[0]} pang araw ng pag-journal`;
        }
        return;
      }
    }

    // Dynamic matching 6: Next: <badge> - <progress>
    if (text.startsWith("Next: ")) {
      const nextParts = text.slice(6).split(" — ");
      if (nextParts.length === 2) {
        const badgeName = nextParts[0].trim();
        const prog = nextParts[1].trim();
        const transBadge = TRANSLATIONS[badgeName] || badgeName;
        let transProg = TRANSLATIONS[prog] || prog;
        const number = prog.match(/^\d+/);
        if (number) {
          if (prog.endsWith("more day") || prog.endsWith("more days")) {
            transProg = `${number[0]} pang araw`;
          } else if (prog.endsWith("more myths")) {
            transProg = `${number[0]} pang mito`;
          } else if (prog.endsWith("more quiz questions")) {
            transProg = `${number[0]} pang tanong sa pagsusulit`;
          } else if (prog.endsWith("more correct myths")) {
            transProg = `${number[0]} pang tamang sagot sa mito`;
          } else if (prog.endsWith("more correct quiz answers")) {
            transProg = `${number[0]} pang tamang sagot sa pagsusulit`;
          } else if (prog.endsWith("more journal days")) {
            transProg = `${number[0]} pang araw ng pag-journal`;
          }
        }
        node.nodeValue = `Susunod: ${transBadge} — ${transProg}`;
      }
      return;
    }

    // Dynamic matching 7: Wrapped card parts
    if (text.includes("cleared") || text.includes("answered") || text.includes("joined") || text.includes("saved") || text.includes("done") || text.includes("this month.")) {
      let trans = node.nodeValue
        .replace(/myths? cleared/g, "mito ang nalutas")
        .replace(/quiz questions? answered/g, "tanong sa pagsusulit ang nasagot")
        .replace(/events? joined/g, "kaganapan ang pinasukan")
        .replace(/support resources? saved/g, "support resource ang nai-save")
        .replace(/self check-in done/g, "self check-in ang natapos")
        .replace(/this month\./g, "ngayong buwan.")
        .replace(/\band\b/g, "at");
      node.nodeValue = trans;
      return;
    }

    // Dynamic matching 8: <num>/4 today
    const xOfFourTodayRegex = /^(\d+)\/4\s+today$/i;
    const matchXOfFour = text.match(xOfFourTodayRegex);
    if (matchXOfFour) {
      node.nodeValue = `${matchXOfFour[1]}/4 ngayong araw`;
      return;
    }

    // Dynamic matching 9: +<num> XP earned today
    const xpRegex = /^\+(\d+)\s+XP\s+earned\s+today$/i;
    const matchXp = text.match(xpRegex);
    if (matchXp) {
      node.nodeValue = `+${matchXp[1]} XP ang nakuha ngayong araw`;
      return;
    }

    // Dynamic matching 10: Cycle <num> - <num>s per cycle
    const cycleRegex = /^Cycle\s+(\d+)\s+-\s+(\d+)s\s+per\s+cycle$/i;
    const matchCycle = text.match(cycleRegex);
    if (matchCycle) {
      node.nodeValue = `Cycle ${matchCycle[1]} - ${matchCycle[2]}s bawat cycle`;
      return;
    }

    // Dynamic matching 11: <num>s per cycle
    const secsPerCycleRegex = /^(\d+)s\s+per\s+cycle$/i;
    const matchSecs = text.match(secsPerCycleRegex);
    if (matchSecs) {
      node.nodeValue = `${matchSecs[1]}s bawat cycle`;
      return;
    }

    // Dynamic matching 12: <num> / 5 correct
    const correctRegex = /^(\d+)\s*\/\s*5\s+correct$/i;
    const matchCorrect = text.match(correctRegex);
    if (matchCorrect) {
      node.nodeValue = `${matchCorrect[1]} / 5 tama`;
      return;
    }

    // Dynamic matching 13: 🔥 Streak: Day <num>
    const streakDayRegex = /^🔥\s+Streak:\s+Day\s+(\d+)$/i;
    const matchStreakDay = text.match(streakDayRegex);
    if (matchStreakDay) {
      node.nodeValue = `🔥 Streak: Araw ${matchStreakDay[1]}`;
      return;
    }

    // Dynamic matching 14: Show all (<num> more)
    const showAllMoreRegex = /^Show\s+all\s+\((\d+)\s+more\)\s*$/i;
    const matchShowAllMore = text.match(showAllMoreRegex);
    if (matchShowAllMore) {
      node.nodeValue = `Ipakita lahat (${matchShowAllMore[1]} pa)`;
      return;
    }

    // Dynamic matching 15: Call <num> now
    const callNumNowRegex = /^Call\s+(\d+)\s+now$/i;
    const matchCallNum = text.match(callNumNowRegex);
    if (matchCallNum) {
      node.nodeValue = `Tawagan ang ${matchCallNum[1]} ngayon`;
      return;
    }

    // Dynamic matching 16: Badge unlocked: <badge>!
    const badgeUnlockedRegex = /^Badge\s+unlocked:\s+(.*)!$/i;
    const matchBadgeUnlocked = text.match(badgeUnlockedRegex);
    if (matchBadgeUnlocked) {
      const badge = matchBadgeUnlocked[1];
      const transBadge = TRANSLATIONS[badge] || badge;
      node.nodeValue = `Badge na-unlock: ${transBadge}!`;
      return;
    }

    // Dynamic matching 17: Current streak: <num> days
    const currentStreakRegex = /^Current\s+streak:\s+(\d+)\s+days$/i;
    const matchCurrentStreak = text.match(currentStreakRegex);
    if (matchCurrentStreak) {
      node.nodeValue = `Kasalukuyang streak: ${matchCurrentStreak[1]} araw`;
      return;
    }

    // Dynamic matching 18: Private · <num> y/o
    const privateAgeRegex = /^Private\s*·\s*(\d+)\s*y\/o$/i;
    const matchPrivateAge = text.match(privateAgeRegex);
    if (matchPrivateAge) {
      node.nodeValue = `Pribado · ${matchPrivateAge[1]} taong gulang`;
      return;
    }

    // Dynamic matching 19: <num>/<num> unlocked
    const unlockedRegex = /^(\d+)\/(\d+)\s+unlocked$/i;
    const matchUnlocked = text.match(unlockedRegex);
    if (matchUnlocked) {
      node.nodeValue = `${matchUnlocked[1]}/${matchUnlocked[2]} na-unlock`;
      return;
    }

    // Dynamic matching 20: <num> days in a row. That kind of consistency is rare and worth protecting.
    if (text.includes("days in a row. That kind of consistency is rare and worth protecting.")) {
      const match = text.match(/^(\d+)\s+days\s+in\s+a\s+row\.\s+That\s+kind\s+of\s+consistency\s+is\s+rare\s+and\s+worth\s+protecting\.$/i);
      if (match) {
        node.nodeValue = `${match[1]} na magkakasunod na araw. Ang ganyang pare-parehong gawi ay bihira at mahalagang alagaan.`;
        return;
      }
    }

    // Dynamic matching 21: <num> days and counting — you've built something real. Keep showing up.
    if (text.includes("days and counting")) {
      const match = text.match(/^(\d+)\s+days\s+and\s+counting\s+—\s+you've\s+built\s+something\s+real\.\s+Keep\s+showing\s+up\.$/i);
      if (match) {
        node.nodeValue = `${match[1]} araw at patuloy pa — nakabuo ka ng isang totoong gawi. Ipagpatuloy ang pagpapakita.`;
        return;
      }
    }

    // Dynamic matching 22: Date and time strings separated by a dot (e.g. Next Saturday · 2:00 PM)
    if (text.includes(" · ")) {
      const parts = text.split(" · ");
      const translatedParts = parts.map(part => {
        const trimmed = part.trim();
        return TRANSLATIONS[trimmed] || trimmed;
      });
      node.nodeValue = node.nodeValue.replace(text, translatedParts.join(" · "));
      return;
    }

  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // Translate placeholders
    if (node.placeholder && TRANSLATIONS[node.placeholder.trim()]) {
      node.placeholder = TRANSLATIONS[node.placeholder.trim()];
    }

    // Don't translate script or style blocks
    if (node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;

    // Recursively translate children
    for (let child of node.childNodes) {
      translateDOM(child);
    }
  }
}

let translationObserver = null;

function translateAndObserve() {
  if (translationObserver) {
    translationObserver.disconnect();
    translationObserver = null;
  }
  if (state.language === 'fil') {
    translateDOM(app);
    translationObserver = new MutationObserver((mutations) => {
      translationObserver.disconnect();
      translateDOM(app);
      translationObserver.observe(app, { childList: true, subtree: true, characterData: true });
    });
    translationObserver.observe(app, { childList: true, subtree: true, characterData: true });
  }
} /* added for app translation toggle — see SRS.md §7.3 */
