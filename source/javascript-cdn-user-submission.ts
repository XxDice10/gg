


let submissionForm:any = document.getElementById('submission-form');


function close_add_warning() {
    let popup:any = document.getElementById('checkbox_warning101ID');

    setTimeout(function() {
        popup.style.display = 'none';
        document.body.removeChild(popup);
    }, 3000); // 5000 milliseconds (5 seconds)
}

function add_warning() {
    var popup: any = document.createElement("div");
    popup.className = "checkbox_warning101";
    popup.id = "checkbox_warning101ID";

    let popupMessage:any = `
        <p>You need to agree to the Rules and Terms of Service before uploading any content! </p>
    `;

    popup.innerHTML = popupMessage;


    // Append the popup to the body
    document.body.appendChild(popup);

    // Show the popup
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
    close_add_warning()
}


submissionForm.addEventListener('submit', function(event:any) {
    let checkBox_submission:any = document.getElementById('agreement');


    // Check if the checkbox is checked
    if (checkBox_submission.checked) {
        event.submit()
    } else {
        // If not checked, do something else
        event.preventDefault();
        add_warning()
    }
})
