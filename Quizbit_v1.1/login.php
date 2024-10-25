<!-- 10/17/24
 THE IS THE LOGIN PAGE -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">  <!-- Define the character encoding -->
    <!-- Specify the property to be changed, in this case it is the viewport
     Set the initial site settings based on device -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quizbit</title>  <!-- Define the title that shows up on the browser tab -->
    <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@400;700&display=swap" rel="stylesheet"/>    <!-- font family retrieved from Google embed link, referenced in CSS -->
    <!-- Good resource for icons: fontawesome.com
     currently using for the diamond logo of the site and all of the social media logos at the footer section -->
     <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc" crossorigin="anonymous"/>
     <link rel="stylesheet" href="styles.css"/>
     <script scr="/js/validation.js" defer></script>   <!-- DELETE? for custom JavaScript -->
</head>
<body>
    <!-- Layering (bottom to top): Section 1, Section 2, Footer -->
    <!-- Navbar Section -->
    <nav class="navbar">
        <div class="navbar__container">
            <div class="navbar__img--container">    <!-- Logo -->
                <!-- the 'alt' attribute is when an image fails to load,
                 where the alt text displays instead, providing a fallback description
                 give it an id because we will change its size for mobile devices -->
                <img src="images/logo.svg" alt="Quizbit logo" id="navbar__logo"/>
            </div>
            <ul class="navbar__menu">   <!-- Top menu -->
                <!-- <li class="navbar__item">
                    <a href="////" class="navbar__links">About Us</a>
                </li> -->
                <li class="navbar__item">
                    <a href="index.html" class="navbar__links">Home</a>
                </li>
                <li class="navbar__item">
                    <a href="////" class="navbar__links">About Us</a>
                </li>
                <li class="navbar__item">
                    <button class="navbar__btn"><a href="////">Play Now</a></button>    <!-- Leads to the login page -->
                </li>
                <!-- TODO: ADD MORE LINKS? -->
            </ul>
        </div>
    </nav>

    <!-- Login Section -->
     <div class="login">
        <div class="login__container">  <!-- only holds the login box -->
            <div class="login__content">
                <div class="login__text">
                    <h1>Login</h1>
                </div>
                
                <!-- 'action' attribute links to the .php script where the data will be sent when form is submitted -->
                 <!-- 'method' attribute with value 'post' is the method for saving data to a server -->
                  <!-- 'novalidate' attribute disables the HTML validation in the form
                   since we are using an email input type, the browser validates the email input as an email address.
                   to test the service-side validation, we need to disable this -->
                <form action="process-login.php" method="post" novalidate>  <!-- 'form' is a container for different kinds of input elements -->
                    <div class="login__cards">
                        <!-- displays text when there is an invalid login -->
                        <?php if ($is_invalid): ?>
                            <em>Invalid login</em>
                        <?php endif; ?>

                        <div class="login__cards--content">
                            <?php if (isset($_SESSION["user_id"])): ?>  <!-- if user id is set in the session-->
                                <p>You are logged in</p>    <!-- then output a message-->

                                <p><a href="logout.php">Log out</a></p> <!-- now that we are logged in, run .php and then display a Log out button -->
                            <?php else: ?>
                                <p><a href="login.html">Log in</a> or <a href="signup.html">Sign up</a></p>    <!-- else, display links to the login and signup pages-->
                            <?php endif; ?>

                            <!-- the 'for' attribute of a label should match the 'id' attribute of the input to bind them together -->
                            <!-- br specifies a line break. it requires no end tag because it is an empty, null element -->
                            <!-- the 'value' attribute specifies a text caption for the input field -->
                            <!-- a 'placeholder' attribute works like the 'value' attribute, but is used for text fields -->
                            
                            <!-- we add the value attribute with its php code because when we submit the form with a valid email but invalid password,
                             the email field becomes blank after the form is refereshed. for good UX, save the email in the field when the form is refreshed -->
                            <!-- ?? is a null coalescing operator, we use this to default the $_POST["email"] to be an empty string -->
                            <!-- we need to escape $_POST["email"] with htmlspecialchars() since this is untrusted content-->
                            <label for="input__email">Email</label><br>
                            <input type="email" id="input__email" name="input__email" placeholder="Email"
                                    value="<?= htmlspecialchars($_POST["email"]) ?? "" ?>"></input><br>   <!-- single text input box -->
                            <!--<input type="checkbox" id="input__checkbox" name="input__checkbox"></input> REDACTED-->  <!-- checkbox -->
                            <!--<label for="input__checkbox">Stay signed in</label> REDACTED-->
                        </div>
                        <div class="login__cards--content">
                            <!-- the 'for' attribute of a label should match the 'id' attribute of the input to bind them together -->
                            <!-- br specifies a line break. it requires no end tag because it is an empty, null element -->
                            <!-- the 'value' attribute specifies a text caption for the input field -->
                            <!-- a 'placeholder' attribute works like the 'value' attribute, but is used for text fields -->
                            <label for="input__username">Username</label><br>
                            <input type="text" id="input__username" name="input__username" placeholder="Username"></input><br>   <!-- single text input box -->
                            <!--<input type="checkbox" id="input__checkbox" name="input__checkbox"></input> REDACTED-->  <!-- checkbox -->
                            <!--<label for="input__checkbox">Stay signed in</label> REDACTED-->
                        </div>
                        <div class="login__cards--content">
                            <!-- the 'for' attribute of a label should match the 'id' attribute of the input to bind them together -->
                            <!-- br specifies a line break. it requires no end tag because it is an empty, null element -->
                            <!-- the 'value' attribute specifies a text caption for the input field -->
                            <!-- a 'placeholder' attribute works like the 'value' attribute, but is used for text fields -->
                            <label for="input__password">Password</label><br>
                            <input type="text" id="input__password" name="input__password" placeholder="Password"></input><br>   <!-- single text input box -->
                            <!--<input type="submit" value="Login" class="submit__btn"></input> REDACTED-->  <!-- button for submitting the form -->
                        </div>
                    </div>

                    <!-- THIS CHANGE WAS DONE TO FIX POSITIONING OF THE "LOGIN" BUTTON TO HAVE ITS TOP ALIGNED WITH "STAY SIGNED IN" CHECKBOX,
                    BUT NOW THE "STAY SIGNED IN" CHECKBOX IS NOT ALIGNED WITH USERNAME TEXT FIELD -->
                    <div class="login__cards">
                        <div class="login__cards--content">
                            <div class="checkbox__container">
                                <!-- the 'for' attribute of a label should match the 'id' attribute of the input to bind them together -->
                                <!-- br specifies a line break. it requires no end tag because it is an empty, null element -->
                                <!-- the 'value' attribute specifies a text caption for the input field -->
                                <!-- a 'placeholder' attribute works like the 'value' attribute, but is used for text fields -->
                                <input type="checkbox" id="input__checkbox" name="input__checkbox"></input>  <!-- checkbox -->
                                <label for="input__checkbox">Stay signed in</label>
                            </div>
                        </div>
                        <div class="login__cards--content">
                            <!-- the 'for' attribute of a label should match the 'id' attribute of the input to bind them together -->
                            <!-- br specifies a line break. it requires no end tag because it is an empty, null element -->
                            <!-- the 'value' attribute specifies a text caption for the input field -->
                            <!-- a 'placeholder' attribute works like the 'value' attribute, but is used for text fields -->
                            <input type="submit" value="Login" class="submit__btn"></input>  <!-- button for submitting the form -->
                        </div>
                    </div>
                </form>

                <div class="login__text">
                    <h2>Need help recovering your account?</h1>
                </div>
                <div class="login__forgot--container"> <!-- for recovering an account. takes you to another page -->
                    <button class="hud__btn">Forgot password</button>
                    <button class="hud__btn">Forgot username</button>
                </div>
                
                <div class="login__text">
                    <h2>Don't have an account?</h2>
                </div>
                <div class="login__create--container"> <!-- for creating an account. takes you to another page -->
                    <button class="hud__btn">Create Account</button>
                    <!-- <img src="images/main_ani1.png" alt="Anime girl 1" class="login__img"> DELETE -->
                </div>

                <div class="login__links">
                    <!-- Courtesy of fontawesome, references social logos -->
                     <div class="login__links--border">
                        <div class="icon__shift">
                            <a href="////" class="social__icon--link" target="_blank">
                                <!-- shortcut this line with "i.fab.fa-youtube" then press TAB -->
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                     </div>
                     <div class="login__links--border">
                        <div class="icon__shift">
                            <a href="////"><i class="fab fa-facebook"></i></a>
                        </div>
                     </div>
                     <div class="login__links--border">
                        <div class="icon__shift">
                            <a href="////"><i class="fab fa-twitter"></i></a>
                        </div>
                     </div>
                     <div class="login__links--border">
                        <div class="icon__shift">
                            <a href="////"><i class="fab fa-discord"></i></a>
                        </div>
                     </div>
                </div>
            </div>
            
            <button class="main__btn"><p>Go Back To The Top</p></button>    <!-- This button simply takes you back to the top of the page -->
        </div>
     </div>

     <!-- Footer Section -->
      <div class="footer">
        <div class="footer__container">
            <div class="footer__links--container">  <!-- Links -->
                <div class="footer__links">
                    <h2>Contact</h2>
                    <a href="////">Mail</a>
                </div>
                <div class="footer__links" id="social">
                    <h2>Social</h2>
                    <!-- Courtesy of fontawesome, references social logos -->
                    <a href="////"><i class="fab fa-facebook"></i> Facebook</a>
                    <a href="////"><i class="fab fa-twitter"></i> Twitter</a>
                    <a href="////"><i class="fab fa-discord"></i> Discord</a>
                </div>
                <div class="footer__links">
                    <h2>Legal</h2>
                    <a href="////">Terms of Service</a>
                    <a href="////">Privacy Policy</a>
                </div>
            </div>
            <div class="copyright">    <!-- Site name and copyright -->
                <p>© Quizbit Games 2024. All rights reserved</p>
            </div>
        </div>
      </div>
</body>
</html>