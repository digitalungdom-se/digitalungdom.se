import React, {useState, useEffect} from 'react'
// import { Authentication, Settings } from 'containers'
import Settings from 'containers/settings'
import Authentication from 'containers/authentication'
// import { Header as Wrapper } from '@wrappers'
// import { Dropdown } from '@components'
import { Dropdown, Menu, Icon } from "antd"
import { withTranslation } from 'react-i18next'
import { withRouter, NavLink } from 'react-router-dom'
import { Row, Col } from '@components/grid'
import Logo from '@components/Logo'
import Link from '@components/link'
import { useSelector } from 'react-redux'

const linksMenu = (t, setDropdownVisible) => (
  <Menu
  style={{marginLeft: -28, marginTop: -24, padding: "0px 12px"}}
  >

    <ul style={{textAlign: 'center', padding: 0, paddingTop: 4}}>
      <li style={{ listStyleType: "none", margin: "10px 0px"}}>
        <Link
          linkType="navigation"
          to={"/" + t("about")}
          onClick={()=> setDropdownVisible(false)}
        >
          {t("Om oss")}
        </Link>
      </li>

      <li style={{ listStyleType: "none", margin: "10px 0px"}}>
        <Link
          linkType="navigation"
          to={"/" + t("agora")}
          onClick={()=> setDropdownVisible(false)}
        >
          {t("Agora")}
        </Link>
      </li>
    </ul>

    <Authentication type="dropdown" setDropdownVisible={setDropdownVisible}/>

  </Menu>
)

const LogoLink = () => {
  const authorized = useSelector(state => state.Auth.authorized)

  if(!authorized){
	return (
  <NavLink style={{textAlign: 'left'}}to="/">
		<Logo />
	</NavLink>);
  } else{
  return (
    <NavLink style={{textAlign: 'left'}}to="/agora">
  		<Logo />
  	</NavLink>);
  }
}

function renderNavBar(t, windowWidth, dropdownVisible, setDropdownVisible){
  if(windowWidth > 480){
    return(
      <Row
        type='flex'
        gutter={gutter}
        justify="start"
      >
        <Col>
          <Row
            type="flex"
            justify="start"
            gutter={gutter}
          >
            <Col >
              <Link
                linkType="navigation"
                to={"/" + t("about")}
              >
                {t("Om oss")}
              </Link>
            </Col>

            <Col >
              <Link
                linkType="navigation"
                to={"/" + t("agora")}
              >
                {t("Agora")}
              </Link>
            </Col>

          </Row>

        </Col>

        <Col>
          <Authentication/>
        </Col>
      </Row>
    )
  }else{
    return(
      <Dropdown
      onClick={()=> setDropdownVisible(true)}
      overlay = { () => linksMenu(t, setDropdownVisible) }
      visible={dropdownVisible}
      trigger={['click']}
      >
        <Link>
          <Icon type="menu" />
        </Link>
      </Dropdown>
    )
  }
}

const gutter = {
	xs: 10,
	sm: 20,
	md: 40,
}

export default withTranslation()(
	withRouter(({ t, location }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);

    // With hook determine width of window
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    useEffect(() => {
      function handleResize() {
        setWindowWidth(window.innerWidth);
      }

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return(
  			<Row
  				type="flex"
  				justify="space-between"
  				style={{height: 60}}
  			>
  				<Col>
  					<LogoLink />
  				</Col>

          {renderNavBar(t, windowWidth, dropdownVisible, setDropdownVisible)}

  			</Row>
		)
	})
)

/* Kommenterar bort för tillfället tills dess att headern fungera som vi diskuterade, (Detta är sök/navigation-baren)
	<Col
		xs={{span: 9, offset: 0}}
		sm={{span: 8, offset: 0}}
		md={{span: 6, offset: 0}}
		lg={{span: 4}}
		className="ant-col"
	>

	<Dropdown
		active={location.pathname}
		categories={[
			{title: "Digital Ungdom", items: ['/', '/agora', '/om-oss']},
		]}
		links={{
			'/': t("Home"),
			'/agora': 'Agora',
			'/om-oss': 'Om oss',
			'/verksamhet': 'Verksamhet',
			'/state': 'State'
		}}
	/>
	*/
