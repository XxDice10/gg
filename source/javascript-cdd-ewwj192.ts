let searchBox:any = document.getElementById('searchID')
let searchBoxContainer:any = document.getElementById('inputboxID');
let popup:any = document.getElementById("popup-element");

const messages_msg:any = document.getElementById('messagesID');
let searchForm:any = document.getElementById('searchFormID1');


let isHovering:boolean = false;
let stopLoading:boolean = true;


let is_authenticated1:any = document.getElementById('is_authenticatedID');


// var to check if the server is live on prod or not
let server_status4:any = document.getElementById('server_status');
let server_status_4:any = server_status.value;


let cleared_pages:any = [
    'terms',
    'notice',
    '2257',
    'dmcaTake',
    'dmca',
    'pp',
]









//==================================================================
//, setting and getting cookies

function setCookie(cname:string, cvalue:string, exdays:number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};


function getCookie(cname:any) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return false;
};


function updateCookie(cookieName:any, newValue:any) {
    // Retrieve existing cookie
    var existingCookie = getCookie(cookieName);

    // Update the cookie value
    var updatedCookie = cookieName + "=" + newValue;

    // Set the updated cookie
    document.cookie = updatedCookie;
}


function deleteCookie(cookieName:string) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



function savingCookie() {
    let popup_container:any = document.getElementById('entryWarningID');
    popup_container.style.display = 'none';
    document.body.removeChild(popup_container);


    let username:any = getCookie("hasEntered");

    if (username != false) {
        console.log(username)
     doNothing()
    } else {
      setCookie("hasEntered", "True", 5);
    }


}




//=================================================================
















//=================================================================
//, Warning popup, 18 + warning

window.addEventListener('load', function() {
    let pageValue101:any = document.getElementById('page-on');
    let pageValue102:any = pageValue101.value;


    if (is_authenticated1 == 'False') {
        doNothing();
    } 
    
    else {
        let username:any = getCookie("hasEntered");
        // let username:any = false;

        if (username != false) {
            doNothing()
        } else {
            if (cleared_pages.includes(pageValue102)) {
                doNothing()
            } else {
                create_popup2(
                    '',
                    'Adult Only (18+)',
                    'This website contains adult content and is intended for individuals <b>(18)</b> or <b>(21)</b> years of age or older.',
                    '#'
                )

            }
        
        }
    
    }
});



function create_popup2(username:any, firstH1:any, secondH2:any, url:any) {
    // Create the popup element
    var popup: any = document.createElement("div");
    popup.className = "entryWarning";
    popup.id = "entryWarningID";

    let notice_url:any = "http://127.0.0.1:8000/notice/";
    let termsOfUse:any = "http://127.0.0.1:8000/terms-of-use/"

    let popupMessage:any = `
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


    // Append the popup to the body
    document.body.appendChild(popup);

    // Show the popup
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
};


// the famours doNothing function
function doNothing() {

}



//! maybe once they enter you can make a ajex request to backend to start session tracking stuff
//! also when user presses enter, and goes to a different page than back to home the same popup happens
function closeEntryWarning(choice:string) {
    let entry_container:any = document.getElementById('entryWarningID');

    if (choice == 'enter') {
        entry_container.style.display = 'none'
    } else {
        window.history.back();
    }
}




//=================================================================


















// ==================================================================
//, function for when user types into search bar

let main_input:any = ''



//| First Function
// function that executes when the user starts typing into search bar
function open_dropwdown() {
    console.log('open_dropdown function')
    isHovering = true;
    popup.style.display = "block";
    popup.style.display = "flex";
    popup.style.flexDirection = "column";


    let input:any = document.getElementById('searchID');
    let inputValue:string = input.value;

    makeAjexRequest(inputValue)
};



//| Second Function
// function that executes from open_dropdown function that makes Ajex request to Django backend
function makeAjexRequest(input:string) {
    let data = input.toString();
    let newData:any = []

    // $(document).ready(function() {
    //     // Get the value from some input field, assuming it has an id="inputValue"
    
    //     // AJAX request
    //     $.ajax({
    //         url: '/search_query/',
    //         type: 'GET',
    //         data: { 'search_term': data },  // Send data to the backend
    //         dataType: 'json',
    //         success: function(data) {
    //             addElementsToDOM(data.data, input)
    //             // Handle the response data here
    //         },
    //         error: function(error) {
    //             console.log('Error:', error);
    //             // Handle the error here
    //         }
    //     });
    // });


};



//| Third Function
// Function to add elements to the DOM
function addElementsToDOM(data:any, input:any) {
    // Get the container element
    var container:any = document.getElementById("popup-element");

    let numberOfPosts:any = data[0].toString()
    let tags:any = data[1]
    
    let things:any = document.getElementById('yourLinkId');

    if (input) {
        doNothing()
    }
    else {
        // Remove all child elements from the container
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }

    main_input = input

    if (things) {


        if (input) {
            // Remove all child elements from the container
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
            
            // Remove all child elements from the container
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
            
        } else {
            // Remove all child elements from the container
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }

        }
    }



};




// what the fuck happens when the form is clicked
searchForm.addEventListener('submit', function(event:any) {
    // Prevent the default form submission behavior
    event.preventDefault();
    let stupid_value:any = document.getElementById('searchID');
    let stupid_value_value = stupid_value.value;

    let url:any = `http://127.0.0.1:8000/search/${stupid_value_value}`;


    // Redirect to the constructed URL
    window.location.href = url;

    let yes:any = getCookie('searchValue');
    
    if (yes != '') {
        // console.log('fuckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk')
        let added_:any = `${yes};${stupid_value_value}`
        updateCookie('searchValue', added_)
    } else {
        setCookie('searchValue', stupid_value_value, 1)
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
    keep_open()

});

