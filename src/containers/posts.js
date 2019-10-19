import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Post } from 'containers'
import Empty from '@components/Empty'
import Post from 'containers/post'
// import { Users } from 'actions'
import Users from 'actions/users'
import { getAgoragrams } from 'actions/agora'
import InfiniteScroll from 'react-infinite-scroller'

function Posts({ hypagora, list }) {
	const filter = useSelector(state => state.Agora.filter)
	const { time, sort, dateAfter, dateBefore } = filter
	const edgeLink = hypagora + "?t=" + time + "&s=" + sort
	const edge = useSelector(state => state.Agora.edges[edgeLink])

	const dispatch = useDispatch()

	if(!list) {
		// const filter = useSelector(state => state.Agora.filter)
		// const { time, sort, dateAfter, dateBefore } = filter
		list = useSelector(state => state.Agora.lists[hypagora + "?t=" + time + "&s=" + sort])
		if(list === undefined && hypagora !== undefined) useDispatch()(getAgoragrams({ dateAfter, dateBefore, hypagora, sort, time }));
	}

	if(!list) return ([0,0,0,0,0,0,0,0,0,0]).map((a, index) => <Post key={"loading_post" + index} loading={true} />);
	else if(list.length) {
		return (
			<InfiniteScroll
				pageStart={0}
				loadMore={() => {
					if(edge) dispatch(getAgoragrams({ dateAfter, dateBefore: edge, hypagora, sort, time, edgeLink }))
				}}
				hasMore={edge}
				loader={
					<Post key="loading_post_new" loading/>
				}
			>
				{
					list.map((id, index) => <Post loading={false} id={id} key={id} />)
				}
			</InfiniteScroll>
		)
	}
	else return <Empty description="Inga inlägg hittades med detta filter!" />
}

export default Posts
