// const mainSection = document.querySelector('#main');
// let correctScore = 0;
// let incorrectScore = 0;
// let unansweredScore = 0;
// const triviaQuestions = [
//   // question one
//   {
//     question: 'Which geometric shape is used for stop signs?',
//     answers: [
//       { answer: 'Square', correct: false },
//       { answer: 'Triangle', correct: false },
//       { answer: 'Octagon', correct: true },
//       { answer: 'Hexagon', correct: false },
//     ],
//   },

//   // question two
//   {
//     question: 'What is cynophobia?',
//     answers: [
//       { answer: 'Fear of Dogs', correct: true },
//       { answer: 'Fear of Cats', correct: false },
//       { answer: 'Fear of Dentists', correct: false },
//       { answer: 'Fear of Doctors', correct: false },
//     ],
//   },
//   // question three
//   {
//     question: 'Who named the Pacific Ocean?',
//     answers: [
//       { answer: 'Ferdinand the Bull', correct: false },
//       { answer: 'Ferdinand Magellan', correct: true },
//       { answer: 'Franz Ferdinand', correct: false },
//       { answer: 'Ferdinand Marcos', correct: false },
//     ],
//   },
//   // question four
//   {
//     question: 'What is the biggest tech company in South Korea?',
//     answers: [
//       { answer: 'Lenovo', correct: false },
//       { answer: 'Huawei', correct: false },
//       { answer: 'Mitsibushi', correct: false },
//       { answer: 'Samsung', correct: true },
//     ],
//   },
// ];
// const calculateScore = () => {
//   const allAnswers = document.querySelectorAll(`input[type=radio]`);

//   allAnswers.forEach((input) => {
//     if (input.checked && input.checked.toString() === input.value) {
//       correctScore++;
//       console.log(`Correct Score: ${correctScore}`);
//     }
//     if (input.checked && input.checked.toString() != input.value) {
//       incorrectScore++;
//       console.log(`Incorrect Score: ${incorrectScore}`);
//     }
//     // if (!input.checked) {
//     //   unansweredScore++;
//     //   console.log(`Unanswered Score: ${unansweredScore}`);
//     // }
//   });
// };

// const displayGame = () => {
//   triviaQuestions.forEach((ques, index) => {
//     // question data
//     const questionNumber = index;
//     const question = ques.question;

//     // Create question div, append to main section
//     const questionSection = document.createElement('form');
//     questionSection.className = 'question';
//     mainSection.appendChild(questionSection);

//     // Create question title, append to question section
//     const h3 = document.createElement('h3');
//     h3.textContent = question;
//     questionSection.appendChild(h3);

//     // create ordered list
//     const ol = document.createElement('ol');
//     questionSection.appendChild(ol);

//     // Answers Array
//     const answersArray = ques.answers;

//     // Loop through answers
//     answersArray.forEach((ans) => {
//       // Answers Data
//       const answer = ans.answer;
//       const isCorrect = ans.correct;

//       // create answer div, append to question section
//       const li = document.createElement('li');
//       li.name = `question${questionNumber}`;
//       ol.appendChild(li);

//       // create input element, append to answer section
//       const input = document.createElement('input');
//       input.type = 'radio';
//       input.id = answer;
//       input.name = answer;
//       input.className = 'answers';
//       input.value = isCorrect;
//       li.appendChild(input);

//       // create label element, append to answer section
//       const label = document.createElement('label');
//       label.htmlFor = answer;
//       label.textContent = answer;
//       li.appendChild(label);
//     });
//   });

//   // Create Submit Button
//   const submitBtn = document.createElement('input');
//   submitBtn.type = 'submit';
//   submitBtn.value = 'SUBMIT';
//   submitBtn.addEventListener('click', calculateScore);
//   mainSection.appendChild(submitBtn);
// };

// displayGame();
