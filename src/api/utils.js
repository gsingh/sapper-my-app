// const base = 'http://localhost:8080/api';
export function post(endpoint, data) {
	console.log("from utils: " + endpoint);
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