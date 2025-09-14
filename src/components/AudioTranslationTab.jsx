import React, { useState } from 'react';
import { Mic, MicOff, Volume2, Copy, Download, Languages } from 'lucide-react';
import ScriptToggle from './ScriptToggle.jsx';
import { toRomanized, toNativeScript } from '../utils/translationService.js';

const AudioTranslationTab = ({
  inputText,
  translatedText,
  isListening,
  isTranslating,
  isSpeaking,
  confidence,
  liveTranslation,
  inputLanguage,
  outputLanguage,
  darkMode,
  onInputTextChange,
  onStartListening,
  onStopListening,
  onTranslate,
  onSpeakText,
  onCopyText,
  onExportText,
  onLiveTranslationChange,
  isRecognitionSupported
}) => {
  const [inputRomanized, setInputRomanized] = useState(false);
  const [outputRomanized, setOutputRomanized] = useState(false);

  // Get display text based on romanization toggle
  const getDisplayText = (text, language, isRomanized) => {
    if (!text || !text.trim()) return text;
    
    // Only apply romanization for supported languages
    const supportedLanguages = ['hi', 'or', 'bn', 'pa', 'ta', 'te', 'gu', 'kn', 'ml', 'mr', 'ro'];
    if (!supportedLanguages.includes(language)) {
      return text;
    }
    
    try {
      return isRomanized ? toRomanized(text, language) : text;
    } catch (error) {
      console.error('Romanization error:', error);
      return text;
    }
  };

  // Handle input text with romanization
  const handleInputChange = (value) => {
    if (inputRomanized && ['hi', 'or', 'bn', 'pa', 'ta', 'te', 'gu', 'kn', 'ml', 'mr', 'ro'].includes(inputLanguage)) {
      try {
        // Convert romanized input to native script
        const nativeText = toNativeScript(value, inputLanguage);
        onInputTextChange(nativeText);
      } catch (error) {
        console.error('Input romanization error:', error);
        onInputTextChange(value);
      }
    } else {
      onInputTextChange(value);
    }
  };
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 mb-8`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Input Text</h3>
              <ScriptToggle
                language={inputLanguage}
                isRomanized={inputRomanized}
                onToggle={() => setInputRomanized(!inputRomanized)}
                darkMode={darkMode}
              />
            </div>
            <div className="flex space-x-2">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={liveTranslation}
                  onChange={(e) => onLiveTranslationChange(e.target.checked)}
                  className="rounded"
                />
                <span>Live Translation</span>
              </label>
            </div>
          </div>
          
          <textarea
            value={inputRomanized ? getDisplayText(inputText, inputLanguage, true) : inputText}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={inputRomanized ? "Type in romanized text (e.g., namaste)..." : "Start speaking or type here..."}
            className={`w-full h-40 p-4 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none ${
              darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
            }`}
            style={{ 
              fontFamily: inputLanguage === 'or' ? '"Noto Sans Odia", "Kalinga", serif' : 
                         inputLanguage === 'hi' ? '"Noto Sans Devanagari", "Mangal", serif' :
                         inputLanguage === 'bn' ? '"Noto Sans Bengali", "Vrinda", serif' :
                         inputLanguage === 'ta' ? '"Noto Sans Tamil", "Latha", serif' :
                         inputLanguage === 'te' ? '"Noto Sans Telugu", "Gautami", serif' :
                         inputLanguage === 'gu' ? '"Noto Sans Gujarati", "Shruti", serif' :
                         inputLanguage === 'kn' ? '"Noto Sans Kannada", "Tunga", serif' :
                         inputLanguage === 'ml' ? '"Noto Sans Malayalam", "Kartika", serif' :
                         inputLanguage === 'pa' ? '"Noto Sans Gurmukhi", "Raavi", serif' :
                         'inherit'
            }}
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <button
                onClick={isListening ? onStopListening : onStartListening}
                disabled={!isRecognitionSupported}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                <span>{isListening ? 'Stop Recording' : 'Start Recording'}</span>
              </button>
              
              {inputText && (
                <button
                  onClick={() => onSpeakText(inputText, inputLanguage)}
                  disabled={isSpeaking}
                  className="flex items-center space-x-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {confidence > 0 && (
              <div className="text-sm text-gray-500">
                Confidence: {Math.round(confidence * 100)}%
              </div>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold">Translation</h3>
              <ScriptToggle
                language={outputLanguage}
                isRomanized={outputRomanized}
                onToggle={() => setOutputRomanized(!outputRomanized)}
                darkMode={darkMode}
              />
            </div>
            <button
              onClick={onTranslate}
              disabled={!inputText.trim() || isTranslating}
              className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isTranslating ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Languages className="w-4 h-4" />
              )}
              <span>Translate</span>
            </button>
          </div>
          
          <div 
            className={`h-40 p-4 rounded-lg border-2 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} overflow-y-auto`}
            style={{ 
              fontFamily: outputLanguage === 'or' ? '"Noto Sans Odia", "Kalinga", serif' : 
                         outputLanguage === 'hi' ? '"Noto Sans Devanagari", "Mangal", serif' :
                         outputLanguage === 'bn' ? '"Noto Sans Bengali", "Vrinda", serif' :
                         outputLanguage === 'ta' ? '"Noto Sans Tamil", "Latha", serif' :
                         outputLanguage === 'te' ? '"Noto Sans Telugu", "Gautami", serif' :
                         outputLanguage === 'gu' ? '"Noto Sans Gujarati", "Shruti", serif' :
                         outputLanguage === 'kn' ? '"Noto Sans Kannada", "Tunga", serif' :
                         outputLanguage === 'ml' ? '"Noto Sans Malayalam", "Kartika", serif' :
                         outputLanguage === 'pa' ? '"Noto Sans Gurmukhi", "Raavi", serif' :
                         'inherit'
            }}
          >
            {translatedText ? (
              outputRomanized ? getDisplayText(translatedText, outputLanguage, true) : translatedText
            ) : (
              <span className="text-gray-500 italic">Translation will appear here...</span>
            )}
          </div>
          
          {translatedText && translatedText.trim() && translatedText !== "Translation will appear here..." && (
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => onSpeakText(translatedText, outputLanguage)}
                disabled={isSpeaking}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {isSpeaking ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
                <span>{isSpeaking ? 'Speaking...' : 'Speak'}</span>
              </button>
              
              <button
                onClick={() => onCopyText(getDisplayText(translatedText, outputLanguage, outputRomanized))}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Copy</span>
              </button>
              
              <button
                onClick={() => onExportText(getDisplayText(translatedText, outputLanguage, outputRomanized))}
                className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AudioTranslationTab;
