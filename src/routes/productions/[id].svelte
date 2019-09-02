<script context="module">
import * as api from '../api/api.js';
	import Getter from '../_CRUD/_Getter.svelte';
	import Delete from '../_CRUD/_Delete.svelte';
	import { goto } from '@sapper/app';
	
	export async function preload(page, session, params) {
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		console.log("from [id].svelte: _id " + _id);
		const production = await api.get(`productions/` + _id);
		
return {
			id: _id,
			production
		};
	}
	</script>
	<script>

import { stores } from '@sapper/app';

  const { page, preloading, session } = stores();

	export let production;
	export let id;
</script>



<svelte:head>
	<title>{production.prodDate}</title>
</svelte:head>
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
        <tr class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light">{production.id}</td>
		  <td class="py-4 px-6 border-b border-grey-light">{production.prodDate}</td>
  		  <td class="py-4 px-6 border-b border-grey-light">{production.shift}</td>
		  <td class="py-4 px-6 border-b border-grey-light">{production.noOfPlates}</td>			
		  <td class="py-4 px-6 border-b border-grey-light">{production.prodTonnage}</td>
		  <td class="py-4 px-6 border-b border-grey-light">{production.manager.name}</td>




          <td class="py-4 px-6 border-b border-grey-light">
            <a href='productions/update/{production.id}' class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
            <a href="#" class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a>
          </td>
        </tr>
       
      </tbody>
    </table>
  </div>
</div>











<!-- <h1>{production.prodDate}</h1>
<h2>{production.prodTonnage}</h2> -->
<!-- <div class='content'>
	{@html post.html}
</div> -->