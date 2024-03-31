let videoNum1:string = '';



let openedBox:boolean = false;
let currentOpen:any = [];

function openPostOptions(id:any) {
    let postID:string = 'settingsDropdownID' + id;
    let optionsBox:any = document.getElementById(postID);
    currentOpen.push(postID)
    let currentSelected = currentOpen[0]


    if (openedBox == false) {
            optionsBox.style.display = 'block';
            openedBox = true;
    } else {
        optionsBox.style.display = 'none';
        openedBox = false;
    }
}







//==========================================================================================================================================
//, video controls settings

//| video that is currently playing
let currentPlaying:any = [];

//| variable to hold boolean that determines if video is playing
let isPlaying:boolean = false; 

//| variable to hold boolean that determines if video controls is hovering
let video_controlsID_hovering:boolean = false;



function play_(id:any) {
    // play screen button 
    let playButton:any = document.getElementById(`playScreenButton${id}`);
    // pause screen button 
    let pauseButton:any = document.getElementById(`pauseScreenButton${id}`);
    // video controls play button
    let vc_playButton:any = document.getElementById(`btn-play${id}`);
    // video controls pause button
    let vc_pauseButton:any = document.getElementById(`btn-pause${id}`);


    // video element
    let video:any = document.getElementById(`Myvideo${id}`);

    // hide play button
    playButton.style.display = 'none';
    // hide pause button
    pauseButton.style.display = 'none';
    // hide vc play button
    vc_playButton.style.display = 'none';
    // display vc pause button
    vc_pauseButton.style.display = 'inline-block';

    // play current video
    video.play();

    // update currentPlaying array
    currentPlaying.length = 0;
    currentPlaying.push(id);

    isPlaying = true;
};


function pause_(id:any) {
    // pause screen button 
    let pauseButton:any = document.getElementById(`pauseScreenButton${id}`);
    // video controls play button
    let vc_playButton:any = document.getElementById(`btn-play${id}`);
    // video controls pause button
    let vc_pauseButton:any = document.getElementById(`btn-pause${id}`);

    // video element
    let video:any = document.getElementById(`Myvideo${id}`);

    // hide pause button
    pauseButton.style.display = 'block';
    // hide vc play button
    vc_playButton.style.display = 'inline-block';
    // display vc pause button
    vc_pauseButton.style.display = 'none';

    // pause current video
    video.pause();

    // update currentPlaying
    currentPlaying.length = 0;

    isPlaying = false;
}


//* function for when video background/video is clicked
function clickedVideoOverly(id:any) {

    if (video_controlsID_hovering) {
        doNothing()
    } else {
        //* check if another video is playing
        let currentlyPlaying:string = currentPlaying[0] //. will return 'undefined' or ID number of current video playing

        // current video wants to be paused
        if (currentlyPlaying == id) {
            // console.log(`video ${currentlyPlaying} is playing and wants to be paused ${id}`);
            pause_(id)

        } 

        // video 1 is playing but video 2 wants to play
        else if (currentlyPlaying) {
            // console.log(`video ${currentlyPlaying} is playing but ${id} wants to play`)

            // console.log(`pause video ${currentlyPlaying}`);
            pause_(currentlyPlaying);
            // console.log(`play video ${id}`);
            play_(id)
        }

        // play video
        else {
            // console.log(`play video ${id}`)
            play_(id);
        }

        }

};



//. function to show video controls
function ShowVideoControls(id:any) {
    // get video controls element 
    let VideoControls:any = document.getElementById(`video_controlsID${id}`);
    VideoControls.style.display = 'flex';
};


//. function to hide video controls
function HideVideoControls(id:any) {
    // get video controls element 
    let VideoControls:any = document.getElementById(`video_controlsID${id}`);
    VideoControls.style.display = 'none';
};




//* function for when video background/video is mouseover
function mouseOverOverly(id:any) {
    // updating video_controlsID_hovering
    video_controlsID_hovering = true;
};



//* function for when video background/video is mouseleave
function mouseLeaveOverly(id:any) {
    // updating video_controlsID_hovering
    video_controlsID_hovering = false;
};




// =================

//. function that plays the video from video controls 
function vc_play(id:any) {

    // play screen button 
    let playButton:any = document.getElementById(`playScreenButton${id}`);
    // pause screen button 
    let pauseButton:any = document.getElementById(`pauseScreenButton${id}`);

    // video controls play button
    let vc_playButton:any = document.getElementById(`btn-play${id}`);

    // video controls pause button
    let vc_pauseButton:any = document.getElementById(`btn-pause${id}`);


    // video element
    let video:any = document.getElementById(`Myvideo${id}`);

    // hide play button
    playButton.style.display = 'none';
    // hide pause button
    pauseButton.style.display = 'none';

    vc_playButton.style.display = 'none';

    vc_pauseButton.style.display = 'inline-block';

    // play current video
    video.play();

    // update currentPlaying array
    currentPlaying.length = 0;
    currentPlaying.push(id);

    isPlaying = true;

};


//. function that pause the video from video controls 
function vc_pause(id:any) {

    // play screen button 
    let playButton:any = document.getElementById(`playScreenButton${id}`);
    // pause screen button 
    let pauseButton:any = document.getElementById(`pauseScreenButton${id}`);

    // video controls play button
    let vc_playButton:any = document.getElementById(`btn-play${id}`);

    // video controls pause button
    let vc_pauseButton:any = document.getElementById(`btn-pause${id}`);


    // video element
    let video:any = document.getElementById(`Myvideo${id}`);

    // hide play button
    playButton.style.display = 'none';
    // hide pause button
    pauseButton.style.display = 'none';

    // vc play button
    vc_playButton.style.display = 'inline-block';
    // vc pause button
    vc_pauseButton.style.display = 'none';

    // play current video
    video.pause();

    // update currentPlaying array
    currentPlaying.length = 0;

    isPlaying = false;
};




