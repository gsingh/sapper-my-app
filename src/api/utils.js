const base = 'http://localhost:8080/api';
export function post(endpoint, data) {
	return fetch(`${base}/${endpoint}`, {
		method: 'POST',
		// credentials: 'include',
		body: JSON.stringify({
						 "password": data.password,
						"rememberMe": true,
						"username": data.username 
					}),
		headers: {
			'Content-Type': 'application/json',
			'cache': 'no-cache'
		}
	}).then(r => r.json());

}