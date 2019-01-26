import React, { Component } from 'react'
import { Row } from 'antd'
import Carousel from './Carousel.js'

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
