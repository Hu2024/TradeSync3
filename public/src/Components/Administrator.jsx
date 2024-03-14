import React from 'react';
import { Link } from 'react-router-dom';

const Administrator = () => {

  const buttonStyle = {
    backgroundColor: '#022B3A', // Button background color
    color: 'White', // Text color
    padding: '10px 20px', // Padding inside the buttons
    margin: '5px', // Margin between the buttons
    border: 'none', // No border
    cursor: 'pointer', // Cursor changes to pointer on hover
    fontWeight: 'bold', // Make text bold
    height: '100px',
    width: '150px',
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
      <div>
        <button style={buttonStyle}><Link to="/new-stock" style={{ textDecoration: 'none', color: 'inherit' }}>Create New Stock</Link></button>
        <button style={buttonStyle}><Link to="/schedule" style={{ textDecoration: 'none', color: 'inherit' }}>Change Schedule</Link></button>
      </div>
    </div>
  );
};

export default Administrator;