"use strict";
let searchBox = document.getElementById('searchID');
let searchBoxContainer = document.getElementById('inputboxID');
let popup = document.getElementById("popup-element");
const messages_msg = document.getElementById('messagesID');
let searchForm = document.getElementById('searchFormID1');
let isHovering = false;
let stopLoading = true;
let is_authenticated1 = document.getElementById('is_authenticatedID');
let server_status4 = document.getElementById('server_status');
let server_status_4 = server_status.value;
let cleared_pages = [
    'terms',
    'notice',
    '2257',
    'dmcaTake',
    'dmca',
    'pp',
];
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
;
function getCookie(cname) {
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
function updateCookie(cookieName, newValue) {
    var existingCookie = getCookie(cookieName);
    var updatedCookie = cookieName + "=" + newValue;
    document.cookie = updatedCookie;
}
function savingCookie() {
    let popup_container = document.getElementById('entryWarningID');
    popup_container.style.display = 'none';
    document.body.removeChild(popup_container);
    let username = getCookie("hasEntered");
    if (username != false) {
        console.log(username);
        doNothing();
    }
    else {
        setCookie("hasEntered", "True", 5);
    }
}
window.addEventListener('load', function () {
    let pageValue101 = document.getElementById('page-on');
    let pageValue102 = pageValue101.value;
    if (is_authenticated1 == 'False') {
        doNothing();
    }
    else {
        let username = getCookie("hasEntered");
        if (username != false) {
            doNothing();
        }
        else {
            if (cleared_pages.includes(pageValue102)) {
                doNothing();
            }
            else {
                create_popup2('', 'Adult Only (18+)', 'This website contains adult content and is intended for individuals <b>(18)</b> or <b>(21)</b> years of age or older.', '#');
            }
        }
    }
});
function create_popup2(username, firstH1, secondH2, url) {
    var popup = document.createElement("div");
    popup.className = "entryWarning";
    popup.id = "entryWarningID";
    let notice_url = "http://127.0.0.1:8000/notice/";
    let termsOfUse = "http://127.0.0.1:8000/terms-of-use/";
    let popupMessage = `
    <div class="popup-content">
        <h2>${firstH1}</h2>
        <p>${secondH2}</p>
        <p>This Website hosts <b>Hardcore Adult Content</b>: by entering you agree to accept our <a href="${termsOfUse}" class="linksBi">Terms of Use</a> & 
        <a href="${notice_url}"  class="linksBi" >Notice of Adult Content</a></p>
        <a onclick="savingCookie()"><button>Enter</button></a>
        <a href="javascript:void(0);" onclick="window.history.back();" ><button>Leave</button></a>

        <div class="button_bit">
            <small>This Website is soley restricted for adults</small>
            <img src="/static/images/rta-logo2.png" alt="restricted to adults logo" style="margin-right: 5px;">
        </div>
    </div>
    `;
    popup.innerHTML = popupMessage;
    document.body.appendChild(popup);
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
}
;
function doNothing() {
}
function closeEntryWarning(choice) {
    let entry_container = document.getElementById('entryWarningID');
    if (choice == 'enter') {
        entry_container.style.display = 'none';
    }
    else {
        window.history.back();
    }
}
let main_input = '';
function open_dropwdown() {
    console.log('open_dropdown function');
    isHovering = true;
    popup.style.display = "block";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
    let input = document.getElementById('searchID');
    let inputValue = input.value;
    makeAjexRequest(inputValue);
}
;
function makeAjexRequest(input) {
    let data = input.toString();
    let newData = [];
}
;
function addElementsToDOM(data, input) {
    var container = document.getElementById("popup-element");
    let numberOfPosts = data[0].toString();
    let tags = data[1];
    let things = document.getElementById('yourLinkId');
    if (input) {
        doNothing();
    }
    else {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
    main_input = input;
    if (things) {
        if (input) {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            for (let value of tags) {
                var link1 = document.createElement("a");
                var url = "http://127.0.0.1:8000/search/" + encodeURIComponent(value);
                link1.href = url;
                link1.textContent = value;
                link1.id = "yourLinkId";
                container.appendChild(link1);
            }
            var hr1 = document.createElement("hr");
            var small1 = document.createElement("small");
            small1.textContent = numberOfPosts;
            container.appendChild(small1);
            container.appendChild(hr1);
        }
        else {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }
    else {
        if (input) {
            for (let value of tags) {
                var link1 = document.createElement("a");
                var url = "http://127.0.0.1:8000/search/" + encodeURIComponent(value);
                link1.href = url;
                link1.textContent = value;
                link1.id = "yourLinkId";
                container.appendChild(link1);
            }
            var hr1 = document.createElement("hr");
            var small1 = document.createElement("small");
            small1.textContent = numberOfPosts;
            container.appendChild(small1);
            container.appendChild(hr1);
        }
        else {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    }
}
;
searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let stupid_value = document.getElementById('searchID');
    let stupid_value_value = stupid_value.value;
    let url = `http://127.0.0.1:8000/search/${stupid_value_value}`;
    window.location.href = url;
    let yes = getCookie('searchValue');
    if (yes != '') {
        let added_ = `${yes};${stupid_value_value}`;
        updateCookie('searchValue', added_);
    }
    else {
        setCookie('searchValue', stupid_value_value, 1);
    }
});
function keep_open() {
    isHovering = true;
    popup.style.display = "block";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";
}
function hidePopup() {
    if (isHovering == false) {
        popup.style.display = "none";
    }
}
popup.addEventListener("mouseover", function () {
    keep_open();
});
popup.addEventListener("mouseout", function () {
    isHovering = false;
    hidePopup();
});
function open_search() {
    searchBox.style.display = 'block';
    searchBoxContainer.style.display = 'block';
}
;
let overly = document.getElementById('overlyID');
overly.addEventListener('mouseover', function () {
    popup.style.display = 'none';
});
function show_message(message) {
    messages_msg.style.display = 'block';
    messages_msg.innerHTML = `<div style="
    color: white; 
    font-size: 18px; 
    padding: 10px; 
    font-family:Arial, Helvetica, sans-serif;
    ">${message}</div>`;
    setTimeout(function () {
        messages_msg.style.display = 'none';
    }, 3000);
}
;
setTimeout(function () {
    var autoDismissAlert = document.getElementById('autoDismissAlert');
    if (autoDismissAlert) {
        autoDismissAlert.remove();
    }
}, 3000);
let is_popup = false;
let authenticatedElement = document.getElementById('is_authenticatedID');
let authenticated = authenticatedElement.value;
function openMobilePopup() {
    var popup = document.createElement("div");
    popup.className = "popup2";
    popup.id = "myPopup";
    let posts_dev = 'http://127.0.0.1:8000/posts';
    let joins = 'http://127.0.0.1:8000/users/join/';
    let dashboard = 'http://127.0.0.1:8000/users/dashboard/';
    let submission = 'http://127.0.0.1:8000/submission/';
    let premium = 'http://127.0.0.1:8000/premium/';
    let popupMessage = '';
    if (authenticated == "False") {
        popupMessage = `
            <h2></h2>
            <a href="${posts_dev}">Posts</a>
            <a href="${joins}">Join</a>
            <a href="${submission}">Submit</a>
            <a href="${premium}" id="popupPremium" >Premium</a>
            <a href="${dashboard}">Account</a>
        `;
    }
    else {
        let logout = "/users/logout_user/";
        popupMessage = `
        <h2></h2>
            <a href="${posts_dev}">Posts</a>
            <a href="${submission}">Submit</a>
            <a href="${premium}" id="popupPremium" >Premium</a>
            <a href="${dashboard}">Account</a>
            <a href="${logout}">Log Out</a>
            
        `;
    }
    popup.innerHTML = popupMessage;
    document.body.appendChild(popup);
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
}
function closePopup2() {
    let popup = document.getElementById('myPopup');
    popup.style.display = 'none';
    document.body.removeChild(popup);
}
function mobileHamburger() {
    if (!is_popup) {
        openMobilePopup();
        is_popup = true;
    }
    else {
        closePopup2();
        is_popup = false;
    }
}
let nameOfSite = document.getElementById('nameOfSite');
let nameOfSiteValue = nameOfSite.value;
let tagsData = [];
function yesSIr(data) {
    tagsData.push(data);
}
function openMobileMenuTags() {
    let returnData = [];
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;
    let items = 'action';
    const formData = new FormData();
    formData.append('popup_username', items);
    fetch('/retrieve_tags/', {
        method: 'POST',
        headers: {
            'X-CSRFToken': csrfValue
        },
        body: formData
    })
        .then(response => response.json())
        .then(data => {
        yesSIr(data.key);
    });
}
;
function close_menuTags() {
    let menuTags = document.getElementById('mobileMenuDropdownTAGSOID');
    menuTags.style.display = 'none';
}
let isTagsMobile_open = false;
function showMenuTags() {
    if (isTagsMobile_open === false) {
        close_menuTags();
        isTagsMobile_open = true;
    }
    else {
        let menuTags = document.getElementById('mobileMenuDropdownTAGSOID');
        menuTags.style.display = 'block';
        let newStuff = `
            ${tagsData[0]}
        `;
        menuTags.innerHTML = newStuff;
        isTagsMobile_open = false;
    }
}
;
function open_mobile_menu1() {
    var popup12 = document.createElement("div");
    popup12.className = "mobile_menu111";
    popup12.id = "mobile_menu111ID";
    let menu_tags = openMobileMenuTags();
    let popup12Message = `
    <div class="nav_bar">
        <p>${nameOfSiteValue}</p>
        <i class="fa-solid fa-xmark" onclick="closeMobileMenu101()"></i>
    </div>
    
    <a href="#" ><div><i class="fa-solid fa-video"></i> Videos </div></a>
    <a href="#" ><div><i class="fa-solid fa-thumbs-up"></i> Likes </div></a>
    <a href="#" onclick="showMenuTags()" ><div> <i class="fa-solid fa-hashtag"></i> Tags</div> <i class="fa-solid fa-caret-down" class="dropdown" ></i></a>
    <div class="mobileMenuDropdownTAGS" id="mobileMenuDropdownTAGSOID">
        
    </div>
    <a href="#" ><div><i class="fa-solid fa-image"></i> Pictures</div></a>
    <a href="#" ><div><i class="fa-regular fa-images"></i> GIFs</div></a>
    <a href="#" ><div><i class="fa-brands fa-discord"></i> Join Us</div></a>


    <a href="#" id="PremiumID" >Wait list for Premium</a>
    <div class="otherOptions">
        <a href="">
            <i class="fa-solid fa-shield-halved"></i>
            Privacy Policy
        </a>

        <a href="">
            <i class="fa-solid fa-book"></i>
            Terms of Use
        </a>


        <a href="">
            <i class="fa-regular fa-paper-plane"></i>
            Contact Us
        </a>


        <a href="">
            <i class="fa-solid fa-circle-exclamation"></i>
            NOTICE
        </a>

    </div>
    `;
    popup12.innerHTML = popup12Message;
    document.body.appendChild(popup12);
    popup12.style.display = "flex";
    popup12.style.flexDirection = 'column';
    isTagsMobile_open = true;
}
;
function closeMobileMenu101() {
    let popup = document.getElementById('mobile_menu111ID');
    popup.style.display = 'none';
    document.body.removeChild(popup);
}
;
function open_mobileMenu() {
    open_mobile_menu1();
}
;
let is_dorpDown_Open = false;
function openFooterOption(buttonNum) {
    let nameIus = `dropeurID${buttonNum}`;
    let dropDown_thingyyy = document.getElementById(nameIus);
    if (!is_dorpDown_Open) {
        dropDown_thingyyy.style.display = 'flex';
        dropDown_thingyyy.style.flexDirection = 'column';
        is_dorpDown_Open = true;
    }
    else {
        dropDown_thingyyy.style.display = 'none';
        is_dorpDown_Open = false;
    }
}
;
function searchInputUpdate() {
    let mobileSearchBarID = document.getElementById('mobileSearchBarID');
    let searchValue = mobileSearchBarID.value;
}
function close_mobileSearchBar() {
    let mobile_search_barID = document.getElementById('mobile_search_barID');
    mobile_search_barID.style.display = 'none';
    document.body.removeChild(mobile_search_barID);
}
;
function open_mobileSearch() {
    var mobileSeachBar = document.createElement("div");
    mobileSeachBar.className = "mobile_search_bar";
    mobileSeachBar.id = "mobile_search_barID";
    let csrf__token = document.getElementById('csrfTok');
    let csrf__tokenV = csrf__token.value;
    let popup12Message = `

        <div class="mobile_searchBar">

            <form action="/search_results/" method="POST">
                <input type="hidden" name="csrfmiddlewaretoken" value="${csrf__tokenV}">
                <input type="search" name="mobileSearchBar" id="mobileSearchBarID"  oninput="searchInputUpdate()" placeholder="Search. ">
            </form>

            <div> 
                <button type="button" onclick="close_mobileSearchBar()" >Cancel</button>
            </div>
        
        </div>

    `;
    mobileSeachBar.innerHTML = popup12Message;
    document.body.appendChild(mobileSeachBar);
    mobileSeachBar.style.display = "flex";
    mobileSeachBar.style.flexDirection = 'column';
}
;
function close_mobileUser() {
    let mobile_search_barID = document.getElementById('mobile_userSettingID');
    document.body.removeChild(mobile_search_barID);
    mobile_search_barID.style.display = 'none';
}
;
function open_mobileUser() {
    var mobileUserPanel = document.createElement("div");
    mobileUserPanel.className = "mobile_userSetting";
    mobileUserPanel.id = "mobile_userSettingID";
    let popup12Message = `
        <div class="section1" onclick="close_mobileUser()">
            <i class="fa-solid fa-xmark" id="lol222" ></i>
        </div>

        <div class="section2">

            <div class="login_section">
                <a>
                    <i class="fa-solid fa-circle-user"></i>
                    Join Us
                </a>

                <a>
                    <i class="fa-solid fa-right-to-bracket"></i>
                    Login
                </a>

                <a>
                    <i class="fa-solid fa-cloud-arrow-up"></i>
                    Submit
                </a>

            </div>

        <div class="later_section">
            <a>
                <i class="fa-solid fa-bolt"></i>
                Newest Videos
            </a>
        </div>

        <div class="later_section">
            <a>
                <i class="fa-solid fa-image"></i>
                Photos
            </a>
        </div>

        <div class="later_section">
            <a>
                <i class="fa-regular fa-images"></i>
                GIFs
            </a>
        </div>

    

    </div>



    `;
    mobileUserPanel.innerHTML = popup12Message;
    document.body.appendChild(mobileUserPanel);
    mobileUserPanel.style.display = "flex";
    mobileUserPanel.style.flexDirection = 'column';
}
;
function change_orientation(orientation) {
    updateCookie('orientation', orientation);
}
;
