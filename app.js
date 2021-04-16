const container = document.querySelector(".container");
const timer = document.querySelector("#timer");
const ifCorrect = document.querySelector("#ifCorrect");
const startBtn = document.querySelector('#startBtn')
let q = 0;
let count = 60;

// Start screen function
(function startScreen() {

    startBtn.addEventListener("click", () => {
        startTimer();
        quizQuestions();
    });
})();


// start the countdown
const startTimer = () => {

    const interval = setInterval(function () {
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
const quizQuestions = () => {

    // clear the container for new content
    container.innerHTML = "";

    // build question area
    const askQuestion = document.createElement("h3");
    askQuestion.textContent = questionArr[q].question;
    container.appendChild(askQuestion);

    // check if users choice is correct
    const checkAnswer = e => {
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
 
    // provide choice buttons
    for (let a = 0; a < questionArr[q].answers.length; a++) {
        const choices = document.createElement("button");
        choices.textContent = questionArr[q].answers[a];
        container.appendChild(choices);
        choices.addEventListener("click", checkAnswer);
    }

}  

// Correct or Wrong popup at the bottom after selection is made
const popUp = label => {
    ifCorrect.innerHTML = label;
    ifCorrect.style.borderTop = "1px solid #ccc";
    setTimeout(function () { 
        ifCorrect.innerHTML = "";
        ifCorrect.style.borderTop = "none";
    }, 1000);
} 
   
// display score and enter initials function 
const allDone = () => {
    // clear the container for new content
    container.innerHTML = ""; 

    // build the All Done container 
    const header = document.createElement("h1");
    header.textContent = "All Done!";
    container.appendChild(header);

    const finalScore = document.createElement("p");
    finalScore.textContent = "Your final score is: " + count;
    container.appendChild(finalScore);

    const inits = document.createElement("p");
    inits.setAttribute("id", "inits");
    inits.textContent = "Enter Initials:"
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.required = true;
    const submit = document.createElement("button");
    submit.setAttribute("id", "submitBtn");
    submit.textContent = "Submit";

    container.appendChild(inits);
    container.appendChild(form);
    form.appendChild(input);
    form.appendChild(submit);

    // Store user and score in local storage when submitted
    form.addEventListener("submit", event => {
        event.preventDefault();
        const user = input.value.toUpperCase();
        const result = { userName: user, score: count };
        const savedScores = localStorage.getItem('highscore') || '[]';
        const highscores = [...JSON.parse(savedScores), result]
            .sort(function (a, b) {
                return b.score - a.score;
            }).slice(0, 3);
        localStorage.setItem('highscore', JSON.stringify(highscores));

        // Go to High Scores page
        location.replace("highScores.html");
    });
}

