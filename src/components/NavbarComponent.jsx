// NavbarComponent.js
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import logo from './../media/logo.PNG';
import './../styles/NavbarComponent.css';

function NavbarComponent() {
  return (
    <Navbar expand="lg" collapseOnSelect id="navbar">
      <Container fluid id="container">
        <Navbar.Brand as={Link} to="/" id="wgm">
          <img src={logo} id="logo" alt="logo" /> WGM
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto navlink-wrapper">
            <Nav.Link as={Link} to="/" className='navbarLink'>Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className='navbarLink'>About</Nav.Link>
            <Nav.Link as={Link} to="/videos" className='navbarLink'>Videos</Nav.Link>
            <Nav.Link as={Link} to="/topics" className='navbarLink'>Topics</Nav.Link>
            <Nav.Link as={Link} to="/contact" className='navbarLink'>Contact Us</Nav.Link>
          </Nav>
          <div className="iconWrapper">
            <a href="https://www.instagram.com/whygodministries/" target="_blank" rel="noopener noreferrer" className="iconStyle">
              {/* Instagram SVG */}
              <svg className="niftybutton" style={{ display: 'block', fill: 'currentColor' }} viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                <title>Instagram social icon</title>
                <path d="M256 109.3c47.8 0 53.4 0.2 72.3 1 17.4 0.8 26.9 3.7 33.2 6.2 8.4 3.2 14.3 7.1 20.6 13.4 6.3 6.3 10.1 12.2 13.4 20.6 2.5 6.3 5.4 15.8 6.2 33.2 0.9 18.9 1 24.5 1 72.3s-0.2 53.4-1 72.3c-0.8 17.4-3.7 26.9-6.2 33.2 -3.2 8.4-7.1 14.3-13.4 20.6 -6.3 6.3-12.2 10.1-20.6 13.4 -6.3 2.5-15.8 5.4-33.2 6.2 -18.9 0.9-24.5 1-72.3 1s-53.4-0.2-72.3-1c-17.4-0.8-26.9-3.7-33.2-6.2 -8.4-3.2-14.3-7.1-20.6-13.4 -6.3-6.3-10.1-12.2-13.4-20.6 -2.5-6.3-5.4-15.8-6.2-33.2 -0.9-18.9-1-24.5-1-72.3s0.2-53.4 1-72.3c0.8-17.4 3.7-26.9 6.2-33.2 3.2-8.4 7.1-14.3 13.4-20.6 6.3-6.3 12.2-10.1 20.6-13.4 6.3-2.5 15.8-5.4 33.2-6.2C202.6 109.5 208.2 109.3 256 109.3M256 77.1c-48.6 0-54.7 0.2-73.8 1.1 -19 0.9-32.1 3.9-43.4 8.3 -11.8 4.6-21.7 10.7-31.7 20.6 -9.9 9.9-16.1 19.9-20.6 31.7 -4.4 11.4-7.4 24.4-8.3 43.4 -0.9 19.1-1.1 25.2-1.1 73.8 0 48.6 0.2 54.7 1.1 73.8 0.9 19 3.9 32.1 8.3 43.4 4.6 11.8 10.7 21.7 20.6 31.7 9.9 9.9 19.9 16.1 31.7 20.6 11.4 4.4 24.4 7.4 43.4 8.3 19.1 0.9 25.2 1.1 73.8 1.1s54.7-0.2 73.8-1.1c19-0.9 32.1-3.9 43.4-8.3 11.8-4.6 21.7-10.7 31.7-20.6 9.9-9.9 16.1-19.9 20.6-31.7 4.4-11.4 7.4-24.4 8.3-43.4 0.9-19.1 1.1-25.2 1.1-73.8s-0.2-54.7-1.1-73.8c-0.9-19-3.9-32.1-8.3-43.4 -4.6-11.8-10.7-21.7-20.6-31.7 -9.9-9.9-19.9-16.1-31.7-20.6 -11.4-4.4-24.4-7.4-43.4-8.3C310.7 77.3 304.6 77.1 256 77.1L256 77.1z" />
                <path d="M256 164.1c-50.7 0-91.9 41.1-91.9 91.9s41.1 91.9 91.9 91.9 91.9-41.1 91.9-91.9S306.7 164.1 256 164.1zM256 315.6c-32.9 0-59.6-26.7-59.6-59.6s26.7-59.6 59.6-59.6 59.6 26.7 59.6 59.6S288.9 315.6 256 315.6z" />
                <circle cx="351.5" cy="160.5" r="21.5" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@whygodministries" target="_blank" rel="noopener noreferrer" className="iconStyle">
              {/* YouTube SVG */}
              <svg className="niftybutton" style={{ display: 'block', fill: 'currentColor' }} viewBox="0 0 512 512" preserveAspectRatio="xMidYMid meet">
                <title>YouTube social icon</title>
                <path d="M422.6 193.6c-5.3-45.3-23.3-51.6-59-54 -50.8-3.5-164.3-3.5-215.1 0 -35.7 2.4-53.7 8.7-59 54 -4 33.6-4 91.1 0 124.8 5.3 45.3 23.3 51.6 59 54 50.9 3.5 164.3 3.5 215.1 0 35.7-2.4 53.7-8.7 59-54C426.6 284.8 426.6 227.3 422.6 193.6zM222.2 303.4v-94.6l90.7 47.3L222.2 303.4z" />
                </svg>
            </a>
            <a 
              href="https://www.tiktok.com/@whygodministries" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="iconStyle"
            >
              {/* TikTok SVG */}
              <svg 
                className="niftybutton" 
                viewBox="0 -15 550 550" 
                preserveAspectRatio="xMidYMid meet"
              >
                <title>TikTok social icon</title>
                <g transform='translate(-20,0)'>
                <path d="M412.19 152.06c-29.62-17.47-52.46-46.27-60.75-80.48-1.86-7.61-2.88-15.66-2.88-23.91h-81.5l-.14 236.36c-6.52-1.8-13.5-2.77-20.73-2.77-37.46 0-67.83 30.36-67.83 67.82s30.37 67.82 67.83 67.82c37.46 0 67.82-30.36 67.82-67.82V208.88c34.66 23.86 76.85 37.86 122.46 37.86v-82.8c-8.74.01-17.48-1.71-25.28-4.88z"/>
              </g>
              </svg>
            </a>
            <a 
              href="https://music.youtube.com/playlist?list=PLGn4G_8YYUBHtXb5Av_620FvmrfLx99sP&si=qxn7XLQ4dAa7ot_v" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="iconStyle"
            >
              {/* Podcast / Microphone SVG */}
              <svg 
                className="niftybutton" 
                viewBox="0 0 550 550" 
                preserveAspectRatio="xMidYMid meet"
              >
                <title>Podcast icon</title>
                <g transform='translate(15,0)'>
                <path d="M256 352c53 0 96-43 96-96V128c0-53-43-96-96-96s-96 43-96 96v128c0 53 43 96 96 96z"/>
                <path d="M368 224v32c0 61.9-50.1 112-112 112s-112-50.1-112-112v-32h-32v32c0 74 56.3 135.2 128 143.2V448h-64v32h160v-32h-64v-48.8c71.7-8 128-69.2 128-143.2v-32h-32z"/>
              </g>
              </svg>
            </a>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;