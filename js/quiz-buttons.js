/* 11/13/24
custom JavaScript for the right side navbar buttons on the Quiz Page */

var numPlayers = 1; //TODO: numPlayers should correspond to the amount of players in the lobby
var playerAnswers = Array(numPlayers).fill(""); // all players start with empty answer
var playerScores = Array(numPlayers).fill(0);   // each player starts with no score
var playerHasAnswered = Array(numPlayers).fill(false);  // all players start with no answers

//Reference each element by id
var answerTitle = document.getElementsByClassName("quiz__media--title")[0]; // the box that displays the answer during review phase. (WARNING, DUPLICATE OF "output")

//var video = document.getElementById("quiz__media--player");
var video = document.getElementsByClassName("quiz__media--player")[0];

var inputField = document.getElementById("input__answer");  // (DELETE WARNING, DUPLICATE OF "answer")

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

// --------------------------------------------------------------------------------
// //CHOOSE SONG WORKFLOW v1
// //TODO: STEP 1: read the user's list of anime. store each anime's name as a string into an array
// var session_valid_list = Array(4);    //TODO: generate the valid session list. atm, I am just hardcoding it
// session_valid_list[0] = "The Executioner and Her Way of Life";
// session_valid_list[1] = "My Hero Academia S1";
// session_valid_list[2] = "Steins;Gate";
// session_valid_list[3] = "Wotakoi: Love is Hard for Otaku";

// //TODO: STEP 2: map the anime name to its corresponding index from anime_db.
// //STEP 2a) set up the dictionary. NOTE: SETTING UP THE DICTIONARY IS MEANT TO BE HARD CODED
// var dict = new Map();   // use the Map object
// dict.set(''); // Map.set('key', 'value'); binds a value to the specified key for the map
// dict.set("The Executioner and Her Way of Life", 0);
// dict.set("My Hero Academia S1", 1);
// dict.set("Steins;Gate", 2);
// dict.set("Wotakoi: Love is Hard for Otaku", 3);
// //STEP 2b) using the dictionary, map the anime name to an index
// var session_valid_indeces = Array(4); // an array of indeces corresponding to a record in the database
// console.log("Session valid indeces:", session_valid_indeces);
// for (var i = 0; i < session_valid_list.length; ++i) {
//     session_valid_indeces[i] = dict.get(session_valid_list[i]); // search using key string from session_list, receive an integer denoting the corresponding index for that record
//     console.log("Record key:", session_valid_list[i], ", matching value:", session_valid_indeces[i]);
// }

// //TODO: STEP 3: randomly select songs. we will keep track of our choices using tuples (anime_name, song_type, song_number)
// //create a set of tuples, denoting all of the combinations of anime_name-song_type-song_number combos selected thus far
// var session_selection_set = new Set();
// console.log("Session set:", session_selection_set);
// console.log("Session set length:", session_selection_set.size);
// var session_song_length = 4; // TODO: SET THIS VARIABLE IN THE SETTINGS PAGE
// var LOOP_THRESHOLD = 0;   //DELETE THIS IS TO PREVENT INFI LOOP. ONLY RUN LOOP 100 TIMES
// while (session_selection_set.size < session_song_length && LOOP_THRESHOLD <= 100) {  // keep adding songs to the list until we reach the max amount of songs specified for the session
//     console.log("Session set:", session_selection_set);
//     console.log("Session set length:", session_selection_set.size);
//     var curr_song_tuple = "0_0_0";    // the current tuple (as string) separated by '_' that we have randomly generated denoting the address to the song using (anime_name, song_type, song_number)
//     //Random Number Formula: Math.floor(Math.random() * (max - min) ) + min
//     var random_record = Math.floor(Math.random() * session_valid_indeces.length);
//     console.log("session_valid_indeces", session_valid_indeces);
//     console.log("random_record", random_record);
//     var random_type = Math.floor(Math.random() * 2);    // only choose between two numbers: 0 for OP and 1 for ED
//     var random_item = Math.floor(Math.random());  // TODO: ACCOMODATE HAVING MULTIPLE OPENINGS/ENDINGS. ATM WE ARE ONLY CHOOSING THE FIRST OPENING/ENDING IN THE FOLDER
//     curr_song_tuple = String(random_record) + "_" + String(random_type) + "_" + String(random_item); // put all of the integers together into a string, this creates a unique string as an id for the path of the song
//     console.log("Current song tuple:", curr_song_tuple);
//     if (!(curr_song_tuple in session_selection_set)) {  // if the current song path has not been visited..
//         //then add the song to the selection set
//         console.log("THIS TUPLE NOT FOUND IN VISITED!:", curr_song_tuple, "ADD TUPLE TO SESSION SET.");
//         session_selection_set.add(curr_song_tuple); // add to selection set
//     }   // else, continue


