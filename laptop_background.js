const audio = document.getElementById("aud");
const wallpaper = document.getElementById("background");

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
document.addEventListener("DOMContentLoaded", setRandomPlay);
document.addEventListener("DOMContentLoaded", changeBackground);
document.addEventListener("click", () => audio.paused && audio.play().catch(error => console.log("Playback blocked: ", error)));