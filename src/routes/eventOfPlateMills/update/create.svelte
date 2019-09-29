<!-- <script context="module">
import { get } from '../../api/utils.js';
	
   
	export async function preload(page, session, params) {
	
				// const managers = await get('mutate/get', `shift-managers`);
		
return {
		//   managers
		};
}
</script> -->
<script>
 import { goto } from '@sapper/app';
 import { post } from '../../api/utils'
	
import { notice } from '../../../store/stores';
import { stores } from '@sapper/app';
import { notify } from '../../mutate/_notify'
// import Notifications from '@beyonk/svelte-notifications';
import { send, receive } from '../../../components/crossFade';

  const { page, preloading, session } = stores();
    	let notifications;
	    let message; 
	export let eventOfPlateMill= {
        id: "",
        eventDate: "",
        eventName: "",
    };
    // export let managers;
    let visible = true;
    
   
     async function create(event) {
     const response =  await post('mutate/create', {...eventOfPlateMill},'eventOfPlateMills');
     console.log("response from create.js : " + response);
    notify(response, 'eventOfPlateMills');
    } 

async function cancel(){
        notice.set({message: 'cancelled !! ', status: "info"});
        goto('eventOfPlateMills');
}
    
</script>

<div class='bg-orange-300'>
    <div class='p-2 border-green-300'>
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4">Add Production Data</h1>
      {#if visible }
       <form out:send="{{key: 'form'}}" in:receive="{{key: 'form'}}" on:submit|preventDefault="{create}">
        <div class="p-3 font-medium border-orange-200">
             <label class="block" for="id">
             <span class="mb-2 uppercase font-bold text-md text-grey-darkest">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={eventOfPlateMill.id}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="eventDate">
            <span class="mb-2 uppercase font-bold text-md text-grey-darkest">Event Date</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="date" name="eventDate" id="eventDate" bind:value={eventOfPlateMill.eventDate}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="eventName">
            <span class="mb-2 uppercase font-bold text-md text-grey-darkest">Event Date</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="eventName" id="eventName" bind:value={eventOfPlateMill.eventName}>
        </div>
        <div class="ps">
            <button class="inline-block hover:bg-teal-dark border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit">Create</button>
            <button class="inline-block hover:bg-teal-dark border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit" on:click={cancel}>Cancel</button>
        </div>
       </form>
       {/if}
    </div>
  </div>



