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

    return callAPI()
    .then(
      response => {
        if(response.ok) {
          response.json()
          .then(response =>
            {
              dispatch(
                Object.assign({}, {payload}, {
                  response,
                  type: successType
                })
              )
              callbacks.forEach(callback => {
                dispatch(callback(response, payload))
              })
              return response
            })
        } else {
          response.json()
          .then(error => dispatch(
            Object.assign({}, {payload}, {
              error,
              type: failureType
            })
          ))
        }
      },
      error => dispatch(
        Object.assign({}, {payload}, {
          error,
          type: failureType
        })
      )
    )
  }
}

export default callAPIMiddleware
