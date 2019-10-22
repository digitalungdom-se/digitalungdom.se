
const addMeToUsers = ( me, payload ) => ( {
  type: "GET_USER_SUCCESS",
  response: {
    user: { _id: me.details._id, details: me.details }
  },
  payload,
  isMe: true
} )

export function auth( form ) {
  return {
    types: [
      'AUTH_REQUEST',
      'AUTH_SUCCESS',
      'AUTH_FAILURE'
    ],
    callAPI: () => fetch( "/api/user/auth" ),
    callbacks: [ addMeToUsers ],
    payload: form
  }
}

export function login( form ) {
  return {
    types: [
      'LOGIN_REQUEST',
      'LOGIN_SUCCESS',
      'LOGIN_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/user/login", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( form )
      } ),
    callbacks: [ addMeToUsers ],
    payload: {
      ...form,
      password: null
    }
  }
}


export function logout() {
  return {
    types: [
      'LOGOUT_REQUEST',
      'LOGOUT_SUCCESS',
      'LOGOUT_FAILURE'
    ],
    callAPI: () => fetch( "/api/user/logout", {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    } ),
    payload: null
  }
}

export function forgotPassword( email ) {
  console.log("action")
  console.log(email)
  return {
    types: [
      'FORGOTPASSWORDEMAIL_REQUEST',
      'FORGOTPASSWORDEMAIL_SUCCESS',
      'FORGOTPASSWORDEMAIL_FAILURE'
    ],
    callAPI: () => fetch( "/api/user/password/forgot", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    body: JSON.stringify( {
      email
    } )
  } ),
    payload: null
  }
}

export function verifyAccount( token ){
  return{
    types:[
      'VERIFYACCOUNT_REQUEST',
      'VERIFYACCOUNT_SUCCESS',
      'VERIFYACCOUNT_FAILURE'
    ],
    callAPI: () => fetch( "/api/user/verify", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        token
      })
    }),
    shouldCallAPI: (state) => state.Auth.verified === undefined,
    payload: null
  }
}

export function resetPassword({ token, password }){
  return{
    types:[
      'RESETPASSWORD_REQUEST',
      'RESETPASSWORD_SUCCESS',
      'RESETPASSWORD_FAILURE'
    ],
    callAPI: () => fetch( "/api/user/password/reset", {
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        token,
        password
      })
    }),
    payload: null
  }
}

/*
const receiveAuth = ( response ) => ( {
  type: 'RECEIVE_AUTH',
  response,
  receivedAt: Date.now()
} )
*/

// const fakeResponse = 0 ? {
//   "type": "success",
//   "name": "Douglas Bengtsson",
//   "username": "Nautman"
// } : null

// let Auth = {
// receiveAuth: ( response ) => ( {
//   type: 'RECEIVE_AUTH',
//   response,
//   receivedAt: Date.now()
// } )
// }

// Auth = {
//   ...Auth,
//   ...createAsyncFunction( 'auth', { method: 'GET', route: '/api/auth' }, [ Auth.receiveAuth, Users.response_get_user ] ),
//   ...createAsyncFunction( 'logOut', { method: 'POST', route: '/api/logout' }, [] ),
//   ...createAsyncFunction( 'login', { method: 'POST', route: '/api/login' }, [ Auth.receiveAuth ], fakeResponse ),
// }

// export default Auth
