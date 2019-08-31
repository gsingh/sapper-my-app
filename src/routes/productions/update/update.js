import * as api from '../../api/api';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();


export async function put(req, res, next) {
    const production = req.body.production;
    console.log("data from put: " + JSON.stringify(production));
    console.log("token_id from del(req,res) : " + req.session.token_id);
	const productions = await api.put('productions', {production},  req.session.token_id );
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