document.addEventListener("DOMContentLoaded", function (e) {

    //functions
    function startQuiz() {
        // store HTML outputs
        let output = [];

        //foreach question
        questions.forEach(
            (currentQuestion, questionNumber) => {

                // store answers
                let answers = [];

                //foreach answer
                for (letter in currentQuestion.answers) {

                    // adding checkboxes
                    answers.push(
                        `<label>
                            <input type="checkbox" name="question${questionNumber}" value="${letter}">
                            ${letter} : ${currentQuestion.answers[letter]}
                        </label>`
                    );
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
        );
        // printing out the output on the page
        quizContainer.innerHTML = output.join('');
    }
    function printResults() {

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

                //color the right answer green and wrong answer red
                answerContainers[questionNumber].style.color = "green";
            } else {
                answerContainers[questionNumber].style.color = "red";
            }
        });
        resultsContainer.innerHTML = `${numCorrect} out of ${questions.length}`;

    };
    function showSlide(n) {
        slides[currentSlide].classList.remove('active-slide');
        slides[n].classList.add('active-slide');
        currentSlide = n;
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
        if (currentSlide === 3) {
            previousButton.style.display = 'none';
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

    //variables
    let quizContainer = document.getElementById('quiz')
    let resultsContainer = document.getElementById('results')
    let submitButton = document.getElementById('submit')

    let questions = [
        {
            question: "What is my name?",
            answers: {
                a: "Robin",
                b: "Not Robin",
                c: "Not Robin"
            },
            correctAnswer: "a",
        },
        {
            question: "How old am I?",
            answers: {
                a: "Not 30",
                b: "30",
                c: "Deffo not 30"
            },
            correctAnswer: "b"
        },
        {
            question: "Do you like music?",
            answers: {
                a: "Hell yes",
                b: "Hell no",
                c: "Hellest to no's",
                d: "Dafuq"
            },
            correctAnswer: "a"
        }
    ];


    //callouts
    startQuiz()

    //varibales for slides
    let previousButton = document.getElementById("previous");
    let nextButton = document.getElementById("next");
    let slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    //start on the first slide
    showSlide(currentSlide);

    //event listeners
    previousButton.addEventListener("click", function (e) {
        previousSlide();

    })
    nextButton.addEventListener("click", function (e) {
        nextSlide();

    });
    submitButton.addEventListener("click", function (e) {
        printResults();
    });



















    /*fetch('https://quizapi.io/api/v1/questions?apiKey=uaTodJdS5vQRU3kBesYWkWw2XO7m3S8IUSYaPfdr&limit=10')
            .then(response => response.json())
            .then(data => console.log(data))*/














});