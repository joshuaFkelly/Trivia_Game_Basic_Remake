const triviaQuestions = [
  // question one
  {
    id: 1,
    question: "Which geometric shape is used for stop signs?",
    answers: [
      { num: 1, answer: "Square", correct: false },
      { num: 2, answer: "Triangle", correct: false },
      { num: 3, answer: "Octagon", correct: true },
      { num: 4, answer: "Hexagon", correct: false },
    ],
  },

  // question two
  {
    id: 2,
    question: "What is cynophobia?",
    answers: [
      { num: 5, answer: "Fear of Dogs", correct: true },
      { num: 6, answer: "Fear of Cats", correct: false },
      { num: 7, answer: "Fear of Dentists", correct: false },
      { num: 8, answer: "Fear of Doctors", correct: false },
    ],
  },
  // question three
  {
    id: 3,
    question: "Who named the Pacific Ocean?",
    answers: [
      { num: 9, answer: "Ferdinand the Bull", correct: false },
      { num: 10, answer: "Ferdinand Magellan", correct: true },
      { num: 11, answer: "Franz Ferdinand", correct: false },
      { num: 12, answer: "Ferdinand Marcos", correct: false },
    ],
  },
  // question four
  {
    id: 4,
    question: "What is the biggest tech company in South Korea?",
    answers: [
      { num: 13, answer: "Lenovo", correct: false },
      { num: 14, answer: "Huawei", correct: false },
      { num: 15, answer: "Mitsibushi", correct: false },
      { num: 16, answer: "Samsung", correct: true },
    ],
  },
];

const mainEl = document.getElementById("main");

class Game {
  constructor() {
    this.correctScore = 0;
    this.incorrectScore = 0;
    this.unansweredScore = 0;
    this.time = 3;
    this.intervalID;
    this.timeoutID;
  }

  incrementCorrectScore() {
    return this.correctScore++;
  }
  incrementIncorrectScore() {
    return this.incorrectScore++;
  }
  incrementUnansweredScore() {
    return this.unansweredScore++;
  }

  resetTime() {
    this.time = 3;
  }

  startTimer() {
    document.getElementById("timer").innerText = this.time;
    this.intervalID = setInterval(() => {
      this.time--;
      document.getElementById("timer").innerText = this.time;
    }, 1000);

    this.timeoutID = setTimeout(() => {
      // Stop the timer
      this.stopTimer();

      // evaluate score
      this.evalScore();

      // remove quiz
      document.getElementById("quiz").remove();

      // Show Game Over Screen
      this.renderGameOver();
    }, 1000 * this.time);
  }

  stopTimer() {
    clearInterval(this.intervalID);
    clearTimeout(this.timeoutID);
  }
  renderGame() {
    mainEl.innerHTML = `
    <form>
        <div id="game">
         <h1> Trivia Game! </h1>
          <p> You have a limited amount of time to select your answers. </p>
          <p> Select your answer by clicking on the radio button corresponding with your answer. </p>
          <p> Points are added up after the quiz is over, and ONLY if the quiz is finished in time. </p>
         <h2> Timer:  <span id="timer">--</span> seconds remaining</h2>
        </div>

        <section id="quiz"></section>
    
    </form>
    
    <button id="start"> Start </button>
    `;
    document.querySelector("#start").addEventListener("click", startGame);
  }
  renderGameOver() {
    mainEl.innerHTML = `
    <div id="game">
      <h1> GAME OVER </h1>
      <h3> Correct Answers: <span id="correct">${this.correctScore}</span> </h3>
      <h3> Incorrect Answers: <span id="incorrect">${this.incorrectScore}</span> </h3>
      <h3> Unanswered Answers: <span id="unanswered">${this.unansweredScore}</span> </h3>
      <button id = "quit"> Quit </button> 
    </div>
    `;
    document.getElementById("quit").addEventListener("click", () => {
      new Game();
      this.renderGame();
    });
  }

  evalScore() {
    document.querySelectorAll(".answer").forEach((answer) => {
      if (answer.checked && answer.value === "true") {
        this.incrementCorrectScore();
      }
      if (answer.checked && answer.value === "false") {
        this.incrementIncorrectScore();
      }
    });
  }
}

class Question extends Game {
  constructor(id, question, answerA, answerB, answerC, answerD) {
    super();
    this.id = id;
    this.question = question;
    this.answerA = answerA;
    this.answerB = answerB;
    this.answerC = answerC;
    this.answerD = answerD;
  }

  renderQuiz() {
    return (document.getElementById("quiz").innerHTML += `
        <fieldset id="question${this.id}">
             <legend> <h3>${this.question}</h3> </legend>
            <ul>
                <li>
                    <input type="radio" id="${this.answerA.num}" class="answer" name="${this.id}" value="${this.answerA.correct}">
                    <label for="${this.answerA.num}">${this.answerA.answer}</label>
                </li>

                <li>
                    <input type="radio" id="${this.answerB.num}" class="answer" name="${this.id}" value="${this.answerB.correct}">
                    <label for="${this.answerB.num}">${this.answerB.answer}</label>
                </li>

                <li>
                    <input type="radio" id="${this.answerC.num}" class="answer" name="${this.id}" value="${this.answerC.correct}">
                    <label for="${this.answerC.num}">${this.answerC.answer}</label>
                </li>

                <li>
                    <input type="radio" id="${this.answerD.num}" class="answer" name="${this.id}" value="${this.answerD.correct}">
                    <label for="${this.answerD.num}">${this.answerD.answer}</label>
                </li>
            </ul>
        </fieldset>    
    `);
  }
}
// Declare a new game
const game = new Game();

function submitQuiz(e) {
  // prevent default so i can manipulate data
  e.preventDefault();

  // Stop the timer when user finish quiz
  game.stopTimer();

  // evaluate score
  game.evalScore();

  // remove quiz
  document.getElementById("quiz").remove();

  // Show Game Over Screen
  game.renderGameOver();
}

function createQuiz() {
  // Loop through array of all my questions and
  triviaQuestions.forEach((q) => {
    // destructuring really comes in handy lol
    const { id, question, answers } = q;
    const [answerA, answerB, answerC, answerD] = answers;

    // Create a new question object for each one
    const quiz = new Question(id, question, answerA, answerB, answerC, answerD);

    // render quiz to screen
    quiz.renderQuiz();
  });

  // create submit button, append to quiz element
  const submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit Quiz";
  submitBtn.id = "submit";
  document.getElementById("quiz").appendChild(submitBtn);

  // remove button
  document.getElementById("start").remove();
}

function startGame(e) {
  if (game.time != 3) {
    game.time = 3;
  }
  // first create the quiz
  createQuiz();

  // start timer
  game.startTimer();
}

game.renderGame();

document.getElementById("start").addEventListener("click", startGame);
