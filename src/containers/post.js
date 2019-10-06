import React from 'react'
// import { Post } from '@components'
import Post from '@components/post'
// import { Agora, Users } from 'actions'
import Agora, { antiAgorize, reportAgoragram, asteri, getAgoragram, addPostToHiddenPosts } from 'actions/agora'
import { useDispatch, useSelector } from 'react-redux'
import { set } from 'actions/users'
import Users, { getUser } from 'actions/users'
import { connect } from 'react-redux'
// import { makeTitle, epochToRelativeTime } from 'utils'
import { makeTitle } from 'utils/agora'
import { epochToRelativeTime } from 'utils/time'
// import { Actions, Comments } from 'containers'
import Actions from 'containers/actions'
import { withRouter } from 'react-router-dom'

function PostContainer({
	showComments,
	loading,
	isAuthor,
	history,
	id = false,
	empty
}) {

	const dispatch = useDispatch()

	let fullId

	if(showComments) dispatch(getAgoragram(id));
	if(id && id.length !== 24) {
		fullId = useSelector(state => {
			return state.Agora.fullIds[id]
		})
	} else {
		fullId = id
	}
	let isThereAPost = useSelector(state => state.Agora.agoragrams[fullId])
	if(!isThereAPost) loading = true;
	let post = isThereAPost ? isThereAPost : {
		_id: "0"
	}

	const hidden = useSelector(state => state.Agora.hiddenPosts.indexOf(fullId) !== -1)
	if(hidden) return null

	const star = () => dispatch(asteri(fullId))
	const report = (reason) => dispatch(reportAgoragram(fullId, reason))
	const hidePost = () => {dispatch(addPostToHiddenPosts(fullId)); console.log("m")}

	const dispatchAntiAgorize = () => dispatch(antiAgorize(fullId))

	const starred = useSelector(state => state.Agora.starredAgoragrams.indexOf(fullId) !== -1)

	const authorized = useSelector(state => state.Auth.authorized)

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
