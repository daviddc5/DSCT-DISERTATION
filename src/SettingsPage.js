import React, { useState} from "react";
import NavBar from "./NavBar/NavBar";


function SettingsPage({ onSettingsChange }) {
  const [workTime, setWorkTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);

  const timerSettings = {
    workTime: workTime,
    shortBreakTime: shortBreakTime,
    longBreakTime: longBreakTime
  };

  function handleWorkTimeChange(event) {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setWorkTime(value);
      onSettingsChange({ timerSettings: { ...timerSettings, workTime: value } });
    }
  }

  function handleShortBreakTimeChange(event) {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setShortBreakTime(value);
      onSettingsChange({ timerSettings: { ...timerSettings, shortBreakTime: value } });
    }
  }

  function handleLongBreakTimeChange(event) {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setLongBreakTime(value);
      onSettingsChange({ timerSettings: { ...timerSettings, longBreakTime: value } });
    }
  }





  return (
    <div>
      <NavBar />
      <h1>Settings Page</h1>
      <label htmlFor="workTimeInput">Work Time (in minutes):</label>
      <input
        id="workTimeInput"
        type="number"
        value={workTime}
        onChange={handleWorkTimeChange}
      />

      <label htmlFor="shortBreakTimeInput">Short Break Time (in minutes):</label>
      <input
        id="shortBreakTimeInput"
        type="number"
        value={shortBreakTime}
        onChange={handleShortBreakTimeChange}
      />

      <label htmlFor="longBreakTimeInput">Long Break Time (in minutes):</label>
      <input
        id="longBreakTimeInput"
        type="number"
        value={longBreakTime}
        onChange={handleLongBreakTimeChange}
      />

      
    </div>
  );
}

export default SettingsPage;
