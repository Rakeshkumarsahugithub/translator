import React from 'react';
import { Mail, Phone, User } from 'lucide-react';

const ContactCard = ({ darkMode }) => {
  return (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-6 mt-8`}>
      <h3 className="text-xl font-semibold mb-4 text-center">Contact Developer</h3>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-indigo-600" />
          <span className="font-medium">Rakesh Kumar Sahu</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Mail className="w-5 h-5 text-green-600" />
          <a 
            href="mailto:sahurks1234@gmail.com" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            sahurks1234@gmail.com
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Phone className="w-5 h-5 text-purple-600" />
          <a 
            href="tel:+919777718050" 
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            +91 9777718050
          </a>
        </div>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>For support, feedback, or collaboration opportunities</p>
      </div>
    </div>
  );
};

export default ContactCard;
