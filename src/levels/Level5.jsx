// src/levels/Level5.jsx

import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';

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
    <div className="level-container">
      <h3>{levelData.title}</h3>
      <p>{levelData.story}</p>

      <div className="character-placeholder">
        <p>{levelData.character}</p>
      </div>

      <div className="sentence-builder">
        <p>Click the words in the correct order to form a sentence:</p>
        <div className="word-buttons">
          {shuffledWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleWordClick(word)}
              disabled={selectedWords.includes(word)}
            >
              {word}
            </button>
          ))}
        </div>

        <p>Selected Words:</p>
        <div className="selected-words">
          {selectedWords.map((word, idx) => (
            <span key={idx}>{word} </span>
          ))}
        </div>

        {selectedWords.length === currentSentence.length && (
          <button onClick={handleSubmit}>Check Sentence</button>
        )}

        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
}

export default Level5;
