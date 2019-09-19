<script context="module">
import { get } from '../../api/utils.js';
	// import Getter from '../_CRUD/_Getter.svelte';
	// import Delete from '../_CRUD/_Delete.svelte';
    import { goto } from '@sapper/app';
    import { put } from '../../api/utils';
	
	export async function preload(page, session, params) {
	
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		// const _idd = _id.slice(1,_id.length);
		console.log("from [id].svelte: _id " + _id);
		// const manager = await get('mutate/get', `productions/` + _id);
		const manager = await get('mutate/get', `shift-managers/` + _id);
		// const manager = res.json();
return {
			id: _id,
            manager
            // managers
		};
    }
</script>
<script>
    import { notice } from '../../../store/stores';

import { stores } from '@sapper/app';
// import Notifications from '@beyonk/svelte-notifications';
import { fade } from 'svelte/transition';




  const { page, preloading, session } = stores();
    let notifications;
	let message; 
	
    export let manager = {
        id: "",
        name: "",
        designation: "",
        mobileNumber: ""
    };
    
    export let id;
    let selected;
   
     async function update() {
       const response = await put('mutate/update', {...manager}, 'shift-managers');
        notify();
  
     
     function notify () {
	  if (!response.status) {
	console.log('Login Ok.' );
        notice.set({message: 'manager updated !! ', status: "success"});
        // notice.status = "success";
        const displayTimeMs = 10000;
        
        // notifications.success(message, displayTimeMs)
         goto('managers'); 
     } else{
            notice.message = 'update failed !! ';
        notice.status = "danger";
            message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000;
    notice.set({message: message, status: "danger"});
    // notifications.danger(message, displayTimeMs)
  }
  }
    } 
 async function cancel(){
     message = "update cancelled";
     notice.set({message: message, status: "info"});
     goto('managers');
 }   
    
</script>

<div transition:fade>
    <div  class="p-3 font-medium border-green-300">
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Edit Shift Managers</h1>
        <!-- <Notifications bind:this={notifications} /> -->
       <form on:submit|preventDefault="{update}">
        <div class="p-3 font-medium border-orange-200">
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={manager.id}>
        </div>
        <div class="p-3 font-medium border-orange-200" >
            <label for="name">
            <span class="text-gray-700">Name</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="name" id="name" bind:value={manager.name}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="designation">
            <span class="text-gray-700">Designation</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="designation" id="designation" bind:value={manager.designation}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="mobileNumber">
            <span class="text-gray-700">Mobile Number</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="mobileNumber" id="mobileNumber" bind:value={manager.mobileNumber}>
        </div>
                <div class="flex left-auto">
        <div class="pr12">
            <button class="inline-block border border-green-500 rounded py-1 px-3 bg-red-700 text-white" type="submit">save</button>
        </div>
        <div class="pl-12">    
            <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-green-500 text-white" type="submit" on:click={cancel}>Cancel</button>
        </div>
        </div>
       </form>
    </div>
  </div>



