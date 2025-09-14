import React from 'react';
import { Languages, Type } from 'lucide-react';

const ScriptToggle = ({ 
  language, 
  isRomanized, 
  onToggle, 
  darkMode,
  disabled = false 
}) => {
  // Only show toggle for supported languages with romanization
  const supportedLanguages = ['hi', 'or', 'bn', 'pa', 'ta', 'te', 'gu', 'kn', 'ml', 'mr', 'ro'];
  
  if (!supportedLanguages.includes(language)) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
          disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : darkMode
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
        title={`Switch to ${isRomanized ? 'Native Script' : 'Romanized'} text`}
      >
        {isRomanized ? <Type className="w-4 h-4" /> : <Languages className="w-4 h-4" />}
        <span>{isRomanized ? 'Roman' : 'Native'}</span>
      </button>
    </div>
  );
};

export default ScriptToggle;
