const triviaQuestions = [
    {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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

class GameOver {
    constructor() {
        this.main = document.querySelector("#main");
    }
    render() {
        this.main.innerHTML = `
          <div id="game">
            <h1> GAME OVER </h1>
            <h3> Correct Answers: <span id="correct">${this.correctScore}</span> </h3>
            <h3> Incorrect Answers: <span id="incorrect">${this.incorrectScore}</span> </h3>
            <h3> Unanswered Answers: <span id="unanswered">${this.unansweredScore}</span> </h3>
            <button id = "quit"> Quit </button> 
          </div>
      `;
    }
}

class Quiz {
    constructor(id, question, answerA, answerB, answerC, answerD, correctAnswer) {
        this.quiz = document.getElementById("quiz");
        this.id = id;
        this.question = question;
        this.answerA = answerA;
        this.answerB = answerB;
        this.answerC = answerC;
        this.answerD = answerD;
        this.correctAnswer = correctAnswer;
    }

    render() {
        return (this.quiz.innerHTML += `
            <fieldset id="question${this.id}">
                  <legend> <h3>${this.question}</h3> </legend>
                <ul>
                    <li>
                        <input type="radio" id="${this.answerA}" class="answer" name="${this.id}" value="${this.correctAnswer}">
                        <label for="${this.answerA}">${this.answerA}</label>
                    </li>
        
                    <li>
                        <input type="radio" id="${this.answerB}" class="answer" name="${this.id}" value="${this.correctAnswer}">
                        <label for="${this.answerB}">${this.answerB}</label>
                    </li>
        
                    <li>
                        <input type="radio" id="${this.answerC}" class="answer" name="${this.id}" value="${this.correctAnswer}">
                        <label for="${this.answerC}">${this.answerC}</label>
                    </li>
        
                    <li>
                        <input type="radio" id="${this.answerD}" class="answer" name="${this.id}" value="${this.correctAnswer}">
                        <label for="${this.answerD}">${this.answerD}</label>
                    </li>
                </ul>
            </fieldset>    
        `);
    }
}

// ----------------------------------------------------------

class Game {
    constructor() {
        this.main = document.getElementById("main");
        this.correctScore = 0;
        this.incorrectScore = 0;
        this.unansweredScore = 0;
        this.maxTime = 60;
        this.currentTime;
        this.intervalID;
        this.timeoutID;
    }

    newGame() {
        const quiz = new Form(this.maxTime, this.stopTimer);
        quiz.render();
        this.displayQuestions();

        this.startTimer();
    }

    displayQuestions() {
        // Loop through array of all my questions and
        triviaQuestions.forEach((q) => {
            // destructuring really comes in handy lol
            const { id, question, answers } = q;
            const { a, b, c, d, correctAnswer } = answers;
            console.log(id, question);
            console.log(a, b, c, d, correctAnswer);
            // Create a new question object for each one
            const quiz = new Question(id, question, a, b, c, d, correctAnswer);
            quiz.render();
        });
    }
    startTimer() {
        if (this.currentTime != this.maxTime) {
            this.currentTime = this.maxTime;
        }
        this.intervalID = setInterval(() => {
            this.currentTime--;
            document.getElementById("timer").innerText = this.currentTime;
            console.log(this.currentTime);
        }, 1000);

        this.timeoutID = setTimeout(() => {
            this.stopTimer();
            this.displayResults();
            console.log("Time up, display results");
        }, 1000 * this.maxTime);
    }

    stopTimer() {
        console.log("Time stopped!");
        clearInterval(this.intervalID);
        clearTimeout(this.timeoutID);
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

    displayResults() {
        this.main.innerHTML = `
    <div id="results">
      <h1> GAME OVER </h1>
      <h3> Correct Answers: <span id="correct">${this.correctScore}</span> </h3>
      <h3> Incorrect Answers: <span id="incorrect">${this.incorrectScore}</span> </h3>
      <h3> Unanswered Answers: <span id="unanswered">${this.unansweredScore}</span> </h3>
      <button id = "quit"> Quit </button>
    </div>
    `;
    }
    gameOver() { }
}

class Form extends Game {
    constructor(maxTime, stopTimer) {
        super(maxTime);
        this.maxTime = maxTime;
        this.stopTimer = stopTimer;
        this.main = document.querySelector("#main");
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(e);
        console.log("submit event");
        this.stopTimer();
        console.log(this.stopTimer());
    }

    render() {
        this.main.innerHTML = `
    <form id="form">
        <h2>Timer: <span id="timer">${this.maxTime}</span> seconds remaining</h2>
        <section id="quiz">
            <button id="submit">Submit</button>
        </section>
    </form>
   `;
        document
            .querySelector("#form")
            .addEventListener("submit", this.handleSubmit.bind(this));
    }
}

document.getElementById("start").addEventListener("click", () => {
    const game = new Game();
    game.newGame();
});
