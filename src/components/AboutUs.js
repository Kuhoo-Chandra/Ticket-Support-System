import React from 'react';

const aboutUsStyles = {
  background: '#795c4d', 
  height: '100vh',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontFamily: 'Allan',
};

function AboutUs() {
  return (
    <div style={aboutUsStyles}>
      <div className="text-center">
        <h2>About Us</h2>
        <p><b>At Abyssal Publication House, our mission is to offer a diverse range of literature that inspires, entertains, and enriches the lives of our readers. Founded with an aim to foster a community of passionate readers and exceptional authors, we've dedicated ourselves to curating exceptional works across various genres.</b></p>
        <p><b>
        Our commitment lies in nurturing emerging talents and celebrating the established, promoting a collection of thought-provoking literature that explores different cultures, beliefs, and experiences. Our team is dedicated to providing a platform for both budding and established writers to share their stories and ideas with the world.
        </b></p>
      </div>
    </div>
  );
}

export default AboutUs;
