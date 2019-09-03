import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'actions/users'
import { set } from 'actions/set'
import UserPage from '@components/UserPage'
import { Row, Col } from '@components/grid'
import Posts from 'containers/posts'

function UserContainer( { username } ) {
  const dispatch = useDispatch()

  const user = useSelector( state => state.Users.usernames[ username ] );
  dispatch(getUser({ username }))
  // if ( !user ) dispatch( getUser( { username } ) );


  const authenticatedUserID = useSelector( state => state.Auth.profile.details._id)

  let canEdit = false;
  let edit = function () {};

  if ( user && authenticatedUserID && user._id === authenticatedUserID ) {
    canEdit = true;
    const userID = user._id;

    edit = ( info, userID ) => dispatch( set( info, userID ) )
  }

  let agoragrams = useSelector(state => state.Agora.lists[username])

  return (
    <UserPage
      loading={user === undefined || user.profile === undefined}
      user={user}
      canEdit={canEdit}
      edit={edit}
      posts={<Posts list={agoragrams} />}
    />
  )
}

export default UserContainer
