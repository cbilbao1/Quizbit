<?php
/* 10/24/24
check the user table to see if a record already exists with a given email address */

$mysqli = require __DIR__ . "/database.php";    // connect to database by requiring the database file

/* Select any records form the database
where the email is equal to a value that we'll pass in using the query string.
use sprintf() to insert the value from the query string into the sql making sure we esacpe it */
$sql = sprintf("SELECT * FROM user
                WHERE email = '%s'",
                $mysqli->real_escape_string($_GET["email"]));

$result = $mysqli->query($sql); // run using the query method

//See if the email exists. do this by checking the number of rows in result set. if it is 0, email address is available
$is_available = $result->num_rows === 0;

//Since we are making this request from JavaScript, we'll output this as .json
header("Content-Type: application/json");   // the json content type header

echo json_encode(["available" => $is_available]);   // output variable as json