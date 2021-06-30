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

// Adds an event listener to each choice
// When a choice is clicked, the getScore() function is called to determine whether the choice is correct
function initializeBtns() {
    for (var i = 0; i < choicesEl.length; i++) {
        choicesEl[i].addEventListener("click", function ( event ) {
            getScore( event );
        });
    }
}

// Creates a p tag for displaying the feedback for each choice the user clicks on
function createFeedbackArea() {
    var pTag = document.createElement( "p" );
    pTag.className = "feedbackArea";
    boxEl.appendChild( pTag );
    pTag.textContent = "";
}

// Starts the quiz. 
// First calls createFeedBackArea() to create space for display feedback for each choice
// Then calls hideStartBtn() to hide the startBtn 
// Then calls countDown() to start the countdown timer
// Then calls promptQuestion() to display the first question and its multiple answer choices.
function startQuiz() {
    createFeedbackArea();
    hideStartBtn();
    countDown();
    promptQuestion();
}

// Displays the question
// First clears out the previous question from the display area
// Then retrieves the appropriate question from the quiz object
// Then calls listAnswers() to create each answer choice as a list
// Then converts those lists into clickable buttons
function promptQuestion() {
    clearMulChoice();
    questionboxEl.textContent = quiz[questionNumber].question;
    listAnswers();
    initializeBtns();
}

// Clears out the previous question from the display area for questions
function clearMulChoice() {
    if( ulTagEl ) {
        while( ulTagEl.firstChild ) {
            ulTagEl.removeChild( ulTagEl.firstChild );
        } 
    }
}

// For each question, converts each possible answer of it into a list item
function listAnswers() {
    for( var i = 0; i < quiz[questionNumber].allAnswers.length; i++ ) {
        var listTag = document.createElement( "li" );
        ulTagEl.appendChild( listTag );
        listTag.setAttribute( "style", " color:white;" );
        listTag.textContent = quiz[questionNumber].allAnswers[i];
    }
}

function reset() {
    startBtn.innerHTML = "Start Quiz";
    questionNumber = 0;
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

// The countDown timer 
// For each passing 1000 ms, the time left is decremented by one
// The time left reaches 0, the timerInterval is stopped from decrementing further and 
// storeScore() is called to store the current score and then calls goToResultPage() to 
// go to result.html
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

// Stores the current score into local storage
function storeScore() {
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

// Goes to the result.html to display the score
function goToResultPage() {
    document.location.href="result.html";
    return false;
}



