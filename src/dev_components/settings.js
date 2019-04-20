import React from 'react'

export default ({ changeTheme, settings }) => {
	return (
		<div>
			<button onClick={(e) => changeTheme({choice: settings.theme === "dark" ? "light" : "dark"})}>{settings.theme}</button>
		</div>
	)
}
