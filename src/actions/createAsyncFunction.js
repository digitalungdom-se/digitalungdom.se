export const Log = {
	savePayload: (payload, route) => ({
		type: 'SAVE_PAYLOAD',
		payload,
		route
	}),
	saveResponse: result => ({
		type: 'SAVE_RESPONSE',
		result
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
			dispatch(Log.savePayload(input, `${request.method} ${request.route}`))

			dispatch(Category[`request_${name}`](input, Date.now()))

			const body = request.method === 'POST' ? { body: JSON.stringify(input) } : {}

			return fetch(`${request.route}${request.method === 'GET' ? `?${query(input)}` : ''}`, {
				method: request.method,
				headers: {"Content-Type": "application/json"},
				...body
			})
				.then(response => response.json())
				.then(response => {
					dispatch(Log.saveResponse(response))
					dispatch(Category[`response${name}`]({ ...response, _responseTime: Date.now()}))
					responseCallbacks.forEach(callback => dispatch(callback({ ...response , _responseTime: Date.now()})))
					return response
				})
				.catch(error => {
					if(fakeResponse) error = fakeResponse
					dispatch(Log.saveResponse(error))
					dispatch(Category[`response_${name}`](error, Date.now()))
					if(fakeResponse) responseCallbacks.forEach(callback => dispatch(callback({ ...error , _responseTime: Date.now()})));
					return error
				})
		}
	}

	Category[`request_${name}`] = (request, _requestTime) => ({
		type: `REQUEST_${name.toUpperCase()}`,
		request,
		_requestTime
	})

	Category[`response_${name}`] = (response, _responseTime) => ({
		type: `RESPONSE_${name.toUpperCase()}`,
		response,
		_responseTime
	})

	return Category
}

export default createAsyncFunction
