import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';
import backgroundImage from '../assets/background_level2.png';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

// Helper function to scramble a word
const scrambleWord = (word) => word.split('').sort(() => 0.5 - Math.random()).join('');

function Level2({ onComplete }) {
  const levelData = gameContent.level2;
  const [wordIndex, setWordIndex] = useState(0);
  const [currentWord, setCurrentWord] = useState(levelData.words[0]);
  const [scrambled, setScrambled] = useState(scrambleWord(levelData.words[0]));
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleGuess = (e) => {
    e.preventDefault();
    if (inputValue.toUpperCase() === currentWord) {
      setFeedback('Correct! Great job!');
      setTimeout(() => {
        const nextIndex = wordIndex + 1;
        if (nextIndex < levelData.words.length) {
          setWordIndex(nextIndex);
          const nextWord = levelData.words[nextIndex];
          setCurrentWord(nextWord);
          setScrambled(scrambleWord(nextWord));
          setInputValue('');
          setFeedback('');
        } else {
          onComplete();
        }
      }, 500);
    } else {
      setFeedback('Not quite, try again!');
      setInputValue('');
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <Container
        className="p-4 rounded"
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(8px)',
          color: 'black',
          maxWidth: '800px',
          width: '100%',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Row className="text-center mb-3">
          <Col>
            <h2>{levelData.title}</h2>
            <p>{levelData.story}</p>
            <h4 className="my-3">{scrambled}</h4>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleGuess}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Unscramble the word"
                  autoFocus
                />
              </Form.Group>

              <Button variant="warning" type="submit" className="w-100">
                Check
              </Button>
            </Form>

            {feedback && (
              <Alert
                variant={feedback.includes('Correct') ? 'success' : 'danger'}
                className="text-center mt-3"
              >
                {feedback}
              </Alert>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Level2;
