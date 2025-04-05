// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import YouTubeFeed from './components/Videos';
import AboutUs from './components/AboutUs';
import logo from './media/logo.PNG';
import './styles/App.css';

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontFamily: 'Cinzel', fontWeight: '600' }}>Why God Ministries</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <YouTubeFeed />
    </div>
  );
}

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/videos" element={<YouTubeFeed />} />
      </Routes>
    </Router>
  );
}

export default App;
