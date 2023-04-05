import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Timer from "./Timer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TodayPage() {
  //set selected task is the sate, and selected task is what changes
  const [selectedTask, setSelectedTask] = useState("");

  //changes value of selected task
  function handleTaskChange(event) {
    setSelectedTask(event.target.value);
  }

  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col xs="12" md="6">

            <div className="bg-secondary rounded-3 p-3">
              <Timer />
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
                <option value="task1">Task 1</option>
                <option value="task2">Task 2</option>
                <option value="task3">Task 3</option>
              </select>
            </div>
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TodayPage;
