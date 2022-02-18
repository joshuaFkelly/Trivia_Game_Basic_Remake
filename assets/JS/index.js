const gameSection = document.querySelector('#game');
const gameResults = document.querySelector('#gameResults');
const startBtn = document.querySelector('#startBtn');
const gameTime = document.querySelector('#timer');
let intervalID;
let time = 3;

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
const startGame = () => {
  displayGame();
  intervalID = setInterval(timer, 1000);
  setTimeout(() => {
    displayGameResults();
    clearInterval(intervalID);
  }, 3000);
};
startBtn.addEventListener('click', startGame);

// startBtn();

const displayGame = () => {
  let game = '';
  startBtn.remove();
  triviaQuestions.map((question, index) => {
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

    gameSection.innerHTML = game;
  });
};

const displayGameResults = () => {
  gameSection.remove();
  let gameStats = `
    <div id = "gameResults"
                    <h2> Game Over!</h2>
    <p id = "correct"> Correct Answers: ${correctScore} </p>
    <p id = "incorrect"> Incorrect Answers: ${incorrectScore}</p>
    <p id = "unanswered"> Unanswered: ${unansweredScore}</p>
    </div>
    `;
  gameResults.innerHTML = gameStats;
};

const timer = () => {
  time--;
  gameTime.textContent = `${time} seconds remaining`;
  if (time === 0) {
    displayGameResults();
  }
};
