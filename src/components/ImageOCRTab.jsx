import React, { useRef, useState } from 'react';
import { Camera, Upload, X, Eye } from 'lucide-react';

const ImageOCRTab = ({
  isProcessingImage,
  darkMode,
  onImageUpload
}) => {
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ocrProgress, setOcrProgress] = useState(0);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
    }
  };

  const handleProcessImage = () => {
    if (selectedFile) {
      setOcrProgress(0);
      onImageUpload({ target: { files: [selectedFile] } }, (progress) => {
        setOcrProgress(progress);
      });
      // Clear preview after processing
      setTimeout(() => {
        clearPreview();
        setOcrProgress(0);
      }, 2000);
    }
  };

  const clearPreview = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
      setPreviewImage(null);
      setSelectedFile(null);
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}>
      {!previewImage ? (
        <div className="text-center">
          <Camera className="w-16 h-16 mx-auto mb-4 text-indigo-600" />
          <h3 className="text-2xl font-semibold mb-4">Upload Image for OCR</h3>
          <p className="text-gray-600 mb-8">Upload an image containing text to extract and translate it</p>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <button
            onClick={handleFileSelect}
            disabled={isProcessingImage}
            className="flex items-center space-x-3 mx-auto px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-lg"
          >
            <Upload className="w-6 h-6" />
            <span>Select Image</span>
          </button>
          
          <div className="mt-8 text-sm text-gray-500">
            <p>Supported formats: JPG, PNG, GIF, BMP, WEBP</p>
            <p>Preview your image before processing</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold flex items-center space-x-2">
              <Eye className="w-6 h-6 text-indigo-600" />
              <span>Image Preview</span>
            </h3>
            <button
              onClick={clearPreview}
              className="p-2 text-gray-500 hover:text-red-600 transition-colors"
              title="Clear image"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-auto rounded-lg shadow-lg border-2 border-gray-200"
                style={{ maxHeight: '400px', objectFit: 'contain' }}
              />
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Review your image and click "Extract Text" to process
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleFileSelect}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Choose Different Image
              </button>
              
              <button
                onClick={handleProcessImage}
                disabled={isProcessingImage}
                className="flex items-center space-x-2 px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 shadow-lg"
              >
                {isProcessingImage ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Camera className="w-5 h-5" />
                )}
                <span>{isProcessingImage ? `Extracting... ${ocrProgress}%` : 'Extract Text'}</span>
              </button>
            </div>
            
            {isProcessingImage && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${ocrProgress}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm text-gray-600 mt-2">
                  Processing image... {ocrProgress}%
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageOCRTab;
