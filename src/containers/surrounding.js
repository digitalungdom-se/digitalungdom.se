import React from 'react'
import { useSelector } from 'react-redux'
import Widgets from 'containers/widgets'
import { Row, Col } from '@components/grid'
// import { Surrounding as Wrapper } from '@wrappers'

export default ({ hypagora = "general", children }) => {

	const hypagoraInfo = useSelector(state => state.Agora.hypagora_infos[hypagora])

	return (
		<Row
			className="agora-surrounding"
			style={{
				background: hypagoraInfo ? hypagoraInfo.background : "transparent",
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
					lg={{span: 4, offset: 1}}
				>
				<Widgets />
			</Col>
		</Row>
	)
}
