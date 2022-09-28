import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import tr from './entries/tr';
import en from './entries/en';

import tr_warn from './messages/tr/warning';
import en_warn from './messages/en/warning';


const resources = {
    en: {
        translation: { ...en, ...en_warn }
    },
    tr: {
        translation: { ...tr, ...tr_warn }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: "en",
        lng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;