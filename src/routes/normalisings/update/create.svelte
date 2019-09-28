<script context="module">
import { get } from '../../api/utils.js';
	
    import { goto } from '@sapper/app';
    import { post } from '../../api/utils'
	
	export async function preload(page, session, params) {
	
				const managers = await get('mutate/get', `shift-managers`);
		
return {
		  managers
		};
}
</script>
<script>
import { notice } from '../../../store/stores';
import { stores } from '@sapper/app';
import { notify } from '../../mutate/_notify'
// import Notifications from '@beyonk/svelte-notifications';
import { send, receive } from '../../../components/crossFade';

  const { page, preloading, session } = stores();
    	let notifications;
	    let message; 
	export let normalising= {
        id: "",
        normalisingDate: "",
        noOfPlates: "",
        normalisedTonnage: "",
        shift: "",
        manager: ""
    };
    export let managers;
    let visible = true;
    
   
     async function create(event) {
     const response =  await post('mutate/create', {...normalising},'normalisings');
     console.log("response from create.js : " + response);
    notify(response, 'normalisings');
  
     
//      function notify () {
// 	  if (!response.status) {
// 	// console.log('Login Ok.' );
// 		message = 'Record created !! ';
// 		const displayTimeMs = 8000;
//         // notifications.success(message, displayTimeMs);
//         visible = false;
//         notice.set({message: message, status: "success"});
//          goto('normalisings'); 
//   } else{
//     		message = 'Looks like there was a problem. Status:  ' +
//           response.statusText;
//     const displayTimeMs = 7000
//             notice.set({message: message, status: "danger"});

//     // notifications.danger(message, displayTimeMs)
//   }
//   }
    
    } 
async function cancel(){
        notice.set({message: 'cancelled !! ', status: "info"});
        goto('normalisings');
}
    
</script>

<div class='bg-orange-300'>
    <div class='p-2 border-green-300'>
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4">Add normalising Data</h1>
       <!-- <Notifications bind:this={notifications} /> -->
      {#if visible }
       <form out:send="{{key: 'form'}}" in:receive="{{key: 'form'}}" on:submit|preventDefault="{create}">
        <div class="p-3 font-medium border-orange-200">
             <label class="block" for="id">
             <span class="mb-2 uppercase font-bold text-md text-grey-darkest">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={normalising.id}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="normalisingDate">
            <span class="mb-2 uppercase font-bold text-md text-grey-darkest">normalising Date</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="date" name="normalisingDate" id="normalisingDate" bind:value={normalising.normalisingDate}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="noOfPlates">
            <span class="mb-2 uppercase font-bold text-md text-grey-darkest">No Of Plates</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="noOfPlates" id="noOfPlates" bind:value={normalising.noOfPlates}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="normalisedTonnage">
            <span class="mb-2 uppercase font-bold text-md text-grey-darkest">Tonnage</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="normalisedTonnage" id="normalisedTonnage" bind:value={normalising.normalisedTonnage}>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="shift">
            <span class="mb-2 uppercase font-bold text-md text-grey-darkest">Shift</span></label>  
            <select class="form-select mt-1 block w-full" name="shift" id="shift" bind:value={normalising.shift}>
                 <option>Select Shift</option>
                 <option value="A" >A</option>
                 <option value="B" >B</option>
                 <option value="C" >C</option>
            </select>
        </div>
        <div class="p-3 font-medium border-orange-200">
            <label for="manager">
            <span class="mb-2 uppercase font-bold text-md text-grey-darkest">Shift Manager</span></label>
            <select class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" name="manager" id="manager" bind:value={normalising.manager}>
            <option>Select Shift Manager</option>    
            {#each managers as manager}
			<option value={manager}>
				{manager.name}
			</option>
		{/each}
        </div>
        <div class="ps">
            <button class="inline-block hover:bg-teal-dark border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit">Create</button>
            <button class="inline-block hover:bg-teal-dark border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit" on:click={cancel}>Cancel</button>
        </div>
       </form>
       {/if}
    </div>
  </div>



