import React from 'react'
// import { Link } from '@components'
import Link from '@components/link'

export default ({ links }) => (
	<ul>
	{
		links.map((link, id) => (
			<li key={id + link.to}>
				<Link to={link.to}>{link.text}</Link>
			</li>
		))
	}
	</ul>
)
