var startBtn = document.querySelector( '#start' );
var questionboxEl = document.querySelector( "#questionArea" );
var nextBtn = document.querySelector( "#next" );
var ulTagEl = document.querySelector( "ul" );

var choicesEl = document.getElementsByTagName( "li" );
var timerEl = document.querySelector( ".time" );

var questionNumber = 0;
var score = 0;
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

countDown();
   
if( startBtn ) {
    startBtn.addEventListener("click", startQuiz );
}

// if( nextBtn ) {
//     nextBtn.addEventListener( "click", promptQuestion );
// }


for (var i = 0; i < choicesEl.length; i++) {
    choicesEl[i].addEventListener("click", function ( event ) {
        getScore( event );
    });
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
    for( var i = 0; i < quiz[questionNumber].allAnswers.length; i++ ) {
        var listTag = document.createElement( "li" );
        ulTagEl.appendChild( listTag );
        listTag.textContent = quiz[questionNumber].allAnswers[i];
    }
}

function reset() {
    startBtn.innerHTML = "Start Quiz";
    questionNumber = 0;
}

function clearMulChoice() {
    if( ulTagEl ) {
        while( ulTagEl.firstChild ) {
            ulTagEl.removeChild( ulTagEl.firstChild );
        } 
    }
}

function getScore( event ) {
    var element = event.target;
    if( element.matches( "li" ) ) {
        if( element.innerHTML === quiz[questionNumber].correctAnswer ) {
            score++;
        }
        else {
            // time--;
        }
    }
}


function countDown() {
    var timeLeft = 10;
    var timeInterval = setInterval( function() {
        if( timeLeft > 1 ) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        }
        else if( timeLeft === 1 ) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        }
        else {
            timerEl.textContent = '';
            clearInterval( timeInterval );
            displayMessage();
        }
    }, 1000 );
}
