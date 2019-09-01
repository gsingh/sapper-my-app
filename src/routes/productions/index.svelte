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
		import Creater from '../_CRUD/_Creater'

  const { page, preloading, session } = stores();
		export let selected;
		export let productions;
		export let managers;
		export let id;
		import Getter from '../_CRUD/_Getter.svelte';
		import Delete from '../_CRUD/_Delete.svelte';
		import Update from '../_CRUD/_Update.svelte';
		
		

</script>

<svelte:head>
	<title>Production</title>
</svelte:head>

<h1>Recent posts</h1>
<div>
<Creater base="productions/update/create" ></Creater>
<div>
{#if {productions}}

 <table class="table-auto">
	{#each productions as production}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		 <tr>
		 <td class="table-cell">
		  {production.prodTonnage}</td>
		 
		<td class="table-cell">  <Getter base='productions' id='{production.id}' ></Getter></td>
		{#if $session.user}
		<td class="table-cell">  <Delete target= 'productions/del' base='productions/' id='{production.id}'></Delete></td>
		{/if}
		{#if $session.user}
				<td class="table-cell">  <Update base='productions/update' id='{production.id}' ></Update></td>
		{/if}
		</tr>
	{/each}
 </table>
 {/if}
 </div>

 </div>
 