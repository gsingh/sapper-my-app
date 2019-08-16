<script>
// import {token, authenticated} from '../../store/stores.js';
import * as api from '../../api/api.js';
import {onMount} from 'svelte';
import { goto, stores } from '@sapper/app'; 
export let managers;
export let id;
import Getter from '../_CRUD/_Getter.svelte';
import Delete from '../_CRUD/_Delete.svelte';

const { session } = stores();
// export let productions = '';
// let token_1 = $token.slice(1,$token.length-1);
// console.log("token_1 : " + token_1);
	// const baseUrl = `http://localhost:9000/api`
	// const path = `productions`
// const myHeader = new Headers();
// console.log('$token : ' + $token);
// console.log('Bearer : ' + $token);
// myHeader.append('Authorization', 'Bearer ' + $token);
// const myAuth = $token;
// console.log("myAuth :" + myAuth);
// async function checkStatus(response) {
// 	if (response.ok) {
// 		console.log("from checkstatus response: " + response.checkStatus);
// 	  return response;
// 	} else {
// 	  var error = new Error(response.statusText);
// 	  error.response = response;
// 	  console.log(error);
// 	  return error;
// 	}
//   }
	// export async function preload(page, session, params) {
	// 	const managers = await api.get('shift-managers', true );
	// 	return {managers};
		
	// }
	onMount(async ()=> {
			productions = await api.get('shift-managers', $session.token_id);
		return {productions};
		console.log("fron onmount(): managers");
		}
		);
		// fetch(`${baseUrl}/${path}`, {
		// 	method: 'GET',
		// 	headers: {
		// 		'Authorization': $token,
		// 		'Content-Type': 'application/json',
		// 		'Accept': 'application/json',
		// 		'credentials': 'include'
		// 	}
		// headers: {
		//   'Content-Type': 'application/json',
		// //   'credentials': 'include',
		// 'cache': 'no-cache'
		//   "password": password,
		// 	"rememberMe": true,
		// 	"username": username 

		// }).then(checkStatus)
		
		// .then(data => {
		// 		// console.log(JSON.stringify(productions));
		// 	{productions} = data.json();
		// 	return {productions};
		// })
		// .catch((error) => {
		// 	console.log(error + ': from fetch !')
		// });
		// productions =  res.json();
		// console.log(JSON.stringify(productions));
		// return {productions};
	// }

	// console.log(JSON.stringify())
	
// $: console.log(JSON.stringify({productions}));
// import {token, authenticated} from '../../store/stores.js';


		// export let managers;
		// export let id;
		// import Getter from '../_CRUD/_Getter.svelte';
		// import Delete from '../_CRUD/_Delete.svelte';
		// onMount(async ()=> {
		// 	managers = await api.get('shift-managers', true);
		// return {managers};
		// console.log("fron onmount()");
		// }
		// );
</script>

<!-- <style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style> -->

<svelte:head>
	<title>Shift Manager</title>
</svelte:head>

<h1>List of Shift Managers</h1>
{#if {managers}}
<!-- <button on:click= {preload} >
	load data
	</button> -->

	<!-- <pre>{productions}</pre> -->
 <table class="table table-auto bg-gray-100">
	<tbody>
	{#each managers as manager}
	
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
	<!-- <div class="table w-full"> -->
	
  		<tr class="table-row border-solid border-grey-900">
		 <td class="table-cell text-gray-700 text-center bg-gray-400 border-solid border-pink-900 px-4 py-2 m-2">{manager.id}</td>
         <td class="table-cell text-gray-700 text-center bg-gray-400 border-solid border-grey-900 px-4 py-2 m-2">{manager.name}</td>
         <td class=" table-cell text-gray-700 text-center bg-gray-400 border-solid border-grey-900 px-4 py-2 m-2">{manager.designation}</td>
         <td class="table-cell text-gray-700 text-center bg-gray-400 border-solid border-grey-900 px-4 py-2 m-2">{manager.mobileNumber}</td>
		 <!-- <li><button class="btn btn-lg pull-xs-right btn-primary" type="button" disabled={inProgress} on:click={publish}>
							Publish Article
						</button>
		 </li> -->
		 <!-- <li><a rel='prefetch' href='productions/${production.id}'>{production.prodDate}</a></li> -->
		  <td class="table-cell text-gray-700 text-center underline hover:text-gray-900 bg-gray-400 px-4 py-2 m-2"><Getter base='managers' id='${manager.id}'></Getter></td>
		  <td class="table-cell text-gray-700 text-center underline hover:text-gray-900 bg-gray-400 px-4 py-2 m-2"><Delete base='shift-managers/' id='${manager.id}'></Delete>
		  </td>
		</tr>
		  
	{/each}
	</tbody>
	</table>
 
 {/if}