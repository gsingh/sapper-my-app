import * as api from '../../api/api.js';

export async function post(req, res) {
	const user = req.body;
	console.log("before api.post : login.js");
	api.post('authenticate', { user }).then(response => {
		if (response.user) req.session.user = response.user;
		// res.setHeader('Content-Type', 'application/json');
		console.log("after api.post : login.js");
		// res.end(JSON.stringify(response));
		req.session.user = true;
		req.session.token_id = response.id_token;
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



