// // --------------- Global Variables  ------------------
// const main = document.querySelector('#main');
// const triviaQuestions = [
//   {
//     id: 0,
//     question: 'Which geometric shape is used for stop signs?',
//     answerA: 'Square',
//     answerB: 'Triangle',
//     answerC: 'Octagon',
//     answerD: 'Hexagon',
//     correctAnswer: 'Octagon',
//   },
//   {
//     id: 1,
//     question: 'What is cynophobia?',
//     answerA: 'Fear of Dogs',
//     answerB: 'Fear of Cats',
//     answerC: 'Fear of Dentists',
//     answerD: 'Fear of Doctors',
//     correctAnswer: 'Fear of Dogs',
//   },
//   {
//     id: 2,
//     question: 'Who named the Pacific Ocean?',
//     answerA: 'Ferdinand the Bull',
//     answerB: 'Ferdinand Magellan',
//     answerC: 'Franz Ferdinand',
//     answerD: 'Ferdinand Marcos',
//     correctAnswer: 'Ferdinand Magellan',
//   },
//   {
//     id: 3,
//     question: 'What is the biggest tech company in South Korea?',
//     answerA: 'Lenovo',
//     answerB: 'Huawei',
//     answerC: 'Mitsibushi',
//     answerD: 'Samsung',
//     correctAnswer: 'Samsung',
//   },
// ];

// //  Object used to create a question for the quiz
// function TriviaQuestion(
//   id,
//   question,
//   answerA,
//   answerB,
//   answerC,
//   answerD,
//   correctAnswer
// ) {
//   this.id = id;
//   this.question = question;
//   this.answerA = answerA;
//   this.answerB = answerB;
//   this.answerC = answerC;
//   this.answerD = answerD;
//   this.correctAnswer = correctAnswer;
// }

// // Method to render question to DOM
// TriviaQuestion.prototype.render = function () {
//   return `

//   <div id="question${this.id}" class="quizQuestion">
//     <label for="questionOne">${this.question}</label>
//     <br>
//     <input type="radio" id="${this.answerA}" class = "answer" name="question${this.id}" value="${this.correctAnswer}">
//     <label for="${this.answerA}">${this.answerA}</label>
//     <br>
//     <input type="radio" id="${this.answerB}" class = "answer" name="question${this.id}" value="${this.correctAnswer}">
//     <label for="${this.answerB}">${this.answerB}</label>
//     <br>
//     <input type="radio" id="${this.answerC}" class = "answer" name="question${this.id}" value="${this.correctAnswer}">
//     <label for="${this.answerC}">${this.answerC}</label>
//     <br>
//     <input type="radio" id="${this.answerD}" class = "answer" name="question${this.id}" value="${this.correctAnswer}">
//     <label for="${this.answerD}">${this.answerD}</label>
//   </div>

// `;
// };

// // Object to deal with Score Data
// function Score(correctScore, incorrectScore) {
//   this.correctScore = correctScore;
//   this.incorrectScore = incorrectScore;
// }

// // Method to calculate correct score
// Score.prototype.incrementCorrectScore = function () {
//   this.correctScore++;
// };

// // Method to calculate correct score
// Score.prototype.incrementIncorrectScore = function () {
//   this.incorrectScore++;
// };

// // Method to display score to DOM
// Score.prototype.displayScore = function () {
//   return (main.innerHTML = `

//           <div id="gameOver">
//             <h1 id="gameOverTitle">Game Over!</h1>
//             <p id="correctScore">Correct: ${this.correctScore} </p>
//             <p id="incorrectScore">Incorrect: ${this.incorrectScore} </p>
//             <button id="restartBtn">Restart</button>
//             <button id="endBtn">End</button>
//         </div>

//   `);
// };

// // Callback to form submit button
// function calculateScore(e) {
//   e.preventDefault();

//   // create new Score Object
//   const score = new Score(0, 0);
//   console.log(score);
//   // Loop through all input names
//   document.querySelectorAll('.answer').forEach((ans) => {
//     // Check if radio btn is checked, and if value === the correct answer
//     if (ans.checked && ans.value === ans.id) {
//       // If it is the correct answer, then Increment Correct Score
//       score.incrementCorrectScore();
//       console.log(score);
//       console.log('Correct!');
//     }

//     // Check if radio btn is checked, and if value === the correct answer
//     if (ans.checked && ans.value != ans.id) {
//       // If it is NOT the correct answer, then Increment Correct Score
//       score.incrementIncorrectScore();
//       console.log(score);
//       console.log('Incorrect!');
//     }
//   });

//   // Display Score Once finished Calculating
//   score.displayScore();
// }

// // call back function for start game button.
// function startGame() {
//   // Removes Start Button
//   document.querySelector('#start').remove();

//   // Creates Form Element to put the questions in
//   const form = document.createElement('form');

//   // give form id
//   form.id = 'quiz';

//   // loops through main array to create new questions for each entry in array
//   triviaQuestions.forEach((q) => {
//     const question = new TriviaQuestion(
//       q.id,
//       q.question,
//       q.answerA,
//       q.answerB,
//       q.answerC,
//       q.answerD,
//       q.correctAnswer
//     );
//     // add questions inside form
//     form.innerHTML += question.render();
//   });

//   // Creates Submit button for quiz
//   const submitBtn = document.createElement('button');

//   // Give button submit type
//   submitBtn.type = 'submit';

//   // Submit Button text
//   submitBtn.innerText = 'Submit Answers';

//   // Add submit event listener to quiz
//   form.addEventListener('submit', calculateScore);

//   // Append Button to form
//   form.appendChild(submitBtn);

//   // append form to main div in html
//   main.appendChild(form);
// }

// // Event Listener to Start Game
// document.querySelector('#start').addEventListener('click', startGame);
