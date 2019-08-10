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
export const query = params => Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&')

function createAsyncFunction(name, request, responseCallbacks) {
	const Category = {}

	Category[name] = (input, fakeResponse, undefinedRequest) => {
		if(request === null) request = undefinedRequest
		return dispatch => {
			dispatch(Log.savePayload(input, request.method + ' ' + request.route))

			const body = request.method === 'POST' ? { body: JSON.stringify(input) } : {}
			const _url = `${request.route}${request.method === 'GET' && input ? `?${query(input)}` : ''}`

			dispatch(Category['request_' + name](input, Date.now(), _url))

			return fetch(_url, {
				method: request.method,
				headers: {"Content-Type": "application/json"},
				...body
			})
				.then(response => response.json())
				.then(response => {
					dispatch(Log.saveResponse(response))
					dispatch(Category['response_' + name](response, Date.now(), _url))
					responseCallbacks.forEach(callback => dispatch(callback(response, Date.now(), _url)))
					return {response, _requestTime: Date.now(), _url}
				})
				.catch(err => {
					dispatch(Log.saveResponse({douglas: "too stupid too log this, probably a network error tho"}))
				})
		}
	}

	const requestType = 'REQUEST_' + name.toUpperCase()
	const responseType = 'RESPONSE_' + name.toUpperCase()

	Category['request_' + name] = (request, _requestTime, _url) => ({
		type: requestType,
		request,
		_requestTime,
		_url
	})

	Category['response_' + name] = (response, _responseTime, _url) => ({
		type: responseType,
		response,
		_responseTime,
		_url
	})

	return Category
}

export default createAsyncFunction