popup.addEventListener("mouseout", function () {
    isHovering = false;
    hidePopup();
});


// function that keeps search results popup up when user hovers over results box
function open_search() {
    searchBox.style.display = 'block';
    searchBoxContainer.style.display = 'block';
};



let overly:any = document.getElementById('overlyID')
overly.addEventListener('mouseover', function() {
    popup.style.display = 'none';
});




//=================================================================
















// ???????????????????????
function show_message(message:string) {
    messages_msg.style.display = 'block';
    messages_msg.innerHTML = `<div style="
    color: white; 
    font-size: 18px; 
    padding: 10px; 
    font-family:Arial, Helvetica, sans-serif;
    ">${message}</div>`;

    setTimeout(function() {
        messages_msg.style.display = 'none';
    }, 3000);
};








// Timeout function that makes popup from messages.succss disappear????
setTimeout(function() {
    var autoDismissAlert = document.getElementById('autoDismissAlert');
    if (autoDismissAlert) {
        autoDismissAlert.remove(); // Remove the alert from the DOM
    }
}, 3000); // 5000 milliseconds (5 seconds)







//, popup 

let is_popup:boolean = false;

// checking if the user is authenticated
let authenticatedElement:any = document.getElementById('is_authenticatedID');
let authenticated:any = authenticatedElement.value;



function openMobilePopup() {
    // Create the popup element
    var popup: any = document.createElement("div");
    popup.className = "popup2";
    popup.id = "myPopup";


    // urls for development
    let posts_dev = 'http://127.0.0.1:8000/posts'
    let joins = 'http://127.0.0.1:8000/users/join/'
    let dashboard = 'http://127.0.0.1:8000/users/dashboard/'
    let submission = 'http://127.0.0.1:8000/submission/'
    let premium = 'http://127.0.0.1:8000/premium/'

    // urls for prod

    // Add content to the popup

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
    } else {
        let logout = "/users/logout_user/"

        popupMessage = `
        <h2></h2>
            <a href="${posts_dev}">Posts</a>
            <a href="${submission}">Submit</a>
            <a href="${premium}" id="popupPremium" >Premium</a>
            <a href="${dashboard}">Account</a>
            <a href="${logout}">Log Out</a>
            
        `;
    }
    popup.innerHTML = popupMessage

    // Append the popup to the body
    document.body.appendChild(popup);

    // Show the popup
    popup.style.display = "flex";
    popup.style.flexDirection = 'column';
}


function closePopup2() {
    let popup:any = document.getElementById('myPopup');
    popup.style.display = 'none';
    document.body.removeChild(popup);
}


function mobileHamburger() {
    if (!is_popup) {
        openMobilePopup()
        is_popup = true
    } else {
        closePopup2()
        is_popup = false
    }
}







// ================================ Mobile version stuff ======================================


let nameOfSite:any = document.getElementById('nameOfSite');
let nameOfSiteValue:any = nameOfSite.value;
let tagsData:any = []



function yesSIr(data:any) {

    tagsData.push(data)
}


