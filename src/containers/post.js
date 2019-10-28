import React from 'react'
// import { Post } from '@components'
import Post from '@components/post'
// import { Agora, Users } from 'actions'
import { antiAgorize, reportAgoragram, asteri, getAgoragram, addPostToHiddenPosts } from 'actions/agora'
import { useDispatch, useSelector } from 'react-redux'
// import { makeTitle, epochToRelativeTime } from 'utils'
import { makeTitle } from 'utils/agora'
// import { Actions, Comments } from 'containers'
import { withRouter } from 'react-router-dom'

function PostContainer({
	showComments,
	loading,
	history,
	id = false,
	empty
}) {

	const dispatch = useDispatch()

	let fullId = fullId = useSelector(state => {
		return state.Agora.fullIds[id]
	})

	if(showComments) dispatch(getAgoragram(id));
	if(!(id && id.length !== 24)) fullId = id
	// if(id && id.length !== 24) {
	// 	fullId = useSelector(state => {
	// 		return state.Agora.fullIds[id]
	// 	})
	// } else {
	// 	fullId = id
	// }
	let isThereAPost = useSelector(state => state.Agora.agoragrams[fullId])
	if(!isThereAPost) loading = true;
	let post = isThereAPost ? isThereAPost : {
		_id: "0"
	}

	const hidden = useSelector(state => state.Agora.hiddenPosts.indexOf(fullId) !== -1)

	const star = () => dispatch(asteri(fullId))
	const report = (reason) => dispatch(reportAgoragram(fullId, reason))
	const hidePost = () => dispatch(addPostToHiddenPosts(fullId))

	const dispatchAntiAgorize = () => dispatch(antiAgorize(fullId))

	const starred = useSelector(state => state.Agora.starredAgoragrams.indexOf(fullId) !== -1)

	const authorized = useSelector(state => state.Auth.authorized)
	const currentUserId = useSelector(state => state.Auth.profile.details._id)

	let isAuthor = false
	if(post) {
		if(authorized) isAuthor = post.author === currentUserId;
		else isAuthor = false;
	}

	if(hidden) return null

	if(empty) return <Post empty />;

	const link = loading ? null : "/agora/h/" + post.hypagora + "/comments/" + post.shortID + "/" + makeTitle(post.title)

	return (
		<Post
			loading={loading}
			post={post}

			asteri={star}
			report={report}
			antiAgorize={dispatchAntiAgorize}

			hidePost={() => hidePost(post._id)}

			link={link}
			showComments={showComments}

			isAuthor={isAuthor}

			defaultBody={loading ? null : post.body}
			starred={starred}
      showProfilePicture={true}
			userId={fullId}
      redirect={() => history.push(link)}

      authorized={authorized}
		/>
	)
}

export default withRouter(PostContainer)
