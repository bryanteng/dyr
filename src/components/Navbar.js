import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';

const Navbar = ({showNavbar, setShowNavbar}) => {
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target) && event.target.id !== 'menu-button') { //add id of header nav show button
        setShowNavbar(false); // Close the navbar when clicking outside
    }
  };

  useEffect(() => {
    if (showNavbar) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [showNavbar]);

  return (
    <div className="navbar-container">

      <nav
        ref={navbarRef}
        className={`navbar ${showNavbar ? 'open' : 'closed'}`}
        tabIndex="0" // Enables focus for blur detection
        onBlur={() => setShowNavbar(false)}
      >
        <ul>
            <li> Coming soon! </li>
          {/* <li><a href="home">Home</a></li>
          <li><a href="about">About</a></li>
          <li><a href="services">Services</a></li>
          <li><a href="contact">Contact</a></li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
