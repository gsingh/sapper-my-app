<script>
	import { goto, stores } from '@sapper/app';
	// import { store } from '../../client.js'
	// import ListErrors from '../components/ListErrors.svelte';
	// import { post } from '../auth/login.js';
	// const fetch =require('node-fetch');
	import {token_id, authenticated} from '../../store/stores.js';
	
	const { session } = stores();
	
	fetch = process.browser ? window.fetch : require('node-fetch').default;
	let authenticationError = null;
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
	async function submit(event) {
	 	await fetch(`${baseUrl}/${path}`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		//   'credentials': 'include',
		'cache': 'no-cache'
		},
		body: JSON.stringify({
			 "password": password,
			"rememberMe": true,
			"username": username 
		})
	  }) 

	.then(checkStatus)
//   .then(parseJSON)
  .then((response) => 
  {
	  console.log('From response Authorization: ' + JSON.stringify(response.headers.get("Authorization")));
	
	token_1 =  JSON.stringify(response.headers.get("Authorization"));
	token =token_1.slice(1,token_1.length-1);
	$token_id = token;
		// stores.setItem({authenticated: true});
	// this.req.session.token_id=$token_id;
	console.log("$token from response : " + {token});
	console.log("$token from body : " + JSON.stringify(response.body.id_token));
	console.log("id_token from body : " + JSON.stringify(response.body.id_token));
	if (response.user) {
			$session.user = response.body.id_token;
			
		}
		goto('/'); 
  })

	   .catch((error) => {
	
		console.log("Ther was an error while fetching token_id: "  + error);
      });

	}
	$: console.log($session)
</script>

<svelte:head>
	<title>Sign in • Conduit</title>
</svelte:head>

<div class="w-full max-w-xs">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
				</p>

				<!-- <ListErrors {errors}/> -->

				<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"   on:submit|preventDefault={submit}>
					<div class="mb-4">
					 <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        				Username
      				</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="user name" bind:value={username}>
					</div>
					<div class="mb-6">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        					Password
      					</label>
					
						<input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" bind:value={password}>
						<p class="text-red-500 text-xs italic">Please choose a password.</p>
    				</div>
					<div class="flex items-center justify-between">
					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled='{!username || !password}' >
						Sign in
					</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<p>Token is {$token_id} and authorization is {$authenticated} </p>
</div>