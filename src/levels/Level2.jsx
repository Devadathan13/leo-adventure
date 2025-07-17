import React, { useState, useEffect } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

// Helper function to scramble a word
const scrambleWord = (word) => {
  if (!word) return ''; // Handle cases where word might be undefined or null
  return word.split('').sort(() => 0.5 - Math.random()).join('');
};

function Level2({ onComplete }) {
  const levelData = gameContent.level2;
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(levelData.words[0]);
  const [scrambled, setScrambled] = useState(scrambleWord(levelData.words[0]));
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  // Effect to update scrambled word when currentWord changes
  useEffect(() => {
    setScrambled(scrambleWord(currentWord));
  }, [currentWord]);

  const handleGuess = (e) => {
    e.preventDefault();
    if (inputValue.toUpperCase() === currentWord) {
      setFeedback('Correct! Great job!');
      setTimeout(() => {
        const nextIndex = wordIndex + 1;
        if (nextIndex < levelData.words.length) {
          setWordIndex(nextIndex);
          const nextWord = levelData.words[nextIndex];
          setCurrentWord(nextWord); // This will trigger the useEffect to scramble
          setInputValue('');
          setFeedback('');
        } else {
          onComplete(); // Call the function to navigate to the next level
        }
      }, 1500);
    } else {
      setFeedback('Not quite, try again!');
      setInputValue('');
    }
  };

  return (
    <Container className="level-container my-4">
      <Row className="mb-4 text-center">
        <Col>
          <h1>{levelData.title}</h1>
          <p className="lead">{levelData.story}</p>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center">
            <Card.Body>
              {/* <Card.Img variant="top" src="/images/wiggle-worm.png" alt="Wiggle the Word Worm" className="mb-3" style={{ maxWidth: '150px' }}/> */}
              <Card.Text>
                {<span className='display-7'>{levelData.character}</span> || "Your character goes here!"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card className="text-center p-4">
            <Card.Title as="h2" className="mb-4">
              <span className="badge bg-info text-dark p-3">{scrambled}</span>
            </Card.Title>

            <Form onSubmit={handleGuess}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Unscramble the word"
                  autoFocus
                  size="lg"
                  className="text-center"
                />
              </Form.Group>
              <Button type="submit" variant="primary" size="lg">
                Check
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
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Level2;