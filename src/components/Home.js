

import React from 'react';
import { Link } from 'react-router-dom';
import books3 from "./images/books3.jpg";

const homeStyles = {
  background: '#795c4d',
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'darkblue',
};

function Home() {
  return (
    <div style={homeStyles}>
      <div className="text-center">
        <h1>Welcome to </h1><h1>Abyssal Publication House</h1>
        <p>How can we assist you today?</p>
      </div>
      <div className="text-center mt-4">
        <Link to="/dashboard" className="btn btn-primary mr-2">Dashboard</Link></div>
      <div className="text-center mt-4">
        <Link to="/create-ticket" className="btn btn-primary mr-2">Create New Ticket</Link></div>
    </div>
  );
}

export default Home;



