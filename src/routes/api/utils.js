// const base = 'http://localhost:8080/api';
function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
	  return response
	} else {
	  var error = new Error(response.statusText)
	  error.response = response
	  throw error
	}
  }
  
export function post(endpoint, data, route) {
	console.log("from utils: post" + endpoint);
	console.log("from utils.js : " + JSON.stringify(data));
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'route': route
			// 'cache': 'no-cache'
		}
	}) .then(checkStatus)
	.then(r => r.json());

}

export function get(endpoint, route) {
	console.log("from utils: get :  " + endpoint);
	
	console.log("from utils.js : " + JSON.stringify(route));
	return fetch(endpoint, {
		method: 'GET',
		credentials: 'include',
		// body: JSON.stringify(target),
		headers: {
			'Content-Type': 'application/json',
			'route': route 
			// 'cache': 'no-cache'
		}
	}) .then(checkStatus)
	.then(r => r.json());

}

export function del(endpoint, data) {
	console.log("from utils: del data : " +JSON.stringify(data) + "  endpoint :  " + endpoint);
	// console.log("from utils.js : " + JSON.stringify(data));
	return fetch(endpoint, {
		method: 'DELETE',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
			// 'cache': 'no-cache'
		}
	})
	// .then(r => r.json());

}

export function logout(endpoint) {
	console.log("from utils: del logout :  endpoint :  " + endpoint);
	// console.log("from utils.js : " + JSON.stringify(data));
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		// body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
			// 'cache': 'no-cache'
		}
	})
	// .then(r => r.json());

}

export function put(endpoint, data, route) {
	console.log("from utils: post" + endpoint);
	console.log("from utils.js : " + JSON.stringify(data));
	return fetch(endpoint, {
		method: 'PUT',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
			'route': route
			// 'cache': 'no-cache'
		}
	}) .then(checkStatus)
	.then(r => r.json());

	
}
