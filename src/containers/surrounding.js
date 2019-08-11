import React from 'react'
import { useSelector } from 'react-redux'
import Widgets from 'containers/widgets'
import { Row, Col } from '@components/grid'
// import { Surrounding as Wrapper } from '@wrappers'
import Filter from 'containers/Filter'

export default ({ hypagora = "general", children }) => {

	const hypagoraInfo = useSelector(state => state.Agora.hypagora_infos[hypagora])

	return (
		<React.Fragment>
			<Row>
				<Filter />
			</Row>
			<Row
				className="agora-surrounding"
				style={{
					background: hypagoraInfo ? hypagoraInfo.background : "transparent",
					marginTop: 16
				}}
			>
				<Col
						xs={{ span: 24 }}
						sm={{ span: 24 }}
						md={{ span: 15, offset: 1 }}
						lg={{ span: 10, offset: 5 }}
					>
					{children}
				</Col>
				<Col
						xs={0}
						sm={{span: 0}}
						md={{span: 6, offset: 1}}
						lg={{span: 5, offset: 1}}
					>
					<Widgets />
				</Col>
			</Row>
		</React.Fragment>
	)
}
