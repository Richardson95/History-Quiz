const questions = [
    {
        question: "what is the coldest country in africa?",
        answer: [
            { text: "Lesotho", correct: true},
            { text: "Botswana", correct: false},
            { text: "Eswatini", correct: false},
            { text: "Swaziland", correct: false},
            { text: "Eritrea", correct: false},

        ]
    },
    {
        question: "Who led the first military coup in nigeria?",
        answer: [
            { text: "Victor A. Ademoyeiga", correct: false},
            { text: "Muhammad Bukar Sodiq", correct: false},
            { text: "Chukwuma Kaduna Nzeogwu", correct: true},
            { text: "Yakubu Jack Gowon", correct: false},
            { text: "Johnson Aguiyi-Ironsi", correct: false},

        ]
    },
    {
        question: "Which bridge was the first to be built across the River Thames in London?",
        answer: [
            { text: "London Bridge", correct: true},
            { text: "Southwark Bridge", correct: false},
            { text: "Westminster Bridge", correct: false},
            { text: "Tower Bridge", correct: false},
            { text: "Waterloo Bridge", correct: false},

        ]
    },
    {
        question: "When did Mao Zedong come to power?",
        answer: [
            { text: "1959", correct: false},
            { text: "1948", correct: false},
            { text: "1960", correct: false},
            { text: "1949", correct: true},
            { text: "1892", correct: false},

        ]
    },
    {
        question: " What was the shortest war in human history?",
        answer: [
            { text: "The war between Lesotho and South-Africa", correct: false},
            { text: "The war between The United States and Vietnam", correct: false},
            { text: "The war between Holland and Belgium", correct: false},
            { text: "The war between Scotland and Wales", correct: false},
            { text: "The war between England and Zanzibar", correct: true},

        ]
    },
    {
        question: "What are the names of the U.S. presidents who have been assassinated?",
        answer: [
            { text: "Franklin D. Roosevelt, James A. Garfield, Robert J. Mugabe, John F. Kennedy", correct: false},
            { text: "Abraham Lincoln, Lutherford M. Hrash, William McKinley, John F. Kennedy", correct: false},
            { text: "Abraham Lincoln, James A. Garfield, William McKinley, Gary Hardkins", correct: false},
            { text: "Abraham Lincoln, James A. Garfield, William McKinley, John F. Kennedy", correct: true},
            { text: "Abraham Lincoln, James A. Garfield, James Jackson, John F. Kennedy", correct: false},

        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🥳🎉`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();