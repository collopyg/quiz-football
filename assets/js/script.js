if (window.localStorage.getItem("username")) {

    document.getElementById("levelchoice-area").style.display = "initial";
    document.getElementById("username-area").style.display = "none";
    let user = window.localStorage.getItem("username");
    document.getElementById("levelchoice-heading").innerText = `Welcome to the game ${user}!`;

} else if (!window.localStorage.getItem("username")) {

    const submit = document.getElementById("submit");
    submit.addEventListener('click', validate);

}

function validate(e) {
    e.preventDefault();

    const usernameField = document.getElementById("username");

    if (!usernameField.value) {
        const usernameError = document.getElementById("usernameError");
        usernameError.classList.add("visible");
        usernameError.setAttribute('aria-hidden', false);
        usernameError.setAttribute('aria-invalid', true);
        usernameError.innerText = "Please enter a username to proceed!";
    } else if (usernameField.value) {
        window.localStorage.setItem("username", usernameField.value);
        document.getElementById("levelchoice-area").style.display = "initial";
        document.getElementById("username-area").style.display = "none";
        window.localStorage.setItem("username", usernameField.value);
    }

    let user = window.localStorage.getItem("username");
    document.getElementById("levelchoice-heading").innerText = `Welcome to the game ${user}!`;

}


let questionArea = document.getElementById('question-area');
let answerArea = document.getElementById('answers-list');
let allQuestions;
let current = 0;
let score = 0;

/** Level of the quiz **/

function questionChoice(levelChoice, curr) {

    let userChoice = levelChoice.textContent;
    if (userChoice === 'Easy') {
        allQuestions = allQuestionsEasy;
    } else if (userChoice === 'Medium') {
        allQuestions = allQuestionsMedium;
    } else if (userChoice === 'Hard') {
        allQuestions = allQuestionsAdvanced;
    }

    /** Start the quiz **/
    loadQuestion(curr);

    document.getElementById("total-questions").textContent = allQuestions.length;
    document.getElementById("level").textContent = userChoice;
    document.getElementById("game-area").style.display = "initial";
    document.getElementById("levelchoice-area").style.display = "none";
    localStorage.setItem("userLevel", userChoice);

    return allQuestions;

}

/* This function loads the question with answers */
function loadQuestion(curr) {

    let question = allQuestions[curr].question;

    questionArea.innerHTML = '';
    questionArea.innerHTML = question;

    let answers = allQuestions[curr].answers;

    answerArea.innerHTML = '';

    for (let i = 0; i < answers.length - 1; i += 1) {
        let createList = document.createElement('li');
        let text = document.createTextNode(answers[i]);

        createList.appendChild(text);
        createList.addEventListener("click", checkAnswer(i, answers));

        answerArea.appendChild(createList);
    }
}

/* This function will check the answer  */
function checkAnswer(i, arr) {

    return function () {
        let givenAnswer = i;
        let correctAnswer = arr[arr.length - 1];

        if (givenAnswer === correctAnswer) {
            incrementScore();
        } else {
            incrementWrongAnswer();
        }

        if (current < allQuestions.length - 1) {
            current += 1;
            document.getElementById("current-question").innerText = current + 1;
            loadQuestion(current);
        } else {
            questionArea.innerHTML = 'Done! Final Score Page is loading ...';
            answerArea.innerHTML = '';
            score = document.getElementById("correct-counter").innerText;
            localStorage.setItem("mostRecentScore", score);
            load(gameOver);
        }
    };
}

/* This function increments the correct score */
function incrementScore() {

    let oldscore = parseInt(document.getElementById("correct-counter").innerText);
    document.getElementById("correct-counter").innerText = ++oldscore;

}

/* This function increments the wrong answer counter  */
function incrementWrongAnswer() {

    let oldscore = parseInt(document.getElementById("wrong-counter").innerText);
    document.getElementById("wrong-counter").innerText = ++oldscore;

}




