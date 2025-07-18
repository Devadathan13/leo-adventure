import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';
import backgroundImage from '../assets/background_level1.png';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';

function Level1({ onComplete }) {
  const levelData = gameContent.level1;
  const { title, character, story, puzzle } = levelData;

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [feedback, setFeedback] = useState('');

  const handleSelect = (part) => {
    if (!selectedOrder.includes(part)) {
      setSelectedOrder([...selectedOrder, part]);
    }
  };

  const handleSubmit = () => {
    const combinedOrder = [puzzle.prompt, ...selectedOrder];
    const isCorrect = JSON.stringify(combinedOrder) === JSON.stringify(puzzle.correctOrder);

    setFeedback(isCorrect ? 'Correct order! Well done!' : 'That’s not quite right. Try again!');
    if (isCorrect) {
      setTimeout(onComplete, 1500);
    } else {
      setSelectedOrder([]);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
      }}
    >
      <Container
        className="p-4 rounded-4 shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          maxWidth: '800px',
          width: '100%',
          color: 'black',
        }}
      >
        <Row className="mb-3 text-center">
          <Col>
            <h2 className="fw-bold">{title}</h2>
            <p>{story}</p>
            <h4 className="text-dark">{character}</h4>
          </Col>
        </Row>

        <Row className="mb-3 text-center">
          <Col>
            <div
              className="p-3 rounded-4 shadow-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
              }}
            >
              <h5 className="mb-2">Your Clue:</h5>
              <p className="fw-bold m-0">{puzzle.prompt}</p>
            </div>
          </Col>
        </Row>

        <Row className="mb-3 justify-content-center">
          {puzzle.parts.map((part, index) => (
            <Col xs="auto" key={index} className="mb-2">
              <Button
                variant="warning"
                className="rounded-pill px-4 text-dark fw-bold"
                onClick={() => handleSelect(part)}
                disabled={selectedOrder.includes(part)}
              >
                {part}
              </Button>
            </Col>
          ))}
        </Row>

        <Row className="mb-3">
          <Col>
            <div
              className="p-3 rounded-4"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                border: '2px dashed black',
              }}
            >
              <h6>Selected Order:</h6>
              <ol className="list-group list-group-numbered">
                <li className="list-group-item bg-transparent text-dark border-0">{puzzle.prompt}</li>
                {selectedOrder.map((item, idx) => (
                  <li key={idx} className="list-group-item bg-transparent text-dark border-0">
                    {item}
                  </li>
                ))}
              </ol>
            </div>
          </Col>
        </Row>

        {selectedOrder.length === puzzle.parts.length && (
          <Row className="mb-3 text-center">
            <Col>
              <Button variant="success" className="rounded-pill px-5" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        )}

        {feedback && (
          <Row>
            <Col>
              <Alert
                variant={feedback.includes('Correct') ? 'success' : 'danger'}
                className="mt-2 text-center"
              >
                {feedback}
              </Alert>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default Level1;
