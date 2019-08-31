<script context="module">
import * as api from '../../api/api.js';
	// import Getter from '../_CRUD/_Getter.svelte';
	// import Delete from '../_CRUD/_Delete.svelte';
	import { goto } from '@sapper/app';
	
	export async function preload(page, session, params) {
		// const {slug} = page.params;
		// console.log("from [id].svelte:  " );
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		// const _idd = _id.slice(1,_id.length);
		console.log("from [id].svelte: _id " + _id);
		// console.log("from [id].svelte: session.token_id ");
		const production = await api.get(`productions/` + _id);
		
		// const production = res.json();
return {
			id: _id,
			production
		};
		

    }
    

</script>
<script>

import { stores } from '@sapper/app';

  const { page, preloading, session } = stores();

	export let production;
	export let id;
	// export let getter, deleter,putter, creater;
    
    
</script>

<div>
    <div>
       <h1>Edit Production</h1>
       <form on:submit|preventDefault="">
        <div>
             <label class="block" for="id">
             <span class="text-gray-700">ID</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="id" id="id" bind:value={production.id}>
        </div>
        <div>
            <label for="prodDate">
            <span class="text-gray-700">Last Name</span></label>
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="prodDate" id="prodDate" bind:value={production.prodDate}>
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
            <input class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg mt-1 block w-full" type="text" name="manager" id="manager" bind:value={production.manager.name}>
        </div>
            <button type="submit">Save</button>
       </form>
    </div>
  </div>



