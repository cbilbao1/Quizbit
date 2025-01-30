<?php
/* 10/23/24 */

$is_invalid = false;

//Step 1: Detect if the form has been submitted
/* do this with the request() method
NOTE: WHEN WE FIRST CLICK ON THE LINK TO OPEN THE PAGE, THE METHOD WILL BE GET()
NOTE: WHEN THE FORM IS SUBMITTED WITH THE BUTTON, THE METHOD WILL BE POST() */
if($_SERVER["REQUEST_METHOD" === "POST"]) {
    //Step 2: When the form is submitted, check if email and password entered into the form match one of the records in the database
    $mysqli = require __DIR__ . "/database.php";   // start by connecting to the database by requiring the database.php file

    //NOTE: ANY EMAIL USED IN A WHERE CLAUSE SHOULD HAVE AN IDEX AS WE DO IN THE EMAIL COLUMN
    //write the sql to select a record based on the email address
    /* NOTE: TO INSERT A VALUE FROM THE FORM, USE sprintf() FUNCTION,
    PUTTING A STRING PLACEHOLDER %s IN THE STRING WHERE WE WANT THE VALUE TO GO,
    AND PASSING IN THE VALUE FROM THE POST ARRAY AS THE SECOND ARGUMENT */
    $sql = sprintf("SELECT * FROM user
            WHERE email = '%s'",
            $mysqli->real_escape_string($_POST["email"]));   // NOTE: since the email is a string, and we already have an outer string, use single-quotes
    //Instead of having to use a prepare statement, just insert the value for the email directly into the sql
    /* IMPORTANT: TO AVOID AN SQL INJECTION ATTACK WE NEED TO ESCAPE THE VALUE COMING FROM THE FORM
    ex:
    instead of this: $_POST["email"];
    do: $mysqli->real_escape_string($_POST["email"]); */

    //Step 3: Execute this sql
    $result = $mysqli->query($sql);   // use the query() function to execute $sql, which returns a result object

    //Step 4: Get data from the result object
    $user = $result->fetch_assoc(); // call the fetch_assoc() method, which will return the record if one was found as an associative array (containing the data from that record)

    //Step 5: Check if user variable contains an array of data and isn't null
    if ($user) {
        //If a record was found for that email address then we can check the password
        /* NOTE: WE'RE GETTING THE PLAINTEXT PASSWORD FROM THE FORM, BUT THE VALUE STORED IN THE DATABASE IS THE PASSWORD_HASH.
        TO VERIFY THAT THE HASH MATCHES THE PLAINTEXT PASSWORD, USE password_verify().
        RETURNS TRUE IF THEY MATCH, FALSE OTHERWISE */
        if (password_verify($_POST["input__password"], $_POST["password_hash"])) {
            // die("Login successful");
            session_start();

            session_regenerate_id();
            
            /* Time to log the user in. Store the user id in a session
            Sessions are used to remember values between browser requests
            php does this automatically by generating and storing a unique session id in a browser cookie to uniquely identify a user */
            $_SESSION["user_id"] = $user["id"]; // store user id in session superglobal. by default, these values are stored in files in the server. best practice is to store just a small amount of information in the session
            
            header("Location: login.html"); // redirect to the login page
            exit;   // exit script
        }

    }

    //At this point in the script, the form has been submitted, where either the email or password was invalid
    $is_invalid = true; // Show a message telling the user that the login was invalid
    
    var_dump($user);    // print out the contents of the variable
    exit;   // exit the script
}