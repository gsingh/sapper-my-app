<script context = "module">
// import Select from 'svelte-select';
// import {token, authenticated} from '../../store/stores.js';
// import { get } from '../api/utils.js';
import { get } from '../api/utils';
import {onMount} from 'svelte';
// import { stores } from '@sapper/app'; 


	export async function preload(page, session) {
	const jsonResponse = await get('mutate/get','productions');
			return { jsonResponse };
	}
</script>
<script>
	
		import { stores } from '@sapper/app';
		import Creater from '../_CRUD/_Creater';
		import { send, receive } from "../../components/crossFade";
		import SearchForm from '../_CRUD/SearchForm';
		const { session } = stores();

		// export let selected;
		export let productions;
		// export let managers;
		// export let id;
		let count =0;
		import Getter from '../_CRUD/_Getter.svelte';
		import Delete from '../_CRUD/_Delete.svelte';
		import Update from '../_CRUD/_Update.svelte';
		let searchTerm;
		const regex = new RegExp(searchTerm, "gi");
		export let jsonResponse;
$:	productions = searchTerm
    ? jsonResponse.filter(element => element.prodDate.match(regex))
    : jsonResponse;

function handleSubmit(event) {
	// do stuff
	   productions = searchTerm
    ? jsonResponse.filter(element => element.prodDate.includes(searchTerm))
    : jsonResponse;
  }

	onMount(async () => {
		 productions  =searchTerm
    ? jsonResponse.filter(element => element.prodDate.includes(searchTerm))
    : jsonResponse;
  });

$: productions  =  searchTerm  ? jsonResponse.filter(element => element.prodDate.includes(searchTerm))
	: jsonResponse;
	
</script>


<svelte:head>
	<title>Production</title>
</svelte:head>


<div>
 <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Production</h1>
<!-- <SearchForm /> -->
<div class="w-4/5 mx-auto pt-4">
<form on:submit|preventDefault={handleSubmit}>
  <label for="search">Search:</label>
  <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg mt-1 block w-full" type="search" id="search" bind:value={searchTerm}  required />
  <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-400 text-white" type="submit">Search</button>
</form>
</div>

 <div class="w-4/5 mx-auto pt-4">
 {#if $session.user}
 <Creater base="productions/update/create" ></Creater>
 {/if}
  <div class="bg-white shadow-md rounded my-6">
  <main>
  {#if {productions}}
    <table  out:send="{{key: 'table'}}" in:receive="{{key: 'table'}}" class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
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
	{/if}
	</main>
  </div>
</div>

</div>
 