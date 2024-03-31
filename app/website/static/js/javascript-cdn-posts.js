"use strict";
let videoNum1 = '';
let openedBox = false;
let currentOpen = [];
function openPostOptions(id) {
    let postID = 'settingsDropdownID' + id;
    let optionsBox = document.getElementById(postID);
    currentOpen.push(postID);
    let currentSelected = currentOpen[0];
    if (openedBox == false) {
        optionsBox.style.display = 'block';
        openedBox = true;
    }
    else {
        optionsBox.style.display = 'none';
        openedBox = false;
    }
}
let currentPlaying = [];
let isPlaying = false;
let video_controlsID_hovering = false;
function play_(id) {
    let playButton = document.getElementById(`playScreenButton${id}`);
    let pauseButton = document.getElementById(`pauseScreenButton${id}`);
    let vc_playButton = document.getElementById(`btn-play${id}`);
    let vc_pauseButton = document.getElementById(`btn-pause${id}`);
    let video = document.getElementById(`Myvideo${id}`);
    playButton.style.display = 'none';
    pauseButton.style.display = 'none';
    vc_playButton.style.display = 'none';
    vc_pauseButton.style.display = 'inline-block';
    video.play();
    currentPlaying.length = 0;
    currentPlaying.push(id);
    isPlaying = true;
}
;
function pause_(id) {
    let pauseButton = document.getElementById(`pauseScreenButton${id}`);
    let vc_playButton = document.getElementById(`btn-play${id}`);
    let vc_pauseButton = document.getElementById(`btn-pause${id}`);
    let video = document.getElementById(`Myvideo${id}`);
    pauseButton.style.display = 'block';
    vc_playButton.style.display = 'inline-block';
    vc_pauseButton.style.display = 'none';
    video.pause();
    currentPlaying.length = 0;
    isPlaying = false;
}
function clickedVideoOverly(id) {
    if (video_controlsID_hovering) {
        doNothing();
    }
    else {
        let currentlyPlaying = currentPlaying[0];
        if (currentlyPlaying == id) {
            pause_(id);
        }
        else if (currentlyPlaying) {
            pause_(currentlyPlaying);
            play_(id);
        }
        else {
            play_(id);
        }
    }
}
;
function ShowVideoControls(id) {
    let VideoControls = document.getElementById(`video_controlsID${id}`);
    VideoControls.style.display = 'flex';
}
;
function HideVideoControls(id) {
    let VideoControls = document.getElementById(`video_controlsID${id}`);
    VideoControls.style.display = 'none';
}
;
function mouseOverOverly(id) {
    video_controlsID_hovering = true;
}
;
function mouseLeaveOverly(id) {
    video_controlsID_hovering = false;
}
;
function vc_play(id) {
    let playButton = document.getElementById(`playScreenButton${id}`);
    let pauseButton = document.getElementById(`pauseScreenButton${id}`);
    let vc_playButton = document.getElementById(`btn-play${id}`);
    let vc_pauseButton = document.getElementById(`btn-pause${id}`);
    let video = document.getElementById(`Myvideo${id}`);
    playButton.style.display = 'none';
    pauseButton.style.display = 'none';
    vc_playButton.style.display = 'none';
    vc_pauseButton.style.display = 'inline-block';
    video.play();
    currentPlaying.length = 0;
    currentPlaying.push(id);
    isPlaying = true;
}
;
function vc_pause(id) {
    let playButton = document.getElementById(`playScreenButton${id}`);
    let pauseButton = document.getElementById(`pauseScreenButton${id}`);
    let vc_playButton = document.getElementById(`btn-play${id}`);
    let vc_pauseButton = document.getElementById(`btn-pause${id}`);
    let video = document.getElementById(`Myvideo${id}`);
    playButton.style.display = 'none';
    pauseButton.style.display = 'none';
    vc_playButton.style.display = 'inline-block';
    vc_pauseButton.style.display = 'none';
    video.pause();
    currentPlaying.length = 0;
    isPlaying = false;
}
;
function VC_playButton(id) {
    let currentlyPlaying = currentPlaying[0];
    if (currentlyPlaying == id) {
        vc_pause(id);
    }
    else if (currentlyPlaying) {
        vc_pause(currentlyPlaying);
        vc_play(id);
    }
    else {
        vc_play(id);
    }
    ;
}
;
function VC_pauseButton(id) {
    let currentlyPlaying = currentPlaying[0];
    if (currentlyPlaying == id) {
        vc_pause(id);
    }
    else if (currentlyPlaying) {
        vc_pause(currentlyPlaying);
        vc_play(id);
    }
    else {
        vc_play(id);
    }
    ;
}
;
function VC_muteOn(id) {
    let muteOn = document.getElementById(`btn-unmute${id}`);
    let muteOff = document.getElementById(`btn-m-off${id}`);
    let video = document.getElementById(`Myvideo${id}`);
    muteOn.style.display = 'none';
    muteOff.style.display = 'inline-block';
    video.muted = true;
}
;
function VC_muteOff(id) {
    let muteOn = document.getElementById(`btn-unmute${id}`);
    let muteOff = document.getElementById(`btn-m-off${id}`);
    let video = document.getElementById(`Myvideo${id}`);
    muteOn.style.display = 'inline-block';
    muteOff.style.display = 'none';
    video.muted = false;
}
;
function VC_rewind(id) {
    let video = document.getElementById(`Myvideo${id}`);
    video.currentTime = 0;
}
function VC_download(id, username) {
    videoNum1 = id;
    let video = document.getElementById(`Myvideo${id}`);
    video.pause();
    if (username != '') {
        create_popup(username, 'Only premium members can download videos', 'If you want to download videos, you can try an ad free experience with downloadable content by getting RM premium.', '#', 'premium');
    }
    else {
        create_popup(username, 'Only premium members can download videos', 'If you want to download videos, you can try an ad free experience with downloadable content by getting RM premium.', '#', 'premium');
    }
}
let isFullScreen = false;
function exitFS(id) {
    try {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
    catch (error) {
        console.error("Error exiting fullscreen:", error);
    }
    isFullScreen = false;
}
function enterFS(element, secondElement) {
    secondElement.controls = false;
    if (element.requestFullscreen) {
        element.requestFullscreen();
        secondElement.style.height = '100%';
        isFullScreen = true;
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
        secondElement.style.height = '100%';
        isFullScreen = true;
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
        secondElement.style.height = '100%';
        isFullScreen = true;
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
        secondElement.style.height = '100%';
        isFullScreen = true;
    }
}
;
let currentFullScreen = '';
function enterFullScreen(id) {
    currentFullScreen = id;
    let video_element = document.getElementById(`video_stale_backgroundID${id}`);
    let video_controls = document.getElementById(`video_controlsID${id}`);
    let enterFullScreenButton = document.getElementById(`btn-f${id}`);
    let exitFullScreenButton = document.getElementById(`btn-xf${id}`);
    enterFullScreenButton.style.display = 'none';
    exitFullScreenButton.style.display = 'inline-block';
    let video = document.getElementById(`Myvideo${id}`);
    enterFS(video_element, video);
    isFullScreen = true;
}
function exitFullScreen(id) {
    let video = document.getElementById(`Myvideo${id}`);
    video.style.height = '300px';
    let enterFullScreenButton = document.getElementById(`btn-f${id}`);
    let exitFullScreenButton = document.getElementById(`btn-xf${id}`);
    enterFullScreenButton.style.display = 'inline-block';
    exitFullScreenButton.style.display = 'none';
    exitFS(id);
    isFullScreen = false;
}
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        doNothing();
    }
    else {
        let video = document.getElementById(`Myvideo${currentFullScreen}`);
        video.style.height = '300px';
        let enterFullScreenButton = document.getElementById(`btn-f${currentFullScreen}`);
        let exitFullScreenButton = document.getElementById(`btn-xf${currentFullScreen}`);
        enterFullScreenButton.style.display = 'inline-block';
        exitFullScreenButton.style.display = 'none';
        isFullScreen = false;
    }
});
