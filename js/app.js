/* App orchestration: render routing, delegated events, and startup. */

let lastRenderedTab = null;

function render() {
  const oldScreen = document.querySelector('.screen, .breathe-screen');
  const scrollTop = oldScreen ? oldScreen.scrollTop : 0;

  stopBreathing();
  if (!state.launched) {
    app.innerHTML = launcherHTML();
    icons();
    if (typeof saveState === 'function') saveState();
    return;
  }

  const screens = {
    today: todayHTML,
    learn: learnHTML,
    relax: relaxHTML,
    community: communityHTML,
    profile: profileHTML,
  };
  app.innerHTML = headerHTML() + screens[state.tab]() + navHTML() + '<div class="toast-zone"></div>';
  if (typeof translateAndObserve === 'function') { /* added for app translation toggle — see SRS.md §7.3 */
    translateAndObserve();
  }
  icons();

  const newScreen = document.querySelector('.screen, .breathe-screen');
  if (newScreen && lastRenderedTab === state.tab) {
    newScreen.scrollTop = scrollTop;
  }
  lastRenderedTab = state.tab;

  if (typeof saveState === 'function') saveState();
  if (typeof updateDemoButtonUI === 'function') updateDemoButtonUI();
}

function updateDemoButtonUI() {
  const isDay20 = state.streak >= 20;
  const textEl = document.getElementById('demoStateText');
  if (textEl) {
    textEl.innerText = isDay20 ? 'Day 20+ View' : 'Day 1 View';
  }
}

/* Snapshot the unlocked-badge set before a state mutation that could
   earn a new achievement, then diff it after to fire unlock toasts.
   added for Achievements module — see SRS.md §5.3 */
function snapshotAchievements() {
  return (typeof getUnlockedIds === 'function') ? getUnlockedIds(state) : new Set();
}
function reportAchievements(prevUnlocked) {
  if (typeof checkAchievements === 'function') checkAchievements(prevUnlocked, state);
}

