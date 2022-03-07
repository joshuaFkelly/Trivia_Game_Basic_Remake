// --------------- Global Variables  ------------------
const main = document.querySelector('#main');
const questionAnswers = document.getElementsByName('questionOne');

const triviaQuestions = [
  // question one
  {
    id: 0,
    questionOne: 'Which geometric shape is used for stop signs?',
    answerA: 'Square',
    answerB: 'Triangle',
    answerC: 'Octagon',
    answerD: 'Hexagon',
    correctAnswer: 'Octagon',
  },
  {
    id: 1,
    questionTwo: 'What is cynophobia?',
    answerA: 'Fear of Dogs',
    answerB: 'Fear of Cats',
    answerC: 'Fear of Dentists',
    answerD: 'Fear of Doctors',
    correctAnswer: 'Fear of Dogs',
  },
  {
    id: 2,
    questionTwo: 'Who named the Pacific Ocean?',
    answerA: 'Ferdinand the Bull',
    answerB: 'Ferdinand Magellan',
    answerC: 'Franz Ferdinand',
    answerD: 'Ferdinand Marcos',
    correctAnswer: 'Ferdinand Magellan',
  },
  {
    id: 3,
    questionTwo: 'What is the biggest tech company in South Korea?',
    answerA: 'Lenovo',
    answerB: 'Huawei',
    answerC: 'Mitsibushi',
    answerD: 'Samsung',
    correctAnswer: 'Samsung',
  },
];

//  Object used to create a question for the quiz
function TriviaQuestion(
  id,
  question,
  answerA,
  answerB,
  answerC,
  answerD,
  correctAnswer
) {
  this.id = id;
  this.question = question;
  this.answerA = answerA;
  this.answerB = answerB;
  this.answerC = answerC;
  this.answerD = answerD;
  this.correctAnswer = correctAnswer;
}

// Method to render question to DOM
TriviaQuestion.prototype.render = function () {
  return (main.innerHTML = `
  
<form id="quiz">
  <div id="question${this.id}" class="quizQuestion">
    <label for="questionOne">${this.question}</label>
    <br>
    <input type="radio" id="answerA" name="questionOne" value="${this.answerA}">
    <label for="answerA">${this.answerA}</label>
    <br>
    <input type="radio" id="answerB" name="questionOne" value="${this.answerB}">
    <label for="answerB">${this.answerB}</label>
    <br>
    <input type="radio" id="answerC" name="questionOne" value="${this.answerC}">
    <label for="answerC">${this.answerC}</label>
    <br>
    <input type="radio" id="answerD" name="questionOne" value="${this.answerD}">
    <label for="answerD">${this.answerD}</label>
  </div>
  <input type="submit" value="Submit Answers"> 
</form>  
  
`);
};

// Variable that references the new  TriviaQuestion Object
const questionOne = new TriviaQuestion(
  triviaQuestions[0].id,
  triviaQuestions[0].questionOne,
  triviaQuestions[0].answerA,
  triviaQuestions[0].answerB,
  triviaQuestions[0].answerC,
  triviaQuestions[0].answerD,
  triviaQuestions[0].correctAnswer
);

// Renders Question One to HTML using .innerHTML = ``
questionOne.render();

// Object to deal with Score Data
function Score(correctScore, incorrectScore) {
  this.correctScore = correctScore;
  this.incorrectScore = incorrectScore;
}

// Method to calculate correct score
Score.prototype.incrementCorrectScore = function () {
  this.correctScore++;
};

// Method to calculate correct score
Score.prototype.incrementIncorrectScore = function () {
  this.incorrectScore++;
};

// Method to display score to DOM
Score.prototype.displayScore = function () {
  return (main.innerHTML = `
  
          <div id="gameOver">
            <h1 id="gameOverTitle">Game Over!</h1>
            <p id="correctScore">Correct: ${this.correctScore} </p>
            <p id="incorrectScore">Incorrect: ${this.incorrectScore} </p>
            <button id="restartBtn">Restart</button>
            <button id="endBtn">End</button>
        </div>
  
  `);
};
// Form Submission Event Listener
function calculateScore(e) {
  // Prevent submit default action
  e.preventDefault();

  // create new Score Object
  const score = new Score(0, 0);

  // Loop through all input names
  questionAnswers.forEach((ans) => {
    // Check if radio btn is checked, and if value === the correct answer
    if (ans.checked && ans.value === questionOne.correctAnswer) {
      // If it is the correct answer, then Increment Correct Score
      score.incrementCorrectScore();
    }

    // Check if radio btn is checked, and if value === the correct answer
    if (ans.checked && ans.value != questionOne.correctAnswer) {
      // If it is NOT the correct answer, then Increment Correct Score
      score.incrementIncorrectScore();
    }
  });

  // Display Score Once finished Calculating
  score.displayScore();
}

// Event Listener for Form(#Quiz) submit event
document.querySelector('#quiz').addEventListener('submit', calculateScore);
