<script>
import * as api from '../../api/api.js';
import {onMount,  goto} from '@sapper/app';
// import { goto } from 'svelte';
export let id;
export let base;
// const idd = id.slice(1,id.length);
async function remove() {
		await api.del(base + id, true);
		// goto('/productions');
	}
	// $: goto('/productions');
</script>
<button class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" on:click='{remove}'>
<!-- <button class="btn btn-outline-danger btn-sm" on:click='{remove}'> -->
				Delete 
			</button>