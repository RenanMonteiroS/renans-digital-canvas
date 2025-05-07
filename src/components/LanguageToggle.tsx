
import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center">
      <button
        className={`px-2 text-xs font-medium ${language === 'en' ? 'text-purple' : 'text-gray-500'}`}
        onClick={() => setLanguage('en')}
      >
        EN
      </button>
      <span className="text-gray-300">|</span>
      <button
        className={`px-2 text-xs font-medium ${language === 'pt' ? 'text-purple' : 'text-gray-500'}`}
        onClick={() => setLanguage('pt')}
      >
        PT
      </button>
    </div>
  );
};

export default LanguageToggle;
