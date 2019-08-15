import createAsyncFunction from './createAsyncFunction.js'

// export const Register = {
//   ...createAsyncFunction( 'register', { method: 'POST', route: '/api/register' }, [ Auth.receiveAuth ], fakeResponse ),
//   ...createAsyncFunction( 'check_email', { method: 'GET', route: '/api/register_check_email' }, [] ),
//   ...createAsyncFunction( 'check_username', { method: 'GET', route: '/api/register_check_username' }, [] ),
// }

export const checkEmail = createAsyncFunction('check_email', { method: 'GET', route: '/api/user/validate/email' }, [] )
export const checkUsername = createAsyncFunction( 'check_username', { method: 'GET', route: '/api/user/validate/username' }, [] )

export function register(form) {
  return {
    types: [
      'REGISTER_REQUEST',
      'REGISTER_SUCCESS',
      'REGISTER_FAILURE'
    ],
    callAPI: () =>
      fetch("api/register", {
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
