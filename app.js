var container = document.querySelector(".container");
var timer = document.querySelector("#timer");
var ifCorrect = document.querySelector("#ifCorrect");
var q = 0;
var count = 60;

// questions and answers
var questionArr = [
    {
        question: "Who invented JavaScript?",
        answers: [
            "1. Douglas Crockford",
            "2. Sheryl Sandberg",
            "3. Brendan Eich"
        ],
        correctAnswer: "3. Brendan Eich"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            "1. Node.js",
            "2. TypeScript",
            "3. npm"
        ],
        correctAnswer: "3. npm"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            "1. Angular",
            "2. jQuery",
            "3. RequireJS",
            "4. ESLint"
        ],
        correctAnswer: "4. ESLint"
    },
    {
        question: "Who invented JavaScript?",
        answers: [
            "1. Douglas Crockford",
            "2. Sheryl Sandberg",
            "3. Brendan Eich"
        ],
        correctAnswer: "3. Brendan Eich"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            "1. Node.js",
            "2. TypeScript",
            "3. npm"
        ],
        correctAnswer: "3. npm"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            "1. Angular",
            "2. jQuery",
            "3. RequireJS",
            "4. ESLint"
        ],
        correctAnswer: "4. ESLint"
    }
];

// Start screen function
(function startScreen() {

    startBtn.addEventListener("click", function () {
        startTimer();
        quizQuestions();

    });
})();

// start the countdown
function startTimer() {
    var interval = setInterval(function () {
        count--;
        // check if time runs out
        if (count <= 0) {
            clearInterval(interval);
            count = 0;
            allDone();
        }
        // check if all questions answered
        if (q >= questionArr.length) {
            clearInterval(interval);
            allDone();
        }
        timer.innerHTML = count;
    }, 1000);
}

// loop through questions
function quizQuestions() {

    // clear the container for new content
    container.innerHTML = "";

    // build question area
    var askQuestion = document.createElement("h3");
    askQuestion.textContent = questionArr[q].question;
    container.appendChild(askQuestion);

    // provide choice buttons
    for (var a = 0; a < questionArr[q].answers.length; a++) {
        var choices = document.createElement("button");
        choices.textContent = questionArr[q].answers[a];
        container.appendChild(choices);
        choices.addEventListener("click", checkAnswer);
    }

    // check if users choice is correct
    function checkAnswer(e) {
        if (e.target.textContent === questionArr[q].correctAnswer) {
            q++;
            popUp("Correct!");
            quizQuestions();
        } else {
            count -= 15;
            q++;
            popUp("Wrong!");
            quizQuestions();
        }
    }
}

// Correct or Wrong popup at the bottom after selection is made
function popUp(label) {
    ifCorrect.innerHTML = label;
    ifCorrect.style.borderTop = "1px solid #ccc";
    setTimeout(function () {
        ifCorrect.innerHTML = "";
        ifCorrect.style.borderTop = "none";
    }, 1000);
}

// display score and enter initials function 
function allDone() {
    // clear the container for new content
    container.innerHTML = "";

    // build the container
    var header = document.createElement("h1");
    header.textContent = "All Done!";
    container.appendChild(header);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is: " + count;
    container.appendChild(finalScore);

    var inits = document.createElement("p");
    inits.setAttribute("id", "inits");
    inits.textContent = "Enter Initials:"
    var form = document.createElement("form");
    var input = document.createElement("input");
    var submit = document.createElement("button");
    submit.setAttribute("id", "submitBtn");
    submit.textContent = "Submit";

    container.appendChild(inits);
    container.appendChild(form);
    form.appendChild(input);
    form.appendChild(submit);

    // Store user and score in local storage when submitted
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var user = input.value.toUpperCase();
        var result = { userName: user, score: count };
        var savedScores = localStorage.getItem('highscore') || '[]';
        var highscores = [...JSON.parse(savedScores), result]
            .sort((a, b) => b.score - a.score)
            .slice(0, 3);
        localStorage.setItem('highscore', JSON.stringify(highscores));

        // Go to High Scores page
        location.replace("highScores.html");
    });
}

