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
    
    // Function to perform speech synthesis
    const performSpeech = () => {
      const utterance = new SpeechSynthesisUtterance(text.trim());
      
      // Enhanced language code handling with comprehensive fallbacks
      let langCode = SUPPORTED_LANGUAGES[language]?.code || language || 'en-US';
      const langPrefix = langCode.split('-')[0];
      
      console.log(`Attempting TTS for language: ${language}, mapped to: ${langCode}`);
      
      // Enhanced fallback priority with strict language matching
      const languageFallbacks = {
        // Indian Languages with strict matching and specific fallbacks
        'hi-IN': ['hi-IN', 'hi'],
        'bn-IN': ['bn-IN', 'bn'],
        'ta-IN': ['ta-IN', 'ta'],
        'te-IN': ['te-IN', 'te'],
        'mr-IN': ['mr-IN', 'mr'],
        'gu-IN': ['gu-IN', 'gu'],
        'kn-IN': ['kn-IN', 'kn'],
        'ml-IN': ['ml-IN', 'ml'],
        'pa-IN': ['pa-IN', 'pa', 'en-IN'],  // Punjabi should not fall back to Hindi
        'ur-IN': ['ur-IN', 'ur'],
        'or-IN': ['or-IN', 'or', 'en-IN'],  // Odia should not fall back to Hindi
        'as-IN': ['as-IN', 'as', 'bn-IN'],  // Assamese can fall back to Bengali
        'sa-IN': ['sa-IN', 'sa'],
        'ne-NP': ['ne-NP', 'ne'],
        
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
      
      // Get available voices - ensure voices are loaded
      let voices = window.speechSynthesis.getVoices();
      
      // If no voices are available, wait for them to load
      if (voices.length === 0) {
        window.speechSynthesis.onvoiceschanged = () => {
          voices = window.speechSynthesis.getVoices();
          console.log('Voices loaded:', voices.length);
        };
        // Trigger voice loading
        window.speechSynthesis.getVoices();
      }
      
      let selectedVoice = null;
      
      // Try to find a voice using fallback chain
      const fallbackChain = languageFallbacks[langCode] || [langCode, langCode.split('-')[0], 'en-IN', 'en-US', 'en'];
      
      console.log(`Fallback chain for ${langCode}:`, fallbackChain);
      console.log(`Total available voices: ${voices.length}`);
      
      // Enhanced voice matching with specific Indian language support
      for (const fallbackLang of fallbackChain) {
        // Try exact match first
        selectedVoice = voices.find(voice => voice.lang === fallbackLang);
        if (selectedVoice) {
          langCode = selectedVoice.lang;
          console.log(`Found exact match: ${selectedVoice.name} (${selectedVoice.lang})`);
          break;
        }
        
        // Try partial match (language code without region)
        const langPrefix = fallbackLang.split('-')[0];
        selectedVoice = voices.find(voice => 
          voice.lang.toLowerCase().startsWith(langPrefix.toLowerCase())
        );
        if (selectedVoice) {
          langCode = selectedVoice.lang;
          console.log(`Found partial match: ${selectedVoice.name} (${selectedVoice.lang})`);
          break;
        }
        
        // Special handling for Indian languages with enhanced voice matching
        if (['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'ur', 'or', 'as', 'sa', 'ne'].includes(langPrefix)) {
          // Enhanced Indian language voice patterns with more specific matching
          const indianVoicePatterns = {
            'hi': ['hindi', 'swara', 'madhur', 'hindi', 'hindustani', 'india'],
            'bn': ['bangla', 'bengali', 'bashkar', 'tanishaa', 'nabanita', 'pradeep', 'bengali', 'bengal'],
            'ta': ['tamil', 'pallavi', 'valluvar', 'tamil', 'tamizh'],
            'te': ['telugu', 'shruti', 'mohan', 'telugu', 'andhra'],
            'mr': ['marathi', 'manohar', 'aarohi', 'marathi', 'maharastri'],
            'gu': ['gujarati', 'dhwani', 'niranjan', 'gujarati', 'gujrati'],
            'kn': ['kannada', 'sapna', 'gagan', 'kannada', 'kannad'],
            'ml': ['malayalam', 'sobhana', 'midhun', 'malayalam', 'malayali'],
            'pa': ['punjabi', 'gagan', 'aarohi', 'punjabi', 'panjabi', 'gurumukhi'],
            'ur': ['urdu', 'salman', 'uzma', 'urdu', 'pakistan'],
            'or': ['odia', 'oriya', 'subhashini', 'sukant', 'odisha', 'odiya', 'orissa', 'odishan'],
            'as': ['assamese', 'priyom', 'amala', 'assam', 'asomiya'],
            'sa': ['sanskrit', 'aditi', 'krishna', 'sanskrit', 'samskrit'],
            'ne': ['nepali', 'hemkala', 'sagar', 'nepal', 'nepalese']
          };
          
          // First try exact language code match with voice name pattern
          const patterns = indianVoicePatterns[langPrefix] || [];
          console.log(`Searching for voices matching language: ${langPrefix} with patterns:`, patterns);
          
          // First try to find an exact language match
          selectedVoice = voices.find(voice => {
            const voiceLang = voice.lang.toLowerCase();
            return voiceLang === fallbackLang.toLowerCase() || 
                   voiceLang === langPrefix.toLowerCase();
          });
          
          if (selectedVoice) {
            langCode = selectedVoice.lang;
            console.log(`Found exact language match: ${selectedVoice.name} (${selectedVoice.lang})`);
          } else {
            // If no exact match, try pattern matching with voice names
            for (const pattern of patterns) {
              selectedVoice = voices.find(voice => {
                const voiceName = voice.name.toLowerCase();
                const voiceLang = voice.lang.toLowerCase();
                
                // Only match if the voice name contains our pattern
                // and the language code is at least for the correct region (IN)
                return (voiceName.includes(pattern) && 
                       (voiceLang.startsWith(langPrefix.toLowerCase() + '-') ||
                        voiceLang === langPrefix.toLowerCase()));
              });
              
              if (selectedVoice) {
                langCode = selectedVoice.lang;
                console.log(`Found voice by name pattern: ${selectedVoice.name} (${selectedVoice.lang})`);
                break;
              }
            }
          }
          
          // If still no voice found, try more flexible matching
          if (!selectedVoice) {
            for (const pattern of patterns) {
              selectedVoice = voices.find(voice => 
                voice.name.toLowerCase().includes(pattern) ||
                (voice.name.toLowerCase().includes('online') && 
                 (voice.lang.includes(langPrefix.toUpperCase()) || 
                  voice.lang.includes('IN') ||
                  voice.lang.includes('INDIA')))
              );
              
              if (selectedVoice) {
                langCode = selectedVoice.lang;
                console.log(`Found Indian language voice by flexible pattern: ${selectedVoice.name} (${selectedVoice.lang})`);
                break;
              }
            }
          }
          
          if (selectedVoice) break;
        }
      }
      
      // Strict fallback for Indian languages - don't use incorrect language voices
      if (!selectedVoice) {
        console.log(`No specific voice found for ${langCode}, checking for English (India) fallback`);
        
        // For Indian languages, only fall back to English (India) to avoid incorrect language output
        if (['hi', 'bn', 'ta', 'te', 'mr', 'gu', 'kn', 'ml', 'pa', 'ur', 'or', 'as', 'sa', 'ne'].includes(langPrefix)) {
          console.log(`Indian language ${langCode} not found, will only fall back to English (India)`);
          
          // Only allow fallback to English (India) for Indian languages
          selectedVoice = voices.find(voice => 
            voice.lang === 'en-IN' || 
            (voice.lang.startsWith('en-') && voice.name.toLowerCase().includes('india'))
          );
          
          if (selectedVoice) {
            langCode = 'en-IN';
            console.log(`Using English (India) fallback for Indian language: ${selectedVoice.name} (${selectedVoice.lang})`);
          } else {
            console.log('No suitable English (India) fallback found for Indian language');
          }
        }
        
        // If still no voice, try English India voice for better pronunciation
        if (!selectedVoice) {
          console.log(`No Indian voice found, using English India fallback for ${langCode}`);
          selectedVoice = voices.find(voice => 
            voice.lang === 'en-IN' || 
            (voice.lang.startsWith('en') && (
              voice.name.toLowerCase().includes('india') ||
              voice.name.toLowerCase().includes('indian')
            ))
          );
          
          if (selectedVoice) {
            langCode = 'en-IN';
            console.log(`Using English India fallback: ${selectedVoice.name} (${selectedVoice.lang})`);
          } else {
            // Final fallback to any English voice
            selectedVoice = voices.find(voice => voice.lang.startsWith('en'));
            if (selectedVoice) {
              langCode = selectedVoice.lang;
              console.log(`Using any English voice as final fallback: ${selectedVoice.name} (${selectedVoice.lang})`);
            } else if (voices.length > 0) {
              // Last resort: use any available voice
              selectedVoice = voices[0];
              langCode = selectedVoice.lang;
              console.log(`Using first available voice: ${selectedVoice.name} (${selectedVoice.lang})`);
            }
          }
        }
      }
      
      // Ensure we don't use a voice that doesn't match the language code
      if (selectedVoice && !selectedVoice.lang.startsWith(langPrefix)) {
        console.warn(`Voice language (${selectedVoice.lang}) doesn't match requested language (${langCode}), forcing language code`);
        // Keep the voice but force the language code to match
        utterance.lang = langCode;
      } else {
        utterance.lang = selectedVoice ? selectedVoice.lang : langCode;
      }
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        console.log(`Final voice selection: ${selectedVoice.name} (${selectedVoice.lang}) for text: ${text.substring(0, 50)}...`);
      } else {
        console.warn(`No suitable voice found for language: ${langCode}`);
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
        console.error('Error details:', event);
        setIsSpeaking(false);
        
        // Force fallback to English India voice for better pronunciation
        if (langCode !== 'en-IN' && langCode !== 'en-US') {
          console.log('Retrying speech synthesis with English (India) fallback');
          setTimeout(() => {
            const fallbackUtterance = new SpeechSynthesisUtterance(text.trim());
            fallbackUtterance.lang = 'en-IN';
            fallbackUtterance.rate = 0.8;
            fallbackUtterance.pitch = 1;
            fallbackUtterance.volume = 1;
            
            // Find English India voice
            const enIndiaVoice = voices.find(voice => 
              voice.lang === 'en-IN' || 
              (voice.lang.startsWith('en') && voice.name.toLowerCase().includes('india'))
            );
            
            if (enIndiaVoice) {
              fallbackUtterance.voice = enIndiaVoice;
              console.log(`Using fallback voice: ${enIndiaVoice.name} (${enIndiaVoice.lang})`);
            }
            
            fallbackUtterance.onend = () => setIsSpeaking(false);
            fallbackUtterance.onerror = () => setIsSpeaking(false);
            
            try {
              window.speechSynthesis.speak(fallbackUtterance);
            } catch (fallbackError) {
              console.error('Fallback speech synthesis also failed:', fallbackError);
              setIsSpeaking(false);
            }
          }, 100);
        }
      };
      
      utterance.onpause = () => {
        setIsSpeaking(false);
      };
      
      // Log the selected voice and language for debugging
      console.log(`Speech synthesis: Using voice "${selectedVoice?.name || 'default'}" (${selectedVoice?.lang || langCode}) for language: ${language}`);
      
      // Always ensure we have a voice before attempting to speak
      if (!selectedVoice) {
        console.warn('No voice selected, attempting with default system voice');
        // Use system default voice
        utterance.lang = 'en-US';
      }
      
      console.log(`Final TTS attempt: Voice="${selectedVoice?.name || 'system default'}", Lang="${langCode}", Text="${text.substring(0, 50)}..."`);
      
      try {
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Error starting speech synthesis:', error);
        setIsSpeaking(false);
        
        // Try with the most basic approach - no voice selection, just language
        console.log('Retrying with basic utterance (no voice selection)');
        const basicUtterance = new SpeechSynthesisUtterance(text.trim());
        basicUtterance.lang = 'en-IN'; // Force English India for Indian language text
        basicUtterance.rate = 0.8;
        basicUtterance.pitch = 1;
        basicUtterance.volume = 1;
        
        basicUtterance.onstart = () => setIsSpeaking(true);
        basicUtterance.onend = () => setIsSpeaking(false);
        basicUtterance.onerror = (e) => {
          console.error('Basic speech synthesis failed:', e);
          setIsSpeaking(false);
        };
        
        try {
          window.speechSynthesis.speak(basicUtterance);
        } catch (basicError) {
          console.error('Basic speech synthesis also failed:', basicError);
          setIsSpeaking(false);
        }
      }
    };
    
    // Check if voices are already loaded
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      // Voices are available, perform speech immediately
      setTimeout(performSpeech, 150);
    } else {
      // Wait for voices to load
      const handleVoicesChanged = () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        setTimeout(performSpeech, 150);
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      // Trigger voice loading
      window.speechSynthesis.getVoices();
    }
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
