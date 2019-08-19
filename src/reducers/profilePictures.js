export default ( state = {
  profilePictures: {},
  usernames: {}
}, action ) => {
  let profilePictures;
  let usernames;

  switch ( action.type ) {
  case 'REQUEST_GET_PROFILE_PICTURE':
    profilePictures = {};
    usernames = {};

    if ( action.request.username ) usernames[ action.request.username ] = false;
    else profilePictures[ action.request.id ] = false;

    return {
      ...state,
      profilePictures: {
          ...state.profilePictures,
          ...profilePictures
        },
        usernames: {
          ...state.usernames,
          ...usernames
        },
    }

    case "GET_PROFILE_PICTURE_REQUEST":
      profilePictures = {};
      usernames = {};

      if ( action.payload.username ) usernames[ action.payload.username ] = false;
      else profilePictures[ action.payload.id ] = false;

      return {
        ...state,
        profilePictures: {
            ...state.profilePictures,
            ...profilePictures
          },
          usernames: {
            ...state.usernames,
            ...usernames
          }
      }
      return state
    case "GET_PROFILE_PICTURE_SUCCESS":
      profilePictures = {}
      usernames = {}

      usernames[ action.response.username ] = action.response._id;
      profilePictures[ action.response._id ] = {
        imageType: action.response.imageType,
        image: action.response.image,
      }

      return {
        ...state,
        profilePictures: {
            ...state.profilePictures,
            ...profilePictures
          },
          usernames: {
            ...state.usernames,
            ...usernames
          }
      }
      case "GET_USER_ERROR":
        console.log( action )
        return state
      case "RESPONSE_GET_USER":
        return state
      default:
        return state
  }
}
