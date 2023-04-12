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

function SocialPage({ users, currentUser }) {
  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row className="gx-5">
          <Col md={6}>
            <h2>Meaningful Interactions</h2>
            <Row className="gx-5">
              {users.map((user) => (
                <Col md={4} key={user.id}>
                  <Card className="mb-4">
                    <Card.Img variant="top" src={user.icon} />
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Text>Goal: {user.goal}</Card.Text>
                      <Button variant="primary">Connect</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
          <Col md={6}>
            <h2>Offline Interactions & Wellbeing Advice</h2>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Wellbeing Advice</Card.Title>
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
