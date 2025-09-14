import { SUPPORTED_LANGUAGES } from '../constants/languages.js';

// Romanization mappings for Indian languages
const ROMANIZATION_MAPS = {
  'hi': {
    // Devanagari to Roman
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha',
    'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha',
    'न': 'na', 'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma', 'य': 'ya', 'र': 'ra',
    'ल': 'la', 'व': 'va', 'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
    'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
    '्': '', 'ं': 'n', 'ः': 'h'
  },
  'or': {
    // Odia to Roman - Enhanced mapping
    'ଅ': 'a', 'ଆ': 'aa', 'ଇ': 'i', 'ଈ': 'ii', 'ଉ': 'u', 'ଊ': 'uu', 'ଋ': 'ru', 'ଏ': 'e', 'ଐ': 'ai', 'ଓ': 'o', 'ଔ': 'au',
    'କ': 'ka', 'ଖ': 'kha', 'ଗ': 'ga', 'ଘ': 'gha', 'ଙ': 'nga',
    'ଚ': 'cha', 'ଛ': 'chha', 'ଜ': 'ja', 'ଝ': 'jha', 'ଞ': 'nya',
    'ଟ': 'ta', 'ଠ': 'tha', 'ଡ': 'da', 'ଢ': 'dha', 'ଣ': 'na',
    'ତ': 'ta', 'ଥ': 'tha', 'ଦ': 'da', 'ଧ': 'dha', 'ନ': 'na',
    'ପ': 'pa', 'ଫ': 'pha', 'ବ': 'ba', 'ଭ': 'bha', 'ମ': 'ma',
    'ଯ': 'ya', 'ର': 'ra', 'ଲ': 'la', 'ଳ': 'la', 'ଵ': 'va', 'ୱ': 'wa',
    'ଶ': 'sha', 'ଷ': 'sha', 'ସ': 'sa', 'ହ': 'ha', 'କ୍ଷ': 'ksha',
    // Vowel signs
    'ା': 'aa', 'ି': 'i', 'ୀ': 'ii', 'ୁ': 'u', 'ୂ': 'uu', 'ୃ': 'ru',
    'େ': 'e', 'ୈ': 'ai', 'ୋ': 'o', 'ୌ': 'au',
    // Special characters
    '୍': '', 'ଂ': 'n', 'ଃ': 'h', '଼': '', 'ଁ': 'n'
  },
  'bn': {
    // Bengali to Roman
    'অ': 'a', 'আ': 'aa', 'ই': 'i', 'ঈ': 'ii', 'উ': 'u', 'ঊ': 'uu', 'এ': 'e', 'ঐ': 'ai', 'ও': 'o', 'ঔ': 'au',
    'ক': 'ka', 'খ': 'kha', 'গ': 'ga', 'ঘ': 'gha', 'চ': 'cha', 'ছ': 'chha', 'জ': 'ja', 'ঝ': 'jha',
    'ট': 'ta', 'ঠ': 'tha', 'ড': 'da', 'ঢ': 'dha', 'ত': 'ta', 'থ': 'tha', 'দ': 'da', 'ধ': 'dha',
    'ন': 'na', 'প': 'pa', 'ফ': 'pha', 'ব': 'ba', 'ভ': 'bha', 'ম': 'ma', 'য': 'ya', 'র': 'ra',
    'ল': 'la', 'ব': 'va', 'শ': 'sha', 'ষ': 'sha', 'স': 'sa', 'হ': 'ha',
    'া': 'aa', 'ি': 'i', 'ী': 'ii', 'ু': 'u', 'ূ': 'uu', 'ে': 'e', 'ৈ': 'ai', 'ো': 'o', 'ৌ': 'au',
    '্': '', 'ং': 'n', 'ঃ': 'h'
  },
  'pa': {
    // Punjabi to Roman
    'ਅ': 'a', 'ਆ': 'aa', 'ਇ': 'i', 'ਈ': 'ii', 'ਉ': 'u', 'ਊ': 'uu', 'ਏ': 'e', 'ਐ': 'ai', 'ਓ': 'o', 'ਔ': 'au',
    'ਕ': 'ka', 'ਖ': 'kha', 'ਗ': 'ga', 'ਘ': 'gha', 'ਚ': 'cha', 'ਛ': 'chha', 'ਜ': 'ja', 'ਝ': 'jha',
    'ਟ': 'ta', 'ਠ': 'tha', 'ਡ': 'da', 'ਢ': 'dha', 'ਤ': 'ta', 'ਥ': 'tha', 'ਦ': 'da', 'ਧ': 'dha',
    'ਨ': 'na', 'ਪ': 'pa', 'ਫ': 'pha', 'ਬ': 'ba', 'ਭ': 'bha', 'ਮ': 'ma', 'ਯ': 'ya', 'ਰ': 'ra',
    'ਲ': 'la', 'ਵ': 'va', 'ਸ਼': 'sha', 'ਸ': 'sa', 'ਹ': 'ha',
    'ਾ': 'aa', 'ਿ': 'i', 'ੀ': 'ii', 'ੁ': 'u', 'ੂ': 'uu', 'ੇ': 'e', 'ੈ': 'ai', 'ੋ': 'o', 'ੌ': 'au',
    '੍': '', 'ਂ': 'n', 'ਃ': 'h'
  },
  'ta': {
    // Tamil to Roman
    'அ': 'a', 'ஆ': 'aa', 'இ': 'i', 'ஈ': 'ii', 'உ': 'u', 'ஊ': 'uu', 'எ': 'e', 'ஏ': 'ee', 'ஐ': 'ai', 'ஒ': 'o', 'ஓ': 'oo', 'ஔ': 'au',
    'க': 'ka', 'ங': 'nga', 'ச': 'cha', 'ஞ': 'nya', 'ட': 'ta', 'ண': 'na', 'த': 'tha', 'ந': 'na', 'ப': 'pa', 'ம': 'ma',
    'ய': 'ya', 'ர': 'ra', 'ல': 'la', 'வ': 'va', 'ழ': 'zha', 'ள': 'lla', 'ற': 'rra', 'ன': 'nna',
    'ா': 'aa', 'ி': 'i', 'ீ': 'ii', 'ு': 'u', 'ூ': 'uu', 'ெ': 'e', 'ே': 'ee', 'ை': 'ai', 'ொ': 'o', 'ோ': 'oo', 'ௌ': 'au',
    '்': '', 'ஂ': 'n', 'ஃ': 'h'
  },
  'te': {
    // Telugu to Roman
    'అ': 'a', 'ఆ': 'aa', 'ఇ': 'i', 'ఈ': 'ii', 'ఉ': 'u', 'ఊ': 'uu', 'ఎ': 'e', 'ఏ': 'ee', 'ఐ': 'ai', 'ఒ': 'o', 'ఓ': 'oo', 'ఔ': 'au',
    'క': 'ka', 'ఖ': 'kha', 'గ': 'ga', 'ఘ': 'gha', 'చ': 'cha', 'ఛ': 'chha', 'జ': 'ja', 'ఝ': 'jha',
    'ట': 'ta', 'ఠ': 'tha', 'డ': 'da', 'ఢ': 'dha', 'త': 'tha', 'థ': 'thha', 'ద': 'da', 'ధ': 'dha',
    'న': 'na', 'ప': 'pa', 'ఫ': 'pha', 'బ': 'ba', 'భ': 'bha', 'మ': 'ma', 'య': 'ya', 'ర': 'ra',
    'ల': 'la', 'వ': 'va', 'శ': 'sha', 'ష': 'sha', 'స': 'sa', 'హ': 'ha',
    'ా': 'aa', 'ి': 'i', 'ీ': 'ii', 'ు': 'u', 'ూ': 'uu', 'ె': 'e', 'ే': 'ee', 'ై': 'ai', 'ొ': 'o', 'ో': 'oo', 'ౌ': 'au',
    '్': '', 'ం': 'n', 'ః': 'h'
  },
  'gu': {
    // Gujarati to Roman
    'અ': 'a', 'આ': 'aa', 'ઇ': 'i', 'ઈ': 'ii', 'ઉ': 'u', 'ઊ': 'uu', 'એ': 'e', 'ઐ': 'ai', 'ઓ': 'o', 'ઔ': 'au',
    'ક': 'ka', 'ખ': 'kha', 'ગ': 'ga', 'ઘ': 'gha', 'ચ': 'cha', 'છ': 'chha', 'જ': 'ja', 'ઝ': 'jha',
    'ટ': 'ta', 'ઠ': 'tha', 'ડ': 'da', 'ઢ': 'dha', 'ત': 'ta', 'થ': 'tha', 'દ': 'da', 'ધ': 'dha',
    'ન': 'na', 'પ': 'pa', 'ફ': 'pha', 'બ': 'ba', 'ભ': 'bha', 'મ': 'ma', 'ય': 'ya', 'ર': 'ra',
    'લ': 'la', 'વ': 'va', 'શ': 'sha', 'ષ': 'sha', 'સ': 'sa', 'હ': 'ha',
    'ા': 'aa', 'િ': 'i', 'ી': 'ii', 'ુ': 'u', 'ૂ': 'uu', 'ે': 'e', 'ૈ': 'ai', 'ો': 'o', 'ૌ': 'au',
    '્': '', 'ં': 'n', 'ઃ': 'h'
  },
  'kn': {
    // Kannada to Roman
    'ಅ': 'a', 'ಆ': 'aa', 'ಇ': 'i', 'ಈ': 'ii', 'ಉ': 'u', 'ಊ': 'uu', 'ಎ': 'e', 'ಏ': 'ee', 'ಐ': 'ai', 'ಒ': 'o', 'ಓ': 'oo', 'ಔ': 'au',
    'ಕ': 'ka', 'ಖ': 'kha', 'ಗ': 'ga', 'ಘ': 'gha', 'ಚ': 'cha', 'ಛ': 'chha', 'ಜ': 'ja', 'ಝ': 'jha',
    'ಟ': 'ta', 'ಠ': 'tha', 'ಡ': 'da', 'ಢ': 'dha', 'ತ': 'tha', 'ಥ': 'thha', 'ದ': 'da', 'ಧ': 'dha',
    'ನ': 'na', 'ಪ': 'pa', 'ಫ': 'pha', 'ಬ': 'ba', 'ಭ': 'bha', 'ಮ': 'ma', 'ಯ': 'ya', 'ರ': 'ra',
    'ಲ': 'la', 'ವ': 'va', 'ಶ': 'sha', 'ಷ': 'sha', 'ಸ': 'sa', 'ಹ': 'ha',
    'ಾ': 'aa', 'ಿ': 'i', 'ೀ': 'ii', 'ು': 'u', 'ೂ': 'uu', 'ೆ': 'e', 'ೇ': 'ee', 'ೈ': 'ai', 'ೊ': 'o', 'ೋ': 'oo', 'ೌ': 'au',
    '್': '', 'ಂ': 'n', 'ಃ': 'h'
  },
  'ml': {
    // Malayalam to Roman
    'അ': 'a', 'ആ': 'aa', 'ഇ': 'i', 'ഈ': 'ii', 'ഉ': 'u', 'ഊ': 'uu', 'എ': 'e', 'ഏ': 'ee', 'ഐ': 'ai', 'ഒ': 'o', 'ഓ': 'oo', 'ഔ': 'au',
    'ക': 'ka', 'ഖ': 'kha', 'ഗ': 'ga', 'ഘ': 'gha', 'ച': 'cha', 'ഛ': 'chha', 'ജ': 'ja', 'ഝ': 'jha',
    'ട': 'ta', 'ഠ': 'tha', 'ഡ': 'da', 'ഢ': 'dha', 'ത': 'tha', 'ഥ': 'thha', 'ദ': 'da', 'ധ': 'dha',
    'ന': 'na', 'പ': 'pa', 'ഫ': 'pha', 'ബ': 'ba', 'ഭ': 'bha', 'മ': 'ma', 'യ': 'ya', 'ര': 'ra',
    'ല': 'la', 'വ': 'va', 'ശ': 'sha', 'ഷ': 'sha', 'സ': 'sa', 'ഹ': 'ha',
    'ാ': 'aa', 'ി': 'i', 'ീ': 'ii', 'ു': 'u', 'ൂ': 'uu', 'െ': 'e', 'േ': 'ee', 'ൈ': 'ai', 'ൊ': 'o', 'ോ': 'oo', 'ൌ': 'au',
    '്': '', 'ം': 'n', 'ഃ': 'h'
  },
  'mr': {
    // Marathi to Roman (similar to Hindi Devanagari)
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
    'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha',
    'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha',
    'न': 'na', 'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma', 'य': 'ya', 'र': 'ra',
    'ल': 'la', 'व': 'va', 'श': 'sha', 'ष': 'sha', 'स': 'sa', 'ह': 'ha',
    'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
    '्': '', 'ं': 'n', 'ः': 'h'
  },
  'ro': {
    // Romanian special characters to ASCII
    'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ț': 't',
    'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ț': 'T'
  }
};

