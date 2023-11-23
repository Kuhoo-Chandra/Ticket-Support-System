import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './images/logo.png';

function Navbar() {
  const [showDropdown, setShowDropdown] = useState({
    books: false,
    authors: false,
    resources: false,
  });

  const toggleDropdown = (dropdown) => {
    setShowDropdown((prevState) => ({
      ...prevState,
      [dropdown]: !prevState[dropdown],
    }));
  };

  const Dropdown = ({ title, items, show, toggle }) => {
    return (
      <li className="nav-item dropdown">
        <button
          className="nav-link dropdown-toggle"
          onClick={toggle}
          aria-haspopup="true"
          aria-expanded={show}
        >
          {title}
        </button>
        <div className={`dropdown-menu ${show ? 'show' : ''}`}>
          {items.map((item, index) => (
            <Link key={index} to="#" className="dropdown-item">
              {item}
            </Link>
          ))}
        </div>
      </li>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#5B0E2D' }}>
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="Logo" width="50" height="50" />
        Abyssal Publication House
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <Dropdown
            title="Books"
            items={[
              'A Strange and Sublime Address',
              'A Bunch of Old Letter',
              'Circle of Silence',
              'Clear Light of Day',
              'Harry Potter',
            ]}
            show={showDropdown.books}
            toggle={() => toggleDropdown('books')}
          />
          <Dropdown
            title="Authors"
            items={[
              'Amit Chaudhuri',
              'Jawaharlal Nehru',
              'Preeti Singh',
              'Anita Desai',
              'J.K. Rowling',
            ]}
            show={showDropdown.authors}
            toggle={() => toggleDropdown('authors')}
          />
          <Dropdown
            title="Resources"
            items={['E-books', 'Research Papers']}
            show={showDropdown.resources}
            toggle={() => toggleDropdown('resources')}
          />
        </ul>
        {/* Right-aligned items */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <form className="form-inline my-2 my-lg-0">
              <input className="form-control mr-2" type="search" placeholder="Search" aria-label="Search" />
              {/* Add button for search if needed */}
            </form>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;