import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import pl from './locales/pl.json';
import fr from './locales/fr.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        interpolation: { escapeValue: false },
        resources: {
            en: { translation: en },
            fr: { translation: fr },
            pl: { translation: pl }
        },
        lng: 'en',
        fallbackLng: 'en',
        debug: true
    });

export default i18n;