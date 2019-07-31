import React from 'react'

const Widgets = (props) => {
	const hypagora = props.hypagora
	return (
		<div>
			<div>Surrounding</div>
			<div>{hypagora}</div>
		</div>
	)
}

export default Widgets
