import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../NavBar/NavBar';
import Timer from './Timer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RechartsLineChart from './RechartsLineChart';
import moment from 'moment';

function TodayPage({ todos = [], setTodos, timerSettings}) {
  const [selectedTask, setSelectedTask] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("week");
  const [filteredChartData, setFilteredChartData] = useState([]);

  const [selectedTaskForStats, setSelectedTaskForStats] = useState(""); // Add this line
  
 


  function handleTaskChangeForStats(event) {
    setSelectedTaskForStats(event.target.value); // Add this function
  }

  const filterChartData = useCallback(() => {
    if (!selectedTaskForStats) { // Change this line
      setFilteredChartData([]);
      return;
    }

    const task = todos.find((task) => task.id === selectedTaskForStats); // Change this line
    const taskTimeLogged = task.timeLogged || [];

    const today = moment();
    const startDate = moment(today);

    if (selectedTimeFrame === "week") {
      startDate.subtract(7, "days");
    } else if (selectedTimeFrame === "month") {
      startDate.subtract(1, "months");
    }

    const filteredData = taskTimeLogged
      .filter((log) => moment(log.date).isSameOrAfter(startDate))
      .map((log) => ({
        date: log.date,
        hours: log.time,
      }));

    setFilteredChartData(filteredData);
  },[todos, selectedTask, selectedTimeFrame]);

  useEffect(() => {
    filterChartData();
  }, [filterChartData]);


  function handleTaskChange(event) {
    setSelectedTask(event.target.value);
  }

  function handleHoursChange(event) {
    const hours = Number(event.target.value);
    if (hours >= 0 && hours <= 24) {
      setHoursWorked(hours);
    }
  }
  

  function handleTimeLog(taskId, time) {
    const task = todos.find((task) => task.id === taskId);
  
    // Add this check to ensure that the task is defined
    if (!task) {
      console.error('Task not found:', taskId);
      return;
    }
  
    const currentDate = moment().format("YYYY-MM-DD");
    const timeLogged = task.timeLogged || [];
  
    // Check if there is already a data entry for the selected task on the current date
    const existingTimeLog = timeLogged.find((log) => log.date === currentDate);
  
    if (existingTimeLog) {
      // Add the new time to the existing time
      const newTime = existingTimeLog.time + time;
      if (newTime <= 24) {
        existingTimeLog.time = newTime;
      } else {
        alert('Cannot log more than 24 hours a day');
        return;
      }
    } else {
      // Add a new data entry for the selected task on the current date
      const newTimeLogged = {
        date: currentDate,
        time: time,
        taskName: task.name,
      };
      timeLogged.push(newTimeLogged);
    }
  
    const newTodos = todos.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          timeLogged: timeLogged,
        };
      } else {
        return task;
      }
    });
    setTodos(newTodos);
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
    
    handleTimeLog(selectedTask, hoursWorked);
    const task = todos.find((task) => task.id === selectedTask);
    const currentDate = moment().format("YYYY-MM-DD");
    const newChartDataItem = {
      taskName: task.name,
      date: currentDate,
      hours: hoursWorked,
    };
    setChartData([...chartData, newChartDataItem]);
    setHoursWorked(0);
  }

  function handleClearHours(taskId) {
    const newTodos = todos.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          timeLogged: [],
        };
      } else {
        return task;
      }
    });
    setTodos(newTodos);
  }
  
  

  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
              {/* <Timer onTimeLog={(time) => handleTimeLog(selectedTask, time)} /> */}
              <Timer
  onTimeLog={(time) => handleTimeLog(selectedTask, time)}
  workTime={timerSettings.workTime}
  shortBreakTime={timerSettings.shortBreakTime}
  longBreakTime={timerSettings.longBreakTime}
/>

{/* Add a new select element for the statistics */}
        <div className="mt-3">
          <p>Select a task for statistics:</p>
          <select
            value={selectedTaskForStats}
            onChange={handleTaskChangeForStats}
            className="form-select"
          >
            <option value="">--Select a task--</option>
            {todos.map((task) => (
              <option key={task.id} value={task.id}>
                {task.name}
              </option>
            ))}
          </select>
        </div>
              
            </div>
          </Col>
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
              <p>Select a task:</p>
              <select
                value={selectedTask}
                onChange={handleTaskChange}
                className="form-select"
              >
                <option value="">--Select a task--</option>
                {todos.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
              <form onSubmit={handleHoursSubmit}>
                <label htmlFor="hours-input" className="form-label mt-3">
                  Hours worked today:
                </label>
                <input
                  type="number"
                  id="hours-input"
                  className="form-control"
                  value={hoursWorked}
                  onChange={handleHoursChange}
                />
                <button type="submit" className="btn btn-primary mt-3">
                  Log hours
                </button>
              </form>
            </div>
          </Col>
        </Row>
  
        <div>
        <button onClick={() => handleClearHours(selectedTask)}>Clear Hours Worked</button>



  <button
    onClick={() =>
      setSelectedTimeFrame(
        selectedTimeFrame === "week" ? "month" : "week"
      )
    }
  >
    Show {selectedTimeFrame === "week" ? "month" : "week"}
  </button>
  {/* Always render the RechartsLineChart component */}
  <RechartsLineChart chartData={filteredChartData} />
</div>

      </Container>
    </div>
  )};
  export default  TodayPage;