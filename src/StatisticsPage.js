import React, { useState, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import RechartsLineChart from "./TodayPage/RechartsLineChart";

function StatisticsPage({ todos = [], setTodos }) {
  const [selectedTaskForStats, setSelectedTaskForStats] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("week");
  const [filteredChartData, setFilteredChartData] = useState([]);
  const [chartData, setChartData] = useState([]);

  function handleTaskChangeForStats(event) {
    setSelectedTaskForStats(event.target.value);
  }

  const filterChartData = () => {
    if (!selectedTaskForStats) {
      setFilteredChartData([]);
      return;
    }

    const task = todos.find((task) => task.id === selectedTaskForStats);
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
        progress: log.progress,
      }));

    setFilteredChartData(filteredData);
  };

  useEffect(() => {
    filterChartData();
  }, [selectedTaskForStats, selectedTimeFrame]);

  function handleProgressLog(taskId, progress) {
    const task = todos.find((task) => task.id === taskId);

    if (!task) {
      console.error("Task not found:", taskId);
      return;
    }

    const currentDate = moment().format("YYYY-MM-DD");
    const timeLogged = task.timeLogged || [];

    const existingTimeLog = timeLogged.find((log) => log.date === currentDate);

    if (existingTimeLog) {
      const newProgress = existingTimeLog.progress + progress;
      if (newProgress <= 100) {
        existingTimeLog.progress = newProgress;
      } else {
        alert("Progress cannot be more than 100%");
        return;
      }
    } else {
      const newTimeLogged = {
        date: currentDate,
        progress: progress,
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

    const newChartDataItem = {
      taskName: task.name,
      date: currentDate,
      progress: progress,
    };
    setChartData([...chartData, newChartDataItem]);
  }

  function handleClearData() {
    setChartData([]);
    setFilteredChartData([]);
  }
  

  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
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
          </Col>
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
              <button onClick={() => handleClearData(selectedTaskForStats)}>
                Clear data
              </button>
              <div className="mt-3">
                <p>Select time frame:</p>
                <button
                  className={selectedTimeFrame === "week" ? "btn btn-primary me-3" : "btn me-3"}
                  onClick={() => setSelectedTimeFrame("week")}
                >
                  Week
                </button>
                <button
                  className={selectedTimeFrame === "month" ? "btn btn-primary" : "btn"}
                  onClick={() => setSelectedTimeFrame("month")}
                >
                  Month
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <RechartsLineChart chartData={filteredChartData} />
      </Container>
    </div>
  );
                }  
  export default StatisticsPage
  