// Create reverse mappings for converting romanized text back to native script
const REVERSE_ROMANIZATION_MAPS = {};
Object.keys(ROMANIZATION_MAPS).forEach(lang => {
  REVERSE_ROMANIZATION_MAPS[lang] = {};
  Object.entries(ROMANIZATION_MAPS[lang]).forEach(([native, roman]) => {
    if (roman && roman.length > 0) {
      REVERSE_ROMANIZATION_MAPS[lang][roman] = native;
    }
  });
});

// Enhanced phonetic to native script conversion for speech recognition
const PHONETIC_TO_NATIVE_MAPS = {
  'hi': {
    // Common Hindi phonetic patterns from speech recognition
    'aap': 'आप', 'kaise': 'कैसे', 'ho': 'हो', 'hain': 'हैं', 'main': 'मैं', 'hoon': 'हूं',
    'kya': 'क्या', 'hai': 'है', 'nahin': 'नहीं', 'nahi': 'नहीं', 'ji': 'जी', 'haan': 'हाँ',
    'mera': 'मेरा', 'tera': 'तेरा', 'uska': 'उसका', 'hamara': 'हमारा', 'tumhara': 'तुम्हारा',
    'naam': 'नाम', 'ghar': 'घर', 'paani': 'पानी', 'khana': 'खाना', 'kaam': 'काम',
    'accha': 'अच्छा', 'bura': 'बुरा', 'bada': 'बड़ा', 'chota': 'छोटा', 'naya': 'नया',
    'purana': 'पुराना', 'sundar': 'सुंदर', 'kharab': 'खराब', 'theek': 'ठीक', 'galat': 'गलत'
  },
  'or': {
    // Common Odia phonetic patterns (using Hindi recognition)
    'aap': 'ଆପ', 'kaise': 'କେମିତି', 'ho': 'ହୋ', 'hain': 'ହେଇଛନ୍ତି', 'main': 'ମୁଁ', 'hoon': 'ଅଛି',
    'kya': 'କଣ', 'hai': 'ଅଛି', 'nahin': 'ନାହିଁ', 'nahi': 'ନାହିଁ', 'ji': 'ଜୀ', 'haan': 'ହଁ',
    'mera': 'ମୋର', 'tera': 'ତୋର', 'uska': 'ତାର', 'hamara': 'ଆମର', 'tumhara': 'ତୁମର',
    'naam': 'ନାମ', 'ghar': 'ଘର', 'paani': 'ପାଣି', 'khana': 'ଖାଦ୍ୟ', 'kaam': 'କାମ',
    'accha': 'ଭଲ', 'bura': 'ଖରାପ', 'bada': 'ବଡ', 'chota': 'ଛୋଟ', 'naya': 'ନୂଆ',
    'purana': 'ପୁରୁଣା', 'sundar': 'ସୁନ୍ଦର', 'kharab': 'ଖରାପ', 'theek': 'ଠିକ', 'galat': 'ଭୁଲ'
  }
};

