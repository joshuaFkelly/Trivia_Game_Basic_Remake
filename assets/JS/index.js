const mainSection = document.querySelector('#main');
let correctScore = 0;
let incorrectScore = 0;
let unansweredScore = 0;
const triviaQuestions = [
  {
    question: 'Which geometric shape is used for stop signs?',
    a: 'Square',
    b: 'Triangle',
    c: 'Octagon',
    d: 'Hexagon',
    correct: 'Octagon',
  },
  {
    question: 'What is cynophobia?',
    a: 'Fear of Dogs',
    b: 'Fear of Cats',
    c: 'Fear of Heights',
    d: 'Fear of Dentists',
    correct: 'a',
  },
  {
    question: 'Who named the Pacific Ocean?',
    a: 'Ferdinand the Bull',
    b: 'Ferdinand Magellan',
    c: 'Franz Ferdinand',
    d: 'Ferdinand Marcos',
    correct: 'b',
  },
  {
    question: 'What is the biggest tech company in South Korea?',
    a: 'Lenovo',
    b: 'Huawei',
    c: 'Mitsibushi',
    d: 'Samsung',
    correct: 'd',
  },
];

const displayGame = () => {
  const gameContent = document.createElement('div');
  gameContent.id = 'game';

  let game = '';
  triviaQuestions.map((question) => {
    game += `
    <h3>${question.question}</h3>

    <input type="radio" id="${question.a}" name="${question.a}" value="${question.correct}">
    <label for="${question.a}">${question.a}</label>

    <input type="radio" id="${question.b}" name="${question.b}" value="${question.correct}">
    <label for="${question.b}">${question.b}</label>

    <input type="radio" id="${question.c}" name="${question.c}" value="${question.correct}">
    <label for="${question.c}">${question.c}</label>

    <input type="radio" id="${question.d}" name="${question.d}" value="${question.correct}">
    <label for="${question.d}">${question.d}</label>
    `;
  });
  gameContent.innerHTML = game;

  return mainSection.appendChild(gameContent);
};

const displayGameResults = () => {
  document.querySelector('#game').remove();
  document.querySelector('#timer').remove();
  const gameResults = document.createElement('div');
  gameResults.id = 'gameResults';
  const gameStats = `
                    <h2> Game Over!</h2>
    <p id = "correct"> Correct Answers: ${correctScore} </p>
    <p id = "incorrect"> Incorrect Answers: ${incorrectScore}</p>
    <p id = "unanswered"> Unanswered: ${unansweredScore}</p>
          <button id="restart"> RESTART </button>
          <button id="quit"> QUIT </button>
    `;
  gameResults.innerHTML = gameStats;
  return mainSection.appendChild(gameResults);
};

// --------------- TIMER -----------------------

// Function to execute when timer goes off
let updatedTime;
let gameDisplay;
let time = 3;

// clear interval/timeout
const stopGame = () => {
  clearInterval(updatedTime);
  console.log('interval cleared');
  clearTimeout(gameDisplay);
  console.log('timeoutcleared');
  displayGameResults();
  document.querySelector('#restart').addEventListener('click', restartGame);
  document.querySelector('#quit').addEventListener('click', quitGame);
};

// update timer
const updateTime = () => {
  console.log(time);
  if (time > 0) {
    time--;
    document.querySelector('#timer').textContent = `Time Remaining: ${time}`;
  } else {
    stopGame();
  }
};
// create timer element
const createTimer = () => {
  const timerElement = document.createElement('h2');
  timerElement.id = 'timer';
  timerElement.textContent = `Time Remaining: ${time}`;
  return mainSection.appendChild(timerElement);
};
// set interval/timeout
const startTimer = () => {
  if (time != 3) {
    time = 3;
  }
  createTimer();
  updatedTime = setInterval(updateTime, 1000);
  gameDisplay = setTimeout(stopGame, 3000, 'World');
};

// ----------------------------------------------

const startGame = () => {
  if (document.querySelector('#start')) {
    document.querySelector('#start').remove();
  }
  startTimer();
  displayGame();
};

const restartGame = () => {
  document.querySelector('#gameResults').remove();
  startGame();
};
const quitGame = () => {
  document.querySelector('#gameResults').remove();
  const startBtn = document.createElement('button');
  startBtn.id = 'start';
  startBtn.textContent = 'START';
  startBtn.addEventListener('click', startGame);
  return mainSection.appendChild(startBtn);
};

const startBtn = () => {
  const startBtn = document.createElement('button');
  startBtn.id = 'start';
  startBtn.textContent = 'START';
  startBtn.addEventListener('click', startGame);
  return mainSection.appendChild(startBtn);
};
document.onload = startBtn();
