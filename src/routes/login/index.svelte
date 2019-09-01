<script>
	import { goto, stores } from '@sapper/app';
	import ListErrors from '../../components/ListErrors'
	import { post } from '../api/utils.js';
	
	
	const { session } = stores();
	
  	export let user = {username: '',
				password: ''};
	let errors = null;

	async function submit(event) {
		console.log(event);
        console.log(event.target);
        console.log(user.username);
        console.log(user.password);
		const response = await post(`auth/login`, { ...user });
		
		// TODO handle network errors
		errors = response.errors;

		if ($session.user) {
			console.log("$session.user from index login : " + $session.user);
			// $session.user = response.user;
			goto('/');
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
	<!-- <p>Token is {$session.token_id} and authorization is {$session.authenticated} </p> -->
</div>