//     LOOP_THRESHOLD += 1;    // DELETE THIS IS TO PREVENT INFI LOOP. ONLY RUN LOOP 100 TIMES
// }

// DELETE ALL $.ajax({    // $.ajax sends requests to the server in the background, allowing the browser to continue processing other tasks without blocking
//     /* url: The URL of the server-side script to request.
//     type: The request method (e.g., GET, POST, PUT, DELETE).
//     data: The data to be sent to the server (e.g., JSON, form data).
//     success: A callback function to handle the response data when the request is successful.
//     error: A callback function to handle errors or failures. */
//     url: 'quiz-game.php', // the php file
//     type: 'GET', // type of the HTTP request (we are only pulling from database, so don't need to do HTTP POST method)
//     success: function(data) {   // if successful
//         // process the response data
//         //TODO: DO STUFF HERE
//         var obj = jQuery.parseJSON(data);
//         console.log("DATABASE OBJ:", obj);
//         console.log("Song 1:", obj[0]); // returns the song's full array
//         console.log("Song 1 Name:", obj[0][1]); // returns the song's name

//         //NOTE:
//         //obj is the whole anime_db database object array (an array of arrays, ie. an array of records)
//         //obj[i] is the ith record of the database
//         //obj[i][3] is the ith record's 4th field (namely song anime name)

//         obj.forEach(item => {   // For each song in the database, where 'item' is the specific song's
//                             console.log("SONG OBJ:", item); // returns the song's full array
//                             console.log("Song Anime Name:", item[3]); // returns the song's anime name
//                             searchData.push(item[3]);  // add the anime name to the database array
//                         });
//     }
// });

//WORKFLOW ARRAY
//1. POPULATE THE SESSION ARRAY NORMALLY (THE COPY ARRAY) FULL OF RECORDS (SINCE WE CAN ACCESS EVERYTHING FROM THE RECORDS)
//2. AS THE GAME IS GOING, RANDOMLY SELECT ?

// --------------------------------------------------------------------------------
//CHOOSE SONG WORKFLOW v2
//TODO: STEP 1: read the user's list of anime. store each anime's name as a string into an array
console.log("STEP 1--------------------------------------------------------------------------------");
var session_valid_list = Array(4);    //TODO: generate the valid session list. atm, I am just hardcoding it
session_valid_list[0] = "The Executioner and Her Way of Life";
session_valid_list[1] = "My Hero Academia S1";
session_valid_list[2] = "Steins;Gate";
session_valid_list[3] = "Wotakoi: Love is Hard for Otaku";

//TODO: STEP 2: map the anime name to its corresponding index from anime_db.
console.log("STEP 2--------------------------------------------------------------------------------");
//STEP 2a) set up the dictionary. NOTE: SETTING UP THE DICTIONARY IS MEANT TO BE HARD CODED
var dict = new Map();   // use the Map object
dict.set(''); // Map.set('key', 'value'); binds a value to the specified key for the map
dict.set("The Executioner and Her Way of Life", [0, 1]);
dict.set("My Hero Academia S1", [2, 3]);
dict.set("Steins;Gate", [4, 5]);
dict.set("Wotakoi: Love is Hard for Otaku", [6, 7]);
//STEP 2b) using the dictionary, map the anime name to an index
var session_valid_indeces = Array(4); // an array of indeces corresponding to a record in the database
console.log("Session valid indeces BEFORE:", session_valid_indeces);
for (var i = 0; i < session_valid_list.length; ++i) {   // for each record
    // for (var j = 0; j < session_valid_list[i].length; ++j) {    //
    session_valid_indeces[i] = dict.get(session_valid_list[i]); // search using key string from session_list, receive an integer denoting the corresponding index for that record
    console.log("Record key:", session_valid_list[i], ", matching value:", session_valid_indeces[i]);
}
console.log("Session valid indeces AFTER:", session_valid_indeces);

