// src/levels/Level3.jsx

import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';

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
      }, 1000);
    } else {
      setFeedback('Try again!');
    }
  };

  return (
    <div className="level-container">
      <h3>{levelData.title}</h3>
      <p>{levelData.story}</p>

      <div className="character-placeholder">
        <p>{levelData.character}</p>
      </div>

      <div className="missing-letter-box">
        <p>Fill in the missing letters:</p>
        <h2>{currentWordData.gap}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Complete the word"
            autoFocus
          />
          <button type="submit">Submit</button>
        </form>

        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
}

export default Level3;
