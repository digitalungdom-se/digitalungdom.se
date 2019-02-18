export const Log = {
	savePayload: (payload, route) => ({
		type: 'SAVE_PAYLOAD',
		payload,
		route
	}),
	saveResponse: response => ({
		type: 'SAVE_RESPONSE',
		response
	})
}

const esc = encodeURIComponent;
const query = params => Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&')

function createAsyncFunction(name, request, responseCallbacks, fakeResponse) {
	const Category = {}

	Category[name] = (input) => {
		return dispatch => {
			dispatch(Log.savePayload(input, request.method + ' ' + request.route))

			dispatch(Category['request_' + name](input, Date.now()))

			const body = request.method === 'POST' ? { body: JSON.stringify(input) } : {}

			console.log(request, body)

			return fetch(`${request.route}${request.method === 'GET' ? `?${query(input)}` : ''}`, {
				method: request.method,
				headers: {"Content-Type": "application/json"},
				...body
			})
				.then(response => response.json())
				.then(response => {
					console.log(response)
					dispatch(Log.saveResponse(response))
					dispatch(Category['response_' + name]({ ...response, _responseTime: Date.now()}))
					responseCallbacks.forEach(callback => dispatch(callback({ ...response , _responseTime: Date.now()})))
					return response
				})
				.catch(error => {
					// if(fakeResponse) error = fakeResponse
					dispatch(Log.saveResponse(error))
					dispatch(Category['response_' + name](error, Date.now()))
					// if(fakeResponse) responseCallbacks.forEach(callback => dispatch(callback({ ...error , _responseTime: Date.now()})));
					return error
				})
		}
	}

	const requestType = 'REQUEST_' + name.toUpperCase()
	const responseType = 'RESPONSE_' + name.toUpperCase()

	Category['request_' + name] = (request, _requestTime) => ({
		type: requestType,
		request,
		_requestTime
	})

	Category['response_' + name] = (response, _responseTime) => ({
		type: responseType,
		response,
		_responseTime
	})

	return Category
}

export default createAsyncFunction
