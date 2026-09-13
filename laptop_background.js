const audio = document.getElementById("aud");
const wallpaper = document.getElementById("background");
const laptoptime = document.getElementById("laptoptime");
const nightcordtime = document.getElementById("nightcordtime");
const laptopday = document.getElementById("day");

const theDate = new Date(); 

function getTime() {
    const theDate = new Date(); 
    let dateString = theDate.getHours().toString().padStart(2,'0')+":"+theDate.getMinutes().toString().padStart(2,'0')+":"+theDate.getSeconds().toString().padStart(2,'0');
    laptoptime.textContent = dateString;
    setTimeout(getTime, 1000);
}

function getNightcordTime() {
    let currentTime = audio.currentTime;
    let nightcordHours;
    if (Math.floor(currentTime / 3600) >= 12) {
        nightcordHours = (Math.floor(currentTime / 3600) - 12).toString().padStart(2, '0');
        nightcordtime.textContent = nightcordHours + ":" + Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0') + "PM";
    }
    else {
        nightcordHours = Math.floor(currentTime / 3600).toString().padStart(2, '0');
        nightcordtime.textContent = nightcordHours + ":" + Math.floor((currentTime % 3600) / 60).toString().padStart(2, '0') + "AM";
    }
    setTimeout(getNightcordTime, 1000);
}

function Day(day) {
    switch (day) {
        case 0: 
            return "SUN";
        case 1: 
            return "MON";
        case 2: 
            return "TUE";
        case 3: 
            return "WED";
        case 4: 
            return "THU";
        case 5: 
            return "FRI";
        case 6: 
            return "SAT";
    }
}

function getD() {
    const theDate = new Date(); 
    let dayString = theDate.getDate() + "/" +(theDate.getMonth()+1) + " " + Day(theDate.getDay());
    laptopday.textContent = dayString;
    setTimeout(getD, 1000);
}

function setRandomPlay() {
    if (audio.readyState >= 1) {
        audio.currentTime = Math.random() * audio.duration;
        audio.play().catch(error => {
            console.log("Playback blocked, waiting for user input: ", error);
        });
        console.log("Audio playing: ", audio.paused);
    }
    else {
        audio.addEventListener("loadedmetadata", () => {
            audio.currentTime = Math.random() * audio.duration;
            audio.play().catch(error => {
                console.log("Playback blocked: waiting for user input", error)
            });
            console.log("Audio duration: ", audio.duration);
        }, { once: true });
    }
}
function playBackground(url) {
    if (wallpaper.getAttribute("src") != url) {
        wallpaper.setAttribute("src", url);
        wallpaper.load();
    }
}
function changeBackground() {
    const hours = new Date().getHours();
    if (hours >= 18 || hours < 1) {
        playBackground("https://archive.org/download/main_loop/main_loop.mp4");
    }
    else if (hours >= 1 && hours < 8) {
        playBackground("https://archive.org/download/nightcord/nightcord.mp4");
    }
    else {
        playBackground("https://archive.org/download/heat_20260912/heat.mp4");
    }
    setTimeout(changeBackground, 5 * 60 * 1000);
}
function combined() {
    setRandomPlay();
    changeBackground();
    getTime();
    getNightcordTime();
    getD();
}
document.addEventListener("DOMContentLoaded", combined);
document.addEventListener("click", () => audio.paused && audio.play().catch(error => console.log("Playback blocked: ", error)));