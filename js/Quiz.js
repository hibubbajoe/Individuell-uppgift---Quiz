class Question {
    constructor(question) {
        this.question = question.question;
        this.answers = question.answers;
        this.correct_answers = question.correct_answers;
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

        //foreach question in questions
        this.questions.forEach(
            (question, index) => {

                // store answers
                let answers = [];

                console.log(question.correct_answers)


                //foreach answer
                for (let letter in question.answers) {

                    //not printing an empty answer
                    if (question.answers[letter] !== null) {

                        // adding checkboxes
                        answers.push(
                            `<label>
                                    <input type="checkbox" name="question${index}" value="${letter}">
                                    ${question.answers[letter]}
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

        //points for correct answers 
        let numCorrect = 0;

        // let correctAnswers = [];

        //foreach question
        this.questions.forEach(
            (question, index) => {


                let correctAnswer = '';
                // go through answers in the correct answer object
                for (let answer in question.correct_answers) {

                    //to check what answer returns true 
                    if (question.correct_answers[answer] == 'true') {
                        correctAnswer = answer.replace('_correct', ''); // answer_a_correct becomes answer_a to easier check with userAnswer
                    }
                    // TODO: handle case of multiple correct answers 
                }

                //finding selected answers
                let answerContainer = answerContainers[index];
                let selector = `input[name=question${index}]:checked`;
                let userAnswer = (answerContainer.querySelector(selector) || {}).value;

                if (userAnswer == correctAnswer) {
                    numCorrect++;
                    console.log('Your answer for question ', index + 1, ' is correct!');
                }
            });
        resultsContainer.innerHTML = `You have ${numCorrect} points out of ${this.questions.length}`;
    };
}