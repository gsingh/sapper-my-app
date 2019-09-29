<script context = "module">

import { get } from '../api/utils';

export async function preload(page, session, params) {
const eventOfPlateMills = await get('mutate/get','eventOfPlateMills');
		return { eventOfPlateMills };
}
</script>
<script>
	
import { stores } from '@sapper/app';
import Creater from '../_CRUD/_Creater';
import { send, receive } from "../../components/crossFade";
import {onMount} from 'svelte';


const { page, preloading, session } = stores();

export let eventOfPlateMills;
let count =0;
import Getter from '../_CRUD/_Getter.svelte';
import Delete from '../_CRUD/_Delete.svelte';
import Update from '../_CRUD/_Update.svelte';
import * as tailwind from '../../../tailwind'
let searchTerm = '2019';
let searchTerm2 = '2020';

const regex = new RegExp(searchTerm, "gi");
export let jsonResponse;
$: eventOfPlateMills = get('mutate/get', 'eventOfPlateMills');

function handleSubmit(event) {

	eventOfPlateMills = searchTerm
	? jsonResponse.filter((element) => element.eventDate >= searchTerm && element.eventDate <= searchTerm2 ).sort(function(a,b){
 	 return new Date(b.date) - new Date(a.date);
	})  : jsonResponse;
	}

onMount(async () => {
	eventOfPlateMills = await get('mutate/get','eventOfPlateMills');
	jsonResponse = eventOfPlateMills;
	});
</script>
<style>
.th {
@apply py-1 px-2 font-bold  text-base text-blue-700 border-b;
}

.td{
	@apply py-4 px-2 border-b border-gray-400 ;
}
</style>



<svelte:head>
	<title>Event</title>
</svelte:head>

<div>
	<h1 class="w-full text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Production</h1>
</div>
<div class="flex border border-gray-300">	
	<div class="w-3/4 mx-auto pt-4 order-1">
		<form on:submit|preventDefault={handleSubmit}>
		<label for="search">Search:</label>
		<input class="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg mt-1" type="date" id="search" bind:value={searchTerm}  required />
		<label for="search">Search:</label>
		<input class="bg-white focus:outline-none focus:shadow-outline border border-gray-400 rounded-lg mt-1" type="date" id="search" bind:value={searchTerm2}  required />
		<button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-400 text-white" type="submit">Search</button>
		</form>
	</div>
	<div class="w-1/4 pt-4 order-2">
		{#if $session.user}
		<Creater base="eventOfPlateMills/update/create"></Creater>
		{/if}
	</div>
</div>
<div class="flex border border-green-200">
  <div class="w-3/4 border-gray-200 shadow-md rounded my-6">
  	  	<!-- {#if {eventOfPlateMills}} -->
    <table  out:send="{{key: 'table'}}" in:receive="{{key: 'table'}}" class="text-left border-collapse"> <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
      <thead>
        <tr>
          <th class="th">ID</th>
          <th class="th">Event Date</th>
		  <th class="th">Event Name</th>
        </tr>
      </thead>
      <tbody>
	  {#each eventOfPlateMills as eventOfPlateMill}
        <tr class="hover:bg-gray-300">
          <td class="td">{eventOfPlateMill.id}</td>
		  <td class="td">{eventOfPlateMill.eventDate}</td>
  		  <td class="td">{eventOfPlateMill.eventName}</td>
		  <td class="td">
            <Getter base='eventOfPlateMills' id='{eventOfPlateMill.id}'></Getter>
			{#if $session.user}
				<a href='eventOfPlateMills/update/{eventOfPlateMill.id}' class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark">Edit</a>
					<Delete target= 'mutate/del' base='eventOfPlateMills/' id='{eventOfPlateMill.id}'>
					<!-- <p>{count+1}</p> -->
					</Delete>
			{/if}
		  </td>
        </tr>
       {/each}
      </tbody>
    </table>
	<!-- {/if} -->
	</div>
	
  <div out:send="{{key: 'table'}}" in:receive="{{key: 'table'}}" class="w-1/4 bg-gray-200">
	<div out:send="{{key: 'table'}}" in:receive="{{key: 'table'}}">

		<h3>Graphs</h3>
	</div>
  </div>
</div>





 