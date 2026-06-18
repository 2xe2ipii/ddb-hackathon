/* Achievements: badge definitions and unlock logic.
   Every badge unlocks from state the app already tracks
   (mythAnswers, quizAnswers, journalDone, journalDaysCount,
   registered, savedSupport, relaxCheckinState, streak) -
   no server, no new tracking beyond one small counter
   (journalDaysCount) bumped in app.js. */

const ACHIEVEMENTS = [
    // --- Streak & consistency ---
    {
        id: 'base-shield',
        icon: 'shield',
        name: 'Base Shield',
        grad: 'cat-streak',
        category: 'streak',
        desc: 'Streak started',
        lockedHint: 'Complete 1 day to start your streak',
        check: (s) => s.streak >= 1,
        progress: (s) => ({ current: s.streak, target: 1, text: `${1 - s.streak} more day` })
    },
    {
        id: 'golden-scales',
        icon: 'scale',
        name: 'Golden Scales',
        grad: 'cat-streak',
        category: 'streak',
        desc: '7-day streak',
        lockedHint: 'Reach a 7-day streak',
        check: (s) => s.streak >= 7,
        progress: (s) => ({ current: s.streak, target: 7, text: `${7 - s.streak} more days` })
    },
    {
        id: 'sword-of-truth',
        icon: 'sword',
        name: 'Sword of Truth',
        grad: 'cat-streak',
        category: 'streak',
        desc: '20-day streak',
        lockedHint: 'Reach a 20-day streak',
        check: (s) => s.streak >= 20,
        progress: (s) => ({ current: s.streak, target: 20, text: `${20 - s.streak} more days` })
    },
    {
        id: 'flame-of-clarity',
        icon: 'flame',
        name: 'Flame of Clarity',
        grad: 'cat-streak',
        category: 'streak',
        desc: '30-day streak',
        lockedHint: 'Reach a 30-day streak',
        check: (s) => s.streak >= 30,
        progress: (s) => ({ current: s.streak, target: 30, text: `${30 - s.streak} more days` })
    },

    // --- Learn tab: Myths vs Facts ---
    {
        id: 'myth-buster',
        icon: 'shield-question',
        name: 'Myth Buster',
        grad: 'cat-learn',
        category: 'learn',
        desc: 'Cleared 5 myths today',
        lockedHint: 'Answer all 5 Myths vs Facts cards',
        check: (s) => Object.keys(s.mythAnswers || {}).length >= 5,
        progress: (s) => {
            const count = Object.keys(s.mythAnswers || {}).length;
            return { current: count, target: 5, text: `${5 - count} more myths` };
        }
    },
    {
        id: 'sharp-eye',
        icon: 'eye',
        name: 'Sharp Eye',
        grad: 'cat-learn',
        category: 'learn',
        desc: '5/5 myths correct, no mistakes',
        lockedHint: 'Get all 5 myth cards right on the first try',
        check: (s) => {
            const ids = s.sessionMythIds || [];
            if (ids.length < 5) return false;
            return ids.every((id) => {
                const card = MYTH_CARDS.find((m) => m.id === id);
                return card && s.mythAnswers[id] === card.answer;
            });
        },
        progress: (s) => {
            const ids = s.sessionMythIds || [];
            const correct = ids.filter((id) => {
                const card = MYTH_CARDS.find((m) => m.id === id);
                return card && s.mythAnswers[id] === card.answer;
            }).length;
            return { current: correct, target: 5, text: `${5 - correct} more correct myths` };
        }
    },

    // --- Learn tab: Daily Quiz ---
    {
        id: 'quiz-whiz',
        icon: 'timer',
        name: 'Quiz Whiz',
        grad: 'cat-learn',
        category: 'learn',
        desc: 'Finished the daily quiz',
        lockedHint: 'Answer all 5 daily quiz questions',
        check: (s) => Object.keys(s.quizAnswers || {}).length >= 5,
        progress: (s) => {
            const count = Object.keys(s.quizAnswers || {}).length;
            return { current: count, target: 5, text: `${5 - count} more quiz questions` };
        }
    },
    {
        id: 'perfect-score',
        icon: 'award',
        name: 'Perfect Score',
        grad: 'cat-learn',
        category: 'learn',
        desc: '5/5 correct on the daily quiz',
        lockedHint: 'Answer every quiz question correctly',
        check: (s) => {
            const ids = s.sessionQuizIds || [];
            if (ids.length < 5) return false;
            return ids.every((id) => {
                const q = QUIZ.find((q) => q.id === id);
                return q && s.quizAnswers[id] === q.answer;
            });
        },
        progress: (s) => {
            const ids = s.sessionQuizIds || [];
            const correct = ids.filter((id) => {
                const q = QUIZ.find((q) => q.id === id);
                return q && s.quizAnswers[id] === q.answer;
            }).length;
            return { current: correct, target: 5, text: `${5 - correct} more correct quiz answers` };
        }
    },

    // --- Mental health: journal, mood, check-in ---
    {
        id: 'first-reflection',
        icon: 'feather',
        name: 'First Reflection',
        grad: 'cat-mental',
        category: 'mental',
        desc: 'Wrote a journal entry',
        lockedHint: 'Save your first private reflection',
        check: (s) => !!s.journalDone,
        progress: (s) => ({ current: s.journalDone ? 1 : 0, target: 1, text: 'Write 1 journal entry' })
    },
    {
        id: 'open-book',
        icon: 'book-open',
        name: 'Open Book',
        grad: 'cat-mental',
        category: 'mental',
        desc: 'Journaled 7 days total',
        lockedHint: `Journal on 7 different days (${0}/7 so far)`,
        check: (s) => (s.journalDaysCount || 0) >= 7,
        lockedHintFn: (s) => `Journal on 7 different days (${s.journalDaysCount || 0}/7 so far)`,
        progress: (s) => ({ current: s.journalDaysCount || 0, target: 7, text: `${7 - (s.journalDaysCount || 0)} more journal days` })
    },
    {
        id: 'self-check-starter',
        icon: 'heart-pulse',
        name: 'Self-Check Starter',
        grad: 'cat-mental',
        category: 'mental',
        desc: 'Completed the PHQ-4 check-in',
        lockedHint: 'Finish the Relax tab self check-in',
        check: (s) => s.relaxCheckinState === 'completed',
        progress: (s) => ({ current: s.relaxCheckinState === 'completed' ? 1 : 0, target: 1, text: 'Complete self check-in' })
    },

    // --- Community ---
    {
        id: 'community-starter',
        icon: 'heart-handshake',
        name: 'Community Starter',
        grad: 'cat-community',
        category: 'community',
        desc: 'Registered or saved a resource',
        lockedHint: 'Register for an event or save a support resource',
        check: (s) => (s.registered && s.registered.size > 0) || (s.savedSupport && s.savedSupport.size > 0),
        progress: (s) => {
            const count = (s.registered ? s.registered.size : 0) + (s.savedSupport ? s.savedSupport.size : 0);
            return { current: count >= 1 ? 1 : 0, target: 1, text: 'Register for an event or save a support resource' };
        }
    },
    {
        id: 'helping-hand',
        icon: 'hand-heart',
        name: 'Helping Hand',
        grad: 'cat-community',
        category: 'community',
        desc: 'Saved a counselor contact for a friend',
        lockedHint: 'Save the school guidance / counselor resource',
        check: (s) => s.savedSupport && s.savedSupport.has('r2'),
        progress: (s) => ({ current: s.savedSupport && s.savedSupport.has('r2') ? 1 : 0, target: 1, text: 'Save the school guidance / counselor resource' })
    },
    {
        id: 'detective-mode',
        icon: 'search',
        name: 'Detective Mode',
        grad: 'cat-learn',
        category: 'learn',
        desc: 'Careful and thorough investigation',
        lockedHint: 'Reveal all tiles and use all clues in a round',
        check: (s) => !!s.unmaskDetectiveModeUnlocked,
        progress: (s) => ({ current: s.unmaskDetectiveModeUnlocked ? 1 : 0, target: 1, text: 'Investigate thoroughly in Unmask Drugs' })
    },
    {
        id: 'full-sweep',
        icon: 'check-square',
        name: 'Full Sweep',
        grad: 'cat-learn',
        category: 'learn',
        desc: 'Complete all 5 unmask rounds',
        lockedHint: 'Complete all 5 rounds of Unmask Drugs',
        check: (s) => !!s.unmaskFullSweepUnlocked,
        progress: (s) => ({ current: s.unmaskFullSweepUnlocked ? 1 : 0, target: 1, text: 'Complete all 5 unmask rounds' })
    },
];

