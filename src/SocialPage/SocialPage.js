import TaskChat from './taskChat';
import React, { useState } from 'react';
import Navbar from '../NavBar/NavBar';
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

function SocialPage({ todos }) {
  const activeTodos = todos.filter((todo) => todo.isActive === true);
  
  // Flatten all the tags from active todos and remove duplicates
  const tags = [...new Set(activeTodos.flatMap((todo) => todo.tags))];

  const [selectedCategory, setSelectedCategory] = useState(null); // State variable for the selected category

  

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };
  

  return (
    <>
      <Navbar />
      <Container className="my-5">
        <Row className="gx-5">
          <Col md={6}>
            <h2>Discussions Based On Your Interests</h2>

            {tags.map((tag, index) => (
              <div key={index} className="mb-4">
                <h5>{tag}</h5>
                <Button
                  className="mb-2"
                  onClick={() => handleCategoryClick(tag)}
                  variant={selectedCategory === tag ? 'primary' : 'outline-primary'}
                >
                  {tag}
                </Button>
                {selectedCategory === tag && <TaskChat task={tag} />}
              </div>
            ))}
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
