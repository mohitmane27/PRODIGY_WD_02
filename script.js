const playButton=document.getElementsByClassName("play")[0];
const lapButton=document.getElementsByClassName("lap")[0];
const resetButton=document.getElementsByClassName("reset")[0];
const second=document.getElementsByClassName("sec")[0];
const minute=document.getElementsByClassName("min")[0];
const centiSecond=document.getElementsByClassName("minsec")[0];
const clearbutton=document.getElementsByClassName("lap-clear-button")[0];
const watch=document.getElementsByClassName("watch")[0];

const bg=document.getElementsByClassName("outerCircle")[0];

const laps=document.getElementsByClassName("laps")[0];

watch.classList.remove("slide");
watch.classList.remove("slide-right");

let isPlay=false;
let secCounter = 0;
let centiCounter = 0;
let minCounter = 0;
let lapitem = 0;
let isreset = false;

const toggleButton = () => {
    lapButton.classList.remove("hidden");
    resetButton.classList.remove("hidden");
};

const play = () => {
    if (!isPlay && !isreset) {
        playButton.innerHTML = 'stop';
        bg.classList.add("animation-bg");

        min = setInterval(() => {
            minute.innerHTML = `&nbsp;${++minCounter} :`;
        }, 60 * 1000);

        sec = setInterval(() => {
            if (secCounter === 60) centiCounter = 0;
            second.innerHTML = `&nbsp;${++secCounter}`;
        }, 1000);

        centiSecondInterval = setInterval(() => {
            if (centiCounter === 100) centiCounter = 0;
            centiSecond.innerHTML = `&nbsp;${++centiCounter}`;
        }, 10);

        isPlay = true;
        isreset = true;
    } else {
        playButton.innerHTML = 'play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centiSecondInterval); // Corrected variable name
        bg.classList.remove("animation-bg");
        isPlay = false;
        isreset = false;
    }

    toggleButton();
};

const reset = () => {
    isreset = true;
    play();
    lapButton.classList.add("hidden");
    resetButton.classList.add("hidden");
    clearInterval(min);
    clearInterval(sec);
    clearInterval(centiSecondInterval); // Corrected variable name
    centiCounter = 0;
    secCounter = 0;
    minCounter = 0;
    second.innerHTML = `&nbsp;0 :`;
    centiSecond.innerHTML = `&nbsp;0`;
    minute.innerHTML = `0 :`;
    lapitem = 0;
};

const lap = () => {
    watch.classList.add("slide");
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.setAttribute("class", "lap-item");
    number.setAttribute("class", "number");
    timestamp.setAttribute("class", "time-stamp");
    number.innerText = `#${++lapitem}.`;
    timestamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;
    li.append(number, timestamp);
    laps.append(li);

    clearbutton.classList.remove("hidden");
};

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearbutton);
    clearbutton.classList.add("hidden");
    watch.classList.add("slide-right");
    watch.classList.remove("slide");

    lapitem = 0;
};

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
clearbutton.addEventListener("click", clearAll);
