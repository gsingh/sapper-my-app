<script context="module">
import {token, authenticated} from '../../store/stores.js';
	
export let productions = "dummy production";
// let token_1 = $token.slice(1,$token.length-1);
// console.log("token_1 : " + token_1);
	const baseUrl = `http://localhost:9000/api`
	const path = `productions`
// const myHeader = new Headers();
// console.log('$token : ' + $token);
// console.log('Bearer : ' + $token);
// myHeader.append('Authorization', 'Bearer ' + $token);
const myAuth = $token;
console.log("myAuth :" + myAuth);
async function checkStatus(response) {
	if (response.ok) {
		console.log("from checkstatus response: " + response.checkStatus);
	  return response;
	} else {
	  var error = new Error(response.statusText);
	  error.response = response;
	  console.log(error);
	  return error;
	}
  }
	export async function preload(page, session) {
	const res = await	this.fetch(`${baseUrl}/${path}`, {
			method: 'GET',
			headers: {
				'Authorization': $token,
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'credentials': 'include'
			}
		// headers: {
		//   'Content-Type': 'application/json',
		// //   'credentials': 'include',
		// 'cache': 'no-cache'
		//   "password": password,
		// 	"rememberMe": true,
		// 	"username": username 

		}).then(checkStatus)
		
		// .then(productions => {
		// 		// console.log(JSON.stringify(productions));
		// 	productions.json();
		// 	return {productions};
		// })
		.catch((error) => {
			console.log(error + ': from fetch !')
		});
		const productions = await res.json();
		return {productions};

	
		
	}
	
// $: console.log(JSON.stringify({productions}));
// import {token, authenticated} from '../../store/stores.js';

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

<!-- <button on:click= {submit} >
	load data
	</button> -->


 <ul>
	{#each productions as production}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		 <li>{production.prodTonnage}</li>
	{/each}
 </ul> 