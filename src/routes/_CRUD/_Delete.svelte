<script>
import * as api from '../../api/api.js';
import { goto } from '@sapper/app';
export let id;
export let base;
const idd = id.slice(1,id.length);
async function remove() {
		await api.del(base + idd, true);
		// goto('/productions');
	}
	$: goto('/productions');
</script>
<button class="bg-blue-600 text-white font-bold py-2 px-4 rounded" on:click='{remove}'>
<!-- <button class="btn btn-outline-danger btn-sm" on:click='{remove}'> -->
				Delete 
			</button>