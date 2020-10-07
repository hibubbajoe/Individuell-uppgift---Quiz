class Question {
    constructor(question) {
        this.question = question.question;
        this.answers = question.answers;
        this.correct_answers = question.correct_answers;
        this.multiple_correct_answers = question.multiple_correct_answers;
    }
}

class Quiz {
    constructor(questions) {
        this.questions = [];

        for (let question of questions) {
            this.questions.push(new Question(question));
        }
    }
    printQuiz() {

        // store HTML outputs
        let output = [];

        let quizContainer = document.getElementById('quiz')

        console.log(this.questions)


        //foreach question in questions
        this.questions.forEach(
            (question, index) => {

                // storing answers
                let answers = [];

                //foreach answer
                for (let answer in question.answers) {

                    //not printing an empty answer
                    if (question.answers[answer] !== null) {

                        //adding checkboxes
                        answers.push(
                            `<label>
                                <input type="checkbox" name="question${index}" value="${answer}" id="box">
                                ${question.answers[answer]}
                            </label>`
                        );
                    }
                }

                // adding the question and answers to output
                output.push(
                    `<div class="slide">
                        <div class="question"> ${question.question} </div>
                        <div class="answers"> ${answers.join('')} </div>
                        <p>${index + 1}/${this.questions.length}
                    </div>`
                );
            }
            // printing out the output on the page
        );
        quizContainer.innerHTML = output.join('');

    }

    printResults() {


        //to get to the HTML
        let quizContainer = document.getElementById('quiz')

        //to get to the HTML
        let resultsContainer = document.getElementById('results')

        //to cover all answers
        let answerContainers = quizContainer.querySelectorAll('.answers');

        let correctAnswers = [];

        let userAnswers = [];

        let numCorrect = 0;

        //foreach question

        this.questions.forEach(
            (question, index) => {

                //console.log(question.correct_answers)

                let correctAnswer;

                //temporary arrays to hold correct and user answers
                let tempCorrectAnswer = [];
                let tempUserAnswer = [];


                // go through answers in the correct answer object
                for (let answer in question.correct_answers) {
                    //catching and pushing answers returning TRUE 
                    if (question.correct_answers[answer] == 'true') {
                        correctAnswer = answer.replace('_correct', ''); // answer_a_correct becomes answer_a to easier check with userAnswer
                        //pushing any number of correct answers to that questions index
                        tempCorrectAnswer.push(correctAnswer);
                    }
                }

                for (let answer in question.answers) {

                    //variables to determine what checkboxes 
                    let answerContainer = answerContainers[index];
                    let userAnswer = (answerContainer.querySelector(`input[value=${answer}]:checked`) || {}).value;

                    //as long the an answer has a value it's pushed
                    if (userAnswer !== undefined) {
                        tempUserAnswer.push(userAnswer);
                    }
                }

                //pushing the answers to their respective array
                correctAnswers.push(tempCorrectAnswer);
                userAnswers.push(tempUserAnswer);

                //comparing the two arrays to see what indexes are the same 
                if (JSON.stringify(correctAnswers[index]) === JSON.stringify(userAnswers[index])) {
                    numCorrect++;
                }
            });

        console.log(correctAnswers)
        console.log(userAnswers)
        resultsContainer.innerHTML = `You have ${numCorrect} points out of ${this.questions.length}`;
    };
}