<?php
/* 10/21/24
resource on PHP/MySQL: https://www.youtube.com/watch?v=5L9UhOnuos0 */

//Step 1: Validate the name
/* NOTE:
THIS VALIDATION IS ONLY FOR THE UNLIKELY EVENT THAT THE
CLIENT-SIDE VALIDATION IS BYPASSED, SO IT DOESN'T NEED
TO BE MORE THAN THIS */
// if the name element of the post array is empty, stop the script with a suitable message
if (empty($_POST["input__username"])) {
    die("Name is required");
}

//Step 2: Validate the email address
//TODO: THIS IS FOR ACCOUNT CREATION PAGE. ADD AN ACCOUNT CREATION PAGE
/* filter_var($_POST["email"], FILTER_VALIDATE_EMAIL);
use the filter_var() function with the email validation filter
this returns false if the value passed in isn't a valid email address */
// if (!filter_var($_POST["input__email"], FILTER_VALIDATE_EMAIL)) {
//     die("Valid email is required"); // if the email field is invalid, output message
// }

//Step 3: Validate the password
if (strlen($_POST["input__password"]) < 8) {    // if the password field is less than 8 characters
    die("Password must be at least 8 characters");
}
//Next, check if password contains at least one letter/number
/* matches the value to this regular expression
matches any single, lower, or uppercase letter and returns false if it doesn't match
ex: $str = "Visit W3Schools";
$pattern = "/w3schools/i";
echo preg_match($pattern, $str) */
if (!preg_match("/[a-z]/i", $_POST["input__password"])) {   // if password doesn't have at least one letter
    die ("Password must contain at least one letter");
}
if (!preg_match("/[0-9]/i", $_POST["input__password"])) {   // if password doesn't have at least one number
    die ("Password must contain at least one number");
}
//Lastly, validate the password confirmation field
//TODO: THIS IS FOR ACCOUNT CREATION PAGE. ADD AN ACCOUNT CREATION PAGE
// if ($_POST["input__password"] == $_POST["input__password--confirmation"]) {
//     die("Passwords must match");
// }

//Step 4: Hash the password
/* we want to do this because in the event of a hacker accessing the information, we don't
want them to see people's registered passwords
use the password_hash() function, which returns the hash of the function as a string
password_hash(value_from_the_form, HASH_ALGORITHM)
in our example, the default password flag (PASSWORD_DEFAULT) should suffice for the HASH_ALGORITHM */
$password_hash = password_hash($_POST["input__password"], PASSWORD_DEFAULT); // hash the password and store it in a variable

//Step 5: Check connection with the database
/* require the database.php script
use the dir constant to get the directory of the current file.
as we put a return statement at the end of the database script, this will be what is returned
from the require statement.
in other words, remember that the database.php file returns the $mysqli object, so we can store it in a var */
$mysqli = require __DIR__ . "/database.php";    // retrieve the $mysqli object from the file by running the whole script
//NOTE: IF THERE IS AN ERROR WITH THE CONNECTION, THE SCRIPT OUTPUTS AN ERROR MESSAGE AND NOTHING IS RETURNED

//Step 6: Create a new record
/* Now that we've connected to the database, we can insert a new record into the user table
use a prepared statement for this to prevent an sql injection attack
use an sql INSERT INTO statement specifying the name, email, and password hash fields,
the id field is an auto increment field, so if we don't specify it, it will be inserted automatically
NOTE: IF WE ADD A TYPO, AS IN IF WE CHANGE "user" TO "users", THE DIE STATEMENTS BELOW WILL EXECUTE,
SINCE IN THE MySQL DATABASE, EACH ENTRY IS CALLED "user" AND NOT "users" */
$sql = "INSERT INTO user (input__username, input__email, password_hash)
        VALUES (?, ?, ?)";  // for the values, we'll use placeholders

$stmt = $mysqli->stmt_init();   // create a new prepared statement by calling the stmt_init() method

//If prepare method returns false, then there is a problem with the sql
if (!$stmt->prepare($sql)) {   // prepare the sql statement for execution by calling the $stmt object's preparing() method, passing the $sql string as an argument
    die("SQL error: " . $mysqli->error);    // the error property gives the error details
}
//At this point, any syntax erros in the sql will be caught

//At this point, the statement is ready to execute
//Step 7: Bind values to the placeholder characters
/* do this by calling the $stmt object's bind_param() method,
where the first argument is a string that contains characters that specify the types of the variables.
in our case, since all of our variables (input__username, input__email, password_hash) are strings, the argument is "sss", denoting three strings
the next arguments are the actual values of these strings */
$stmt->bind_param("sss",
                    $_POST["input__username"],
                    $_POST["input__email"],
                    $password_hash);

//Returns true if statement was successful, false otherwise
if ($stmt->execute()) {   // finally, execute the statement
    /* When there is a success you will see the "Signup Successful" message,
    but then if you refresh the page, you will get the email error.
    to avoid this, instead of echoing this message, redirect to another page entirely */
    // echo "Signup Successful";    // for testing purposes. outputs a success message

    //Redirect to another page
    header("Location: signup-success.html");    // use the header function to send a location header with the address of the signup success page file
    //TODO: CREATE THIS STRANGE SIGNUP SUCCESS PAGE
    exit;   // NOTE: GOOD PRACTICE IS TO EXIT THE SCRIPT AFTER REDIRECTING
} else {
    //NOTE: THE ERROR CODE FOR A DUPLICATE KEY ENTRY ERROR IS SPECIFICALLY 1062
    if ($mysqli->errno === 1062) {
        die("Email already taken");
    } else {    // all other errors
        die($mysqli->error . " " . $mysqli->errno); // also display the error code/number
    }
}

print_r($_POST); // prints the post superglobal. this is used for checking if the form submits correctly
//NOTE: the array keys are the values of the 'name' attributes of the inputs

var_dump($password_hash);   // gets rid of variable data. like deallocation