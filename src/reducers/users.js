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
      users = {}
      usernames = {}
      if ( action.payload.id ) users[ action.payload.id ] = "loading"
      else usernames[ action.payload.username ] = "loading"
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
    case "GET_USER_SUCCESS":
      let user = null, username = null
      users = {}
      usernames = {}
      let whoami = null, myUser = null, myUsername = null
      if(action.response.user) {
        if(action.isMe) whoami = { whoami: action.response.user._id }
        user = { [ action.response.user._id ]: action.response.user }
        username = { [action.response.user.details.username.toLowerCase()]: action.response.user._id }
      }
      else {
        action.response.users.forEach( (user, index) => {
          if(action.isMe && index === 0) whoami = {whoami: user._id}
          users[ user._id ] = user
          usernames[ user.details.username.toLowerCase() ] = user._id
        } )
      }
      return {
        ...state,
        users: {
            ...state.users,
            ...users,
            ...user
          },
          usernames: {
            ...state.usernames,
            ...usernames,
            ...username
          },
          ...whoami
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
