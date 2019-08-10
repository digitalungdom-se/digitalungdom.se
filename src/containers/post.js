import React from 'react'
// import { Post } from '@components'
import Post from '@components/post'
// import { Agora, Users } from 'actions'
import Agora, { antiAgorize, reportAgoragram, asteri, getAgoragram } from 'actions/agora'
import Users, { getUser } from 'actions/users'
import { connect } from 'react-redux'
// import { makeTitle, epochToRelativeTime } from 'utils'
import { makeTitle } from 'utils/agora'
import { epochToRelativeTime } from 'utils/time'
// import { Actions, Comments } from 'containers'
import Actions from 'containers/actions'

class PostContainer extends React.Component {

	componentWillMount() {
		if(this.props.loading === undefined) {
			this.props.getAgoragram(this.props.shortID)
			.then(res => {
				if(res) {
					if(res.response.type === "success") {
						// if(this.props.post) this.props.get_user({type: "objectid", userArray: [this.props.post.users]});
						if(this.props.post) this.props.getUser(this.props.post.users, "objectid")
					}
				}
			})
			.catch(err => {
				console.error(err)
			})
		}
	}

	render() {
		if(this.props.empty) return <Post empty={true}/>;

		let loading = this.props.loading || !this.props.post
		let post = this.props.post ? this.props.post : {
			_id: "0"
		}
		let time = epochToRelativeTime(post._id)
		
		return (
			<Post
				loading={loading}
				post={post}
				asteri={this.props.asteri}
				link={loading ? null : "/agora/h/" + post.hypagora + "/comments/" + post.shortID + '/' + makeTitle(post.title)}
				comments={this.props.comments}
			/>
		)
	}
}

// function PostContainer1({ empty, id }) {
	
// 	let shortID = id

// 	if(id && id.length !== 24) {
// 		shortID = id
// 		let possibleId = 
// 		if(state.Agora.fullIds[props.id]) id = state.Agora.fullIds[props.id]
// 	}
// 	let post = state.Agora.agoragrams[id]
// 	let stars
// 	if(post) stars = post.stars
// 	return {
// 		id,
// 		shortID,
// 		post,
// 		stars
// 	};

// }

/*
<Actions
	id={this.props.id}
	link={loading ? null : "/agora/h/" + post.hypagora + "/comments/" + post.shortID + '/' + makeTitle(post.title)}
/>
*/

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
	getAgoragram: id => dispatch(getAgoragram(id)),
	asteri: id => dispatch(asteri(id)),
	anti_agorize(id) {dispatch(antiAgorize(id))},
	report(id) {dispatch(reportAgoragram(id))},
	getUser: (userArray, type) => dispatch(getUser(userArray, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
