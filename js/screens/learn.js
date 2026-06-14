/* Learn tab: learning tasks one at a time. */

function learnHTML() {
  const mythAnsweredCount = Object.keys(state.mythAnswers).length;
  const quizAnsweredCount = Object.keys(state.quizAnswers).length;

  return `
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
          ${!state.mythOpened && mythAnsweredCount < 5 ? `<div style="font-size: 14px; text-align: center; color: var(--muted); line-height: 1.4; padding: 0 10px;">Today's Myth: "${MYTH_CARDS[state.mythFlowIndex < 5 ? state.mythFlowIndex : 0].statement}"</div>` : ''}
          <b style="${state.mythOpened ? 'font-size: 13px;' : 'font-size: 14px; background: linear-gradient(120deg, var(--teal), #3aa893); color: #07211c; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 8px rgba(69, 196, 176, 0.3);'}">${mythAnsweredCount >= 5 ? 'All 5 completed' : (state.mythOpened ? 'Close' : 'Challenge a Myth')}</b>
        </div>
        ${state.mythOpened ? mythFlowHTML() : ''}
      </section>
      ` : ''}

      ${!state.mythOpened ? `
      <section class="learn-stack" style="flex: ${state.quizOpened ? '1' : 'none'}; display: flex; flex-direction: column;">
        <div class="learn-card-head quiz" data-action="toggle-quiz" style="${state.quizOpened ? 'cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px; margin-bottom: 16px;' : 'cursor: pointer; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);'}">
          <span style="${state.quizOpened ? 'display: flex; align-items: center; gap: 8px; font-size: 15px;' : 'font-size: 18px; display: flex; align-items: center; gap: 10px; font-weight: 800;'}"><i data-lucide="timer" style="${state.quizOpened ? 'width: 20px; height: 20px;' : 'width: 28px; height: 28px;'}"></i> Daily quiz</span>
          ${!state.quizOpened && quizAnsweredCount < 5 ? `<div style="font-size: 14px; text-align: center; color: var(--muted); line-height: 1.4; padding: 0 10px;">Today's Question: "${QUIZ[state.quizFlowIndex < 5 ? state.quizFlowIndex : 0].question}"</div>` : ''}
          <b style="${state.quizOpened ? 'font-size: 13px;' : 'font-size: 14px; background: linear-gradient(120deg, var(--teal), #3aa893); color: #07211c; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 8px rgba(69, 196, 176, 0.3);'}">${quizAnsweredCount >= 5 ? 'All 5 completed' : (state.quizOpened ? 'Close' : 'Start Daily Quiz')}</b>
        </div>
        ${state.quizOpened ? dailyQuizCardHTML() : ''}
      </section>
      ` : ''}
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
        <p style="color: var(--text-muted); margin-bottom: 32px; font-size: 14px;">You've uncovered the facts. Great job!</p>
        <button class="btn btn-primary" data-action="close-myth-flow" style="width: 100%; padding: 16px; border-radius: 16px; font-size: 14px;">Back to Learn</button>
      </div>
    `;
  }

  const card = MYTH_CARDS[state.mythFlowIndex];
  const answered = state.mythAnswers[card.id] !== undefined;
  const correct = answered && state.mythAnswers[card.id] === card.answer;

  return `
    <div class="card myth-card" ${!answered ? `data-swipeable="true" data-id="${card.id}"` : ''} style="flex: 1; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-radius: 24px; padding: 24px; position: relative; touch-action: pan-y; transition: transform 0.3s ease, opacity 0.3s ease;">
      <div style="position: absolute; top: 16px; right: 20px; font-size: 14px; font-weight: bold; color: var(--text-muted); opacity: 0.7;">
        ${state.mythFlowIndex + 1} / 5
      </div>
      <div class="card-title" style="font-size: 18px; font-weight: 800; line-height: 1.4; margin-bottom: 32px; margin-top: 16px; text-align: center;">"${card.statement}"</div>
      
      ${!answered ? `
      <div style="text-align: center; color: var(--text-muted); font-size: 13px; margin-bottom: 24px; display: flex; justify-content: center; align-items: center; gap: 8px;">
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
        <p style="color: var(--text-muted); margin-bottom: 32px; font-size: 14px;">Great job completing your daily quiz.</p>
        <button class="btn btn-primary" data-action="close-quiz-flow" style="width: 100%; padding: 16px; border-radius: 16px; font-size: 14px;">Back to Learn</button>
      </div>
    `;
  }

  const q = QUIZ[state.quizFlowIndex];
  const answered = state.quizAnswers[q.id] !== undefined;
  const correct = answered && state.quizAnswers[q.id] === q.answer;
  const progressPct = (state.quizTimeLeft / 10) * 100;

  return `
    <div class="card quiz-card" style="position: relative; box-shadow: 0 8px 30px rgba(0,0,0,0.12); border-radius: 24px; padding: 24px;">
      <div style="position: absolute; top: 16px; right: 20px; font-size: 14px; font-weight: bold; color: var(--text-muted); opacity: 0.7;">
        ${state.quizFlowIndex + 1} / 5
      </div>
      <span class="eyebrow" style="margin-bottom: 16px;"><i data-lucide="timer"></i> Daily quiz</span>
      
      <div class="card-title" style="font-size: 18px; line-height: 1.5; margin-bottom: 24px;">${q.question}</div>
      <style>
        @keyframes flashGlow {
          0% { background-color: transparent; box-shadow: 0 0 0px var(--teal); transform: scale(1); }
          50% { background-color: rgba(20, 184, 166, 0.3); box-shadow: 0 0 15px var(--teal); transform: scale(1.02); }
          100% { background-color: rgba(20, 184, 166, 0.1); box-shadow: 0 0 0px var(--teal); transform: scale(1); }
        }
        .flash-correct {
          animation: flashGlow 0.8s ease-out;
        }
      </style>
      <div class="quiz-options" style="display: flex; flex-direction: column; gap: 12px;">
        ${q.options.map((opt, i) => {
          let borderColor = 'var(--line)';
          let textColor = 'var(--text-muted)';
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
