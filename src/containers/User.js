import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, deleteUser } from 'actions/users'
import { set } from 'actions/users'
import UserPage from '@components/UserPage'
import Loading from '@components/Loading'
import { Row, Col } from '@components/grid'
import Posts from 'containers/posts'

function UserContainer( { username } ) {

  // Usernames are not case-sensitive. Therefore we can convert the requesting process to get by a lowercase username
  username = username.toLowerCase()

  // Dispatch an action to get the user
  // IMPORTANT: This does NOT mean that the request will be sent to the server everytime.
  // This is because the getUser action checks if the request has already been sent, or if the user is already in memory.
  const dispatch = useDispatch()
  dispatch(getUser({ username }))

  // Find the userId of the current userpage, given the username
  const userId = useSelector( state => state.Users.usernames[ username ]);
  // if the userId is "LOADING" or undefined, then there is no available information on that user!
  // hence, return a loading page for the user
  if(userId === "LOADING" || userId === undefined) {
    return <Loading />
  }
  // If the userId IS defined, then there is information on that user!
  else {
    // Find the user from the "users" object.
    // It looks something like this:
    /*
    users = {
      "507f191e810c19729de860ea": {
        _id: "507f191e810c19729de860ea",
        profile: {
          username: "Nautman",
          etc...
        }
      },
      "123d191e810c19729de860ea": {
        _id: "123d191e810c19729de860ea",
        profile: {
          username: "Charles",
          etc...
        }
      }
    }
    */
    const user = useSelector( state => state.Users.users[ userId ]);

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

    /*
      TO-DO: Make a special loading page for the user by using a <Skeleton> from antd.
    */
    return (
      <UserPage
        user={user}
        canEdit={canEdit}
        edit={edit}
        posts={<Posts list={agoragrams} />}
        deleteUserFromModal={deleteUserFromModal}
      />
    )
  }
}

export default UserContainer
