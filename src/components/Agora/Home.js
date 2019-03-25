import React, { Component } from 'react'
import { Row, Col, Affix, Card, Button } from 'antd'
import { Link, Switch, Route } from 'react-router-dom'
import { Agora } from 'components'

const AgoraHome = ({match}) => {

	// const AgoraPosts = posts.map(post => (
	// 	<Agora.Post post={post} />
	// ))

	// return (
	// 	<div>
	// 	</div>
	// )

	if(Object.keys(match.params).length === 0) {
	}

	return (
		<Row>
			<Col
				lg={{ span: 12, offset: 4 }}
				md={{ span: 18, offset: 0 }}
				sm={{ span: 24 }}
				xs={{ span: 24 }}
			>
				<Switch>
					<Route exact path="/agora/r/:subreddit" component={Agora.Subreddit} />
				</Switch>
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


export default AgoraHome
