import React from 'react'
// import { Button } from '@components'
// import Button from '@components/button'
import { Dropdown, Menu, Button } from 'antd'

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

export default ({ profile, logOut, translations }) => (
	<Dropdown
		overlay={menu}
	>
		<Button
      loading={profile.authing}
      style={{width: "100%"}}>
      {
			 profile.username ?
			 profile.username
				:
				'Loading...'
			}
    </Button>
	</Dropdown>
)

/*<Button onClick={logOut}>{translations["Log out"]}</Button>*/
