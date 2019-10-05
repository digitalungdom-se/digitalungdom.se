import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, deleteUser } from 'actions/users'
import { set } from 'actions/users'
import UserPage from '@components/UserPage'
import { Row, Col } from '@components/grid'
import Posts from 'containers/posts'

function UserContainer( { username } ) {

  username = username.toLowerCase()

  const dispatch = useDispatch()

  const userId = useSelector( state => state.Users.usernames[ username ]);
  const user = useSelector( state => state.Users.users[ userId ]);

  dispatch(getUser({ username }))
  // if ( !user ) dispatch( getUser( { username } ) );

  const deleteUserFromModal = userID => dispatch(deleteUser({userID}))

  const authenticatedUserID = useSelector( state => state.Auth.profile.details._id)

  let canEdit = false;
  let edit = function () {};

  if ( user && authenticatedUserID && user._id === authenticatedUserID ) {
    canEdit = true;
    const userID = user._id;

    edit = ( info, userID ) => dispatch( set( info, userID ) )
  }

  //let report = report(id) {dispatch(reportUser(user._id))}

  let agoragrams = useSelector(state => state.Agora.lists[username])

  return (
    <UserPage
      loading={user === undefined || user.profile === undefined}
      user={user}
      canEdit={canEdit}
      edit={edit}
      posts={<Posts list={agoragrams} />}
      deleteUserFromModal={deleteUserFromModal}
    />
  )
}

export default UserContainer
