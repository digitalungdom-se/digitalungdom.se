import React from 'react'
import { connect } from 'react-redux'
// import { Post } from 'containers'
import Post from 'containers/post'
// import { Users } from 'actions'
import Users from 'actions/users'

function Posts({ list }) {
	if(!list) return ([0,0,0,0,0,0,0,0,0,0]).map((a, index) => <Post key={"loading_post" + index} loading={true} />);
	else if(list.length) return list.map((id, index) => <Post loading={false} id={id} key={id} />);
	else return <Post empty={true} />
}

export default Posts
