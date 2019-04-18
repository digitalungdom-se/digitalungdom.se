import React from 'react'
import { Link } from '@components'
import { Comments } from 'containers'
import { Agora as actions } from 'actions'
import { connect } from 'react-redux'
import Base58 from 'base-58'

class Post extends React.Component {

	componentWillMount() {
		if(!this.props.post && !this.props.loading) {
			let id = this.props.id
			if(id.length < 8) id = Base58.decode(id);
			console.log(id)
			this.props.get_agoragram({postId: id})
		}
	}
	render() {
		const post = this.props.post ? this.props.post : this.props.posts[this.props.id]
		if(!post) return <div>Post loading...</div>;
		return (
			<div>
				<div style={{outline: '1px solid black'}}>
					<h1>{post.title}</h1>
					<Link
						to={"/agora/r/minecraft/comments/" + Base58.encode(post._id.slice(0,7)) + "/title"}
					>
						Comments
					</Link>
				</div>
				{
					this.props.comments &&
					<Comments comments={post.comments} />
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	posts: state.Agora.posts
})

const mapDispatchToProps = dispatch => ({
	get_agoragram: id => dispatch(actions.get_agoragram(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
