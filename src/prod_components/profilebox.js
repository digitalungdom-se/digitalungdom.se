import React from 'react'
// import { Button } from '@components'
// import Button from '@components/button'
import { Menu, Dropdown, Button, Row } from 'antd'
import Link from '@components/link'

const menu = () => (
  <menu>
    <Menu.Item > Menu < /Menu.Item>
    <Menu.Item > Menu < /Menu.Item>
    <Menu.Item > Menu < /Menu.Item>
  </menu>
)

export default ( { profile, logOut, translations } ) => (


  <Dropdown overlay = { menu } trigger = {[ 'click' ] }>
    <Row >
      <Link loading = { profile.authing } style = { { width: "100%" } } to = { "/@" + profile.details.username } type = "button" >
        {
          profile.details.username ?
          profile.details.username :
            'Loading...'
        }
      </Link>
    </Row>
  </Dropdown>


)

/*<Button onClick={logOut}>{translations["Log out"]}</Button>*/
