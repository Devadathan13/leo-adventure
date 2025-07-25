import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import backgroundImage from '../assets/background_level3.png';

function Level3({ onComplete }) {
  const levelData = gameContent.level3;
  const [wordIndex, setWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentWordData = levelData.words[wordIndex];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.toUpperCase() === currentWordData.word) {
      setFeedback('Correct!');
      setTimeout(() => {
        if (wordIndex + 1 < levelData.words.length) {
          setWordIndex(wordIndex + 1);
          setInputValue('');
          setFeedback('');
        } else {
          onComplete();
        }
      }, 500);
    } else {
      setFeedback('Try again!');
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
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div
              className="p-4 rounded"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                color: 'black',
                borderRadius: '20px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
              }}
            >
              <h3 className="mb-3 text-center">{levelData.title}</h3>
              <p className="text-center">{levelData.story}</p>

              {/* <div className="text-center mb-4">
                <p className="fw-bold">{levelData.character}</p>
              </div> */}

              <div className="text-center mb-3">
                <p className="mb-2 fw-bold">Enter the word with missing letters:</p>
                <h2>{currentWordData.gap}</h2>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Enter the completed word"
                    autoFocus
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit" variant="success">
                    Submit
                  </Button>
                </div>
              </Form>

              {feedback && (
                <Alert
                  variant={feedback === 'Correct!' ? 'success' : 'danger'}
                  className="mt-3 text-center"
                >
                  {feedback}
                </Alert>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Level3;

