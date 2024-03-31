// main form
const userForm:any = document.getElementById('user_info_form');

// function that checks if the username is appropriate
function isUsernameAllowed(username:any) {
    // banned words to use as user name
    let banned_usernames = [
        'none',
        'nigger',
        'nigga',
        'kike',
        'cracker',
        'faggot',
        'incel',
    ];
    const lowerCaseUsername = username.toLowerCase();
    return !banned_usernames.some(bannedWord => lowerCaseUsername.includes(bannedWord.toLowerCase()));
};


// function that creates red border for wrong input
function highlight_error(element:any, message:string, inptValue:string) {
    // getting error message ID
    let mainErrorLabelID:string = `errorLabel_${inptValue}ID`
    let errorMessageID:any = document.getElementById(mainErrorLabelID); // is a p tag

    errorMessageID.style.display = 'block';
    errorMessageID.innerHTML = message;


    // making the red border
    element.style.border = '2px solid red';

    // For modern browsers
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // For Safari
    document.body.scrollTop = 0; // For Safari
};


// fucntion to check username
function check_username() {
    // getting username input value
    let usernameInput1:any = document.getElementById('user-username');
    let usernameInput_value:any = usernameInput1.value;

    // standard username 
    let currentName:any = document.getElementById('userID');
    let currentNameValue:any = currentName.value;


    const isAllowed = isUsernameAllowed(usernameInput_value);

    if (isAllowed) {
        if (currentNameValue == usernameInput_value) {
            return ['good', usernameInput_value]
        } 
        
        else if (usernameInput_value != '') {
            return ['good', usernameInput_value]
        } 
        
        else {
            highlight_error(usernameInput1, 'Error with username: Try again.', 'Username')
            return 'bad'
        }
    }
    else {
        highlight_error(usernameInput1, 'Username not allowed: Try again.', 'Username')
        return 'bad'
    }


};


// function to check email 
function check_email1() {
    // getting email input value
    let emailInput1:any = document.getElementById('user-email');
    let emailInput_value:any = emailInput1.value;

    let email_ends = [
        '@gmail.com',
        '@yahoo.com',
        '@hotmail.com',
        '@outlook.com',
        '@icloud.com',
        '@aol.com',
        '@live.com',
        '@mail.com',
        '@msn.com',
        '@protonmail.com',
        '@yandex.com',
        '@zoho.com',
    ];

    // Check if the emailInput_value ends with any domain from the email_ends array
    let isValid2 = email_ends.some(domain => emailInput_value.endsWith(domain));


    // needs to make sure var contains the end emails inside the array above
    if (isValid2) { 
        return ['good', emailInput_value]
    } else {
        highlight_error(emailInput1, 'Email address is not a valid address. Try again.', 'Email')
    }

};




// function to check gender 
function check_gender() {
    // getting gender selected option
    let genderSelecttionElement:any = document.getElementById('user-gender');
    let genderSelecttionValue:any = genderSelecttionElement.value;


    if (genderSelecttionValue == 'none') {
        highlight_error(genderSelecttionElement, 'Gender cannot be "None"!', "Gender" )
    } else {
        return ['good', genderSelecttionValue];
    }
    
};


// Function to check if a string contains only letters
function containsOnlyLetters(str:string) {
    return /^[a-zA-Z]+$/.test(str);
}

// Function to check if a string contains letters and numbers
function containsLettersAndNumbers(str:string) {
    return /[a-zA-Z]/.test(str) && /[0-9]/.test(str);
}

// Function to check if a string is formatted as '01/01/2000'
function isValidDateFormat(str:string) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(str);
}


// function to check dob 
function check_dob() {
    // getting user dob
    let DOB_element:any = document.getElementById('user-dob');
    let DOB_value:string = DOB_element.value;

    let dob_check_one:any = containsOnlyLetters(DOB_value);
    let dob_check_two:any = containsLettersAndNumbers(DOB_value);
    let dob_check_three:any = isValidDateFormat(DOB_value);

    // Get the current year
    let currentYear = new Date().getFullYear();
    let yearCheck:any = parseInt(DOB_value.split('/')[2]);
    let calYear:number = currentYear - 90; // max age for users
    
    if (DOB_value != "None" && DOB_value != '' && !dob_check_one && !dob_check_two && dob_check_three && yearCheck >= calYear) {
        return ['good', DOB_value];
    } else {
        highlight_error(DOB_element, 'Invalid birthday! Try Again!', 'DOB');
    };
};




// function to check fname_lname 
function check_fname_lname() {
    // getting user first name
    let fname_element:any = document.getElementById('user-fname');
    let fname_value:string = fname_element.value;

    // getting user last name
    let lname_element:any = document.getElementById('user-lname');
    let lname_value:string = lname_element.value;

    if (fname_value != 'None' && lname_value != "None" && lname_value != '' && fname_value != '') {
        return ['good', fname_value, lname_value]
    } else {
        if (fname_value == 'None' || fname_value == "") {
            highlight_error(fname_element, "First name error, Try Again!", 'Fname')
        }
        else if (lname_value == 'None' || lname_value == "") {
            highlight_error(fname_element, "Lirst name error, Try Again!", 'Lname')
        }
        else {
            highlight_error(fname_element, "First name error, Try Again!", 'Fname')
            highlight_error(fname_element, "Lirst name error, Try Again!", 'Lname')
        }
    };
    
};



// making request to backend
function send_data_backend(username:any, email:any, gender:any, dob:any, names:any, pd:any) {
    const csrfToken:any = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;

    const formData = new FormData();
    formData.append('update_username', username);
    formData.append('update_email', email);
    formData.append('update_gender', gender);
    formData.append('update_dob', dob);
    formData.append('update_names', names);
    formData.append('update_pd', pd);

    fetch('/user_updates_profile/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });


};



// function that executes after user has submitted update and everything went good
function good_joblol() {

    let message2Declare:any = document.getElementById('messageTodeclare');

    message2Declare.style.display = 'block';

    message2Declare.innerHTML = "Thank you for updating your profile, You can refresh the page to see the changes."

    // For modern browsers
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    // For Safari
    document.body.scrollTop = 0; // For Safari

}


// form on submit
userForm.addEventListener('submit', function(event:any) {
    event.preventDefault();

    // getting profile d
    let profile_descriptionE:any = document.getElementById('pd');
    let profile_descriptionValue:any = profile_descriptionE.value; 

    let username_check:any = check_username();
    let username_checkin:any = username_check[0];
    let username_value:any = username_check[1]


    let email_check:any = check_email1();
    let email_checkin:any = email_check[0];
    let email_value:any = email_check[1];


    let gender_check:any = check_gender();
    let gender_checkin:any = gender_check[0];
    let gender_value:any = gender_check[1];


    let dob_check:any = check_dob();
    let dob_checkin:any = dob_check[0];
    let dob_value:any = dob_check[1];


    let names_check:any = check_fname_lname();
    let names_checkin:any = names_check[0];
    let firstName:any = names_check[1];
    let lastName:any = names_check[2];
    let full_name:string = `${firstName} ${lastName}`


    if (username_checkin == "good" && email_checkin == "good" && gender_checkin == "good" && dob_checkin == "good" && names_checkin == "good") {
        send_data_backend(username_value, email_value, gender_value, dob_value, full_name, profile_descriptionValue);
        good_joblol()
    }

});