var startBtn = document.querySelector( '#start' );
var questionboxEl = document.querySelector( "#questionArea" );
var nextBtn = document.querySelector( "#next" );
var ulTag = document.querySelector( "ul" );


var questionNumber = 0;
var quiz = [
    // questions : [
    //     "question 1 text", "question 2 text", "question 3 text"
    // ],
    // answers : [
    //     "answer 1 text", "answer 2 text", "answer 3 text"
    // ],  
    {
        question : "question 1 text",
        correctAnswer : "correctAnswer 1 text",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 2 text",
        correctAnswer : "correctAnswer 2 text",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 3 text",
        correctAnswer : "correctAnswer 3 text",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 4 text",
        correctAnswer : "correctAnswer 4 text",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 5 text",
        correctAnswer : "correctAnswer 5 text",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
]


   
if( startBtn ) {
    startBtn.addEventListener("click", startQuiz );
}

if( nextBtn ) {
    nextBtn.addEventListener( "click", promptQuestion );
}

function startQuiz() {
    promptQuestion();
    startBtn.innerHTML = "Next Problem";
}

// function goToQuizPage() {
//     document.location.href="quiz.html";
//     return false;
// }

function promptQuestion() {
    clearMulChoice();
    questionboxEl.textContent = quiz[questionNumber].question;
    listAnswers();
    questionNumber++;

}

function listAnswers() {
    // var main = document.querySelector( ".card" );
    // var ulTag = document.createElement( "ul" );
    // main.appendChild( ulTag );
    for( var i = 0; i < quiz[questionNumber].allAnswers.length; i++ ) {
        var listTag = document.createElement( "li" );
        ulTag.appendChild( listTag );
        listTag.textContent = quiz[questionNumber].allAnswers[i];
    }
}

function reset() {
    startBtn.innerHTML = "Start Quiz";
    questionNumber = 0;
}

function clearMulChoice() {
    // var ultag = document.querySelector( "ul" );
    // if( ultag ) {
    //     ultag.remove();
    // }

    if( ulTag ) {
        while( ulTag.firstChild ) {
            ulTag.removeChild( ulTag.firstChild );
        } 
    }
}