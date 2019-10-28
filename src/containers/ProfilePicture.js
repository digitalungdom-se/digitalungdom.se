import React from 'react'
import { Avatar } from 'antd'
// TO-DO: Lägg till dessa getProfilePictureByUsername, getProfilePictureByID
import { getProfilePicture } from 'actions/profilePicture'
import { useDispatch, useSelector } from 'react-redux'

function ProfilePicture({ size, username, id }) {
	if(username) username = username.toLowerCase()
  let src = "";
  useDispatch()(getProfilePicture({ [id ? "id" : "username"] : id ? id : username }, size))
  const userId = useSelector(state => state.Users.usernames[username])
  let profilePicture = useSelector(state => state.ProfilePictures[userId ? userId : id])

  if (profilePicture) {
    src = `data:${profilePicture.imageType.mime};base64, ${profilePicture.image}`;
  }

  return <Avatar icon="user" src={src} size={size}/>
}

export default ProfilePicture
