<script context="module">
import {get} from '../../api/utils.js';
	// import Getter from '../_CRUD/_Getter.svelte';
	// import Delete from '../_CRUD/_Delete.svelte';
    import { goto } from '@sapper/app';
    import { put } from '../../api/utils';
	
	export async function preload(page, session, params) {
	
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		// const _idd = _id.slice(1,_id.length);
		console.log("from [id].svelte: _id " + _id);
		const pictureOfEvent = await get('mutate/get', `picture-of-events/` + _id);
		const managers = await get('mutate/get', `imgFileContentType-managers`);
		// const pictureOfEvent = res.json();
return {
			id: _id,
            pictureOfEvent,
            managers
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
	export let pictureOfEvent= {
        id: "",
        picDate: "",
        imgType: "",
        imgFile: "",
        imgFileContentType: "",
        imgPM: ""
    };
    export let managers;
    
    export let id;
    let selected;
   
     async function update() {
       const response = await put('mutate/update', {...pictureOfEvent}, 'productions');
        notify();
  
     
     function notify () {
	  if (!response.status) {
	console.log('Login Ok.' );
        notice.set({message: 'Production updated !! ', status: "success"});
        // notice.status = "success";
        const displayTimeMs = 10000;
        
        // notifications.success(message, displayTimeMs)
         goto('productions'); 
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
     goto('productions');
 }   
    
</script>

<div transition:fade>
    <div  class="p-3 font-medium border-green-300">
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Edit Picture</h1>
        <!-- <Notifications bind:this={notifications} /> -->
       <form on:submit|preventDefault="{update}">
        <div>
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={pictureOfEvent.id}>
        </div>
        <div>
            <label for="picDate">
            <span class="text-gray-700">Last Name</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="date" name="picDate" id="picDate" bind:value={pictureOfEvent.picDate}>
        </div>
        <div>
            <label for="imgType">
            <span class="text-gray-700">No Of Plates</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="imgType" id="imgType" bind:value={pictureOfEvent.imgType}>
        </div>
        <div>
            <label for="imgFile">
            <span class="text-gray-700">Tonnage</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="imgFile" id="imgFile" bind:value={pictureOfEvent.imgFile}>
        </div>
        <div>
            <label for="imgFileContentType">
            <span class="text-gray-700">Shift</span></label>  
            <select class="form-select mt-1 block w-full" type="text" name="imgFileContentType" id="imgFileContentType" bind:value={pictureOfEvent.imgFileContentType}>
                 <option value="A" >A</option>
                 <option value="B" >B</option>
                 <option value="C" >C</option>
            </select>
        </div>
        <div>
            <label for="imgPM">
            <span class="text-gray-700">Shift Manager</span></label>
            <select class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="imgPM" id="imgPM" bind:value={pictureOfEvent.imgPM}>
                {#each managers as imgPM}
			<option value={imgPM}>
				{imgPM.name}
			</option>
		{/each}
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



