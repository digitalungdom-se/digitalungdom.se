import React from 'react'
import { Link } from '@components'
import { Comments } from 'containers'
import { Agora as actions } from 'actions'
import { connect } from 'react-redux'
import Base58 from 'base-58'
import { hexToUint8, Uint8ToHex } from 'utils'

class Post extends React.Component {

	componentWillMount() {
		// if(!this.props.post && !this.props.loading) {
			if(this.props.comments) {
				const id = this.props.id.length === 24 ? this.props.id : Uint8ToHex(Base58.decode(this.props.id))
				this.props.get_agoragram({postId: id})
			}
		// const id = this.props.id.length === 24 ? this.props.id : Uint8ToHex(Base58.decode(this.props.id))
			// let id = Uint8ToHex(Base58.decode(this.props.id))
			// if(id.length < 8) id = Base58.decode(id);
			// .then(res => console.log(res))
		// }
		// console.log(this.props.post._id)
		// if(!this.props.post && !this.props.loading) {
		// 	this.props.get_agoragram({postId: this.props.id})
		// }
	}

	render() {
		let id
		let loading = this.props.loading
		if(this.props.id) {
			if(this.props.id.length === 24) {
				id = this.props.id
			} else {
				let x = this.props.posts.fullIds[Uint8ToHex(Base58.decode(this.props.id))]
				if(x) id = x;
				else loading = true
			}
		}
		if(loading) return <div>Post loading...</div>;
		// const id = this.props.id.length === 24 ? this.props.id : Uint8ToHex(Base58.decode(this.props.id))
		// if(!this.props.post) {
		// console.log(this.props.id)
		const post = this.props.posts[id]
		
			// if(!id) return <div>Post loading...</div>;
		// post = this.props.posts[id]
		// } else post = this.props.post
		const link = Base58.encode(hexToUint8(post._id.slice(0,14)))
		// console.log(this.props.posts.fullIds, Uint8ToHex(Base58.decode(this.props.id)))
		// const id = this.props.post ? null : this.props.posts.fullIds[Uint8ToHex(Base58.decode(this.props.id))]
		// const post = this.props.post ? this.props.post : this.props.posts[id]

		// console.log(post._id.slice(0,14), Base58.encode(post._id.slice(0,14)), Base58.decode(Base58.encode(post._id.slice(0,14))))
		return (
			<div>
				<div style={{outline: '1px solid black'}}>
					<h1>{post.title}</h1>
					<Link
						to={"/agora/r/minecraft/comments/" + link + "/title"}
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
