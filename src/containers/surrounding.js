import React from 'react'
import { connect } from 'react-redux'
import Widgets from 'containers/widgets'
import { Row, Col } from '@components/grid'
// import { Surrounding as Wrapper } from '@wrappers'

const mapStateToProps = (state, props) => {
	let hypagora = props.hypagora
	if(!hypagora) hypagora = "general"
	return ({
		hypagora_info: state.Agora.hypagora_infos[hypagora]
	})
}


export default connect(mapStateToProps)(({ hypagora_info, hypagora, route, children }) => (
	<Row
		className="agora-surrounding"
		style={{
			background: hypagora_info.background,
		}}
	>
		<Col
				xs={{ span: 24 }}
				sm={{ span: 24 }}
				md={{ span: 17, offset: 0 }}
				lg={{ span: 14, offset: 2 }}
			>
			{children}
		</Col>
		<Col
				xs={0}
				sm={{span: 0}}
				md={{span: 7}}
				lg={{span: 6, offset: 1}}
			>
			<Widgets />
		</Col>
	</Row>
))
