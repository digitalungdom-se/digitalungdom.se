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

const LogoLink = () => (
	<NavLink to="/">
		<Logo />
	</NavLink>
)

export default withTranslation()(
	withRouter(({ t, location }) => {
		return (
			<Row
				type="flex"
				justify="space-around"
				style={{height: 60}}
				gutter={16}
			>
				<Col
					md={{offset: 1}}
					// xs={{span: 9}}
					// sm={{span: 8, offset: 0}}
					// md={{span: 6, offset: 1}}
					// lg={{span: 4}}
					className="ant-col"
				>
					<LogoLink />
				</Col>
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
				</Col>
				<Col
					// xs={{span: 0, offset: 0}}
					// sm={{span: 0, offset: 0}}
					md={{span: 0, offset: 0}}
					lg={{span: 4}}
					// style={{width: 8*24}}
					className="ant-col"
				>
					<Authentication/>
				</Col>
			</Row>
		)
	})
)
