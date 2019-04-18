import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@components'

export default ({ children, to, type, onClick }) => {

	if(type === 'button') return (
		<Link onClick={onClick} to={to} >
			<Button>
				{children}
			</Button>
		</Link>
	)
	else return (
		<Link onClick={onClick} to={to}>
			{children}
		</Link>
	)
}
