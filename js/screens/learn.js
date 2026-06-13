/* Learn tab: one learning task at a time. */

function learnHTML() {
  const q = QUIZ[0];
  const answered = state.quizAnswer !== null;
  const correct = state.quizAnswer === q.answer;
  const learningPanel = state.learnMode === 'quiz'
    ? `<div class="card quiz-card">
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
          </div>
          <button class="btn btn-ghost wide-btn" data-action="learn-mode" data-mode="myth">
            <i data-lucide="refresh-cw"></i> Back to cards
          </button>` : ''}
      </div>`
    : mythCardHTML('learn');

  return `
    <div class="screen">
      <div class="greeting">
        <h1>Learn</h1>
        <p>${state.learnMode === 'quiz' ? 'One question.' : 'One card.'}</p>
      </div>

      ${learningPanel}
    </div>`;
}
