import * as api from '../api/login';
import { token_id } from '../../store/stores.js'
export async function post(req, res, next) {


	const user = req.body;
	
	console.log("before api.post : login.js" + JSON.stringify(user));
	await api.post('authenticate', { user }, null).then(response => {
		if (response.user) req.session.user = response.user;
		console.log("after api.post : login.js");
		
		if (response.id_token){
		req.session.token_id = response.id_token;
		req.session.user = true;
		req.session.userName = req.body.username;
		
			console.log("token_id from response.json : " + response.id_token );
			console.log("response from response.json : " + JSON.stringify(response ));
		}		
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Accept', 'application/json');
		res.end(JSON.stringify(response));
		})
		
	};
// }



