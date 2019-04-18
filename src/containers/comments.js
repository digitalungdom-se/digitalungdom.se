import React from 'react'
import { connect } from 'react-redux'
import { Agora as actions } from 'actions'

const mapStateToProps = state => ({
	comments: state.Agora.comments
})

const mapDispatchToProps = dispatch => ({
	get_agoragram: gram => dispatch(actions.get_agoragram(gram))
})

export default connect(null, mapDispatchToProps)(({ comments }) => (
	<div>
		<div>Comments</div>
		{JSON.stringify(comments)}
	</div>
))
