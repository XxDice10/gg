"use strict";
function get_comments() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    let vId = document.getElementById('Video_id');
    let video_id = vId.value;
    const formData = new FormData();
    formData.append('video_id', video_id);
    return fetch('/get_comment_data/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
        .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}
function show_comments() {
    get_comments()
        .then(comments => {
        let list_comments = comments.key;
        var popup = document.getElementById("comments_containierID");
        let popupMessage = `
            ${list_comments}

            <button onclick="show_more()">Show More</button>
        `;
        popup.innerHTML = popupMessage;
        popup.style.display = "flex";
        popup.style.flexDirection = 'column';
    });
}
let server_status2 = document.getElementById('server_status');
let server_status_2 = server_status.value;
let video_ID_page_number = document.getElementById('Video_id');
let video_id_Value1 = video_ID_page_number.value;
function sendBackDetails(value, video_id) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    const formData = new FormData();
    formData.append('comment_value', value);
    formData.append('video_id', video_id);
    fetch('/adding_new_comment/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });
    let new_comment = document.getElementById('new_comment');
    new_comment.value = '';
}
;
const commentForm = document.getElementById('comment_form');
if (commentForm) {
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        let new_comment = document.getElementById('new_comment');
        let new_comment_value = new_comment.value;
        let vId = document.getElementById('Video_id');
        let video_id = vId.value;
        if (new_comment_value != '') {
            sendBackDetails(new_comment_value, video_id);
        }
        else {
            new_comment.style.borderBottom = '2px solid #cc3a3a';
        }
    });
}
function video_like() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    let vId = document.getElementById('Video_id');
    let video_id = vId.value;
    const formData = new FormData();
    formData.append('video_id', video_id);
    return fetch('/video_liked/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });
}
;
function video_unlike() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    let vId = document.getElementById('Video_id');
    let video_id = vId.value;
    const formData = new FormData();
    formData.append('video_id', video_id);
    return fetch('/video_unliked/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });
}
;
function share_video() {
    let video_url_vp = '';
    if (server_status_2 == "True") {
        video_url_vp = `https://www.xxdice.com/video/${video_id_Value1}/`;
    }
    else {
        video_url_vp = `http://127.0.0.1:8000/video/${video_id_Value1}/`;
    }
    var popup = document.createElement("div");
    popup.className = "share_profilePopup";
    popup.id = "share_profilePopupID";
    let popupMessage = `
        <div class="popup-content">
            <div class="top-part">
                <h5>Share your favorite content</h5>
                <button onclick="close_share_tab2()"><i class="fa-solid fa-circle-xmark"></i></button>
            </div>
            <p>The link to your profile:</p>

            <div class="copy-paste-url">
                <div class="inputsss">
                    <label for="user_url" >Video Url</label>
                    <input name="user_url" disabled value="${video_url_vp}">
                </div>
                <button id="copy" onclick="copy_user_url2()" ><i class="fa-solid fa-copy"></i></button>
                <i class="fa-regular fa-square-check" id="copid"></i>
            </div>
        </div>
    `;
    popup.innerHTML = popupMessage;
    document.body.appendChild(popup);
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
}
function thumbs_up(action) {
    let thumbs_up_like = document.getElementById('thumbs-up-like');
    let thumbs_up_unlike = document.getElementById('thumbs-up-unlike');
    if (action == 'like') {
        thumbs_up_unlike.style.display = 'block';
        thumbs_up_like.style.display = 'none';
        video_like();
    }
    else {
        thumbs_up_unlike.style.display = 'none';
        thumbs_up_like.style.display = 'block';
        video_like();
    }
    ;
}
;
function copy_user_url2() {
    let copyButton = document.getElementById('copy');
    let copidButton = document.getElementById('copid');
    copyButton.style.display = 'none';
    copidButton.style.display = 'block';
    let text = '';
    if (server_status_2 == "True") {
        text = `https://www.xxdice.com/video/${video_id_Value1}/`;
    }
    else {
        text = `http://127.0.0.1:8000/video/${video_id_Value1}/`;
    }
    navigator.clipboard.writeText(text)
        .then(function () {
        copid_notification2('Text copied to clipboard:');
    })
        .catch(function (err) {
        copid_notification2('Failed to copy text to clipboard:');
    });
}
;
function close_share_tab2() {
    let popup = document.getElementById('share_profilePopupID');
    popup.style.display = 'none';
    document.body.removeChild(popup);
}
;
function copid_notification2(message) {
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
function thumbs_down(action) {
    let thumbs_down_like = document.getElementById('thumbs-down-like');
    let thumbs_down_unlike = document.getElementById('thumbs-down-unlike');
    if (action == 'like') {
        thumbs_down_like.style.display = 'none';
        thumbs_down_unlike.style.display = 'block';
        video_unlike();
    }
    else {
        thumbs_down_like.style.display = 'block';
        thumbs_down_unlike.style.display = 'none';
        video_unlike();
    }
    ;
}
;
function create_popup(username, firstH1, secondH2, url, action) {
    var popup = document.createElement("div");
    popup.className = "popup_message";
    popup.id = "popup_messageID";
    let popupMessage = ``;
    let loginURLVP = '';
    let joinURLVP = '';
    if (action === 'login') {
        if (server_status_2 == "True") {
            loginURLVP = 'https://www.xxdice.com/users/loginUser/';
            joinURLVP = 'https://www.xxdice.com/users/join/';
        }
        else {
            loginURLVP = 'http://127.0.0.1:8000/users/loginUser/';
            joinURLVP = 'http://127.0.0.1:8000/users/join/';
        }
        popupMessage = `
        <div class="popup-content">
            <span class='close' onclick='closePopup22()'> &times;</span>
            <h2>${firstH1}</h2>
            <p>${secondH2}</p>
            <a href='${loginURLVP}'><button>Login</button></a>
            <a href='${joinURLVP}'><button>Join Now!</button></a>
        </div>
        `;
    }
    else if (action === 'premium') {
        popupMessage = `
        <div class="popup-content">
            <span class='close' onclick='closePopup22()'> &times;</span>
            <h2>${firstH1}</h2>
            <p>${secondH2}</p>
            <a href='${url}'><button>Go Premium!</button></a>
        </div>
        `;
    }
    popup.innerHTML = popupMessage;
    document.body.appendChild(popup);
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
}
;
function closePopup22() {
    let popup_container = document.getElementById('popup_messageID');
    popup_container.style.display = 'none';
    document.body.removeChild(popup_container);
}
;
function UserNeedLogin() {
    create_popup('none', "Enjoying what you're viewing? Sign in to give it a like!", "Liking posts is reserved for members. Sign in or register to join the community!", '', 'login');
}
;
function userLikeHTML1(id) {
    let edited1 = `heartLiked${id}`;
    let edited2 = `heartUnliked${id}`;
    let heartLiked = document.getElementById(edited1);
    let heartUnliked = document.getElementById(edited2);
    heartLiked.style.display = 'block';
    heartUnliked.style.display = 'none';
}
;
function userUnlikeHTML1(id) {
    let edited1 = `heartLiked${id}`;
    let edited2 = `heartUnliked${id}`;
    let heartLiked = document.getElementById(edited1);
    let heartUnliked = document.getElementById(edited2);
    heartLiked.style.display = 'none';
    heartUnliked.style.display = 'block';
}
;
function user_like_post1(id, user) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    const formData = new FormData();
    formData.append('post_id', id);
    formData.append('username', user);
    fetch('/userLikedPost/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });
    userLikeHTML1(id);
}
;
function UserUnlike1(id, user) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    const formData = new FormData();
    formData.append('post_id', id);
    formData.append('username', user);
    fetch('/userunLikedPost/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });
    userUnlikeHTML1(id);
}
;
function userLikeHTML(id) {
    let edited1 = `heartLiked${id}`;
    let edited2 = `heartUnliked_s${id}`;
    let heartLiked = document.getElementById(edited1);
    let heartUnliked = document.getElementById(edited2);
    heartLiked.style.display = 'block';
    heartUnliked.style.display = 'none';
}
;
function userUnlikeHTML(id) {
    let edited1 = `heartLiked${id}`;
    let edited2 = `heartUnliked_s${id}`;
    let heartLiked = document.getElementById(edited1);
    let heartUnliked = document.getElementById(edited2);
    heartLiked.style.display = 'none';
    heartUnliked.style.display = 'block';
}
function user_like_post(id, user) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    const formData = new FormData();
    formData.append('post_id', id);
    formData.append('username', user);
    fetch('/userLikedPost/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });
    userLikeHTML(id);
}
function UserUnlike(id, user) {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    const formData = new FormData();
    formData.append('post_id', id);
    formData.append('username', user);
    fetch('/userunLikedPost/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    });
    userUnlikeHTML(id);
}
function setCookie_video(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
;
function getCookie_video(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}
;
function eraseCookie(cookieName) {
    setCookie_video(cookieName, "", -1);
}
window.addEventListener('load', function () {
    let last_video = getCookie_video('last_videoCookie');
    let video_play_id = document.getElementById('video_playID');
    let video_play_id_value = video_play_id.value;
    console.log(video_play_id_value);
    try {
        eraseCookie('last_videoCookie');
        setCookie_video('last_videoCookie', video_play_id_value, 1);
    }
    catch (error) {
        setCookie_video('last_videoCookie', video_play_id_value, 1);
    }
    finally {
        setCookie_video('last_videoCookie', video_play_id_value, 1);
    }
});
