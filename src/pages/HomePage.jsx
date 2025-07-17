import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <h2>Welcome to the Land of Letters!</h2>
      <p>Join Leo the Lion Cub on a magical journey to earn the Golden Book of Wisdom.</p>
      
      {/* Vite serves the 'public' folder at the root.
        So, if your video is at 'public/videos/intro-video.mp4', 
        the src path is '/videos/intro-video.mp4'.
      */}
      <div className="video-placeholder">
        <p>[ About Leo's Story ]</p>
        {/* Example: <video src="/videos/intro-video.mp4" autoPlay muted loop width="500" /> */}
      </div>
      
      <Link to="/level/1">
        <button className="start-button">Start Adventure</button>
      </Link>
    </div>
  );
}

export default HomePage;