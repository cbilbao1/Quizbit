/* 11/13/24
custom JavaScript for the right side navbar buttons on the Quiz Page */

var numPlayers = 1; //TODO: numPlayers should correspond to the amount of players in the lobby
var playerAnswers = Array(numPlayers).fill(""); // all players start with empty answer
var playerScores = Array(numPlayers).fill(0);   // each player starts with no score
var playerHasAnswered = Array(numPlayers).fill(false);  // all players start with no answers

//Reference each element by id
//var video = document.getElementById("quiz__media--player");
var video = document.getElementsByClassName("quiz__media--player")[0];

var inputField = document.getElementById("input__answer");

var timerText = document.getElementById("timer");

var listCaptionIsActivated = false;
var listButton = document.getElementById("quiz__list--btn");

var barsCaptionIsActivated = false;
var barsButton = document.getElementById("quiz__bars--btn");

var cogDropdownIsActivated = false;
var cogButton = document.getElementById("quiz__cog--btn");

inputField.addEventListener("keypress", lockinAnswer); // if the user presses Enter, their answer will be locked in
//Add a "click" event for all of the buttons
listButton.addEventListener("mouseover", enableCaption);  // if this button is hovered over, call function
listButton.addEventListener("mouseleave", enableCaption);  // if this button is hovered over, call function
listButton.addEventListener("click", enableListPopup);  // if this button is clicked, call function
barsButton.addEventListener("mouseover", enableBarsCaption);  // if this button is hovered over, call function
barsButton.addEventListener("mouseleave", enableBarsCaption);  // if this button is hovered over, call function
cogButton.addEventListener("click", enableDropdown);  // if this button is clicked, call function

/* Resource on input suggesting:
https://www.tutorialspoint.com/how-to-display-suggestions-for-input-field-in-html /*
/* when the user presses enter and the input box is currently selected,
store the user's answer to the question */
function lockinAnswer (evnt) {
    console.log("The user pressed some key.");
    if (evnt.key == "Enter") {  // if the user pressed enter..
        console.log("The user pressed Enter.");
        console.log("Input box. pressed enter. event target:", evnt.target);
        if (evnt.target.matches("#input__answer")) { // if the input box is currently being interacted with
            console.log("The user is entering in input field.");
            if (inputField.value != "") { // as long as the user didn't put an empty answer
                // then we can process the data
                console.log("The user inputted a valid answer.");

                /* TODO: ACCOMODATE MULTIPLE PLAYERS. WE ONLY ARE TAKING IN PLAYER 1'S INPUT */
                console.log("OK, OUR INPUT FIELD HAS:", inputField.value);
                playerAnswers[0] = inputField.value; // set the current player's answer to what is currently in the input field
                console.log("OK, OUR USER ANSWER IS:", playerAnswers[0]);
                //TODO: IMPLEMENT A PLAYER CLIENT ID
                //TODO: CHECK THE CLIENT'S ID, THEN CHANGE BOOLEAN IN THE ARRAY
                playerHasAnswered[0] = true;    // set the current player to have answered
            }
        }
    }
}

let answer = document.getElementById('input__answer');
let suggestions = document.getElementById('input__suggestions');
let suggestions_box = document.getElementsByClassName("quiz__input__suggestions--box")[0];
// define your search data as an array of strings
/*
let searchData = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal'
];
*/
let searchData = [];    // initialize database array as empty array
$.ajax({    // $.ajax sends requests to the server in the background, allowing the browser to continue processing other tasks without blocking
    /* url: The URL of the server-side script to request.
    type: The request method (e.g., GET, POST, PUT, DELETE).
    data: The data to be sent to the server (e.g., JSON, form data).
    success: A callback function to handle the response data when the request is successful.
    error: A callback function to handle errors or failures. */
    url: 'quiz-game.php', // the php file
    type: 'GET', // type of the HTTP request (we are only pulling from database, so don't need to do HTTP POST method)
    success: function(data) {   // if successful
        // process the response data
        //TODO: DO STUFF HERE
        var obj = jQuery.parseJSON(data);
        console.log("DATABASE OBJ:", obj);
        console.log("Song 1:", obj[0]); // returns the song's full array
        console.log("Song 1 Name:", obj[0][1]); // returns the song's name

        obj.forEach(item => {   // For each song in the database, where 'item' is the specific song's
                            console.log("SONG OBJ:", item); // returns the song's full array
                            console.log("Song Anime Name:", item[3]); // returns the song's anime name
                            searchData.push(item[3]);  // add the anime name to the database array
                        });
    }
});

