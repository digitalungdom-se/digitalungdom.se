import React from 'react'
import { Post } from '@components'
import { Agora, Users } from 'actions'
import { connect } from 'react-redux'
import { hexToUint8, Uint8ToHex, makeTitle } from 'utils'

class PostContainer extends React.Component {

	componentWillMount() {
		if(this.props.comments) {
			const id = this.props.id
			// const id = this.props.id.length === 24 ? this.props.id : Uint8ToHex(Base58.decode(this.props.id))
			this.props.get_agoragram({shortId: id})
			.then(res => {
				if(res) {
					const id = res.response.post[0].author
					if(id !== undefined && this.props.users[id] === undefined) this.props.get_user({type: "objectid", userArray: [id]})
				}
			})
		}
		if(this.props.id) {
			if(this.props.id.length === 24) {
				const id = this.props.posts[this.props.id].author
				if(id === undefined) return
				if(this.props.users[id] === undefined) this.props.get_user({type: "objectid", userArray: [id]})
			}
		}
	}

	shouldComponentUpdate() {
		if(this.props.id === undefined) return false;
		if(this.props.id.length === 24) {
			const id = this.props.posts[this.props.id].author
			// console.log(this.props.users[id])
			if(this.props.users[id] === undefined) return false
		} else {
		}
		return true
	}

	render() {
		let id, link, loading = this.props.loading
		if(this.props.id) {
			if(this.props.id.length === 24) {
				id = this.props.id
			} else {
				let x = this.props.posts.fullIds[this.props.id]
				if(x) id = x;
				else loading = true
			}
		}
		const post = this.props.posts[id]
		if(!loading && post) {
			link = "/agora/h/" + post.hypagora + "/comments/" + post.shortId + '/' + makeTitle(post.title);
		}
		return (
			<Post
				loading={loading}
				post={post}
				comments={this.props.comments}
				actions={
					{
						asteri: this.props.asteri,
						anti_agorize: this.props.anti_agorize,
						agorize: this.props.agorize,
						report: this.props.report,
						link,
						id
					}
				}
				author={post ? (post.author ? (this.props.users[post.author] ? this.props.users[post.author] : false) : undefined) : undefined}
			/>
		)
	}
}

const mapStateToProps = state => ({
	posts: state.Agora.posts,
	users: state.Users.users
})

const mapDispatchToProps = dispatch => ({
	get_agoragram: id => dispatch(Agora.get_agoragram(id)),
	asteri: id => dispatch(Agora.asteri(id)),
	meta_agorize: info => dispatch(Agora.meta_agorize(info)),
	agorize: info => dispatch(Agora.agorize(info)),
	report: info => dispatch(Agora.report(info)),
	anti_agorize: id => dispatch(Agora.anti_agorize(id)),
	get_user: id => dispatch(Users.get_user(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
