import React, { Component } from 'react'
import { Row, Col, Affix, Card, Button } from 'antd'
import { Link, Switch, Route } from 'react-router-dom'
import { Agora } from 'components'
import { Agora as actions } from 'actions'
import { connect } from 'react-redux'

let input = `Digital Ungdom är ett nationellt allmännyttigt ideellt förbund i Sverige. Digital Ungdoms syfte är att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och datavetenskap, samt hur detta kan användas. Digital Ungdoms vision är att verka genom ett brett kontaktnät av ungdomar och därigenom aktivt bidra till att Sverige blir världsledande inom digital teknik och datavetenskap.

Digital Ungdom samarbetar med den nationella handlingsplanen för digitalisering av skolväsendet. Sveriges Kommuner och Landsting har efter en överrenskommelse med regeringen, ansvaret att ta fram denna handlingsplan. Digital Ungdom bidrar med ett elevperspektiv i frågor som rör digital kompetens, digitaliserings utveckling, och de förslag som kommer läggas fram till regeringen i samband med handlingsplanen.
`

const posts = [
	{
		user: {
			username: 'Nautman',
			name: 'Douglas Bengtsson'
		},
		date: new Date('2019-02-18'),
		text: input,
		title: 'Digitalt rådslag!',
		stars: 10,
		comments: 121
	},
	{
		user: {
			username: 'Nautman',
			name: 'Douglas Bengtsson'
		},
		date: new Date('2019-02-18'),
		text: input,
		title: 'Digitalt rådslag!',
		stars: 10,
		comments: 121
	},
	{
		user: {
			username: 'Nautman',
			name: 'Douglas Bengtsson'
		},
		date: new Date('2019-02-18'),
		text: input,
		title: 'Digitalt rådslag!',
		stars: 10,
		comments: 121
	},
	// {
	// 	user: 'Douglas Bengtsson',
	// 	date: new Date('2019-02-18'),
	// 	text: input,
	// 	title: 'Digitalt rådslag!'
	// },
	// {
	// 	user: 'Douglas Bengtsson',
	// 	date: new Date('2019-02-18'),
	// 	text: input,
	// 	title: 'Digitalt rådslag!'
	// },
	// {
	// 	user: 'Douglas Bengtsson',
	// 	date: new Date('2019-02-18'),
	// 	text: input,
	// 	title: 'Digitalt rådslag!'
	// }
]

const AgoraHome = ({match, state}) => {

	const AgoraPosts = state.posts.map(post => (
		<Agora.Post post={post} />
	))

	return (
		<Row>
			<Col
				// {...sizes}
				lg={{ span: 12, offset: 4 }}
				md={{ span: 18, offset: 0 }}
				sm={{ span: 24 }}
				xs={{ span: 24 }}
				// pull={8}
				// push={1}
			>
					{AgoraPosts}
			</Col>
			<Col
				xs={0}
				sm={{span: 0}}
				md={{span: 6, push: 18}}
				lg={{span: 6, push: 0, pull: 2}}
				style={{padding: '20px 10px 0px 20px', position: 'fixed'}}
			>
				<Agora.SideCard />
			</Col>
		</Row>
	)
}

const mapStateToProps = state => {
	return {
		state: {
			...state.Agora
		}
	}
}

export default connect(mapStateToProps)(AgoraHome)