function isUnlocked(achievement, s) {
    try {
        return !!achievement.check(s);
    } catch (e) {
        return false;
    }
}

function getUnlockedIds(s) {
    return new Set(ACHIEVEMENTS.filter((a) => isUnlocked(a, s)).map((a) => a.id));
}

function getAchievementHint(a, s) {
    return a.lockedHintFn ? a.lockedHintFn(s) : a.lockedHint;
}

function getNextBadgeNudge(s) {
    const locked = ACHIEVEMENTS.filter((a) => !isUnlocked(a, s));
    if (locked.length === 0) return null;

    const progressList = locked.map((a) => {
        if (typeof a.progress !== 'function') return null;
        const prog = a.progress(s);
        if (!prog) return null;
        const ratio = prog.target > 0 ? prog.current / prog.target : 0;
        return { badge: a, ratio: ratio, text: prog.text };
    }).filter((p) => p !== null && p.ratio < 1.0);

    if (progressList.length === 0) return null;

    progressList.sort((a, b) => b.ratio - a.ratio);
    return progressList[0];
}

/* Compare unlocked-badge sets before/after a state mutation and toast
   for anything newly earned. Call this right after any action that
   could move the needle (journal save, quiz/myth completion, event
   registration, resource save, check-in completion, streak bump). */
function checkAchievements(prevUnlockedIds, currentState) {
    const nowUnlocked = getUnlockedIds(currentState);
    const newlyUnlocked = [...nowUnlocked].filter((id) => !prevUnlockedIds.has(id));
    newlyUnlocked.forEach((id, i) => {
        const a = ACHIEVEMENTS.find((x) => x.id === id);
        if (!a) return;
        setTimeout(() => toast('award', `Badge unlocked: ${a.name}!`), 280 + i * 650);
    });
    return nowUnlocked;
}