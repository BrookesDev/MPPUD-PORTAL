import React, { useState, useEffect } from "react";
import classes from './Header.module.css';
import olarms from '../../Asset/olarmsLogo.svg';
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  // Handle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    
  };

  // Handle mobile menu item click
  const handleMobileMenuClick = () => {
    setMobileMenuOpen(false);
   
  };

  const getLinkClassName = ({ isActive }) => {
    return `${classes.getLinkClassName} ${isActive ? classes.active : ''}`;
  };

  const getMobileLinkClassName = ({ isActive }) => {
    return `${classes.getMobileLinkClassName} ${isActive ? classes.activeMobile : ''}`;
  };

  return (
    <header className={`${classes.header} `}>
      <div className={classes.logo}>
        <img src={olarms} alt="olarms logo"/>
      </div>

      <nav className={classes.navbar}>
        <Link to="/" className={classes.getLinkClassName} end>Home</Link>
        <Link to="/services" className={classes.getLinkClassName}>Services</Link>
        <Link to="/history" className={classes.getLinkClassName}>History</Link>
        <Link to="/faqs" className={classes.getLinkClassName}>FAQs</Link>
        <Link to="/contact" className={classes.getLinkClassName}>Contact Us</Link>
      </nav>

      <div className={classes.headerButtons}>
        <button className={classes.loginButton}>Log In</button>
        <button className={classes.getStartedButton}>Get Started</button>
      </div>

      <div
        className={`${classes.navToggle} ${mobileMenuOpen ? classes.active : ''}`}
        onClick={toggleMobileMenu}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      {mobileMenuOpen && (
        <div className={classes.navbarMobile}>
          <Link to="/" className={classes.getMobileLinkClassName} onClick={handleMobileMenuClick}>Home</Link>
          <Link to="/services" className={classes.getMobileLinkClassName} onClick={handleMobileMenuClick}>Services</Link>
          <Link to="/history" className={classes.getMobileLinkClassName} onClick={handleMobileMenuClick}>History</Link>
          <Link to="/faqs" className={classes.getMobileLinkClassName} onClick={handleMobileMenuClick}>FAQs</Link>
          <Link to="/contact" className={classes.getMobileLinkClassName} onClick={handleMobileMenuClick}>Contact Us</Link>
          <button className={`${classes.loginButton} ${classes.mobileButton}`} onClick={handleMobileMenuClick}>Log In</button>
          <button className={`${classes.getStartedButton} ${classes.mobileButton}`} onClick={handleMobileMenuClick}>Get Started</button>
        </div>
      )}
    </header>
  );
};

export default Header;