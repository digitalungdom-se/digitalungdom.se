import createAsyncFunction from './createAsyncFunction.js'
import Users from 'actions/users'

const fakeResponse = 0 ? {
  "type": "success",
  "name": "Douglas Bengtsson",
  "username": "Nautman"
} : null

let Auth = {
  receiveAuth: ( response ) => ( {
    type: 'RECEIVE_AUTH',
    response,
    receivedAt: Date.now()
  } )
}

Auth = {
  ...Auth,
  ...createAsyncFunction( 'auth', { method: 'GET', route: '/api/auth' }, [ Auth.receiveAuth, Users.response_get_user ] ),
  ...createAsyncFunction( 'logOut', { method: 'POST', route: '/api/logout' }, [] ),
  ...createAsyncFunction( 'login', { method: 'POST', route: '/api/login' }, [ Auth.receiveAuth ], fakeResponse ),
}

export default Auth
