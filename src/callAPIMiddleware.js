function callAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { types, callAPI, shouldCallAPI = () => true, payload = {}, callbacks = [] } = action

    if (!types) {
      // Normal action: pass it on
      return next(action)
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.')
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.')
    }

    if (!shouldCallAPI(getState())) {
      return
    }

    const [requestType, successType, failureType] = types

    dispatch(
      Object.assign({}, {payload}, {
        type: requestType
      })
    )

    function createAndDispatch(type, response, payload) {
      return dispatch(Object.assign({}, {payload}, {
        response,
        type
      }))
    }

    return callAPI()
    .then(
      response => {
        if(response.ok) {
          response.json()
          .then(response =>
            {
              if(response.type === "fail") createAndDispatch(failureType, response, payload)
              else {
                createAndDispatch(successType, response, payload)
                callbacks.forEach(callback => {
                  dispatch(callback(response, payload))
                })
              }
              return response
            })
        } else createAndDispatch(failureType, response, payload)
      },
      error => createAndDispatch(failureType, error, payload)
    )
  }
}

export default callAPIMiddleware
