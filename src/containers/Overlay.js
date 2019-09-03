import React, { useState } from 'react'
import ReactModal from 'react-modal'
import Post from 'containers/post'
import { withRouter } from 'react-router-dom'
require('./overlay.css')

function Overlay({ id, history }) {
	ReactModal.setAppElement('#root')

  const [isOpen, openModal] = useState(true)

	return (
		<ReactModal
      isOpen={isOpen}
      contentLabel="onRequestClose Example"
      className="Modal"
      overlayClassName="Overlay"
      parentSelector={() => document.querySelector('#root')}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      shouldReturnFocusAfterClose={true}
      onRequestClose={() => history.goBack()}
    >
    	<Post id={id} showComments />
    </ReactModal>
	)
}

export default withRouter(Overlay)
