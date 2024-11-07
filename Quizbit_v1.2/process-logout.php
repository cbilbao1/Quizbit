<?php
/* 10/24/24
process logout */

session_start();    // start session

session_destroy();  // destroy the session

header("Location: login.html"); // redirect back to the login page
exit;   // remember, exit is not required but is always good practice after a header