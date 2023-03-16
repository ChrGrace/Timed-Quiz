
var score = 0;
var questionList = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var wrapper = document.querySelector("#wrapper");

//Building the stupid timer
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 5;
var ulCreate = document.createElement("ul");

timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time Left: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Game over!";
            }
        }, 1000);
    }
    render(questionList);
});

//create a function so that the list of questions runs on start
function render(questionList) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionList].title;
        var userChoices = questions[questionList].choices;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", compare);
    });
}
//create a function that will compare user answer to the correct answer
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionList].answer) {
            score++;
            createDiv.textContent = "Correct! :)";
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Incorrect :(";
        }
    }

    questionList++;

    if (questionList >= questions.length) {
        allDone();
        createDiv.textContent =
            "Quiz completed!" +
            " " +
            "You scored  " +
            score +
            "/" +
            questions.length +
            " Correct! Well done :)";
    } else {
        render(questionList);
    }
    questionsDiv.appendChild(createDiv);
}

var questions = [
    {
        title: "The basic data types DO NOT include:",
        choices: [
            "Strings",
            "Booleans",
            "Alerts",
            "Numbers"
        ],
        answer: "Alerts",
    },
    {
        title: "Who wrote the code that sent man to the moon?",
        choices: [
            "Albert Einstein",
            "Margaret Hamilton",
            "Nocola Tesla",
            "Marie Curie"
        ],
        answer: "Margaret Hamilton",
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: [
            "Numbers and strings",
            "Other arrays",
            "Booleans",
            "All of the above",
        ],
        answer: "All of the above",
    },
    {
        title:
            "String values must be enclosed within ____ when being assigned to variables.",
        choices: [
            "Commas",
            "Curly brackets",
            "Quotes",
            "Parenthesis"
        ],
        answer: "Parenthesis",
    },
    {
        title:
            "Which developer tool is critical for troubleshooting bugs and identifying elements on a webpage:",
        choices: [
            "Console log",
            "Bootstrap",
            "jQuery",
            "Git bash"
        ],
        answer: "Console log",
    },
];

function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!";

    questionsDiv.appendChild(createH1);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Input your initials to be entered in the hall of fame!: ";

    questionsDiv.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Json stringify stuff for local storage
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {
            alert("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining,
            };
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
        }
    });
}

//window.location.href
//make second html. href to link them
//load that highscore data
//set item to empty to clear
