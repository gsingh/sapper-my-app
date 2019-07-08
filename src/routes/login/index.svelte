<script>
	import { goto, stores } from '@sapper/app';
	// import ListErrors from '../components/ListErrors.svelte';
	// import { post } from '../auth/login.js';
	// const fetch =require('node-fetch');
	import {token, authenticated} from '../../store/stores.js';
	// const { session } = stores();
	 fetch = process.browser ? window.fetch : require('node-fetch').default;
	let authenticationError = null;
	let username = '';
	let password = '';
	let errors = null;
	let rememberMe = true;
	const baseUrl = `http://localhost:8080/api`
	const path = `authenticate`
async function checkStatus(response) {
	if (response.ok) {
		console.log("from checkstatus response: " + JSON.stringify(response));
	  return response;
	} else {
	  var error = new Error(response.statusText)
	  error.response = response
	  console.log(error);
	  return error;
	}
  }
  
  async function parseJSON(response) {
	  console.log("from parseJson response: " + JSON.stringify(response));
	return response.json();
  }
	async function submit(event) {
		await fetch(`${baseUrl}/${path}`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		//   'credentials': 'include',
		'cache': 'no-cache'
		//   "password": password,
		// 	"rememberMe": true,
		// 	"username": username 
		  		},
		body: JSON.stringify({
			 "password": password,
			"rememberMe": true,
			"username": username 
		})
	  }) 
	.then(checkStatus)
  .then(parseJSON)
  .then((response) => 
  {
	//   console.log('response from submit is:' + JSON.stringify(response));
	  const json = JSON.stringify(response);
	//    console.log('response from submit : json is:' + json);
	   const jwt_obj = JSON.parse(json);
	    //  console.log('response from submit: jwt_obj is:' + JSON.stringify(jwt_obj));
	   const jwt = JSON.stringify(jwt_obj.id_token);
	    // console.log('response from submit: jwt is:' + jwt);
	   $token = jwt;
	//    console.log('response from submit: token is:' + $token);
		// $authenticated = true;
		// console.log('response from submit: authenticated is:' + authenticated);
		 goto('/');
  })
//   .then(response => {
// 		// const bearerToken = response.headers.get('Authorization');
// 	// 	// console.log("Bearer Token from body: " + result.body);
// 		// console.log("Bearer Token: " + bearerToken);
//     //     // if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
//           const jwt = bearerToken.slice(7, bearerToken.length);
//     //     // //   if (this.rememberMe) {
// 	// 	// 	// localStorage.setItem('jhi-authenticationToken', jwt);
// 			$token = jwt;
			
//     //     //   } else {
//     //     //     sessionStorage.setItem('jhi-authenticationToken', jwt);
//     //     //   }
//     //     // }
// 	// 	this.authenticationError = false;
// 		console.log("Token is:" + {$token});
// 		console.log("Authenticated:" + {$authenticated});
// 		goto('/');
//     //     // this.$root.$emit('bv::hide::modal', 'login-page');
//     //     // this.accountService().retrieveAccount();
// 	  }) 
	   .catch(() => {
	// 	this.authenticationError = true;
		console.log("Ther was an error while fetching token:" );
      });
//   const token_id = res.json();
// 	console.log('token_id:' + token_id);
//   return null;
  
//   .then(function(data) {
//     console.log('request succeeded with JSON response', data)
//   }).catch(function(error) {
//     console.log('request failed', error)
//   })
		 
		 
		 
		 
		 // post(`auth/login`, { username, password });
		// TODO handle network errors
		// errors = response.errors;
		// if (response.user) {
		// 	$session.user = response.user;
		// 	goto('/');
		// }
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
	<p>Token is {$token} and authorization is {$authenticated}</p>
</div>