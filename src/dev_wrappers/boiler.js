import React from 'react'
import './boiler.css'

const boiler = ({ children }) => (
	<div>
		{children}
	</div>
)

boiler.Header = ({ children }) => (
	<div>
		{children}
	</div>
)

export default boiler
