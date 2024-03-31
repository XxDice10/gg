"use strict";
let submissionForm = document.getElementById('submission-form');
function close_add_warning() {
    let popup = document.getElementById('checkbox_warning101ID');
    setTimeout(function () {
        popup.style.display = 'none';
        document.body.removeChild(popup);
    }, 3000);
}
function add_warning() {
    var popup = document.createElement("div");
    popup.className = "checkbox_warning101";
    popup.id = "checkbox_warning101ID";
    let popupMessage = `
        <p>You need to agree to the Rules and Terms of Service before uploading any content! </p>
    `;
    popup.innerHTML = popupMessage;
    document.body.appendChild(popup);
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
    close_add_warning();
}
submissionForm.addEventListener('submit', function (event) {
    let checkBox_submission = document.getElementById('agreement');
    if (checkBox_submission.checked) {
        event.submit();
    }
    else {
        event.preventDefault();
        add_warning();
    }
});
