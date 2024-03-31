"use strict";
const userForm = document.getElementById('user_info_form');
function isUsernameAllowed(username) {
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
}
;
function highlight_error(element, message, inptValue) {
    let mainErrorLabelID = `errorLabel_${inptValue}ID`;
    let errorMessageID = document.getElementById(mainErrorLabelID);
    errorMessageID.style.display = 'block';
    errorMessageID.innerHTML = message;
    element.style.border = '2px solid red';
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
;
function check_username() {
    let usernameInput1 = document.getElementById('user-username');
    let usernameInput_value = usernameInput1.value;
    let currentName = document.getElementById('userID');
    let currentNameValue = currentName.value;
    const isAllowed = isUsernameAllowed(usernameInput_value);
    if (isAllowed) {
        if (currentNameValue == usernameInput_value) {
            return ['good', usernameInput_value];
        }
        else if (usernameInput_value != '') {
            return ['good', usernameInput_value];
        }
        else {
            highlight_error(usernameInput1, 'Error with username: Try again.', 'Username');
            return 'bad';
        }
    }
    else {
        highlight_error(usernameInput1, 'Username not allowed: Try again.', 'Username');
        return 'bad';
    }
}
;
function check_email1() {
    let emailInput1 = document.getElementById('user-email');
    let emailInput_value = emailInput1.value;
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
    let isValid2 = email_ends.some(domain => emailInput_value.endsWith(domain));
    if (isValid2) {
        return ['good', emailInput_value];
    }
    else {
        highlight_error(emailInput1, 'Email address is not a valid address. Try again.', 'Email');
    }
}
;
function check_gender() {
    let genderSelecttionElement = document.getElementById('user-gender');
    let genderSelecttionValue = genderSelecttionElement.value;
    if (genderSelecttionValue == 'none') {
        highlight_error(genderSelecttionElement, 'Gender cannot be "None"!', "Gender");
    }
    else {
        return ['good', genderSelecttionValue];
    }
}
;
function containsOnlyLetters(str) {
    return /^[a-zA-Z]+$/.test(str);
}
function containsLettersAndNumbers(str) {
    return /[a-zA-Z]/.test(str) && /[0-9]/.test(str);
}
function isValidDateFormat(str) {
    return /^\d{2}\/\d{2}\/\d{4}$/.test(str);
}
function check_dob() {
    let DOB_element = document.getElementById('user-dob');
    let DOB_value = DOB_element.value;
    let dob_check_one = containsOnlyLetters(DOB_value);
    let dob_check_two = containsLettersAndNumbers(DOB_value);
    let dob_check_three = isValidDateFormat(DOB_value);
    let currentYear = new Date().getFullYear();
    let yearCheck = parseInt(DOB_value.split('/')[2]);
    let calYear = currentYear - 90;
    if (DOB_value != "None" && DOB_value != '' && !dob_check_one && !dob_check_two && dob_check_three && yearCheck >= calYear) {
        return ['good', DOB_value];
    }
    else {
        highlight_error(DOB_element, 'Invalid birthday! Try Again!', 'DOB');
    }
    ;
}
;
function check_fname_lname() {
    let fname_element = document.getElementById('user-fname');
    let fname_value = fname_element.value;
    let lname_element = document.getElementById('user-lname');
    let lname_value = lname_element.value;
    if (fname_value != 'None' && lname_value != "None" && lname_value != '' && fname_value != '') {
        return ['good', fname_value, lname_value];
    }
    else {
        if (fname_value == 'None' || fname_value == "") {
            highlight_error(fname_element, "First name error, Try Again!", 'Fname');
        }
        else if (lname_value == 'None' || lname_value == "") {
            highlight_error(fname_element, "Lirst name error, Try Again!", 'Lname');
        }
        else {
            highlight_error(fname_element, "First name error, Try Again!", 'Fname');
            highlight_error(fname_element, "Lirst name error, Try Again!", 'Lname');
        }
    }
    ;
}
;
function send_data_backend(username, email, gender, dob, names, pd) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
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
}
;
function good_joblol() {
    let message2Declare = document.getElementById('messageTodeclare');
    message2Declare.style.display = 'block';
    message2Declare.innerHTML = "Thank you for updating your profile, You can refresh the page to see the changes.";
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}
userForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let profile_descriptionE = document.getElementById('pd');
    let profile_descriptionValue = profile_descriptionE.value;
    let username_check = check_username();
    let username_checkin = username_check[0];
    let username_value = username_check[1];
    let email_check = check_email1();
    let email_checkin = email_check[0];
    let email_value = email_check[1];
    let gender_check = check_gender();
    let gender_checkin = gender_check[0];
    let gender_value = gender_check[1];
    let dob_check = check_dob();
    let dob_checkin = dob_check[0];
    let dob_value = dob_check[1];
    let names_check = check_fname_lname();
    let names_checkin = names_check[0];
    let firstName = names_check[1];
    let lastName = names_check[2];
    let full_name = `${firstName} ${lastName}`;
    if (username_checkin == "good" && email_checkin == "good" && gender_checkin == "good" && dob_checkin == "good" && names_checkin == "good") {
        send_data_backend(username_value, email_value, gender_value, dob_value, full_name, profile_descriptionValue);
        good_joblol();
    }
});
