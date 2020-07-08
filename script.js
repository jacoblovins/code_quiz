var highScores = document.querySelector("#highScores")

// check if local storage is empty, if not, display the top 3 high scores
if (localStorage.getItem("highscore") === null) {
    highScores.innerHTML = ""
} else {
    var highscore = JSON.parse(localStorage.getItem('highscore'));
    for (var i = 0; i < highscore.length; i++) {
        console.log(highscore[i].userName + ": " + highscore[i].score);
        var scoreList = document.createElement("li");
        scoreList.textContent = highscore[i].userName + " -- " + highscore[i].score;
        highScores.appendChild(scoreList);
    }
}

// clear score button function
function clearScore() {
    localStorage.clear();
    highScores.innerHTML = "";
}
