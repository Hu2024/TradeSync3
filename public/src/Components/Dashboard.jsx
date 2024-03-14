import React from 'react';
import myImage from '../Resources/Images/dashboard.jpg';

const Dashboard = () => {
  return (
    <main>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh' // This makes the div take the full height of the viewport
      }}>
        <img src={myImage} style={{ width: '90vh', height: '80vh' }} alt="Description" />
      </div>
    </main>
  );
};

export default Dashboard;