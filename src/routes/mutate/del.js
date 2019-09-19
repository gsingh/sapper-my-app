import * as api from '../api/api.js';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();


export async function del(req, res, next) {
    const del_data = req.body.data;
    console.log("del_data : " + del_data);
    // console.log("token_id from del(req,res) : " + req.session.token_id);
	const data = await api.del(del_data, req.session.token_id );
            console.log("data" + JSON.stringify(data));
            // console.log("token_id from get(req,res) : " + $session.token_id);
			// productions = await api.get('productions', true );
			// console.log("productions" + productions);
		// return {productions};

        if (data !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(data));
        } else {
            next();
        }

}