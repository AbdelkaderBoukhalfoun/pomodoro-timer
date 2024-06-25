// Variables
let workTittle = document.getElementById('work');
let breakTittle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00";
let breakCount = 0;
let intervalId; // Variable to hold the interval ID for timer

// Load notification sound
let notificationSound = new Audio('./new-notification-7-210334.mp3'); //  Audio File

// Notification details
let notificationTitle = 'Break Time!'; // The Title Of The Notification
let notificationBody = 'Time to take a break.'; // The Main Text Of The Notification
let notificationIcon = './food.png'; // The Icon Of Notification

// Display initial time
window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTittle.classList.add('active');

    // Request notification permission
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            }
        });
    }
}

// Start timer function
function start() {
    // Change button display
    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // Initialize time variables
    let workMinutes = workTime - 1;
    let breakMinutes = breakTime - 1;
    seconds = 59;

    breakCount = 0;

    // Countdown function
    function timerFunction() {
        // Display current time
        document.getElementById('minutes').innerHTML = workMinutes;
        document.getElementById('seconds').innerHTML = seconds;

        // Decrease seconds
        seconds--;

        // Check if time is up
        if (seconds < 0) {
            workMinutes--;

            // Switch between work and break periods
            if (workMinutes < 0) {
                if (breakCount % 2 === 0) {
                    // Notify and switch to break
                    workMinutes = breakMinutes;
                    breakCount++;
                    workTittle.classList.remove('active');
                    breakTittle.classList.add('active');

                    // Play sound and show notification
                    notificationSound.play();
                    showNotification(notificationTitle, notificationBody);
                } else {
                    workMinutes = workTime;
                    breakCount++;
                    breakTittle.classList.remove('active');
                    workTittle.classList.add('active');
                }
            }

            seconds = 59;
        }
    }

    // Start timer
    intervalId = setInterval(timerFunction, 1000);
}

// Reset timer function
function resetTimer() {
    // Stop the timer (if it's running)
    clearInterval(intervalId);

    // Reset displayed time to initial values
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = "00";

    // Reset button display
    document.getElementById('start').style.display = "block";
    document.getElementById('reset').style.display = "none";

    // Reset panel to 'work' and set initial state
    workTittle.classList.add('active');
    breakTittle.classList.remove('active');
    
    // Reset variables
    seconds = "00"; // Reset seconds to "00"
    breakCount = 0;
}

// Function to show notification
function showNotification(title, body) {
    if (Notification.permission === 'granted') {
        new Notification(title, { body: body, icon: notificationIcon });
    }
}


