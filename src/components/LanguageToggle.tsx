import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();
  const current = (i18n.language || '').split('-')[0] || 'fr';

  const toggleLanguage = () => {
    const newLang = current === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
    try {
      localStorage.setItem('i18nextLng', newLang);
    } catch (e) {
      console.error('Lang storage failed', e);
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Changer de langue"
    >
      <Globe className="w-4 h-4" />
      <span className="text-sm font-medium">
        {current === 'fr' ? 'EN' : 'FR'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle;
