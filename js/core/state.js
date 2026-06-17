/* Shared mutable app state and DOM anchors. */

var defaultState = {
  launched: false,
  tab: 'today',
  todayMood: null,
  mythAnswers: {},
  mythFlowIndex: 0,
  quizAnswers: {},
  quizFlowIndex: 0,
  quizTimeLeft: 10,
  learnMode: 'myth',
  journalDone: false,
  journalDaysCount: 0,
  reflection: '',
  streak: 7,
  registered: new Set(),
  savedSupport: new Set(),
  breathing: false,
  mythOpened: false,
  quizOpened: false,
  theme: 'dark',
  relaxCheckinState: 'not_started', // 'not_started', 'in_progress', 'completed'
  relaxCheckinAnswers: {},
  relaxCheckinIndex: 0,
  relaxSelectedExercise: 'box', // 'box', '478', 'coherent'
  relaxToolkitOpen: null,
  expandedQuest: null,
  profileBadgeOpen: null,
  sessionMythIds: [],
  sessionQuizIds: [],
  todayMythId: null
};

function loadState() {
  const saved = localStorage.getItem('ddb_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.registered) parsed.registered = new Set(parsed.registered);
      if (parsed.savedSupport) parsed.savedSupport = new Set(parsed.savedSupport);
      if (parsed.tab === 'breathe') parsed.tab = 'relax';
      return Object.assign({}, defaultState, parsed);
    } catch (e) {
      console.error('Failed to load state', e);
    }
  }
  return Object.assign({}, defaultState);
}

var state = loadState();

function saveState() {
  const toSave = Object.assign({}, state);
  toSave.registered = Array.from(toSave.registered);
  toSave.savedSupport = Array.from(toSave.savedSupport);
  localStorage.setItem('ddb_state', JSON.stringify(toSave));
}

var app = document.getElementById('app');
var phone = document.getElementById('phone');
var phoneWrap = document.getElementById('phoneWrap');

var breatheTimer = null;
var countTimer = null;
var quizTimer = null;