var highScores = document.getElementById("highScores")

if (localStorage.getItem("username") === null) {
    highScores.innerHTML = ""
} else {
    var username = localStorage.getItem("username");
    var score = localStorage.getItem("score");
    var scoreList = document.createElement("li");
    scoreList.textContent = username + " - " + score;
    highScores.appendChild(scoreList);
}

function clearScore() {
    localStorage.clear();
    highScores.innerHTML = "";
}
