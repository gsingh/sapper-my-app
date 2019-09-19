<script context="module">
// import {token, authenticated} from '../../store/stores.js';
// import { get } from '../api/utils.js';
import { get } from '../api/utils.js';
import {onMount} from 'svelte';


	export async function preload(page, session, params) {
		const managers = await get('mutate/get', 'shift-managers');
		return { managers };
		
	}
</script>
<script>
// $: console.log(JSON.stringify({productions}));
// import {token, authenticated} from '../../store/stores.js';
import { stores } from '@sapper/app'; 
import Creater from '../_CRUD/_Creater';

const { page, preloading, session } = stores();
		export let managers;
		export let id;
		import Getter from '../_CRUD/_Getter.svelte';
		import Delete from '../_CRUD/_Delete.svelte';
		import Update from '../_CRUD/_Update.svelte';

		onMount(async ()=> {
			managers = await get('mutate/get', 'shift-managers');
		return {managers};
		});
$: managers = get('mutate/get', 'shift-managers')		
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
	{#if $session.user}
 <Creater base="managers/update/create" ></Creater>
 {/if}
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
		  <td class="table-cell text-gray-700 text-center underline hover:text-gray-900 bg-gray-400 px-4 py-2 m-2"><Getter base='managers' id='{manager.id}'></Getter></td>
		 {#if $session.user}
		  <td class="table-cell text-gray-700 text-center underline hover:text-gray-900 bg-gray-400 px-4 py-2 m-2"><Delete target= 'mutate/del' base='managers/' id='{manager.id}'></Delete>
		  <a href='managers/update/{manager.id}' class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>

		  </td>
		  {/if}
		</tr>
		  
	{/each}
	</tbody>
	</table>
 
 {/if}