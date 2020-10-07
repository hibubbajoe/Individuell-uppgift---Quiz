

//variables
let submitButton = document.getElementById('submit')
let playAgainBtn = document.getElementById("playAgainBtn")

let previousButton = document.getElementById("previous");
let nextButton = document.getElementById("next");
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;




//event listeners
previousButton.addEventListener("click", function (e) {
    //previousSlide();
    console.log('Fan tja')
})
nextButton.addEventListener("click", function (e) {
    showSlide(currentSlide);
    // nextSlide();
});

/*function showSlide(n) {
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
}*/
/* function nextSlide() {
     showSlide(currentSlide + 1);
     console.log('currentSlide')

 }
 function previousSlide() {
     showSlide(currentSlide - 1);
     console.log(currentSlide)
 }
 function endSlide() {
     slides[currentSlide].classList.remove('active-slide');
     previousButton.style.display = 'none';
     submitButton.style.display = 'none';

     let playAgainBtn = document.createElement('button');
     playAgainBtn.setAttribute("id", "playAgainBtn")
     playAgainBtn.innerHTML = "Do you want to play Again?";

     let buttonDiv = document.getElementById("buttons");
     buttonDiv.appendChild(playAgainBtn);

 }
 playAgainBtn.addEventListener("click", resetGame)
 function resetGame() {
     location.reload();
 }*/




