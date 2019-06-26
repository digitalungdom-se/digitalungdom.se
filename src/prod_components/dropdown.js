import React from 'react'
// import { Link } from '@components'
import Link from '@components/link'
import { Menu, Icon, Button, Dropdown, Divider } from 'antd'
import './dropdown.css'

let menu = (categories, links, active) => (
  <Menu
  	// mode="inline"
  	selectedKeys={[active]}
  >
  	{categories.map(category => (
	  		category.items.map(link => (
	  			<Menu.Item
	  				key={link}
	  				style={{paddingTop: 10, paddingBottom: 10}}
	  			>
	  				<Link to={link}>{links[link]}</Link>
	  			</Menu.Item>
	  		))
  	))}
  </Menu>
);

export default ({ categories, links, active }) => (
	<Dropdown
		overlay={menu(categories, links, active)}
	>
	  <Button className="dropdown-button">
	  	<span>
		    <span className="dropdown-display-name">
		    	{links[active]}
		    </span>
	    	<span><Icon type="compass"/></span>
    	</span>
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
