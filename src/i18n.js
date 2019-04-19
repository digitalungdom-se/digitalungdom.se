import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import backend from "i18next-xhr-backend";
const resources = require('./i18n-resources.json')

i18n
  .use(detector)
  .use(backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
  	resources,
    lng: "sv",
    fallbackLng: "sv", // use en if detected lng is not available

    saveMissing: true, // send not translated keys to endpoint

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      format: function(value, format, lng) {
        if(format === "uppercase") return value[0].toUpperCase() + value.substring(1);
        else if(format === "lowercase") return value[0].toLowerCase() + value.substring(1);
        return value
      },
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;


// // the translations
// // (tip move them in a JSON file and import them)
// const resources = {
//   en: {
//     translation: {
//       "Home": "Home"
//     }
//   },
//   sv: {
//   	translation: {
//   		"Home": "Hem"
//   	}
//   }
// };

// i18n
//   .use(initReactI18next) // passes i18n down to react-i18next
//   .init({
//     resources,
//     lng: "en",

//     keySeparator: false, // we do not use keys in form messages.welcome

//     interpolation: {
//       escapeValue: false // react already safes from xss
//     }
//   });

//   export default i18n;