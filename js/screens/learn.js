/* Learn tab: one learning task at a time. */

function learnHTML() {
  const q = QUIZ[0];
  const mythAnswered = state.mythAnswer !== null;
  const quizAnswered = state.quizAnswer !== null;

  return `
    <div class="screen">
      <div class="greeting">
        <h1>Learn</h1>
        <p>Clear one misconception, then practice one safe choice.</p>
      </div>

      <section class="learn-stack">
        <div class="learn-card-head" data-action="toggle-myth" style="cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px;">
          <span><i data-lucide="shield-question"></i> Myths vs facts</span>
          <b>${mythAnswered ? 'Answered' : (state.mythOpened ? 'Close' : 'Tap to open')}</b>
        </div>
        ${state.mythOpened ? mythCardHTML('learn') : ''}
      </section>

      <section class="learn-stack">
        <div class="learn-card-head quiz" data-action="toggle-quiz" style="cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px;">
          <span><i data-lucide="timer"></i> Daily quiz</span>
          <b>${quizAnswered ? 'Explained' : (state.quizOpened ? 'Close' : 'Tap to open')}</b>
        </div>
        ${state.quizOpened ? dailyQuizCardHTML(q) : ''}
      </section>
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
