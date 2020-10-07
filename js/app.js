document.addEventListener("DOMContentLoaded", function (e) {

    async function buildQuiz() {
        let response = await fetch('https://quizapi.io/api/v1/questions?apiKey=uaTodJdS5vQRU3kBesYWkWw2XO7m3S8IUSYaPfdr&limit=10')
        let questions = await response.json();
        return questions;
    }

    buildQuiz().then(questions => {

        let quiz = new Quiz(questions);

        quiz.printQuiz();

        document.getElementById('submit').addEventListener("click", function (e) {
            quiz.printResults();
            // endSlide();
        });
    })
});
