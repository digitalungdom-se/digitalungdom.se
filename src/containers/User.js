import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'actions/users'
import UserPage from '@components/UserPage'
import { Row, Col } from '@components/grid'

function UserContainer( { username } ) {

  const user = useSelector( state => state.Users.usernames[ username ] );
  if ( !user ) {
    const dispatch = useDispatch()
    dispatch( getUser( { username } ) )
  }

  const authenticatedUserID = useSelector( state => state.Auth.profile.details._id );

  let canEdit = false;
  if ( user && authenticatedUserID && user._id === authenticatedUserID ) canEdit = true;

  return (
    <UserPage loading={!user} user={user} canEdit={canEdit} />
  )
}

export default UserContainer
