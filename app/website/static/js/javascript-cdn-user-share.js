"use strict";
let server_status1 = document.getElementById('server_status');
let server_status_1 = server_status.value;
function open_share_tab() {
    var popup = document.createElement("div");
    popup.className = "share_profilePopup";
    popup.id = "share_profilePopupID";
    var current_user = document.getElementById('username-');
    let current_userValue = current_user.value;
    let profile_url = `http://127.0.0.1:8000/users/profile/${current_userValue}/`;
    let popupMessage = `
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
    document.body.appendChild(popup);
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
}
function copy_user_url() {
    let copyButton = document.getElementById('copy');
    let copidButton = document.getElementById('copid');
    copyButton.style.display = 'none';
    copidButton.style.display = 'block';
    var current_user = document.getElementById('username-');
    let current_userValue = current_user.value;
    let text = '';
    if (server_status_1 == "True") {
        text = 'https://www.xxdice.com/users/profile/${current_userValue}/';
    }
    else {
        text = `http://127.0.0.1:8000/users/profile/${current_userValue}/`;
    }
    navigator.clipboard.writeText(text)
        .then(function () {
        copid_notification('Text copied to clipboard:');
    })
        .catch(function (err) {
        copid_notification('Failed to copy text to clipboard:');
    });
}
;
function copid_notification(message) {
    var popup = document.createElement("div");
    popup.className = "copid_message";
    popup.id = "copid_messageID";
    let popupMessage = `
        <p>${message}</p>
    `;
    popup.innerHTML = popupMessage;
    document.body.appendChild(popup);
    popup.style.display = "block";
    setTimeout(function () {
        popup.style.display = 'none';
        document.body.removeChild(popup);
    }, 1500);
}
;
function close_share_tab() {
    let popup = document.getElementById('share_profilePopupID');
    popup.style.display = 'none';
    document.body.removeChild(popup);
}
;
