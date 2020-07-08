var container = document.querySelector(".container");
var timer = document.querySelector("#timer");
var highScores = document.getElementById("highScores");
var ifCorrect = document.getElementById("ifCorrect");
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

    startBtn.addEventListener("click", function(){
        startTimer();
        quizQuestions();

    });
})();

// start the countdown
function startTimer(){
    var interval = setInterval(function(){
        count--;
        // check if time runs out
        if (count <= 0){
            clearInterval(interval);
            count = 0;
            allDone();
        }
        // check if all questions answered
        if (q >= questionArr.length){
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
    for(var a = 0; a < questionArr[q].answers.length; a++){
            var choices = document.createElement("button");
            choices.textContent = questionArr[q].answers[a];
            container.appendChild(choices);
            choices.addEventListener("click", checkAnswer);
    };
    
    // check if users choice is correct
    function checkAnswer(e){
        if (e.target.textContent === questionArr[q].correctAnswer){
            console.log("correct");
            q++;
            popUp("Correct!");
            quizQuestions();

        } else {
            count= count - 15;
            console.log("wrong");
            q++;
            popUp("Wrong!");
            quizQuestions();
        }
    }
}

function popUp(label){
    ifCorrect.innerHTML = label;
    ifCorrect.style.borderTop = "1px solid #ccc";
    setTimeout(function(){
         ifCorrect.innerHTML = ""; 
         ifCorrect.style.borderTop = "none";
        }, 1000);
}

function allDone(){
    // clear the container for new content
    container.innerHTML = "";

    // build the container
    var header = document.createElement("h1");
    header.textContent = "All Done!";
    container.appendChild(header);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score: " + count;
    container.appendChild(finalScore);

    var form = document.createElement("form");
    var input = document.createElement("input"); 
    var submit = document.createElement("button"); 
    submit.textContent = "submit";
    

    form.appendChild(input);
    form.appendChild(submit);
    container.appendChild(form);
   
    form.addEventListener("submit", function(event){
        event.preventDefault();
        var username = input.value;
        localStorage.setItem("username", username);
        localStorage.setItem("score", count);
        
        (function goToScores(){
            location.replace("highScores.html");
        })();
    });
}
// (function storeScore(){
//     var username = localStorage.getItem("username");
//     var score = localStorage.getItem("score");
//     var scoreList = document.createElement("li");
//     scoreList.textContent = username + score;
//     highScores.appendChild(scoreList);
//     console.log(username);
//     console.log(score);
// })();
