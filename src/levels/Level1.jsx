import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Card, Button, Alert, ListGroup } from 'react-bootstrap';

function Level1({ onComplete }) {
  const levelData = gameContent.level1;
  const { title, character, story, puzzle } = levelData;

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [feedback, setFeedback] = useState('');

  const handleSelect = (part) => {
    if (selectedOrder.includes(part)) return;
    setSelectedOrder([...selectedOrder, part]);
  };

  const handleSubmit = () => {
    // The prompt is the last part of the puzzle's correct order, so we append it here
    // after the user has selected all 'parts'.
    const combinedOrder = [puzzle.prompt, ...selectedOrder];
    console.log(JSON.stringify(combinedOrder))

    console.log(JSON.stringify(puzzle.correctOrder))

    const isCorrect = JSON.stringify(combinedOrder) === JSON.stringify(puzzle.correctOrder);

    if (isCorrect) {
      setFeedback('Correct order! Well done!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setFeedback('That’s not quite right. Try again!');
      setSelectedOrder([]);
    }
  };

  return (
    <Container className="level-container my-4 text-center" >
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">{title}</h2>
          <p className="lead text-center">{story}</p>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{character}</Card.Title>
              {/* Example: <Card.Img variant="top" src="/images/ollie-owl.png" alt={character} /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="puzzle-box">
            <Card.Header as="h5">Click the parts of the story in the correct order:</Card.Header>

            <h3 className='mt-4'>Your Clue</h3>
            <ListGroup.Item >{puzzle.prompt}</ListGroup.Item>

            <Card.Body>
              <div className="d-flex flex-wrap justify-content-center gap-2 mb-3 mt-1">
                {puzzle.parts.map((part, index) => (
                  <Button
                    key={index}
                    onClick={() => handleSelect(part)}
                    disabled={selectedOrder.includes(part)}
                    variant="outline-primary"
                    className="m-1"
                  >
                    {part}
                  </Button>
                ))}
              </div>

              <h6 className="mt-4">Selected Order:</h6>
              <ListGroup.Item>{puzzle.prompt}</ListGroup.Item>
              <ListGroup as="ol" numbered>
                {selectedOrder.map((item, idx) => (
                  <ListGroup.Item key={idx}>{item}</ListGroup.Item>
                ))}
                {/* Display the prompt only after all parts are selected, as it's the final piece */}
                

              </ListGroup>

              {selectedOrder.length === puzzle.parts.length && (
                <div className="text-center mt-4">
                  <Button onClick={handleSubmit} variant="success" size="lg">
                    Submit
                  </Button>
                </div>
              )}

              {feedback && (
                <Alert variant={feedback.includes('Correct') ? 'success' : 'danger'} className="mt-3 text-center">
                  {feedback}
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Level1;