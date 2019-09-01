<script>
import * as api from '../api/api.js';
import {stores,  goto} from '@sapper/app';
import { del } from '../api/utils'
// import { token_id } from '../../store/stores';
// import { goto } from 'svelte';
export let id;
export let base;
export let target;
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
		await del(target, data);

		goto('/');
	}
	
</script>
<button class="text-grey-lighter font-bold py-1 px-3 rounded text-xs bg-green hover:bg-green-dark" on:click='{remove}'>
<!-- <button class="btn btn-outline-danger btn-sm" on:click='{remove}'> -->
				Delete 
			</button>