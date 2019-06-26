import React from 'react'
// import { Authentication, Settings } from 'containers'
import Settings from 'containers/settings'
import Authentication from 'containers/authentication'
// import { Header as Wrapper } from '@wrappers'
import Wrapper from '@wrappers/header'
// import { Dropdown } from '@components'
import Dropdown from '@components/dropdown'
import { withTranslation } from 'react-i18next'
import { withRouter } from 'react-router-dom'

export default withTranslation()(
	withRouter(({ t, location }) => {
		// let active = location.
		return (
			<Wrapper>
				<Wrapper.Dropdown>
					<Dropdown
						active={location.pathname}
						categories={[
							{title: "Digital Ungdom", items: ['/', '/agora', '/state', '/state/create']},
						]}
						links={{
							'/': t("Home"),
							'/agora': 'Agora',
							'/state': 'State',
							'/state/create': 'State_create'
						}}
						// 	{text: t("Home"), to: '/'},
						// 	{text: 'Agora', to: '/agora'},
						// 	{text: 'State', to: '/state'},
						// 	{text: 'State_create', to: '/state/create'}
						// ]}
					/>
				</Wrapper.Dropdown>	
				<Wrapper.Authentication>
					<Authentication/>
				</Wrapper.Authentication>
			</Wrapper>
		)
	})
)

// <Settings />
