import React from 'react'
import { connect } from 'react-redux'
import { Widgets, CreateHypagora, Hypagora } from 'containers'

const mapStateToProps = (state, props) => {
	return ({
		hypagora_infos: state.Agora.hypagora_infos[props.hypagora]
	})
}

export default connect(mapStateToProps)(({ hypagora, route }) => (
	<div>
		<Widgets />
		{
			route === "create_hypagora" ? <CreateHypagora /> : <Hypagora hypagora={hypagora} />
		}
	</div>
))
