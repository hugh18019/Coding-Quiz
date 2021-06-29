// For the result page
var submitBtn = document.getElementById( "submit" );
var inputFieldEl = document.getElementById( "inputField" );
var resultBodyEl = document.getElementById( "resultBody" );
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


function storeInitial( event ) {
    event.preventDefault();

    var initial = inputFieldEl.value;
    // localStorage.setItem( "initials", initials );
    inputFieldEl.textContent = '';

    var users = JSON.parse( localStorage.getItem( "users" ) );
    if( users ) {
        users.initials.push( initial );
    }
    
    
    localStorage.setItem( "users", JSON.stringify(users) );
    console.log( users );

    // var displayResult = localStorage.getItem( "displayResult" );
    localStorage.setItem( "displayResult", true );

    renderResult(); 
    hideForm();  
    
}

function renderResult() {
    var displayResult = localStorage.getItem( "displayResult" );
    if( displayResult != null && displayResult ) {

        // var initials = localStorage.getItem( "initials" );
        // var score = localStorage.getItem( "scoreKey" );

        var users = JSON.parse( localStorage.getItem( "users" ) );
        
        for( var i = 0; i < users.initials.length; i++ ) {
            var h3El = document.createElement( "h3" );
            resultBodyEl.append( h3El );
            if( users.initials[i] && users.scores[i] ) {
                h3El.textContent = "Name: " + users.initials[i] + " Score: " + users.scores[i];
            }
        }
        
        
        // if( users ) {
        //     if( users.initials ) {
        //         h3El.textContent = "Name: " + users.initials[ users.initials.length - 1 ];
        //     }
        //     if( users.scores ) {
        //         h3El.textContent += "Score: " + users.scores[ users.scores.length - 1 ];
        //     }
        // }
        
    }
}


// function init() {
//     renderResult();
// }

// init();

function hideForm() {
    formEl.style.display = "none";
}

function clearLocalStorage() {

}

function returnToQuiz() {
    document.location.href = "index.html";
    return false;
}

function clearResults() {
    var h3Tags = document.querySelectorAll( "h3" );
    for ( var each of h3Tags ) {
        each.remove();
    }
}