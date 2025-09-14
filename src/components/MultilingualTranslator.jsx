import React, { useState, useCallback } from 'react';
import { translateText, extractTextFromImage, copyToClipboard, exportText } from '../utils/translationService.js';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition.js';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis.js';
import Header from './Header.jsx';
import TabNavigation from './TabNavigation.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import AudioTranslationTab from './AudioTranslationTab.jsx';
import ImageOCRTab from './ImageOCRTab.jsx';
import HistoryTab from './HistoryTab.jsx';
import FeaturesInfo from './FeaturesInfo.jsx';
import ContactCard from './ContactCard.jsx';

const MultilingualTranslator = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('en');
  const [outputLanguage, setOutputLanguage] = useState('hi');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('audio');
  const [liveTranslation, setLiveTranslation] = useState(false);

  // Custom hooks
  const { isSpeaking, speakText } = useSpeechSynthesis();
  
  const handleTranscript = useCallback((transcript, confidence) => {
    setInputText(transcript);
    
    // Live translation - only trigger for final results, not interim
    if (liveTranslation && transcript.trim() && confidence > 0.7) {
      // Debounce the translation to avoid too many API calls
      clearTimeout(window.liveTranslationTimeout);
      window.liveTranslationTimeout = setTimeout(() => {
        handleTranslate(transcript, confidence);
      }, 1000);
    }
  }, [liveTranslation, inputLanguage, outputLanguage]);

  // Handle live translation for typed text
  const handleInputTextChange = useCallback((text) => {
    setInputText(text);
    
    if (liveTranslation && text.trim()) {
      // Debounce the translation for typed text
      clearTimeout(window.liveTranslationTimeout);
      window.liveTranslationTimeout = setTimeout(() => {
        handleTranslate(text, 1.0);
      }, 1500);
    }
  }, [liveTranslation, inputLanguage, outputLanguage]);

  const { 
    isListening, 
    confidence, 
    startListening, 
    stopListening, 
    isSupported: isRecognitionSupported 
  } = useSpeechRecognition(inputLanguage, liveTranslation, handleTranscript);

  const handleTranslate = async (textToTranslate = inputText, textConfidence = confidence) => {
    if (!textToTranslate.trim()) return;
    
    setIsTranslating(true);
    try {
      const translated = await translateText(textToTranslate, inputLanguage, outputLanguage);
      setTranslatedText(translated);
      
      // Add to history
      const historyItem = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        inputText: textToTranslate,
        translatedText: translated,
        fromLang: inputLanguage,
        toLang: outputLanguage,
        confidence: textConfidence
      };
      
      setHistory(prev => [historyItem, ...prev.slice(0, 9)]);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleImageUpload = async (event, onProgress) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsProcessingImage(true);
    try {
      const extractedText = await extractTextFromImage(file, onProgress);
      setInputText(extractedText);
      setActiveTab('audio'); // Switch to main view
    } catch (error) {
      console.error('OCR error:', error);
      setInputText('Error processing image. Please try again with a clearer image.');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleStartListening = () => {
    setInputText('');
    setTranslatedText('');
    startListening();
  };

  const swapLanguages = () => {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
    setInputText(translatedText);
    setTranslatedText(inputText);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const handleCopyText = async (text) => {
    const success = await copyToClipboard(text);
    if (success) {
      // Could add a toast notification here
      console.log('Text copied to clipboard');
    }
  };

  const handleExportText = (text) => {
    exportText(text, `translation_${Date.now()}.txt`);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header 
          darkMode={darkMode} 
          onToggleDarkMode={() => setDarkMode(!darkMode)} 
        />

        <TabNavigation 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          historyCount={history.length}
          darkMode={darkMode}
        />

        {activeTab === 'audio' && (
          <>
            <LanguageSelector
              inputLanguage={inputLanguage}
              outputLanguage={outputLanguage}
              onInputLanguageChange={setInputLanguage}
              onOutputLanguageChange={setOutputLanguage}
              onSwapLanguages={swapLanguages}
              darkMode={darkMode}
            />

            <AudioTranslationTab
              inputText={inputText}
              translatedText={translatedText}
              isListening={isListening}
              isTranslating={isTranslating}
              isSpeaking={isSpeaking}
              confidence={confidence}
              liveTranslation={liveTranslation}
              inputLanguage={inputLanguage}
              outputLanguage={outputLanguage}
              darkMode={darkMode}
              onInputTextChange={handleInputTextChange}
              onStartListening={handleStartListening}
              onStopListening={stopListening}
              onTranslate={() => handleTranslate()}
              onSpeakText={speakText}
              onCopyText={handleCopyText}
              onExportText={handleExportText}
              onLiveTranslationChange={setLiveTranslation}
              isRecognitionSupported={isRecognitionSupported}
            />
          </>
        )}

        {activeTab === 'image' && (
          <ImageOCRTab
            isProcessingImage={isProcessingImage}
            darkMode={darkMode}
            onImageUpload={handleImageUpload}
          />
        )}

        {activeTab === 'history' && (
          <HistoryTab
            history={history}
            darkMode={darkMode}
            onClearHistory={clearHistory}
            onCopyText={handleCopyText}
            onSpeakText={speakText}
          />
        )}

        <FeaturesInfo darkMode={darkMode} />
        <ContactCard darkMode={darkMode} />
      </div>
    </div>
  );
};

export default MultilingualTranslator;
