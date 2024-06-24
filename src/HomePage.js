import React from 'react';
import background from './cartoon-laundry-room.jpg'; // Import your background image
import logo from './polaroid-svgrepo-com.svg'; // Replace with your futuristic logo
import './App.css';

const HomePage = () => (
  <div className="App">
    <header className="App-header" style={{ backgroundImage: `url(${background})` }}>
      <img src={logo} className="App-logo" alt="logo" />
      <p>Welcome to the Home Page!</p>
      {/* Add your home page content here */}
    </header>
  </div>
);

export default HomePage;
