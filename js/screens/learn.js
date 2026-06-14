/* Learn tab: learning tasks one at a time. */

function learnHTML() {
  const mythAnsweredCount = Object.keys(state.mythAnswers).length;
  const quizAnsweredCount = Object.keys(state.quizAnswers).length;

  let mythCorrect = 0;
  if (state.sessionMythIds) {
    state.sessionMythIds.forEach(id => {
      const c = MYTH_CARDS.find(m => m.id === id);
      if (c && state.mythAnswers[id] === c.answer) mythCorrect++;
    });
  }

  let quizCorrect = 0;
  if (state.sessionQuizIds) {
    state.sessionQuizIds.forEach(id => {
      const q = QUIZ.find(q => q.id === id);
      if (q && state.quizAnswers[id] === q.answer) quizCorrect++;
    });
  }

  let recapHTML = '';
  if (state.mythFlowIndex >= 5 && state.quizFlowIndex >= 5 && !state.mythOpened && !state.quizOpened) {
    let unlockedMsg = '';
    if (state.streak === 7) unlockedMsg = '"Golden Scales" stage unlocked';
    if (state.streak === 20) unlockedMsg = '"Sword of Truth" stage unlocked';
    if (state.streak === 30) unlockedMsg = '"Flame of Clarity" stage unlocked';

    recapHTML = `
      <div style="margin-top: 24px; padding: 0 16px; padding-bottom: 40px; text-align: left;">
        <h2 style="font-size: 20px; margin-bottom: 16px; text-align: center;">Today's Recap</h2>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--line); font-size: 15px;">
          <span>Myths vs Facts</span>
          <strong>${mythCorrect} / 5 correct</strong>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid var(--line); font-size: 15px;">
          <span>Daily Quiz</span>
          <strong>${quizCorrect} / 5 correct</strong>
        </div>
        <div style="margin-top: 16px;">
          <div style="font-size: 15px; font-weight: bold; margin-bottom: 4px;">🔥 Streak: Day ${state.streak}</div>
          ${unlockedMsg ? `<div style="font-size: 13px; color: var(--teal); margin-bottom: 8px;">${unlockedMsg}</div>` : ''}
        </div>
        <div style="font-size: 16px; font-weight: bold; color: var(--teal); margin-top: 16px; text-align: center;">+${(mythCorrect + quizCorrect) * 10} XP earned today</div>
      </div>
    `;
  }

  const currentMythCard = state.sessionMythIds ? MYTH_CARDS.find(m => m.id === state.sessionMythIds[state.mythFlowIndex < 5 ? state.mythFlowIndex : 0]) : MYTH_CARDS[0];
  const currentQuizCard = state.sessionQuizIds ? QUIZ.find(q => q.id === state.sessionQuizIds[state.quizFlowIndex < 5 ? state.quizFlowIndex : 0]) : QUIZ[0];

  return `
    <style>
      @keyframes flashGlow {
        0% { background-color: transparent; box-shadow: 0 0 0px var(--teal); transform: scale(1); }
        50% { background-color: rgba(20, 184, 166, 0.3); box-shadow: 0 0 15px var(--teal); transform: scale(1.02); }
        100% { background-color: rgba(20, 184, 166, 0.1); box-shadow: 0 0 0px var(--teal); transform: scale(1); }
      }
      @keyframes fadeOutUp {
        0% { opacity: 1; transform: translateY(0); }
        80% { opacity: 1; transform: translateY(-10px); }
        100% { opacity: 0; transform: translateY(-20px); }
      }
      .flash-correct {
        animation: flashGlow 0.8s ease-out;
      }
    </style>
    <div class="screen" style="height: 100%; display: flex; flex-direction: column;">
      ${(!state.mythOpened && !state.quizOpened) ? `
      <div class="greeting" style="margin-bottom: 16px;">
        <h1>Learn</h1>
        <p>Clear 5 misconceptions, then practice one safe choice.</p>
      </div>` : ''}

      ${!state.quizOpened ? `
      <section class="learn-stack" style="flex: ${state.mythOpened ? '1' : 'none'}; display: flex; flex-direction: column; margin-bottom: 16px;">
        <div class="learn-card-head" data-action="toggle-myth" style="${state.mythOpened ? 'cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px; margin-bottom: 16px;' : 'cursor: pointer; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);'}">
          <span style="${state.mythOpened ? 'display: flex; align-items: center; gap: 8px; font-size: 15px;' : 'font-size: 18px; display: flex; align-items: center; gap: 10px; font-weight: 800;'}"><i data-lucide="shield-question" style="${state.mythOpened ? 'width: 20px; height: 20px;' : 'width: 28px; height: 28px;'}"></i> Myths vs facts</span>
          ${!state.mythOpened && mythAnsweredCount < 5 && currentMythCard ? `<div style="font-size: 14px; text-align: center; color: var(--muted); line-height: 1.4; padding: 0 10px;">Today's Myth: "${currentMythCard.statement}"</div>` : ''}
          <b style="${state.mythOpened ? 'font-size: 13px;' : 'font-size: 14px; background: linear-gradient(120deg, var(--teal), #3aa893); color: #07211c; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 8px rgba(69, 196, 176, 0.3);'}">${mythAnsweredCount >= 5 ? 'All 5 completed' : (state.mythOpened ? 'Close' : 'Challenge a Myth')}</b>
        </div>
        ${state.mythOpened ? mythFlowHTML() : ''}
      </section>
      ` : ''}

      ${!state.mythOpened ? `
      <section class="learn-stack" style="flex: ${state.quizOpened ? '1' : 'none'}; display: flex; flex-direction: column;">
        <div class="learn-card-head quiz" data-action="toggle-quiz" style="${state.quizOpened ? 'cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px; margin-bottom: 16px;' : 'cursor: pointer; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);'}">
          <span style="${state.quizOpened ? 'display: flex; align-items: center; gap: 8px; font-size: 15px;' : 'font-size: 18px; display: flex; align-items: center; gap: 10px; font-weight: 800;'}"><i data-lucide="timer" style="${state.quizOpened ? 'width: 20px; height: 20px;' : 'width: 28px; height: 28px;'}"></i> Daily quiz</span>
          ${!state.quizOpened && quizAnsweredCount < 5 && currentQuizCard ? `<div style="font-size: 14px; text-align: center; color: var(--muted); line-height: 1.4; padding: 0 10px;">Today's Question: "${currentQuizCard.question}"</div>` : ''}
          <b style="${state.quizOpened ? 'font-size: 13px;' : 'font-size: 14px; background: linear-gradient(120deg, var(--teal), #3aa893); color: #07211c; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 8px rgba(69, 196, 176, 0.3);'}">${quizAnsweredCount >= 5 ? 'All 5 completed' : (state.quizOpened ? 'Close' : 'Start Daily Quiz')}</b>
        </div>
        ${state.quizOpened ? dailyQuizCardHTML() : ''}
      </section>
      ` : ''}
      
      ${recapHTML}
    </div>`;
}

