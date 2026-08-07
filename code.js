
// Store the user's answer
let userAnswer = "";

// Store the score
let score = 0;

// Store all questions
let questions = [

    {
        question: "What is 2 + 2?",
        option1: "3",
        option2: "4",
        option3: "5",
        option4: "6",
        answer: "4"
    },

    {
        question: "Capital of India?",
        option1: "Delhi",
        option2: "Tokyo",
        option3: "Paris",
        option4: "London",
        answer: "Delhi"
    },

    {
        question: "How many days are in a week?",
        option1: "5",
        option2: "6",
        option3: "7",
        option4: "8",
        answer: "7"
    }

];


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


// Show the current question
function loadQuestion() {

    question.textContent =
        questions[currentQuestionIndex].question;

    option1.textContent =
        questions[currentQuestionIndex].option1;

    option1.dataset.value =
        questions[currentQuestionIndex].option1;


    option2.textContent =
        questions[currentQuestionIndex].option2;

    option2.dataset.value =
        questions[currentQuestionIndex].option2;


    option3.textContent =
        questions[currentQuestionIndex].option3;

    option3.dataset.value =
        questions[currentQuestionIndex].option3;


    option4.textContent =
        questions[currentQuestionIndex].option4;

    option4.dataset.value =
        questions[currentQuestionIndex].option4;


    result.textContent = "";

    userAnswer = "";
}


// Load the first question
loadQuestion();


// Get all buttons
let buttons = document.querySelectorAll("button");


// Check every button
buttons.forEach(function(button) {

    button.onclick = function() {

        let action = button.dataset.action;

        let value = button.dataset.value;


        // -------------------------
        // ANSWER BUTTON
        // -------------------------

        if (action === "answer") {

            userAnswer = value;

            result.textContent =
                "You selected: " + value;

        }


        // -------------------------
        // SUBMIT BUTTON
        // -------------------------

        else if (action === "submit") {

            if (userAnswer === "") {

                result.textContent =
                    "Please select an answer.";

            }

            else if (
                userAnswer ===
                questions[currentQuestionIndex].answer
            ) {

                result.textContent = "Correct!";

                score++;

            }

            else {

                result.textContent = "Incorrect!";

            }

        }


        // -------------------------
        // NEXT BUTTON
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

                // Hide the quiz
                quiz.style.display = "none";

                // Show the score screen
                scoreScreen.style.display = "block";

                // Display the final score
                finalScore.textContent =
                    "Your Score: " +
                    score +
                    " / " +
                    questions.length;

            }

        }

    };

});
