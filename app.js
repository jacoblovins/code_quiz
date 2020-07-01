var container = document.querySelector(".container");
var timer = document.querySelector("#timer");
var q = 0;

// questions and answers
var questionArr = [
    {
        question: "Who invented JavaScript?",
        answers: [
            "Douglas Crockford",
            "Sheryl Sandberg",
            "Brendan Eich"
        ],
        correctAnswer: "Brendan Eich"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: [
            "Node.js",
            "TypeScript",
            "npm"
        ],
        correctAnswer: "npm"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: [
            "Angular",
            "jQuery",
            "RequireJS",
            "ESLint"
        ],
        correctAnswer: "ESLint"
    }
];

// Start screen function
(function startScreen() {

    var header = document.createElement("h1");
    header.textContent = "Coding Quiz Challenge";
    container.appendChild(header);

    var description = document.createElement("p");
    description.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec accumsan placerat nisl vel interdum. Integer consectetur, ante id elementum varius, lacus orci eleifend felis, ut commodo justo ipsum vitae erat. Quisque eu tristique ex, vitae mattis tellus. Maecenas leo enim, dapibus in nunc vel, finibus pulvinar quam. Vestibulum volutpat nunc sed hendrerit imperdiet. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;";
    container.appendChild(description);

    var startBtn = document.createElement("button");
    startBtn.textContent = "Start Quiz";
    container.appendChild(startBtn);
    startBtn.addEventListener("click", quizQuestions);
})();

function quizQuestions() {

    // need to start timer

    // check if all questions are answered
    if(q >= questionArr.length){
        container.innerHTML = "";
        allDone();
        
    } else {

        // clear the container for new content
        container.innerHTML = "";

        // build question area
        var askQuestion = document.createElement("h3");
        askQuestion.textContent = questionArr[q].question;
        container.appendChild(askQuestion);

        // provide choices
        for(var a = 0; a < questionArr[q].answers.length; a++){
                var choices = document.createElement("button");
                choices.textContent = questionArr[q].answers[a];
                container.appendChild(choices);
                choices.addEventListener("click", checkAnswer);
        };
        
        function checkAnswer(e){
            if (e.target.textContent === questionArr[q].correctAnswer){
                console.log("correct");
                q++;
                quizQuestions();

            } else {
                console.log("wrong");
                q++;
                quizQuestions();
            }
        }
    }


}

function allDone(){
    var header = document.createElement("h1");
    header.textContent = "All Done!";
    container.appendChild(header);

    var finalScore = document.createElement("p");
    finalScore.textContent = "Your final score: ";
    container.appendChild(finalScore);
}