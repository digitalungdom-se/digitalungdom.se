import React from 'react'
// import { Button } from '@components'
// import Button from '@components/button'
import { Menu, Dropdown, Button, Row, Icon } from 'antd'
import Link from '@components/link'
import ProfilePicture from '@components/ProfilePicture'

const menu = (profile, logout) => (
  <Menu style={{marginLeft: -28}}>
    <Menu.Item >
      <Link
      loading = { profile.authing }
      to = { "/@" + profile.details.username }
      >
        Din profil
      </Link>
    </Menu.Item>

    <Menu.Divider />
    <Menu.Item >
      <span
      style = { { color: '#c95b55' } }
      onClick ={logout}
      >
        Logga ut
      </span>
    </Menu.Item>
  </Menu>
)

export default ( { profile, logout, translations } ) => (

    <Dropdown
    overlay = { () => menu(profile, logout) }
    >
      <Link
      loading = { profile.authing }
      style = { { color: "rgba(0,0,0,0.4)" } }
      to = { "/@" + profile.details.username }
      >
        <Row
        type="flex"
        justify="center"
        align="middle"
        style={{marginTop: 14}}
        >
          <ProfilePicture
          style={{marginRight: 4, marginLeft: 4}}
          username={profile.details.username}
          size={32}
          />
          <Icon
          type="caret-down"
          />
        </Row>
      </Link>
    </Dropdown>


)

/*<Button onClick={logOut}>{translations["Log out"]}</Button>*/
