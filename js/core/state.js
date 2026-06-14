/* Shared mutable app state and DOM anchors. */

var state = {
  launched: false,
  tab: 'today',
  todayMood: null,
  mythIndex: 0,
  mythAnswer: null,
  quizAnswer: null,
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
