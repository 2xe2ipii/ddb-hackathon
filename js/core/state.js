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
  triggerCelebration: true,
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
  /* profileBadgeOpen removed for Achievements module — see SRS.md §5.3 */
  achievementsExpanded: false,
  sessionMythIds: [],
  sessionQuizIds: [],
  sessionUnmaskIds: [],
  todayMythId: null,
  textSize: 'medium', /* added for Accessibility enhancements — see implementation_plan.md */
  colorblindMode: false, /* added for Accessibility enhancements — see implementation_plan.md */
  profileName: 'Kai', /* added for Profile enhancements — see implementation_plan.md */
  profileAge: 17, /* added for Profile enhancements — see implementation_plan.md */
  profilePic: null, /* added for Profile enhancements — see implementation_plan.md */
  shareModalOpen: false, /* added for Profile sharing — see implementation_plan.md */
  profileEditing: false, /* added for Profile enhancements — see implementation_plan.md */
  selectedMoodFilter: null, /* added for Mood calendar filters — see implementation_plan.md */
  achievementCategoryFilter: null, /* added for Achievement category chips — see implementation_plan.md */
  language: 'en', /* added for Tagalog translation toggle — see SRS.md §7.3 */
  igStoryModalOpen: false,
  profileTab: 'profile', /* added for profile 3-tab redesign */
  profileActivitiesFilter: 'registered', /* added for profile activities filter */
  unmaskOpened: false,
  unmaskGameState: 'entry',
  unmaskRoundIndex: 0,
  unmaskScore: 0,
  unmaskCluesUsed: 0,
  unmaskTapsLeft: 3,
  unmaskRevealedTiles: [],
  unmaskSelectedOption: null,
  unmaskRoundAnswered: false,
  unmaskCorrectCount: 0,
  unmaskEarnedSharpEye: false,
  unmaskEarnedFastReveal: false,
  unmaskEarnedClueSaver: false,
  unmaskDetectiveModeUnlocked: false,
  unmaskFullSweepUnlocked: false,
  unmaskRunDetectiveMode: false,
  expandedPosts: {},
  learnSubTab: 'games',
  shortsIndex: 0,
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