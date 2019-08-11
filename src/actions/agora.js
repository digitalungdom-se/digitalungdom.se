import createAsyncFunction, { query } from './createAsyncFunction.js'

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

/*
Agorize
Authentication required
/api/agorize
Fields: {
  body,
  type,
  role

  // Post specific
  title,
  tags,
  hypagora

  // Comment specific
  replyTo
}
*/
export function agorize(info) {
  return {
    types: [
      'AGORIZE_REQUEST',
      'AGORIZE_SUCCESS',
      'AGORIZE_FAILURE'
    ],
    callAPI: () =>
    fetch("/api/agorize", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...info,
        role: "user"
      })
    }),
    payload: {
      ...info,
      role: "user"
    }
  }
}

export function getAgoragrams(filter) {
  return {
    types: [
      'GET_AGORAGRAMS_REQUEST',
      'GET_AGORAGRAMS_SUCCESS',
      'GET_AGORAGRAMS_FAILURE'
    ],
    callAPI: () =>
      fetch("/api/get_agoragrams?" + query(filter)),
    callbacks: [
      (response) => ({
        type: "GET_USER_SUCCESS",
        response,
        payload: {
          type: "objectid"
        }
      })
    ],
    payload: {
      ...filter,
      query: query(filter)
    }
  }
}

export function getAgoragram(agoragramShortID) {
  return {
    types: [
      'GET_AGORAGRAM_REQUEST',
      'GET_AGORAGRAM_SUCCESS',
      'GET_AGORAGRAM_FAILURE'
    ],
    callAPI: () =>
      fetch("/api/get_agoragram?" + query({agoragramShortID})),
    callbacks: [
      (response) => ({
        type: "GET_USER_SUCCESS",
        response
      })
    ],
    payload: {
      agoragramShortID,
    }
  }
}

export function antiAgorize(agoragramID) {
  return {
    types: [
      'ANTI_AGORIZE_REQUEST',
      'ANTI_AGORIZE_SUCCESS',
      'ANTI_AGORIZE_FAILURE'
    ],
    callAPI: () =>
    fetch("/api/anti_agorize", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({agoragramID})
    }),
    payload: {
      agoragramID
    }
  }
}

export function asteri(agoragramID) {
  return {
    types: [
      'ASTERI_REQUEST',
      'ASTERI_SUCCESS',
      'ASTERI_FAILURE'
    ],
    callAPI: () =>
    fetch("/api/asteri", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        agoragramID
      })
    }),
    payload: {
      agoragramID
    }
  }
}

export function reportAgoragram(id, reason) {
  return {
    types: [
      'REPORT_AGORAGRAM_REQUEST',
      'REPORT_AGORAGRAM_SUCCESS',
      'REPORT_AGORAGRAM_FAILURE'
    ],
    callAPI: () =>
    fetch("/api/report", {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        place: "agoragram",
        id,
        reason
      })
    }),
    payload: {
      place: "agoragram",
      id,
      reason
    }
  }
}


export default Agora
