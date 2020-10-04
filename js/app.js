
//classes    
class QuestionList {
    constructor(questions, answers, correct_answers) {
        this.questions = questions;
        this.answers = answers;
        this.correct_answers = correct_answers;
    }

    list() {
        return this.questions;
    }
}
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
function printResults() {

    //to get to the HTML
    let resultsContainer = document.getElementById('results')

    //to cover all answers
    let answerContainers = quizContainer.querySelectorAll('.answers');

    //points for correct answers 
    let numCorrect = 0;

    //foreach question
    questions.forEach((currentQuestion, questionNumber) => {

        //finding selected answers
        let answerContainer = answerContainers[questionNumber];
        let selector = `input[name=question${questionNumber}]:checked`;
        let userAnswer = (answerContainer.querySelector(selector) || {}).value;

        //if answer is correct
        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
        }
    });
    resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;

};

function showSlide(n) {

    let slides = document.querySelector(".slides");
    currentSlide = n;
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
    console.log("jäna")
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

document.addEventListener("DOMContentLoaded", function (e) {

    fetch('https://quizapi.io/api/v1/questions?apiKey=uaTodJdS5vQRU3kBesYWkWw2XO7m3S8IUSYaPfdr&limit=10')
        .then(response => response.json())
        .then(data => {
            let questions = new QuestionList(data);
            printQuiz(questions.list());
        })



    //variables
    let submitButton = document.getElementById('submit')
    let playAgainBtn = document.getElementById("playAgainBtn")




    //callouts
    let currentSlide = 0;

    showSlide(currentSlide);
    //varibales for slides
    let previousButton = document.getElementById("previous");
    let nextButton = document.getElementById("next");

    //start on the first slide

    //event listeners
    previousButton.addEventListener("click", function (e) {
        previousSlide();

    })
    nextButton.addEventListener("click", function (e) {
        nextSlide();

    });
    submitButton.addEventListener("click", function (e) {
        endSlide();
        printResults();
    });


});