//At this point, session_valid_indeces is an array. Each element in the array could also be an array since the,
//ie. session_valid_indeces[i] is the ith record
//and session_valid_indeces[i][j] is the jth possible index associated with this ith anime name (ith record)
session_valid_indeces = session_valid_indeces.flat();   // flatten the array
console.log("Session valid indeces FLAT:", session_valid_indeces);

//TODO: STEP 3: randomly select songs. we will keep track of our choices using tuples (anime_name, song_type, song_number)
console.log("STEP 3--------------------------------------------------------------------------------");
//create a set of tuples, denoting all of the combinations of anime_name-song_type-song_number combos selected thus far
var session_selection_set = new Set();  // set for storing the actual records (but more succinctly, each record's index)
var visited_set = new Set();    // set for solely storing the tuple addresses during set generation
console.log("Session set:", session_selection_set);
console.log("Session set length:", session_selection_set.size);
var session_song_length = 4; // TODO: SET THIS VARIABLE IN THE SETTINGS PAGE
var LOOP_THRESHOLD = 0;   //DELETE THIS IS TO PREVENT INFI LOOP. ONLY RUN LOOP 100 TIMES
while (session_selection_set.size < session_song_length && LOOP_THRESHOLD <= 100) {  // keep adding songs to the list until we reach the max amount of songs specified for the session
    console.log("Session set:", session_selection_set);
    console.log("Session set length:", session_selection_set.size);
    var curr_song_tuple = "0_0_0";    // the current tuple (as string) separated by '_' that we have randomly generated denoting the address to the song using (anime_name, song_type, song_number)
    //Random Number Formula: Math.floor(Math.random() * (max - min) ) + min
    var random_record = Math.floor(Math.random() * session_valid_indeces.length);
    console.log("session_valid_indeces", session_valid_indeces);
    console.log("random_record", random_record);
    var random_type = Math.floor(Math.random() * 2);    // only choose between two numbers: 0 for OP and 1 for ED
    var random_item = Math.floor(Math.random());  // TODO: ACCOMODATE HAVING MULTIPLE OPENINGS/ENDINGS. ATM WE ARE ONLY CHOOSING THE FIRST OPENING/ENDING IN THE FOLDER
    curr_song_tuple = String(random_record) + "_" + String(random_type) + "_" + String(random_item); // put all of the integers together into a string, this creates a unique string as an id for the path of the song
    console.log("Current song tuple:", curr_song_tuple);
    if (!(curr_song_tuple in visited_set)) {  // if the current song path has not been visited..
        //then add the song to the selection set and visited set
        console.log("THIS TUPLE NOT FOUND IN VISITED!:", curr_song_tuple, "ADD TUPLE TO SESSION SET.");
        session_selection_set.add(random_record); // add the first integer of the tuple (denotes index of record in anime_db) to selection set
        visited_set.add(curr_song_tuple);   // add tuple to the visited set
    }   // else, continue


    LOOP_THRESHOLD += 1;    // DELETE THIS IS TO PREVENT INFI LOOP. ONLY RUN LOOP 100 TIMES
}

console.log("COMPLETED Session set:", session_selection_set);  // DELETE FOR TESTING ONLY

//TODO: STEP 4: STORE THE VALID RECORDS INTO THE ARRAY
console.log("STEP 4--------------------------------------------------------------------------------");
var session_records = Array(0);   // the song session array. basically the same as session_selection_set except instead of storing indeces, we cache the records themselves for easy reference at the cost of space
console.log("INITIAL SESSION RECORDS:", session_records); // DELETE FOR TESTING ONLY
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

        console.log("running AJAX");


        //NOTE:
        //obj is the whole anime_db database object array (an array of arrays, ie. an array of records)
        //obj[i] is the ith record of the database
        //obj[i][3] is the ith record's 4th field (namely song anime name)

        session_selection_set.forEach(index => {   // For each song in the database, where 'item' is the specific song's
                            console.log("Current Record:", obj[index]);
                            session_records.push(obj[index]);  // add the record to the song session array
                            console.log(" WHATAHSDASHO ASHIODASHIO ASHIOASHIO AHIOHIODASHIOHADSASHDASHADIOSHASDHIASHDASHIO");
                        });
        console.log("------------------------------COMPLETED SESSION RECORDS LENGTH:", session_records.length) ; // DELETE FOR TESTING ONLY
        console.log("------------------------------COMPLETED SESSION RECORDS:", session_records) ; // DELETE FOR TESTING ONLY
    }
});

