import * as api from '../../api/api';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();
let route;

export async function post(req, res, next) {
    const data = req.body;
    const data_json= data;
    route = req.header.route;
    console.log("route :" + route);
    console.log("data from put: " + JSON.stringify(data_json));
    // console.log("token_id from del(req,res) : " + req.session.token_id);
	const production = await api.post(route, data_json,  req.session.token_id );
            console.log("production " + JSON.stringify(production));
            // console.log("token_id from get(req,res) : " + $session.token_id);
			// productions = await api.get('productions', true );
			// console.log("productions" + productions);
		// return {productions};

        if (production !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(production));
        } else {
            next();
        }

}