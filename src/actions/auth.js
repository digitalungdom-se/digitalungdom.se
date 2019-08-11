import createAsyncFunction from './createAsyncFunction.js'
import Users from 'actions/users'

const addMeToUsers = (me, payload) => ({
  type: "GET_USER_SUCCESS",
  response: {
    users: [{_id: me.details._id, details: me.details}]
  },
  payload
})

export function auth(form) {
  return {
    types: [
      'AUTH_REQUEST',
      'AUTH_SUCCESS',
      'AUTH_FAILURE'
    ],
    callAPI: () => fetch("/api/auth"),
    callbacks: [addMeToUsers],
    payload: form
  }
}

export function login(form) {
  return {
    types: [
      'LOGIN_REQUEST',
      'LOGIN_SUCCESS',
      'LOGIN_FAILURE'
    ],
    callAPI: () =>
      fetch("/api/login", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }),
    callbacks: [addMeToUsers],
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
    callAPI: () => fetch("/api/logout", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }),
    payload: null
  }
}

const receiveAuth = ( response ) => ({
  type: 'RECEIVE_AUTH',
  response,
  receivedAt: Date.now()
})

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
