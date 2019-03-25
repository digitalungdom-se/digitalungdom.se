import React, { Component } from 'react'
import { Agora } from 'components'
import { connect } from 'react-redux'
import { Agora as actions } from 'actions'
import { Row, Col } from 'antd'

class PostPage extends Component {	

	componentWillMount() {
		this.props.get_agoragram({id: this.props.match.params.post})
		this.props.get_comments({id: this.props.match.params.post})
	}

	render() {
		const post = this.props.posts[this.props.match.params.post]
		const b = post ? {post} : null
		return (
			<Row
				type="flex"
				justify="center"
			>
				<Col
					lg={{ span: 12}}
					md={{ span: 18}}
					sm={{ span: 24 }}
					xs={{ span: 24 }}
				>
					<Agora.Post
						loading={b === null}
						{
							...b
						}
						comments
					/>
				</Col>
			</Row>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		...state.Agora
	}
}

const mapDispatchToProps = dispatch => {
	return {
		get_agoragram: post => dispatch(actions.get_agoragram(post)),
		get_comments: post => dispatch(actions.get_comments(post))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
