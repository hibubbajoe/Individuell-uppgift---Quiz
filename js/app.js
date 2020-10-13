document.addEventListener("DOMContentLoaded", function (e) {

    document.getElementById('start').addEventListener('click', function () {

        //getting amount of questions from user
        let amountOfQuestions = document.getElementById("question_amount").value;

        //10 is set as default if user manually enters a number that is outside 5 to 10 
        if (amountOfQuestions < 5 || amountOfQuestions > 10) {
            amountOfQuestions = 10;
        }

        //fetching quiz from quizapi
        async function fetchQuiz() {

            //fetching questionss
            let response = await fetch(`https://quizapi.io/api/v1/questions?apiKey=uaTodJdS5vQRU3kBesYWkWw2XO7m3S8IUSYaPfdr&limit=${amountOfQuestions}`);
            let questions = await response.json();
            return questions;
        }

        fetchQuiz().then(questions => {

            //creating new quiz
            let quiz = new Quiz(questions);

            //prints quiz to page
            quiz.printQuiz();

            //creating new player
            let player = document.getElementById("player");
            currentPlayer = new Player(player.value, 0);

            //prints answers to page on submit click
            document.getElementById('submit').addEventListener("click", function () {
                quiz.printResults();
            });
        })
    })
});