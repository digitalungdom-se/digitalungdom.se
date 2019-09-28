import React from 'react'
import withTranslation from 'react-i18next'

function Paragraph({ 
	children,
	color,
	t
}) {
	return (
		<p
			style={{
				color
			}}
		>
			{t("Hej")}
			{ children }
		</p>
	)
}


export default withTranslation(Paragraph)
