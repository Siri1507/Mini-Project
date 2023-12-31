let timer;
let minutes = 25;
let seconds = 0;
let points = 0;
let currentTaskName = "";

function startPomodoro() {
    // Set the task name
    currentTaskName = document.getElementById('taskName').value;

    // Check if a task name is provided
    if (!currentTaskName) {
        alert("Please enter a task name before starting the timer.");
        return;
    }

    // Reset points for a new task
    points = 0;

    // Start the timer
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        completeTask();
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        updateTimerDisplay();
    }
}

function updateTimerDisplay() {
    const timerDisplay = document.getElementById('timer');
    timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetPomodoro() {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
}

function completeTask() {
    clearInterval(timer);
    minutes = 25;
    seconds = 0;
    updateTimerDisplay();
    resetPomodoro();

    // Clear the task name input
    document.getElementById('taskName').value = "";
}
function completeTask() {
    // Assuming you have variables like 'currentTaskName' and 'timeTaken' set in your script.js
    // ...

    // Create an XMLHttpRequest object
    var xhr = new XMLHttpRequest();

    // Set up a POST request to your PHP script
    xhr.open("POST", "saveTask.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    // Set up the data to be sent
    var data = "taskName=" + encodeURIComponent(currentTaskName) + "&timeTaken=" + encodeURIComponent(timeTaken);

    // Define the callback function to handle the response
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Display the response from the PHP script (e.g., "Task saved successfully")
            alert(xhr.responseText);
        }
    };

    // Send the request with the data
    xhr.send(data);
}
