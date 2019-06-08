import React from 'react'
// import { Link } from '@components'
import Link from '@components/link'
import { Menu, Icon, Button, Dropdown } from 'antd'
import './dropdown.css'

let menu = (links) => (
  <Menu
  >
  	{links.map((link, id) => (
  		<Menu.Item key={id + link.to}>
  			<Link to={link.to}>{link.text}</Link>
  		</Menu.Item>
  	))}
  </Menu>
);

export default ({ links }) => (
	<Dropdown
		overlay={menu(links)}
	>
	  <Button
	  	className="dropdown-button"
	  >
	    Button <Icon type="down" />
	  </Button>
  </Dropdown>
)
/*
<ul>
{
	links.map((link, id) => (
		<li key={id + link.to}>
			<Link to={link.to}>{link.text}</Link>
		</li>
	))
}
</ul>
*/
