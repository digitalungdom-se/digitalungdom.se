import React from 'react'
import { Post } from '@components'
import { Agora as actions } from 'actions'
import { connect } from 'react-redux'
import { hexToUint8, Uint8ToHex, makeTitle } from 'utils'

class PostContainer extends React.Component {

	componentWillMount() {
		if(this.props.comments) {
			const id = this.props.id
			// const id = this.props.id.length === 24 ? this.props.id : Uint8ToHex(Base58.decode(this.props.id))
			this.props.get_agoragram({postId: id})
		}
		if(this.props.id) {
			if(this.props.id.length === 24) {
				const id = this.props.posts[this.props.id].author
				if(this.props.users[id] === undefined) this.props.get_user({userId: id})
			}
		}
	}

	shouldComponentUpdate() {
		if(this.props.id === undefined) return false;
		// console.log(this.props.id)
		// if(this.props.id.length === 24) {
		// 	const id = this.props.posts[this.props.id].author
		// 	if(this.props.users[id] === undefined) this.props.get_user({userId: id})
		// }
		return true
	}

	render() {
		let id, link, loading = this.props.loading
		if(this.props.id) {
			if(this.props.id.length === 24) {
				id = this.props.id
			} else {
				// let x = this.props.posts.fullIds[this.props.post]
				// if(x) id = x;
				// else loading = true
			}
		}
		const post = this.props.posts[id]
		if(!loading) link = "/agora/h/" + post.hypagora + "/comments/" + post.id + '/' + makeTitle(post.title);
		return (
			<Post
				loading={loading}
				post={post}
				comments={this.props.comments}
				link={link}
			/>
		)
	}
}

const mapStateToProps = state => ({
	posts: state.Agora.posts,
	users: state.Users.users
})

const mapDispatchToProps = dispatch => ({
	get_agoragram: id => dispatch(actions.get_agoragram(id)),
	get_user: id => dispatch(actions.get_user(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
