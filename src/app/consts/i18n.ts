import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
	en: {
		translation: {
			welcomeMessage: 'Welcome to React and react-i18next',
		},
	},
	ru: {
		translation: {
			welcomeMessage: 'Добро пожаловать в React и react-i18next',
		},
	},
}

i18n.use(initReactI18next).init({
	resources,
	fallbackLng: 'ru',
	lng: 'ru',

  debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/locale/{{lng}}/translation.json",
    },
})

export default i18n