function mythFlowHTML() {
  if (state.mythFlowIndex >= 5) {
    return `
      <div class="card" style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border-radius: 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); padding: 40px 24px;">
        <div style="width: 64px; height: 64px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <i data-lucide="check-circle" style="width: 32px; height: 32px;"></i>
        </div>
        <h2 style="font-size: 20px; margin-bottom: 12px;">All 5 Cleared!</h2>
        <p style="color: var(--muted); margin-bottom: 32px; font-size: 14px;">You've uncovered the facts. Great job!</p>
        <button class="btn btn-primary" data-action="close-myth-flow" style="width: 100%; padding: 16px; border-radius: 16px; font-size: 14px;">Back to Learn</button>
      </div>
    `;
  }

  const cardId = state.sessionMythIds ? state.sessionMythIds[state.mythFlowIndex] : MYTH_CARDS[state.mythFlowIndex].id;
  const card = MYTH_CARDS.find(m => m.id === cardId);
  const answered = state.mythAnswers[card.id] !== undefined;
  const correct = answered && state.mythAnswers[card.id] === card.answer;

  return `
    <div class="card myth-card" ${!answered ? 'data-swipeable="true" data-id="' + card.id + '"' : ''} style="flex: 1; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-radius: 24px; padding: 24px; position: relative; touch-action: pan-y; transition: transform 0.3s ease, opacity 0.3s ease;">
      ${correct ? '<div class="xp-toast" style="position: absolute; top: 16px; left: 20px; font-size: 14px; font-weight: bold; color: var(--teal); animation: fadeOutUp 1.5s forwards;">[+10 XP]</div>' : ''}
      <div style="position: absolute; top: 16px; right: 20px; font-size: 14px; font-weight: bold; color: var(--muted); opacity: 0.7;">
        ${state.mythFlowIndex + 1} / 5
      </div>
      <div class="card-title" style="font-size: 18px; font-weight: 800; line-height: 1.4; margin-bottom: 32px; margin-top: 16px; text-align: center;">"${card.statement}"</div>
      
      ${!answered ? `
      <div style="text-align: center; color: var(--muted); font-size: 13px; margin-bottom: 24px; display: flex; justify-content: center; align-items: center; gap: 8px;">
        <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
        Swipe Left Myth, Right Fact
        <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
      </div>` : `
      <div class="myth-actions" style="display: flex; flex-direction: column; gap: 16px;">
        <button class="btn ${state.mythAnswers[card.id] === 'myth' ? 'btn-selected' : 'btn-ghost'}" data-action="answer-myth" data-id="${card.id}" data-answer="myth" style="padding: 16px; border-radius: 16px; font-size: 14px; display: flex; justify-content: center; border: 2px solid ${state.mythAnswers[card.id] === 'myth' ? 'var(--primary)' : 'var(--line)'};" disabled>
          <i data-lucide="x" style="margin-right: 8px;"></i> Myth
        </button>
        <button class="btn ${state.mythAnswers[card.id] === 'fact' ? 'btn-selected' : 'btn-ghost'}" data-action="answer-myth" data-id="${card.id}" data-answer="fact" style="padding: 16px; border-radius: 16px; font-size: 14px; display: flex; justify-content: center; border: 2px solid ${state.mythAnswers[card.id] === 'fact' ? 'var(--primary)' : 'var(--line)'};" disabled>
          <i data-lucide="check" style="margin-right: 8px;"></i> Fact
        </button>
      </div>`}

      ${answered ? `
        <div class="answer-panel ${correct ? 'right' : 'wrong'}" style="margin-top: 24px; padding: 20px; border-radius: 16px;">
          <strong style="font-size: 15px; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: ${correct ? 'var(--teal)' : '#e28e8e'};">
            <i data-lucide="${correct ? 'check-circle' : 'x-circle'}" style="width: 20px; height: 20px;"></i>
            ${correct ? 'Correct!' : 'Incorrect'}
          </strong>
          <p style="font-size: 14px; line-height: 1.5;">${correct ? card.explanationCorrect : card.explanationIncorrect}</p>
        </div>
        <button class="btn btn-primary" data-action="next-myth" style="margin-top: 24px; padding: 16px; border-radius: 16px; font-size: 14px; display: flex; justify-content: center; align-items: center; gap: 8px;">
          Next <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
        </button>
      ` : ''}
    </div>`;
}

