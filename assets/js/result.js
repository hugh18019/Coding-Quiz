// For the result page
var submitBtn = document.getElementById( "submit" );
var inputFieldEl = document.getElementById( "inputField" );
var resultBodyEl = document.getElementById( "resultBody" );
var mainEl = document.querySelector( ".box" );
var formEl = document.getElementById( "form" );
var goBackBtn = document.getElementById( "goBack" );
var clearBtn = document.getElementById( "clear" );

if( submitBtn ) {
    submitBtn.addEventListener("click", storeInitial );
}

if( goBackBtn ) {
    goBackBtn.addEventListener("click", returnToQuiz );
}

if( clearBtn ) {
    clearBtn.addEventListener( "click", clearResults );
}

// Stores the user's initials into local storage
function storeInitial( event ) {
    event.preventDefault();
    //hide the placeholder text
    var initial = inputFieldEl.value;
    inputFieldEl.textContent = '';
    
    // displays the clear button
    showClearBtn();
    // displays the go back button
    showGoBackBtn();

    //store the initials from the user in local storage
    var users = JSON.parse( localStorage.getItem( "users" ) );
    if( users ) {
        users.initials.push( initial );
    }
    localStorage.setItem( "users", JSON.stringify(users) );

    // hides the form when displaying the user's initials and scores
    hideForm();
    // displays the the initials and scores of every user who has taken the quiz
    renderResult();   
}

// Displays the score board including past attempts
// For each attempt, creates a h3 header and appends it to the main tag
// and stores in it the initials and score of the one who attempted the quiz
function renderResult() {
    var users = JSON.parse( localStorage.getItem( "users" ) );
    for( var i = 0; i < users.initials.length; i++ ) {
        var h3El = document.createElement( "h3" );
        mainEl.append( h3El );
        // if( users.initials[i] && users.scores[i] ) {
        h3El.textContent = "Name: " + users.initials[i] + " Score: " + users.scores[i];
        // }
    }  
}

// Hides the form after the submit button is clicked
function hideForm() {
    formEl.style.display = "none";
}

// Hides the goBack button when result.html loads
function hideGoBackBtn() {
    goBackBtn.style.display = "none";
}

// Hides the clearBtn when result.html loads
function hideClearBtn() {
    clearBtn.style.display = "none";
}

// Shows the goBack button when the submit buttion is clicked
function showGoBackBtn() {
    goBackBtn.style.display = "block";
}

// Shows the clear button when the submit buttion is clicked
function showClearBtn() {
    clearBtn.style.display = "block";
}

//  Returns to the index.html to retake the quiz when the goBack button is clicked
function returnToQuiz() {
    document.location.href = "index.html";
    return false;
}

// Clears the score board from the browswer as well as the attemps by each user from local storage
function clearResults() {
    var h3Tags = document.querySelectorAll( "h3" );
    for ( var each of h3Tags ) {
        each.remove();
    }
    localStorage.clear();
}

// This function is called when result.html loads, to hide the goBack and clear buttons
function init() {
    hideGoBackBtn();
    hideClearBtn();
}

// Calls init() when result.html loads
init();