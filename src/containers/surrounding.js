import React from 'react'
import { useSelector } from 'react-redux'
import Widgets from 'containers/widgets'
import { Row, Col } from '@components/grid'
// import { Surrounding as Wrapper } from '@wrappers'
import Filter from 'containers/Filter'

export default ({ hypagora = "general", children }) => {

	const CenterWrapper = ({ children }) => (
		<Col type = "flex" justify="center" span={20} style={{backgroundColor: 'pink'}}>
			<Row
			type = "flex"
			justify="center"
			style={{
			background: hypagoraInfo ? hypagoraInfo.background : "transparent",
			marginTop: 16,
			backgroundColor: 'pink'}}>
				{children}
			</Row>
		</Col>
	)

	const hypagoraInfo = useSelector(state => state.Agora.hypagora_infos[hypagora])

	return (
		<React.Fragment>
			<Row>
				<Filter />
			</Row>

			<Row
			type="flex"
			justify="center"
			style={{marginTop: 30}}>
				<Col
				xs={{ span: 22 }}
				sm={{ span: 22 }}
				md={{ span: 20 }}
				lg={{ span: 18 }}
				xl={{ span: 16 }}>
					<Row
					style={{width: "100%"}}
					type = "flex"
					justify="space-between">

						<Col
						xs={{ span: 22 }}
						sm={{ span: 22 }}
						md={{ span: 16 }}
						lg={{ span: 16 }}>
							{children}
						</Col>

						<Col
						xs={{span: 0}}
						sm={{span: 0}}
						md={{span: 7}}
						lg={{span: 7}}
						type = "flex" justify="center">
							<Widgets />
						</Col>
					</Row>
				</Col>
			</Row>
		</React.Fragment>
	)
}
