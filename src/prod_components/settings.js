import React from 'react'

export default ({ changeTheme, settings, changeLanguage }) => {
	return (
		<div>
			<button onClick={(e) => changeTheme({choice: settings.theme === "dark" ? "light" : "dark"})}>{settings.theme}</button>
			<button onClick={() => changeLanguage("sv")}>Svenska</button>
			<button onClick={() => changeLanguage("en")}>English</button>
		</div>
	)
}
