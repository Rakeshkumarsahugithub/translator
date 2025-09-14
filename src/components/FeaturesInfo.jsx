import React from 'react';
import { Mic, Volume2, Camera, Languages } from 'lucide-react';

const FeaturesInfo = ({ darkMode }) => {
  const features = [
    {
      icon: Mic,
      label: 'Speech Recognition',
      color: 'text-indigo-600'
    },
    {
      icon: Volume2,
      label: 'Text-to-Speech',
      color: 'text-green-600'
    },
    {
      icon: Camera,
      label: 'Image OCR',
      color: 'text-blue-600'
    },
    {
      icon: Languages,
      label: '25+ Languages',
      color: 'text-purple-600'
    }
  ];

  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 mt-8`}>
      <h3 className="text-xl font-semibold mb-4">Features</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        {features.map(({ icon: Icon, label, color }) => (
          <div key={label} className="flex items-center space-x-2">
            <Icon className={`w-4 h-4 ${color}`} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesInfo;
