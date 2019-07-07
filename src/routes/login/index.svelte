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

function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
	  return response.headers['Authorization']
	} else {
	  var error = new Error(response.statusText)
	  error.response = response
	  console.log(error);
	  return error;
	}
  }
  
  function parseJSON(response) {
	return JSON.stringify(response);
  }


	async function submit(event) {
		return await fetch(`${baseUrl}/${path}`, {
		method: 'POST',
		headers: {
		  "Content-Type": "application/json",
		  "password": password,
			"rememberMe": true,
			"username": username 
		  		},
		body: JSON.stringify({
			 "Content-Type": 'application/json',
			"password": password,
			"rememberMe": true,
			"username": username 
		})
	  }) 
	.then(checkStatus)
  .then(parseJSON)
  .then(json => console.log('JSON is:' + json.headers.Authorization))
       .then(result => {
		const bearerToken = result.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
          const jwt = bearerToken.slice(7, bearerToken.length);
        //   if (this.rememberMe) {
			// localStorage.setItem('jhi-authenticationToken', jwt);
			$token = jwt;
			
        //   } else {
        //     sessionStorage.setItem('jhi-authenticationToken', jwt);
        //   }
        }
		this.authenticationError = false;
		console.log("Token is:" + {$token});
		console.log("Authenticated:" + {$authenticated});
		// goto('/');
        // this.$root.$emit('bv::hide::modal', 'login-page');
        // this.accountService().retrieveAccount();
	  }) 
	   .catch(() => {
		this.authenticationError = true;
		console.log("Ther was an error while fetching token:" + {$token});
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
	<!-- <p>Token is {$token} and authorization is {$authenticated}</p> -->
</div>