import React from 'react'
import { connect } from 'react-redux'
import Widgets from 'containers/widgets'
// import { Surrounding as Wrapper } from '@wrappers'
import Wrapper from '@wrappers/surrounding'

const mapStateToProps = (state, props) => {
	let hypagora = props.hypagora
	if(!hypagora) hypagora = "general"
	return ({
		hypagora_info: state.Agora.hypagora_infos[hypagora]
	})
}

export default connect(mapStateToProps)(({ hypagora_info, hypagora, route, children }) => (
	<Wrapper
		hypagora_info={hypagora_info}
	>
		<Wrapper.Children>
			{children}
		</Wrapper.Children>
		<Wrapper.Widgets>
			<Widgets />
		</Wrapper.Widgets>
	</Wrapper>
))
