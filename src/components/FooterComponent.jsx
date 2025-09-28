import React from 'react';

const FooterComponent = () => {
  return (
    <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#f0f0f0', marginTop: '20px' }}>
      <p>&copy; {new Date().getFullYear()} Why God Ministries. All rights reserved.</p>
    </footer>
  );
}

export default FooterComponent;