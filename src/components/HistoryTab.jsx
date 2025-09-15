import React from 'react';
import { FileText, Trash2, Copy, Volume2 } from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../constants/languages.js';

const HistoryTab = ({
  history,
  darkMode,
  onClearHistory,
  onCopyText,
  onSpeakText
}) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h3 className="text-xl sm:text-2xl font-semibold">Translation History</h3>
        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Clear History</span>
          </button>
        )}
      </div>
      
      {history.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>No translations yet. Start translating to see your history here!</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {history.map((item) => (
            <div key={item.id} className={`p-4 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-1 sm:gap-2">
                <div className="flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-500">
                  <span className="whitespace-nowrap">{SUPPORTED_LANGUAGES[item.fromLang].flag} {SUPPORTED_LANGUAGES[item.fromLang].name}</span>
                  <span>→</span>
                  <span className="whitespace-nowrap">{SUPPORTED_LANGUAGES[item.toLang].flag} {SUPPORTED_LANGUAGES[item.toLang].name}</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500">{item.timestamp}</span>
              </div>
              <div className="mb-2">
                <p className="font-medium">Input: {item.inputText}</p>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <p className="text-indigo-600 text-sm sm:text-base">Output: {item.translatedText}</p>
                <div className="flex justify-end sm:justify-start gap-1 sm:gap-2">
                  <button
                    onClick={() => onCopyText(item.translatedText)}
                    className="p-1.5 sm:p-2 text-gray-500 hover:text-indigo-600 transition-colors"
                    title="Copy translation"
                  >
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={() => onSpeakText(item.translatedText, item.toLang)}
                    className="p-1.5 sm:p-2 text-gray-500 hover:text-green-600 transition-colors"
                    title="Speak translation"
                  >
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
              {item.confidence && (
                <div className="text-sm text-gray-500 mt-2">
                  Confidence: {Math.round(item.confidence * 100)}%
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTab;
