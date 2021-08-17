let counter = 0,
  shuffledStates,
  correctStates = [];
const stateQuestionDisplay = document.querySelector('.state');
const question = document.querySelector('.question');
const gameOverGraphic = document.querySelector('.game-over');

function shuffle(array) {
  // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function gameQuestion() {
  shuffledStates = shuffle(states);
  stateQuestionDisplay.textContent = shuffledStates[0];
}

function trackClicks(e) {
  if (e.target.classList.contains('st0')) {
    // counter++;
    // displayCounter();
    if (e.target.id.replace(/_/g, ' ') === stateQuestionDisplay.textContent) {
      correctAnswer(e);
    } else {
      e.target.setAttribute('class', 'incorrect');
      setTimeout(() => {
        e.target.setAttribute('class', 'grey st0');
      }, 100);
      counter++;
      displayCounter();
    }
  }
}

function correctAnswer(e) {
  let correctSound = document.getElementById('correct-sound');
  correctSound.currentTime = 0;
  correctSound.play();
  e.target.setAttribute('class', 'correct');
  correctStates.push(stateQuestionDisplay.textContent);
  displayScore();
  stateQuestionDisplay.textContent = shuffledStates[correctStates.length];

  if (correctStates.length === 50) {
    gameOver();
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

function gameOver() {
  const praise = document.querySelector('.praise');
  const gameRoundStats = document.querySelector('.game-round-stats');
  document.getElementById('cheer-sound').play();
  gameOverGraphic.classList.add('grow');
  question.style.visibility = 'hidden';

  if (counter > 5) {
    praise.textContent = 'Keep Trying!';
    gameRoundStats.textContent = `You missed ${counter} states.`;
  } else if (counter > 0) {
    praise.textContent = 'Great Job!';
    gameRoundStats.textContent = `You only missed ${counter} states.`;
  } else {
    praise.textContent = 'Amazing!';
    gameRoundStats.textContent = `You didn't miss a single one!`;
  }
}

function restartGame() {
  const allStates = document.querySelectorAll('.correct');
  allStates.forEach((state) => {
    state.setAttribute('class', 'grey st0');
  });

  question.style.visibility = 'visible';
  gameOverGraphic.classList.remove('grow');
  counter = 0;
  correctStates = [];
  displayScore();
  displayCounter();
  gameQuestion();
}

document.querySelector('#united-states').addEventListener('click', trackClicks);
document.querySelector('.restart-btn').addEventListener('click', restartGame);

gameQuestion();

// Test
function getToEnd() {
  correctStates = 50;
  counter = 8;
  // counter = 3;
  // counter = 0;
  gameOver();
}

// getToEnd();
