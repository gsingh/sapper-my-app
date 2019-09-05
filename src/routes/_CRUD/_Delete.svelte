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
let notifications;
let message; 
// let token_value;
// const { session } = stores();
//  token_value = JSON.stringify($session.token_id);

	// const unsubscribe = token_id.subscribe(value => {
	// 	token_value = value;

	// 	// onDestroy(unsubscribe);
	// var token_derived = JSON.stringify(token_id);
	// });

// $: console.log("$session.token_id : " + $session.token_id);
// const idd = id.slice(1,id.length);
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
<Notifications bind:this={notifications} />
<button class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark" on:click='{remove}'>
<!-- <button class="btn btn-outline-danger btn-sm" on:click='{remove}'> -->
				Delete 
			</button>