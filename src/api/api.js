// import { token_id } from '../store/stores';
// import { stores } from '@sapper/app';
// const { session } = stores();
const fetch =require('node-fetch');

const base = 'http://localhost:8080/api';


async function send({ method, path, data, token }) {
	fetch = process.browser ? window.fetch : require('node-fetch').default;
	const opts = { method, headers: {} };
	if (data) {
		opts.headers['Content-Type'] = 'application/json';
		opts.headers['Accept'] = 'application/json';
		opts.body = JSON.stringify(data);
	}

	// let token_value;

	// const unsubscribe = token_id.subscribe(value => {
	// 	token_value = value;

	// 	// onDestroy(unsubscribe);
	// var token_derived = JSON.stringify(token_id);
	// });

	if (token) {
			console.log("$token from api.js : " + req.session.token_id);
		opts.headers['Authorization'] = req.session.token_id;
		
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

export function post(path, data, token) {
	console.log("from api.js post") ;
	return send({ method: 'POST', path, data, token });
}

export function put(path, data, token) {
	return send({ method: 'PUT', path, data, token });
} 
