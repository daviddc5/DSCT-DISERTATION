import React, { useState, useEffect, useCallback} from "react";
import NavBar from "../NavBar/NavBar";
import Timer from "./Timer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import RechartsLineChart from "./RechartsLineChart";



function TodayPage({ todos, setTodos, timerSettings, chartData, setChartData }) {

  const [selectedTask, setSelectedTask] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0);
  const [selectedTaskForStats, setSelectedTaskForStats] = useState("");

  const [filteredChartData, setFilteredChartData] = useState([]);
  const [timeRange, setTimeRange] = useState("month");



const filterChartData = useCallback(() => {
  
  if (!selectedTaskForStats) {
    setFilteredChartData([]);
    return;
  }

  const task = todos.find((task) => task.id === selectedTaskForStats);
  const taskTimeLogged = task.timeLogged || [];

  const currentDate = moment();
  const startOfTimeRange = timeRange === "month" ? currentDate.startOf("month") : currentDate.startOf("week");

  const filteredData = taskTimeLogged
    .filter((log) => moment(log.date).isSameOrAfter(startOfTimeRange))
    .map((log) => ({
      date: log.date,
      time: log.time,
    }));
  setFilteredChartData(filteredData);
  console.log('Filtered chart data:', filteredData);
}, [selectedTaskForStats, todos, timeRange]);


useEffect(() => {
  const storedChartData = localStorage.getItem("chartData");
  if (storedChartData) {
    setChartData(JSON.parse(storedChartData));
  }
}, [setChartData]);


useEffect(() => {
  filterChartData();
}, [selectedTaskForStats, filterChartData]);


 

//toggles beteween month and week
function handleTimeRangeToggle() {
  setTimeRange(timeRange === "month" ? "week" : "month");
}
//clear data for given task
function handleClearData() {
  setFilteredChartData([]);
}
// task change selected for stats
function handleTaskChangeForStats(event) {
  setSelectedTaskForStats(event.target.value);
}


//task change for logging hours
function handleTaskChange(event) {
  setSelectedTask(event.target.value);
  // Filter tasks for the current day and are active
  const currentDay = moment().format("dddd");
  const tasksForDay = todos.filter(
    (task) => task.days.includes(currentDay) && task.isActive
  );
  // Get the selected task
  const task = tasksForDay.find((task) => task.id === event.target.value);
  // Set the selected task for stats
  setSelectedTaskForStats(task ? task.id : "");
}




//changes hours based on input depending on range
  function handleHoursChange(event) {
    const hours = Number(event.target.value);
    if (hours >= 0 && hours <= 24) {
      setHoursWorked(hours);
    }
  }
// logs hours for a task
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
   
    const newChartDataItem = {
      taskName: task.name,
      date: currentDate,
      hours: hoursWorked,
    };

    setChartData([...chartData, newChartDataItem]);
    localStorage.setItem("chartData", JSON.stringify([...chartData, newChartDataItem]));
    
   
    setHoursWorked(0);
  }

  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">

            <Timer
  
  workTime={timerSettings.workTime}
  shortBreakTime={timerSettings.shortBreakTime}
  longBreakTime={timerSettings.longBreakTime}
/>

            </div>
          </Col>
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
              {/* select a task button options */}
              <p>Select a task:</p>
              <select
                value={selectedTask}
                onChange={handleTaskChange}
                className="form-select"
              >
                <option value="">--Select a task--</option>
              {todos
              .filter((task) => task.days.includes(moment().format("dddd")) && task.isActive)
              .map((task) => (
              <option key={task.id} value={task.id}>
              {task.name}
              </option>
              ))}

              </select>
              {/* form to submit hours worked on a task */}
              <form onSubmit={handleHoursSubmit} className="mt-3">
                <label htmlFor="hoursWorked">Hours worked:</label>
                <input
                  type="number"
                  id="hoursWorked"
                  value={hoursWorked}
                  onChange={handleHoursChange}
                  className="form-control"
                />
                {/* button that submits time worked on a task */}
                <button type="submit" className="btn btn-primary mt-3">
                  Log hours
                </button>
              </form>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          {/* week or month toggle */}
        <div className="mt-3">
  <button onClick={handleTimeRangeToggle} className="btn btn-secondary">
    Toggle {timeRange === "month" ? "Week" : "Month"}
  </button>
</div>

{/*  Select button to choose statistics from */}
<Row className="mt-3">
  <Col xs="12" md="6">
    <p>Select a task for statistics:</p>
    <select
      value={selectedTaskForStats}
      onChange={handleTaskChangeForStats}
      className="form-select"
    >
      
     
      <option value="">--Select a task--</option>
      {todos
              .filter((task) => task.days.includes(moment().format("dddd")) && task.isActive)
              .map((task) => (
              <option key={task.id} value={task.id}>
              {task.name}
              
        </option>
      ))}
    </select>
  </Col>
  {/* clear data from stats task button */}
  <Col xs="12" md="6" className="d-flex align-items-end">
    <div className="mt-3">
      <button onClick={handleClearData} className="btn btn-danger">
        Clear data
      </button>
    </div>
  </Col>
</Row>

<Row className="mt-5">
  <Col>
    <RechartsLineChart chartData={filteredChartData} />
  </Col>
</Row>

</Row>
      </Container>
    </div>
  );
}
export default TodayPage;