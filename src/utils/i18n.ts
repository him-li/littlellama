import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from '../locales/en.json';
import HE from '../locales/he.json';
import AR from '../locales/ar.json';
import ZH_HANS from '../locales/zh_hans.json';
import ZH_HANT from '../locales/zh_hant.json';

const resources = {
  en: {
    translation: EN
  },
  he: {
    translation: HE
  },
  ar: {
    translation: AR
  },
  zh_hans: {
    translation: ZH_HANS
  },
  zh_hant: {
    translation: ZH_HANT
  },
};

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    lng: typeof window === 'undefined' ? 'en' : localStorage.getItem('littlellama-language') || 'en',
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    },
    ns: "translation",
    defaultNS: "translation"
  });

const syncDocumentDirection = (language: string) => {
  if (typeof document === 'undefined') return;
  const languageCode = language.split('-')[0];
  document.documentElement.lang = languageCode;
  document.documentElement.dir = ['ar', 'he'].includes(languageCode) ? 'rtl' : 'ltr';
  document.body?.setAttribute('dir', document.documentElement.dir);
  localStorage.setItem('littlellama-language', language);
};

syncDocumentDirection(i18n.language);
i18n.on('languageChanged', syncDocumentDirection);

export default i18n;
