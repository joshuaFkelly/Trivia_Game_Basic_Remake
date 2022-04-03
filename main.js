const triviaQuestions = [
    {
        question: "Where does Super Mario World take place?",
        answers: {
            a: "The Light Forest",
            b: "Dinosaur Land",
            c: "Mario Galaxy",
            d: "New York",
            correctAnswer: "Dinosaur Land",
        },
    },
    {
        question: "Who kidnaps Princess Daisy?",
        answers: {
            a: "Tatanga",
            b: "King Boo",
            c: "Wario",
            d: "Count Bleck",
            correctAnswer: "Tatanga",
        },
    },
    {
        question: "Who kidnaps Princess Peach?",
        answers: {
            a: "Dimentio",
            b: "Bowser Jr",
            c: "Waluigi",
            d: "Bowser",
            correctAnswer: "Bowser",
        },
    },
    {
        question: "Who is on the castle roof in Super Mario 64?",
        answers: {
            a: "King Toadstool",
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
            d: "Donkey Kong",
            correctAnswer: "Boom Boom",
        },
    },
];
const main = document.getElementById("main");
const maxTime = 15;
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
<h2 id= "timer">${maxTime}</h2>
  <section id= "quiz">
  </section>
  <a id= "submit">
  <img src="https://fontmeme.com/permalink/220403/f0eb2201d132645799c6aec017d55401.png" alt="super-mario-font" border="0">
  </a>
  </form>    
`
    document.getElementById("submit").addEventListener("click", evalScore)
}

const displayQuestions = () => {
    // Loop through array of all my questions and
    triviaQuestions.map((q, id) => {
        // destructuring really comes in handy lol
        const { question, answers } = q;
        const { a, b, c, d, correctAnswer } = answers;

        // Create a new question object for each one
        document.getElementById("quiz").innerHTML += `

                    <fieldset id="question${id}" class="question">
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
}

const startGame = () => {
    displayQuiz();
    displayQuestions();
    startTimer();
}

const incrementCorrectScore = () => correctScore++;

const incrementIncorrectScore = () => incorrectScore++;

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

        if (ans.checked && ans.value === ans.id) {
            incrementCorrectScore()
        }
        if (ans.checked && ans.value != ans.id) {
            incrementIncorrectScore()
        }
    })
    gameOver()
}

const displayIntro = () => {
    document.getElementById("main").innerHTML = `
    <div id="intro">
    <img src="https://fontmeme.com/permalink/220402/ed63c7cb852e48c81d37554d5e6740f5.png" alt="super-mario-font" border="0">
    <p>You have a limited amount of time to select your answers.</p>
    <p>Select your answer by clicking on the radio button corresponding with your answer.</p>
    <p>Answer carefully!! Points are added up once you submit your answers!</p>
    <a id="start">
    <img src="https://fontmeme.com/permalink/220402/0345f05ded5b9ff1769235d38b5b5404.png" alt="super-mario-font" border="0">
    </a>
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
    <img src="https://fontmeme.com/permalink/220402/885495672c1da9e1e9fde1900554b36c.png" alt="super-mario-font" border="0">
    <h3> Correct Answers: <span id= "correct">${correctScore}</span> </h3>
    <h3> Incorrect Answers: <span id= "incorrect">${incorrectScore}</span> </h3>
    <a id= "quit"> 
    <img src="https://fontmeme.com/permalink/220403/c0f049880474c9964f83e025a3b26c15.png" alt="super-mario-font" border="0">
    </a> 
    `;
    document.getElementById("form").remove();
    main.appendChild(results);
    document.getElementById("quit").addEventListener("click", quitGame)
}
document.onload = displayIntro()