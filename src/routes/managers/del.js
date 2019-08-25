import * as api from '../api/api.js';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();


export async function del(req, res, next) {
    const endpoint = req.body.endpoint;
    console.log("endpoint : " + endpoint);
    console.log("token_id from del(req,res) : " + req.session.token_id);
	const managers = await api.del(endpoint, req.session.token_id );
            console.log("productions" + managers);
            // console.log("token_id from get(req,res) : " + $session.token_id);
			// productions = await api.get('productions', true );
			// console.log("productions" + productions);
		// return {productions};

        if (managers !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(managers));
        } else {
            next();
        }

}