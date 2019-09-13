<script context = "module">
// import Select from 'svelte-select';
// import {token, authenticated} from '../../store/stores.js';
import * as api from '../api/api.js';
import { get } from '../api/utils.js';
import {onMount} from 'svelte';

// import { stores } from '@sapper/app'; 

// const { session } = stores();

	export async function preload(page, session) {
	const pictureOfEvents = await api.get(`picture-of-events`);
			return { pictureOfEvents };
	}
</script>
<script>
	
		import { stores } from '@sapper/app';
		import Creater from '../_CRUD/_Creater';
		import { fadeIn, fadeOut } from "../../components/pageFade";
		// import Image from "svelte-image";
		// const { session } = stores();
  const { page, preloading, session } = stores();
		// export let selected;
		export let pictureOfEvents;
		// export let managers;
		// export let id;
		let count =0;
		import Getter from '../_CRUD/_Getter.svelte';
		import Delete from '../_CRUD/_Delete.svelte';
		import Update from '../_CRUD/_Update.svelte';


	onMount(async () => {
		 pictureOfEvents  = await api.get('picture-of-events');
		 return pictureOfEvents;
	});	
$: pictureOfEvents  =  api.get('pictureOfEvents');
</script>
<style>
    .modal {
      transition: opacity 0.25s ease;
    }
    body.modal-active {
      overflow-x: hidden;
      overflow-y: visible !important;
    }
  </style>

<svelte:head>
	<title>Production</title>
</svelte:head>


<div>
 <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Production</h1>

 <div class="w-4/5 mx-auto pt-4">
 {#if $session.user}
 <Creater base="pictureOfEvents/update/create" ></Creater>
 {/if}
  <div in:fadeIn out:fadeOut class="bg-white shadow-md rounded my-6">
    <table class="text-left w-full border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
      <thead>
        <tr>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ID</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Date</th>
		  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Image Type</th>
          <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Image</th>
		</tr>
      </thead>
      <tbody>
	  {#each pictureOfEvents as pictureOfEvent}
        <tr class="hover:bg-grey-lighter">
          <td class="py-4 px-6 border-b border-grey-light">{pictureOfEvent.id}</td>
		  <td class="py-4 px-6 border-b border-grey-light">{pictureOfEvent.picDate}</td>
  		  <td class="py-4 px-6 border-b border-grey-light">{pictureOfEvent.imgType}</td>
		  <td class="py-4 px-6 border-b border-grey-light"><img src="data:image/png;base64,{pictureOfEvent.imgFile}" alt='picture of event'/></td>			
          <td class="py-4 px-6 border-b border-grey-light">
            <Getter base='picture-of-events' id='{pictureOfEvent.id}' ></Getter>
	{#if $session.user}
			<a href='pictureOfEvents/update/{pictureOfEvent.id}' class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
			
			<Delete target= 'mutate/del' base='picture-of-events/' id='{pictureOfEvent.id}'>
				<!-- <p>{count+1}</p> -->
			</Delete>
	{/if}
		  </td>
        </tr>
       {/each}
      </tbody>
    </table>
  </div>
</div>

</div>
 