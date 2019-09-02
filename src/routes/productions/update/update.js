import * as api from '../../api/api';

export async function put(req, res, next) {
    const data = req.body;
    const data_json= data;
    console.log("data from put: " + JSON.stringify(data_json));
	const production = await api.put('productions', data_json,  req.session.token_id );
            console.log("production " + JSON.stringify(production));
           
        if (production !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(production));
        } else {
            next();
        }

}