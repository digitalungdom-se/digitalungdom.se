import React, { Component } from 'react'
import { Card, Col, Icon, Row, Rate, Skeleton } from 'antd'
import { UserLink, GroupLink } from 'components'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'

const date = Math.floor(Date.now()/1000)

class AgoraPost extends Component {

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

		const Comments = <div>Hello</div>

		return (
			<div>
			<Card
				bodyStyle={{padding: '10px 20px 10px 0'}}
				actions={[
					<span>
						<Link to={"/agora/inlagg/" + post.id} target="_blank">
							<Icon type="message"/> {this.formatNumber(post.comments)} kommentarer
						</Link>
					</span>]}
				className="agora-post"
			>
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
					<Skeleton active loading={this.props.loading}>
						<Row className="info">
							<span>Postat av <UserLink user={post.user} /></span>
							<span>{this.formatDate('5c40ecdc0000')}</span>
						</Row>
						<Row>
								<h1>{post.title}</h1>
								<ReactMarkdown source={post.text} />
						</Row>
					</Skeleton>
					</Col>
				</Row>
			</Card>
			{
				this.props.comments ? (
					<Card>
						{ Comments }
					</Card>
				) : null
			}
			</div>
		)
	}
}

AgoraPost.defaultProps = {
	post: {
		user: {
			username: '',
			name: ''
		},
		date: new Date(Date.now()),
		text: '',
		title: '',
		stars: 0,
		comments: 0
	},
}

export default AgoraPost
