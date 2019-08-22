<script>
import * as api from '../api/api.js';
import {stores,  goto} from '@sapper/app';
import { del } from '../api/utils'
// import { token_id } from '../../store/stores';
// import { goto } from 'svelte';
export let id;
export let base;
let token_value;
const { session } = stores();
token_value = JSON.stringify($session.token_id);

	// const unsubscribe = token_id.subscribe(value => {
	// 	token_value = value;

	// 	// onDestroy(unsubscribe);
	// var token_derived = JSON.stringify(token_id);
	// });

$: console.log("$session.token_id : " + $session.token_id);
// const idd = id.slice(1,id.length);
async function remove() {
	console.log("store.token_id : " + 	JSON.stringify(token_value));
	// console.log("$session.token_id : " + $session.token_id);
		await del('productions/del', base + id);

		goto('/');
	}
	
</script>
<button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" on:click='{remove}'>
<!-- <button class="btn btn-outline-danger btn-sm" on:click='{remove}'> -->
				Delete 
			</button>