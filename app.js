var container = document.querySelector(".container");
var timer = document.querySelector("#timer");
var ifCorrect = document.querySelector("#ifCorrect");
var q = 0;
var count = 60;

// questions and answers
var questionArr = [
    {
        question: "What is the HTML tag under which one can write the JavaScript code?",
        answers: [
            "1. <javascript>",
            "2. <scripted>",
            "3. <script>",
            "4. <js>"
        ],
        correctAnswer: "3. <script>"
    },
    {
        question: "Which of the following is the correct syntax to display an alert box using JavaScript?",
        answers: [
            "1. alertbox(“someText”)",
            "2. msg(“someText”)",
            "3. msgbox(“someText”)",
            "4. alert(“someText”)"
        ],
        correctAnswer: "4. alert(“someText”)"
    },
    {
        question: "The external JavaScript file must contain <script> tag. True or False?",
        answers: [
            "1. True",
            "2. False"
        ],
        correctAnswer: "2. False"
    },
    {
        question: "Who invented JavaScript?",
        answers: [
            "1. Brendan Eich",
            "2. Douglas Crockford",
            "3. Sheryl Sandberg"
        ],
        correctAnswer: "1. Brendan Eich"
    },
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        answers: [
            "1. interface",
            "2. program",
            "3. throws",
            "4. short"
        ],
        correctAnswer: "2. program"
    },
    {
        question: "What is the JavaScript syntax for printing values in Console?",
        answers: [
            "1. print('')",
            "2. console.log('')",
            "3. console.print('')",
            "4. print.console('')"
        ],
        correctAnswer: "2. console.log('')"
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
            popUp("Incorrect!");
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

    // build the All Done container
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
    input.required = true;
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
            .sort(function (a, b) {
                return b.score - a.score;
            }).slice(0, 3);
        localStorage.setItem('highscore', JSON.stringify(highscores));

        // Go to High Scores page
        location.replace("highScores.html");
    });
}

