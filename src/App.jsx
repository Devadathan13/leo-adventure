import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameContainer from './components/GameContainer';
import EndPage from './pages/EndPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Leo's Learning Adventure</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/level/:levelId" element={<GameContainer />} />
            <Route path="/congratulations" element={<EndPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
