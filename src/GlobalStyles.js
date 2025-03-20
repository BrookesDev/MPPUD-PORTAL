// GlobalStyles.js
import React from 'react';
import { useTheme } from './ThemeContext';

const GlobalStyles = ({ children }) => {
  const { isDarkMode } = useTheme();

  const globalStyles = {
    backgroundColor: isDarkMode ? 'black' : 'inherit', // Only change background in dark mode
    color: isDarkMode ? 'white' : 'inherit', // Only change text color in dark mode
    minHeight: '100vh', // Ensure it covers the entire page
  };

  return <div style={globalStyles}>{children}</div>;
};

export default GlobalStyles;