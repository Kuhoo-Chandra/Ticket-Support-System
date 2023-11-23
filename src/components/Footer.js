import React from 'react';

function Footer() {
  return (
    <footer style={{ backgroundColor: '#343a40', color: '#fff', padding: '2rem 0' }} className="mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4 style={{ color: '#61dafb' }}>Contact Us</h4>
            <p>Email: <a href="mailto:support@abyssal.com" style={{ color: '#ffc107' }}>support@abyssal.com</a></p>
            <p>Phone: +1 (123) 456-7890</p>
          </div>
          <div className="col-md-6">
            <h4 style={{ color: '#61dafb' }}>References</h4>
            <ul className="list-unstyled">
              <li><a href="#" style={{ color: '#ffc107', textDecoration: 'none' }}>Privacy Policy</a></li>
              <li><a href="#" style={{ color: '#ffc107', textDecoration: 'none' }}>Terms of Service</a></li>
              <li><a href="#" style={{ color: '#ffc107', textDecoration: 'none' }}>About Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
