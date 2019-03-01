import React, { Component } from 'react'
import { Card, Col, Icon, Row, Rate } from 'antd'
import { UserLink } from 'components'
import ReactMarkdown from 'react-markdown'
var Dialog = require('rc-dialog')

const date = Math.floor(Date.now()/1000)

class AgoriaPost extends Component {

	formatNumber(number) {
		if(number > 1000) return Math.floor(number/100)/10 + 'k';
		else return number
	}

	formatDate(id) {

		let months = [
		'januari',
		'februari',
		'mars',
		'april',
		'maj',
		'juni',
		'juli',
		'augusti',
		'september',
		'oktober',
		'november',
		'december'
		]

		let seconds = parseInt(id.slice(0, 8), 16)

		let diff = date - seconds

		if(diff < 10) return 'några sekunder sedan';
		else {
			if(diff < 60) return diff + ' sekunder sedan';
			else {
				if(diff < 3600) return Math.floor(diff/60) + ' minuter sedan';
				else {
					if(diff < 86400) return Math.floor(diff/(3600)) + ' timmar sedan';
					else {
						if(diff < 2678400) return Math.floor(diff/(86400)) + ' dagar sedan';
						else {
							let postDate = new Date(seconds*1000)
							let nowDate = new Date(date*1000)
							let formatted = postDate.getDate() + ' ' + ( months[postDate.getMonth()])
							if(postDate.getFullYear() === nowDate.getFullYear()) return formatted
							else return formatted + ' ' + postDate.getFullYear()
						}
					}
				}
			}
		}

	}
	
	render() {

		const { post } = this.props

		return (
			<Card
				bodyStyle={{padding: '10px 20px 10px 0'}}
				actions={[<span><Icon type="message"/> {this.formatNumber(post.comments)}</span>, <Icon type="share-alt" />, <Icon type="flag" />]}
				className="agoria-post"
			>
				{console.log(Dialog)}
				<Row
				>
					<Col
						span={3}
						className="starCol"
					>
						<Rate defaultValue={0} count={1}/>
						<div>
							{this.formatNumber(post.stars)}
						</div>
					</Col>
					<Col
						span={21}
					>
						<Row className="info">
							<span>Postat av <UserLink user={post.user} /></span>
							<span>{this.formatDate('5c40ecdc0000')}</span>
						</Row>
						<Row>
							<h1>{post.title}</h1>
							<ReactMarkdown source={post.text} />
						</Row>
					</Col>
				</Row>
			</Card>
		)
	}
}

export default AgoriaPost
