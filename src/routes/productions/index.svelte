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
			return { productions };
	}
</script>
<script>
	
		import { stores } from '@sapper/app';
		import Creater from '../_CRUD/_Creater'

  const { page, preloading, session } = stores();
		export let selected;
		export let productions;
		export let managers;
		// export let id;
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
{#if {productions}}
 <div class="w-2/3 mx-auto">
  <div class="bg-white shadow-md rounded my-6">
    <table class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
      <thead>
        <tr>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ID</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
		  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Shift</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">No Of Plates</th>
		  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Tonnage</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Shift Manager</th>
        </tr>
      </thead>
      <tbody>
	  {#each productions as production}
        <tr class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light">{production.id}</td>
		  <td class="py-4 px-6 border-b border-grey-light">{production.prodDate}</td>
  		  <td class="py-4 px-6 border-b border-grey-light">{production.shift}</td>
		  <td class="py-4 px-6 border-b border-grey-light">{production.noOfPlates}</td>			
		  <td class="py-4 px-6 border-b border-grey-light">{production.prodTonnage}</td>
		  <td class="py-4 px-6 border-b border-grey-light">{production.manager.name}</td>




          <td class="py-4 px-6 border-b border-grey-light">
            <Getter base='productions' id='{production.id}' ></Getter>
	{#if $session.user}
			<a href='productions/update/{production.id}' class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
			<Delete target= 'productions/del' base='productions/' id='{production.id}'></Delete>
	{/if}
		  </td>
        </tr>
       {/each}
      </tbody>
    </table>
  </div>
</div>

<div>


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


 </div>
 {/if}
 </div>
 