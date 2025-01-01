import { useTranslation } from 'react-i18next'

const App = () => {
	const { t, i18n } = useTranslation()

	const changeLanguage = (language: string) => {
		i18n.changeLanguage(language)
	}

	return (
		<div className='App'>
			<button onClick={() => changeLanguage('en')}>English</button>
			<button onClick={() => changeLanguage('ru')}>Русский</button>
			<h1>{t("title")}</h1>
		</div>
	)
}

export default App
