// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import YouTubeFeed from './components/Videos';
import AboutUs from './components/AboutUs';
import Topics from './components/Topics';
import ContactForm from './components/ContactForm';
import logo from './media/logo.PNG';
import './styles/App.css';

function HomePage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ fontFamily: 'Cinzel', fontWeight: '600', fontSize: '60px' }}>Why God Ministries</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <h3 style={{ textDecoration: 'italic', fontSize: '24px', fontFamily: 'Open Sans'}}>Evidence God is Real and The Bible is True</h3>
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
        <Route path="/topics" element={<Topics />} />
        <Route path="/contact" element={<ContactForm />} />
      </Routes>
    </Router>
  );
}

export default App;
