"use strict";
let account_userButton = document.getElementById('userBtn1');
let isUser = document.getElementById('is_authenticatedID');
let isUserAuth = isUser.value;
let server_status = document.getElementById('server_status');
let server_status_ = server_status.value;
let isAccountSettingOpen = false;
function closeAccountSetting() {
    let popup = document.getElementById('account_settingID');
    popup.style.display = 'none';
    document.body.removeChild(popup);
    isAccountSettingOpen = false;
}
function create_user_setting() {
    var popup = document.createElement("div");
    popup.className = "account_setting_popup";
    popup.id = "account_settingID";
    let popupMessage = '';
    let loginURL = '';
    let signUPURL = '';
    let noticeURL = '';
    let discord = 'https://discord.gg/kkddTJHQuF';
    let faq_page = '';
    let contact_ = '';
    if (server_status_ === 'True') {
        loginURL = 'https://www.xxdice.com/users/loginUser/';
        signUPURL = 'https://www.xxdice.com/users/join/';
        noticeURL = 'https://www.xxdice.com/notice/';
        faq_page = 'https://www.xxdice.com/faq/';
        contact_ = 'https://www.xxdice.com/contact_us/';
    }
    else {
        loginURL = 'http://127.0.0.1:8000/users/loginUser/';
        signUPURL = 'http://127.0.0.1:8000/users/join/';
        noticeURL = 'http://127.0.0.1:8000/notice/';
        faq_page = 'http://127.0.0.1:8000/faq/';
        contact_ = 'http://127.0.0.1:8000/contact_us/';
    }
    if (isUserAuth === "False") {
        popupMessage = `
        <div class="account_selection" >

                <div class="bubblepop">
                    <a href=${signUPURL} ><i class="fa-solid fa-user-plus"></i></a>
                    <a class="underling userJoin" href="${signUPURL}" >Sign Up</a>
                </div>

                <div class="bubblepop">
                    <a href="${loginURL}" ><i class="fa-solid fa-user"></i></a>
                    <a class="underling" href="${loginURL}" >Sign In</a>
                </div>

                <div class="bubblepop">
                    <a id="userSubmit" href="${signUPURL}" ><i class="fa-solid fa-upload"></i></a>
                    <a class="underling" href="${signUPURL}" >Upload</a>
                </div>
        </div>



            <div class="other" >

                <div class="area_select">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <a href="${noticeURL}" >Notice</a>
                </div>

                <div class="area_select">
                    <i class="fa-solid fa-message"></i>
                    <a href="${faq_page}" >FAQ</a>
                </div>

                <div class="area_select"  style='cursor:pointer;'>
                    <i class="fa-regular fa-envelope-open" style='cursor:pointer;'></i>
                    <a href="${contact_}" style='cursor:pointer;'>Contact</a>
                </div>


                <div class="area_select">
                    <i class="fa-brands fa-discord"></i>
                    <a href="${discord}" >Discord</a>
                </div>

                <div class="area_select">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                    <a href="#" >Donate</a>
                </div>

            </div>
        
        `;
    }
    else {
        let dashboard = '';
        let submissionPage = '';
        let userLikes = '';
        let logoutUser = '';
        let faq_page = '';
        let contact_page = '';
        if (server_status_ === 'True') {
            dashboard = 'https://www.xxdice.com/users/dashboard/';
            submissionPage = 'https://www.xxdice.com/users/submission/';
            userLikes = 'https://www.xxdice.com/users/likes/';
            logoutUser = 'https://www.xxdice.com/users/logout_user';
            faq_page = 'https://www.xxdice.com/faq/';
            contact_page = 'https://www.xxdice.com/contact_us/';
        }
        else {
            dashboard = 'http://127.0.0.1:8000/users/dashboard/';
            submissionPage = 'http://127.0.0.1:8000/users/submission/';
            userLikes = 'http://127.0.0.1:8000/users/likes/';
            logoutUser = 'http://127.0.0.1:8000/users/logout_user';
            faq_page = 'http://127.0.0.1:8000/faq/';
            contact_page = 'http://127.0.0.1:8000/contact_us/';
        }
        popupMessage = `
        <div class="account_selection" >

                <div class="bubblepop">
                    <a href=${dashboard} ><i class="fa-solid fa-house-user"></i></a>
                    <a class="underling userJoin" href="${dashboard}" style="margin:auto;">Home</a>
                </div>

                <div class="bubblepop">
                    <a href="${submissionPage}" ><i class="fa-solid fa-cloud-arrow-up"></i></a>
                    <a class="underling" href="${submissionPage}" style="margin:auto;">Upload</a>
                </div>

                <div class="bubblepop">
                    <a id="userSubmit" href="${userLikes}" ><i class="fa-solid fa-heart"></i></a>
                    <a class="underling" href="${userLikes}" style="margin:auto;">Likes</a>
                </div>
        </div>



            <div class="other" >
                <div class="area_select">
                    <i class="fa-solid fa-user"></i>
                    <a href="${dashboard}" >Profile</a>
                </div>

                <div class="area_select">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <a href="${noticeURL}" >Notice</a>
                </div>

                <div class="area_select">
                    <i class="fa-solid fa-message"></i>
                    <a href="${faq_page}" >FAQ</a>
                </div>

                <div class="area_select" style='cursor:pointer;'>
                    <i class="fa-regular fa-envelope-open" style='cursor:pointer;'></i>
                    <a href="${contact_page}" style='cursor:pointer;'  >Contact</a>
                </div>


                <div class="area_select">
                    <i class="fa-brands fa-discord"></i>
                    <a href="${discord}" >Discord</a>
                </div>

                <div class="area_select">
                    <i class="fa-solid fa-hand-holding-dollar"></i>
                    <a href="#" >Donate</a>
                </div>

                <div class="area_select">
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <a href="${logoutUser}" >Log Out</a>
                </div>

            </div>
        
        `;
    }
    popup.innerHTML = popupMessage;
    document.body.appendChild(popup);
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
    isAccountSettingOpen = true;
}
;
account_userButton.addEventListener('click', function () {
    if (isUserAuth === "True") {
        if (isAccountSettingOpen === false) {
            create_user_setting();
        }
        else {
            closeAccountSetting();
        }
    }
    else {
        if (isAccountSettingOpen === false) {
            create_user_setting();
        }
        else {
            closeAccountSetting();
        }
    }
});
let signUp_form = document.getElementById('userRegistrationFormID');
function addErrorWarning() {
    let error_warningID = document.getElementById('error-warningID');
    let registrationContainter = document.getElementById('userRegistrationFormID');
    registrationContainter.style.border = '2px solid red';
    error_warningID.style.display = 'block';
}
;
if (signUp_form) {
    let agreementCheckbox = document.getElementById('agree2');
    signUp_form.addEventListener('submit', function (event) {
        if (!agreementCheckbox.checked) {
            event.preventDefault();
            addErrorWarning();
        }
    });
}