// function to filter search results
function filterResults(query) {
    /* 'array.filter()' creates a shallow copy of the array of the filtered elements
    specified by the function.
    search if the specific element (item) in the data array includes some portion of the
    user input. */
    return searchData.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// function to display search results. results is the filtered array
function displayResults(results) {
    suggestions.innerHTML = ''; // hide the suggestions
    /* 'array.forEach()' executes instructions for each element in array. the argument
    is the function to call to process each element */
    results.forEach(result => {
                            let li = document.createElement('li');    // initialize a new list item in the unordered list
                            li.textContent = result;    // takes the text attribute of the new list element and sets it to one of the filtered results
                            li.addEventListener('click', () => {    // when the user clicks on a specific suggestion option
                                                            answer.value = result;    // change the user's search input to the selected suggestion
                                                            suggestions.innerHTML = '';   // hide the suggestions
                                                        });
                                suggestions.appendChild(li);    // adds the new list item to the unordered list array
                        });
    suggestions_box.setAttribute("id", "quiz__input__suggestions--transition"); // add the transition id to the suggestions box, activating the appear transition
}

// event listener for search input
/* NOTE: '.addEventListener('input', ...)' LISTENS IF THE VALUE CHANGES IN SOME WAY */
answer.addEventListener('input', () => {   // for the input field box, activate when user types in something. Activates each a user types in something
    let query = answer.value;  // take the user input (as it currently is) and set it as the query variable
    if (query === '') { // if the input is currently an empty string (this happens when the user deletes characters in their input)
        suggestions.innerHTML = '';   // hide the suggestions
        suggestions_box.removeAttribute("id"); // remove the transition id of the suggestions box, activating the disappear transition
    } else {    // if the input is not empty
        let results = filterResults(query); // take the user input (as it currently is) and then filter that in the database. Return the database filtered by the user's input (query)
        displayResults(results);    // call the function to display the results
    }
});

// event listener to close search results when clicking outside the input and the results
document.addEventListener('click', (event) => { // if there is some click event
    let isClickInsideInput = event.target === answer;  // check if the user clicked on the input field box. In other words, check if target is the input field box
    let isClickInsideResults = suggestions.contains(event.target);    // check if the user clicked on one of the suggestions. In other words, check if the suggestions contains the target
    if (!isClickInsideInput && !isClickInsideResults) { // if the user didn't click on input field box nor on one of the suggestions
        suggestions.innerHTML = '';   // hide the suggestions
        suggestions_box.removeAttribute("id"); // remove the transition id of the suggestions box, activating the disappear transition
    }
});

// --------------------------------------------------------------------------------

/* when the user hovers on the button, add the #appear id as the element's id
the #appear class in CSS simply does 'opacity: 1;' */
function enableCaption (evnt) {
    if (listCaptionIsActivated == false) {
        console.log("List is hovered! Enable caption.", "isActivated: ", listCaptionIsActivated);
    } else {
        console.log("List is unhovered! Disable caption.", "isActivated: ", listCaptionIsActivated);
    }
    //document.getElementById("quiz__cog--dropdown").classList.toggle("show");    // add the .show class to the element's classList
    //document.getElementsByClassName("quiz__cog--dropdown")[0].classList.toggle("show");    // add the .show class to the element's classList
    // test = document.getElementsByClassName("quiz__cog--dropdown");
    // for (var i = 0; i < test.length; ++i) {
    //     console.log("i = ", i, test[i]);
    //     console.log(test[i].className);
    // }
    // test[0].classList.toggle("show");
    // console.log(test[0]);
    // console.log(test[0].className);

    console.log(evnt.target);
    console.log(evnt.target.matches(".fas.fa-list"));

    if (evnt.target.matches(".fas.fa-list") && listCaptionIsActivated == false) { /* if the mouse hovers over the button */
        console.log("Only button is hovered.");
        document.getElementsByClassName("quiz__list__btn--caption")[0].setAttribute("id", "appear");    // add the #appear id to the element's classList, overriding .quiz__list__btn--caption class
        listCaptionIsActivated = true;  // caption is now activated, set bool to true
        test = document.getElementsByClassName("quiz__list__btn--caption");
        console.log(test[0]);
    } else if (evnt.target.matches("#quiz__list--btn") && listCaptionIsActivated == true) {   /* if the cursor unhovers the button */
        console.log("Only button is hovered.");
        caption = document.getElementsByClassName("quiz__list__btn--caption")[0];  // reference the caption container
        caption.removeAttribute("id");  // remove the #appear id from dropdown element
        listCaptionIsActivated = false;  // caption is now deactivated, set bool to false
        test = document.getElementsByClassName("quiz__list__btn--caption");
        console.log(test[0]);
    }
}

/* TODO (FIXED!): MAKE THE POPUP APPEAR */
/* when the user clicks on the button, add the .show class to the element's classList
the .show class in CSS simply does 'display: block;' */
function enableListPopup () {
    console.log("Cog is clicked! Enable dropdown.");
    //document.getElementById("quiz__cog--dropdown").classList.toggle("show");    // add the .show class to the element's classList
    //document.getElementsByClassName("quiz__cog--dropdown")[0].classList.toggle("show");    // add the .show class to the element's classList
    // test = document.getElementsByClassName("quiz__cog--dropdown");
    // for (var i = 0; i < test.length; ++i) {
    //     console.log("i = ", i, test[i]);
    //     console.log(test[i].className);
    // }
    // test[0].classList.toggle("show");
    // console.log(test[0]);
    // console.log(test[0].className);

    if (cogDropdownIsActivated == false) {
        document.getElementsByClassName("quiz__cog--dropdown")[0].setAttribute("id", "show");    // add the #show id to the element's classList, overriding .quiz__cog--dropdown class
        cogDropdownIsActivated = true;  // dropdown is now activated, set bool to true
        test = document.getElementsByClassName("quiz__cog--dropdown");
        console.log(test[0]);
    } else if (cogDropdownIsActivated == true) {
        dropDown = document.getElementsByClassName("quiz__cog--dropdown")[0];  // reference the dropdown menu container
        dropDown.removeAttribute("id");  // remove the #show id from dropdown element
        cogDropdownIsActivated = false;  // dropdown is now deactivated, set bool to false
        test = document.getElementsByClassName("quiz__cog--dropdown");
        console.log(test[0]);
    }
}

/* when the user hovers on the button, add the #appear id as the element's id
the #appear class in CSS simply does 'opacity: 1;' */
function enableBarsCaption (evnt) {
    if (barsCaptionIsActivated == false) {
        console.log("Bar is hovered! Enable caption.", "isActivated: ", barsCaptionIsActivated);
    } else {
        console.log("Bar is unhovered! Disable caption.", "isActivated: ", barsCaptionIsActivated);
    }
    //document.getElementById("quiz__cog--dropdown").classList.toggle("show");    // add the .show class to the element's classList
    //document.getElementsByClassName("quiz__cog--dropdown")[0].classList.toggle("show");    // add the .show class to the element's classList
    // test = document.getElementsByClassName("quiz__cog--dropdown");
    // for (var i = 0; i < test.length; ++i) {
    //     console.log("i = ", i, test[i]);
    //     console.log(test[i].className);
    // }
    // test[0].classList.toggle("show");
    // console.log(test[0]);
    // console.log(test[0].className);

    console.log(evnt.target);
    console.log(evnt.target.matches(".fas.fa-bars"));

    if (evnt.target.matches(".fas.fa-bars") && barsCaptionIsActivated == false) { /* if the mouse hovers over the button */
        console.log("Only button is hovered.");
        document.getElementsByClassName("quiz__bars__btn--caption")[0].setAttribute("id", "appearbars");    // add the #appear id to the element's classList, overriding .quiz__list__btn--caption class
        barsCaptionIsActivated = true;  // caption is now activated, set bool to true
        test = document.getElementsByClassName("quiz__bars__btn--caption");
        console.log(test[0]);
    } else if (evnt.target.matches("#quiz__bars--btn") && barsCaptionIsActivated == true) {   /* if the cursor unhovers the button */
        console.log("Only button is hovered.");
        caption = document.getElementsByClassName("quiz__bars__btn--caption")[0];  // reference the caption container
        caption.removeAttribute("id");  // remove the #appear id from dropdown element
        barsCaptionIsActivated = false;  // caption is now deactivated, set bool to false
        test = document.getElementsByClassName("quiz__bars__btn--caption");
        console.log(test[0]);
    }
}

/* when the user clicks on the button, add the .show class to the element's classList
the .show class in CSS simply does 'display: block;' */
function enableDropdown () {
    console.log("Cog is clicked! Enable dropdown.");
    //document.getElementById("quiz__cog--dropdown").classList.toggle("show");    // add the .show class to the element's classList
    //document.getElementsByClassName("quiz__cog--dropdown")[0].classList.toggle("show");    // add the .show class to the element's classList
    // test = document.getElementsByClassName("quiz__cog--dropdown");
    // for (var i = 0; i < test.length; ++i) {
    //     console.log("i = ", i, test[i]);
    //     console.log(test[i].className);
    // }
    // test[0].classList.toggle("show");
    // console.log(test[0]);
    // console.log(test[0].className);

    if (cogDropdownIsActivated == false) {
        document.getElementsByClassName("quiz__cog--dropdown")[0].setAttribute("id", "show");    // add the #show id to the element's classList, overriding .quiz__cog--dropdown class
        cogDropdownIsActivated = true;  // dropdown is now activated, set bool to true
        test = document.getElementsByClassName("quiz__cog--dropdown");
        console.log(test[0]);
    } else if (cogDropdownIsActivated == true) {
        dropDown = document.getElementsByClassName("quiz__cog--dropdown")[0];  // reference the dropdown menu container
        dropDown.removeAttribute("id");  // remove the #show id from dropdown element
        cogDropdownIsActivated = false;  // dropdown is now deactivated, set bool to false
        test = document.getElementsByClassName("quiz__cog--dropdown");
        console.log(test[0]);
    }
}

// close the dropdown menu if the user clicks outside of it
/*window.onclick = function(event) {  // on some event where we get a mouse click input
    console.log("Onclick Event.");
    console.log("Target: ", event.target);
    if (event.target.matches(".fas.fa-cog") && cogDropdownIsActivated == true) {    // if the mouse click event's target is the cog button
        //then hide the dropdown menu
        console.log("Mouse on cog. Disable dropdown.");

        //dropDown = document.getElementById("quiz__cog--dropdown");  // REDACTED reference the dropdown menu container
        dropDown = document.getElementsByClassName("quiz__cog--dropdown")[0];  // reference the dropdown menu container
*/

        /* REDACTED if (dropDown.classList.contains("show")) {  // if the dropdown has the .show class, then it is currently appearing on screen
            dropDown.classList.remove("show");  // remove the .show class from dropdown element
        } */
/*
        if (dropDown.id == "show") {  // if the dropdown has the #show id, then it is currently appearing on screen
            console.log("ClassList contains id show. Remove show");
            dropDown.removeAttribute("id");  // remove the #show id from dropdown element
            cogDropdownIsActivated = false; // dropdown is now deactivated, set bool to false
        }
    }
}*/










/* Timer resource:
https://stackoverflow.com/questions/29971898/how-to-create-an-accurate-timer-in-javascript */
class Timer {
    constructor () {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
    }
  
    _getTimeElapsedSinceLastStart () {
        if (!this.startTime) {
            return 0;
        }
    
        return Date.now() - this.startTime;
    }
  
    start () {
        if (this.isRunning) {
            return console.error('Timer is already running');
        }

        this.isRunning = true;

        this.startTime = Date.now();
    }
  
    stop () {
        if (!this.isRunning) {
            return console.error('Timer is already stopped');
        }

        this.isRunning = false;

        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }
  
    reset () {
        this.overallTime = 0;

        if (this.isRunning) {
            this.startTime = Date.now();
            return;
        }

        this.startTime = 0;
    }
  
    getTime () {
        if (!this.startTime) {
            return 0;
        }

        if (this.isRunning) {
            return this.overallTime + this._getTimeElapsedSinceLastStart();
        }

        return this.overallTime;
    }
}

var timeLimit = 2; // this is the amount of time for the user to guess the answer (specified by user)
var timeLeft = 0;
const timer = new Timer();
timer.start();
setInterval(() => {   // call this function repeatedly at a specified interval
    //console.log("TIMER (ms): ", timer._getTimeElapsedSinceLastStart()); DELETE
    var timeInSeconds = Math.round(timer.getTime() / 1000);
    timeLeft = timeLimit - timeInSeconds;

    if (timeLeft >= 0) { // as long as the player has time left
        if (video.id != "disappear") {   // if the video doesn't have 'disappear' id, aka is not hidden
            video.setAttribute("id", "disappear");  // then hide the video
        }
        document.getElementById("timer").innerText = timeLeft;  // keep displaying timer
    } else {    // if the player ran out of time
        // if (video.id != "disappear") {   // if the video doesn't have 'disappear' id, aka is not hidden
        //     video.setAttribute("id", "disappear");  // then hide the video
        // }
        // document.getElementById("timer").innerText = "Answers"; // start showing answers

        // timeInSeconds = 0;  // restart the elapsed time and use it temporarily for a review answers and video buffer period
        // timer.start();  // restart the starting time
        // //review answers, buffer video time period
        // if (timeInSeconds >= 5) {    // after reviewing answers for 5s
        //     console.log("Review over...");
        // }
        buffer();
    }
}, 100)   // execute function every 100 ms

function buffer() { // review answers
    // console.log("Reviewing answers...");
    if (timerText.innerText != "Answers") {
        console.log("Not answers.");
        timerText.innerText = "Answers"; // start showing answers
    
        if (video.id != "disappear") {   // if the video doesn't have 'disappear' id, aka is not hidden
            console.log("Disappear video.");
            video.setAttribute("id", "disappear");  // then hide the video
        }

        setTimeout(play, 5000); // call the play function after 5s
    }
}

function play() {   // function for reactivating the video and playing it
    video.removeAttribute("id", "disappear");   // hide the video
    video.play();   // play the video
    timerText.setAttribute("id", "disappear");  // instead of doing 'visibility: hidden', just change opacity because apparently the innerText element gets affected if you change visibility

    $.ajax({    // $.ajax sends requests to the server in the background, allowing the browser to continue processing other tasks without blocking
        /* url: The URL of the server-side script to request.
        type: The request method (e.g., GET, POST, PUT, DELETE).
        data: The data to be sent to the server (e.g., JSON, form data).
        success: A callback function to handle the response data when the request is successful.
        error: A callback function to handle errors or failures. */
        url: 'quiz-game.php', // the php file
        type: 'GET', // type of the HTTP request (we are only pulling from database, so don't need to do HTTP POST method)
        success: function(data) {   // if successful
            // process the response data
            //TODO: DO STUFF HERE
            var obj = jQuery.parseJSON(data);
            console.log("DATABASE OBJ:", obj);
            console.log("Song 1:", obj[0]); // returns the song's full array
            console.log("Song 1 Name:", obj[0][1]); // returns the song's name

            console.log("PLAYER ANSWER:", playerAnswers[0]);
            console.log("REAL ANSWER:", obj[0][3]);
    
            // Check each player's answer
            for (var i = 0; i < numPlayers; ++i) {  // for each player answer
                //TODO: DO NOT JUST CHECK THE FIRST SONG IN THE ARRAY. HAVE A CURRENT INDEX VARIABLE FOR THE SONG THAT WE ARE CURRENTLY ON IN THE SONG SET
                if (playerAnswers[i] == obj[0][3]) {    // if the player's answer matches the answer
                    console.log("Current player", i, "score:", playerScores[i]);
                    ++playerScores[i];    // increment the player's score
                    //TODO: HAVE EACH PLAYER HAVE THEIR OWN TEXT. CURRENTLY THERE IS ONLY ONE TEXT WITH CLASS '.quiz__user--nametag--score'
                    document.getElementsByClassName("quiz__user--nametag--score")[0].innerHTML = String(playerScores[i]); // update the player score text
                    console.log("Updated player", i, "score:", playerScores[i]);
                }
            }
        }
    });
}

//once video stops playing, go to a new round
video.addEventListener("ended",
    () => {
        console.log("Video finished.");
        reset();    // once the video is done playing, reset the round
    }
);

function reset() {  // a function for resetting the round. used for transitioning after time run out or vote skip current song
    console.log("Resetting round...");
    timer.stop();   // must stop timer or it errors
    timer.reset();  // then reset
    timer.start();  // start new

    // timerText.removeAttribute("id", "disappear");   // DELETE, NOT NECESSARY. restore the text
    timerText.setAttribute("id", "timer");  // restore the text

    //select a new song from the current quiz session set
    //TODO: SELECT THE NEW SONG FROM THE CURRENT QUIZ SESSION SET

    //TODO: REVISE THIS TEXT CHANGE CODE
    $.ajax({    // $.ajax sends requests to the server in the background, allowing the browser to continue processing other tasks without blocking
        /* url: The URL of the server-side script to request.
        type: The request method (e.g., GET, POST, PUT, DELETE).
        data: The data to be sent to the server (e.g., JSON, form data).
        success: A callback function to handle the response data when the request is successful.
        error: A callback function to handle errors or failures. */
        url: 'quiz-game.php', // the php file
        type: 'GET', // type of the HTTP request (we are only pulling from database, so don't need to do HTTP POST method)
        success: function(data) {   // if successful
            // process the response data
            //TODO: DO STUFF HERE
            var obj = jQuery.parseJSON(data);
            console.log("DATABASE OBJ:", obj);
            console.log("Song 1:", obj[0]); // returns the song's full array
            console.log("Song 1 Name:", obj[0][1]); // returns the song's name

            document.getElementsByClassName("quiz__song__name")[0].innerText = obj[0][1];
            document.getElementsByClassName("quiz__song__artist")[0].innerText = obj[0][5];
            document.getElementsByClassName("quiz__song__type")[0].innerText = obj[0][9];
        }
    });
}

// --------------------------------------------------------------------------------
/* database portion, changing text and everything, pulling from database
Pulling from database resource:
https://stackoverflow.com/questions/35451450/how-to-fetch-data-from-mysql-database-in-javascript-to-build-a-chart */
//-- $.ajax({    // $.ajax sends requests to the server in the background, allowing the browser to continue processing other tasks without blocking
//--     /* url: The URL of the server-side script to request.
//--     type: The request method (e.g., GET, POST, PUT, DELETE).
//--     data: The data to be sent to the server (e.g., JSON, form data).
//--     success: A callback function to handle the response data when the request is successful.
//--     error: A callback function to handle errors or failures. */
//--     url: 'quiz-game.php', // the php file
//--     type: 'GET', // type of the HTTP request (we are only pulling from database, so don't need to do HTTP POST method)
//--     success: function(data) {   // if successful
//--         // process the response data
//--         //TODO: DO STUFF HERE
//--         var obj = jQuery.parseJSON(data);
//--         console.log("DATABASE OBJ:", obj);
//--         console.log("Song 1:", obj[0]); // returns the song's full array
//--         console.log("Song 1 Name:", obj[0][1]); // returns the song's name

//--         document.getElementsByClassName("quiz__song__name")[0].innerText = obj[0][1];
//--         document.getElementsByClassName("quiz__song__artist")[0].innerText = obj[0][5];
//--         document.getElementsByClassName("quiz__song__type")[0].innerText = obj[0][9];
//--     }
//-- });

/* Changing website content dynamically depending on MySQL database value
Resource:
https://stackoverflow.com/questions/16623125/changing-website-content-dynamically-depending-on-mysql-database-value */