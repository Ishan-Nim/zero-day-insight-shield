
import React, { createContext, useState, useContext, ReactNode } from 'react';
import enTranslations from '@/locales/en.json';
import jaTranslations from '@/locales/ja.json';
import siTranslations from '@/locales/si.json';

type Language = 'en' | 'ja' | 'si';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: enTranslations,
  ja: jaTranslations,
  si: siTranslations
};

const getInitialLanguage = (): Language => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage && ['en', 'ja', 'si'].includes(savedLanguage)) {
    return savedLanguage as Language;
  }
  
  // Try to detect browser language
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'ja', 'si'].includes(browserLang)) {
    return browserLang as Language;
  }
  
  return 'en'; // Default to English
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => ''
});

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage());

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language];
    
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        // Fallback to English if key doesn't exist in current language
        let fallback: any = translations.en;
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk];
          } else {
            return key; // Return the key itself if not found
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
