import createAsyncFunction from './createAsyncFunction.js'

const Users = {
  ...createAsyncFunction( 'get_user', { method: 'GET', route: '/api/get_user' }, [] ),
}

export default Users
