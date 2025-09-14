# 🌍 Multilingual Translator

A comprehensive, modern multilingual translator application built with React 18 and Vite. Features real-time speech recognition, text-to-speech synthesis, image OCR, and accurate translation between 25+ languages using professional translation APIs.

## 🚀 Features

### Core Translation Features
- **🎤 Speech Recognition**: Real-time voice input with confidence scoring
- **🔊 Text-to-Speech**: Natural voice synthesis in multiple languages  
- **📸 Image OCR**: Extract text from images using Tesseract.js with progress tracking
- **⚡ Live Translation**: Automatic translation as you speak or type
- **📚 Translation History**: Keep track of your translations with export functionality
- **🌙 Dark Mode**: Toggle between light and dark themes
- **🔄 Real Translation APIs**: Professional-grade translations using MyMemory and LibreTranslate APIs

### Advanced Features
- **Language Auto-Detection**: Intelligent language detection for input text
- **Confidence Scoring**: Speech recognition confidence indicators
- **Progress Tracking**: Real-time OCR processing progress bars
- **Clipboard Integration**: One-click copy functionality
- **Export Options**: Download translations as text files
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🌐 Supported Languages (25+)

### Indian Languages
- **Hindi** (hi) - हिंदी
- **Bengali** (bn) - বাংলা
- **Tamil** (ta) - தமிழ்
- **Telugu** (te) - తెలుగు
- **Marathi** (mr) - मराठी
- **Gujarati** (gu) - ગુજરાતી
- **Kannada** (kn) - ಕನ್ನಡ
- **Malayalam** (ml) - മലയാളം
- **Punjabi** (pa) - ਪੰਜਾਬੀ
- **Odia** (or) - ଓଡ଼ିଆ
- **Assamese** (as) - অসমীয়া
- **Urdu** (ur) - اردو
- **Sanskrit** (sa) - संस्कृत
- **Nepali** (ne) - नेपाली

### Global Languages
- **English** (en)
- **Spanish** (es) - Español
- **French** (fr) - Français
- **German** (de) - Deutsch
- **Italian** (it) - Italiano
- **Portuguese** (pt) - Português
- **Russian** (ru) - Русский
- **Chinese** (zh) - 中文
- **Japanese** (ja) - 日本語
- **Korean** (ko) - 한국어
- **Arabic** (ar) - العربية

## 🏗️ Project Architecture

### Component Architecture
```
MultilingualTranslator (Main Container)
├── Header (Title + Dark Mode Toggle)
├── TabNavigation (Audio/Text, Image OCR, History)
├── LanguageSelector (Input/Output Language Selection)
├── AudioTranslationTab (Speech + Text Input/Output)
├── ImageOCRTab (Image Upload + OCR Processing)
├── HistoryTab (Translation History Management)
├── FeaturesInfo (App Features Display)
└── ContactCard (Developer Information)
```

### Data Flow Architecture
```
User Input → Speech Recognition/Text Input → Translation API → Text-to-Speech Output
     ↓                                            ↓
Image Upload → OCR Processing → Extracted Text → Translation Pipeline
     ↓                                            ↓
All Translations → History Storage → Export/Copy Functionality
```

### State Management
- **React Hooks**: useState, useCallback, useEffect for local state
- **Custom Hooks**: Modular speech recognition and synthesis logic
- **Context-free Design**: Props-based communication between components

## 📁 File Structure

```
src/
├── components/           # React Components
│   ├── MultilingualTranslator.jsx    # Main container component
│   ├── Header.jsx                    # App header with dark mode
│   ├── TabNavigation.jsx             # Tab switching interface
│   ├── LanguageSelector.jsx          # Language selection component
│   ├── AudioTranslationTab.jsx       # Audio/text translation interface
│   ├── ImageOCRTab.jsx               # Image OCR interface
│   ├── HistoryTab.jsx                # Translation history interface
│   ├── FeaturesInfo.jsx              # Features information display
│   └── ContactCard.jsx               # Developer contact information
├── hooks/                # Custom React Hooks
│   ├── useSpeechRecognition.js       # Speech recognition logic
│   └── useSpeechSynthesis.js         # Text-to-speech logic
├── utils/                # Utility Functions
│   └── translationService.js         # Translation and OCR services
├── constants/            # Application Constants
│   └── languages.js                  # Language definitions and codes
├── App.jsx              # Root application component
├── App.css              # Global styles and Tailwind directives
└── main.jsx             # Application entry point
```

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1**: Modern React with hooks and functional components
- **Vite 5.4.8**: Lightning-fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript features and syntax

