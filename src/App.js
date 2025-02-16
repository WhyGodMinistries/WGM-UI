import { Link } from 'react-router-dom';
import logo from './media/logo.PNG';
import ig from './media/Instagram_icon.png';
import YT from './media/youtube.png';
import email from './media/email_icon.png';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p style={{marginBottom : '25px'}}>Welcome To:</p>
        <h1 style={{fontFamily : 'Cinzel', fontWeight : '600'}}>Why God Ministries</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Our page is under construction. Please visit us at:
        </p>
        <div className='social_links]_container'>
          <a href="https://www.youtube.com/@whygodministries" target="_blank"><img src={YT} alt="Youtube page" className="social_icon"/></a>
          <a href="https://www.instagram.com/whygodministries/" target="_blank" className="social_link"><img src={ig} alt="Instagram page" className="social_icon"/></a>
          <a href="mailto:info@whygodministries.com" className="social_link"><img src={email} alt="Email icon to open contact form" className="social_icon"/></a>
        </div>
      </header>
    </div>
  );
}

export default App;
