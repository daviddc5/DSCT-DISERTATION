import React, { useState } from "react";
import NavBar from "./NavBar/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

function SettingsPage({ onSettingsChange }) {
  const [workTime, setWorkTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);

  const timerSettings = {
    workTime: workTime,
    shortBreakTime: shortBreakTime,
    longBreakTime: longBreakTime
  };

  function handleWorkTimeChange(event) {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setWorkTime(value);
      onSettingsChange({ timerSettings: { ...timerSettings, workTime: value } });
    }
  }

  function handleShortBreakTimeChange(event) {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setShortBreakTime(value);
      onSettingsChange({ timerSettings: { ...timerSettings, shortBreakTime: value } });
    }
  }

  function handleLongBreakTimeChange(event) {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setLongBreakTime(value);
      onSettingsChange({ timerSettings: { ...timerSettings, longBreakTime: value } });
    }
  }

  return (
    <div>
      <NavBar />
      <Container className="mt-5">
        <h1>Settings Page</h1>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="workTimeInput" className="my-3">
              <Form.Label>Work Time (in minutes):</Form.Label>
              <Form.Control
                type="number"
                value={workTime}
                onChange={handleWorkTimeChange}
              />
            </Form.Group>
            <Form.Group controlId="shortBreakTimeInput" className="my-3">
              <Form.Label>Short Break Time (in minutes):</Form.Label>
              <Form.Control
                type="number"
                value={shortBreakTime}
                onChange={handleShortBreakTimeChange}
              />
            </Form.Group>
            <Form.Group controlId="longBreakTimeInput" className="my-3">
              <Form.Label>Long Break Time (in minutes):</Form.Label>
              <Form.Control
                type="number"
                value={longBreakTime}
                onChange={handleLongBreakTimeChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SettingsPage;
