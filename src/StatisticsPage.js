import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from "moment";
import RechartsLineChart from "./TodayPage/RechartsLineChart";

//chartdata is passed 
function StatisticsPage({ todos, chartData, setChartData }) {
  const [selectedTaskForStats, setSelectedTaskForStats] = useState("");
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("week");
  const [filteredChartData, setFilteredChartData] = useState([]);

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


  // console.log('StatisticsPage filteredChartData', filteredChartData);

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
      </Container>
    </div>
  );
                }
  export default StatisticsPage;
