// Utility functions

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function selectById(selector, parent = document) {
    return parent.getElementById(selector);
}

function print(...args) {
    console.log(args.join(', '));
}


// Main Code
let currentHour = 0;
let currentMinutes = 0;
let userHour = 0;
let userMinutes = 0;

const realTime = selectById('real-time');
const selectedAlarm = select('.selected-alarm');
const inputHour = select('.input-hour');
const inputMinutes = select('.input-minutes');
const btnSetAlarm = select('.btn-set-alarm');
const alarmSound = new Audio('./assets/audio/alarm-sound.mp3');


function getCurrentTime() {
    const today = new Date();
    currentHour = today.getHours();
    currentMinutes = today.getMinutes();
    const seconds = today.getSeconds();

    const formattedTime = `${keepTimeWithTwoDigits(currentHour)}:${keepTimeWithTwoDigits(currentMinutes)}:${keepTimeWithTwoDigits(seconds)}`;
    selectById('realTime').textContent = formattedTime;
}

function setAlarm() {
    onEvent('click', btnSetAlarm, (event) => {
        event.preventDefault();

        userHour = inputHour.value;
        userMinutes = inputMinutes.value;

        userHour = keepTimeWithTwoDigits(userHour);
        userMinutes = keepTimeWithTwoDigits(userMinutes);

        selectedAlarm.innerHTML = `<i class="fa-solid fa-bell"></i> ${userHour}:${userMinutes}`;

        checkAlarm();
    });
}

function checkAlarm() {
    const userHourInt = parseInt(userHour, 10);
    const userMinutesInt = parseInt(userMinutes, 10);

    if (currentHour === userHourInt && currentMinutes === userMinutesInt) {
        alarmSound.play();
    }
    //just to check
    print(`Current time: ${currentHour}:${currentMinutes}`);
    print(`Alarm set to: ${userHour}:${userMinutes}`); 
}

function keepTimeWithTwoDigits(i) {
    return String(i).padStart(2, '0');
}

function validateInput () {
    //unfortnatelly i couldnt finish this yet.
}

setInterval(getCurrentTime, 1000);
setInterval(checkAlarm, 1000);
setAlarm();
getCurrentTime();
