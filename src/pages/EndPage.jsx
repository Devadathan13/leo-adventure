// src/pages/EndPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function EndPage() {
  return (
    <div className="end-page">
      <h2>Congratulations! 🎉</h2>

      <div className="image-placeholder">
        <p></p>
        {/* <img src="/images/golden-book.png" alt="Golden Book of Wisdom" /> */}
      </div>
      
      <p>You helped Leo become a Word Wizard! You've unlocked the secrets of reading and language.</p>
      
      <Link to="/">
        <button className="start-button">Play Again</button>
      </Link>
    </div>
  );
}

export default EndPage;