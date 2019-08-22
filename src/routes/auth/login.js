import * as api from '../api/api.js';
import { token_id } from '../../store/stores.js'
export async function post(req, res) {
	// let token_value;

	// const unsubscribe = token_id.subscribe(value => {
	// 	token_value = value;

	// 	// onDestroy(unsubscribe);
	// var token_derived = JSON.stringify(token_id);
	// });

	const user = req.body;
	console.log("before api.post : login.js");
	api.post('authenticate', { user }).then(response => {
		if (response.user) req.session.user = response.user;
		// res.setHeader('Content-Type', 'application/json');
		console.log("after api.post : login.js");
		// res.end(JSON.stringify(response));
		req.session.user = true;
		req.session.token_id = response.id_token;
		// token_id.set(req.session.token_id);
		// console.log("token_id : login.js  " + {token_id});
			console.log("token_id from response.json : " + response.id_token );
			console.log("response from response.json : " + JSON.stringify(response ));
			// req.session.token_id = response.json().id_token;	
					
		res.setHeader('Content-Type', 'application/json');

		res.end(JSON.stringify(response));
        })
		// if (response.user) req.session.user = response.user;
		

		// res.end(JSON.stringify(response));
	};
// }



