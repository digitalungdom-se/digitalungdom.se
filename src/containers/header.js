import React from 'react'
// import { Authentication, Settings } from 'containers'
import Settings from 'containers/settings'
// import { Header as Wrapper } from '@wrappers'
import Wrapper from '@wrappers/header'
// import { Dropdown } from '@components'
import Dropdown from '@components/dropdown'
import { withTranslation } from 'react-i18next'

export default withTranslation()(({ t }) => (
	<Wrapper>
		<Wrapper.Dropdown>
			<Dropdown
				links={[
					{text: t("Home"), to: '/'},
					{text: 'Agora', to: '/agora'},
					{text: 'State', to: '/state'},
					{text: 'State_create', to: '/state/create'}
				]}
			/>
		</Wrapper.Dropdown>

	</Wrapper>
))

// <Settings />
