import React from 'react'
// import { Post } from '@components'
import Post from '@components/post'
// import { Agora, Users } from 'actions'
import Agora, { antiAgorize, reportAgoragram, asteri, getAgoragram, addPostToHiddenPosts } from 'actions/agora'
import { useDispatch, useSelector } from 'react-redux'
import { set } from 'actions/users'
import Users, { getUser } from 'actions/users'
import { connect } from 'react-redux'
// import { makeTitle, epochToRelativeTime } from 'utils'
import { makeTitle } from 'utils/agora'
import { epochToRelativeTime } from 'utils/time'
// import { Actions, Comments } from 'containers'
import Actions from 'containers/actions'
import { withRouter } from 'react-router-dom'

class PostContainer extends React.Component {

	componentWillMount() {
		if(this.props.loading === undefined) {
			this.props.getAgoragram(this.props.shortID)
			// .then(res => {
			// 	if(res) {
			// 		if(res.response.type === "success") {
			// 			// if(this.props.post) this.props.get_user({type: "objectid", userArray: [this.props.post.users]});
			// 			// if(this.props.post) this.props.getUser(this.props.post.users, "objectid")
			// 		}
			// 	}
			// })
			// .catch(err => {
			// 	console.error(err)
			// })
		}
	}

	render() {
		if(this.props.empty) return <Post empty={true}/>;

		let loading = this.props.loading || !this.props.post
		let post = this.props.post ? this.props.post : {
			_id: "0"
		}
		let time = epochToRelativeTime(post._id)

		if(this.props.hidden === true ) return null

		return (
			<Post
				loading={loading}
				post={post}
				asteri={this.props.asteri}
				report={this.props.report}
				antiAgorize={this.props.antiAgorize}
				hidePost={() => this.props.hidePost(post._id)}
				link={loading ? null : "/agora/h/" + post.hypagora + "/comments/" + post.shortID + '/' + makeTitle(post.title)}
				showComments={this.props.showComments}
				isAuthor={this.props.isAuthor}
				defaultBody={loading ? null : post.body}
				starred={this.props.starred}
        showProfilePicture={true}
				userId={this.props.id}
        redirect={(link) => this.props.history.push(link)}
			/>
		)
	}
}

const mapStateToProps = (state, props) => {
	let isAuthor
	let id = props.id
	let shortID = props.id
	let hidden = false

	if(props.id && props.id.length !== 24) {
		shortID = props.id
		if(state.Agora.fullIds[props.id]) id = state.Agora.fullIds[props.id]
	}

	if(state.Agora.hiddenPosts.indexOf(id) !== -1) hidden = true
	// state.Agora.hiddenPosts.forEach(hiddenPostId => {
	// 	if(hiddenPostId === id) hidden = true;
	// })

	let post = state.Agora.agoragrams[id]
	let starred = state.Agora.starredAgoragrams.indexOf(id) !== -1
	if(post) {
    if(state.Auth.authorized) isAuthor = post.author === state.Auth.profile.details._id;
    else isAuthor = false;
	}
	return {
		id,
		shortID,
		post,
		isAuthor,
		starred,
		hidden
	};
}

const mapDispatchToProps = dispatch => ({
	get_user: id => dispatch(Users.get_user(id)),
	getAgoragram: id => dispatch(getAgoragram(id)),
	asteri: id => dispatch(asteri(id)),
	antiAgorize(id) {dispatch(antiAgorize(id)); console.log(id)},
	report(id) {dispatch(reportAgoragram(id))},
	getUser: (userArray, type) => dispatch(getUser(userArray, type)),
	hidePost: id => dispatch(addPostToHiddenPosts(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostContainer))
