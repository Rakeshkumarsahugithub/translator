import { useState, useCallback } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants/languages.js';

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = useCallback((text, language) => {
    if (!('speechSynthesis' in window)) {
      console.error('Speech synthesis not supported');
      return;
    }
    
    if (!text || !text.trim()) {
      console.error('No text provided for speech');
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Set speaking state immediately
    setIsSpeaking(true);
    
    // Small delay to ensure cancellation is processed
    setTimeout(() => {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      
      // Enhanced language code handling with comprehensive fallbacks
      let langCode = SUPPORTED_LANGUAGES[language]?.code || language || 'en-US';
      
      // Updated fallback priority: Native voices → English → Hindi → Odia
      const languageFallbacks = {
        // Indian Languages
        'hi-IN': ['hi-IN', 'hi', 'en-US', 'en-IN', 'en', 'or-IN', 'or'],
        'bn-IN': ['bn-IN', 'bn', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ta-IN': ['ta-IN', 'ta', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'te-IN': ['te-IN', 'te', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'mr-IN': ['mr-IN', 'mr', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'gu-IN': ['gu-IN', 'gu', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'kn-IN': ['kn-IN', 'kn', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ml-IN': ['ml-IN', 'ml', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'pa-IN': ['pa-IN', 'pa', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ur-IN': ['ur-IN', 'ur', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'or-IN': ['or-IN', 'or', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi'],
        'as-IN': ['as-IN', 'as', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'sa-IN': ['sa-IN', 'sa', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        
        // Global Languages - prioritize native, then English, then Hindi, then Odia
        'en-US': ['en-US', 'en-GB', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'es-ES': ['es-ES', 'es-MX', 'es', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'fr-FR': ['fr-FR', 'fr-CA', 'fr', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'de-DE': ['de-DE', 'de', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'it-IT': ['it-IT', 'it', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'pt-PT': ['pt-PT', 'pt-BR', 'pt', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ru-RU': ['ru-RU', 'ru', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ja-JP': ['ja-JP', 'ja', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ko-KR': ['ko-KR', 'ko', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'zh-CN': ['zh-CN', 'zh-TW', 'zh', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ar-SA': ['ar-SA', 'ar', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'th-TH': ['th-TH', 'th', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'vi-VN': ['vi-VN', 'vi', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'nl-NL': ['nl-NL', 'nl', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'sv-SE': ['sv-SE', 'sv', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'pl-PL': ['pl-PL', 'pl', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or'],
        'ro-RO': ['ro-RO', 'ro', 'en-US', 'en-IN', 'en', 'hi-IN', 'hi', 'or-IN', 'or']
      };
      
      // Get available voices
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;
      
      // Try to find a voice using fallback chain
      const fallbackChain = languageFallbacks[langCode] || [langCode, langCode.split('-')[0], 'en-US', 'en', 'hi-IN', 'hi', 'or-IN', 'or'];
      
      for (const fallbackLang of fallbackChain) {
        // Try exact match first
        selectedVoice = voices.find(voice => voice.lang === fallbackLang);
        if (selectedVoice) {
          langCode = selectedVoice.lang;
          break;
        }
        
        // Try partial match (language code without region)
        const langPrefix = fallbackLang.split('-')[0];
        selectedVoice = voices.find(voice => 
          voice.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
        );
        if (selectedVoice) {
          langCode = selectedVoice.lang;
          break;
        }
      }
      
      utterance.lang = langCode;
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error, 'for language:', langCode);
        setIsSpeaking(false);
        
        // If error occurs and we're not already using English, try with English fallback
        if (langCode !== 'en-US' && !langCode.startsWith('en')) {
          console.log('Retrying speech synthesis with English fallback');
          setTimeout(() => {
            speakText(text, 'en');
          }, 100);
        }
      };
      
      utterance.onpause = () => {
        setIsSpeaking(false);
      };
      
      // Log the selected voice and language for debugging
      console.log(`Speech synthesis: Using voice "${selectedVoice?.name || 'default'}" (${selectedVoice?.lang || langCode}) for language: ${language}`);
      
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Error starting speech synthesis:', error);
        setIsSpeaking(false);
        
        // Try with a more basic approach if the advanced setup fails
        if (selectedVoice) {
          console.log('Retrying without specific voice selection');
          const basicUtterance = new SpeechSynthesisUtterance(text.trim());
          basicUtterance.lang = langCode;
          basicUtterance.rate = 0.8;
          basicUtterance.onend = () => setIsSpeaking(false);
          basicUtterance.onerror = () => setIsSpeaking(false);
          
          try {
            window.speechSynthesis.speak(basicUtterance);
          } catch (basicError) {
            console.error('Basic speech synthesis also failed:', basicError);
            setIsSpeaking(false);
          }
        }
      }
    }, 150);
  }, []);

  const stopSpeaking = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  const isSupported = 'speechSynthesis' in window;

  return {
    isSpeaking,
    speakText,
    stopSpeaking,
    isSupported
  };
};
