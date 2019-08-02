import React from 'react'
import { Link } from 'react-router-dom'

function Menu({ active, links }) {
	return (
		<nav>
		{
			Object.keys(links).map(link => (
				active.substring(0, link.length) === link ?
					<b><Link key={link} to={link}>{links[link]}</Link></b>
				:
					<Link key={link} to={link}>{links[link]}</Link>
				)
			)
		}
		</nav>
	)
}

export default Menu
