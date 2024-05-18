const questions = [
    {
        question: "When did Nigeria gain Independence ?",
        options: [
            {text: "A. October 1, 1977", correct: false},
            {text: "B. October 1, 1950", correct: false},
            {text: "C. October 1, 1960", correct: true},
            {text: "D. October 1, 1963", correct: false}
        ]
    },

    {
        question: "Who is the current President of Nigeria as of 2023 ?",
        options: [
            {text: "A. Muhammadu Buhari", correct: false},
            {text: "B. Yemi Osibanjo", correct: false},
            {text: "C. Atiku Abubakar", correct: false},
            {text: "D. Bola Tinubu", correct: true}
        ]
    },

    {
        question: "What is the capital city of Nigeria ?",
        options: [
            {text: "A. Lagos", correct: false},
            {text: "B. Kano", correct: false},
            {text: "C. Abuja", correct: true},
            {text: "D. Ibadan", correct: false}
        ]
    },

    {
        question: "Which of these cities is the largest in Nigeria by population ?",
        options: [
            {text: "A. Abuja", correct: false},
            {text: "B. Lagos", correct: true},
            {text: "C. Kano", correct: false},
            {text: "D. Port Harcourt", correct: false}
        ]
    },

    {
        question: "What is the main currency used in Nigeria ?",
        options: [
            {text: "A. Cedi", correct: false},
            {text: "B. Naira", correct: true},
            {text: "C. Dollar", correct: false},
            {text: "D. Euro", correct: false}
        ]
    },

    {
        question: "Which of these rivers is the longest in Nigeria ?",
        options: [
            {text: "A. Niger River", correct: true},
            {text: "B. Benue River", correct: false},
            {text: "C. Cross River", correct: false},
            {text: "D. Kaduna River", correct: false}
        ]
    },

    {
        question: "Nigeria is divided into how many geopolitical zones ?",
        options: [
            {text: "A. 4", correct: false},
            {text: "B. 6", correct: true},
            {text: "C. 8", correct: false},
            {text: "D. 10", correct: false}
        ]
    },

    {
        question: "What is the official language of Nigeria ?",
        options: [
            {text: "A. Yoruba", correct: false},
            {text: "B. Igbo", correct: false},
            {text: "C. Hausa", correct: false},
            {text: "D. English", correct: true}
        ]
    },

    {
        question: "Which of these is a major Nigerian export ?",
        options: [
            {text: "A. Tea", correct: false},
            {text: "B. Petroleum", correct: true},
            {text: "C. Copper", correct: false},
            {text: "D. Rice", correct: false}
        ]
    },

    {
        question: "Who was the first female governor in Nigeria ?",
        options: [
            {text: "A. Ngozi Okonjo-Iweala", correct: false},
            {text: "B. Dora Akunyili", correct: false},
            {text: "C. Virginia Etiaba", correct: true},
            {text: "D. Aisha Buhari", correct: false}
        ]
    }
];

const question = document.getElementById("question");
const optionButtons = document.getElementById("options");
const nextButton = document.getElementById("next");
const tracker = document.getElementById("tracker");
const result = document.getElementById("result");
const finalScore = document.getElementById("score");
const finalRemark = document.getElementById("remark");

var currentQuestionIndex = 0;
var score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function resetState() {
    nextButton.style.display = "none";
    result.style.display = "none";

    tracker.style.display = "block";
    question.style.display = "block";

    while (optionButtons.firstChild) {
        optionButtons.removeChild(optionButtons.firstChild);
    }
}

function showQuestion() {
    resetState();

    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    question.innerHTML = questionNo + ". " + currentQuestion.question;
    tracker.innerHTML = questionNo + "/10";

    currentQuestion.options.forEach( function(option){
        const button = document.createElement("button");
        button.innerHTML = option.text;
        button.classList.add("option-btn");
        optionButtons.appendChild(button);

        if (option.correct) {
            button.dataset.correct = option.correct;
        }
        button.addEventListener("click", selectOption);
    });
}

function selectOption(event) {
    const selectedBtn = event.target;
    selectedBtn.classList.add("btn-focus");
    const isCorrect = selectedBtn.dataset.correct; /*=== "true";*/
    if (isCorrect) {
        score++;
    }

    Array.from(optionButtons.children).forEach(function(button) {
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", function() {
    if (currentQuestionIndex < questions.length){
        displayNextQuestion();
    } else {
        startQuiz();
    }
})

function displayNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }

    if (currentQuestionIndex === 9) {
        nextButton.innerHTML = "Submit";
    } 
    
}

function showScore() {
    resetState();
    var remark;
    if (score === questions.length) {
        remark = "Very Impressive!!";
    } else if (score >= 7 && score < questions.length) {
        remark = "Nicely Done!";
    } else if (score >= 4 && score <= 6) {
        remark = "Good job!";
    } else if (score >= 1 && score <= 3) {
        remark = "Do better next time!";
    } else {
        remark = "Are you sure you are a Nigerian???";
    }

    tracker.style.display = "none";
    question.style.display = "none";
    result.style.display = "block";

    finalScore.innerHTML = `${score}/${questions.length}`;
    finalRemark.innerHTML = remark;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

startQuiz();