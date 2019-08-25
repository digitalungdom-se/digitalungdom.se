import React from 'react'
// import { Authentication, Settings } from 'containers'
import Settings from 'containers/settings'
import Authentication from 'containers/authentication'
// import { Header as Wrapper } from '@wrappers'
// import { Dropdown } from '@components'
import Dropdown from '@components/dropdown'
import Menu from '@components/menu'
import { withTranslation } from 'react-i18next'
import { withRouter, NavLink } from 'react-router-dom'
import { Row, Col } from '@components/grid'
import Logo from '@components/Logo'
import Link from '@components/link'
import { useSelector } from 'react-redux'


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

const gutter = {
	xs: 10,
	sm: 20,
	md: 40,
}

export default withTranslation()(
	withRouter(({ t, location }) => {
		return (
			<Row
				type="flex"
				justify="space-between"
				style={{height: 60}}
			>
				<Col>
					<LogoLink />
				</Col>

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
									to={"/" + t("about")}
									style={{color: "grey"}}
								>
									{t("Om oss")}
								</Link>
							</Col>

							<Col >
								<Link
									to={"/" + t("agora")}
									style={{color: "grey"}}
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
			</Row>
		)
	})
)

/* Kommenterar bort för tillfället tills dess att headern fungera som vi diskuterade! :)
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
