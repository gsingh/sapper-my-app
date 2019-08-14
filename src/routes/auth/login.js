import * as api from '../../api/api.js';

export async function post(req, res) {
	const user = req.body;

	api.post('/authenticate', { user }).then(response => {
		res.status(response.status);
		if (response.status === 201) {
            const data = response.json();
            req.session.user = true;
            req.session.token_id = data.id_token;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(response));
        }
		// if (response.user) req.session.user = response.user;
		

		// res.end(JSON.stringify(response));
	});
}