console.log("COMPLETED SESSION RECORDS LENGTH:", session_records.length) ; // DELETE FOR TESTING ONLY
console.log("COMPLETED SESSION RECORDS:", session_records) ; // DELETE FOR TESTING ONLY

//WORKFLOW ARRAY
//1. POPULATE THE SESSION ARRAY NORMALLY (THE COPY ARRAY) FULL OF RECORDS (SINCE WE CAN ACCESS EVERYTHING FROM THE RECORDS)
//2. AS THE GAME IS GOING, RANDOMLY SELECT ?

// --------------------------------------------------------------------------------
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

let answer = document.getElementById('input__answer');  // the input text field (DELETE WARNING, DUPLICATE OF "inputField")
let suggestions = document.getElementById('input__suggestions');    // an unordered list element that holds all of the suggestions that matches similarly with the answer
let suggestions_box = document.getElementsByClassName("quiz__input__suggestions--box")[0];  // the box that holds all of the suggestions
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
//Functionality to make the popup draggable resource: https://m.youtube.com/watch?v=ymDjvycjgUM&pp=ygUcZHJhZ2dhYmxlIGVsZW1lbnQgamF2YXNjcmlwdA%3D%3D
var startX = 0, startY = 0; // variables for the starting position calculation
var newX = 0, newY = 0; // updated position calculation
var popup = document.getElementsByClassName("quiz__list__btn--popup")[0];   // reference the popup box
popup.addEventListener("mousedown", popupMouseDown);    // add an event listener for mouse click
function popupMouseDown(evnt) { // when the mouse is clicked (held) retrieve the current position of the mouse
    console.log("MOUSEDOWN POPUP");
    evnt.preventDefault(); //prevent highlighting elements while dragging the popup box. NOTE: NEEDS TO BE INCLUDED IN BOTH MOUSEDOWN AND MOUSEMOVE EVENTS

    startX = evnt.clientX;  // retrieve the cursor's x position
    startY = evnt.clientY;  // retrieve the cursor's y position

    document.addEventListener("mousemove", popupMouseMove);  // add an event listener for mouse movement
    document.addEventListener("mouseup", popupMouseUp); // add an event listener for mouse unclick
}
function popupMouseMove(evnt) {
    //Resource on preventing highlighting elements while dragging: https://stackoverflow.com/questions/5429827/how-can-i-prevent-text-element-selection-with-cursor-drag
    evnt.preventDefault(); //prevent highlighting elements while dragging the popup box. NOTE: NEEDS TO BE INCLUDED IN BOTH MOUSEDOWN AND MOUSEMOVE EVENTS

    newX = startX - evnt.clientX;   // calculate directional vector between current mouse position and previously stored mouse positon
    newY = startY - evnt.clientY;

    startX = evnt.clientX;  // store current mouse position for next update
    startY = evnt.clientY;

    //newX and newY in these formulas are acting as an offset position shift, shifting the box and creating a new position
    popup.style.top = (popup.offsetTop - newY) + 'px';    // you do + 'px' because the style.top and style.left properties have values like "200px"
    popup.style.left = (popup.offsetLeft - newX) + 'px';
}
function popupMouseUp (evnt) {
    console.log("MOUSEUP POPUP");
    document.removeEventListener("mousemove", popupMouseMove);  // once user unclicks, stop dragging square
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







/* Resource on dynamically changing font size based on text length:
https://stackoverflow.com/questions/18229230/dynamically-change-the-size-of-the-font-size-based-on-text-length */
const output = document.getElementsByClassName('quiz__media--title')[0];    // (WARNING, DUPLICATE OF "answerTitle")
const outputContainer = document.getElementsByClassName('quiz__cards--content--container')[0];
console.log("OUTPUT...", output);
console.log("OUTPUTCONTAINER...", outputContainer);

function resize_to_fit() {  // recursively iterate through decreasing font sizes until text fits in container
    console.log("RESIZING_TO_FIT...");
    console.log("OLD FONT SIZE:", output.style.fontSize);
    let fontSize = window.getComputedStyle(output).fontSize;  // take the font-size of the text
    console.log("FONT-SIZE VAR:", fontSize);
    console.log("ParseFloat:", (parseFloat(fontSize)));
    output.style.fontSize = (parseFloat(fontSize) - 1) + 'px';    // modify the font size of the text to be 1 less
    console.log("NEW FONT SIZE:", output.style.fontSize);

    console.log("OUTPUT H:", output.clientHeight, "OUTPUTCON H:", outputContainer.clientHeight / (output.innerHTML.length * 2))
    if (output.clientHeight >= outputContainer.clientHeight * 0.1) {  // if the text is still greater than the outer container
        resize_to_fit();    // recursively call the function
    }
}

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

//Initialize the answer text and song info
var question_number = 0;    // an index variable that keeps track of which question we are on (which index in the session song list we are on)
// console.log(" S E S S I O N _ Q U E S T I O N _ N U M:", session_records[question_number][1], "FOR QNUMBER:", question_number); // returns the song's name
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
        console.log("INITIALIZING VIDEO.");
        
        //I JUST WENT ON A WHOLE TANGENT JUST BECAUSE I DID THE FILE URL WRONG:
        
        //https://stackoverflow.com/questions/2148584/open-a-direct-file-on-the-hard-drive-from-firefox-file
        //https://stackoverflow.com/questions/39007243/cannot-open-local-file-chrome-not-allowed-to-load-local-resource
        //https://www.quora.com/What-is-a-solution-to-the-Not-Allowed-to-Load-Local-Resources-problem-in-PHP
        //https://stackoverflow.com/questions/30707729/how-to-setup-ftp-on-xampp
        //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
        //https://stackoverflow.com/questions/48580065/access-to-local-files-only-work-with-local-html-file
        //https://stackoverflow.com/questions/371875/local-file-access-with-javascript
        //(CHROME SPECIFIC WORKAROUND) https://stackoverflow.com/questions/4819060/allow-google-chrome-to-use-xmlhttprequest-to-load-a-url-from-a-local-file
        //(THE FILE API ALLOWS YOU TO ACCESS FILES AS LONG AS THEY HAVE BEEN UPLOADED ON THE BROWSER) https://www.w3.org/TR/FileAPI/
        //https://stackoverflow.com/questions/21622008/accessing-php-files-inside-our-own-created-folder-in-htdocs
        //TLDR; YOU ARE NOT ALLOWED TO ACCESS ARBITRARY LOCAL FILES USING ADDRESS SYNTAX "C:\ETC\ETC" BECAUSE BROWSERS THEMSELVES WANT TO PROTECT USERS FROM MALICIOUS SCRIPTS FROM ACCESSING FILES THROUGH THE WEB. THERE IS NO WORKAROUND FOR THIS SECURITY SANDBOXING EXCEPT ON CHROME THROUGH COMMAND LINE
        
        //(THE SOLUTION FOR EDGE) https://stackoverflow.com/questions/67346262/how-can-i-fix-not-allowed-to-load-local-resource-error-in-microsoft-edge-or-go
        //TLDR;
        //Don't enter full path of image..
        //Example: DO NOT ENTER LIKE THIS: C:\Users\A1\Desktop\vs\images\cloud.png
        //Enter LIKE THIS: iamges\cloud.png
        //Just ensure that your folder named images is inside your project folder
        
        video.src = session_records[question_number][7];    // initialize the first video to the first question's answer
    }
});
//RESOURCE ON AJAX ASYNC BEHAVIOR: https://stackoverflow.com/questions/29857639/jquery-ajax-success-firing-last
//REDACTED. THIS DOESN'T WORK BECAUSE THIS LINE GETS EXECUTED BEFORE ANY AJAX FUNCTION IS CALLED,
//IN WHICH ONE OF THE AJAX FUNCTIONS POPULATES THE session_records ARRAY.
//SO IF THE ARRAY IS NEVER POPULATED, AND THEN WE ACCESS IT HERE, IT RESULTS IN AN ERROR
//THE SOLUTION: put any code that you wish to run which relies on the ajax result in the success function, or in another function which you call from there
//video.src = session_records[question_number][7];    // initialize the first video to the first question's answer

