<!-- <script context="module">
import { get } from '../../api/utils.js';
	
    import { goto } from '@sapper/app';
    import { post } from '../../api/utils'
	
	export async function preload(page, session, params) {
	
				const managers = await get('mutate/get', `shift-managers`);
		
return {
		  managers
		};
} 
 </script> -->
<script>
import { notice } from '../../../store/stores';
import { stores } from '@sapper/app';
// import Notifications from '@beyonk/svelte-notifications';
import { send, receive } from '../../../components/crossFade';
import { post } from '../../api/utils';
    import { goto } from '@sapper/app';


  const { page, preloading, session } = stores();
    	let notifications;
	    let message; 
	export let manager = {
        id: "",
        name: "",
        designation: "",
        mobileNumber: ""
    };
    // export let managers;
    let visible = true;
    
   
     async function create(event) {
     const response =  await post('mutate/create', {...manager},'shift-managers');
     
    notify();
  
     
     function notify () {
	  if (!response.status) {
	console.log('Login Ok.' );
		message = 'Record created !! ';
		const displayTimeMs = 8000;
        // notifications.success(message, displayTimeMs);
        visible = false;
        notice.set({message: message, status: "success"});
         goto('productions'); 
  } else{
    		message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000
            notice.set({message: message, status: "danger"});

    // notifications.danger(message, displayTimeMs)
  }
  }
    
    } 
async function cancel(){
        notice.set({message: 'cancelled !! ', status: "info"});
        goto('managers');
}
    
</script>

<div>
    <div class='p-2 border-green-300'>
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4">Add Shift Managers</h1>
       <!-- <Notifications bind:this={notifications} /> -->
      {#if visible }
      <main>
       <form out:send="{{key: 'form'}}" in:receive="{{key: 'form'}}" on:submit|preventDefault="{create}">
        <div class="p-3 font-medium border-orange-200">
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={manager.id}>
        </div>
        <div class="p-3 font-medium border-orange-200">
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
      
        <div class="ps">
            <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit">Create</button>
            <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit" on:click={cancel}>Cancel</button>
        </div>
       </form>
       </main>
       {/if}
    </div>
  </div>



