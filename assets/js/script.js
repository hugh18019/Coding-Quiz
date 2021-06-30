var startBtn = document.querySelector( '#startBtn' );
var questionboxEl = document.querySelector( "#questionArea" );
var nextBtn = document.querySelector( "#next" );
var ulTagEl = document.querySelector( "ul" );
var boxEl = document.querySelector( ".box" );

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
        question : "Where is the correct place to insert a Javascript?",
        correctAnswer : "Both the <head> and <body> section",
        allAnswers : [ "The <body> section", "The <head> section", "Both the <head> and <body> section", "The <footer> section" ]
    },
    {
        question : "What is the correct syntax for referring to an external script called 'xxx.js'? ",
        correctAnswer : "<script src='xxx.js'>",
        allAnswers : [ "<script name='xxx.js'", "<script src='xxx.js'>", "<script href='xxx.js'" ]
    },
    {
        question : "The external Javascript file must contain the <script> tag.",
        correctAnswer : "False",
        allAnswers : [ "True", "False" ]
    },
    {
        question : "How do you create a function in Javascript?",
        correctAnswer : "function myFunction()",
        allAnswers : [ "var carName", "myFunction()", "function myFunction()", "alert('Hello World')" ]
    },
    {
        question : "Inside which HTML element do we put the Javascript?",
        correctAnswer : "<script>",
        allAnswers : [ "var carName", "<script>", "if( i == 5 )", "myFunction()" ]
    },
]


var users = {
    scores : [],
    initials : []
};


   
if( startBtn ) {
    startBtn.addEventListener("click", startQuiz );
}

function hideStartBtn() {
    startBtn.style.display = "none";
}

function initializeBtns() {
    for (var i = 0; i < choicesEl.length; i++) {
        choicesEl[i].addEventListener("click", function ( event ) {
            getScore( event );
        });
    }
}

function createFeedbackArea() {
    var pTag = document.createElement( "p" );
    pTag.className = "feedbackArea";
    boxEl.appendChild( pTag );
    pTag.textContent = "";
}

function startQuiz() {
    createFeedbackArea();
    hideStartBtn();
    countDown();
    promptQuestion();
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

    var element = event.target;
    console.log( element );
    if( element.matches( "li" ) ) {
        if( element.textContent == quiz[questionNumber].correctAnswer ) {
            score++;
            console.log( score );
            var feedBackEl = document.querySelector(".feedbackArea" );
            feedBackEl.textContent = "Correct!";
        }
        else {
            timeLeft--;
            var feedBackEl = document.querySelector(".feedbackArea" );
            feedBackEl.textContent = "Wrong!";
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

                storeScore();
                goToResultPage();
            }
        }
    }, 1000 );
}


function storeScore() {
    // localStorage.setItem( "scoreKey", score );

    
    var usersLocalStorage = JSON.parse( localStorage.getItem( "users" ) );
    // This is for doing the quiz after the first time
    // add the new score to the existing users object in local storage
    // so that all attemps can be printed out in result.html
    if( usersLocalStorage ) {
        usersLocalStorage.scores.push( score );
        localStorage.setItem( "users", JSON.stringify(usersLocalStorage) );
    }
    // This is for doing the quiz for the first time
    // There is no local storage of the users object
    // Put the score in users and store it in local storage for future updates
    else {
        users.scores.push( score );
        localStorage.setItem( "users", JSON.stringify(users) );
    }
    
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

