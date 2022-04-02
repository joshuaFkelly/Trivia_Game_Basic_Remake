const triviaQuestions = [
    {
        question: "Where does Super Mario World take place?",
        answers: {
            a: "The Light Forest",
            b: "Dinosaur Land",
            c: "Grandmaster Galaxy",
            d: "New York",
            correctAnswer: "Dinosaur Land",
        },
    },
    {
        question: "Who kidnaps Princess Daisy?",
        answers: {
            a: "Tatanga",
            b: "Bowser",
            c: "Wario",
            d: "Yoshi",
            correctAnswer: "Tatanga",
        },
    },
    {
        question: "Who kidnaps Princess Peach?",
        answers: {
            a: "Tatanga",
            b: "Bowser Jr",
            c: "Waluigi",
            d: "Bowser",
            correctAnswer: "Bowser",
        },
    },
    {
        question: "Who is on the castle roof in Super Mario 64?",
        answers: {
            a: "Donkey Kong",
            b: "Princess Peach",
            c: "Yoshi",
            d: "Mario",
            correctAnswer: "Yoshi",
        },
    },
    {
        question: "Who guards the Fortress in Super Mario 64?",
        answers: {
            a: "Boom Boom",
            b: "Chain Chomp",
            c: "Lava Queen",
            d: "2 Toads",
            correctAnswer: "Boom Boom",
        },
    },
];
const main = document.getElementById("main");
const maxTime = 60;

let correctScore = 0;
let incorrectScore = 0;
let currentTime;
let intervalID;
let timeoutID;

const createElem = type => document.createElement(type);

const displayQuiz = () => {
    document.getElementById("intro").remove();
    main.innerHTML = `
<form id="form">
<h2>Timer: <span id= "timer">${maxTime}</span> seconds remaining</h2>
  <section id= "quiz">
  </section>
  <button id= "submit">Submit</button>
</form>    
`

    document.getElementById("submit").addEventListener("click", evalScore)

}

const displayQuestions = () => {
    const questionsElem = createElem("div")
    questionsElem.id = "questionsElem";
    // Loop through array of all my questions and
    triviaQuestions.map((q, id) => {
        // destructuring really comes in handy lol
        const { question, answers } = q;
        const { a, b, c, d, correctAnswer } = answers;
        console.log(id, question);
        console.log(a, b, c, d, correctAnswer);
        // Create a new question object for each one
        questionsElem.innerHTML += `

                    <fieldset id="question${id}">
                          <legend> <h3>${question}</h3> </legend>
                        <ul>
                            <li>
                                <input type="radio" id="${a}" class="answer" name="${id}" value="${correctAnswer}">
                                <label for="${a}">${a}</label>
                            </li>
              
                            <li>
                                <input type="radio" id="${b}" class="answer" name="${id}" value="${correctAnswer}">
                                <label for="${b}">${b}</label>
                            </li>
              
                            <li>
                                <input type="radio" id="${c}" class="answer" name="${id}" value="${correctAnswer}">
                                <label for="${c}">${c}</label>
                            </li>
              
                            <li>
                                <input type="radio" id="${d}" class="answer" name="${id}" value="${correctAnswer}">
                                <label for="${d}">${d}</label>                      
                            </li>
                        </ul>
                    </fieldset>   
    
        `;
    });
    document.getElementById("quiz").appendChild(questionsElem)
}

const startGame = () => {
    displayQuiz();
    displayQuestions();
    startTimer();
}

const incrementCorrectScore = correctScore => correctScore++;

const incrementIncorrectScore = incorrectScore => incorrectScore++;

const startTimer = () => {
    if (currentTime != maxTime) {
        currentTime = maxTime;
    }

    intervalID = setInterval(() => {
        currentTime--;
        document.getElementById("timer").innerText = currentTime;
    }, 1000);

    timeoutID = setTimeout(() => {
        gameOver()
        console.log("Time up, display results");
    }, 1000 * maxTime);
}

const clearTimer = () => {
    console.log("Timer cleared!");
    clearInterval(intervalID);
    clearTimeout(timeoutID);
}

const resetStats = () => {
    currentTime = 60;
    clearTimer()
    correctScore = 0
    incorrectScore = 0
}

const gameOver = () => {
    clearTimer();
    displayResults();
}

const evalScore = (e) => {
    e.preventDefault();
    document.querySelectorAll(".answer").forEach(ans => {
        if (ans.checked) {
            console.log(ans.value)
            console.log(ans.id)
        }
    })
    gameOver()
}

const displayIntro = () => {
    document.getElementById("main").innerHTML = `
    <div id="intro">
    <h1>Trivia Game!</h1>
    <p>You have a limited amount of time to select your answers.</p>
    <p>Select your answer by clicking on the radio button corresponding with your answer.</p>
    <p>Points are added up after the quiz is over!</p>
    <button id="start">Start</button>
  </div>
    `
    document.getElementById("start").addEventListener("click", startGame);
}

const quitGame = () => {
    document.getElementById("results").remove()
    resetStats()
    displayIntro()
}

const displayResults = () => {
    const results = createElem("div")
    results.id = "results";
    results.innerHTML = `
      <h1> GAME OVER </h1>
      <h3> Correct Answers: <span id= "correct">${correctScore}</span> </h3>
      <h3> Incorrect Answers: <span id= "incorrect">${incorrectScore}</span> </h3>
      <button id= "quit"> Quit </button>
    `;
    document.getElementById("form").remove();
    main.appendChild(results);
    document.getElementById("quit").addEventListener("click", quitGame)
}
document.onload = displayIntro()