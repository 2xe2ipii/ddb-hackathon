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
        grad: 'g1',
        desc: 'Streak started',
        lockedHint: 'Complete 1 day to start your streak',
        check: (s) => s.streak >= 1,
    },
    {
        id: 'golden-scales',
        icon: 'scale',
        name: 'Golden Scales',
        grad: 'g2',
        desc: '7-day streak',
        lockedHint: 'Reach a 7-day streak',
        check: (s) => s.streak >= 7,
    },
    {
        id: 'sword-of-truth',
        icon: 'sword',
        name: 'Sword of Truth',
        grad: 'g3',
        desc: '20-day streak',
        lockedHint: 'Reach a 20-day streak',
        check: (s) => s.streak >= 20,
    },
    {
        id: 'flame-of-clarity',
        icon: 'flame',
        name: 'Flame of Clarity',
        grad: 'g4',
        desc: '30-day streak',
        lockedHint: 'Reach a 30-day streak',
        check: (s) => s.streak >= 30,
    },

    // --- Learn tab: Myths vs Facts ---
    {
        id: 'myth-buster',
        icon: 'shield-question',
        name: 'Myth Buster',
        grad: 'g1',
        desc: 'Cleared 5 myths today',
        lockedHint: 'Answer all 5 Myths vs Facts cards',
        check: (s) => Object.keys(s.mythAnswers || {}).length >= 5,
    },
    {
        id: 'sharp-eye',
        icon: 'eye',
        name: 'Sharp Eye',
        grad: 'g3',
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
    },

    // --- Learn tab: Daily Quiz ---
    {
        id: 'quiz-whiz',
        icon: 'timer',
        name: 'Quiz Whiz',
        grad: 'g2',
        desc: 'Finished the daily quiz',
        lockedHint: 'Answer all 5 daily quiz questions',
        check: (s) => Object.keys(s.quizAnswers || {}).length >= 5,
    },
    {
        id: 'perfect-score',
        icon: 'award',
        name: 'Perfect Score',
        grad: 'g3',
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
    },

    // --- Mental health: journal, mood, check-in ---
    {
        id: 'first-reflection',
        icon: 'feather',
        name: 'First Reflection',
        grad: 'g1',
        desc: 'Wrote a journal entry',
        lockedHint: 'Save your first private reflection',
        check: (s) => !!s.journalDone,
    },
    {
        id: 'open-book',
        icon: 'book-open',
        name: 'Open Book',
        grad: 'g3',
        desc: 'Journaled 7 days total',
        lockedHint: `Journal on 7 different days (${0}/7 so far)`,
        check: (s) => (s.journalDaysCount || 0) >= 7,
        lockedHintFn: (s) => `Journal on 7 different days (${s.journalDaysCount || 0}/7 so far)`,
    },
    {
        id: 'self-check-starter',
        icon: 'heart-pulse',
        name: 'Self-Check Starter',
        grad: 'g2',
        desc: 'Completed the PHQ-4 check-in',
        lockedHint: 'Finish the Relax tab self check-in',
        check: (s) => s.relaxCheckinState === 'completed',
    },

    // --- Community ---
    {
        id: 'community-starter',
        icon: 'heart-handshake',
        name: 'Community Starter',
        grad: 'g1',
        desc: 'Registered or saved a resource',
        lockedHint: 'Register for an event or save a support resource',
        check: (s) => (s.registered && s.registered.size > 0) || (s.savedSupport && s.savedSupport.size > 0),
    },
    {
        id: 'helping-hand',
        icon: 'hand-heart',
        name: 'Helping Hand',
        grad: 'g2',
        desc: 'Saved a counselor contact for a friend',
        lockedHint: 'Save the school guidance / counselor resource',
        check: (s) => s.savedSupport && s.savedSupport.has('r2'),
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