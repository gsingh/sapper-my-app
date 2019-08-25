<script context = "module">
// import Select from 'svelte-select';
// import {token, authenticated} from '../../store/stores.js';
import * as api from '../api/api.js';
import { get } from '../api/utils.js';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 

// const { session } = stores();

	export async function preload(page, session) {
	const productions = await api.get(`productions`);
	// const productions = await res.json();

		return { productions };
	}

// 	const {path, params,query} = page;
	// 	// if(!session.user) return this.redirect(302, 'login');

	// 	const productions = await api.get('productions', true );
	// 	return {productions};

	// 	const managers = await api.get('shift-managers', true);
	// 		return {managers};

	
</script>
<script>
	
		import { stores } from '@sapper/app';

  const { page, preloading, session } = stores();
		export let selected;
		export let productions;
		export let managers;
		export let id;
		import Getter from '../_CRUD/_Getter.svelte';
		import Delete from '../_CRUD/_Delete.svelte';
		
		// $: managers = api.get('shift-managers', true);
		
		// onMount(async ()=> {
		// 	console.log("token_id" + $session.token_id);
		// 	productions = await api.get('productions', $session.token_id );
		// 	console.log("productions" + productions);
		// return {productions};

		// 	console.log("fron onmount()");
		
		// 	 managers = await api.get('shift-managers', $session.token_id);
		// 	console.log("managers" + managers);
		// 	return {managers};

		// }
		// );

		// export productions;

		

</script>

<!-- <style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
</style> -->

<svelte:head>
	<title>Production</title>
</svelte:head>

<h1>Recent posts</h1>
{#if {productions}}
<!-- <button on:click= {preload} >
	load data
	</button> -->

	<!-- <pre>{productions}</pre> -->
 <table class="table-auto">
	{#each productions as production}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		 <tr>
		 <td class="table-cell">
		  {production.prodTonnage}</td>
		 <!-- <li><button class="btn btn-lg pull-xs-right btn-primary" type="button" disabled={inProgress} on:click={publish}>
							Publish Article
						</button>
		 </li> -->
		 <!-- {#await onMount()}
		 	<p>...waiting</p>
{:then managers} -->


		 
		 <!-- <li><a rel='prefetch' href='productions/${production.id}'>{production.prodDate}</a></li> -->
	<!-- <td class="table-cell">	 <select bind:value={selected}  >
		  	{#each managers as manager}
			 <option value={manager}>
			 {manager.name}
			 </option>
			 {/each}
			</select></td> -->
		 <!-- {/await} -->
		<td class="table-cell">  <Getter base='productions' id='{production.id}' ></Getter></td>
		<td class="table-cell">  <Delete target= 'productions/del' base='productions/' id='{production.id}'></Delete></td>
		</tr>
	{/each}
 </table>
 {/if}