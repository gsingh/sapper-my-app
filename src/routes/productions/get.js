import * as api from '../../api/api.js';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();


export async function get(req, res, next) {

    console.log("token_id from get(req,res) : " + req.session.token_id);
	const productions = await api.get('productions', req.session.token_id );
            console.log("productions" + productions);
            // console.log("token_id from get(req,res) : " + $session.token_id);
			// productions = await api.get('productions', true );
			// console.log("productions" + productions);
		// return {productions};

        if (productions !== null) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(productions));
        } else {
            next();
        }

}