// video controls play button
function VC_playButton(id:any) {
    //* check if another video is playing
    let currentlyPlaying:string = currentPlaying[0] //. will return 'undefined' or ID number of current video playing

    if (currentlyPlaying == id) {
        vc_pause(id);

    } else if (currentlyPlaying) {
        vc_pause(currentlyPlaying);
        vc_play(id)
    } else {
        vc_play(id);
    };

};


// video controls pause button
function VC_pauseButton(id:any) {
    //* check if another video is playing
    let currentlyPlaying:string = currentPlaying[0] //. will return 'undefined' or ID number of current video playing

    if (currentlyPlaying == id) {
        vc_pause(id);
    } else if (currentlyPlaying) {
        vc_pause(currentlyPlaying);
        vc_play(id)
    } else {
        vc_play(id);
    };



};





// video controls mute on button
function VC_muteOn(id:any) {
    // mute on button
    let muteOn:any = document.getElementById(`btn-unmute${id}`);
    // mute off button
    let muteOff:any = document.getElementById(`btn-m-off${id}`);

    // video element
    let video:any = document.getElementById(`Myvideo${id}`);

    // hiding mute on button
    muteOn.style.display = 'none';

    // showing mute off button
    muteOff.style.display = 'inline-block';

    video.muted = true;

};

// video controls mute off button
function VC_muteOff(id:any) {
    // mute on button
    let muteOn:any = document.getElementById(`btn-unmute${id}`);
    // mute off button
    let muteOff:any = document.getElementById(`btn-m-off${id}`);

    // video element
    let video:any = document.getElementById(`Myvideo${id}`);

    // hiding mute on button
    muteOn.style.display = 'inline-block';

    // showing mute off button
    muteOff.style.display = 'none';

    video.muted = false;

};



// video controls rewind button
function VC_rewind(id:any) {
    // video element
    let video:any = document.getElementById(`Myvideo${id}`);

    video.currentTime = 0;
}



// video controls download button
function VC_download(id:any, username:any) {

    videoNum1 = id;

    let video:any = document.getElementById(`Myvideo${id}`)
    video.pause();


    if (username != '') {
        // send data to backend to prove premium stuff
        // UserNeedLogin('Only premium members can download videos', 
        // "If you want to download videos, you can try an ad free experience with downloadable content by getting RM premium.")
        create_popup(
            username, 
            'Only premium members can download videos', 
            'If you want to download videos, you can try an ad free experience with downloadable content by getting RM premium.',
            '#',
            'premium'
        );
    } else {
        create_popup(
            username, 
            'Only premium members can download videos', 
            'If you want to download videos, you can try an ad free experience with downloadable content by getting RM premium.',
            '#',
            'premium'
        );
    }
}








let isFullScreen = false;


function exitFS(id:any) {

    try {
        if ((document as any).exitFullscreen) {
            (document as any).exitFullscreen();
        } else if ((document as any).msExitFullscreen) {
            (document as any).msExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
            (document as any).mozCancelFullScreen();
        } else if ((document as any).webkitExitFullscreen) {
            (document as any).webkitExitFullscreen();
        }
    } catch (error) {
        console.error("Error exiting fullscreen:", error);
    }
    isFullScreen = false;

}


function enterFS(element:any, secondElement:any) {
    secondElement.controls = false;

    if (element.requestFullscreen) {
      element.requestFullscreen();
      secondElement.style.height = '100%';
      isFullScreen = true;


    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
      secondElement.style.height = '100%';
      isFullScreen = true;


    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
      secondElement.style.height = '100%';
      isFullScreen = true;


    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
      secondElement.style.height = '100%';
      isFullScreen = true;
    }
};




// current full screen
let currentFullScreen:string = ''



function enterFullScreen(id:any) {
    currentFullScreen = id;
    // getting video element
    let video_element:any = document.getElementById(`video_stale_backgroundID${id}`);

    // getting video controls element
    let video_controls:any = document.getElementById(`video_controlsID${id}`);

    // getting screen buttons
    let enterFullScreenButton:any = document.getElementById(`btn-f${id}`);
    let exitFullScreenButton:any = document.getElementById(`btn-xf${id}`);


    enterFullScreenButton.style.display = 'none';
    exitFullScreenButton.style.display = 'inline-block';

    // getting video 
    let video:any = document.getElementById(`Myvideo${id}`)

    enterFS(video_element, video);
    isFullScreen = true;

}




function exitFullScreen(id:any) {
    // getting video 
    let video:any = document.getElementById(`Myvideo${id}`);
    video.style.height = '300px';


    // getting screen buttons
    let enterFullScreenButton:any = document.getElementById(`btn-f${id}`);
    let exitFullScreenButton:any = document.getElementById(`btn-xf${id}`);


    enterFullScreenButton.style.display = 'inline-block';
    exitFullScreenButton.style.display = 'none';

    exitFS(id);
    isFullScreen = false;

}


//= handling key events
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        doNothing()
    } else {
        let video:any = document.getElementById(`Myvideo${currentFullScreen}`);
        video.style.height = '300px';
    
    
        // getting screen buttons
        let enterFullScreenButton:any = document.getElementById(`btn-f${currentFullScreen}`);
        let exitFullScreenButton:any = document.getElementById(`btn-xf${currentFullScreen}`);
    
    
        enterFullScreenButton.style.display = 'inline-block';
        exitFullScreenButton.style.display = 'none';
    
        isFullScreen = false;
        
    }
});













