var startBtn = document.querySelector( '#start' );
var questionboxEl = document.querySelector( "#questionArea" );
var nextBtn = document.querySelector( "#next" );
var ulTagEl = document.querySelector( "ul" );

var choicesEl = document.getElementsByTagName( "li" );
var timerEl = document.querySelector( ".time" );

var timeLeft = 20;
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
        correctAnswer : "answer 1",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 2 text",
        correctAnswer : "answer 2",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 3 text",
        correctAnswer : "answer 3",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 4 text",
        correctAnswer : "answer 4",
        allAnswers : [ "answer 1", "answer 2", "answer 3", "answer 4" ]
    },
    {
        question : "question 5 text",
        correctAnswer : "answer 3",
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


function initializeBtns() {
    for (var i = 0; i < choicesEl.length; i++) {
    choicesEl[i].addEventListener("click", function ( event ) {
        getScore( event );
    });
}
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
    initializeBtns();


    // questionNumber++;

}

function listAnswers() {
    for( var i = 0; i < quiz[questionNumber].allAnswers.length; i++ ) {
        var listTag = document.createElement( "li" );
        ulTagEl.appendChild( listTag );
        listTag.textContent = quiz[questionNumber].allAnswers[i];
    }
}

// function reset() {
//     startBtn.innerHTML = "Start Quiz";
//     questionNumber = 0;
// }

// function clearMulChoice() {
//     if( ulTagEl ) {
//         while( ulTagEl.firstChild ) {
//             ulTagEl.removeChild( ulTagEl.firstChild );
//         } 
//     }
// }

// function getScore( event ) {

//     console.log( "Currently at question: " + questionNumber );
//     console.log( "Correct answer is: " + quiz[questionNumber].correctAnswer );

//     var element = event.target;
//     console.log( element );
//     if( element.matches( "li" ) ) {
//         if( element.innerHTML === quiz[questionNumber].correctAnswer ) {
//             score++;
//             console.log( score );
//         }
//         else {
//             timeLeft--;
//         }
//     }
//     questionNumber++;
//     if( questionNumber < quiz.length && timeLeft >= 0) {
//         promptQuestion();
//     }
//     else {
//         //go to the result page
//     }
    
// }


function countDown() {
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
