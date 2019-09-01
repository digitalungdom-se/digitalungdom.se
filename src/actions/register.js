import createAsyncFunction, { query } from './createAsyncFunction.js'

// export const Register = {
//   ...createAsyncFunction( 'register', { method: 'POST', route: '/api/register' }, [ Auth.receiveAuth ], fakeResponse ),
//   ...createAsyncFunction( 'check_email', { method: 'GET', route: '/api/register_check_email' }, [] ),
//   ...createAsyncFunction( 'check_username', { method: 'GET', route: '/api/register_check_username' }, [] ),
// }

// export const checkEmail = createAsyncFunction('check_email', { method: 'GET', route: '/api/user/validate/email' }, [] )
// export const checkUsername = createAsyncFunction( 'check_username', { method: 'GET', route: '/api/user/validate/username' }, [] )

export function checkUsername(username) {
  return {
    types: [
      'CHECK_USERNAME_REQUEST',
      'CHECK_USERNAME_SUCCESS',
      'CHECK_USERNAME_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/user/validate/username?" + query( { username } ) ),
    payload: { username }
  }
}

export function checkEmail(email) {
  return {
    types: [
      'CHECK_EMAIL_REQUEST',
      'CHECK_EMAIL_SUCCESS',
      'CHECK_EMAIL_FAILURE'
    ],
    callAPI: () =>
      fetch( "/api/user/validate/email?" + query( { email } ) ),
    payload: { email }
  }
}


export function register(form) {
  return {
    types: [
      'REGISTER_REQUEST',
      'REGISTER_SUCCESS',
      'REGISTER_FAILURE'
    ],
    callAPI: () =>
      fetch("api/user/register", {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      }),
    payload: form
  }
}
