import React, { useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Level1 from '../levels/Level1';
import Level2 from '../levels/Level2';
import Level3 from '../levels/Level3';
import Level4 from '../levels/Level4';
import Level5 from '../levels/Level5';

const levelComponents = { 1: Level1, 2: Level2, 3: Level3, 4: Level4, 5: Level5 };

// You can have a different video for each level transition
const transitionVideos = {
  1: '../src/assets/video_lvl2.mp4',
  2: '../src/assets/video_lvl3.mp4',
  3: '../src/assets/video_lvl4.mp4',
  4: '../src/assets/video_lvl5.mp4',
  5: '../src/assets/video_final.mp4',
};



// Video for the game introduction
const introVideo = "../src/assets/video_intro.mp4";



function GameContainer() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const currentLevel = parseInt(levelId, 10);

  // State for the transition video modal
  const [showVideoModal, setShowVideoModal] = useState(false);
  // State for the intro video modal
  const [showIntroModal, setShowIntroModal] = useState(false);
  // State to track if the intro has finished playing
  const [introPlayed, setIntroPlayed] = useState(false);

  // useEffect to show the intro video before level 1 starts
  useEffect(() => {
    // Only show the intro if it's level 1 and the intro hasn't been played yet
    if (currentLevel === 1 && !introPlayed) {
      setShowIntroModal(true);
    }
  }, [currentLevel, introPlayed]);


  const handleLevelComplete = () => {
    // Show the transition video modal
    setShowVideoModal(true);
  };

  const handleTransitionVideoEnd = () => {
    setShowVideoModal(false); // Hide the modal
    const nextLevel = currentLevel + 1;
    if (nextLevel > 5) {
      navigate('/congratulations');
    } else {
      navigate(`/level/${nextLevel}`);
    }
  };

  const handleIntroEnd = () => {
    setShowIntroModal(false); // Hide intro modal
    setIntroPlayed(true);     // Mark intro as played
  };

  const CurrentLevelComponent = levelComponents[currentLevel];

  if (!CurrentLevelComponent) {
    return <div>Level not found! Go <a href="/">Home</a></div>;
  }

  // We only render the level component if the intro is not supposed to be playing.
  const shouldRenderLevel = !showIntroModal;

  return (
    <>
      {shouldRenderLevel && <CurrentLevelComponent onComplete={handleLevelComplete} />}

      {/* Modal for the Intro Video */}
      <Modal
        show={showIntroModal}
        fullscreen={true}
        onHide={handleIntroEnd} // Optional: allow user to skip intro
        centered
      >
        <Modal.Body className="p-0 bg-black text-center">
          <video
            width="100%"
            height="100%"
            autoPlay
            onEnded={handleIntroEnd}
            style={{ objectFit: 'contain' }}
          >
            <source src={introVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal.Body>
      </Modal>

      {/* Modal for the Level Transition Videos */}
      <Modal
        show={showVideoModal}
        fullscreen={true}
        onHide={() => setShowVideoModal(false)}
        centered
      >
        <Modal.Body className="p-0 bg-black text-center">
          <video
            width="100%"
            height="100%"
            autoPlay
            onEnded={handleTransitionVideoEnd}
            style={{ objectFit: 'contain' }}
          >
            <source src={transitionVideos[currentLevel]} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GameContainer;