<script context="module">
import { get } from '../api/utils.js';
	import Getter from '../_CRUD/_Getter.svelte';
	import Delete from '../_CRUD/_Delete.svelte';
	import { goto } from '@sapper/app';
	import { fade, fly } from 'svelte/transition';
	
	export async function preload(page, session, params) {
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		console.log("from [id].svelte: _id " + _id);
		const shipping = await get('mutate/get', `shippings/` + _id);
		
return {
			id: _id,
			shipping
		};
	}
	</script>
	<script>

import { stores } from '@sapper/app';

  const { page, preloading, session } = stores();

	export let shipping;
	export let id;
	
</script>



<svelte:head>
	<title>{shipping.normalingDate}</title>
</svelte:head>
<div class="w-2/3 mx-auto">
  <div class="bg-white shadow-md rounded my-6">
    <table in:fade out:fade class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
      <thead>
        <tr>
          <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ID</th>
          <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
		  <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Shift</th>
          <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">No Of Wagons</th>
		  <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Tonnage</th>
          <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Shift Manager</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-grey-lighter">
          <td class="py-2 px-6 border-b border-grey-light">{shipping.id}</td>
		  <td class="py-2 px-6 border-b border-grey-light">{shipping.shippingDate}</td>
  		  <td class="py-2 px-6 border-b border-grey-light">{shipping.shift}</td>
		  <td class="py-2 px-6 border-b border-grey-light">{shipping.noOfWagons}</td>			
		  <td class="py-2 px-6 border-b border-grey-light">{shipping.shippedTonnage}</td>
		  <td class="py-2 px-6 border-b border-grey-light">{shipping.manager.name}</td>
          <td class="py-2 px-6 border-b border-grey-light">
            <a href='shippings/update/{shipping.id}' class="text-grey-lighter font-bold py-2 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
            <!-- <a href="shippings/{shipping.id}" class="text-grey-lighter font-bold py-2 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a> -->
          </td>
        </tr>
       
      </tbody>
    </table>
  </div>
</div>











<!-- <h1>{shipping.normalingDate}</h1>
<h2>{shipping.shippedTonnage}</h2> -->
<!-- <div class='content'>
	{@html post.html}
</div> -->