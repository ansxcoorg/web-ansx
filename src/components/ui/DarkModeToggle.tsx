"use client";

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    
    // Set initial mode based on localStorage value
    if (savedMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode; // Change the mode
    setDarkMode(newDarkMode); // Update state
    document.body.classList.toggle('dark', newDarkMode); // Toggle class
    localStorage.setItem('darkMode', newDarkMode.toString()); // Save to localStorage
  };

  return (
    <button onClick={toggleDarkMode} className="flex items-center space-x-2">
    {darkMode ? (
      <>
        <Sun className="text-yellow-500" /> 
        <span>Light Mode</span>
      </>
    ) : (
      <>
        <Moon className="text-gray-800" />
        <span>Dark Mode</span>
      </>
    )}
  </button>
  );
};

export default DarkModeToggle;
