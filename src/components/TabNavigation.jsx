import React from 'react';
import { Mic, Camera, FileText } from 'lucide-react';

const TabNavigation = ({ activeTab, onTabChange, historyCount, darkMode }) => {
  const tabs = [
    {
      id: 'audio',
      label: 'Audio/Text Translation',
      icon: Mic
    },
    {
      id: 'image',
      label: 'Image OCR',
      icon: Camera
    },
    {
      id: 'history',
      label: `History (${historyCount})`,
      icon: FileText
    }
  ];

  return (
    <div className="flex space-x-1 mb-8">
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTabChange(id === 'audio' ? 'audio' : id)}
          className={`flex items-center space-x-2 ${id === 'audio' ? 'px-6 py-3' : 'px-4 py-2'} rounded-lg ${id === 'audio' ? 'font-medium' : ''} transition-colors ${
            activeTab === id 
              ? id === 'audio' ? 'bg-indigo-600 text-white' : 'bg-indigo-600 text-white shadow-lg' 
              : darkMode ? (id === 'audio' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-800 hover:bg-gray-700') : (id === 'audio' ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-white hover:bg-gray-50')
          }`}
        >
          <Icon className={id === 'audio' ? "w-5 h-5" : "w-4 h-4"} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
