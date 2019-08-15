import React from 'react'
// import { Button } from '@components'
// import Button from '@components/button'
import { Menu, Button, Row } from 'antd'
import Link from '@components/link'

const menu = () => ( <
  menu >
  <
  Menu.Item > Menu < /Menu.Item> <
  SubMenu title = "SubMenu" >
  <
  Menu.Item > SubMenuItem < /Menu.Item> <
  /SubMenu> <
  /menu>
)

export default ( { profile, logOut, translations } ) => (


  <
  Dropdown overlay = { menu } trigger = {
    [ 'click' ] } >
  <
  Row >
  <
  img src / >
  <
  /Row> <
  /Dropdown>

  <
  Link loading = { profile.authing } style = { { width: "100%" } } to = { "/@" + profile.details.username } type = "button" >
  {
    profile.details.username ?
    profile.details.username :
      'Loading...'
  } <
  /Link>
)

/*<Button onClick={logOut}>{translations["Log out"]}</Button>*/