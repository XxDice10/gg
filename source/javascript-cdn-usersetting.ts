let account_userButton:any = document.getElementById('userBtn1');
let isUser:any = document.getElementById('is_authenticatedID');
let isUserAuth:any = isUser.value;

let server_status:any = document.getElementById('server_status');
let server_status_:any = server_status.value;

let isAccountSettingOpen:boolean = false;


function closeAccountSetting() {
    let popup:any = document.getElementById('account_settingID');
    popup.style.display = 'none';
    document.body.removeChild(popup);
    isAccountSettingOpen = false;
}


function create_user_setting() {
    // Create the popup element
    var popup: any = document.createElement("div");
    popup.className = "account_setting_popup";
    popup.id = "account_settingID";

    let popupMessage:any = '';
    let loginURL:any = ''
    let signUPURL:any = ''
    let noticeURL:any = ''
    let discord:any = 'https://discord.gg/kkddTJHQuF'
    let faq_page:any = ''
    let contact_:any = ''

    if (server_status_ === 'True') {
        loginURL = 'https://www.xxdice.com/users/loginUser/'
        signUPURL = 'https://www.xxdice.com/users/join/'
        noticeURL = 'https://www.xxdice.com/notice/'
        faq_page = 'https://www.xxdice.com/faq/'
        contact_ = 'https://www.xxdice.com/contact_us/'
    } else {
        loginURL = 'http://127.0.0.1:8000/users/loginUser/'
        signUPURL = 'http://127.0.0.1:8000/users/join/'
        noticeURL = 'http://127.0.0.1:8000/notice/'
        faq_page = 'http://127.0.0.1:8000/faq/'
        contact_ = 'http://127.0.0.1:8000/contact_us/'
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
        let dashboard:any = ''
        let submissionPage:any = ''
        let userLikes:any = ''
        let logoutUser:any = ''
        let faq_page:any = ''
        let contact_page:any = ''

        if (server_status_ === 'True') {
            dashboard = 'https://www.xxdice.com/users/dashboard/'
            submissionPage = 'https://www.xxdice.com/users/submission/'
            userLikes = 'https://www.xxdice.com/users/likes/'
            logoutUser = 'https://www.xxdice.com/users/logout_user'
            faq_page = 'https://www.xxdice.com/faq/'
            contact_page = 'https://www.xxdice.com/contact_us/'
        } 
        else {
            dashboard = 'http://127.0.0.1:8000/users/dashboard/'
            submissionPage = 'http://127.0.0.1:8000/users/submission/'
            userLikes = 'http://127.0.0.1:8000/users/likes/'
            logoutUser = 'http://127.0.0.1:8000/users/logout_user'
            faq_page = 'http://127.0.0.1:8000/faq/'
            contact_page = 'http://127.0.0.1:8000/contact_us/'
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


    // Append the popup to the body
    document.body.appendChild(popup);

    // Show the popup
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
    isAccountSettingOpen = true;
};


account_userButton.addEventListener('click', function() {
    if (isUserAuth === "True") {
        if (isAccountSettingOpen === false) {
            create_user_setting();
        } else {
            closeAccountSetting();
        }
    } 
    
    else {
        if (isAccountSettingOpen === false) {
            create_user_setting();
        } else {
            closeAccountSetting();
        }
    }
});














// Check if the form exists before adding the event listener
let signUp_form:any = document.getElementById('userRegistrationFormID');


function addErrorWarning() {
    let error_warningID:any = document.getElementById('error-warningID');
    let registrationContainter:any = document.getElementById('userRegistrationFormID');

    registrationContainter.style.border = '2px solid red';
    error_warningID.style.display = 'block';

};


if (signUp_form) {
    let agreementCheckbox:any = document.getElementById('agree2');

    signUp_form.addEventListener('submit', function(event:any) {
        // Check if the checkbox is checked
        if (!agreementCheckbox.checked) {
            // If checkbox is not checked, prevent form submission
            event.preventDefault();
            addErrorWarning()
            // You can provide additional feedback to the user, such as showing an error message
        }
    });
}










