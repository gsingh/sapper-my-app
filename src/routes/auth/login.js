import * as api from '../../api/api.js';

export async function post(req, res, next) {
	const user = req.body;

	api.post('/authenticate', { username, password }).then(response => {
		res.status(response.status);
		console.log("response.status.text " + response.statusText );
		if (response.status === 201) {
            const data = response.json();
            req.session.user = true;
            req.session.token_id = data.id_token;
			res.setHeader('Content-Type', 'application/json');
			res.setHeader('Accept', 'application/json');
			res.end();
        }
		// if (response.user) req.session.user = response.user;
		

		// res.end(JSON.stringify(response));
	});
}



