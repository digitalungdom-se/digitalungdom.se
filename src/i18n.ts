import 'moment/locale/sv';

import Moment from 'react-moment';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next

  .init(
    {
      fallbackLng: 'sv',
      lng: 'sv',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      resources: {
        sv: {
          translation: {
            COMMENT_ON_COMMENT: 'Någon svarade på din kommentar!',
          },
        },
        en: {
          translation: {
            COMMENT_ON_COMMENT: 'Someone replied to your comment!',
          },
        },
      },
    },
    () => {
      Moment.globalLocale = i18n.language;
    },
  );

i18n.on('languageChanged', function (lng) {
  Moment.globalLocale = lng;
});

export default i18n;