### Styling & UI
- **Tailwind CSS 3.4.13**: Utility-first CSS framework for responsive design
- **Lucide React 0.447.0**: Beautiful, customizable icon library
- **PostCSS**: CSS processing and optimization

### APIs & Services
- **MyMemory Translation API**: Primary translation service (free tier)
- **LibreTranslate API**: Fallback translation service (open-source)
- **Web Speech API**: Browser-native speech recognition and synthesis
- **Tesseract.js 5.1.1**: Client-side OCR for text extraction from images

### Browser APIs
- **SpeechRecognition API**: Real-time voice input processing
- **SpeechSynthesis API**: Text-to-speech conversion
- **File API**: Image upload and processing
- **Clipboard API**: Copy-to-clipboard functionality

### Development Tools
- **ESLint**: Code linting and quality assurance
- **Vite Dev Server**: Hot module replacement and fast development

## 🔧 Technical Implementation Details

### Speech Recognition
- **Continuous Recognition**: Real-time speech processing
- **Confidence Filtering**: Only processes high-confidence results (>70%)
- **Language-specific Recognition**: Automatic language model switching
- **Interim Results Handling**: Live feedback during speech

### Translation System
- **Dual API Approach**: Primary + fallback for reliability
- **Error Handling**: Graceful degradation with meaningful error messages
- **Rate Limiting**: Debounced requests to prevent API abuse
- **Language Validation**: Automatic language code normalization

### OCR Processing
- **Tesseract.js Integration**: Client-side text extraction
- **Progress Tracking**: Real-time processing progress updates
- **Image Optimization**: Automatic image preprocessing for better accuracy
- **Multi-format Support**: JPEG, PNG, WebP, and other common formats

### Performance Optimizations
- **Dynamic Imports**: Lazy loading of heavy libraries (Tesseract.js)
- **Debounced Translation**: Prevents excessive API calls during live translation
- **Memory Management**: Proper cleanup of object URLs and event listeners
- **Component Memoization**: Optimized re-rendering with useCallback

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v16.0.0 or higher
- **npm**: v8.0.0 or higher (or yarn equivalent)
- **Modern Browser**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+

### Installation Steps

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/multilingual-translator.git
cd multilingual-translator
```

2. **Install Dependencies**
```bash
npm install
# or
yarn install
```

3. **Start Development Server**
```bash
npm run dev
# or
yarn dev
```

4. **Open Application**
Navigate to `http://localhost:5173` in your browser

### Build for Production
```bash
npm run build
# or
yarn build
```

## 📖 Usage Guide

### Audio/Text Translation
1. **Select Languages**: Choose input and output languages from dropdowns
2. **Input Methods**:
   - **Speech**: Click "Start Recording" and speak clearly
   - **Text**: Type directly in the input textarea
3. **Live Translation**: Enable for real-time translation as you speak/type
4. **Output Actions**:
   - **Speak**: Click speaker icon to hear translation
   - **Copy**: Copy translation to clipboard
   - **Export**: Download as text file

### Image OCR Translation
1. **Upload Image**: Click "Choose Image" and select image file
2. **Preview**: Review image before processing
3. **Extract Text**: Click "Extract Text" and monitor progress
4. **Translate**: Extracted text automatically appears in main translation area

### Translation History
- View all your previous translations in the History tab
- Copy or replay any translation
- Clear history when needed

## Browser Compatibility

- **Speech Recognition**: Chrome, Edge, Safari (with webkit prefix)
- **Speech Synthesis**: All modern browsers
- **Image Upload**: All modern browsers

## Development Notes

- The translation service currently uses mock data for demonstration
- For production use, integrate with services like:
  - Google Translate API
  - Microsoft Translator
  - LibreTranslate
- OCR functionality uses mock data; integrate with Tesseract.js for real OCR

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Web Speech API** - Browser speech recognition and synthesis
- **File API** - Image upload handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.
#   t r a n s l a t o r  
 