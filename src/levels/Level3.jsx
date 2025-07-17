import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

function Level3({ onComplete }) {
  const levelData = gameContent.level3;
  const [wordIndex, setWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentWordData = levelData.words[wordIndex];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.toUpperCase() === currentWordData.word.toUpperCase()) { // Ensure case-insensitive comparison
      setFeedback('Correct!');

      setTimeout(() => {
        if (wordIndex + 1 < levelData.words.length) {
          setWordIndex(wordIndex + 1);
          setInputValue('');
          setFeedback('');
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setFeedback('Try again!');
    }
  };

  return (
    <Container className="level-container my-4">
      <Row className="mb-4 text-center">
        <Col>
          <h2>{levelData.title}</h2>
          <p className="lead">{levelData.story}</p>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center">
            <Card.Body>
              {/* You can add an image here using <Card.Img variant="top" src="/images/your-character.png" alt={levelData.character} /> */}
              <Card.Text className="h4">{levelData.character}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="missing-letter-box text-center p-4">
            {/* <Card.Header as="h5">Fill in the missing letters:</Card.Header> */}
            <Card.Body>
              <h6 className="mb-4 display-6 text-primary ">{currentWordData.gap}</h6>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Complete the word"
                    autoFocus
                    size="lg"
                    className="text-center"
                  />
                </Form.Group>
                <Button type="submit" variant="success" size="lg">
                  Submit
                </Button>
              </Form>

              {feedback && (
                <Alert
                  variant={feedback.includes('Correct') ? 'success' : 'danger'}
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

export default Level3;