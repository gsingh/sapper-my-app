<script>
import * as api from '../api/api.js';
import {stores,  goto} from '@sapper/app';
import { del } from '../api/utils';
import Notifications from '@beyonk/svelte-notifications';
// import { token_id } from '../../store/stores';
// import { goto } from 'svelte';
export let id;
export let base;
export let target;
// export let count;
let notifications;
let message; 

let data = {"endpoint" : base + id};
async function remove() {
	// console.log("store.token_id : " + 	JSON.stringify(token_value));
	// console.log("$session.token_id : " + $session.token_id);
		const response = await del(target, data);
		 notify();
  
     
     function notify () {
	  if (response.status >= 200 && response.status <= 300) {
	console.log( 'Record deleted !! ' );
		message = 'Record deleted !! ';
		const displayTimeMs = 8000;
        notifications.success(message, displayTimeMs);
		count += 1;
        //  goto('productions'); 
  } else{
    		message = 'Looks like there was a problem. Status:  ' +
          response.statusText;
    const displayTimeMs = 7000
    notifications.danger(message, displayTimeMs)
  }
  }

		// goto('/');
	}
	
</script>
 <style>
    .modal {
      transition: opacity 0.25s ease;
    }
    body.modal-active {
      overflow-x: hidden;
      overflow-y: visible !important;
    }
  </style>
<Notifications bind:this={notifications} />
<a class="modal-open bg-transparent border border-gray-500 hover:border-indigo-500 text-gray-500 hover:text-indigo-500 font-bold py-2 px-4 rounded-full" href='productions/delete/{id}'>Delete</a>