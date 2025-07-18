import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background_home.jpg';
import celebrationGif from '../assets/congratulations.gif';

function EndPage() {
  return (
    <div
      className="position-relative d-flex flex-column justify-content-center align-items-center text-white text-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Fullscreen Celebration GIF Overlay */}
      <img
        src={celebrationGif}
        alt="Congratulations"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: 'cover',
          zIndex: 1,
          opacity: 0.7,
        }}
      />

      {/* Content Block */}
      <div
        className="p-4 rounded bg-dark bg-opacity-50 position-relative"
        style={{ zIndex: 2 }}
      >
        <h2 className="mb-3">Congratulations! 🎉</h2>

        <p className="mb-2">You helped Leo become a Word Wizard!</p>
        <p className="mb-4">You've unlocked the secrets of reading and language.</p>

        <Link to="/">
          <button className="btn btn-warning btn-lg">Play Again</button>
        </Link>
      </div>
    </div>
  );
}

export default EndPage;
