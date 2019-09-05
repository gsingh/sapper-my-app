import * as api from '../api/api';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();
let route;

export async function post(req, res, next) {
    // const data = req.body;
    const data_json= req.body;
    route = req.headers.route;
    console.log("route :" + route);
    console.log("data from put: " + JSON.stringify(data_json));
    // console.log("token_id from del(req,res) : " + req.session.token_id);
	const data = await api.post(route, data_json,  req.session.token_id );
            console.log("data " + JSON.stringify(data));
        
        if (data !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        } else {
            next();
        }

}