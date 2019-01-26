import React, { Component } from 'react'
import { Carousel, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

const Arrow = props => {
	const {currentSlide, slideCount, type, ...arrowProps} = props
	return (
		<button {...arrowProps}></button>
	)
}

class DUCarousel extends Component {
	render() {
		return (
			<Carousel
				arrows="true"
				nextArrow={<Arrow type="arrow-right" />}
				prevArrow={<Arrow type="arrow-left" />}
			>
				<div>
						<h1 style={{marginBottom: 20}}>Gillar du programmering?</h1>
						<Link to="bli-medlem">
							<Button type="primary" style={{marginBottom: 20}}>Bli medlem</Button>
						</Link>
				</div>
		    <div><h3>2</h3></div>
		    <div><h3>3</h3></div>
		    <div><h3>4</h3></div>
		  </Carousel>
		)
	}
}

export default DUCarousel
