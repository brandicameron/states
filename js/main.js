import { states } from './states.js';
let counter = 0;
let correctStates = [];
const stateQuestionDisplay = document.querySelector('.state');
let shuffledStates;

function shuffle(array) {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
function question() {
  shuffledStates = shuffle(states);
  stateQuestionDisplay.textContent = shuffledStates[0];
}

function trackClicks(e) {
  let correctSound = document.getElementById('correct-sound');
  if (e.target.classList.contains('st0')) {
    counter++;
    displayCounter();
    if (e.target.id.replace(/_/g, ' ') === stateQuestionDisplay.textContent) {
      correctSound.currentTime = 0;
      correctSound.play();
      e.target.setAttribute('class', 'correct');
      correctStates.push(stateQuestionDisplay.textContent);
      displayScore();
      zoomOutMobile();
      stateQuestionDisplay.textContent = shuffledStates[correctStates.length];
    }
  }

  if (correctStates.length === 50) {
    document.getElementById('cheer-sound').play();
    document.querySelector('.game-over').classList.add('grow');
    document.querySelector('.question').style.visibility = 'hidden';
  }
}

function displayCounter() {
  let clickDisplay = document.querySelector('.click-display');
  clickDisplay.textContent = counter;
}

function displayScore() {
  let displayScore = document.querySelector('.score-display');
  displayScore.textContent = correctStates.length;
}

function restart() {
  const allStates = document.querySelectorAll('.correct');

  allStates.forEach((state) => {
    state.setAttribute('class', 'grey');
  });

  document.querySelector('.question').style.visibility = 'visible';
  document.querySelector('.game-over').classList.remove('grow');
  counter = 0;
  correctStates = [];
  displayScore();
  displayCounter();
  question();
}

document.querySelector('#united-states').addEventListener('click', trackClicks);
document.querySelector('.restart-btn').addEventListener('click', restart);

function zoomOutMobile() {
  var viewport = document.querySelector('meta[name="viewport"]');

  if (viewport) {
    viewport.content = 'initial-scale=0.1';
    viewport.content = 'initial-scale=1';
  }
}

question();
