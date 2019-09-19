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
		const production = await get('mutate/get', `productions/` + _id);
		const managers = await get('mutate/get', `shift-managers`);
		// const production = res.json();
return {
			id: _id,
            production,
            managers
		};
    }
</script>
<script>
    import { notice } from '../../../store/stores';

import { stores } from '@sapper/app';
// import Notifications from '@beyonk/svelte-notifications';
		import { send, receive } from "../../../components/crossFade";
import { notify } from '../../mutate/_notify'




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
    
    export let id;
    let selected;
   
     async function update() {
       const response = await put('mutate/update', {...production}, 'productions');
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

<!-- <div transition:fade> -->
    <div  class="p-3 font-medium border-green-300">
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Edit Production</h1>
        <!-- <Notifications bind:this={notifications} /> -->
       <form out:send="{{key: 'form'}}" in:receive="{{key: 'form'}}" on:submit|preventDefault="{update}">
        <div>
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={production.id}>
        </div>
        <div>
            <label for="prodDate">
            <span class="text-gray-700">Last Name</span></label>
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
            <select class="form-select mt-1 block w-full" type="text" name="shift" id="shift" bind:value={production.shift}>
                 <option value="A" >A</option>
                 <option value="B" >B</option>
                 <option value="C" >C</option>
            </select>
        </div>
        <div>
            <label for="manager">
            <span class="text-gray-700">Shift Manager</span></label>
            <select class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="manager" id="manager" bind:value={production.manager}>
                {#each managers as manager}
			<option value={manager}>
				{manager.name}
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
  <!-- </div> -->



