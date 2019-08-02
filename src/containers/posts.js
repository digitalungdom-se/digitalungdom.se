import React from 'react'
import { connect } from 'react-redux'
// import { Post } from 'containers'
import Post from 'containers/post'
// import { Users } from 'actions'
import Users from 'actions/users'

const mapDispatchToProps = dispatch => ({
	get_user: id => dispatch(Users.get_user(id))
})

const mapStateToProps = (state, props) => {
	const list = state.Agora.posts.routes[props.url]
	let unknownUsers = []
	if(list) {
		list.forEach((id, index) => {
			let post = state.Agora.agoragrams[id]
			if(state.Users.users[post.author] === undefined) unknownUsers.push(post.author)
		})
	}
	return ({
		list,
		unknownUsers,
	})
}

class Posts extends React.Component {
	componentDidUpdate() {
		if(this.props.unknownUsers.length) {
			this.props.get_user({userArray: this.props.unknownUsers, type: "objectid"});
		}
	}
	render() {
		if(!this.props.list || this.props.unknownUsers.length) return ([0,0,0,0,0,0,0,0,0,0]).map((a, index) => <Post key={"loading_post" + index} loading={true} />);
		else if(this.props.list.length) return this.props.list.map((id, index) => <Post loading={false} id={id} key={id} />);
		else return <Post empty={true} />
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
