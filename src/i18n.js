import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// استورد الترجمات الخاصة بك
import translationAR from "./locales/ar/translation.json";
import translationEN from "./locales/en/translation.json";

// احصل على اللغة من localStorage أو استخدم "ar" كافتراضية
const savedLang = localStorage.getItem("lang") || "ar";

i18n.use(initReactI18next).init({
  resources: {
    ar: { translation: translationAR },
    en: { translation: translationEN },
  },
  lng: savedLang, // اللغة الافتراضية من localStorage
  fallbackLng: "ar",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
