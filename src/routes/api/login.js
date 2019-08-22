
	// import { goto, stores } from '@sapper/app';
	// import { store } from '../../client.js'
	// import ListErrors from '../components/ListErrors.svelte';
	// import { post } from '../auth/login.js';
	const fetch =require('node-fetch').defaults;
	// import {token_id, authenticated} from '../../store/stores.js';
	
	// const { session } = stores();
	
	// fetch = process.browser ? window.fetch : require('node-fetch').default;
	// let authenticationError = null;
	let username = '';
	let password = '';
	let errors = null;
	let rememberMe = true;
	let token_1 = '';
	let token = '';
	const baseUrl = `http://localhost:8080/api`
	const path = `authenticate`
async function checkStatus(response) {
	if (response.ok) {
		console.log("from checkstatus response: " + response.statusText);
		console.log("from checkstatus response: " + JSON.stringify(response.body));
	  return response;
	} else {
	  var error = new Error(response.statusText + '-' + response.baseUrl)
	  error.response = response
	  console.log(error);
	  return error;
	}
  }
  
  async function parseJSON(response) {
	  console.log("from parseJson response: " + response.statusText);
	return response.json();
  }
	export async function post(event) {
	 	await fetch(`${baseUrl}/${path}`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		//   'credentials': 'include',
		'cache': 'no-cache'
		},
		body: JSON.stringify({
			 "password": req.body.password,
			"rememberMe": true,
			"username": req.body.username 
		})
	  }) 

	.then(checkStatus)
//   .then(parseJSON)
  .then((response) => 
  {
	  console.log('From response Authorization: ' + JSON.stringify(response.headers.get("Authorization")));
	
	token_1 =  JSON.stringify(response.headers.get("Authorization"));
	token =token_1.slice(1,token_1.length-1);
	// $token_id = token;
		// stores.setItem({authenticated: true});
	// this.req.session.token_id=$token_id;
	console.log("$token from response : " + {token});
	console.log("$token from body : " + JSON.stringify(response.body.id_token));
	console.log("id_token from body : " + JSON.stringify(response.body.id_token));
	// if (response.user) {
			req.session.token_id = response.body.id_token;
			req.session.user = true;
			req.session.authenticated = true;
		// }
		console.log("session.token_id:  " + req.session.token_id);
		console.log("session.token_id:  " + req.session.authenticated);
		res.end();
  })

	   .catch((error) => {
	
		console.log("There was an error: "  + error);
      });

	}
	// $: console.log($session)
