import React from 'react'
import { Authentication } from 'containers'
import { header as Wrapper } from 'wrappers'
import { Dropdown } from '@components'
import { withTranslation } from 'react-i18next'

export default withTranslation()(({ t }) => (
	<Wrapper>
		<Wrapper.Authentication>
			<Authentication />
		</Wrapper.Authentication>
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
