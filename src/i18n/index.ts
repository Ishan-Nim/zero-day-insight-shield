
import en from './en';
import ja from './ja';
import si from './si';
import { create } from 'zustand';

type Language = 'en' | 'ja' | 'si';

type LanguageStore = {
  currentLanguage: Language;
  translations: Record<Language, any>;
  t: (key: string) => string;
  setLanguage: (lang: Language) => void;
};

export const useLanguage = create<LanguageStore>((set, get) => ({
  currentLanguage: 'en' as Language,
  translations: {
    en,
    ja,
    si
  },
  t: (key: string) => {
    const { currentLanguage, translations } = get();
    // Split the key by dots to navigate the nested object
    const keys = key.split('.');
    let result = translations[currentLanguage];
    
    // Navigate through the nested object
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English if translation not found
        let fallback = translations.en;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            return key; // Return the key itself as last resort
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof result === 'string' ? result : key;
  },
  setLanguage: (lang: Language) => set({ currentLanguage: lang })
}));
