
let server_status1:any = document.getElementById('server_status');
let server_status_1:any = server_status.value;

function open_share_tab() {
    var popup: any = document.createElement("div");
    popup.className = "share_profilePopup";
    popup.id = "share_profilePopupID";

    var current_user:any = document.getElementById('username-');
    let current_userValue = current_user.value
    let profile_url = `http://127.0.0.1:8000/users/profile/${current_userValue}/`



    let popupMessage:any = `
        <div class="popup-content">
            <div class="top-part">
                <h5>Looking to share your profile or content?</h5>
                <button onclick="close_share_tab()"><i class="fa-solid fa-circle-xmark"></i></button>
            </div>
            <p>The link to your profile:</p>

            <div class="copy-paste-url">
                <div class="inputsss">
                    <label for="user_url" >Profile URL</label>
                    <input name="user_url" disabled value="${profile_url}">
                </div>
                <button id="copy" onclick="copy_user_url()" ><i class="fa-solid fa-copy"></i></button>
                <i class="fa-regular fa-square-check" id="copid"></i>
            </div>
        </div>
    `;

    popup.innerHTML = popupMessage;


    // Append the popup to the body
    document.body.appendChild(popup);

    // Show the popup
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
}




function copy_user_url() {
    let copyButton:any = document.getElementById('copy');
    let copidButton:any = document.getElementById('copid');

    copyButton.style.display = 'none';
    copidButton.style.display = 'block';

    var current_user:any = document.getElementById('username-');
    let current_userValue = current_user.value
    let text:any = ''
    
    if (server_status_1 == "True") {
        text = 'https://www.xxdice.com/users/profile/${current_userValue}/'
    }
    else {
        text = `http://127.0.0.1:8000/users/profile/${current_userValue}/`
    }

    navigator.clipboard.writeText(text)
    .then(function() {
        // If successful, log a success message
        copid_notification('Text copied to clipboard:')
    })
    .catch(function(err) {
        // If unsuccessful, log an error message
        copid_notification('Failed to copy text to clipboard:')
    });

};




function copid_notification(message:string) {

    var popup: any = document.createElement("div");
    popup.className = "copid_message";
    popup.id = "copid_messageID";

    let popupMessage:any = `
        <p>${message}</p>
    `;

    popup.innerHTML = popupMessage;


    // Append the popup to the body
    document.body.appendChild(popup);

    // Show the popup
    popup.style.display = "block";

    
    setTimeout(function() {
        popup.style.display = 'none';
        document.body.removeChild(popup);
    }, 1500); // 5000 milliseconds (5 seconds)

};






function close_share_tab() {
    let popup:any = document.getElementById('share_profilePopupID');

    popup.style.display = 'none';
    document.body.removeChild(popup);
};

