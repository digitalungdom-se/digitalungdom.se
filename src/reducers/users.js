export default ( state = {
  users: {},
  usernames: {},
  whoami: undefined,
  agoraList: [],

}, action ) => {
  let users, usernames
  switch ( action.type ) {
    case "SET_REQUEST":
      let me = state.users[state.whoami].profile
      action.payload.updates.forEach(update => {
        me = Object.assign({}, me, update[1])
      // //   let split = update[0].split('.')
      // //   function recursive(tree, list, index, value) {
      // //     if(index === list.length - 1) {
      // //       tree[list[index]] = value
      // //     } else recursive(tree, list, index + 1, value)
      // //   }
      })
      // console.log(state.whoami)
      // console.log(me)
      // console.log(state.whoami, me)
      return {
        ...state,
        users: {
          ...state.users,
          [state.whoami]: {
            ...state.users[state.whoami],
            profile: me
          }
        }
      }
      // return {
      //   ...state,
      //   users: {
      //     [state.whoami]: {

      //     }
      //   }
      //
    case "GET_USER_REQUEST":

      // if the payload was sent with an id, it was requesting the user with that id
      if(action.payload.id !== undefined) {
        return {
          // spread out state
          ...state,
          users: {
            // spread out state.users, which is done to keep all the users that are currently in this object.
            ...state.users,
            // IMPORTANT: Make the user with the requested id to have a state of "LOADING"
            [ action.payload.id ] : "LOADING"
          },
          agoraList: state.agoraList.concat(action.payload.username)
        }
      }
      // if the payload was NOT sent with an id, it was requesting the user with that USERNAME
      else {
        return {
          ...state,
          usernames: {
            ...state.usernames,
            // IMPORTANT: Make the user with the requested username, have a state of "LOADING"
            [ action.payload.username ] : "LOADING"
          },
          // TO-DO: Explain what agoraList does, and perhaps give it a better name
          agoraList: state.agoraList.concat(action.payload.username)
        }
      }
    case "GET_USER_SUCCESS":
      // the user is action.response.user
      const user = action.response.user

      return {
        // spread out state
        ...state,
        users: {
          // spread out users
          ...state.users,
          // TO-DO: Explain this notation.
          [ user._id ]: user
        },
        usernames: {
          // spread out usernames
          ...state.usernames,
          // IMPORTANT: Map the username to the id. For example, it should look like this:
          /*
          usernames: { 
            "Nautman": "507f191e810c19729de860ea",
            etc...
          }
          */
          // This is used in userPage, where we don't know the user id if we only know the username.
          [ user.details.username ]: user._id
        },
        // if the requested user is me (shown by action.isMe), then set it to the user._id, otherwise, keep it as it was
        whoami: action.isMe ? user._id : state.whoami
      }
    case "GET_SEVERAL_USERS_SUCCESS":
      // Create users and usernames objects. It will spread in the state, later on.
      users = {}
      usernames = {}
      action.response.users.forEach(user => {
        users[user._id] = user
        // make the username lowercase, as it is not case-sensitive.
        usernames[user.details.username.toLowerCase()] = user._id
      })
      return {
        ...state,
        users: {
          ...state.users,
          ...users
        },
        usernames: {
          ...state.usernames,
          ...usernames
        }
      }
    
    case "GET_USER_FAILURE":
      users = {}
      usernames = {}
      if ( action.payload.id ) users[ action.payload.id ] = false
      else usernames[ action.payload.username ] = false
      return {
        ...state,
        users: {
          ...state.users,
          ...users
        },
        usernames: {
          ...state.usernames,
          ...usernames
        },
        agoraList: state.agoraList.concat(action.payload.username)
      }
      // users = {}
      // if(action.url === "/api/auth") {
      // 	let id = action.response.info._id
      // 	let user = {details: action.response.info}
      // 	users = {
      // 		[id]: user
      // 	}
      // } else {
      // 	if(action.response.errors) {
      // 		if(action.response.errors[0] && action.response.errors[0].reason === "no such users") {
      // 			action.response.errors[0].return.userArray.forEach(id => users[id] = {details: null})
      // 		}
      // 	}
      // 	else {
      // 		let forgottenUsers = action.userArray
      // 		action.response.users.forEach(user => {
      // 			users[user._id] = user
      // 			let index = forgottenUsers.indexOf(user._id)
      // 			forgottenUsers.splice(index, 1)
      // 		})
      // 		forgottenUsers.forEach(id => users[id] = {details: null})
      // 	}
      // }
      // return {
      // 	...state,
      // 	users: {
      // 		...state.users,
      // 		...users
      // 	}
      // }
      // return state
      case "RESPONSE_GET_USER":
        users = {}
        if ( action._url === "/api/auth" ) {
          let id = action.response.info._id
          let user = { details: action.response.info }
          users = {
            [ id ]: user
          }
        } else {
          if ( action.response.errors ) {
            if ( action.response.errors[ 0 ] && action.response.errors[ 0 ].reason === "no such users" ) {
              action.response.errors[ 0 ].return.userArray.forEach( id => users[ id ] = { username: "deleted" } )
            }
          } else {
            console.log( action )
            action.response.users.forEach( user => users[ user._id ] = user )
          }
        }
        return {
          ...state,
          users: {
            ...state.users,
            ...users
          }
        }
        case "DELETEUSER_SUCCESS":
          console.log("Deleted account")
        default:
          return state
  }
}
