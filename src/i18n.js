import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    loadPath: '/locales/{{lng}}/{{ns}}.json',
    lng: "sv",
    fallbackLng: "sv", // use en if detected lng is not available

    saveMissing: false, // send not translated keys to endpoint

    keySeparator: ".", // we do not use keys in form messages.welcome

    interpolation: {
      format: function(value, format, lng) {
        if(format === "uppercase") return value[0].toUpperCase() + value.substring(1);
        else if(format === "lowercase") return value[0].toLowerCase() + value.substring(1);
        return value
      },
      escapeValue: false // react already safes from xss
    },
    debug: false
  });

export default i18n;
