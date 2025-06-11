import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import GymAccess from './components/GymAccess/GymAccess';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/gym-access" element={<GymAccess />} />
          <Route path="/" element={
            <div className="home">
              <a href="/signup">Sign Up</a>
              <a href="/gym-access">Gym Access</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

// ✅ THIS IS IMPORTANT
export default App;
