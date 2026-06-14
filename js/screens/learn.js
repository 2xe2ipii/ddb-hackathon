/* Learn tab: one learning task at a time. */

function learnHTML() {
  const q = QUIZ[0];
  const mythAnswered = state.mythAnswer !== null;
  const quizAnswered = state.quizAnswer !== null;

  return `
    <div class="screen" style="height: 100%;">
      ${(!state.mythOpened && !state.quizOpened) ? `
      <div class="greeting">
        <h1>Learn</h1>
        <p>Clear one misconception, then practice one safe choice.</p>
      </div>` : ''}

      ${!state.quizOpened ? `
      <section class="learn-stack" style="flex: 1; display: flex; flex-direction: column;">
        <div class="learn-card-head" data-action="toggle-myth" style="${state.mythOpened ? 'cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px;' : 'flex: 1; cursor: pointer; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);'}">
          <span style="${state.mythOpened ? '' : 'font-size: 20px; display: flex; align-items: center; gap: 10px;'}"><i data-lucide="shield-question" style="${state.mythOpened ? '' : 'width: 32px; height: 32px;'}"></i> Myths vs facts</span>
          <b style="${state.mythOpened ? '' : 'font-size: 15px;'}">${mythAnswered ? 'Answered' : (state.mythOpened ? 'Close' : 'Tap to open')}</b>
        </div>
        ${state.mythOpened ? mythCardHTML('learn') : ''}
      </section>
      ` : ''}

      ${!state.mythOpened ? `
      <section class="learn-stack" style="flex: 1; display: flex; flex-direction: column;">
        <div class="learn-card-head quiz" data-action="toggle-quiz" style="${state.quizOpened ? 'cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px;' : 'flex: 1; cursor: pointer; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);'}">
          <span style="${state.quizOpened ? '' : 'font-size: 20px; display: flex; align-items: center; gap: 10px;'}"><i data-lucide="timer" style="${state.quizOpened ? '' : 'width: 32px; height: 32px;'}"></i> Daily quiz</span>
          <b style="${state.quizOpened ? '' : 'font-size: 15px;'}">${quizAnswered ? 'Explained' : (state.quizOpened ? 'Close' : 'Tap to open')}</b>
        </div>
        ${state.quizOpened ? dailyQuizCardHTML(q) : ''}
      </section>
      ` : ''}
    </div>`;
}

function dailyQuizCardHTML(q) {
  const answered = state.quizAnswer !== null;
  const correct = state.quizAnswer === q.answer;

  return `
    <div class="card quiz-card">
      <span class="eyebrow"><i data-lucide="timer"></i> Daily quiz</span>
      <div class="card-title">${q.question}</div>
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option ${state.quizAnswer === i ? 'picked' : ''}" data-action="answer-quiz" data-index="${i}">
            <span>${String.fromCharCode(65 + i)}</span>${opt}
          </button>`).join('')}
      </div>
      ${answered ? `
        <div class="answer-panel ${correct ? 'right' : 'wrong'}">
          <strong>${correct ? 'Correct.' : 'Try this instead.'}</strong>
          <p>${q.explanation}</p>
        </div>` : ''}
    </div>`;
}
