import React, { useState } from 'react'
// import { Link } from '@components'
import { Button, Divider, Icon } from 'antd'
import Link from '@components/link'
import Reply from 'containers/Reply'
import { agorizeComment } from 'containers/agorize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faComment, faTrashAlt, faFlag } from '@fortawesome/free-solid-svg-icons'

function Actions({ dispatch, remove, report, id, link, isAuthor, like, replied, likes, liked, replies }) {

	const [isReplying, reply] = useState(false)
	const [isStarClicked, clickStar] = useState(liked)

	return (
		<div style={{padding: "8px 0"}}>
			<span
      	onClick={() => {
      		clickStar(!isStarClicked)
      		like(id)
      	}}
      	style={{cursor: "pointer"}}
      >
      	<FontAwesomeIcon color={isStarClicked ? "gold" : "lightgrey"} icon={faStar} /> {likes}
      </span>
			<Divider type="vertical"/>
			<span
				onClick={() => reply(!isReplying)}
	    	style={{cursor: "pointer"}}
	    >
	    	<FontAwesomeIcon color="lightgrey" icon={faComment} /> {replies}
	    </span>
			{
				isAuthor &&
				<React.Fragment>
					<Divider type="vertical"/>
					<span
						onClick={e => remove(id)}
			    	style={{cursor: "pointer"}}
			    >
			    	<FontAwesomeIcon color="lightgrey" icon={faTrashAlt} /> Ta bort
			    </span>
				</React.Fragment>
			}
			<Divider type="vertical"/>
			<span
				onClick={e => {
					const reason = prompt('Varför bör denna kommentar granskas?')
					if(reason) report(id, reason)
				}}
	    	style={{cursor: "pointer"}}
	    >
	    	<FontAwesomeIcon color="lightgrey" icon={faFlag} /> Anmäl
	    </span>
			{
				(isReplying && !replied)&&
				<agorizeComment
					id={id}
					agoragramType="comment"
					onCancel={() => reply(false)}
				/>
			}
	</div>
	)
}

export default Actions
