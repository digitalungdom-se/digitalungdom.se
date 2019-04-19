import React from 'react'
import { Link, Post } from '@components'
import { Comments } from 'containers'
import { Agora as actions } from 'actions'
import { connect } from 'react-redux'
import Base58 from 'base-58'
import { hexToUint8, Uint8ToHex } from 'utils'

class PostContainer extends React.Component {

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
		let id, link, loading = this.props.loading
		if(this.props.id) {
			if(this.props.id.length === 24) {
				id = this.props.id
			} else {
				let x = this.props.posts.fullIds[Uint8ToHex(Base58.decode(this.props.id))]
				if(x) id = x;
				else loading = true
			}
		}
		// const id = this.props.id.length === 24 ? this.props.id : Uint8ToHex(Base58.decode(this.props.id))
		// if(!this.props.post) {
		// console.log(this.props.id)
		const post = this.props.posts[id]
		if(!loading) link = Base58.encode(hexToUint8(post._id.slice(0,14)));
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
	posts: state.Agora.posts
})

const mapDispatchToProps = dispatch => ({
	get_agoragram: id => dispatch(actions.get_agoragram(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostContainer)
