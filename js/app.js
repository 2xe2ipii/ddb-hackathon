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
      if (state.quizOpened) state.mythOpened = false;
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
      const quizId = el.dataset.id || QUIZ[0].id;
      state.quizAnswers[quizId] = Number(el.dataset.index);
      render();
      setTimeout(() => toast(state.quizAnswers[quizId] === QUIZ[0].answer ? 'check' : 'book-open', 'Quiz explanation unlocked'), 250);
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

function initApp() {
  initDeviceFrame();
  app.addEventListener('click', handleAppClick);
  render();
}

initApp();
