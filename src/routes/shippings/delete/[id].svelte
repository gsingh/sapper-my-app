<script context="module">
export async function preload(page, session, params) {
		console.log("from [id].svelte: page.params.id " + page.params.id);
		const _id = page.params.id;
		console.log("from [id].svelte: _id " + _id);
		
		
return {
			id: _id
		};
	}
</script>
<script>

import Delete from '../../_CRUD/_Delete';
import * as api from '../../api/api.js';
import {stores,  goto} from '@sapper/app';
import { del } from '../../api/utils';
import { fade } from 'svelte/transition';
 import { notice } from '../../../store/stores';

export let id;
let notifications;
	let message; 
let doDelete= false;
let data =  {data: `shippings/` + id};
console.log( 'endpoint :   ' + data);

async function remove(){
	doDelete = true;
		console.log( 'endpoint :   ' + data);

		const response = await del('mutate/del', data);
		 notify();
  
     
     function notify () {
	  if (response.status >= 200 && response.status <= 300) {
	console.log( 'Record deleted !! ' );
		message = 'Record deleted !! ';
    const displayTimeMs = 8000;
            notice.set({message: message, status: "success"});

         goto('shippings'); 
  } else{
    		message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000;
            notice.set({message: message, status: "danger"});

  }
  }

		goto('shippings');
	}
	function cancel(){
		message = 'Deleted cancelled !! ';
    const displayTimeMs = 8000;
            notice.set({message: message, status: "info"});
		goto('shippings');
	}

</script>

<div in:fade out:fade class="relative p-8 bg-white w-full max-w-md m-auto flex-col flex self-center border-red-800 border-solid border-4 shadow rounded">
<p>Do you really want to delete ?</p>
<div class="flex justify-end pt-2">
<div class="pr-3">
<button class="inline-block border border-blue-500 rounded py-1 px-3 bg-red-600 text-white pr-30" on:click="{remove}"> yes</button>
</div>
<div class="pl-3">
<button class="inline-block border border-blue-500 rounded py-1 px-3 bg-green-600 text-white pl-30" on:click="{cancel}"> cancel</button>
 </div>
 </div>
</div>     

