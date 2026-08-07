// Store the user's answer
let userAnswer = "";

// Store the score
let score = 0;

// Store questions from the API
let questions = [];

// Keep track of the current question
let currentQuestionIndex = 0;


// Get the HTML elements

let quiz = document.getElementById("quiz");

let question = document.getElementById("question");

let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");
let option4 = document.getElementById("option4");

let result = document.getElementById("result");

let scoreScreen = document.getElementById("score");

let finalScore = document.getElementById("finalScore");


// --------------------------------
// GET QUESTIONS FROM API
// --------------------------------

function getQuestions() {

    fetch("https://opentdb.com/api.php?amount=5&type=multiple")

        .then(function(response) {

            return response.json();

        })

        .then(function(data) {

            console.log(data);


            // Check if the API returned questions

            if (data.response_code !== 0) {

                question.textContent =
                    "The API did not return questions.";

                return;

            }


            // Store the questions

            questions = data.results;


            // Show the first question

            loadQuestion();

        })

        .catch(function(error) {

            console.log(error);

            question.textContent =
                "Could not load questions.";

        });

}


// --------------------------------
// CLEAN API TEXT
// --------------------------------

function cleanText(text) {

    let element = document.createElement("textarea");

    element.innerHTML = text;

    return element.value;

}


// --------------------------------
// SHOW CURRENT QUESTION
// --------------------------------

function loadQuestion() {

    let currentQuestion =
        questions[currentQuestionIndex];


    // Show question

    question.textContent =
        cleanText(currentQuestion.question);


    // Show answers

    option1.textContent =
        cleanText(currentQuestion.incorrect_answers[0]);

    option2.textContent =
        cleanText(currentQuestion.incorrect_answers[1]);

    option3.textContent =
        cleanText(currentQuestion.incorrect_answers[2]);

    option4.textContent =
        cleanText(currentQuestion.correct_answer);


    // Store answers inside buttons

    option1.dataset.value =
        cleanText(currentQuestion.incorrect_answers[0]);

    option2.dataset.value =
        cleanText(currentQuestion.incorrect_answers[1]);

    option3.dataset.value =
        cleanText(currentQuestion.incorrect_answers[2]);

    option4.dataset.value =
        cleanText(currentQuestion.correct_answer);


    // Clear previous result

    result.textContent = "";

    userAnswer = "";

}


// --------------------------------
// GET ALL BUTTONS
// --------------------------------

let buttons = document.querySelectorAll("button");


// --------------------------------
// BUTTON CLICK
// --------------------------------

buttons.forEach(function(button) {

    button.onclick = function() {

        let action = button.dataset.action;

        let value = button.dataset.value;


        // -------------------------
        // ANSWER
        // -------------------------

        if (action === "answer") {

            userAnswer = value;

            result.textContent =
                "You selected: " + value;

        }


        // -------------------------
        // SUBMIT
        // -------------------------

        else if (action === "submit") {

            if (userAnswer === "") {

                result.textContent =
                    "Please select an answer.";

            }

            else if (
                userAnswer ===
                cleanText(
                    questions[currentQuestionIndex].correct_answer
                )
            ) {

                result.textContent =
                    "Correct!";

                score++;

            }

            else {

                result.textContent =
                    "Incorrect!";

            }

        }


        // -------------------------
        // NEXT QUESTION
        // -------------------------

        else if (action === "next") {

            if (
                currentQuestionIndex <
                questions.length - 1
            ) {

                currentQuestionIndex++;

                loadQuestion();

            }

            else {

                // Hide quiz

                quiz.style.display = "none";


                // Show score screen

                scoreScreen.style.display = "block";


                // Show final score

                finalScore.textContent =
                    "Your Score: " +
                    score +
                    " / " +
                    questions.length;

            }

        }

    };

});


// --------------------------------
// START QUIZ
// --------------------------------

getQuestions();

