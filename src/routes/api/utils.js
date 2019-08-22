// const base = 'http://localhost:8080/api';
export function post(endpoint, data) {
	console.log("from utils: post" + endpoint);
	console.log("from utils.js : " + JSON.stringify(data));
	return fetch(endpoint, {
		method: 'POST',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
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

export function del(endpoint, id) {
	console.log("from utils: del" + endpoint);
	// console.log("from utils.js : " + JSON.stringify(data));
	return fetch(endpoint, {
		method: 'GET',
		credentials: 'include',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
			// 'cache': 'no-cache'
		}
	})
	// .then(r => r.json());

}