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
		const shipping = await get('mutate/get', `shippings/` + _id);
		const managers = await get('mutate/get', `shift-managers`);
		// const shipping = res.json();
return {
			id: _id,
            shipping,
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
	export let shipping= {
        id: "",
        shippingDate: "",
        noOfWagons: "",
        shippedTonnage: "",
        shift: "",
        manager: ""
    };
    export let managers;
    
    export let id;
    let selected;
   
     async function update() {
       const response = await put('mutate/update', {...shipping}, 'shippings');
        notify();
  
     
     function notify () {
	  if (!response.status) {
	console.log('Login Ok.' );
        notice.set({message: 'shipping updated !! ', status: "success"});
        // notice.status = "success";
        const displayTimeMs = 10000;
        
        // notifications.success(message, displayTimeMs)
         goto('shippings'); 
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
     goto('shippings');
 }   
    
</script>

<!-- <div transition:fade> -->
    <div  class="p-3 font-medium border-green-300">
       <h1 class="text-center font-serif text-lg text-grey-800 shadow-md pb-4" >Edit shipping</h1>
        <!-- <Notifications bind:this={notifications} /> -->
       <form out:send="{{key: 'form'}}" in:receive="{{key: 'form'}}" on:submit|preventDefault="{update}">
        <div>
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input readonly  class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={shipping.id}>
        </div>
        <div>
            <label for="shippingDate">
            <span class="text-gray-700">Shipping Date</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="date" name="shippingDate" id="shippingDate" bind:value={shipping.shippingDate}>
        </div>
        <div>
            <label for="noOfWagons">
            <span class="text-gray-700">No Of Wagons</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="noOfWagons" id="noOfWagons" bind:value={shipping.noOfWagons}>
        </div>
         <div>
            <label for="noOfTrailers">
            <span class="text-gray-700">No Of Trailers</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="noOfWagons" id="noOfWagons" bind:value={shipping.noOfTrailers}>
        </div>
        <div>
            <label for="shippedTonnage">
            <span class="text-gray-700">Tonnage</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="shippedTonnage" id="shippedTonnage" bind:value={shipping.shippedTonnage}>
        </div>
        <div>
            <label for="shift">
            <span class="text-gray-700">Shift</span></label>  
            <select class="form-select mt-1 block w-full" type="text" name="shift" id="shift" bind:value={shipping.shift}>
                 <option value="A" >A</option>
                 <option value="B" >B</option>
                 <option value="C" >C</option>
            </select>
        </div>
        <div>
            <label for="manager">
            <span class="text-gray-700">Shift Manager</span></label>
            <select class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="manager" id="manager" bind:value={shipping.manager}>
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



