<!-- <script context="module">
export function preload(page, {user} ) {
        return { user };
    };
</script> -->
<script>
	import { goto, stores } from '@sapper/app';
	import ListErrors from '../../components/ListErrors'
	import { post } from '../api/utils.js';
	import Notifications from '@beyonk/svelte-notifications';

	
	const { session } = stores();
	
  	export let user = {username: '',
				password: ''};
	let errors = null;
	let notifications;
	let message; 
	export let userName;
		export let token_id;

	async function submit(event) {
		console.log(event);
        console.log(event.target);
        console.log({userName});
        console.log({token_id});
		const data = await post(`auth/login`, { ...user });
		const response = data;
		console.log(response.status);
		notify();
		// count = count +1;
		// if ($session.user) {
			console.log("$session.token_id from index login : " + $session.token_id);
			console.log("$session.userName from index login : " + $session.userName);
			// $session.user = response.user;
			// goto('/');
		// }

		// TODO handle network errors
		errors = response.errors;
		 

  function notify () {
	  if (response.id_token) {
	console.log('Login Ok.' );
		message = 'Login Ok ';
		const displayTimeMs = 7000;
		notifications.success(message, displayTimeMs);
		// goto('/');
  } else{
    		message = 'Looks like there was a problem. Status : ' +
		  response.title;
		  console.log('Response' + JSON.stringify(response));
    const displayTimeMs = 9000
    notifications.danger(message, displayTimeMs)
  }
  }		
		if (response.user) {
			$session.user = response.user;
		}
		if ($session.user) {
			console.log("$session.token_id from index login : " + $session.token_id);
			console.log("$session.userName from index login : " + $session.userName);
			// $session.user = response.user;
			// goto('/');
		}
	}

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

				<ListErrors {errors}/>
			<Notifications bind:this={notifications} />
				<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"   on:submit|preventDefault={submit}>
					<div class="mb-4">
					 <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        				Username
      				</label>
						<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="user name" bind:value={user.username}>
					</div>
					<div class="mb-6">
						<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        					Password
      					</label>
					
						<input class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" bind:value={user.password}>
						<p class="text-red-500 text-xs italic">Please choose a password.</p>
    				</div>
					<div class="flex items-center justify-between">
					<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled='{!user.username || !user.password}' >
						Sign in
					</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<p>Token is {$session.token_id} and user  is {$session.userName} </p>
</div>