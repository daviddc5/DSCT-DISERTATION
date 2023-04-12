import React from "react";
import NavBar from "./NavBar/NavBar";
import "./WeeklyPage.css"

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

<div className="container" style={{ marginTop: "20px" }}>
<div className="legend">
<span className="badge short-term mr-2">Short-term</span>
<span className="badge long-term">Long-term</span>
</div>

</div>

      
      <div className="container" style={{ marginTop: "30px" }}> {/* Add inline styles for margin-top */}
        <div className="row">
          {daysOfWeek.map((day) => (
            <div key={day} className="col-lg-4 col-md-6 col-sm-12 mb-4">
              <div className="card">
                <div className="card-header">
                  <h2>{day}</h2>
                </div>
                <ul className="list-group list-group-flush">
                  {getTasksForDay(day).map((task) => (
                    <li
                      key={task.id}
                      className={`list-group-item ${task.goalType}`}
                    >
                      {task.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyPage;
