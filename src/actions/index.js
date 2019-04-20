import createAsyncFunction from './createAsyncFunction.js'

const fakeResponse = 0 ? {
  "type": "success",
  "name": "Douglas Bengtsson",
  "username": "Nautman"
} : null

export let Auth = {
  receiveAuth: ( response ) => ( {
    type: 'RECEIVE_AUTH',
    response,
    receivedAt: Date.now()
  } )
}

export const State = {
  addFunction: (name, method, route, template) => ({
    type: 'ADD_FUNCTION',
    name,
    method,
    route,
    template
  }),
  removeFunction: (name) => ({
    type: 'REMOVE_FUNCTION',
    name
  }),
  ...createAsyncFunction('do_function', null, [])
}

export const Users = {
  ...createAsyncFunction( 'get_user', { method: 'GET', route: '/api/get_user' }, [] ),
}

Auth = {
  ...Auth,
  ...createAsyncFunction( 'auth', { method: 'GET', route: '/api/auth' }, [ Auth.receiveAuth, Users.response_get_user ] ),
  ...createAsyncFunction( 'logOut', { method: 'POST', route: '/api/logout' }, [] ),
  ...createAsyncFunction( 'login', { method: 'POST', route: '/api/login' }, [ Auth.receiveAuth ], fakeResponse ),
}

export const Register = {
  ...createAsyncFunction( 'register', { method: 'POST', route: '/api/register' }, [ Auth.receiveAuth ], fakeResponse ),
  ...createAsyncFunction( 'check_email', { method: 'GET', route: '/api/register_check_email' }, [] ),
  ...createAsyncFunction( 'check_username', { method: 'GET', route: '/api/register_check_username' }, [] ),
}

export const Agora = {
  ...createAsyncFunction( 'agorize', { method: 'POST', route: '/api/agorize' }, [] ),

  ...createAsyncFunction( 'asteri', { method: 'POST', route: '/api/asteri' }, [] ),

  ...createAsyncFunction( 'anti_agorize', { method: 'POST', route: '/api/anti_agorize' }, [] ),
  ...createAsyncFunction( 'meta_agorize', { method: 'POST', route: '/api/meta_agorize' }, [] ),

  ...createAsyncFunction( 'get_agoragrams', { method: 'GET', route: '/api/get_agoragrams' }, [] ),

  ...createAsyncFunction( 'report', { method: 'POST', route: '/api/report' }, [] ),

  ...createAsyncFunction( 'get_agoragram', { method: 'GET', route: '/api/get_agoragram' }, [] ),
  ...createAsyncFunction( 'get_comments', { method: 'GET', route: '/api/get_comments' }, [] ),

  viewComments: (post) => ({
    type: 'VIEW_COMMENTS',
    post
  })

}

export const Settings = {
  changeTheme: choice => ({
    type: 'CHANGE_THEME',
    choice
  })
}
