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
  icons();

  const newScreen = document.querySelector('.screen, .breathe-screen');
  if (newScreen && lastRenderedTab === state.tab) {
    newScreen.scrollTop = scrollTop;
  }
  lastRenderedTab = state.tab;

  if (typeof saveState === 'function') saveState();
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

    case 'toggle-quest':
      state.expandedQuest = state.expandedQuest === el.dataset.quest ? null : el.dataset.quest;
      render();
      break;

    case 'answer-myth': {
      const mythId = el.dataset.id;
      state.mythAnswers[mythId] = el.dataset.answer;
      render();
      const card = MYTH_CARDS.find(m => m.id === mythId);
      if (card && state.mythAnswers[mythId] === card.answer) {
        setTimeout(() => toast('badge-check', 'Knowledge step completed'), 250);
      }
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

    case 'next-myth':
      state.mythFlowIndex++;
      render();
      break;

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
      state.reflection = txt;
      if (!state.journalDone) {
        state.journalDone = true;
        state.streak += 1;
        setTimeout(() => toast('flame', `Current streak: ${state.streak} days`), 300);
      } else {
        setTimeout(() => toast('feather', 'Reflection updated'), 300);
      }
      render();
      break;
    }

    case 'answer-quiz': {
      const quizId = el.dataset.id || QUIZ[state.quizFlowIndex].id;
      state.quizAnswers[quizId] = Number(el.dataset.index);
      stopQuizTimer();
      render();
      break;
    }

    case 'next-quiz': {
      state.quizFlowIndex++;
      if (state.quizFlowIndex < 5) {
        startQuizTimer();
      } else {
        setTimeout(() => toast('badge-check', 'Daily quiz finished'), 250);
      }
      render();
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

    case 'answer-checkin':
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
      break;

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
      state.savedSupport.add(el.dataset.resource);
      render();
      setTimeout(() => toast('bookmark-check', 'Support resource saved'), 220);
      break;
    }

    case 'register': {
      const id = el.dataset.event;
      if (state.registered.has(id)) return;
      state.registered.add(id);
      render();
      setTimeout(() => toast('ticket', 'Registered'), 250);
      break;
    }

    case 'share-ig':
      toast('instagram', 'Advocacy story template ready');
      break;
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
    state.relaxCheckinState = 'not_started';
    state.relaxCheckinAnswers = {};
    state.relaxCheckinIndex = 0;
    state.relaxSelectedExercise = 'box';
    state.relaxToolkitOpen = null;
    state.sessionMythIds = pickSessionItems(MYTH_CARDS, 5);
    state.sessionQuizIds = pickSessionItems(QUIZ, 5);
    const availableMythsRestart = MYTH_CARDS.filter(m => !state.sessionMythIds.includes(m.id));
    state.todayMythId = availableMythsRestart.length > 0 ? availableMythsRestart[Math.floor(Math.random() * availableMythsRestart.length)].id : MYTH_CARDS[0].id;
    localStorage.removeItem('ddb_state');
    
    document.body.classList.remove('light-theme');
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

initApp();
