document.addEventListener("DOMContentLoaded", function (e) {


    //fetching quiz from quizapi
    async function fetchQuiz() {
        let response = await fetch('https://quizapi.io/api/v1/questions?apiKey=uaTodJdS5vQRU3kBesYWkWw2XO7m3S8IUSYaPfdr&limit=10');
        let questions = await response.json();
        return questions;
    }

    fetchQuiz().then(questions => {

        //creating a new quiz
        let quiz = new Quiz(questions);

        //printing the quiz to webpage
        quiz.printQuiz();

        //calculating and printing the answers to webpage
        document.getElementById('submit').addEventListener("click", function (e) {
            quiz.printResults();

        });
    })



});