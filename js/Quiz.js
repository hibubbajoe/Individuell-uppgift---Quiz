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
                            </label>`
                        );
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

        //printing the output array with question and answers to webpage
        quizContainer.innerHTML = output.join('');

        //call to load the layout with slides 
        loadLayout();

    }

    printResults() {

        //quiz div
        let quizContainer = document.getElementById('quiz')
        //results div
        let resultsContainer = document.getElementById('results')
        //answers div
        let answerContainers = quizContainer.querySelectorAll('.answers');

        //arrays to store answers
        let correctAnswers = [];
        let userAnswers = [];

        //starting of with 0 points
        let numCorrect = 0;

        //goting through every question
        this.questions.forEach(
            (question, index) => {

                //temporary arrays to hold correct answers and user answers
                let tempCorrectAnswer = [];
                let tempUserAnswer = [];

                //going through every answer
                for (let answer in question.correct_answers) {
                    //catching answers returning 'true'
                    if (question.correct_answers[answer] == 'true') {
                        //answer_a_correct becomes answer_a
                        let correctAnswer = answer.replace('_correct', '');
                        //pushing correct answers
                        tempCorrectAnswer.push(correctAnswer);
                    }
                }

                //goting throigh every answer
                for (let answer in question.answers) {

                    //looking at container for every answer
                    let answerContainer = answerContainers[index];
                    //returning answer_x if checked or undefined 
                    let userAnswer = (answerContainer.querySelector(`input[value=${answer}]:checked`) || {}).value;

                    //user answer is pushed as long as it's not undefined
                    if (userAnswer !== undefined) {
                        tempUserAnswer.push(userAnswer);
                    }
                }

                //checking if answer is correct
                if (JSON.stringify(tempCorrectAnswer) === JSON.stringify(tempUserAnswer)) {
                    numCorrect++;
                }

                //pushing answers to their respective array
                correctAnswers.push(tempCorrectAnswer);
                userAnswers.push(tempUserAnswer);
            });


        endSlide();
        //printing results to webpage
        resultsContainer.innerHTML = `You have ${numCorrect} points out of ${this.questions.length}`;
    };
}