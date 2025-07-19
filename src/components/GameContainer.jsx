import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import YouTube from 'react-youtube';
import Level1 from '../levels/Level1';
import Level2 from '../levels/Level2';
import Level3 from '../levels/Level3';
import Level4 from '../levels/Level4';
import Level5 from '../levels/Level5';

const levelComponents = { 1: Level1, 2: Level2, 3: Level3, 4: Level4, 5: Level5 };
const FINAL_LEVEL = 5;
const FIRST_LEVEL = 1;

const introVideoId = 'nEB2-qB6ge8';    // Video before Level 1
const outroVideoId = 'Mjs7BoVr6Zs';    // Video after Level 5

const transitionVideoIds = {
  1: '0uWvEF4nevI', // After level 1
  2: '-toatmb9S7c', // After level 2
  3: 'TwETfWMA1qc', // After level 3
  4: 'qbGMuuxrK2I', // After level 4
};

function GameContainer() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const currentLevel = parseInt(levelId, 10);

  // --- Consolidated State Management ---
  const [videoToPlayId, setVideoToPlayId] = useState(null);
  const [introPlayed, setIntroPlayed] = useState(false);

  // Effect to trigger the intro video
  useEffect(() => {
    if (currentLevel === FIRST_LEVEL && !introPlayed) {
      setVideoToPlayId(introVideoId);
    }
  }, [currentLevel, introPlayed]);

  // Called when a level is completed
  const handleLevelComplete = () => {
    if (currentLevel === FINAL_LEVEL) {
      setVideoToPlayId(outroVideoId);
    } else {
      setVideoToPlayId(transitionVideoIds[currentLevel]);
    }
  };

  // A single handler for when any video ends
  const handleVideoEnd = () => {
    const wasIntro = videoToPlayId === introVideoId;
    setVideoToPlayId(null); // Hide the modal

    if (wasIntro) {
      setIntroPlayed(true); // Mark intro as played and stay on Level 1
    } else {
      // It was a transition or outro, so navigate
      const nextLevel = currentLevel + 1;
      if (currentLevel >= FINAL_LEVEL) {
        navigate('/congratulations');
      } else {
        navigate(`/level/${nextLevel}`);
      }
    }
  };

  const CurrentLevelComponent = levelComponents[currentLevel];
  // Don't render the level while the intro is playing
  const shouldRenderLevel = CurrentLevelComponent && (videoToPlayId !== introVideoId);

  // Options for the YouTube player
  const playerOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  return (
    <>
      {shouldRenderLevel && <CurrentLevelComponent onComplete={handleLevelComplete} />}

      {!CurrentLevelComponent && (
        <div>Level not found! Go <a href="/">Home</a></div>
      )}

      {/* A single, unified modal for all videos */}
      <Modal
        show={!!videoToPlayId}
        fullscreen={true}
        centered
      >
        <Modal.Body className="p-0 bg-black text-center">
          {videoToPlayId && (
            <YouTube
              videoId={videoToPlayId}
              opts={playerOptions}
              onEnd={handleVideoEnd}
              className="w-100 h-100"
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GameContainer;