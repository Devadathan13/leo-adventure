// src/levels/Level2.jsx

import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';

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
          onComplete(); // Call the function to navigate to the next level
        }
      }, 1500);
    } else {
      setFeedback('Not quite, try again!');
      setInputValue('');
    }
  };

  return (
    <div className="level-container">
      <h3>{levelData.title}</h3>
      <p>{levelData.story}</p>

      {/* Put character images in the public/ folder */}
      <div className="character-placeholder">
        <p></p>
        {/* <img src="/images/wiggle-worm.png" alt="Wiggle the Word Worm" /> */}
      </div>

      <div className="jumbled-word">{scrambled}</div>
      
      <form onSubmit={handleGuess}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Unscramble the word"
          autoFocus
        />
        <button type="submit">Check</button>
      </form>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default Level2;