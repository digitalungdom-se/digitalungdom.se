import React, { Component } from 'react'
import { Row } from 'antd'
import { Carousel } from 'components'

class Home extends Component {
	render() {
		return (
			<div>
				<Row>
					<Carousel />
				</Row>
			</div>
		)
	}
}

export default Home
