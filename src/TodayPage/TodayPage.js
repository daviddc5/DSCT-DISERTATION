import React, { useState, useEffect, useCallback } from 'react';
import NavBar from '../NavBar/NavBar';
import Timer from './Timer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RechartsLineChart from './RechartsLineChart';
import moment from 'moment';



function TodayPage({ todos = [], setTodos }) {
  const [selectedTask, setSelectedTask] = useState("");
  const [hoursWorked, setHoursWorked] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("week");
  const [filteredChartData, setFilteredChartData] = useState([]);

  const filterChartData = useCallback(() => {
    if (!selectedTask) {
      setFilteredChartData([]);
      return;
    }

    const task = todos.find((task) => task.id === selectedTask);
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
    setHoursWorked(Number(event.target.value));
  }

  function handleTimeLog(taskId, time) {
    const task = todos.find((task) => task.id === taskId);
    const currentDate = moment().format("YYYY-MM-DD");
    const newTimeLogged = {
      date: currentDate,
      time: time,
      taskName: task.name,
    };
    const newTodos = todos.map((task) => {
      if (task.id === taskId) {
        const timeLogged = task.timeLogged || [];
        timeLogged.push(newTimeLogged);
        return {
          ...task,
          timeLogged: timeLogged.concat(newTimeLogged),
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



  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
              <Timer onTimeLog={(time) => handleTimeLog(selectedTask, time)} />
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
          <button
            onClick={() =>
              setSelectedTimeFrame(
                selectedTimeFrame === "week" ? "month" : "week"
              )
            }
          >
            Show {selectedTimeFrame === "week" ? "month" : "week"}
          </button>
          {filteredChartData.length > 0 ? (
            <RechartsLineChart chartData={chartData} />
          ) : (
            <p>No data to display</p>
          )}
        </div>
      </Container>
    </div>
  )};
  export default  TodayPage;