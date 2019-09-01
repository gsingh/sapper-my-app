import * as api from '../api/login';
import { token_id } from '../../store/stores.js'
export async function post(req, res, next) {
	// let token_value;

	// const unsubscribe = token_id.subscribe(value => {
	// 	token_value = value;

	// 	// onDestroy(unsubscribe);
	// var token_derived = JSON.stringify(token_id);
	// });

	const user = req.body;
	// console.log("before api.post : login.js " + JSON.stringify(data));
	// const user = {user: data};
	console.log("before api.post : login.js" + JSON.stringify(user));
	await api.post('authenticate', { user }, null).then(response => {
		if (response.user) req.session.user = response.user;
		// res.setHeader('Content-Type', 'application/json');
		console.log("after api.post : login.js");
		// res.end(JSON.stringify(response));
		
		if (response.id_token){
		req.session.token_id = response.id_token;
		req.session.user = true;
		// token_id.set(req.session.token_id);
		// console.log("token_id : login.js  " + {token_id});
			console.log("token_id from response.json : " + response.id_token );
			console.log("response from response.json : " + JSON.stringify(response ));
			// req.session.token_id = response.json().id_token;	
		}		
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Accept', 'application/json');
		res.end(JSON.stringify(response));
		})
		// if (response.user) req.session.user = response.user;
		

		// res.end(JSON.stringify(response));
	};
// }



