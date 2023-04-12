import React from "react";
import NavBar from "./NavBar/NavBar";

function WeeklyPage({ todos = [] }) {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function getTasksForDay(day) {
    return todos.filter((todo) => todo.days.includes(day));
  }

  return (
    <div>
      <NavBar />
      <h1>Weekly Page</h1>
      <p>This is the Weekly page.</p>
      {daysOfWeek.map((day) => (
        <div key={day}>
          <h2>{day}</h2>
          <ul>
            {getTasksForDay(day).map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default WeeklyPage;
