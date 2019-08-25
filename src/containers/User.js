import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from 'actions/users'
import { set } from 'actions/set'
import UserPage from '@components/UserPage'
import { Row, Col } from '@components/grid'

function UserContainer( { username } ) {
  const dispatch = useDispatch()

  const user = useSelector( state => state.Users.usernames[ username ] );
  if ( !user ) dispatch( getUser( { username } ) )


  const authenticatedUserID = useSelector( state => state.Auth.profile.details._id );

  let canEdit = false;
  let edit = function () {};

  if ( user && authenticatedUserID && user._id === authenticatedUserID ) {
    canEdit = true;
    const userID = user._id;

    edit = ( info, userID ) => dispatch( set( info, userID ) )
  }


  return (
    <UserPage loading={!user} user={user} canEdit={canEdit} edit={edit} />
  )
}

export default UserContainer
