/* 10/24/24
custom JavaScript for the Signup Page
this does a bunch of validation for input fields when creating an account (think of job application forms) */
/* NOTE: THIS CLIENT-SIDE VALIDATION DOESN'T REPLACE THE SERVER-SIDE VALIDATION
IT'S IMPORTANT TO ALWAYS HAVE SERVER-SIDE VALIDATION SINCE THE CLIENT-SIDE VALIDATION CAN BE BYPASSED */
//Resource on validation library: https://just-validate.dev/

const validation = new JustValidate("#signup"); // create a new JustValidate object. we are passing in the id selector 'signup' of the form

//Add validation rules for each field. do this with the addField() of the JustValidate object
/* the field selector is the first argument
the array of field rules is the second argument. it is an array of objects where we can specify one of the libraries built-in rules using the rule property. the name of the rule is the value */
//NOTE: ANY RULE SPECIFIED BY 'rule:' IS A BUILT-IN RULE OF JS. ANY RULE SPECIFIED BY 'validator' PROPERTY IS A CUSTOM RULE MADE BY CODER
//TODO: FOR ALL OF THE SCRIPTS, ADD A NAME FIELD FOR CREATE ACCOUNT (SIGNUP)
validation
    .addField("#input__username", [
        {
            rule: "required"   // this rule's value is its name itself. in this case, this rule is a "required" rule, which will display a message if a required field is not inputted when the form is submitted (think of job applications)
        }
    ])
    .addfield("#input__email", [
        {
            rule: "required"
        },
        {
            rule: "email"   // this rule ensures that the field is a valid email address
        },
        {
            validator: (value) => () => {
                /* make a request using fetch() to the script
                then add a value from the field from the form in the query string, making sure we URI-encode it, which returns a promise object
                call the promise object's then() function and pass in a function to pass the json response and return a JavaScript object. in turn this returns a promise object
                call the promise object's then() function and pass in a function to return the value of the .available property (which is true/false)
                finally, return the promise object from the custom validator function */
                return fetch("validate-email.php?email=" +
                encodeURIComponent(value))
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(json) {
                            return json.available;
                        });
            },
            errorMessage: "Email already taken"
        }
    ])
    .addField("#input__password", [
        {
            rule: "required"
        },
        {
            rule: "password"    // this rule requires the password to be at least 8 characters and contain at least one letter and at least one number
        }
    ])
    .addField("#password_confirmation", [ // remember, this is for account creation, the field which makes sure you typed in your desired password correctly a second time
        {
            validator: (value, fields) => { // creates a custom rule! this is a function that takes in two arguments (the value of the input being validated and an array of the other fields in the form)
                //Compare the value of the field and the value of the password field
                return value === fields["#password"].elem.value; // the retyped password matches the first
                
            },
            errorMessage: "Passwords should match"  // 'errorMessage' is a built-in rule that creates a custom error message when this field is invalid    
        }
    ])
    /* NOTE: SINCE THE VALIDATION LIBRARY PREVENTS THE DEFAULT BEHAVIOR OF THE BUTTON SUBMITTING THE FORM, WE HAVE TO MANUALLY SUBMIT THE FORM OURSELVES IN CODE
    WE DO THIS WITH onSuccess()
    onSuccess() takes in a callback function */
    .onSuccess((event) => { // in this custom function
        document.getElementById("signup").submit();  //  we'll get the form element and call the submit method on it
    });