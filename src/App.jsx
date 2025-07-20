import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GameContainer from './components/GameContainer';
import EndPage from './pages/EndPage';




function App() {

  return (
    <Router>
      <div className="App">  
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.5/dist/css/bootstrap.min.css"
            integrity="sha384-SgOJa3DmI69IUzQ2PVdRZhwQ+dy64/BUtbMJw1MZ8t5HZApcHrRKUc4W0kG879m7"
            crossOrigin="anonymous"
          />
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
