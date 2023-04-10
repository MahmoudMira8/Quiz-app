var currentQuestion = 0;
var score = 0;
var timer;
var quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "London", "Madrid"],
        answer: "Paris"
    },
    {
        question: "What is the largest ocean in the world?",
        options: ["Pacific", "Atlantic", "Indian", "Arctic"],
        answer: "Pacific"
    },
    {
        question: "What is the smallest planet in our solar system?",
        options: ["Earth", "Venus", "Mars", "Mercury"],
        answer: "Mercury"
    },
    {
        question: "Who is the current President of the United States?",
        options: ["Barack Obama", "George W. Bush", "Donald Trump", "Joe Biden"],
        answer: "Joe Biden"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Hippopotamus", "Whale", "Giraffe"],
        answer: "Whale"
    }
];

function displayQuestion() {
    clearInterval(timer);
    var questionElem = document.getElementById("question");
    var optionElem = document.getElementById("options");
    var submitButton = document.getElementById("submit");
    var backButton = document.getElementById("back");
    var feedbackElem = document.getElementById("feedback");
    var scoreElem = document.getElementById("score");
    var timerElem = document.getElementById("timer");

    if (currentQuestion >= quizData.length) {
        questionElem.innerHTML = "";
        optionElem.innerHTML = "";
        submitButton.style.display = "none";
        backButton.style.display = "none";
        feedbackElem.innerHTML = "";
        scoreElem.innerHTML = "Your score is: " + score;
        timerElem.innerHTML = "";
        return;
    }

    questionElem.innerHTML = quizData[currentQuestion].question;
    optionElem.innerHTML = "";
    feedbackElem.innerHTML = "";
    scoreElem.innerHTML = "Score: " + score;
    timerElem.innerHTML = "Time left: 10";

    // Shuffle the options randomly
    var shuffledOptions = shuffleArray(quizData[currentQuestion].options);

    for (var i = 0; i < shuffledOptions.length; i++) {
        var optionLabel = document.createElement("label");
        var optionRadio = document.createElement("input");
        optionRadio.type = "radio";
        optionRadio.name = "option";
        optionRadio.value = shuffledOptions[i];
        optionLabel.appendChild(optionRadio);
        optionLabel.appendChild(document.createTextNode(shuffledOptions[i]));
        optionElem.appendChild(optionLabel);
    }

    submitButton.style.display = "block";
    backButton.style.display = "block";

    timer = setInterval(function() {
        timerElem.innerHTML = "Time left: " + (--timerElem.innerHTML.split(":")[1]);
        if (timerElem.innerHTML == "Time left: 0") {
            checkAnswer();
        }
    }, 1000);
}


function checkAnswer() {
    var feedbackElem = document.getElementById("feedback");
    var optionElems = document.getElementsByName("option");
    var selectedOption;

    for (var i = 0; i < optionElems.length; i++) {
        if (optionElems[i].checked) {
            selectedOption = optionElems[i].value;
            break;
        }
    }

    if (!selectedOption) {
        feedbackElem.innerHTML = "Please select an answer.";
        return;
    }

    if (selectedOption == quizData[currentQuestion].answer) {
        score++;
        feedbackElem.innerHTML = "Correct!";
    } else {
        feedbackElem.innerHTML = "Incorrect.";
    }

    currentQuestion++;
    displayQuestion();
}

function goBack() {
    if (currentQuestion == 0) {
        return;
    }

    currentQuestion--;
    displayQuestion();
}

displayQuestion();

document.getElementById("submit").addEventListener("click", checkAnswer);
document.getElementById("back").addEventListener("click", goBack);
document.getElementById("restart").addEventListener("click", function() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
});

function shuffleArray(array) {
    var currentIndex = array.length;
    var temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}