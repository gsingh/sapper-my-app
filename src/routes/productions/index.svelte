<script context = "module">
// import Select from 'svelte-select';
// import {token, authenticated} from '../../store/stores.js';
// import { get } from '../api/utils.js';
import { get } from '../api/utils';
// import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 


	export async function preload(page, session, params) {
	const productions = await get('mutate/get','productions');
		// const jsonResponse = productions;
			return { productions };
	}
</script>
<script>
	
		import { stores } from '@sapper/app';
		import Creater from '../_CRUD/_Creater';
		import { send, receive } from "../../components/crossFade";
		import {onMount} from 'svelte';
		
		// import { get } from '../api/utils';


		// import SearchForm from '../_CRUD/_SearchForm';
// 		 import FusionCharts from 'fusioncharts/core';
//   		 import Charts from 'fusioncharts/fusioncharts.charts';
//   import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
//   import SvelteFC, { fcRoot } from 'svelte-fusioncharts';
// 		 // Always set FusionCharts as the first parameter
//   fcRoot(FusionCharts, Charts, FusionTheme);

		const { page, preloading, session } = stores();

		// export let selected;
		export let productions;
		// export let managers;
		// export let id;
		let count =0;
		import Getter from '../_CRUD/_Getter.svelte';
		import Delete from '../_CRUD/_Delete.svelte';
		import Update from '../_CRUD/_Update.svelte';
		import * as tailwind from '../../../tailwind'
		let searchTerm = '2019';
				let searchTerm2 = '2020';

		const regex = new RegExp(searchTerm, "gi");
		export let jsonResponse;
// $:	{ jsonResponse =  get('mutate/get','productions');
// 	
// $: productions = searchTerm ? jsonResponse.filter(element => element.prodDate.match(searchTerm)) : jsonResponse;
	// return productions;	
$: productions = get('mutate/get', 'productions');

// 	searchTerm
//     ? jsonResponse.filter(element => element.prodDate.match(searchTerm))
//     : jsonResponse;
// }
function handleSubmit(event) {
	// do stuff

	productions = searchTerm
    ? jsonResponse.filter((element) => element.prodDate >= searchTerm && element.prodDate <= searchTerm2 )
    : jsonResponse;
  }

	onMount(async () => {
		productions = await get('mutate/get','productions');
		jsonResponse = productions;
	// 	 productions  =searchTerm
    // ? jsonResponse.filter(element => element.prodDate.includes(searchTerm))
    // : jsonResponse;
  });

// $: productions  = { 
// 	searchTerm  ? jsonResponse.filter(element => element.prodDate.includes(searchTerm))
// 	: jsonResponse;
// }
</script>
<style>
.th {
@apply py-4 px-6 font-bold uppercase text-lg text-red-700 border-b;
}

</style>



<svelte:head>
	<title>Production</title>
</svelte:head>


<div>
 <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Production</h1>
<!-- <SearchForm /> -->
<div class="w-4/5 mx-auto pt-4">
<form on:submit|preventDefault={handleSubmit}>
  <label for="search">Search:</label>
  <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg mt-1" type="date" id="search" bind:value={searchTerm}  required />
   <label for="search">Search:</label>
  <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg mt-1" type="date" id="search" bind:value={searchTerm2}  required />
  <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-400 text-white" type="submit">Search</button>
</form>
</div>

 <div class="w-4/5 mx-auto pt-4">
 {#if $session.user}
 <Creater base="productions/update/create" ></Creater>
 {/if}
  <div class="bg-white shadow-md rounded my-6">
  <main>
  <!-- {#if {productions}} -->
    <table  out:send="{{key: 'table'}}" in:receive="{{key: 'table'}}" class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
      <thead>
        <tr>
          <th class="th">ID</th>
          <th class="th">Date</th>
		  <th class="th">Shift</th>
          <th class="th">No Of Plates</th>
		  <th class="th">Tonnage</th>
          <th class="th">Shift Manager</th>
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
		  <td class="py-4 px-8 border-b border-grey-light">{production.manager.name}</td>
          <td class="py-4 px-6 border-b border-grey-light">
            <Getter base='productions' id='{production.id}'></Getter>
	{#if $session.user}
			<a href='productions/update/{production.id}' class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
			
			<Delete target= 'mutate/del' base='productions/' id='{production.id}'>
				<!-- <p>{count+1}</p> -->
			</Delete>
	{/if}
		  </td>
        </tr>
       {/each}
      </tbody>
    </table>
	<!-- {/if} -->
	</main>
  </div>
</div>

</div>
 