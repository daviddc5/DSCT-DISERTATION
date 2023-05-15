import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import RechartsLineChart from "./RechartsLineChart";

//chartdata is passed 
function StatisticsPage({ todos, chartData, setChartData, completionOfTasksStats }) {
  console.log(completionOfTasksStats)
  const [selectedTaskForStats, setSelectedTaskForStats] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("week");
  const [filteredChartData, setFilteredChartData] = useState([]);

  
  const [selectedGoalType, setSelectedGoalType] = useState("shortTerm");



  function handleGoalTypeChange(event) {
    
    setSelectedGoalType(event.target.value);
  }

  
  function handleTaskChangeForStats(event) {
    setSelectedTaskForStats(event.target.value);
  }

  
  const filterChartData = useCallback(() => {
    if (!selectedTaskForStats) {
      setFilteredChartData([]);
      return;
    }
  
    const startDate = moment();
    if (selectedTimeFrame === "week") {
      startDate.subtract(7, "days");
    } else if (selectedTimeFrame === "month") {
      startDate.subtract(1, "months");
    }
    const filteredData = chartData
    .filter(
      (log) =>
        log.taskName ===
          todos.find((task) => task.id === selectedTaskForStats).name &&
        moment(log.date).isSameOrAfter(startDate)
    )
    .map((log) => ({
      date: log.date,
      time: log.hours, // change "hours" to "time" here
    }));
  
  setFilteredChartData(filteredData);
  
  
    console.log("Filtered data:", filteredData); // Add this line
  
    
  }, [selectedTaskForStats, selectedTimeFrame, todos, chartData]);

  useEffect(() => {
    filterChartData();
  }, [selectedTaskForStats, selectedTimeFrame, filterChartData]);

  function handleClearData() {
    setChartData([]);
    setFilteredChartData([]);
  }

  function getTasksCompletedToday(goalType) {
    const today = moment().format('YYYY-MM-DD');
    console.log('Today:', today);
    console.log('Completion stats:', completionOfTasksStats);
    console.log('Selected goal type:', goalType);
  
    if (!completionOfTasksStats) {
      console.log('completionOfTasksStats is undefined');
      return 0;
    }
  
    if (!completionOfTasksStats[goalType]) {
      console.log(`completionOfTasksStats does not have property '${goalType}'`);
      return 0;
    }
  
    console.log('Selected goal type stats:', completionOfTasksStats[goalType]);
    console.log('Today\'s stats for selected goal type:', completionOfTasksStats[goalType][today]);
  
    const tasksCompletedToday = completionOfTasksStats[goalType][today] || 0;
  
    console.log('Tasks completed today:', tasksCompletedToday);
    return tasksCompletedToday;
  }
  
  
  function getTasksCompletedInWeek(goalType) {
    const startDate = moment().startOf('week');
    const endDate = moment().endOf('week');
    let tasks = 0;
  
    if(completionOfTasksStats[goalType]) {
      for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
        const day = m.format('YYYY-MM-DD');
        if(completionOfTasksStats[goalType][day]) {
            tasks += completionOfTasksStats[goalType][day];
        }
      }
    }
  
    return tasks;
  }
  
  function getTasksCompletedInMonth(goalType) {
    const startDate = moment().startOf('month');
    const endDate = moment().endOf('month');
    let tasks = 0;
  
    if(completionOfTasksStats[goalType]) {
      for (let m = moment(startDate); m.diff(endDate, 'days') <= 0; m.add(1, 'days')) {
        const day = m.format('YYYY-MM-DD');
        if(completionOfTasksStats[goalType][day]) {
            tasks += completionOfTasksStats[goalType][day];
        }
      }
    }
  
    return tasks;
  }
  
  

  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
              <p> Select to show Hours worked on given task:</p>
                          <select
              value={selectedTaskForStats}
              onChange={handleTaskChangeForStats}
              className="form-select"
              >
              <option value="">--Select a task--</option>
              {todos
                .filter(task => task.isActive)  // Only include tasks that are active
                .map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>



          </Col>
          <Col xs="12" md="6">
            <div className="bg-light rounded-3 p-3">
              <button onClick={handleClearData} className="btn btn-danger">Clear data</button>
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
        <Row className="mt-5">
          <Col>
          
            <RechartsLineChart chartData={filteredChartData} />
          </Col>
        </Row>

        <br></br>
        <br></br>
        <br></br>

<div className="bg-light rounded-3 p-3">
  <p>Select to show number of completed tasks by goal type:</p>

  <select
    value={selectedGoalType}
    onChange={handleGoalTypeChange}
    className="form-select"
  >
    <option value="shortTerm">shortTerm</option>
    <option value="longTerm">longTerm</option>
  </select>
</div>
        <div className="mt-3">
  <p>Number of {selectedGoalType} tasks completed today: {getTasksCompletedToday(selectedGoalType)}</p>
  <p>Number of {selectedGoalType} tasks completed this week: {getTasksCompletedInWeek(selectedGoalType)}</p>
  <p>Number of {selectedGoalType} tasks completed this month: {getTasksCompletedInMonth(selectedGoalType)}</p>
</div>

        
      </Container>
    </div>
  );
                }
  export default StatisticsPage;
