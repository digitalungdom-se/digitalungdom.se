import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Post } from 'containers'
import Post from 'containers/post'
// import { Users } from 'actions'
import Users from 'actions/users'
import { getAgoragrams } from 'actions/agora'

function Posts({ hypagora }) {

	const filter = useSelector(state => state.Agora.filter)
	const { time, sort, dateAfter, dateBefore } = filter
	const list = useSelector(state => state.Agora.lists[hypagora + "?t=" + time + "&s=" + sort])
	if(list === undefined) useDispatch()(getAgoragrams({ dateAfter, dateBefore, hypagora, sort, time }));
	// console.log(hypagora + "?t=" + time + "&s=" + sort)

	if(!list) return ([0,0,0,0,0,0,0,0,0,0]).map((a, index) => <Post key={"loading_post" + index} loading={true} />);
	else if(list.length) return list.map((id, index) => <Post loading={false} id={id} key={id} />);
	else return <Post empty={true} />
}

export default Posts
