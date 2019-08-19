import React from 'react'
import {Avatar} from 'antd'
import {getProfilePictureByUsername, getProfilePictureByID} from 'actions/profilePicture'
import { useDispatch, useSelector } from 'react-redux'


 function ProfilePicture({size, username, id}) {
    let src = "";
    let res;
    let profilePicture;

    if (username) {
      id = useSelector(state => state.ProfilePictures.usernames[username]);
      profilePicture = useSelector(state => state.ProfilePictures.profilePictures[id]);

      if(!profilePicture) {
        const dispatch = useDispatch();
        dispatch(getProfilePictureByUsername(username, size));
      }
    } else if (id) {
      profilePicture = useSelector(state => state.ProfilePictures.profilePictures[id]);

      if(!profilePicture) {
        const dispatch = useDispatch();
        dispatch(getProfilePictureByID(id, size));
      }
    }

    if (profilePicture) {
      src = `data:${profilePicture.imageType.mime};base64, ${profilePicture.image}`;
    }

    return <Avatar icon="user" src={src} size={size}/>
}

export default ProfilePicture
