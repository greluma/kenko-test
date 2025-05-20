import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';

export type Idiomas = 'en' | 'es' | 'fr';
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'es', // idioma por defecto si no encuentra el del navegador
    resources: {
      en: { translation: en },
      es: { translation: es },
      fr: { translation: fr },
    },
    interpolation: {
      escapeValue: false,
    },
    debug: import.meta.env.DEV,
  });

export default i18n;
