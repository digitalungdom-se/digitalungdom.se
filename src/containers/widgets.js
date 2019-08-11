import React from 'react'
import Widgets from '@components/Widgets'

const WidgetsContainer = ({ hypagora = "general" }) => {
	return (
		<Widgets
			hypagora={hypagora}
		/>
	)
}

export default WidgetsContainer
