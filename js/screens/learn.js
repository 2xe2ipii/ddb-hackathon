/* Learn tab: learning tasks one at a time. */

function learnHTML() {
  if (state.unmaskOpened) {
    return `
      <style>
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .unmask-tap-box {
          width: 14px;
          height: 14px;
          background: var(--line);
          border: 1.5px solid var(--muted);
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .unmask-tap-box.active {
          background: var(--teal);
          border-color: var(--teal);
          box-shadow: 0 0 6px rgba(69, 196, 176, 0.5);
        }
        .unmask-tile {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid var(--line);
          border-radius: 8px;
          cursor: pointer;
          display: grid;
          place-items: center;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .unmask-tile.uncovered {
          opacity: 0;
          pointer-events: none;
          transform: scale(0.8);
        }
        .tile-eye-icon {
          width: 20px;
          height: 20px;
          color: var(--faint);
          opacity: 0.65;
          transition: transform 0.2s;
        }
        .unmask-tile:hover .tile-eye-icon {
          transform: scale(1.15);
          color: var(--teal);
          opacity: 1;
        }
        .btn-unmask-option:active {
          transform: scale(0.98);
        }
      </style>
      <div class="screen" style="display: flex; flex-direction: column;">
        <!-- Game Header -->
        <div class="learn-card-head" data-action="unmask-close" style="cursor: pointer; padding: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 16px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
          <span style="display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 800;">
            <i data-lucide="eye-off" style="width: 20px; height: 20px; color: var(--teal);"></i> UnMask Drugs
          </span>
          <b style="font-size: 13px; color: var(--text);">Close</b>
        </div>
        ${unmaskGameHTML()}
      </div>
    `;
  }

  const mythAnsweredCount = Object.keys(state.mythAnswers).length;
  const quizAnsweredCount = Object.keys(state.quizAnswers).length;

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
    <div class="screen" style="height: 100%; display: flex; flex-direction: column; gap: 16px; padding-bottom: 120px;">
      ${(!state.mythOpened && !state.quizOpened) ? `
      <div class="greeting" style="margin-bottom: 16px;">
        <h1>Learn</h1>
        <p>Clear 5 misconceptions, then practice one safe choice.</p>
      </div>` : ''}

      ${!state.quizOpened ? `
      <section class="learn-stack" style="flex: ${state.mythOpened ? '1' : 'none'}; display: flex; flex-direction: column;">
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

      ${(!state.quizOpened && !state.mythOpened) ? `
      <section class="learn-stack">
        <div class="learn-card-head" data-action="toggle-unmask" style="cursor: pointer; padding: 24px; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 14px; background: var(--card); border: 1px solid var(--line); border-radius: 24px; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
          <span style="font-size: 18px; display: flex; align-items: center; gap: 10px; font-weight: 800;"><i data-lucide="eye-off" style="width: 28px; height: 28px;"></i> UnMask Drugs</span>
          <div style="font-size: 14px; text-align: center; color: var(--muted); line-height: 1.4; padding: 0 10px;">Spot hidden danger signs and drug red flags.</div>
          <b style="font-size: 14px; background: linear-gradient(120deg, var(--teal), #3aa893); color: #07211c; padding: 8px 16px; border-radius: 20px; box-shadow: 0 2px 8px rgba(69, 196, 176, 0.3);">Play Game</b>
        </div>
      </section>
      ` : ''}
    </div>`;
}

function mythFlowHTML() {
  if (state.mythFlowIndex >= 5) {
    return mythResultsHTML();
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
    return quizResultsHTML();
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

function unmaskGameHTML() {
  if (state.unmaskGameState === 'entry') {
    return unmaskEntryHTML();
  } else if (state.unmaskGameState === 'playing' || state.unmaskGameState === 'review') {
    return unmaskPlayingHTML();
  } else if (state.unmaskGameState === 'results') {
    return unmaskResultsHTML();
  }
  return '';
}

function unmaskEntryHTML() {
  return `
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px 0 20px; text-align: center;">
      <div style="margin: auto 0; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <div class="unmask-logo-container" style="position: relative; width: 100px; height: 100px; margin-bottom: 16px;">
          <div style="position: absolute; inset: 0; background: radial-gradient(circle, var(--teal) 0%, transparent 70%); opacity: 0.4; filter: blur(15px); animation: pulseGlow 3s infinite;"></div>
          <div style="position: absolute; inset: 10px; background: var(--card-2); border: 2px solid var(--teal); border-radius: 24px; display: grid; place-items: center; box-shadow: 0 8px 20px rgba(0,0,0,0.3);">
            <i data-lucide="eye-off" style="width: 40px; height: 40px; color: var(--teal);"></i>
          </div>
        </div>
        
        <h1 style="font-size: 26px; font-weight: 900; background: linear-gradient(100deg, var(--teal), #a5f3fc); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 8px;">UnMask Drugs</h1>
        <p style="color: var(--muted); font-size: 15px; max-width: 280px; line-height: 1.5; margin-bottom: 32px;">Tap tiles to uncover the image. Use your clues wisely.</p>
        
        <button class="btn btn-primary" data-action="start-unmask-game" style="width: 240px; padding: 18px; border-radius: 20px; font-size: 16px; font-weight: 800; box-shadow: 0 4px 15px rgba(69, 196, 176, 0.4); display: flex; justify-content: center; align-items: center; gap: 8px;">
          Start Game <i data-lucide="play" style="width: 18px; height: 18px;"></i>
        </button>
        
        <div style="font-size: 12px; color: var(--faint); margin-top: 16px; display: flex; align-items: center; gap: 6px;">
          <i data-lucide="clock" style="width: 13px; height: 13px;"></i>
          5 rounds &bull; ~4 mins
        </div>
      </div>

      <div style="margin-top: auto; padding-bottom: 20px;"></div>
    </div>
  `;
}

function unmaskPlayingHTML() {
  const roundId = state.sessionUnmaskIds[state.unmaskRoundIndex];
  const round = UNMASK_ROUNDS.find(r => r.id === roundId) || UNMASK_ROUNDS[0];
  const progressPct = ((state.unmaskRoundIndex + 1) / 5) * 100;
  
  const isReview = state.unmaskGameState === 'review';
  const selectedOption = isReview ? state.unmaskAnswers[state.unmaskRoundIndex] : state.unmaskSelectedOption;
  const answered = isReview ? (selectedOption !== undefined && selectedOption !== null) : state.unmaskRoundAnswered;
  const correct = answered && selectedOption === round.answer;
  const cluesUsed = isReview ? (state.unmaskRoundClues[state.unmaskRoundIndex] || 0) : state.unmaskCluesUsed;

  // Clues text
  let cluesHTML = '';
  if (cluesUsed > 0) {
    cluesHTML += `
      <div class="unmask-clue-item" style="background: rgba(69, 196, 176, 0.03); border-left: 3px solid var(--teal); border-radius: 4px 12px 12px 4px; padding: 10px 14px; font-size: 13.5px; line-height: 1.4; color: var(--text); display: flex; align-items: flex-start; gap: 10px; animation: slideIn 0.3s ease;">
        <span style="color: var(--teal); font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2.5px; white-space: nowrap;">Clue 1</span>
        <span style="text-align: left;">${round.clues[0]}</span>
      </div>
    `;
  }
  if (cluesUsed > 1) {
    cluesHTML += `
      <div class="unmask-clue-item" style="background: rgba(69, 196, 176, 0.03); border-left: 3px solid var(--teal); border-radius: 4px 12px 12px 4px; padding: 10px 14px; font-size: 13.5px; line-height: 1.4; color: var(--text); display: flex; align-items: flex-start; gap: 10px; animation: slideIn 0.3s ease; margin-top: 2px;">
        <span style="color: var(--teal); font-weight: 800; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2.5px; white-space: nowrap;">Clue 2</span>
        <span style="text-align: left;">${round.clues[1]}</span>
      </div>
    `;
  }

  // Taps remaining icons: 🟦🟦🟦
  let tapsHTML = '';
  for (let i = 0; i < 3; i++) {
    const active = i < state.unmaskTapsLeft;
    tapsHTML += `<span class="unmask-tap-box ${active ? 'active' : ''}"></span>`;
  }

  // Generate grid tiles
  let tilesHTML = '';
  for (let i = 0; i < 9; i++) {
    const uncovered = isReview || state.unmaskRevealedTiles.includes(i);
    tilesHTML += `
      <div class="unmask-tile ${uncovered ? 'uncovered' : ''}" 
           data-action="unmask-tap-tile" 
           data-tile-index="${i}">
        ${!uncovered ? `<i data-lucide="eye-off" class="tile-eye-icon"></i>` : ''}
      </div>
    `;
  }

  // Options buttons
  const optionsHTML = round.options.map((opt, i) => {
    let borderColor = 'var(--line)';
    let textColor = 'var(--muted)';
    let bgColor = 'transparent';
    let iconHTML = `<span style="font-weight: 800; color: var(--muted); margin-right: 10px; font-size: 13px;">${String.fromCharCode(65 + i)}</span>`;
    
    if (answered) {
      if (i === round.answer) {
        borderColor = 'var(--teal)';
        textColor = 'var(--teal)';
        bgColor = 'rgba(69, 196, 176, 0.1)';
        iconHTML = `<i data-lucide="check" style="width: 16px; height: 16px; color: var(--teal); margin-right: 10px;"></i>`;
      } else if (selectedOption === i) {
        borderColor = '#e28e8e';
        textColor = '#e28e8e';
        bgColor = 'rgba(226, 142, 142, 0.1)';
        iconHTML = `<i data-lucide="x" style="width: 16px; height: 16px; color: #e28e8e; margin-right: 10px;"></i>`;
      } else {
        textColor = 'var(--faint)';
      }
    }

    return `
      <button class="btn ${answered ? '' : 'btn-unmask-option'}" 
              data-action="answer-unmask" 
              data-index="${i}" 
              style="text-align: left; padding: 14px 18px; border-radius: 16px; border: 2px solid ${borderColor}; background: ${bgColor}; color: ${textColor}; font-size: 14px; font-weight: 700; width: 100%; transition: all 0.2s; display: flex; align-items: center;"
              ${answered ? 'disabled' : ''}>
        ${iconHTML}
        <span>${opt}</span>
      </button>
    `;
  }).join('');

  // Explanation Panel
  let explanationHTML = '';
  if (answered) {
    let ptsEarned = 0;
    if (correct) {
      if (cluesUsed === 0) ptsEarned = 15;
      else if (cluesUsed === 1) ptsEarned = 10;
      else if (cluesUsed === 2) ptsEarned = 5;
    }
    
    explanationHTML = `
      <div class="answer-panel ${correct ? 'right' : 'wrong'}" style="margin-top: 20px; padding: 18px; border-radius: 18px; text-align: left; animation: slideIn 0.35s ease;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <strong style="font-size: 15px; display: flex; align-items: center; gap: 8px; color: ${correct ? 'var(--teal)' : '#e28e8e'};">
            <i data-lucide="${correct ? 'check-circle' : 'x-circle'}" style="width: 20px; height: 20px;"></i>
            ${correct ? 'Correct!' : 'Incorrect'}
          </strong>
          ${correct ? `<span style="font-size: 13px; font-weight: 800; background: var(--teal-soft); color: var(--teal); padding: 4px 10px; border-radius: 12px;">+${ptsEarned} pts</span>` : ''}
        </div>
        <p style="font-size: 13.5px; line-height: 1.5; color: var(--text); margin-bottom: 0;">${round.explanation}</p>
      </div>
      
      <button class="btn btn-primary" data-action="unmask-next-round" style="margin-top: 20px; padding: 16px; border-radius: 16px; font-size: 15px; font-weight: 800; width: 100%; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(69, 196, 176, 0.2);">
        ${state.unmaskRoundIndex === 4 ? 'View Results' : 'Next Round'} <i data-lucide="arrow-right" style="width: 18px; height: 18px;"></i>
      </button>
    `;
  }

  return `
    <div style="display: flex; flex-direction: column; gap: 12px; padding: 8px 0 20px;">
      <!-- Top Bar -->
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px; font-weight: 800; color: var(--muted);">
          <span>Round ${state.unmaskRoundIndex + 1} of 5</span>
          <span style="color: var(--teal);">${state.unmaskScore} pts</span>
        </div>
        <div style="width: 100%; height: 6px; background: var(--line); border-radius: 10px; overflow: hidden;">
          <div style="width: ${progressPct}%; height: 100%; background: linear-gradient(90deg, var(--teal), #86efac); border-radius: 10px; transition: width 0.3s ease;"></div>
        </div>
      </div>

      <!-- Clue Section -->
      <div style="background: transparent; padding: 4px 2px; display: flex; flex-direction: column; gap: 10px;">
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
          <span style="font-size: 11px; font-weight: 800; color: var(--faint); text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;">
            <i data-lucide="lightbulb" style="width: 12px; height: 12px;"></i> Clues
          </span>
          <button class="btn btn-ghost" 
                  data-action="unmask-use-clue" 
                  style="font-size: 12.5px; padding: 6px 12px; border-radius: 12px; display: flex; align-items: center; gap: 4px; color: ${cluesUsed >= 2 ? 'var(--faint)' : 'var(--teal)'};"
                  ${(cluesUsed >= 2 || answered || isReview) ? 'disabled' : ''}>
            💡 ${cluesUsed === 0 ? 'Use Clue 1' : (cluesUsed === 1 ? 'Use Clue 2' : 'No clues left')}
          </button>
        </div>
        ${cluesHTML}
      </div>

      <!-- Image Area / 3x3 Grid -->
      <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
        <div class="unmask-image-container" style="position: relative; width: 220px; height: 220px; border-radius: 20px; border: 2px solid var(--line); overflow: hidden; background: #000; box-shadow: 0 8px 24px rgba(0,0,0,0.25);">
          <!-- Background image -->
          <img src="${round.imageFile}" style="width: 100%; height: 100%; object-fit: cover; filter: blur(0px);" />
          
          <!-- Overlay Grid of Tiles -->
          <div style="position: absolute; inset: 0; display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(3, 1fr); gap: 2px; padding: 2px;">
            ${tilesHTML}
          </div>
        </div>

        <!-- Taps indicator -->
        ${isReview ? '' : `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--muted); font-weight: 700; margin-top: 2px;">
          <div style="display: flex; gap: 4px;">
            ${tapsHTML}
          </div>
          <span>${state.unmaskTapsLeft} tap${state.unmaskTapsLeft === 1 ? '' : 's'} left</span>
        </div>
        `}
      </div>

      <!-- Question & Choices -->
      <div style="display: flex; flex-direction: column; gap: 8px; text-align: center; margin-top: 4px;">
        <div style="font-size: 16px; font-weight: 800; color: var(--text); line-height: 1.4; margin-bottom: 4px;">${round.question}</div>
        <div style="display: flex; flex-direction: column; gap: 8px; max-height: 240px; overflow-y: auto;">
          ${optionsHTML}
        </div>
      </div>

      <!-- Explanation and Next Button -->
      ${explanationHTML}
    </div>
  `;
}

function unmaskResultsHTML() {
  const correctCount = state.unmaskCorrectCount || 0;
  let feedbackText = '';
  if (correctCount === 5) {
    feedbackText = "Perfect awareness. You're ready to protect yourself and others.";
  } else if (correctCount >= 4) {
    feedbackText = "Sharp instincts. A little more practice and you'll catch them all.";
  } else if (correctCount >= 2) {
    feedbackText = "Good effort. Some signs are tricky — keep playing to sharpen your eye.";
  } else {
    feedbackText = "Don't worry. That's what this game is for. Try again!";
  }

  let badgesHTML = '';
  let badgeCount = 1;

  if (state.unmaskRunDetectiveMode) {
    badgeCount = 2;
    badgesHTML += `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 12px 6px; background: var(--card-2); border: 1px solid var(--line); border-radius: 16px; text-align: center;">
        <span style="font-size: 22px; margin-bottom: 6px;">🔍</span>
        <strong style="font-size: 12px; color: var(--teal); font-weight: 800; display: block; margin-bottom: 2px; white-space: nowrap;">Detective Mode</strong>
        <p style="font-size: 10px; color: var(--muted); margin: 0; line-height: 1.2;">Careful and thorough investigation</p>
      </div>
    `;
  }

  badgesHTML += `
    <div style="display: flex; flex-direction: column; align-items: center; padding: 12px 6px; background: var(--card-2); border: 1px solid var(--line); border-radius: 16px; text-align: center;">
      <span style="font-size: 22px; margin-bottom: 6px;">🧹</span>
      <strong style="font-size: 12px; color: var(--teal); font-weight: 800; display: block; margin-bottom: 2px; white-space: nowrap;">Full Sweep</strong>
      <p style="font-size: 10px; color: var(--muted); margin: 0; line-height: 1.2;">Complete all 5 unmask rounds</p>
    </div>
  `;

  return `
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px 16px 20px; text-align: center;">
      <div style="margin: auto 0; display: flex; flex-direction: column; align-items: center; width: 100%; gap: 16px; animation: scaleIn 0.4s ease;">
        <div style="width: 64px; height: 64px; background: var(--teal-soft); border: 2px solid var(--teal); color: var(--teal); border-radius: 50%; display: grid; place-items: center; margin-bottom: 8px; box-shadow: 0 4px 12px rgba(69, 196, 176, 0.2);">
          <i data-lucide="check-circle" style="width: 32px; height: 32px;"></i>
        </div>
        
        <h2 style="font-size: 22px; font-weight: 900; margin-bottom: 4px;">Game Complete</h2>
        
        <div style="background: var(--card); border: 1px solid var(--line); border-radius: 24px; padding: 24px; width: 100%; box-shadow: 0 8px 30px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <div style="font-size: 14px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em;">Your Performance</div>
          
          <div style="font-size: 40px; font-weight: 900; color: var(--text); line-height: 1; margin: 4px 0;">
            ${correctCount} <span style="font-size: 20px; color: var(--muted); font-weight: 700;">/ 5</span>
          </div>
          
          <p style="font-size: 13.5px; color: var(--muted); font-weight: 700; margin-bottom: 8px;">uncovered danger signs</p>
          <div style="font-size: 15px; font-weight: 800; color: var(--teal); margin-bottom: 8px;">Total Score: ${state.unmaskScore} points</div>
          
          <p style="color: var(--text); font-size: 14px; line-height: 1.5; font-style: italic; max-width: 260px; margin: 0;">"${feedbackText}"</p>
        </div>

        <!-- Badges Section -->
        <div style="width: 100%; margin-top: 8px;">
          <div style="font-size: 13px; font-weight: 800; color: var(--muted); text-align: left; margin-left: 4px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="award" style="width: 14px; height: 14px; color: var(--teal);"></i> Badges Earned
          </div>
          <div style="display: grid; grid-template-columns: repeat(${badgeCount}, 1fr); gap: 8px; width: 100%; max-width: ${badgeCount === 1 ? '140px' : '280px'}; margin: 0 auto;">
            ${badgesHTML}
          </div>
        </div>

        <!-- Buttons -->
        <div style="width: 100%; display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
          <button class="btn btn-primary" data-action="unmask-revisit-answers" style="padding: 16px; border-radius: 16px; font-size: 15px; font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(69, 196, 176, 0.3);">
            Revisit Your Answers
          </button>
          <button class="btn btn-ghost" data-action="unmask-play-again" style="padding: 16px; border-radius: 16px; font-size: 15px; font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; border: 2px solid var(--line);">
            <i data-lucide="rotate-ccw" style="width: 16px; height: 16px;"></i> Play Again
          </button>
          <button class="btn btn-ghost" data-action="unmask-close" style="border: none; background: transparent; box-shadow: none; color: var(--muted); font-size: 14px; font-weight: 700; padding: 8px; margin-top: 4px; cursor: pointer;">
            Back to Learn
          </button>
        </div>
      </div>
    </div>
  `;
}

function mythResultsHTML() {
  let mythCorrect = 0;
  if (state.sessionMythIds) {
    state.sessionMythIds.forEach(id => {
      const c = MYTH_CARDS.find(m => m.id === id);
      if (c && state.mythAnswers[id] === c.answer) mythCorrect++;
    });
  }

  let feedbackText = '';
  if (mythCorrect === 5) {
    feedbackText = "Perfect score! You easily separate myths from facts.";
  } else if (mythCorrect >= 4) {
    feedbackText = "Great job! You identified almost all the misconceptions.";
  } else if (mythCorrect >= 3) {
    feedbackText = "Good effort. Reviewing these facts will build stronger awareness.";
  } else {
    feedbackText = "Keep reading. Recognizing these drug myths is the first step to safety.";
  }

  let badgesHTML = '';
  let hasBadges = false;

  if (mythCorrect === 5) {
    hasBadges = true;
    badgesHTML += `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 12px 6px; background: var(--card-2); border: 1px solid var(--line); border-radius: 16px; text-align: center;">
        <span style="font-size: 22px; margin-bottom: 6px;">🎯</span>
        <strong style="font-size: 12px; color: var(--teal); font-weight: 800; display: block; margin-bottom: 2px; white-space: nowrap;">Sharp Eye</strong>
        <p style="font-size: 10px; color: var(--muted); margin: 0; line-height: 1.2;">5/5 myths correct, no mistakes</p>
      </div>
    `;
  }
  if (mythCorrect >= 1) {
    hasBadges = true;
    badgesHTML += `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 12px 6px; background: var(--card-2); border: 1px solid var(--line); border-radius: 16px; text-align: center;">
        <span style="font-size: 22px; margin-bottom: 6px;">🛡️</span>
        <strong style="font-size: 12px; color: var(--teal); font-weight: 800; display: block; margin-bottom: 2px; white-space: nowrap;">Myth Buster</strong>
        <p style="font-size: 10px; color: var(--muted); margin: 0; line-height: 1.2;">Cleared 5 myths today</p>
      </div>
    `;
  }

  if (!hasBadges) {
    badgesHTML = `
      <div style="grid-column: span 3; font-size: 13px; color: var(--faint); text-align: center; padding: 10px 0;">
        Play again to challenge yourself and earn special run badges!
      </div>
    `;
  }

  return `
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px 16px 20px; text-align: center;">
      <div style="margin: auto 0; display: flex; flex-direction: column; align-items: center; width: 100%; gap: 16px; animation: scaleIn 0.4s ease;">
        <div style="width: 64px; height: 64px; background: var(--teal-soft); border: 2px solid var(--teal); color: var(--teal); border-radius: 50%; display: grid; place-items: center; margin-bottom: 8px; box-shadow: 0 4px 12px rgba(69, 196, 176, 0.2);">
          <i data-lucide="check-circle" style="width: 32px; height: 32px;"></i>
        </div>
        
        <h2 style="font-size: 22px; font-weight: 900; margin-bottom: 4px;">Challenge Complete</h2>
        
        <div style="background: var(--card); border: 1px solid var(--line); border-radius: 24px; padding: 24px; width: 100%; box-shadow: 0 8px 30px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <div style="font-size: 14px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em;">Your Performance</div>
          
          <div style="font-size: 40px; font-weight: 900; color: var(--text); line-height: 1; margin: 4px 0;">
            ${mythCorrect} <span style="font-size: 20px; color: var(--muted); font-weight: 700;">/ 5</span>
          </div>
          
          <p style="font-size: 13.5px; color: var(--muted); font-weight: 700; margin-bottom: 8px;">correct answers</p>
          <div style="font-size: 15px; font-weight: 800; color: var(--teal); margin-bottom: 8px;">Total XP: +${mythCorrect * 10} XP</div>
          
          <p style="color: var(--text); font-size: 14px; line-height: 1.5; font-style: italic; max-width: 260px; margin: 0;">"${feedbackText}"</p>
        </div>

        <!-- Badges Section -->
        <div style="width: 100%; margin-top: 8px;">
          <div style="font-size: 13px; font-weight: 800; color: var(--muted); text-align: left; margin-left: 4px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="award" style="width: 14px; height: 14px; color: var(--teal);"></i> Badges Earned
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%;">
            ${badgesHTML}
          </div>
        </div>

        <!-- Buttons -->
        <div style="width: 100%; display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
          <button class="btn btn-primary" data-action="revisit-myth-answers" style="padding: 16px; border-radius: 16px; font-size: 15px; font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(69, 196, 176, 0.3);">
            Revisit Your Answers
          </button>
          <button class="btn btn-ghost" data-action="myth-play-again" style="padding: 16px; border-radius: 16px; font-size: 15px; font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; border: 2px solid var(--line);">
            <i data-lucide="rotate-ccw" style="width: 16px; height: 16px;"></i> Play Again
          </button>
          <button class="btn btn-ghost" data-action="close-myth-flow" style="border: none; background: transparent; box-shadow: none; color: var(--muted); font-size: 14px; font-weight: 700; padding: 8px; margin-top: 4px; cursor: pointer;">
            Back to Learn
          </button>
        </div>
      </div>
    </div>
  `;
}

function quizResultsHTML() {
  let quizCorrect = 0;
  if (state.sessionQuizIds) {
    state.sessionQuizIds.forEach(id => {
      const q = QUIZ.find(q => q.id === id);
      if (q && state.quizAnswers[id] === q.answer) quizCorrect++;
    });
  }

  let feedbackText = '';
  if (quizCorrect === 5) {
    feedbackText = "Perfect score! Your knowledge about drug safety is outstanding.";
  } else if (quizCorrect >= 4) {
    feedbackText = "Great job! You have a strong understanding of these facts.";
  } else if (quizCorrect >= 3) {
    feedbackText = "Good effort! Review the questions to reinforce your knowledge.";
  } else {
    feedbackText = "Keep learning. Every quiz helps build your awareness and safety.";
  }

  let badgesHTML = '';
  let hasBadges = false;

  if (quizCorrect === 5) {
    hasBadges = true;
    badgesHTML += `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 12px 6px; background: var(--card-2); border: 1px solid var(--line); border-radius: 16px; text-align: center;">
        <span style="font-size: 22px; margin-bottom: 6px;">🏆</span>
        <strong style="font-size: 12px; color: var(--teal); font-weight: 800; display: block; margin-bottom: 2px; white-space: nowrap;">Perfect Score</strong>
        <p style="font-size: 10px; color: var(--muted); margin: 0; line-height: 1.2;">5/5 correct on the daily quiz</p>
      </div>
    `;
  }
  if (quizCorrect >= 1) {
    hasBadges = true;
    badgesHTML += `
      <div style="display: flex; flex-direction: column; align-items: center; padding: 12px 6px; background: var(--card-2); border: 1px solid var(--line); border-radius: 16px; text-align: center;">
        <span style="font-size: 22px; margin-bottom: 6px;">⏱️</span>
        <strong style="font-size: 12px; color: var(--teal); font-weight: 800; display: block; margin-bottom: 2px; white-space: nowrap;">Quiz Whiz</strong>
        <p style="font-size: 10px; color: var(--muted); margin: 0; line-height: 1.2;">Finished the daily quiz</p>
      </div>
    `;
  }

  if (!hasBadges) {
    badgesHTML = `
      <div style="grid-column: span 3; font-size: 13px; color: var(--faint); text-align: center; padding: 10px 0;">
        Play again to challenge yourself and earn special run badges!
      </div>
    `;
  }

  return `
    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 24px 16px 20px; text-align: center;">
      <div style="margin: auto 0; display: flex; flex-direction: column; align-items: center; width: 100%; gap: 16px; animation: scaleIn 0.4s ease;">
        <div style="width: 64px; height: 64px; background: var(--teal-soft); border: 2px solid var(--teal); color: var(--teal); border-radius: 50%; display: grid; place-items: center; margin-bottom: 8px; box-shadow: 0 4px 12px rgba(69, 196, 176, 0.2);">
          <i data-lucide="check-circle" style="width: 32px; height: 32px;"></i>
        </div>
        
        <h2 style="font-size: 22px; font-weight: 900; margin-bottom: 4px;">Quiz Complete</h2>
        
        <div style="background: var(--card); border: 1px solid var(--line); border-radius: 24px; padding: 24px; width: 100%; box-shadow: 0 8px 30px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; gap: 12px;">
          <div style="font-size: 14px; font-weight: 800; color: var(--muted); text-transform: uppercase; letter-spacing: 0.05em;">Your Performance</div>
          
          <div style="font-size: 40px; font-weight: 900; color: var(--text); line-height: 1; margin: 4px 0;">
            ${quizCorrect} <span style="font-size: 20px; color: var(--muted); font-weight: 700;">/ 5</span>
          </div>
          
          <p style="font-size: 13.5px; color: var(--muted); font-weight: 700; margin-bottom: 8px;">correct answers</p>
          <div style="font-size: 15px; font-weight: 800; color: var(--teal); margin-bottom: 8px;">Total XP: +${quizCorrect * 10} XP</div>
          
          <p style="color: var(--text); font-size: 14px; line-height: 1.5; font-style: italic; max-width: 260px; margin: 0;">"${feedbackText}"</p>
        </div>

        <!-- Badges Section -->
        <div style="width: 100%; margin-top: 8px;">
          <div style="font-size: 13px; font-weight: 800; color: var(--muted); text-align: left; margin-left: 4px; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="award" style="width: 14px; height: 14px; color: var(--teal);"></i> Badges Earned
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; width: 100%;">
            ${badgesHTML}
          </div>
        </div>

        <!-- Buttons (No Play Again because it is Daily) -->
        <div style="width: 100%; display: flex; flex-direction: column; gap: 10px; margin-top: 16px;">
          <button class="btn btn-primary" data-action="revisit-quiz-answers" style="padding: 16px; border-radius: 16px; font-size: 15px; font-weight: 800; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 15px rgba(69, 196, 176, 0.3);">
            Revisit Your Answers
          </button>
          <button class="btn btn-ghost" data-action="close-quiz-flow" style="border: none; background: transparent; box-shadow: none; color: var(--muted); font-size: 14px; font-weight: 700; padding: 8px; margin-top: 4px; cursor: pointer;">
            Back to Learn
          </button>
        </div>
      </div>
    </div>
  `;
}
