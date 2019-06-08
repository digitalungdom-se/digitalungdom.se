import createAsyncFunction from './createAsyncFunction.js'

const Agora = {
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

export default Agora
