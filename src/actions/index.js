import createAsyncFunction from './createAsyncFunction.js'

export let Auth = {
  receiveAuth: ( response ) => ( {
    type: 'RECEIVE_AUTH',
    response,
    receivedAt: Date.now()
  } )
}

Auth = {
  ...Auth,
  ...createAsyncFunction( 'auth', { method: 'POST', route: '/api/auth' }, [ Auth.receiveAuth ] )
}

const fakeResponse = 0 ? {
  "type": "success",
  "name": "Douglas Bengtsson",
  "username": "Nautman"
} : null

export const Login = {
  ...createAsyncFunction( 'login', { method: 'POST', route: '/api/login' }, [ Auth.receiveAuth ], fakeResponse ),
}

export const Register = {
  ...createAsyncFunction( 'register', { method: 'POST', route: '/api/register' }, [ Auth.receiveAuth ], fakeResponse ),
  ...createAsyncFunction( 'check_email', { method: 'GET', route: '/api/register_check_email' }, [] ),
  ...createAsyncFunction( 'check_username', { method: 'GET', route: '/api/register_check_username' }, [] ),
}

export const Users = {
  ...createAsyncFunction( 'get_user', { method: 'POST', route: '/api/get_user' }, [] ),
}

export const Agora = {
  ...createAsyncFunction( 'agora_publish_text', { method: 'POST', route: '/api/agorize' }, [] ),
  ...createAsyncFunction( 'agora_publish_link', { method: 'POST', route: '/api/agorize' }, [] ),
  ...createAsyncFunction( 'agora_publish_question', { method: 'POST', route: '/api/agorize' }, [] ),
  ...createAsyncFunction( 'agora_publish_comment', { method: 'POST', route: '/api/agorize' }, [] ),

  ...createAsyncFunction( 'anti_agorize', { method: 'POST', route: '/api/anti_agorize' }, [] ),
  ...createAsyncFunction( 'meta_agorize', { method: 'POST', route: '/api/meta_agorize' }, [] ),

  ...createAsyncFunction( 'get_agoragrams', { method: 'GET', route: '/api/get_agoragrams' }, [] ),

  ...createAsyncFunction( 'get_agoragram', { method: 'GET', route: '/api/get_agoragram' }, [] ),
  ...createAsyncFunction( 'get_comments', { method: 'GET', route: '/api/get_comments' }, [] ),

}