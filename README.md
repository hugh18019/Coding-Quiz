# Coding Quiz

Coding Quiz is a web application that quizzes the user's Javascript knowledge. It currently contains five question, but more questions can be added to its quiz object for a more comprehensive test. Each quiz question is a multiple choice problem. If the user chose the correct answer, then his/her score increases by a point. If not, then the penalty occurs in the form of reduced time that is left to finish the quiz. After the user has answered all question prompts or the timer counts down to zero, whichever happens first, the user is redirected to the result page where the user can enter their initials. After that their initials is printed out on the screen along with their score. The user can then hit the clear button to clear out their attempt history or hit the go back button to retake the quiz.

## Installation

To view the website locally, first go into the folder called "Coding Quiz" that contains all the related files of the site, and make sure that the index.html file is at the root, along with "result.html". Also make sure that the "assets" folder contains two folders, "css" and "js". The "css" folder contains style.css and the "js" folder contains two Javascript files. "script.js" provides functionality for the index.html file and "result.js" provides functionality for the result.html file. After checking that all the files are in place, simply go to the root directory and open the index.html to view the website.

To view the published site through a browser, simply click on this link "https://hugh18019.github.io/Coding-Quiz/".

## Technology Used

The index.html file of the project uses the Hypertext Markup Language( HTML ) to maintain a logical structure that contains all parts of the site.
The style.css uses css to select tags used by the index.html file to apply styles and manipulations to them to achieve the required look and functionality and interactivity of the website.
The script.js handles the main functionality of the index.html, which includes starting the quiz, displaying question prompts, calculating score and redirects to the result.html page.
The result.js handles the main functionality of the result.html, includinng recording and storing user initials, displaying score board, clearing score board and going back to index.html to restart the quiz.

## Main Features

Featurs of index.html: Every question in the quiz object is displayed on the screen along with their multiple choices which contains one correct answer. If the user clicks the wrong answers, a message displays beneath the question area telling the user that they answered wrong, and the score remains the same but a time penalty of 1 second incurs. If the user answered correctly, another message also appears confirming that they were right and the score is incremented by one.

Features of result.html: storing user's initials and displays the score board; clearing attemp history; returning to the quiz.

Here is a few demo of the features:

![demo1](1.gif 'demo1')

![demo2](2.gif 'demo2')

## Links

Link to deployed site: https://hugh18019.github.io/Coding-Quiz/ \
Link to code repo: https://github.com/hugh18019/Coding-Quiz

## License & copyright

Licensed under the [MIT License](LICENSE).
