<script >
// import {token, authenticated} from '../../store/stores.js';
	
export let productions;

	const baseUrl = `http://localhost:8080/api`
	const path = `productions`
// const myHeader = new Headers();
console.log('$token :' + $token);
console.log('Authorization Bearer ' + $token);
// myHeader.append('Authorization', 'Bearer ' + $token);
const myAuth = 'Bearer ' + $token;
	export async function preload({ params, query }) {
		return this.fetch(`${baseUrl}/${path}`, {
			method: 'GET',
			headers: {
				'Authorization': myAuth,
				'Content-Type': 'application/json',
				'credentials': 'include'
			}
		// headers: {
		//   'Content-Type': 'application/json',
		// //   'credentials': 'include',
		// 'cache': 'no-cache'
		//   "password": password,
		// 	"rememberMe": true,
		// 	"username": username 

		}).then(r => r.json()).then(productions => {
			return { productions };
		});
	}
	

import {token, authenticated} from '../../store/stores.js';

</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Production</title>
</svelte:head>

<h1>Recent posts</h1>

{productions}

 <!-- <ul>
	{#each productions as production} -->
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		 <!-- <li>{production}</li> -->
	<!-- {/each} -->
<!-- </ul> -->