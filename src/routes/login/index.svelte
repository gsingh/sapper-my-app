<script>
	import { goto, stores } from '@sapper/app';
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
	const baseUrl = `http://localhost:8080/api`
	const path = `authenticate`
async function checkStatus(response) {
	if (response.ok) {
		console.log("from checkstatus response: " + response.statusText);
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
	const response = 	await fetch(`${baseUrl}/${path}`, {
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
	  }) ;

	response.then(checkStatus)
//   .then(parseJSON)
  .then((response) => 
  {
	  console.log('From response Authorization: ' + JSON.stringify(response.headers.get("Authorization")));
	
	token_1 =  JSON.stringify(response.headers.get("Authorization"));
	$token_id = token_1.slice(1,token_1.length-1);
	// this.req.session.token_id=$token_id;
	console.log("$token from response : " + $token_id);
	
		 goto('/');
  })

	   .catch((error) => {
	
		console.log("Ther was an error while fetching token_id: "  + error);
      });

	}
</script>

<svelte:head>
	<title>Sign in • Conduit</title>
</svelte:head>

<div class="auth-page">
	<div class="container page">
		<div class="row">
			<div class="col-md-6 offset-md-3 col-xs-12">
				<h1 class="text-xs-center">Sign In</h1>
				<p class="text-xs-center">
					<a href="/register">Need an account?</a>
				</p>

				<!-- <ListErrors {errors}/> -->

				<form on:submit|preventDefault={submit}>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="text" placeholder="user name" bind:value={username}>
					</fieldset>
					<fieldset class="form-group">
						<input class="form-control form-control-lg" type="password" placeholder="Password" bind:value={password}>
					</fieldset>
					<button class="btn btn-lg btn-primary pull-xs-right" type="submit" disabled='{!username || !password}' >
						Sign in
					</button>
				</form>
			</div>
		</div>
	</div>
	<p>Token is {$token_id} and authorization is {$authenticated}</p>
</div>