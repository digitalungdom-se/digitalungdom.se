import React from 'react'
// import { Link } from '@components'
import { NavLink } from 'react-router-dom'

export default ({ links, categories }) => (
	<ul>
		{
			categories.map((category, id) => (
				category.items.map((link, id) => (
					<li key={id + link}>
						<NavLink to={link}>{links[link]}</NavLink>
					</li>
				))
			))
		}
	</ul>
)
