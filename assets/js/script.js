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


var users = {
    scores : [],
    initials : []
};




   
if( startBtn ) {
    startBtn.addEventListener("click", startQuiz );
}


function initializeBtns() {
    for (var i = 0; i < choicesEl.length; i++) {
    choicesEl[i].addEventListener("click", function ( event ) {
        getScore( event );
    });
}
}



function startQuiz() {
    countDown();
    promptQuestion();
    startBtn.innerHTML = "Next Problem";
}


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

// When the user clicks on a option button, checks to see if it is the correct answer
// If it is, then increases the score. If not, time depletion is accelerated.
// After the check is complete, the question is done so questionNumber is incremented 
// and the quiz moves to the next question unless there are no more questions left or 
// the timer reaches 0.
// If the quiz ends, then go to the result page.
function getScore( event ) {

    console.log( "Currently at question: " + questionNumber );
    console.log( "Correct answer is: " + quiz[questionNumber].correctAnswer );

    var element = event.target;
    console.log( element );
    if( element.matches( "li" ) ) {
        if( element.innerHTML === quiz[questionNumber].correctAnswer ) {
            score++;
            console.log( score );
        }
        else {
            timeLeft--;
        }
    }
    questionNumber++;
    if( questionNumber < quiz.length && timeLeft >= 0) {
        promptQuestion();
    }
    else {
        storeScore();
        //go to the result page
        goToResultPage();
    }
    
}


function countDown() {
    var timeInterval = setInterval( function() {
        if( timerEl ) {
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
            }
        }
    }, 1000 );
}


function storeScore() {
    // localStorage.setItem( "scoreKey", score );
    users.scores.push( score );
    localStorage.setItem( "users", JSON.stringify(users) );
}


function goToResultPage() {
    document.location.href="result.html";
    return false;
}


// For the result page
// var submitBtn = document.getElementById( "submit" );
// var inputFieldEl = document.getElementById( "inputField" );
// var resultBodyEl = document.getElementById( "resultBody" );
// var formEl = document.getElementById( "form" );
// var goBackBtn = document.getElementById( "goBack" );

// if( submitBtn ) {
//     submitBtn.addEventListener("click", storeInitials );
// }

// if( goBackBtn ) {
//     goBackBtn.addEventListener("click", returnToQuiz );
// }


// function storeInitial( event ) {
//     event.preventDefault();

//     var initial = inputFieldEl.value;
//     // localStorage.setItem( "initials", initials );
//     inputFieldEl.textContent = '';

//     var users = localStorage.getItem( "users" );
//     if( users ) {
//         users.initials.push( initial );
//     }
    
    
//     localStorage.setItem( "users", JSON.stringify(users) );
//     console.log( users );

//     // var displayResult = localStorage.getItem( "displayResult" );
//     localStorage.setItem( "displayResult", true );

//     renderResult(); 
//     hideForm();  
    
// }

// function renderResult() {
//     var displayResult = localStorage.getItem( "displayResult" );
//     if( displayResult != null && displayResult ) {

//         // var initials = localStorage.getItem( "initials" );
//         // var score = localStorage.getItem( "scoreKey" );

//         var users = localStorage.getItem( "users" );
        

//         var h3El = document.createElement( "h3" );
//         if( resultBodyEl ) {
//             resultBodyEl.append( h3El );
//         }
        
//         if( users ) {
//         //     h3El.textContent = "Name: " + users[ users.length - 1 ].initials.value + 
//         // " Score: " + users[ users.length - 1 ].points.value;
//             if( users.initials.length != 0 ) {
//                 h3El.textContent = "Name: " + users.initials[ users.initials.length - 1 ];
//             }
//             if( users.score.length != 0 ) {
//                 h3El.textContent += "Score: " + users.scores[ users.scores.length - 1 ];
//             }
            
//         }
        
//     }
// }


// function init() {
//     renderResult();
// }

// init();

// function hideForm() {
//     formEl.style.display = "none";
// }

// function clearLocalStorage() {

// }

// function returnToQuiz() {
//     document.location.href = "index.html";
//     return false;
// }

