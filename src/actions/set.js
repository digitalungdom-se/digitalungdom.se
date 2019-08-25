export function set( form, userID ) {
  return {
    types: [
      'SET_REQUEST',
      'SET_SUCCESS',
      'SET_FAILURE'
    ],
    callAPI: () =>
      fetch( "api/user/set", {
        method: 'put',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify( form )
      } ),
    payload: { ...form, userID }
  }
}
