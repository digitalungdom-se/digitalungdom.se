import React, { useState } from 'react'
import ProfilePicture from 'containers/ProfilePicture'

function ProfilePictureViewer({ userID }) {
  const [ visible, setVisibility ] = useState( false );

	return (
    visible?
    (
      <div
       style={{
         position: 'absolute',
         backgroundColor: 'white',
         borderRadius: 10
       }}
      >
       <ProfilePicture
         id={userID}
         size={600}
       />
      </div>
    )
    :
    null
	)
}

export default ProfilePictureViewer
