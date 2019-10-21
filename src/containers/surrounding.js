import React from 'react'
import { useSelector } from 'react-redux'
import Widgets from 'containers/widgets'
import { Row, Col } from '@components/grid'
// import { Surrounding as Wrapper } from '@wrappers'
import Filter from 'containers/Filter'

export default ({ hypagora = "general", children, noSurrounding = false }) => {

	return (
		<React.Fragment>
			{
				!noSurrounding
				&&
				<Row>
					<Filter />
				</Row>
			}

			<Row
				type="flex"
				justify="center"
				style={{marginTop: 30}}
			>

				<Col
				xs={{ span: 22 }}
				sm={{ span: 22 }}
				md={{ span: 20 }}
				lg={{ span: 18 }}
				xl={{ span: 16 }}>
				{
					!noSurrounding
					&&
					<Row
						type="flex"
	          justify="space-between"
	          style={{
	      //       alignItems: 'stretch',
							// width: "100%",
							// background: "blue"
	          }}
						gutter={16}
	        >

						<Col
						xs={{span: 24}}
						sm={{span: 12}}
						md={{span: 8, push: 16}}
						lg={{span: 8}}
						justify="end">
							<Widgets />
						</Col>

						<Col
							xs={{ span: 24 }}
							md={{ span: 16, pull: 8 }}
							lg={{ span: 16 }}
						>
							{children}
						</Col>

					</Row>
				}
				{
					noSurrounding &&
					children
				}
				</Col>
			</Row>
		</React.Fragment>
	)
}

/*
<Col
xs={{span: 0}}
sm={{span: 0}}
md={{span: 7}}
lg={{span: 7}}
// push={2}
type = "flex" justify="center">
  <Widgets />
</Col>
*/
