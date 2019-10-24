import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { Post } from 'containers'
import Empty from '@components/Empty'
import Post from 'containers/post'
// import { Users } from 'actions'
import { getAgoragrams } from 'actions/agora'
import InfiniteScroll from 'react-infinite-scroller'

function Posts({ hypagora, list }) {
	const dispatch = useDispatch()

	const filter = useSelector(state => state.Agora.filter)
	const { time, sort, dateAfter, dateBefore } = filter
	const edgeLink = hypagora + "?t=" + time + "&s=" + sort
	const edge = useSelector(state => state.Agora.edges[edgeLink])
	let agoragramList = useSelector(state => state.Agora.lists[edgeLink]);
	if(list) agoragramList = list;
	if(hypagora !== undefined) dispatch(getAgoragrams({ dateAfter, dateBefore, hypagora, sort, time }));

	if(!agoragramList) return ([0,0,0,0,0,0,0,0,0,0]).map((a, index) => <Post key={"loading_post" + index} loading={true} />);
	else if(agoragramList.length) {
		return (
			<InfiniteScroll
				pageStart={0}
				loadMore={() => {
					if(edge && !list) {
						if(sort === "top") {
							dispatch(getAgoragrams({ dateAfter, dateBefore, hypagora, sort, time, topIndex: edge }, true));
						}
						else dispatch(getAgoragrams({ dateAfter, dateBefore: edge, hypagora, sort, time }, true));
					}
				}}
				hasMore={edge}
				loader={
					<Post key="loading_post_new" loading/>
				}
			>
				{
					agoragramList.map((id, index) => <Post loading={false} id={id} key={id} />)
				}
			</InfiniteScroll>
		)
	}
	else return <Empty description="Inga inlägg hittades med detta filter!" />
}

export default Posts
