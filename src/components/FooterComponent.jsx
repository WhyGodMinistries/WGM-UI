import React from 'react';
import '../styles/FooterComponent.css';

const FooterComponent = () => {
  return (
    <footer className="footerContainer">
      <p>&copy; {new Date().getFullYear()} Why God Ministries. All rights reserved.</p>
    </footer>
  );
}

export default FooterComponent;