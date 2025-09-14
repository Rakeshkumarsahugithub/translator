import { useState, useEffect, useRef, useCallback } from 'react';
import { SUPPORTED_LANGUAGES } from '../constants/languages.js';
import { toNativeScript } from '../utils/translationService.js';

export const useSpeechRecognition = (inputLanguage, liveTranslation, onTranscript) => {
  const [isListening, setIsListening] = useState(false);
  const [confidence, setConfidence] = useState(0);
  const recognitionRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const result = event.results[event.results.length - 1];
        let transcript = result[0].transcript;
        const confidence = result[0].confidence || 0.8;
        const isFinal = result.isFinal;
        
        // Convert English phonetic transcription to native script for Indian languages
        if (inputLanguage === 'hi' && recognitionRef.current.lang === 'hi-IN') {
          // For Hindi, convert romanized text to Devanagari if needed
          transcript = toNativeScript(transcript, 'hi');
        } else if (inputLanguage === 'or' && recognitionRef.current.lang === 'hi-IN') {
          // For Odia using Hindi recognition, convert to Odia script
          transcript = toNativeScript(transcript, 'or');
        }
        
        setConfidence(Math.round(confidence * 100));
        
        // Only call onTranscript for final results or when live translation is enabled
        if (isFinal || !liveTranslation) {
          onTranscript(transcript, confidence);
        } else if (liveTranslation) {
          // For interim results during live translation, just update text without translating
          onTranscript(transcript, 0);
        }
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        
        // Handle different error types
        switch (event.error) {
          case 'network':
            console.warn('Network error in speech recognition. Retrying with fallback language...');
            // Try to restart with English as fallback
            if (recognitionRef.current.lang !== 'en-US') {
              setTimeout(() => {
                if (recognitionRef.current && isListening) {
                  recognitionRef.current.lang = 'en-US';
                  try {
                    recognitionRef.current.start();
                  } catch (err) {
                    console.error('Failed to restart speech recognition:', err);
                    setIsListening(false);
                  }
                }
              }, 1000);
              return; // Don't stop listening immediately
            }
            break;
          case 'not-allowed':
            console.error('Microphone access denied');
            break;
          case 'no-speech':
            console.warn('No speech detected');
            break;
          case 'audio-capture':
            console.error('Audio capture failed');
            break;
          case 'service-not-allowed':
            console.error('Speech recognition service not allowed');
            break;
          default:
            console.error('Unknown speech recognition error:', event.error);
        }
        
        setIsListening(false);
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
        
        // Don't auto-restart to avoid conflicts
      };
    }
  }, [liveTranslation, onTranscript]);

  // Set speech recognition language with fallback
  useEffect(() => {
    if (recognitionRef.current) {
      const languageCode = SUPPORTED_LANGUAGES[inputLanguage]?.code;
      
      // Map of supported speech recognition languages with fallbacks
      const speechRecognitionLanguages = {
        'hi-IN': 'hi-IN',
        'bn-IN': 'bn-IN', 
        'ta-IN': 'ta-IN',
        'te-IN': 'te-IN',
        'mr-IN': 'mr-IN',
        'gu-IN': 'gu-IN',
        'kn-IN': 'kn-IN',
        'ml-IN': 'ml-IN',
        'pa-IN': 'pa-IN',
        'ur-IN': 'ur-IN',
        'or-IN': 'hi-IN', // Odia fallback to Hindi for better recognition
        'as-IN': 'as-IN',
        'sa-IN': 'en-US', // Sanskrit fallback to English
        'en-US': 'en-US',
        'es-ES': 'es-ES',
        'fr-FR': 'fr-FR',
        'de-DE': 'de-DE',
        'it-IT': 'it-IT',
        'pt-PT': 'pt-PT',
        'ru-RU': 'ru-RU',
        'ja-JP': 'ja-JP',
        'ko-KR': 'ko-KR',
        'zh-CN': 'zh-CN',
        'ar-SA': 'ar-SA',
        'th-TH': 'th-TH',
        'vi-VN': 'vi-VN',
        'nl-NL': 'nl-NL',
        'sv-SE': 'sv-SE',
        'pl-PL': 'pl-PL',
        'ro-RO': 'ro-RO'
      };
      
      // Use mapped language or fallback to English
      const recognitionLang = speechRecognitionLanguages[languageCode] || 'en-US';
      recognitionRef.current.lang = recognitionLang;
      
      console.log(`Speech recognition language set to: ${recognitionLang} for input language: ${inputLanguage}`);
    }
  }, [inputLanguage]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        // Stop any existing recognition first
        if (recognitionRef.current.state === 'listening') {
          recognitionRef.current.stop();
        }
        
        // Small delay to ensure previous session is fully stopped
        setTimeout(() => {
          try {
            setIsListening(true);
            recognitionRef.current.start();
          } catch (error) {
            console.error('Failed to start speech recognition after delay:', error);
            setIsListening(false);
          }
        }, 100);
      } catch (error) {
        console.error('Failed to start speech recognition:', error);
        setIsListening(false);
      }
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
      setIsListening(false);
    }
  }, []);

  const isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

  return {
    isListening,
    confidence,
    startListening,
    stopListening,
    isSupported
  };
};
