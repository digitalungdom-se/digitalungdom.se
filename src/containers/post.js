import React from 'react'
// import { Post } from '@components'
import Post from '@components/post'
// import { Agora, Users } from 'actions'
import Agora from 'actions/agora'
import Users from 'actions/users'
import { connect } from 'react-redux'
// import { makeTitle, epochToRelativeTime } from 'utils'
import { makeTitle } from 'utils/agora'
import { epochToRelativeTime } from 'utils/time'
// import { Actions, Comments } from 'containers'
import Comments from 'containers/comments'
import Actions from 'containers/actions'

class PostContainer extends React.Component {

	componentWillMount() {
		if(this.props.loading === undefined) {
			this.props.get_agoragram({agoragramShortID: this.props.shortID})
			.then(res => {
				if(res.response.type === "success") {
					this.props.get_user({type: "objectid", userArray: [this.props.post.users]})
				}
			})
		}
	}

	render() {
		let loading = this.props.loading || !this.props.post
		let post = this.props.post ? this.props.post : {
			_id: "0"
		}
		let time = epochToRelativeTime(post._id)
		
		return (
			<Post
				loading={loading}
				post={post}
			>
				<Actions
					id={this.props.id}
					link={loading ? null : "/agora/h/" + post.hypagora + "/comments/" + post.shortID + '/' + makeTitle(post.title)}
				/>
				{
					!loading && this.props.comments &&
					<Comments children={post.children} />
				}
			</Post>
		)
	}
}

const mapStateToProps = (state, props) => {
	let id = props.id
	let shortID = props.id
	if(props.id && props.id.length !== 24) {
		shortID = props.id
		if(state.Agora.fullIds[props.id]) id = state.Agora.fullIds[props.id]
	}
	let post = state.Agora.agoragrams[id]
	let stars
	if(post) stars = post.stars
	return {
		id,
		shortID,
		post,
		stars
	};
}

const mapDispatchToProps = dispatch => ({
	get_user: id => dispatch(Users.get_user(id)),
	get_agoragram: id => dispatch(Agora.get_agoragram(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
