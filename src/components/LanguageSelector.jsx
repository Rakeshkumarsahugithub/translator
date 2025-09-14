import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants/languages.js';

const LanguageSelector = ({ 
  inputLanguage, 
  outputLanguage, 
  onInputLanguageChange, 
  onOutputLanguageChange, 
  onSwapLanguages,
  darkMode 
}) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 mb-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">From Language</label>
          <select
            value={inputLanguage}
            onChange={(e) => onInputLanguageChange(e.target.value)}
            className={`w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}
          >
            {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
              <option key={code} value={code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">To Language</label>
          <div className="flex space-x-2">
            <select
              value={outputLanguage}
              onChange={(e) => onOutputLanguageChange(e.target.value)}
              className={`flex-1 p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
              }`}
            >
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <button
              onClick={onSwapLanguages}
              className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              title="Swap languages"
            >
              ⇄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
