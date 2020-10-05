
function printQuiz(questions) {

    // store HTML outputs
    let output = [];

    let quizContainer = document.getElementById('quiz')


    //foreach question
    questions.forEach(
        (currentQuestion, questionNumber) => {
            // store answers
            let answers = [];

            //foreach answer
            for (letter in currentQuestion.answers) {


                //console.log(letter)
                //console.log(currentQuestion.answers)


                // adding checkboxes
                if (currentQuestion.answers[letter] !== null) {
                    answers.push(
                        `<label>
                                <input type="checkbox" name="question${questionNumber}" value="${letter}">
                                ${currentQuestion.answers[letter]}
                            </label>`
                    );
                }
            }

            // adding the question and answers to output
            output.push(
                `<div class="slide">
                        <div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join('')} </div>
                        <p>${questionNumber + 1}/${questions.length}
                        </div>`
            );

        }
        // printing out the output on the page
    );
    quizContainer.innerHTML = output.join('');

}

//functions
function printResults(questions) {

    console.log(questions)

    //to get to the HTML
    let quizContainer = document.getElementById('quiz')

    //to get to the HTML
    let resultsContainer = document.getElementById('results')

    //to cover all answers
    let answerContainers = quizContainer.querySelectorAll('.answers');

    //points for correct answers 
    let numCorrect = 0;

    let correctAnswersCount = 0;

    // let correctAnswers = [];

    //foreach question
    questions.forEach((question, i) => {
        let correctAnswer;

        // Find correct answer for question
        for (let corrAnswer in question.correct_answers) {
            if (question.correct_answers[corrAnswer] == 'true') {
                correctAnswer = corrAnswer.replace('_correct', ''); // correctAnswers.push(correctAnswer);
                //console.log("Correct answer for question ", i + 1, " is ", correctAnswer);
            }
            // TODO: handle case of multiple correct answers 
        }

        // console.log("correctAnswer: ", correctAnswer);
        //finding selected answers
        let answerContainer = answerContainers[i];
        let selector = `input[name=question${i}]:checked`;
        let userAnswer = (answerContainer.querySelector(selector) || {}).value;

        console.log(userAnswer)
        if (userAnswer == correctAnswer) {
            numCorrect++;
            console.log('Your answer for question ', i + 1, ' is correct!');
        }


    });
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;
    // console.log("Correct answers: ", correctAnswers);
    console.log("You got a total of ", numCorrect, " correct answers!");

};


document.addEventListener("DOMContentLoaded", function (e) {

    async function catchQuestions() {
        let response = await fetch('https://quizapi.io/api/v1/questions?apiKey=uaTodJdS5vQRU3kBesYWkWw2XO7m3S8IUSYaPfdr&limit=10')
        let questions = await response.json();
        //console.log(questions)
        return questions;
    }

    catchQuestions().then(questions => {
        printQuiz(questions);
    });



    /* fetch('https://quizapi.io/api/v1/questions?apiKey=uaTodJdS5vQRU3kBesYWkWw2XO7m3S8IUSYaPfdr&limit=10')
         .then(response => response.json())
         .then(data => {
             let questions = new Quiz(data);
             printQuiz(questions.print());
         })*/

    /* function showSlide(n) {
 
 
 
         let currentSlide = n;
 
         console.log(slides)
         console.log(currentSlide)
         slides[currentSlide].classList.remove('active-slide');
         slides[n].classList.add('active-slide');
         if (currentSlide === 0) {
             previousButton.style.display = 'none';
         }
         else {
             previousButton.style.display = 'inline-block';
         }
         if (currentSlide === slides.length - 1) {
             nextButton.style.display = 'none';
             submitButton.style.display = 'inline-block';
         }
         else {
             nextButton.style.display = 'inline-block';
             submitButton.style.display = 'none';
         }
     }
     function nextSlide() {
         showSlide(currentSlide + 1);
         console.log(currentSlide)
 
     }
     function previousSlide() {
         showSlide(currentSlide - 1);
         console.log(currentSlide)
     }
     /*function endSlide() {
         slides[currentSlide].classList.remove('active-slide');
         previousButton.style.display = 'none';
         submitButton.style.display = 'none';
         
         let playAgainBtn = document.createElement('button');
         playAgainBtn.setAttribute("id", "playAgainBtn")
         playAgainBtn.innerHTML = "Do you want to play Again?";
         
         let buttonDiv = document.getElementById("buttons");
         buttonDiv.appendChild(playAgainBtn);
         
         playAgainBtn.addEventListener("click", resetGame)
     }*/
    function resetGame() {
        location.reload();
    }





    //variables
    let submitButton = document.getElementById('submit')
    let playAgainBtn = document.getElementById("playAgainBtn")
    let slides = document.querySelectorAll(".slide");
    let previousButton = document.getElementById("previous");
    let nextButton = document.getElementById("next");


    // showSlide(currentSlide)





    //event listeners
    previousButton.addEventListener("click", function (e) {
        previousSlide();
        console.log('Fan tja')

    })
    nextButton.addEventListener("click", function (e) {
        nextSlide();
        console.log('Fan tja')

    });
    submitButton.addEventListener("click", function (e) {
        catchQuestions().then(questions => {
            printResults(questions);
        });

        // endSlide();
    });
});



