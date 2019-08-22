// import { token_id } from '$session';
// import { stores } from '@sapper/app';
// const { session } = stores();
// const fetch =require('node-fetch');
import { token_id } from '../../store/stores';

const base = 'http://localhost:8080/api';

let token_value;

	const unsubscribe = token_id.subscribe(value => {
		token_value = value;

		// onDestroy(unsubscribe);
	var token_derived = JSON.stringify(token_id);
	});


async function send({ method, path, data, token }) {
	const fetch = process.browser ? window.fetch : require('node-fetch').default;
	const opts = { method, headers: {} };
	// console.log("from api.js send: " + JSON.stringify(data.user));
	if (data) {
		// console.log("from api.js send: after data check " + JSON.stringify(data.user));
		opts.headers['Content-Type'] = 'application/json';
		opts.headers['Accept'] = 'application/json';
		opts.body = JSON.stringify(data.user);
	}

	// let token_value;

	// const unsubscribe = token_id.subscribe(value => {
	// 	token_value = value;

	// 	// onDestroy(unsubscribe);
	// var token_derived = JSON.stringify(token_id);
	// });

	if (token) {
		// let token_id = $session.token_id;
			console.log("$token from api.js :token check  " + token);
			console.log("token_value from api.js :token check  " + token_id);
			opts.headers['Authorization'] = `Bearer ${token}`;
		
	}
	return fetch(`${base}/${path}`, opts)
		.then(r => r.text())
		.then(json => {
			try {
				return JSON.parse(json);
			} catch (err) {
				return json;
			}
		});
}

export function get(path, token) {
	return send({ method: 'GET', path, token });
}

export function del(path, token) {
	return send({ method: 'DELETE', path, token });
}

export async function post(path, data, token) {
	console.log("from api.js post") ;
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
} 