function dailyQuizCardHTML() {
  if (state.quizFlowIndex >= 5) {
    return `
      <div class="card" style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; border-radius: 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.12); padding: 40px 24px;">
        <div style="width: 64px; height: 64px; background: var(--primary); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
          <i data-lucide="check-circle" style="width: 32px; height: 32px;"></i>
        </div>
        <h2 style="font-size: 20px; margin-bottom: 12px;">Quiz Completed!</h2>
        <p style="color: var(--muted); margin-bottom: 32px; font-size: 14px;">Great job completing your daily quiz.</p>
        <button class="btn btn-primary" data-action="close-quiz-flow" style="width: 100%; padding: 16px; border-radius: 16px; font-size: 14px;">Back to Learn</button>
      </div>
    `;
  }

  const qId = state.sessionQuizIds ? state.sessionQuizIds[state.quizFlowIndex] : QUIZ[state.quizFlowIndex].id;
  const q = QUIZ.find(q => q.id === qId);
  const answered = state.quizAnswers[q.id] !== undefined;
  const correct = answered && state.quizAnswers[q.id] === q.answer;
  const progressPct = (state.quizTimeLeft / 10) * 100;

  return `
    <div class="card quiz-card" style="position: relative; box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-radius: 24px; padding: 24px;">
      ${correct ? '<div class="xp-toast" style="position: absolute; top: 16px; left: 20px; font-size: 14px; font-weight: bold; color: var(--teal); animation: fadeOutUp 1.5s forwards;">[+10 XP]</div>' : ''}
      <div style="position: absolute; top: 16px; right: 20px; font-size: 14px; font-weight: bold; color: var(--muted); opacity: 0.7;">
        ${state.quizFlowIndex + 1} / 5
      </div>
      <span class="eyebrow" style="margin-bottom: 16px;"><i data-lucide="timer"></i> Daily quiz</span>
      
      <div class="card-title" style="font-size: 18px; line-height: 1.5; margin-bottom: 24px;">${q.question}</div>
      <div class="quiz-options" style="display: flex; flex-direction: column; gap: 12px;">
        ${q.options.map((opt, i) => {
          let borderColor = 'var(--line)';
          let textColor = 'var(--muted)';
          let bgColor = 'transparent';
          let flashClass = '';
          if (answered) {
            if (i === q.answer) {
              borderColor = 'var(--teal)';
              textColor = 'var(--teal)';
              bgColor = 'rgba(20, 184, 166, 0.1)';
              flashClass = 'flash-correct';
            } else if (state.quizAnswers[q.id] === i) {
              borderColor = '#e28e8e';
              textColor = '#e28e8e';
            }
          }
          return `
          <button class="quiz-option ${state.quizAnswers[q.id] === i ? 'picked' : ''} ${flashClass}" data-action="answer-quiz" data-id="${q.id}" data-index="${i}" style="text-align: left; padding: 16px; border-radius: 16px; border: 2px solid ${borderColor}; background: ${bgColor}; font-size: 14px; transition: all 0.3s;" ${answered ? 'disabled' : ''}>
            <span style="font-weight: 800; margin-right: 12px; color: ${textColor};">${String.fromCharCode(65 + i)}</span>${opt}
          </button>`;
        }).join('')}
      </div>
      ${answered ? `
        <div class="answer-panel ${correct ? 'right' : 'wrong'}" style="margin-top: 24px; padding: 20px; border-radius: 16px;">
          <strong style="font-size: 15px; display: flex; align-items: center; gap: 8px; margin-bottom: 12px; color: ${correct ? 'var(--teal)' : '#e28e8e'};">
            <i data-lucide="${correct ? 'check-circle' : 'x-circle'}" style="width: 20px; height: 20px;"></i>
            ${correct ? 'Correct!' : (state.quizAnswers[q.id] === -1 ? "Time's up!" : 'Incorrect')}
          </strong>
          <p style="font-size: 14px; line-height: 1.5;">${correct ? q.explanationCorrect : q.explanationIncorrect}</p>
        </div>
        <button class="btn btn-primary" data-action="next-quiz" style="margin-top: 24px; padding: 16px; border-radius: 16px; font-size: 14px; display: flex; justify-content: center; align-items: center; gap: 8px; width: 100%;">
          Next <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
        </button>` : ''}
    </div>`;
}
