<script >
import {token, authenticated} from '../../store/stores.js';
	
let productions = "dummy production";

	const baseUrl = `http://localhost:9000/api`
	const path = `productions`
// const myHeader = new Headers();
console.log('$token : ' + $token);
console.log('Bearer : ' + $token);
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
	// export async function submit(event) {
		fetch(`${baseUrl}/${path}`, {
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
		// .then(function(r){
		// 	return r.json();
		// })
		 
		.then(function(myJson) {
    console.log(JSON.stringify(myJson));
  })
		// .then(productions => {
		// 		// console.log(JSON.stringify(productions));
		// 		// productions=data;
		// 	return {productions};
		// })
		.catch((error) => {
			console.log(error + ': from fetch !')
		});
	// preload();	
		
	// }
	
$: console.log(JSON.stringify({productions}));
// import {token, authenticated} from '../../store/stores.js';

</script>

<!-- <style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style>

<svelte:head>
	<title>Production</title>
</svelte:head>

<h1>Recent posts</h1>

<button on:click= {submit} >
	load data
	</button>


 <ul>
	{#each productions as production}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		 <!-- <li>{production.prodTonnage}</li> -->
	<!-- {/each} -->
<!-- </ul> --> 