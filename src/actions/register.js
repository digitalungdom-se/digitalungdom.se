import createAsyncFunction from './createAsyncFunction.js'

export const Register = {
  ...createAsyncFunction( 'register', { method: 'POST', route: '/api/register' }, [ Auth.receiveAuth ], fakeResponse ),
  ...createAsyncFunction( 'check_email', { method: 'GET', route: '/api/register_check_email' }, [] ),
  ...createAsyncFunction( 'check_username', { method: 'GET', route: '/api/register_check_username' }, [] ),
}
