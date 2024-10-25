<?php
/* 10/23/24
we need this because we are going to be accessing the database from different places
so this file will contain the database connection code */

//Create variables for the connection details for the database */
$host = "localhost";    // the host is the same as the webserver (localhost)
$dbname = "login_db";   // the name of the database. should match database name in MySQL
//NOTE: WHEN CONNECTING WITH THE ROOT ACCOUNT LIKE THIS, ONLY DO THIS LOCALLY
$username = "root"; // we will connect via the root account. by default the password is blank
$password = "";

/* To connect to the database, need mysqli object
the mysqli() constructor takes in a host username, password, and database name
it is a common error to put arguments out of order, so to remedy this,
you can specify named arguments by prefixing the value with the name of the argument
ex: new mysqli(hostname: $host,
                username: $username,
                password: $password,
                database: $dbname) */
$mysqli = new mysqli(hostname: $host,
                        username: $username,
                        password: $password,
                        database: $dbname);

//Make sure that we connected okay
/* the connect_errno property of the mysqli object is set to an error code of the most
recent connection attempt. if there was no error, then the value is 0.
the connect_error propery gives a description of the error */
if ($mysqli->connect_errno) {   // if the value is true, there was a connection error
    die ("Connection error: " . $mysqli->connect_error);
}

return $mysqli;