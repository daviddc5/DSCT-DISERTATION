import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Timer from "./Timer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RechartsLineChart from './RechartsLineChart';





function TodayPage({ todos, setTodos }) {
  const [selectedTask, setSelectedTask] = useState("");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  

  function handleTaskChange(event) {
    setSelectedTask(event.target.value);
  }


  function handleTimeLog(taskId, time) {
    const newTodos = todos.map((task) => {
      if (task.id === taskId) {
        const timeLogged = task.timeLogged || [];
        timeLogged.push({
          date: new Date().toISOString(),
          time: time,
        });
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

  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">
            <div className="bg-secondary rounded-3 p-3">
              <Timer onTimeLog={handleTimeLog} />
            </div>
          </Col>
          <Col xs="12" md="6">
            <div className="bg-dark rounded-3 p-3">
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
            </div>
           
              </Col>
              </Row>
              <Row className="justify-content-center">
              <Col xs="12" md="8">
              <div className="bg-light rounded-3 p-3 mt-3">
              <RechartsLineChart />

              </div>
              </Col>
              </Row>
              </Container>
              </div>
              );
              }

              export default TodayPage;
