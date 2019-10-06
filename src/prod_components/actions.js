import React, { useState } from 'react'
// import { Link } from '@components'
import { Button, Divider, Icon } from 'antd'
import Link from '@components/link'
import Reply from 'containers/Reply'
import Modal from '@components/Modal'
import Agorize from 'containers/agorize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faComment, faTrashAlt, faFlag } from '@fortawesome/free-solid-svg-icons'

const ModalButton = ({ report }) => {

  const [modalVisible, showModal] = useState(false)

  const onCancel = () => {
    showModal(false);
  }
  const onConfirm = () => showModal(false);

  return (
    <span>
      <span onClick={() => showModal(true)}>
        <FontAwesomeIcon style={{marginRight: 4}} icon={faFlag} color="lightgrey" />
      </span>
      <Modal
        visible={modalVisible}
        title="Anmäl"
        description="Skriv en anledning"
        confirmText="Anmäl"
        cancelText="Avbryt"
        handleConfirm={(reason) => report(reason)}
        onConfirm={() => onConfirm()}
        onCancel={() => onCancel()}
        showInput
      />
    </span>
  )
}

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
			    	<FontAwesomeIcon color="lightgrey" icon={faTrashAlt} />
			    </span>
				</React.Fragment>
			}
			<Divider type="vertical"/>
			<ModalButton
				report={report}
			/>
			{
				(isReplying && !replied)&&
				<Agorize
					id={id}
					agoragramType="comment"
					onCancel={() => reply(false)}
				/>
			}
	</div>
	)
}

export default Actions
