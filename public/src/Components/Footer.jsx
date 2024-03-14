import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      textAlign: 'center',
      padding: '10px',
      position: 'fixed',
      left: '0',
      bottom: '0',
      width: '100%',
      backgroundColor: '#022B3A',
      color: 'white'
    }}>
      © {new Date().getFullYear()} TradeSync LTD. All rights reserved.
    </footer>
  );
};

export default Footer;
