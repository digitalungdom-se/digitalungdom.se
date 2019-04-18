import React from 'react'

export default ({ children, onClick }) => (
	<button onClick={onClick}>
		{children}
	</button>
)
