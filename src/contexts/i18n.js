import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from '../locales/en/translation.json';
import hiTranslation from '../locales/hi/translation.json';

const resources = {
  en: {
    translation: enTranslation
  },
  hi: {
    translation: hiTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || navigator.language.slice(0, 2),
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