function handleAppClick(e) {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const action = el.dataset.action;

  switch (action) {
    case 'launch-app':
      state.launched = true;
      state.tab = 'today';
      render();
      setTimeout(() => toast('shield-check', 'DDB opened'), 300);
      break;

    case 'nav':
      state.tab = el.dataset.tab;
      render();
      break;

    case 'go-profile':
      state.tab = 'profile';
      render();
      break;

    case 'toggle-theme':
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (state.theme === 'light') {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
      render();
      break;

    case 'toggle-language': /* added for app translation toggle — see SRS.md §7.3 */
      state.language = state.language === 'en' ? 'fil' : 'en';
      render();
      break;

    case 'toggle-quest':
      state.expandedQuest = state.expandedQuest === el.dataset.quest ? null : el.dataset.quest;
      render();
      break;

    /* case 'toggle-badge-hint' removed — Achievements module spec A.2 */

    case 'answer-myth': {
      const prevUnlocked = snapshotAchievements();
      const mythId = el.dataset.id;
      state.mythAnswers[mythId] = el.dataset.answer;
      render();
      const card = MYTH_CARDS.find(m => m.id === mythId);
      if (card && state.mythAnswers[mythId] === card.answer) {
        setTimeout(() => toast('badge-check', 'Knowledge step completed'), 250);
      }
      reportAchievements(prevUnlocked);
      break;
    }

    case 'learn-mode':
      state.learnMode = el.dataset.mode;
      render();
      break;

    case 'toggle-myth':
      state.mythOpened = !state.mythOpened;
      if (state.mythOpened) {
        state.quizOpened = false;
        state.mythFlowIndex = 0;
      }
      render();
      break;

    case 'next-myth': {
      const prevUnlocked = snapshotAchievements();
      state.mythFlowIndex++;
      render();
      reportAchievements(prevUnlocked);
      break;
    }

    case 'close-myth-flow':
      state.mythOpened = false;
      render();
      break;

    case 'toggle-quiz':
      state.quizOpened = !state.quizOpened;
      if (state.quizOpened) {
        state.mythOpened = false;
        if (state.quizFlowIndex < 5 && state.quizAnswers[QUIZ[state.quizFlowIndex].id] === undefined) {
          startQuizTimer();
        }
      } else {
        stopQuizTimer();
      }
      render();
      break;

    case 'close-quiz-flow':
      state.quizOpened = false;
      render();
      break;

    case 'reset-learn-session':
      state.mythFlowIndex = 0;
      state.quizFlowIndex = 0;
      state.mythAnswers = {};
      state.quizAnswers = {};
      state.sessionMythIds = pickSessionItems(MYTH_CARDS, 5);
      state.sessionQuizIds = pickSessionItems(QUIZ, 5);
      const availableMythsReset = MYTH_CARDS.filter(m => !state.sessionMythIds.includes(m.id));
      state.todayMythId = availableMythsReset.length > 0 ? availableMythsReset[Math.floor(Math.random() * availableMythsReset.length)].id : MYTH_CARDS[0].id;
      render();
      break;

    case 'pick-mood':
      state.todayMood = el.dataset.mood;
      render();
      setTimeout(() => toast('lock', 'Mood saved privately'), 220);
      break;

    case 'submit-journal': {
      const txt = document.getElementById('reflectInput').value.trim();
      const words = txt.split(/\s+/).filter(w => w.length > 0);
      if (words.length < 3) {
        toast('feather', 'Even three words count - give it a try');
        return;
      }
      const prevUnlocked = snapshotAchievements();
      state.reflection = txt;
      if (!state.journalDone) {
        state.journalDone = true;
        state.journalDaysCount = (state.journalDaysCount || 0) + 1;
        state.streak += 1;
        setTimeout(() => toast('flame', `Current streak: ${state.streak} days`), 300);
      } else {
        setTimeout(() => toast('feather', 'Reflection updated'), 300);
      }
      render();
      reportAchievements(prevUnlocked);
      break;
    }

    case 'answer-quiz': {
      const prevUnlocked = snapshotAchievements();
      const quizId = el.dataset.id || QUIZ[state.quizFlowIndex].id;
      state.quizAnswers[quizId] = Number(el.dataset.index);
      stopQuizTimer();
      render();
      reportAchievements(prevUnlocked);
      break;
    }

    case 'next-quiz': {
      const prevUnlocked = snapshotAchievements();
      state.quizFlowIndex++;
      if (state.quizFlowIndex < 5) {
        startQuizTimer();
      } else {
        setTimeout(() => toast('badge-check', 'Daily quiz finished'), 250);
      }
      render();
      reportAchievements(prevUnlocked);
      break;
    }

    case 'toggle-breathe':
      if (typeof toggleBreathing === 'function') toggleBreathing();
      break;

    case 'start-checkin':
      state.relaxCheckinState = 'in_progress';
      state.relaxCheckinIndex = 0;
      state.relaxCheckinAnswers = {};
      render();
      break;

    case 'answer-checkin': {
      const prevUnlocked = snapshotAchievements();
      const score = parseInt(el.dataset.score, 10);
      state.relaxCheckinAnswers[state.relaxCheckinIndex] = score;

      // Auto advance
      if (state.relaxCheckinIndex < 3) {
        state.relaxCheckinIndex++;
      } else {
        // finished
        state.relaxCheckinState = 'completed';

        // Calculate score and assign exercise
        let total = 0;
        for (let i = 0; i < 4; i++) {
          total += state.relaxCheckinAnswers[i] || 0;
        }
        if (total <= 2) {
          state.relaxSelectedExercise = 'coherent';
        } else if (total <= 5) {
          state.relaxSelectedExercise = 'box';
        } else if (total <= 8) {
          state.relaxSelectedExercise = 'box';
        } else {
          state.relaxSelectedExercise = '478';
        }
      }
      render();
      reportAchievements(prevUnlocked);
      break;
    }

    case 'retake-checkin':
      state.relaxCheckinState = 'not_started';
      state.relaxCheckinAnswers = {};
      state.relaxCheckinIndex = 0;
      render();
      break;

    case 'select-exercise':
      state.relaxSelectedExercise = el.dataset.exercise;
      if (typeof stopBreathing === 'function') stopBreathing();
      render();
      break;

    case 'toggle-toolkit':
      const tkId = el.dataset.id;
      if (state.relaxToolkitOpen === tkId) {
        state.relaxToolkitOpen = null;
      } else {
        state.relaxToolkitOpen = tkId;
      }
      render();
      break;

    case 'helpline':
      openHelpline();
      break;

    case 'save-resource': {
      const prevUnlocked = snapshotAchievements();
      state.savedSupport.add(el.dataset.resource);
      render();
      setTimeout(() => toast('bookmark-check', 'Support resource saved'), 220);
      reportAchievements(prevUnlocked);
      break;
    }

    case 'register': {
      const id = el.dataset.event;
      if (state.registered.has(id)) return;
      const prevUnlocked = snapshotAchievements();
      state.registered.add(id);
      render();
      setTimeout(() => toast('ticket', 'Registered'), 250);
      reportAchievements(prevUnlocked);
      break;
    }

    case 'delete-data':
      /* added for Profile/Achievements module — see implementation_plan.md */
      const deleteConfirmMsg = state.language === 'fil'
        ? "Sigurado ka bang gusto mong burahin ang lahat ng iyong data? I-re-reset nito ang iyong streak at mga nakamit."
        : "Are you sure you want to delete all your data? This will reset your streak and achievements.";
      if (confirm(deleteConfirmMsg)) {
        Object.assign(state, defaultState);
        state.launched = true;
        state.tab = 'today';
        state.registered = new Set();
        state.savedSupport = new Set();
        state.mythAnswers = {};
        state.quizAnswers = {};
        state.journalDaysCount = 0;
        state.relaxCheckinState = 'not_started';
        state.relaxCheckinAnswers = {};
        state.relaxCheckinIndex = 0;
        state.relaxSelectedExercise = 'box';
        state.relaxToolkitOpen = null;
        state.achievementsExpanded = false;
        state.sessionMythIds = pickSessionItems(MYTH_CARDS, 5);
        state.sessionQuizIds = pickSessionItems(QUIZ, 5);
        const availableMythsRestart = MYTH_CARDS.filter(m => !state.sessionMythIds.includes(m.id));
        state.todayMythId = availableMythsRestart.length > 0 ? availableMythsRestart[Math.floor(Math.random() * availableMythsRestart.length)].id : MYTH_CARDS[0].id;
        localStorage.removeItem('ddb_state');

        document.body.classList.remove('light-theme');
        applyTextSizeClass();
        applyColorblindClass();
        stopQuizTimer();
        if (typeof stopBreathing === 'function') stopBreathing();

        render();
        setTimeout(() => toast('rotate-ccw', 'All data deleted. Reset to Today.'), 300);
      }
      break;

    case 'toggle-achievements-expand':
      state.achievementsExpanded = !state.achievementsExpanded;
      render();
      break;

    case 'share-ig':
      toast('instagram', 'Advocacy story template ready');
      break;

    case 'toggle-text-size':
      /* added for Profile/Accessibility module — see implementation_plan.md */
      if (state.textSize === 'medium' || !state.textSize) {
        state.textSize = 'large';
      } else if (state.textSize === 'large') {
        state.textSize = 'small';
      } else {
        state.textSize = 'medium';
      }
      applyTextSizeClass();
      render();
      break;

    case 'toggle-colorblind':
      /* added for Profile/Accessibility module — see implementation_plan.md */
      state.colorblindMode = !state.colorblindMode;
      applyColorblindClass();
      render();
      break;

    case 'open-share-impact':
      /* added for Profile/Achievements module — see implementation_plan.md */
      state.shareModalOpen = true;
      render();
      break;

    case 'close-share-overlay':
      /* added for Profile/Achievements module — see implementation_plan.md */
      if (e.target === el) {
        state.shareModalOpen = false;
        render();
      }
      break;

    case 'close-share-impact':
      /* added for Profile/Achievements module — see implementation_plan.md */
      state.shareModalOpen = false;
      render();
      break;

    case 'save-story-image':
      /* added for Profile/Achievements module — see implementation_plan.md */
      toast('download', 'Saving Impact Card to device...');
      setTimeout(() => toast('badge-check', 'Image saved successfully!'), 1200);
      break;

    case 'share-story-instagram':
      /* added for Profile/Achievements module — see implementation_plan.md */
      toast('instagram', 'Opening Instagram Stories...');
      setTimeout(() => toast('sparkles', 'Story template shared!'), 1000);
      break;

    case 'toggle-mood-filter': {
      /* added for Profile/Achievements module — see implementation_plan.md */
      const mood = el.dataset.mood;
      state.selectedMoodFilter = state.selectedMoodFilter === mood ? null : mood;
      render();
      break;
    }

    case 'clear-mood-filter':
      /* added for Profile/Achievements module — see implementation_plan.md */
      state.selectedMoodFilter = null;
      render();
      break;

    case 'filter-achievement-category':
      /* added for Profile/Achievements module — see implementation_plan.md */
      const cat = el.dataset.cat;
      state.achievementCategoryFilter = (cat === 'all' || state.achievementCategoryFilter === cat) ? null : cat;
      state.achievementsExpanded = false; // reset expand when changing filter
      render();
      break;

    case 'edit-profile':
      /* added for Profile/Achievements module — see implementation_plan.md */
      state.profileEditing = true;
      render();
      break;

    case 'close-edit-profile':
      /* added for Profile/Achievements module — see implementation_plan.md */
      delete window.tempProfilePic;
      state.profileEditing = false;
      render();
      break;

    case 'save-edit-profile': {
      /* added for Profile/Achievements module — see implementation_plan.md */
      const nameVal = document.getElementById('editNameInput').value.trim();
      const ageVal = parseInt(document.getElementById('editAgeInput').value.trim(), 10);
      if (nameVal.length === 0) {
        toast('user', 'Name cannot be empty');
        return;
      }
      if (isNaN(ageVal) || ageVal < 1 || ageVal > 120) {
        toast('user', 'Please enter a valid age (1-120)');
        return;
      }
      state.profileName = nameVal;
      state.profileAge = ageVal;
      if (window.tempProfilePic) {
        state.profilePic = window.tempProfilePic;
        delete window.tempProfilePic;
      }
      state.profileEditing = false;
      render();
      setTimeout(() => toast('badge-check', 'Profile updated!'), 200);
      break;
    }
  }
}

const swipeState = { isDragging: false, startX: 0, currentX: 0, cardEl: null, mythId: null };

function pickSessionItems(pool, count) {
  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(item => item.id);
}

function initApp() {
  if (!state.sessionMythIds || state.sessionMythIds.length === 0) {
    state.sessionMythIds = pickSessionItems(MYTH_CARDS, 5);
    state.sessionQuizIds = pickSessionItems(QUIZ, 5);
  }
  if (!state.todayMythId) {
    const availableMythsInit = MYTH_CARDS.filter(m => !(state.sessionMythIds || []).includes(m.id));
    state.todayMythId = availableMythsInit.length > 0 ? availableMythsInit[Math.floor(Math.random() * availableMythsInit.length)].id : MYTH_CARDS[0].id;
  }
  if (state.theme === 'light') {
    document.body.classList.add('light-theme');
  } else {
    document.body.classList.remove('light-theme');
  }
  applyTextSizeClass(); /* added for Accessibility enhancements — see implementation_plan.md */
  applyColorblindClass(); /* added for Accessibility enhancements — see implementation_plan.md */
  initDeviceFrame();
  app.addEventListener('click', handleAppClick);

  app.addEventListener('pointerdown', (e) => {
    const card = e.target.closest('.myth-card[data-swipeable="true"]');
    if (!card || e.target.closest('button')) return;

    swipeState.isDragging = true;
    swipeState.startX = e.clientX;
    swipeState.currentX = e.clientX;
    swipeState.cardEl = card;
    swipeState.mythId = card.dataset.id;
    card.style.transition = 'none';
    card.setPointerCapture(e.pointerId);
  });

  app.addEventListener('pointermove', (e) => {
    if (!swipeState.isDragging || !swipeState.cardEl) return;
    swipeState.currentX = e.clientX;
    const deltaX = swipeState.currentX - swipeState.startX;
    const rotate = deltaX * 0.05;
    swipeState.cardEl.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
  });

  const endSwipe = (e) => {
    if (!swipeState.isDragging || !swipeState.cardEl) return;
    swipeState.isDragging = false;

    const deltaX = swipeState.currentX - swipeState.startX;
    const threshold = 100;

    if (Math.abs(deltaX) > threshold) {
      const prevUnlocked = snapshotAchievements();
      const answer = deltaX > 0 ? 'fact' : 'myth';
      state.mythAnswers[swipeState.mythId] = answer;

      swipeState.cardEl.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
      swipeState.cardEl.style.transform = `translateX(${deltaX > 0 ? 300 : -300}px) rotate(${deltaX * 0.1}deg)`;
      swipeState.cardEl.style.opacity = '0';

      setTimeout(() => {
        render();
        const mCard = MYTH_CARDS.find(m => m.id === swipeState.mythId);
        if (mCard && answer === mCard.answer) {
          setTimeout(() => toast('badge-check', 'Knowledge step completed'), 250);
        }
        reportAchievements(prevUnlocked);
      }, 300);
    } else {
      swipeState.cardEl.style.transition = 'transform 0.3s ease-out';
      swipeState.cardEl.style.transform = 'translateX(0) rotate(0)';
    }
    swipeState.cardEl = null;
    swipeState.mythId = null;
  };

  app.addEventListener('pointerup', endSwipe);
  app.addEventListener('pointercancel', endSwipe);

  const restartAppHandler = () => {
    Object.assign(state, defaultState);
    state.registered = new Set();
    state.savedSupport = new Set();
    state.mythAnswers = {};
    state.quizAnswers = {};
    state.journalDaysCount = 0;
    state.relaxCheckinState = 'not_started';
    state.relaxCheckinAnswers = {};
    state.relaxCheckinIndex = 0;
    state.relaxSelectedExercise = 'box';
    state.relaxToolkitOpen = null;
    state.achievementsExpanded = false;
    state.sessionMythIds = pickSessionItems(MYTH_CARDS, 5);
    state.sessionQuizIds = pickSessionItems(QUIZ, 5);
    const availableMythsRestart = MYTH_CARDS.filter(m => !state.sessionMythIds.includes(m.id));
    state.todayMythId = availableMythsRestart.length > 0 ? availableMythsRestart[Math.floor(Math.random() * availableMythsRestart.length)].id : MYTH_CARDS[0].id;
    localStorage.removeItem('ddb_state');

    document.body.classList.remove('light-theme');
    applyTextSizeClass(); /* added for Accessibility enhancements — see implementation_plan.md */
    applyColorblindClass(); /* added for Accessibility enhancements — see implementation_plan.md */
    stopQuizTimer();
    if (typeof stopBreathing === 'function') stopBreathing();
    render();
    setTimeout(() => toast('rotate-ccw', 'Application restarted'), 300);

    const fabMenu = document.getElementById('fabMenu');
    if (fabMenu) fabMenu.classList.remove('open');
  };

  const restartBtn = document.getElementById('btnRestartApp');
  if (restartBtn) {
    restartBtn.addEventListener('click', restartAppHandler);
  }

  const fabRestartBtn = document.getElementById('fabBtnRestartApp');
  if (fabRestartBtn) {
    fabRestartBtn.addEventListener('click', restartAppHandler);
  }

  const toggleDemoHandler = () => {
    const isDay20 = state.streak >= 20;
    if (isDay20) {
      // Reset state back to default but keep it launched on the profile tab
      Object.assign(state, defaultState);
      state.launched = true;
      state.tab = 'profile';
      state.registered = new Set();
      state.savedSupport = new Set();
      state.mythAnswers = {};
      state.quizAnswers = {};
      state.journalDaysCount = 0;
      state.relaxCheckinState = 'not_started';
      state.relaxCheckinAnswers = {};
      state.relaxCheckinIndex = 0;
      state.relaxSelectedExercise = 'box';
      state.relaxToolkitOpen = null;
      state.achievementsExpanded = false;
      state.sessionMythIds = pickSessionItems(MYTH_CARDS, 5);
      state.sessionQuizIds = pickSessionItems(QUIZ, 5);
      const availableMythsRestart = MYTH_CARDS.filter(m => !state.sessionMythIds.includes(m.id));
      state.todayMythId = availableMythsRestart.length > 0 ? availableMythsRestart[Math.floor(Math.random() * availableMythsRestart.length)].id : MYTH_CARDS[0].id;
      localStorage.removeItem('ddb_state');

      document.body.classList.remove('light-theme');
      applyTextSizeClass(); /* added for Accessibility enhancements — see implementation_plan.md */
      applyColorblindClass(); /* added for Accessibility enhancements — see implementation_plan.md */
      stopQuizTimer();
      if (typeof stopBreathing === 'function') stopBreathing();
      render();
      setTimeout(() => toast('rotate-ccw', 'Reset to Day 1 state'), 300);
    } else {
      // Switch to Day 20+ View
      const prevUnlocked = snapshotAchievements();
      state.streak = 25;
      state.journalDaysCount = 7;
      state.journalDone = true;
      state.relaxCheckinState = 'completed';
      state.savedSupport = new Set(['r1', 'r2', 'r3']);
      state.registered = new Set(['ev1', 'ev2']);
      
      // Populate myths (correct answers)
      state.sessionMythIds = ['m1', 'm2', 'm3', 'm4', 'm5'];
      state.mythAnswers = { m1: 'myth', m2: 'fact', m3: 'fact', m4: 'myth', m5: 'fact' };
      
      // Populate quiz (correct answers)
      state.sessionQuizIds = ['q1', 'q2', 'q3', 'q4', 'q5'];
      state.quizAnswers = { q1: 0, q2: 1, q3: 1, q4: 0, q5: 2 };
      
      render();
      setTimeout(() => toast('sparkles', 'Simulated Day 20+ state loaded!'), 250);
      reportAchievements(prevUnlocked);
    }
  };

  const toggleDemoBtn = document.getElementById('btnToggleDemo');
  if (toggleDemoBtn) {
    toggleDemoBtn.addEventListener('click', toggleDemoHandler);
  }

  const fabToggleDemoBtn = document.getElementById('fabBtnToggleDemo');
  if (fabToggleDemoBtn) {
    fabToggleDemoBtn.addEventListener('click', toggleDemoHandler);
  }

  const fabToggleBtn = document.getElementById('fabToggleBtn');
  const fabMenu = document.getElementById('fabMenu');
  if (fabToggleBtn && fabMenu) {
    fabToggleBtn.addEventListener('click', () => {
      fabMenu.classList.toggle('open');
    });
  }

  render();
}

function startQuizTimer() {
  stopQuizTimer();
  state.quizTimeLeft = 10;
  quizTimer = setInterval(() => {
    state.quizTimeLeft--;

    const ht = document.getElementById('header-timer-text');
    if (ht) {
      ht.innerText = `0:${state.quizTimeLeft.toString().padStart(2, '0')}`;
    }

    if (state.quizTimeLeft <= 0) {
      stopQuizTimer();
      const q = QUIZ[state.quizFlowIndex];
      state.quizAnswers[q.id] = -1; // Unanswered
      render();
    }
  }, 1000);
}

function stopQuizTimer() {
  if (quizTimer) {
    clearInterval(quizTimer);
    quizTimer = null;
  }
}

const RELAX_AFFIRMATIONS = [
  "This feeling is temporary. It will pass.",
  "I am safe right now in this moment.",
  "I can handle this one step at a time.",
  "It is okay to ask for help.",
  "I have gotten through hard moments before.",
  "I am allowed to rest.",
  "I can breathe through this.",
  "I release what I cannot control.",
  "My feelings are valid.",
  "I am doing my best.",
  "I am gentle with myself.",
  "I choose peace over worry."
];
let relaxAffirmationIndex = 0;

setInterval(() => {
  const el = document.getElementById('flashing-affirmation');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => {
      relaxAffirmationIndex = Math.floor(Math.random() * RELAX_AFFIRMATIONS.length);
      el.textContent = RELAX_AFFIRMATIONS[relaxAffirmationIndex];
      el.style.opacity = '1';
    }, 500);
  }
}, 7000);

function applyTextSizeClass() {
  /* added for Accessibility enhancements — see implementation_plan.md */
  document.body.classList.remove('text-size-small', 'text-size-medium', 'text-size-large');
  const size = state.textSize || 'medium';
  document.body.classList.add('text-size-' + size);
}

function applyColorblindClass() {
  /* added for Accessibility enhancements — see implementation_plan.md */
  if (state.colorblindMode) {
    document.body.classList.add('colorblind-mode');
  } else {
    document.body.classList.remove('colorblind-mode');
  }
}

initApp();