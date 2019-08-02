import React from 'react'
import i18next, { changeLanguage } from 'i18next'
import LanguageSwitcher from '@components/LanguageSwitcher'

function LanguageContainer() {
	return (
		 <LanguageSwitcher
		 	languages={['sv', 'en']}
		 	chosenLanguage={i18next.language}
		 	changeLanguage={changeLanguage}
		 />
	)
}

export default LanguageContainer
