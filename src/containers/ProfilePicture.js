import React from 'react'
import Avatar from '@components/Avatar'
import { getProfilePictureByUsername, getProfilePictureByID, getProfilePicture } from 'actions/profilePicture'
import { useDispatch, useSelector } from 'react-redux'

function ProfilePicture({ size, username, id }) {
  let src = "";
  let res;
  let profilePicture = useSelector(state => state.ProfilePictures[username ? username : id])
  if(username || id) useDispatch()(getProfilePicture({ [id ? "id" : "username"] : id ? id : username }, size));

  if (profilePicture) {
    src = `data:${profilePicture.imageType.mime};base64, ${profilePicture.image}`;
  }

  return <Avatar icon="user" src={src} size={size}/>
}

export default ProfilePicture
