// const base = 'http://localhost:8080/api';
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
	}).then(r => r.json());

}

export function get(endpoint) {
	console.log("from utils: get" + endpoint);
	// console.log("from utils.js : " + JSON.stringify(data));
	return fetch(endpoint, {
		method: 'GET',
		credentials: 'include',
		// body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
			// 'cache': 'no-cache'
		}
	})
	// .then(r => r.json());

}

export function del(endpoint, data) {
	console.log("from utils: del data : " + data + "  endpoint :  " + endpoint);
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
	}).then(r => r.json());

}
