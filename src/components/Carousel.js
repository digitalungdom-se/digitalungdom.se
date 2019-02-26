import React, { Component } from 'react'
import { Carousel, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

class DUCarousel extends Component {
	render() {
		return (
			<Carousel
				arrows="true"
				nextArrow={<button><Icon type="right" /></button>}
				prevArrow={<button><Icon type="left" /></button>}
				autoscroll
			>
				<div>
					<h1
						className="background-rgba"
						style={{ marginTop: 50, marginBottom: 25}}
					>
						Gillar du programmering?
					</h1>
					<p
						className="background-rgba"
						style={{width: '75%', margin: '0 auto', marginBottom: 50}}
					>
						Vi älskar också programmering och digital teknik. Läs mer om vilka vi är genom att trycka på knappen.
					</p>
					<Link to="/om-oss">
						<Button style={{marginBottom: 20}}>Läs mer om oss</Button>
					</Link>
				</div>
				<div>
					<h1
						className="background-rgba"
						style={{ marginTop: 50, marginBottom: 25}}
					>
						Vad gör Digital Ungdom?
					</h1>
					<p
						className="background-rgba"
						style={{width: '75%', margin: '0 auto', marginBottom: 50}}
					>
						Digital Ungdom har flera delmål som är direkt länkade till vår planerad verksamhet.
					</p>
					<Link style={{display: 'block'}} to="/verksamhet">
						<Button style={{marginBottom: 20}}>Läs om verksamhet</Button>
					</Link>
				</div>
		  </Carousel>
		)
	}
}

export default DUCarousel
