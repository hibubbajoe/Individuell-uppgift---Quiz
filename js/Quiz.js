//class with attributes of question 
class Question {
    constructor(question) {
        this.question = question.question;
        this.answers = question.answers;
        this.correct_answers = question.correct_answers;
        this.multiple_correct_answers = question.multiple_correct_answers;
    }
}

//class with questions and print methods
class Quiz {
    constructor(questions) {
        this.questions = [];

        //pushing every question into questions array
        for (let question of questions) {
            this.questions.push(new Question(question));
        }
    }

    printQuiz() {

        //store HTML outputs
        let output = [];
        //quiz div 
        let quizContainer = document.getElementById('quiz')

        //going through every question 
        this.questions.forEach(
            (question, index) => {

                //array to store answers
                let answers = [];

                //going through every answer
                for (let answer in question.answers) {

                    //not printing if answer is empty
                    if (question.answers[answer] !== null) {
                        //pushing HTML for answer to answers array 
                        answers.push(
                            `<label>
                                    <input type="checkbox" name="question${index}" value="${answer}" id="box">
                                    ${question.answers[answer]}
                            </label>`);
                    }
                }

                //pushing HTML for question and answers to output array
                output.push(
                    `<div class="slide">
                        <div class="question"> ${question.question} </div>
                        <div class="answers"> ${answers.join('')} </div>
                        <p>${index + 1}/${this.questions.length}
                    </div>`
                );
            }
        );

        //prints the output array with question and answers to page
        quizContainer.innerHTML = output.join('');

        //call to load the layout with slides from slide.js
        loadLayout();
    }

    catchUserAnswers() {

        //quiz div
        let quizContainer = document.getElementById('quiz')
        //answers div
        let answerContainers = quizContainer.querySelectorAll('.answers');
        //array to store all correct answers    
        let userAnswers = [];

        //going through every question
        this.questions.forEach(
            (question, index) => {

                //temporary array to hold multiple user answers
                let tempUserAnswer = [];

                for (let answer in question.answers) {
                    //looking at container for every answer
                    let answerContainer = answerContainers[index];
                    //returning answer_x if checked or undefined if not checked
                    let userAnswer = (answerContainer.querySelector(`input[value=${answer}]:checked`) || {}).value;
                    //user answer is pushed as long as it's not undefined
                    if (userAnswer !== undefined) {
                        tempUserAnswer.push(userAnswer);
                    }
                }//pushing user answers to main array
                userAnswers.push(tempUserAnswer);
            })
        return userAnswers;
    }

    catchCorrectAnswers() {

        //array to store all correct answers
        let correctAnswers = [];

        //going through every question
        this.questions.forEach(
            (question) => {

                //temporary array to hold multiple correct answers
                let tempCorrectAnswer = [];

                //going through every answer
                for (let answer in question.correct_answers) {
                    //catching answers returning 'true'
                    if (question.correct_answers[answer] == 'true') {
                        //answer_a_correct becomes answer_a
                        let correctAnswer = answer.replace('_correct', '');
                        //pushing correct answers to temp array
                        tempCorrectAnswer.push(correctAnswer);
                    }
                }//pushing correct answers to main array
                correctAnswers.push(tempCorrectAnswer);
            })
        return correctAnswers;
    }

    calculatePoints() {

        //arrays to store answers
        let correctAnswers = this.catchCorrectAnswers();
        let userAnswers = this.catchUserAnswers();
        let playerPoints = [];

        //comparing the two arrays
        for (let i = 0; i < this.questions.length; i++) {
            //if both arrays are the same player gets a point
            if (JSON.stringify(correctAnswers[i]) == JSON.stringify(userAnswers[i])) {

                //adds point to player class
                currentPlayer.points++;

                //this one is just for the reduce function
                playerPoints.push(1);
            }
        }
        //just wanna show off the reduce function
        console.log(`The player got a total of ${playerPoints.reduce((acc, curr) => {
            return acc + curr;
        }, 0)} points`);
    }

    printResults() {
        //results div
        let resultsContainer = document.getElementById('results');

        //calling functions to calculate points and show last slide
        this.calculatePoints();
        endSlide();

        //prints results to page
        resultsContainer.innerHTML = `${currentPlayer.name} you got ${currentPlayer.points} out of ${this.questions.length} points`;
    };
}