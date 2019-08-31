import React from 'react'
import { Link } from 'react-router-dom'
import { Menu as AntdMenu } from 'antd'
require('./menu.css')

function Menu({ active, links, ...props }) {
	return (
		<AntdMenu
			{...props}
	    selectedKeys={[active]}
	    // className={className}
	    style={{lineHeight: '58px'}}
	  >
		{
			Object.keys(links).map(link => (
				active.substring(0, link.length) === link ?
				<AntdMenu.Item key={link}>
					<Link to={link}>{links[link]}</Link>
				</AntdMenu.Item>
				:
				<AntdMenu.Item key={link}>
					<Link to={link}>{links[link]}</Link>
				</AntdMenu.Item>
				)
			)
		}
		</AntdMenu>
	)
}

export default Menu
