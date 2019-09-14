import * as api from '../api/api';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();
let route;

export async function get(req, res, next) {
    // const data = req.body;
    // const data_json= req.body;
    route = req.headers.route;
    console.log("route :" + route);
    // console.log("data from get: " + JSON.stringify(data_json));
    // console.log("token_id from del(req,res) : " + req.session.token_id);
	const data = await api.get( route, null );
            console.log("data " + JSON.stringify(data));
        
        if (data !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        } else {
            next();
        }

}