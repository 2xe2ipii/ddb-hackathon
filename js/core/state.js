/* Shared mutable app state and DOM anchors. */

var state = {
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
  reflection: '',
  streak: 7,
  registered: new Set(),
  savedSupport: new Set(),
  breathing: false,
  mythOpened: false,
  quizOpened: false,
};

var app = document.getElementById('app');
var phone = document.getElementById('phone');
var phoneWrap = document.getElementById('phoneWrap');

var breatheTimer = null;
var countTimer = null;
var quizTimer = null;
