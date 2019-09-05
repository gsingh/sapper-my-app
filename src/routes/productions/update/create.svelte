<script context="module">
import * as api from '../../api/api.js';
	
    import { goto } from '@sapper/app';
    import { post } from '../../api/utils'
	
	export async function preload(page, session, params) {
	
				const managers = await api.get(`shift-managers`);
		
return {
		  managers
		};
}
</script>
<script>

import { stores } from '@sapper/app';
import Notifications from '@beyonk/svelte-notifications';

  const { page, preloading, session } = stores();
    	let notifications;
	    let message; 
	export let production= {
        id: "",
        prodDate: "",
        noOfPlates: "",
        prodTonnage: "",
        shift: "",
        manager: ""
    };
    export let managers;
    
    
   
     async function create(event) {
     const response =  await post('productions/update/create', {...production},'productions');
     
    notify();
  
     
     function notify () {
	  if (!response.status) {
	console.log('Login Ok.' );
		message = 'Record created !! ';
		const displayTimeMs = 8000;
        notifications.success(message, displayTimeMs)
         goto('productions'); 
  } else{
    		message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000
    notifications.danger(message, displayTimeMs)
  }
  }
    
    } 
    
</script>

<div>
    <div>
       <h1>Add Production Data</h1>
       <Notifications bind:this={notifications} />
       <form on:submit|preventDefault="{create}">
        <div>
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={production.id}>
        </div>
        <div>
            <label for="prodDate">
            <span class="text-gray-700">Production Date</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="date" name="prodDate" id="prodDate" bind:value={production.prodDate}>
        </div>
        <div>
            <label for="noOfPlates">
            <span class="text-gray-700">No Of Plates</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="noOfPlates" id="noOfPlates" bind:value={production.noOfPlates}>
        </div>
        <div>
            <label for="prodTonnage">
            <span class="text-gray-700">Tonnage</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="prodTonnage" id="prodTonnage" bind:value={production.prodTonnage}>
        </div>
        <div>
            <label for="shift">
            <span class="text-gray-700">Shift</span></label>  
            <select class="form-select mt-1 block w-full" name="shift" id="shift" bind:value={production.shift}>
                 <option>Select Shift</option>
                 <option value="A" >A</option>
                 <option value="B" >B</option>
                 <option value="C" >C</option>
            </select>
        </div>
        <div>
            <label for="manager">
            <span class="text-gray-700">Shift Manager</span></label>
            <select class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" name="manager" id="manager" bind:value={production.manager}>
            <option>Select Shift Manager</option>    
            {#each managers as manager}
			<option value={manager}>
				{manager.name}
			</option>
		{/each}
        </div>
            <button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" type="submit">Create</button>
       </form>
    </div>
  </div>



