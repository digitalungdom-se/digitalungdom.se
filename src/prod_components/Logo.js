import React from 'react'

export default function({ fontSize, ...props }) {
	return (
		<h1 className="logo" style={fontSize ? { fontSize } : null} {...props}>
			Digital Ungdom
		</h1>
	)
}