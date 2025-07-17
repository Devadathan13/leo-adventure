// src/levels/Level1.jsx

import React, { useState } from 'react';
import { gameContent } from '../data/gameContent';

function Level1({ onComplete }) {
  const levelData = gameContent.level1;
  const { title, character, story, puzzle } = levelData;

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [feedback, setFeedback] = useState('');

  const handleSelect = (part) => {
    if (selectedOrder.includes(part)) return;
    setSelectedOrder([...selectedOrder, part]);
  };

  const handleSubmit = () => {
    const combinedOrder = [...selectedOrder, puzzle.prompt];

    const isCorrect = JSON.stringify(combinedOrder) === JSON.stringify(puzzle.correctOrder);

    if (isCorrect) {
      setFeedback('Correct order! Well done!');
      setTimeout(() => {
        onComplete();
      }, 1500);
    } else {
      setFeedback('That’s not quite right. Try again!');
      setSelectedOrder([]);
    }
  };

  return (
    <div className="level-container">
      <h3>{title}</h3>
      <p>{story}</p>

      <div className="character-placeholder">
        <p>{character}</p>
        {/* Example: <img src="/images/ollie-owl.png" alt={character} /> */}
      </div>

      <div className="puzzle-box">
        <p>Click the parts of the story in the correct order:</p>
        <div className="parts-list">
          {puzzle.parts.map((part, index) => (
            <button
              key={index}
              onClick={() => handleSelect(part)}
              disabled={selectedOrder.includes(part)}
            >
              {part}
            </button>
          ))}
        </div>

        <p>Selected Order:</p>
        <ol>
          {selectedOrder.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
          {selectedOrder.length === puzzle.parts.length && <li>{puzzle.prompt}</li>}
        </ol>

        {selectedOrder.length === puzzle.parts.length && (
          <button onClick={handleSubmit}>Submit</button>
        )}

        {feedback && <p className="feedback">{feedback}</p>}
      </div>
    </div>
  );
}

export default Level1;

