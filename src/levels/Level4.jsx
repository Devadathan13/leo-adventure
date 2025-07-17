// src/levels/Level4.jsx

import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';

function Level4({ onComplete }) {
  const levelData = gameContent.level4;
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');

  const currentPair = levelData.pairs[currentPairIndex];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.toUpperCase() === currentPair.rhyme) {
      setFeedback('That’s a rhyme!');
      setTimeout(() => {
        const nextIndex = currentPairIndex + 1;
        if (nextIndex < levelData.pairs.length) {
          setCurrentPairIndex(nextIndex);
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

      <div className="rhyme-box">
        <p>Find a word that rhymes with:</p>
        <h2>{currentPair.word}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a rhyming word"
            autoFocus
          />
          <button type="submit">Submit</button>
        </form>

        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
}

export default Level4;
