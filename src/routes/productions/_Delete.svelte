<script>
import * as api from '../../api/api.js';
import { goto } from '@sapper/app';
export let id;
const idd = id.slice(1,id.length);
async function remove() {
		await api.del('/productions/'+ idd, true);
		// goto('/productions');
	}
	$: goto('/productions');
</script>

<button class="btn btn-outline-danger btn-sm" on:click='{remove}'>
				<i class="ion-trash-a"/> Delete 
			</button>