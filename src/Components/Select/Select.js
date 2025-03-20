import React, { useState, useEffect, useRef } from 'react';
import styles from './Select.module.css';

const Dropdown = ({ title, option }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (e) => {
    e.preventDefault();
    if (option.onClick) {
      option.onClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {title}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          <a 
            href={option.href || '#'} 
            className={styles.dropdownItem}
            onClick={handleOptionClick}
          >
            {option.label}
          </a>
        </div>
      )}
    </div>
  );
};

export default Dropdown;