<script context="module">
import {get} from '../api/utils.js';
	import Getter from '../_CRUD/_Getter.svelte';
	import Delete from '../_CRUD/_Delete.svelte';
	import { goto } from '@sapper/app';
	import { fade, fly } from 'svelte/transition';
	
	export async function preload(page, session, params) {
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		console.log("from [id].svelte: _id " + _id);
		const pictureOfEvent = await get('mutate/get', `picture-of-events/` + _id);
		
return {
			id: _id,
			pictureOfEvent
		};
	}
	</script>
	<script>

import { stores } from '@sapper/app';

  const { page, preloading, session } = stores();

	export let pictureOfEvent;
	export let id;
	
</script>



<svelte:head>
	<title>{pictureOfEvent.prodDate}</title>
</svelte:head>
<div class="w-2/3 mx-auto">
  <div class="bg-white shadow-md rounded my-6">
    <table in:fade out:fade class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
      <thead>
        <tr>
          <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ID</th>
          <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
		  <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Type</th>
          <!-- th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Image</th-->
		  <!--th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Content Type</th-->
          <th class="py-2 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Event</th>
        </tr>
      </thead>
      <tbody>
        <tr class="hover:bg-grey-lighter">
          <td class="py-2 px-6 border-b border-grey-light">{pictureOfEvent.id}</td>
		  <td class="py-2 px-6 border-b border-grey-light">{pictureOfEvent.picDate}</td>
  		  <td class="py-2 px-6 border-b border-grey-light">{pictureOfEvent.imgType}</td>
		  <!--td class="py-2 px-6 border-b border-grey-light">{pictureOfEvent.imgFile}</td-->			
		  <td class="py-2 px-6 border-b border-grey-light"><img src=pictures/{pictureOfEvent.imgFileContentType} alt='picture of event'/></td>
		  <td class="py-2 px-6 border-b border-grey-light">{pictureOfEvent.eventPM}</td>
          <td class="py-2 px-6 border-b border-grey-light">
            <a href='pictureOfEvents/update/{pictureOfEvent.id}' class="text-grey-lighter font-bold py-2 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
            <!-- <a href="pictureOfEvents/{pictureOfEvent.id}" class="text-grey-lighter font-bold py-2 px-3 rounded text-xs bg-blue hover:bg-blue-dark">View</a> -->
          </td>
        </tr>
       
      </tbody>
    </table>
  </div>
</div>











<!-- <h1>{pictureOfEvent.prodDate}</h1>
<h2>{pictureOfEvent.prodTonnage}</h2> -->
<!-- <div class='content'>
	{@html post.html}
</div> -->