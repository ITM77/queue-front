import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ru from './assets/languages/ru';
import tj from './assets/languages/tj';

const resources = {
  ru: {
    translation: ru
  },
  tj: {
    translation: tj
  }
};

i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: "tj",
      interpolation: {
        escapeValue: false
      }
    });

export default i18n;
