// src/components/GameContainer.jsx

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Level1 from '../levels/Level1';
import Level2 from '../levels/Level2';
import Level3 from '../levels/Level3';
import Level4 from '../levels/Level4';
import Level5 from '../levels/Level5';

const levelComponents = { 1: Level1, 2: Level2, 3: Level3, 4: Level4, 5: Level5 };

function GameContainer() {
  const { levelId } = useParams();
  const navigate = useNavigate();
  const currentLevel = parseInt(levelId, 10);
  
  const handleLevelComplete = () => {
    const nextLevel = currentLevel + 1;
    if (nextLevel > 5) {
      navigate('/congratulations');
    } else {
      navigate(`/level/${nextLevel}`);
    }
  };

  const CurrentLevelComponent = levelComponents[currentLevel];

  if (!CurrentLevelComponent) {
    // You can create a simple 'NotFound' component for this
    return <div>Level not found! Go <a href="/">Home</a></div>;
  }

  // Pass the onComplete function as a prop to the current level
  return <CurrentLevelComponent onComplete={handleLevelComplete} />;
}

export default GameContainer;