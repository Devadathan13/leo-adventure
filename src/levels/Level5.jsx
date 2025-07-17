// src/levels/Level5.jsx

import React, { useState, useEffect } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';

function Level5({ onComplete }) {
  const levelData = gameContent.level5;
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [shuffledWords, setShuffledWords] = useState([]);

  // Use useEffect to shuffle words whenever the current sentence changes
  useEffect(() => {
    if (levelData.sentences[sentenceIndex]) {
      // Ensure we're dealing with an array of words for shuffling
      const wordsToShuffle = Array.isArray(levelData.sentences[sentenceIndex])
        ? [...levelData.sentences[sentenceIndex]]
        : levelData.sentences[sentenceIndex].split(' '); // Assuming sentences are strings, split them into words

      setShuffledWords(wordsToShuffle.sort(() => 0.5 - Math.random()));
    }
  }, [sentenceIndex, levelData.sentences]); // Depend on sentenceIndex and sentences array

  const currentSentence = levelData.sentences[sentenceIndex];

  const handleWordClick = (word) => {
    // Only add word if not already selected
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    // Convert currentSentence (which might be an array of words or a string)
    // into an array of words for comparison if it's not already.
    const correctSentenceArray = Array.isArray(currentSentence)
      ? currentSentence
      : currentSentence.split(' ');

    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(correctSentenceArray);

    if (isCorrect) {
      setFeedback('Correct sentence! Well done!');
      setTimeout(() => {
        if (sentenceIndex + 1 < levelData.sentences.length) {
          setSentenceIndex(sentenceIndex + 1);
          setSelectedWords([]);
          setFeedback('');
        } else {
          onComplete(); // All sentences completed, move to next level
        }
      }, 1000); // Give user a moment to see feedback before moving on
    } else {
      setFeedback('That’s not correct. Try again!');
      setSelectedWords([]);
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
              {/* Character placeholder. Replace Card.Text with Card.Img if you have an image. */}
              {/* Example: <Card.Img variant="top" src="/images/your-character-img.png" alt={levelData.character} className="mb-3" style={{ maxWidth: '150px' }} /> */}
              <Card.Text className="h4 text-muted">{levelData.character}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="sentence-builder text-center p-4">
            <Card.Header as="h5">Click the words in the correct order to form a sentence:</Card.Header>
            <Card.Body>
              <div className="word-buttons d-flex flex-wrap justify-content-center gap-2 mb-4">
                {shuffledWords.map((word, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleWordClick(word)}
                    disabled={selectedWords.includes(word)}
                    variant={selectedWords.includes(word) ? 'secondary' : 'outline-primary'}
                    className="m-1"
                  >
                    {word}
                  </Button>
                ))}
              </div>

              <h6 className="mt-4">Selected Words:</h6>
              <div className="selected-words border p-3 rounded bg-light mb-4 text-break">
                {selectedWords.length > 0 ? (
                  selectedWords.map((word, idx) => (
                    <Badge key={idx} bg="info" text="dark" className="me-2 mb-1 p-2">
                      {word}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted fst-italic">Click words above to build your sentence...</p>
                )}
              </div>

              {selectedWords.length === (Array.isArray(currentSentence) ? currentSentence.length : currentSentence.split(' ').length) && (
                <Button onClick={handleSubmit} variant="success" size="lg" className="mt-3">
                  Check Sentence
                </Button>
              )}

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

export default Level5;