import TaskChat from './TaskChat';
import React from 'react';
import Navbar from './NavBar/NavBar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const offlineSuggestions = [
  'Go for a walk with a friend',
  'Attend a local meetup event',
  'Visit a museum or art gallery',
  'Join a sports club or group exercise class',
  'Volunteer at a local organization',
  'Take a cooking class',
  'Meditate for 10 minutes daily',
  'Keep a gratitude journal',
  'Try deep breathing exercises',
  'Get a full night of sleep',
];

function getRandomSuggestion() {
  const index = Math.floor(Math.random() * offlineSuggestions.length);
  return offlineSuggestions[index];
}

function SocialPage({ users, currentUser, task }) {
  let taskAdvice = '';
  switch (task) {
    case 'Task 1':
      taskAdvice = 'Advice for completing Task 1';
      break;
    case 'Task 2':
      taskAdvice = 'Advice for completing Task 2';
      break;
    default:
      taskAdvice = '';
  }

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row className="gx-5">
          <Col md={6}>
            <TaskChat task={task} />
          </Col>
          <Col md={6}>
          
            <h2>Wellbeing Advice</h2>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Wellbeing Advice</Card.Title>
                <Card.Text>{getRandomSuggestion()}</Card.Text>
              </Card.Body>
            </Card>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Offline Interaction Recommendations</Card.Title>
                <Card.Text>{getRandomSuggestion()}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SocialPage;
