import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, deleteUser } from 'actions/users'
import { set, setProfile } from 'actions/users'
import UserPage from '@components/UserPage'
import PageNotFound from '@components/pageNotFound'
import Loading from '@components/Loading'
import Posts from 'containers/posts'
const image = require('./image.json')

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

  // if the userId is "LOADING" or undefined, then there is no available information on that user!
  const loading = (userId === undefined || userId === "LOADING")

  // If the userId IS defined, then there is information on that user!

  const deleteUserFromModal = userID => dispatch(deleteUser({userID}))
  const dispatchImageData64 = base64 => {
    // console.log(base64)
    fetch(base64)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "profilePicture.png")
        upload(file)
      })
      
  }
  function upload(file) {
    const fd = new FormData();
    // console.log(file)
    // fd.append('updates', [["profilePicture"]])
    fd.append('profilePicture', file)

    dispatch( setProfile(fd))
  }

  const authenticatedUserID = useSelector( state => state.Auth.profile.details._id)

  let canEdit = false;
  let edit = function () {};

  if ( user && authenticatedUserID && user._id === authenticatedUserID ) {
    canEdit = true;

    edit = ( info, userID ) => {
      dispatch( set( info, userID ))
    }
  }

  //let report = report(id) {dispatch(reportUser(user._id))}

  let agoragrams = useSelector(state => state.Agora.lists[username])

  if(userId === false) {
    return <PageNotFound type="noUser"/>
  }

  if(loading || !user.profile ) {
    return <Loading spin card={false} />
  }

  /*
    TO-DO: Make a special loading page for the user by using a <Skeleton> from antd.
  */
  // return (
  //   <button onClick={() => dispatchImageData64(image.base64)}>
  //     Send her to the ranch
  //   </button>
  // )
  // return (
  //   <form
  //     // id='uploadForm' 
  //     // action='/api/user/set/profile_picture' 
  //     // method='post' 
  //     // encType="multipart/form-data"
  //     onSubmit={(e) => {
  //       e.preventDefault()
  //       upload(e.target.profilePicture.files[0])
  //     }}
  //   >
  //       <input type="file" name="profilePicture" />
  //       <input type='submit' value='Upload!' />
  //   </form>
  // )

  // return <button onClick={() => dispatchImageData64(image.base64)}>Submit</button>
  return (
    <UserPage
      user={user}
      canEdit={canEdit}
      edit={edit}
      posts={<Posts list={agoragrams} />}
      deleteUserFromModal={deleteUserFromModal}
      dispatchImageData64={dispatchImageData64}
    />
  )
}

export default UserContainer
