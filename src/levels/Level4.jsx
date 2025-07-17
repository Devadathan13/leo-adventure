// src/levels/Level4.jsx

import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function Level4({ onComplete }) {
  const levelData = gameContent.level4;
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentPair = levelData.pairs[currentPairIndex];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure case-insensitive comparison
    if (inputValue.toUpperCase() === currentPair.rhyme.toUpperCase()) {
      setFeedback('That’s a rhyme!');
      setTimeout(() => {
        const nextIndex = currentPairIndex + 1;
        if (nextIndex < levelData.pairs.length) {
          setCurrentPairIndex(nextIndex);
          setInputValue('');
          setFeedback('');
        } else {
          onComplete(); // All pairs completed, move to next level
        }
      }, 1000); // Give user a moment to see feedback before moving on
    } else {
      setFeedback('Try again!');
    }
  };

  return (
    <Container className="level-container my-4">
      <Row className="mb-4 text-center">
        <Col>
          <h3>{levelData.title}</h3>
          <p className="lead">{levelData.story}</p>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center">
            <Card.Body>
              {/* Placeholder for character image/text. You can replace <Card.Text> with <Card.Img> */}
              {/* Example: <Card.Img variant="top" src="/images/your-rhyme-character.png" alt={levelData.character} className="mb-3" style={{ maxWidth: '150px' }} /> */}
              <Card.Text className="h4 text-muted">{levelData.character}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="rhyme-box text-center p-4">
            <Card.Header as="h5">Find a word that rhymes with:</Card.Header>
            <Card.Body>
              <h2 className="mb-4 display-3 text-info fw-bold">{currentPair.word}</h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type a rhyming word"
                    autoFocus
                    size="lg"
                    className="text-center"
                  />
                </Form.Group>
                <Button type="submit" variant="primary" size="lg">
                  Submit
                </Button>
              </Form>

              {feedback && (
                <Alert
                  variant={feedback.includes('rhyme') ? 'success' : 'danger'}
                  className="mt-4"
                >
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

export default Level4;