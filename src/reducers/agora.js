import { flatTree } from 'utils'
import { makeTitle } from 'utils/agora'


/* TO-DO: implement
const generateRandom = ( length ) => {
  let string = ""
  const chars = "0123456789abcdef"
  for ( var i = 0; i < length; i++ ) {
    string += chars[ Math.floor( Math.random() * chars.length ) ]
  }
  return string
}
*/

export default ( state = {
  viewingComments: false,
  comments: {},
  fullIds: {},
  users: [],
  agoragrams: {},
  posts: {
    total: 0,
    routes: {},
    fetchedSeveral: false,
  },
  hypagora_infos: {
    "general": {
      background: "transparent"
    }
  },
  starredAgoragrams: [],
  availableHypagoras: [ "general" ],
  agorizing: [],
  agorized: [],
  filter: {
    sort: "new",
    time: "ever",
    dateAfter: "0",
    dateBefore: ( Math.floor( ( Date.now() / 1000 ) ) ).toString( 16 )
  },
  lists: {},
  hiddenPosts: [],
  edges: {}
}, action ) => {
  switch ( action.type ) {
  case 'UPDATE_AGORA_FILTER':
    const { type, ...filter } = action
    return {
      ...state,
      filter: {
        ...state.filter,
        ...filter
      }
    }
  case 'REDIRECT_TO_POST':
    return {
      ...state,
      agorized: []
    }
  case 'ANTI_AGORIZE_SUCCESS':
    return {
      ...state,
      agoragrams: {
        ...state.agoragrams,
        [ action.payload.agoragramID ]: {
          ...state.agoragrams[ action.payload.agoragramID ],
          deleted: true,
          author: null
        }
      }
    }
  case 'GET_AGORAGRAM_REQUEST':
    return {
      ...state,
      agoragrams: {
        ...state.agoragrams,
        [action.payload.agoragramShortID]: false
      }
    }
  case 'GET_AGORAGRAMS_REQUEST':
    const listQuery = (
      action.payload.hypagora !== "" ?
        action.payload.hypagora + "?t=" + action.payload.time + "&s=" + action.payload.sort
        :
        action.response.user.details.username.toLowerCase()
    )
    return {
      ...state,
      ...action._requestTime,
      posts: {
        ...state.posts,
        [ action.query ]: false,
        fetchedSeveral: true
      },
      fetchingAgoragrams: true,
      query: action.query,
      lists: {
        ...state.lists,
        [ listQuery ]: state.lists[listQuery] ? state.lists[listQuery] : false
      }
    }
  case 'GET_AGORAGRAMS_SUCCESS':
  if ( action.response.type === "success" ) {
    const agoragrams = {}
    const users = []
    const fullIds = {}
    // let edge = false
    const list = action.response.agoragrams.map( agoragram => {
      agoragrams[ agoragram._id ] = {
        ...agoragram,
        users: [ agoragram.author ]
      }
      // let time = parseInt(agoragram._id.substring(0,8), 16)
      // if(!edge || time < edge) edge = time;
      users.push( agoragram.author )
      fullIds[agoragram.shortID] = agoragram._id
      return agoragram._id
    } )
    // if(edge) edge = edge.toString(16);
    const listQuery = (
      action.payload.hypagora !== "" ?
        action.payload.hypagora + "?t=" + action.payload.time + "&s=" + action.payload.sort
        :
        action.response.user.details.username.toLowerCase()
    )
    const newList = state.lists[listQuery] ? state.lists[listQuery] : []
    const length = action.response.agoragrams.length
    const edge = action.response.agoragrams.length === 0 ? false : (
      action.payload.sort === "top" ?
        (state.edges[listQuery] ? state.edges[listQuery] + length : length)
        :
        action.response.agoragrams[length - 1]._id.substring(0,8)
    )
    console.log(edge)
    return {
      ...state,
      ...action._responseTime,
      users: [ ...state.users, ...users ],
      fetchingAgoragrams: false,
      agoragrams: {
        ...state.agoragrams,
        ...agoragrams
      },
      fullIds: {
        ...state.fullIds,
        ...fullIds
      },
      posts: {
        ...state.posts,
        fetchedSeveral: true,
        total: state.posts.total + list.length,
        routes: {
          ...state.posts.routes,
          [ action.query ]: list,
        }
      },
      starredAgoragrams: state.starredAgoragrams.concat( action.response.starredAgoragrams ),
      lists: {
        ...state.lists,
        [ listQuery ]: [...newList, ...list]
      },
      edges: {
        ...state.edges,
        [listQuery]: edge
      }
      // starredAgoragrams: [
      // 	...state.starredAgoragrams,
      // 	...action.response.starredAgoragrams
      // ]
    }
  } else return state
  case 'GET_AGORAGRAM_SUCCESS':
    const { tree } = flatTree( action.response.agoragrams )
    return {
      ...state,
      fullIds: {
          ...state.fullIds,
          [ action.response.agoragrams[ 0 ].shortID ]: action.response.agoragrams[ 0 ]._id
        },
        agoragrams: {
          ...state.agoragrams,
          ...tree,
          [ action.response.agoragrams[ 0 ]._id ]: {
            ...action.response.agoragrams[ 0 ]
          }
        },
        starredAgoragrams: state.starredAgoragrams.concat( action.response.starredAgoragrams )
    }
case 'ASTERI_REQUEST':
  const alreadyStarred = state.starredAgoragrams.indexOf( action.payload.agoragramID )
  const agoragram = state.agoragrams[ action.payload.agoragramID ]
  if ( alreadyStarred !== -1 ) {
    state.starredAgoragrams.splice( alreadyStarred, 1 )
    return {
      ...state,
      agoragrams: {
        ...state.agoragrams,
        [ action.payload.agoragramID ]: {
          ...agoragram,
          stars: agoragram.stars - 1
        }
      }
    }
  } else return {
    ...state,
    starredAgoragrams: [ ...state.starredAgoragrams, action.payload.agoragramID ],
    agoragrams: {
      ...state.agoragrams,
      [ action.payload.agoragramID ]: {
        ...agoragram,
        stars: agoragram.stars + 1
      }
    }
  }
case 'AGORIZE_REQUEST':
  if ( action.payload.type === "comment" ) return {
    ...state,
    agorizing: state.agorizing.concat( action.payload.replyTo ),
  }
  return state
case 'AGORIZE_SUCCESS':
  let agoragrams = {}
  let _id = action.response.agoragram._id
  if ( action.payload.type === "comment" ) {
    agoragrams = {
      [ _id ]: {
        stars: 0,
        author: action.payload.me,
        body: action.payload.body,
        children: [],
        replyTo: action.payload.replyTo,
        _id
      },
      [ action.payload.replyTo ]: {
        ...state.agoragrams[ action.payload.replyTo ],
        children: state.agoragrams[ action.payload.replyTo ].children.concat( {_id, stars: 0} )
      }
    }
  }
  const agorizing = state.agorizing
  const index = agorizing.indexOf(action.payload.replyTo)
  if(index > -1) agorizing.splice(index, 1)
  return {
    ...state,
    agorized: state.agorized.concat( action.payload.replyTo ),
    agorizing,
    redirect: action.payload.type === "comment" ? action.response.agoragram : "/agora/h/general/comments/" + action.response.agoragram.shortID + "/" + makeTitle(action.payload.title),
    agoragrams: {
      ...state.agoragrams,
      ...agoragrams
    },
    fullIds: {
      ...state.fullIds,
      [action.response.agoragram.shortID]: action.response.agoragram._id
    }
  }
  case 'AGORIZE_FAILURE':
    return state
  case 'RESPONSE_GET_AGORAGRAM':
    if ( action.response.type === "success" ) {

      const { tree, users } = flatTree( action.response.agoragram )

      // const comments = buildTree(action.response.agoragram[0]._id, tree)

      return {
        ...state,
        fullIds: {
          ...state.fullIds,
          [ action.response.agoragram[ 0 ].shortID ]: action.response.agoragram[ 0 ]._id
        },
        // comments: tree,
        users: [ ...state.users, ...users ],
        agoragrams: {
          ...state.agoragrams,
          ...tree,
          [ action.response.agoragram[ 0 ]._id ]: {
            users,
            ...action.response.agoragram[ 0 ]
          },
        },
        posts: {
          ...state.posts,
          total: state.posts.total + 1,
          [ action.response.agoragram[ 0 ]._id ]: {
            users,
            ...action.response.agoragram[ 0 ]
          }
        }
      }
    } else return state
  case 'REQUEST_ASTERI':
    return state
  case 'RESPONSE_ASTERI':
    if ( action.response.type === "success" ) {
      let agoragram = state.agoragrams[ action.response.agoragramID ]
      if ( action.response.action === "unstarred" ) agoragram.stars--;
      else agoragram.stars++;
      // console.log(action.response.agoragramID, agoragram)
      return {
        ...state,
        agoragrams: {
          ...state.agoragrams,
          [ action.response.agoragramID ]: agoragram
        }
      }
    }
    return state
  case 'VIEW_COMMENTS':
    return {
      ...state,
      viewingComments: true
    }
  case 'ADD_HIDDEN_POST':
    return {
      ...state,
      hiddenPosts: [...state.hiddenPosts, action.postId]
    }
    default:
      return state
  }
}
