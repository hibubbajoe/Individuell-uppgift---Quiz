//variables for buttons and slides
let submitButton;
let playAgainBtn;
let previousButton;
let nextButton;
let slides;
let currentSlide;



function preSlide() {
    previousButton.style.display = 'none';
    submitButton.style.display = 'none';
    nextButton.style.display = 'none';
}


function loadLayout() {

    //getting all elements from HTML
    submitButton = document.getElementById('submit')
    playAgainBtn = document.getElementById("playAgainBtn")
    previousButton = document.getElementById("previous");
    nextButton = document.getElementById("next");
    slides = document.querySelectorAll(".slide");

    currentSlide = 0;

    //calling the first slide
    preSlide()
    //showSlide(currentSlide);

    //event listeners
    previousButton.addEventListener("click", function (e) {
        previousSlide();
    })
    nextButton.addEventListener("click", function (e) {
        nextSlide();
    });
}

function showSlide(n) {

    //removing active-slide to hide previous question
    slides[currentSlide].classList.remove('active-slide');
    //adding active-slide to show next question
    slides[n].classList.add('active-slide');
    //getting whatever number given from next/previous buttons

    currentSlide = n;

    //showing and hiding buttons depending on what question you're on
    if (currentSlide === 0) { //first question
        previousButton.style.display = 'none'; //previous button is NOT displayed
    }
    else {
        previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) { //last question   
        nextButton.style.display = 'none'; //next button is NOT displayed
        submitButton.style.display = 'inline-block'; //submit button IS displayed
    }
    else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

//functions to go back and forth between questions
function nextSlide() {
    showSlide(currentSlide + 1);
}
function previousSlide() {
    showSlide(currentSlide - 1);

}

//function to let player play again
function endSlide() {

    //hiding questions and buttons
    slides[currentSlide].classList.remove('active-slide');
    previousButton.style.display = 'none';
    submitButton.style.display = 'none';

    //adding a play again button
    playAgainBtn = document.createElement('button');
    playAgainBtn.setAttribute("id", "playAgainBtn")
    playAgainBtn.innerHTML = "Do you want to play Again?";
    let buttonDiv = document.getElementById("buttons");
    buttonDiv.appendChild(playAgainBtn);

    //button to reload page
    playAgainBtn.addEventListener("click", function (e) {
        location.reload();
    })
}


