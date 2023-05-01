import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Timer.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Timer() {
// State variables for seconds, isActive (whether the timer is running or not), and isBreak (whether it's currently a break or work session)
const [seconds, setSeconds] = useState(25 * 60);
const [isActive, setIsActive] = useState(false);
const [isBreak, setIsBreak] = useState(false);

// Toggles the isActive state variable
function toggle() {
setIsActive(!isActive);
}

// Resets the timer to the default time (25 minutes for work, 5 minutes for breaks)
function reset() {
setSeconds(isBreak ? 5 * 60 : 25 * 60);
setIsActive(false);
}

// Toggles between work and break modes, and sets the timer to the default time for the selected mode
function toggleMode() {
setIsBreak(!isBreak);
setSeconds(isBreak ? 25 * 60 : 5 * 60);
setIsActive(false);
}

// Updates the seconds state variable every second while the timer is active, and clears the interval when the timer is paused or reaches 0 seconds
useEffect(() => {
let interval = null;
if (isActive && seconds > 0) {
interval = setInterval(() => {
setSeconds((seconds) => seconds - 1);
}, 1000);
} else if (seconds === 0) {
setIsActive(false);
}

return () => clearInterval(interval);
}, [isActive, seconds]);

// Calculates the minutes and display seconds for the timer
const minutes = Math.floor(seconds / 60);
const displaySeconds = seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;

return (
<Container className="h-100 d-flex flex-column justify-content-center align-items-center">
<Row className="justify-content-center">
<Col xs="auto">
<div className="timer-container text-center">
<div className="time-display">
{minutes}:{displaySeconds}
</div>
<ButtonGroup className="mb-2">
<Button
variant={isActive ? "danger rounded-3" : "primary rounded-3"}
onClick={toggle}
>
{isActive ? "Pause" : "Start"}
</Button>
<Button
             variant="primary rounded-3"
             onClick={reset}
           >
Reset
</Button>
<Button
variant={isBreak ? "danger rounded-3" : "success rounded-3"}
onClick={toggleMode}
>
{isBreak ? "Work" : "Break"}
</Button>
</ButtonGroup>
</div>
</Col>
</Row>
</Container>
);
}

export default Timer;