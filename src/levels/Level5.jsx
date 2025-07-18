import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import backgroundImage from '../assets/background_level1.png';

function Level5({ onComplete }) {
  const levelData = gameContent.level5;
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [feedback, setFeedback] = useState('');

  const currentSentence = levelData.sentences[sentenceIndex];
  const shuffledWords = [...currentSentence].sort(() => 0.5 - Math.random());

  const handleWordClick = (word) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleSubmit = () => {
    const isCorrect = JSON.stringify(selectedWords) === JSON.stringify(currentSentence);

    if (isCorrect) {
      setFeedback('Correct sentence!');
      setTimeout(() => {
        if (sentenceIndex + 1 < levelData.sentences.length) {
          setSentenceIndex(sentenceIndex + 1);
          setSelectedWords([]);
          setFeedback('');
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setFeedback('That’s not correct. Try again!');
      setSelectedWords([]);
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

              <div className="text-center mb-3">
                <p className="fw-bold">{levelData.character}</p>
              </div>

              <p className="fw-bold mb-2 text-center">Click the words in the correct order:</p>

              <div className="d-flex flex-wrap justify-content-center gap-2 mb-3">
                {shuffledWords.map((word, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleWordClick(word)}
                    disabled={selectedWords.includes(word)}
                    variant="warning"
                  >
                    {word}
                  </Button>
                ))}
              </div>

              <div className="selected-order mb-3">
                <p className="fw-bold text-center">Selected Words:</p>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {selectedWords.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-2 rounded"
                      style={{
                        background: 'rgba(255, 255, 255, 0.3)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>

              {selectedWords.length === currentSentence.length && (
                <div className="d-grid">
                  <Button onClick={handleSubmit} variant="success">
                    Check Sentence
                  </Button>
                </div>
              )}

              {feedback && (
                <Alert
                  variant={feedback === 'Correct sentence!' ? 'success' : 'danger'}
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

export default Level5;
