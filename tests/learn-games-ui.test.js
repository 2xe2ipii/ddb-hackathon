const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const context = {
  console,
  state: {
    unmaskOpened: false,
    mythOpened: false,
    quizOpened: false,
    learnSubTab: 'games',
    mythAnswers: {},
    quizAnswers: {},
    mythFlowIndex: 0,
    quizFlowIndex: 0,
    sessionMythIds: ['m11', 'm1', 'm2', 'm3', 'm4'],
    sessionQuizIds: ['q1', 'q2', 'q3', 'q4', 'q5'],
  },
};

vm.createContext(context);
for (const file of ['js/data.js', 'js/screens/learn.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const html = vm.runInContext('learnHTML()', context);

assert.equal((html.match(/class="learn-card-head learn-game-card learn-game-card--gradient"/g) || []).length, 3);
assert.equal((html.match(/class="learn-game-cta"/g) || []).length, 3);
assert.equal((html.match(/>Play</g) || []).length, 3);
assert.equal((html.match(/\blearn-game-card--gradient/g) || []).length, 3);

assert.match(html, /<h3>Myths vs Facts<\/h3>/);
assert.match(html, /<h3>Daily Quiz<\/h3>/);
assert.match(html, /<h3>Unmask Drugs<\/h3>/);

assert.doesNotMatch(html, /<h1>Learn<\/h1>/);
assert.doesNotMatch(html, /Pick a mini game and play your way through safer choices/);
assert.doesNotMatch(html, /learn-games-label/);
assert.doesNotMatch(html, />Mini game</);
assert.doesNotMatch(html, /learn-game-icon/);
assert.doesNotMatch(html, /learn-game-playmark/);
assert.doesNotMatch(html, /Challenge a Myth/);
assert.doesNotMatch(html, /Start Daily Quiz/);
assert.doesNotMatch(html, /Play Game/);

console.log('learn games UI renders clean playable cards');
