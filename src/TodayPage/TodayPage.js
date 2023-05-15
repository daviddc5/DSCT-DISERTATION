import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Timer from "./Timer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";

function TodayPage({ todos, setTodos, timerSettings, chartData, setChartData }) {
  const [selectedTask, setSelectedTask] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0);

  // Task change for logging hours
  function handleTaskChange(event) {
    setSelectedTask(event.target.value);
  }

  // Changes hours based on input depending on range
  function handleHoursChange(event) {
    
    const hours = Number(event.target.value);
    if (hours >= 0 && hours <= 24) {
      setHoursWorked(hours);
    }
  }

  function handleHoursSubmit(event) {

   
    event.preventDefault();
    if (!selectedTask) {
      alert("Please select a task");
      return;
    }
    if (hoursWorked > 24) {
      alert("Cannot log more than 24 hours a day");
      return;
    }
  
    const task = todos.find((task) => task.id === selectedTask);
    const currentDate = moment().format("YYYY-MM-DD");
    const timeLogged = task.timeLogged || [];
  
    const existingTimeLog = timeLogged.find((log) => log.date === currentDate);
  
    if (existingTimeLog) {
      const newTime = existingTimeLog.time + hoursWorked;
      if (newTime <= 24) {
        existingTimeLog.time = newTime;
      } else {
        alert("Cannot log more than 24 hours a day");
        return;
      }
    } else {
      const newTimeLogged = {
        date: currentDate,
        time: hoursWorked,
        taskName: task.name,
      };
      timeLogged.push(newTimeLogged);
    }
  
    const newTodos = todos.map((task) => {
      if (task.id === selectedTask) {
        return {
          ...task,
          timeLogged: timeLogged,
        };
      } else {
        return task;
      }
    });
  
    setTodos(newTodos);
    setHoursWorked(0);
  
    const updatedChartData = [...chartData];
    const existingChartData = updatedChartData.find((data) => data.taskName === task.name && data.date === currentDate);
  
    if (existingChartData) {
      existingChartData.hours += hoursWorked;
    } else {
      updatedChartData.push({
        date: currentDate,
        taskName: task.name,
        hours: hoursWorked,
      });
    }
  
    setChartData(updatedChartData);
  }

  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
            <h3>Work Session Timer</h3>
              <Timer
                workTime={timerSettings.workTime}
                shortBreakTime={timerSettings.shortBreakTime}
                longBreakTime={timerSettings.longBreakTime}
              />
            </div>
          </Col>
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
            <h3>Log Hours worked on a task  </h3>
              <select
                value={selectedTask}
                onChange={handleTaskChange}
                className="form-select"
              >
                <option value="">--Select a task--</option>
                {todos
                  .filter(
                    (task) =>
                      task.days.includes(moment().format("dddd")) && task.isActive
                  )
                  .map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.name}
                    </option>
                  ))}
              </select>
              
              <form onSubmit={handleHoursSubmit} className="mt-3">
                <label htmlFor="hoursWorked">Hours worked:</label>
                <input
                  type="number"
                  id="hoursWorked"
                  value={hoursWorked}
                  onChange={handleHoursChange}
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary mt-3">
                  Log hours
                </button>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
  }
  export default TodayPage;
  