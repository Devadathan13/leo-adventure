import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/background_home.jpg';
import lionGif from '../assets/lion_homepage.gif';

function HomePage() {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-white text-center vh-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* Lion GIF Left Side */}
          <div className="col-12 col-md-4 text-center mb-4 mb-md-0">
            <img
              src={lionGif}
              alt="Leo the Lion Cub"
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>

          {/* Content Block - Unchanged */}
          <div className="col-12 col-md-6">
            <div className="p-4 rounded bg-dark bg-opacity-50">
              <h2 className="mb-3">Welcome to the Land of Letters!</h2>
              <p className="mb-4">
                Join Leo the Lion Cub on a magical journey to earn the Golden Book of Wisdom.
              </p>

              <Link to="/level/1" className="btn btn-warning btn-lg">
                Start Adventure
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

