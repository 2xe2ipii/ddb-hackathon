/* App orchestration: render routing, delegated events, and startup. */

function render() {
  stopBreathing();
  if (!state.launched) {
    app.innerHTML = launcherHTML();
    icons();
    return;
  }

  const screens = {
    today: todayHTML,
    learn: learnHTML,
    breathe: breatheHTML,
    community: communityHTML,
    profile: profileHTML,
  };
  app.innerHTML = headerHTML() + screens[state.tab]() + navHTML() + '<div class="toast-zone"></div>';
  icons();
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

    case 'pick-mood':
      state.todayMood = el.dataset.mood;
      render();
      setTimeout(() => toast('lock', 'Mood saved privately'), 220);
      break;

    case 'submit-journal': {
      const txt = document.getElementById('reflectInput').value.trim();
      if (!txt) {
        toast('feather', 'Even three words count - give it a try');
        return;
      }
      state.reflection = txt;
      state.journalDone = true;
      state.streak += 1;
      render();
      setTimeout(() => toast('flame', `Current streak: ${state.streak} days`), 300);
      break;
    }

    case 'answer-quiz': {
      const quizId = el.dataset.id || QUIZ[state.quizFlowIndex].id;
      state.quizAnswers[quizId] = Number(el.dataset.index);
      stopQuizTimer();
      render();
      setTimeout(() => toast(state.quizAnswers[quizId] === QUIZ[state.quizFlowIndex].answer ? 'check' : 'book-open', 'Quiz explanation unlocked'), 250);
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
      toggleBreathing();
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

function initApp() {
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

  render();
}

function startQuizTimer() {
  stopQuizTimer();
  state.quizTimeLeft = 10;
  quizTimer = setInterval(() => {
    state.quizTimeLeft--;
    
    const pb = document.getElementById('quiz-progress-bar');
    if (pb) {
      pb.style.width = ((state.quizTimeLeft / 10) * 100) + '%';
    }
    const ht = document.getElementById('header-timer-text');
    if (ht) {
      ht.innerText = `0:${state.quizTimeLeft.toString().padStart(2, '0')}`;
    }

    if (state.quizTimeLeft <= 0) {
      stopQuizTimer();
      const q = QUIZ[state.quizFlowIndex];
      state.quizAnswers[q.id] = -1; // Unanswered
      state.quizFlowIndex++;
      if (state.quizFlowIndex < 5) {
        startQuizTimer();
      } else {
        setTimeout(() => toast('badge-check', 'Daily quiz finished'), 250);
      }
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

initApp();
