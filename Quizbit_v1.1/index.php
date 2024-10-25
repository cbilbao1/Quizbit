<?php
/* 10/24/23
shows if the user is logged in or not */

//Step 1: In order to use the session, call session_start()
session_start();    // either starts a new session or resumes an existing one

//Step 2: Once the session is started, store values in the superglobal, which persist across requests
// print_r($_SESSION);

//Step 2: Check for the user id value in the session array
// if (isset($_SESSION["user_id"])) {  // REDACTED if the user id is set
if (isset($user)) {  // if the user variable is set
    //Retrieve the user record from the database that corresponds to this id
    $mysqli = require __DIR__ . "/database.php";    // to get the connection, require the database script

    /* to select the user record, write the sql
    where the id equals the value in the session */
    $sql = "SELECT * FROM user
            WHERE id = {$_SESSION["user_id"]}";
    //NOTE: THIS VALUE ISN'T UNTRUSTED CONTENT SINCE THIS IS A VALUE WE SET IN THE SESSION OURSELVES, SO WE DON'T NEED TO ESPACE IT
    
    $result = $mysqli->query($sql); // run this using query(), passing in $sql. we get a result object. store it

    $user = $result->fetch_assoc();  // get the associative array containing the records values using fetch_assoc()
}

?>