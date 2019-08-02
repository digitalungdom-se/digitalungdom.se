import React, { useState } from 'react'
import { Icon } from 'antd'

function Star({ defaultClick = false, resetOnClick, onClick = () => {}, size = 16, type = "star", theme = "twoTone", style, ...props}) {

	const [isHovering, hover] = useState(false)

	return (
		<Icon
			type={type}
			theme={theme}
			onMouseOver={() => hover(true)}
			onMouseLeave={() => hover(false)}
			onClick={onClick}
			twoToneColor={isHovering || defaultClick ? "#ffd400" : "grey" }
			style={{
				fontSize: size, transition: "0.1s", cursor: "pointer",
				...style
			}}
			{...props}
		/>
	)
}

export default Star
