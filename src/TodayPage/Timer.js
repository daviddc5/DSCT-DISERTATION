import React, { useState, useEffect, useMemo } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Timer.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import soundFile from './Notification.mp3';

function Timer({ workTime, shortBreakTime, longBreakTime }) {
  const [seconds, setSeconds] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isLongBreak, setIsLongBreak] = useState(false);
  
  const audio = useMemo(() => new Audio(soundFile), []);

  useEffect(() => {
    return () => {
      audio.pause();
    };
  }, [audio]);

  useEffect(() => {
    let interval = null;
    
    const handleAudioPlay = () => {
      audio.play();
    };
    
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      if (isBreak) {
        handleAudioPlay();
      } else {
        handleAudioPlay();
      }
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, isBreak, isLongBreak, longBreakTime, shortBreakTime, audio]);
  

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    if (isLongBreak) {
      setSeconds(longBreakTime * 60);
      setIsLongBreak(false);
    } else {
      setSeconds(isBreak ? shortBreakTime * 60 : workTime * 60);
    }
    setIsActive(false);
  }

  function toggleMode() {
    if (!isBreak) {
      setIsLongBreak(!isLongBreak);
    }
    setIsBreak(!isBreak);
    reset();
  }

  const minutes = Math.floor(seconds / 60);
  const displaySeconds =
    seconds % 60 < 10 ? "0" + (seconds % 60) : seconds % 60;

    return (
      <Container className="h-100 d-flex flex-column justify-content-center align-items-center">
        <Row className="justify-content-center">
          <Col xs="auto">
            <div className="timer-container text-center">
              <div className="time-display">
                {minutes}:{displaySeconds}
              </div>
              <ButtonGroup className="mb-2">
                <Button
                  variant={isActive ? "danger rounded-3" : "primary rounded-3"}
                  onClick={toggle}
                  size="lg"
                >
                  {isActive ? "Pause" : "Start"}
                </Button>
                <Button
                  variant="primary rounded-3"
                  onClick={reset}
                  size="lg"
                >
                  Reset
                </Button>
                <Button
                  variant={isBreak ? "danger rounded-3" : "success rounded-3"}
                  onClick={toggleMode}
                  size="lg"
                  disabled={isActive}
                >
                  {isBreak ? "Work" : "Break"}
                </Button>
              </ButtonGroup>
              {isBreak && (
                <ButtonGroup className="mb-2">
                  <Button
                    variant={isLongBreak ? "warning rounded-3" : "info rounded-3"}
                    onClick={() => {
                      setIsLongBreak(true);
                      setSeconds(longBreakTime * 60);
                    }}
                    size="lg"
                    disabled={isActive}
                  >
                    Long Break
                  </Button>
                  <Button
                    variant={isLongBreak ? "info rounded-3" : "warning rounded-3"}
                    onClick={() => {
                      setIsLongBreak(false);
                      setSeconds(shortBreakTime * 60);
                    }}
                    size="lg"
                    disabled={isActive}
                  >
                    Short Break
                  </Button>
                </ButtonGroup>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    );
                  }
                   export default Timer    
