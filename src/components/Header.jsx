import React from 'react';
import { Languages, Sun, Moon } from 'lucide-react';

const Header = ({ darkMode, onToggleDarkMode }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center space-x-3">
        <Languages className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Multilingual Translator
        </h1>
      </div>
      <button
        onClick={onToggleDarkMode}
        className={`p-3 rounded-full transition-all duration-300 ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} shadow-lg`}
      >
        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>
    </div>
  );
};

export default Header;
