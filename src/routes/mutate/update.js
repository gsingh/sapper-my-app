import * as api from '../api/api';

export async function put(req, res, next) {
    // const data = req.body;
    const data_json= req.body;
    const route = req.headers.route;
    console.log("data from put: " + JSON.stringify(data_json));
	const data = await api.put(route, data_json,  req.session.token_id );
            console.log("data " + JSON.stringify(data));
           
        if (data !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        } else {
            next();
        }

}