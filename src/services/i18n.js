import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from 'locales/ru.json';

export default i18next.use(initReactI18next).init({
  resources,
  fallbackLng: 'ru',
  debug: process.env.NODE_ENV === 'development',
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
});