function openMobileMenuTags() {

    let returnData:any = []

    const csrfToken:any = document.querySelector('[name=csrfmiddlewaretoken]');
    const csrfValue = csrfToken.value;

    let items:any = 'action';
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
        yesSIr(data.key)

    })
};


function close_menuTags() {
    let menuTags:any = document.getElementById('mobileMenuDropdownTAGSOID');
    menuTags.style.display = 'none';

}

let isTagsMobile_open:boolean = false;


function showMenuTags() {

    if (isTagsMobile_open === false) {
        close_menuTags();
        isTagsMobile_open = true;

    } else {
        let menuTags:any = document.getElementById('mobileMenuDropdownTAGSOID');
        menuTags.style.display = 'block';
    
        let newStuff:any = `
            ${tagsData[0]}
        `
        menuTags.innerHTML = newStuff;
        isTagsMobile_open = false;
    }


};




function open_mobile_menu1() {
    var popup12: any = document.createElement("div");
    popup12.className = "mobile_menu111";
    popup12.id = "mobile_menu111ID";

    let menu_tags:any = openMobileMenuTags();

    let popup12Message:any = `
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


    // Append the popup12 to the body
    document.body.appendChild(popup12);

    // Show the popup12
    popup12.style.display = "flex";
    popup12.style.flexDirection = 'column';
    isTagsMobile_open = true;

};


function closeMobileMenu101() {
    let popup:any = document.getElementById('mobile_menu111ID');
    popup.style.display = 'none';
    document.body.removeChild(popup);
};


function open_mobileMenu() {
    open_mobile_menu1()
};





// =================================== Mobile version footer stuff =============================================

let is_dorpDown_Open:boolean = false;

function openFooterOption(buttonNum:string) {
    let nameIus:any = `dropeurID${buttonNum}`
    let dropDown_thingyyy:any = document.getElementById(nameIus);

    if (!is_dorpDown_Open) {    
        dropDown_thingyyy.style.display = 'flex';
        dropDown_thingyyy.style.flexDirection = 'column';
        is_dorpDown_Open = true;
    } else {
        dropDown_thingyyy.style.display = 'none';
        is_dorpDown_Open = false;
    }

};















// ==================================== Mobile search bar ========================================================


// function that updates the search when user types shit in
function searchInputUpdate() {
    let mobileSearchBarID:any = document.getElementById('mobileSearchBarID');
    let searchValue:any = mobileSearchBarID.value;
    
    // here you can update the search value
}


// function that closes the mobile search bar
function close_mobileSearchBar() {
    let mobile_search_barID:any = document.getElementById('mobile_search_barID');
    mobile_search_barID.style.display = 'none';
    document.body.removeChild(mobile_search_barID);
};


// function that opens the mobile search bar for mobile narbar
function open_mobileSearch() {
    var mobileSeachBar: any = document.createElement("div");
    mobileSeachBar.className = "mobile_search_bar";
    mobileSeachBar.id = "mobile_search_barID";

    let csrf__token:any = document.getElementById('csrfTok');
    let csrf__tokenV:any = csrf__token.value;


    let popup12Message:any = `

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


    // Append the popup12 to the body
    document.body.appendChild(mobileSeachBar);

    // Show the popup12
    mobileSeachBar.style.display = "flex";
    mobileSeachBar.style.flexDirection = 'column';

};









// ======================================== Mobile Account Settings =================================================


// function that closes the mobile user settings panel
function close_mobileUser() {
    let mobile_search_barID:any = document.getElementById('mobile_userSettingID');
    document.body.removeChild(mobile_search_barID);
    mobile_search_barID.style.display = 'none';
};



// function that opens the mobile user setting panel
function open_mobileUser() {
    var mobileUserPanel: any = document.createElement("div");
    mobileUserPanel.className = "mobile_userSetting";
    mobileUserPanel.id = "mobile_userSettingID";


    let popup12Message:any = `
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


    // Append the popup12 to the body
    document.body.appendChild(mobileUserPanel);

    // Show the popup12
    mobileUserPanel.style.display = "flex";
    mobileUserPanel.style.flexDirection = 'column';
    
};







// ==================================== Updaing sexual orientation cookie ====================================




// function that changes the sexual orientation 
function change_orientation(orientation:string) {

    let theCookie:any = getCookie('orientation')

    if (theCookie != '') {
        deleteCookie('orientation')
        setCookie('orientation', orientation, 10000)
    } else {
        setCookie('orientation', orientation, 10000)
    }
    
};