document.getElementsByClassName("quiz__song__name")[0].innerText = "?";
document.getElementsByClassName("quiz__song__artist")[0].innerText = "?";
document.getElementsByClassName("quiz__song__type")[0].innerText = "?";

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
    inputField.setAttribute("disabled", true); // Prevent user from typing in answer. Disable the input field. Setting the "disabled" attribute to an empty string is equivalent to setting it to "true"
    //console.log("INPUT FIELD DISABLED?:", inputField.getAttribute("disabled"));

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

            //----answerTitle.innerHTML = obj[0][3];  // (FIXED!) TODO: DO NOT JUST CHECK FIRST SONG IN ARRAY. HAVE CURRENT INDEX VARIABLE
            answerTitle.innerHTML = session_records[question_number][3];
            answerTitle.style.fontSize = "100px";
            resize_to_fit();    // correct the title text size until it fits in the box
    
            // Check each player's answer
            for (var i = 0; i < numPlayers; ++i) {  // for each player answer
                //(FIXED!) TODO: DO NOT JUST CHECK THE FIRST SONG IN THE ARRAY. HAVE A CURRENT INDEX VARIABLE FOR THE SONG THAT WE ARE CURRENTLY ON IN THE SONG SET
                //----if (playerAnswers[i] == obj[0][3]) {    // if the player's answer matches the answer
                if (playerAnswers[i] == session_records[question_number][3]) {    // if the player's answer matches the answer
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

    //TODO: RESET ALL OF THE PLAYERS' CURRENT ANSWERS
    //TODO: RESET ALL OF THE PLAYERS' ANSWER TEXT'S CURRENT DISPLAY. MAKE TEXT DISAPPEAR

    //select a new song from the current quiz session set
    //(FIXED!) TODO: SELECT THE NEW SONG FROM THE CURRENT QUIZ SESSION SET
    question_number += 1;   // increment the question number, next round will have a new song. the session set is already randomized
    video.src = session_records[question_number][7]; // set the new song

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

            //(FIXED!) TODO: DO NOT JUST CHECK THE FIRST SONG IN THE ARRAY. HAVE A CURRENT INDEX VARIABLE FOR THE SONG THAT WE ARE CURRENTLY ON IN THE SONG SET
            //---- document.getElementsByClassName("quiz__song__name")[0].innerText = obj[0][1];
            //---- document.getElementsByClassName("quiz__song__artist")[0].innerText = obj[0][5];
            //---- document.getElementsByClassName("quiz__song__type")[0].innerText = obj[0][9];
            document.getElementsByClassName("quiz__song__name")[0].innerText = session_records[question_number][1];
            document.getElementsByClassName("quiz__song__artist")[0].innerText = session_records[question_number][5];
            document.getElementsByClassName("quiz__song__type")[0].innerText = session_records[question_number][9];
        }
    });

    /* NOTE: doing .setAttribute("disabled", true), .setAttribute("disabled", disabled), and .setAttribute("disabled", false) all do the same thing
    since if the disabled attribute is set for an element, the element will be disabled regardless of what the attribute's value is
    it is better to remove the complete attribute with "element.removeAttribute("disabled");" or set the property directly with 'element.disabled = false;' */
    inputField.removeAttribute("disabled"); // Allow the player to type in the input field again upon round reset
    answerTitle.innerHTML = "?";
    answerTitle.style.fontSize = "100px"; // NOTE: ".setAttribute" is inconsistent when applying changes to document, so use Element.style instead
    resize_to_fit();    // correct the title text size until it fits in the box
    console.log("ANSWER TITLE SIZE:", answerTitle.getAttribute("font-size"));
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