// Convert native script to romanized text
export const toRomanized = (text, language) => {
  if (!text || !ROMANIZATION_MAPS[language]) return text;
  
  let romanized = text;
  // Sort by length (longest first) to handle multi-character sequences properly
  const sortedEntries = Object.entries(ROMANIZATION_MAPS[language])
    .sort(([a], [b]) => b.length - a.length);
  
  sortedEntries.forEach(([native, roman]) => {
    if (native && roman) {
      romanized = romanized.replace(new RegExp(native.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), roman);
    }
  });
  
  return romanized;
};

// Convert romanized text to native script
export const toNativeScript = (text, language) => {
  if (!text) return text;
  
  // First try phonetic mapping for speech recognition results
  if (PHONETIC_TO_NATIVE_MAPS[language]) {
    let converted = text.toLowerCase();
    
    // Sort by length (longest first) to handle multi-word phrases
    const phoneticEntries = Object.entries(PHONETIC_TO_NATIVE_MAPS[language])
      .sort(([a], [b]) => b.length - a.length);
    
    phoneticEntries.forEach(([phonetic, native]) => {
      const regex = new RegExp(`\\b${phonetic.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      converted = converted.replace(regex, native);
    });
    
    // If we found phonetic matches, return the converted text
    if (converted !== text.toLowerCase()) {
      return converted;
    }
  }
  
  // Fallback to regular romanization mapping
  if (!REVERSE_ROMANIZATION_MAPS[language]) return text;
  
  let native = text.toLowerCase();
  // Sort by length (longest first) to handle multi-character romanizations
  const sortedEntries = Object.entries(REVERSE_ROMANIZATION_MAPS[language])
    .sort(([a], [b]) => b.length - a.length);
  
  sortedEntries.forEach(([roman, nativeChar]) => {
    if (roman && nativeChar) {
      native = native.replace(new RegExp(roman.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), nativeChar);
    }
  });
  
  return native;
};

// Real translation function using multiple APIs for better reliability
export const translateText = async (text, fromLang, toLang) => {
  // Don't translate if same language
  if (fromLang === toLang) {
    return text;
  }

  if (!text || text.trim().length === 0) {
    return text;
  }

  try {
    // Primary: Use Google Translate via translate.googleapis.com (free tier)
    const googleResponse = await fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`
    );
    
    if (googleResponse.ok) {
      const googleData = await googleResponse.json();
      if (googleData && googleData[0] && googleData[0][0] && googleData[0][0][0]) {
        let translatedText = '';
        // Combine all translation segments
        for (let i = 0; i < googleData[0].length; i++) {
          if (googleData[0][i][0]) {
            translatedText += googleData[0][i][0];
          }
        }
        if (translatedText.trim()) {
          return translatedText.trim();
        }
      }
    }
    
  } catch (error) {
    console.error('Google Translate error:', error);
  }

  try {
    // Fallback 1: MyMemory Translation API
    const myMemoryResponse = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${fromLang}|${toLang}`
    );
    
    if (myMemoryResponse.ok) {
      const myMemoryData = await myMemoryResponse.json();
      if (myMemoryData.responseStatus === 200 && myMemoryData.responseData && myMemoryData.responseData.translatedText) {
        const translated = myMemoryData.responseData.translatedText.trim();
        // Filter out low quality translations
        if (translated && translated !== text && !translated.includes('MYMEMORY WARNING')) {
          return translated;
        }
      }
    }
    
  } catch (error) {
    console.error('MyMemory translation error:', error);
  }

  try {
    // Fallback 2: LibreTranslate API
    const libreResponse = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: fromLang,
        target: toLang,
        format: 'text'
      })
    });
    
    if (libreResponse.ok) {
      const libreData = await libreResponse.json();
      if (libreData.translatedText && libreData.translatedText.trim()) {
        return libreData.translatedText.trim();
      }
    }
    
  } catch (error) {
    console.error('LibreTranslate error:', error);
  }
  
  // Final fallback - return original text with error message
  return `[Translation Error] ${text}`;
};

// Optimized OCR function with faster processing and real-time progress
export const extractTextFromImage = async (file, onProgress = null) => {
  try {
    // Import Tesseract.js dynamically
    const Tesseract = await import('tesseract.js');
    
    // Real-time progress callback without delays
    const realtimeProgressCallback = (progress) => {
      if (onProgress) {
        onProgress(Math.round(progress));
      }
    };
    
    // Optimize image before OCR for faster processing
    const optimizedFile = await optimizeImageForOCR(file);
    
    // Start with 0% progress
    realtimeProgressCallback(0);
    
    // Use Tesseract.js with performance-optimized settings
    const { data: { text } } = await Tesseract.recognize(optimizedFile, 'eng', {
      logger: m => {
        console.log(`OCR ${m.status}: ${Math.round(m.progress * 100)}%`);
        
        // Real-time progress updates that match actual processing
        if (m.status === 'loading tesseract core') {
          realtimeProgressCallback(Math.round(m.progress * 10)); // 0-10%
        } else if (m.status === 'initializing tesseract' || m.status === 'initialized tesseract') {
          realtimeProgressCallback(10 + Math.round(m.progress * 10)); // 10-20%
        } else if (m.status === 'loading language traineddata' || m.status === 'loading language traineddata (from cache)' || m.status === 'loaded language traineddata') {
          realtimeProgressCallback(20 + Math.round(m.progress * 15)); // 20-35%
        } else if (m.status === 'initializing api' || m.status === 'initialized api') {
          realtimeProgressCallback(35 + Math.round(m.progress * 10)); // 35-45%
        } else if (m.status === 'recognizing text') {
          const progress = 45 + Math.round(m.progress * 55); // 45-100%
          realtimeProgressCallback(progress);
        }
      },
      // Optimized settings for speed
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
      tessedit_ocr_engine_mode: Tesseract.OEM.LSTM_ONLY,
      tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?:;-()[]{}"\' ',
      // Performance optimizations
      tessedit_enable_dict_correction: '0',
      tessedit_enable_bigram_correction: '0',
      classify_enable_learning: '0',
      classify_enable_adaptive_matcher: '0',
    });
    
    const extractedText = text.trim();
    
    // Clean up extracted text - remove excessive whitespace and special characters
    const cleanedText = extractedText
      .replace(/[^\w\s.,!?:;\-()[\]{}'"]/g, '') // Remove unwanted special characters (escaped hyphen)
      .replace(/\s+/g, ' ') // Replace multiple spaces with single space
      .replace(/\n+/g, '\n') // Replace multiple newlines with single newline
      .trim();
    
    // Progress is already at 100% from the recognizing text phase
    // No need to set it again here
    
    if (cleanedText.length > 0) {
      return cleanedText;
    } else {
      return "No readable text could be extracted from this image. Please ensure the image contains clear, readable text with good contrast.";
    }
    
  } catch (error) {
    console.error('OCR Error:', error);
    return "Error processing image. Please try with a clearer image containing readable text.";
  }
};

// Image optimization function for faster OCR processing
const optimizeImageForOCR = async (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Optimize image size for faster processing
      const maxWidth = 1200;
      const maxHeight = 1200;
      
      let { width, height } = img;
      
      // Scale down large images
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width *= ratio;
        height *= ratio;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw image with optimizations
      ctx.drawImage(img, 0, 0, width, height);
      
      // Enhance contrast and brightness for better OCR
      const imageData = ctx.getImageData(0, 0, width, height);
      const data = imageData.data;
      
      // Simple contrast enhancement
      for (let i = 0; i < data.length; i += 4) {
        // Increase contrast
        data[i] = Math.min(255, Math.max(0, (data[i] - 128) * 1.2 + 128));     // Red
        data[i + 1] = Math.min(255, Math.max(0, (data[i + 1] - 128) * 1.2 + 128)); // Green
        data[i + 2] = Math.min(255, Math.max(0, (data[i + 2] - 128) * 1.2 + 128)); // Blue
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Convert to blob
      canvas.toBlob((blob) => {
        resolve(blob || file);
      }, 'image/jpeg', 0.9);
    };
    
    img.onerror = () => {
      resolve(file); // Return original file if optimization fails
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Canvas-based text extraction (basic implementation)
const extractTextUsingCanvas = async (file) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Simple text detection based on image analysis
      let textLikeRegions = 0;
      let totalPixels = data.length / 4;
      
      // Analyze pixel patterns to detect text-like regions
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const brightness = (r + g + b) / 3;
        
        // Look for high contrast regions (typical of text)
        if (brightness < 100 || brightness > 200) {
          textLikeRegions++;
        }
      }
      
      const textDensity = textLikeRegions / totalPixels;
      
      // Generate appropriate response based on analysis
      if (textDensity > 0.3) {
        resolve("Text detected in image. For accurate OCR, please ensure the image has clear, readable text with good contrast.");
      } else if (textDensity > 0.1) {
        resolve("Some text patterns detected. The image may contain text but might need better lighting or resolution for accurate extraction.");
      } else {
        resolve("No clear text patterns detected in this image. Please upload an image containing visible text.");
      }
    };
    
    img.onerror = () => {
      resolve("Error processing image. Please try with a different image file.");
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Create image preview URL
export const createImagePreview = (file) => {
  return URL.createObjectURL(file);
};

// Clean up image preview URL
export const revokeImagePreview = (url) => {
  URL.revokeObjectURL(url);
};

// Utility functions for text processing
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const exportText = (text, filename = 'translation.txt') => {
  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
